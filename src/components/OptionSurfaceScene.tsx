'use client'

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import * as THREE from 'three'
import { Canvas, type ThreeEvent, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { BS_PARAMS, buildSurfaceGrid, nearestSpotIndex, type SurfaceVertex } from '@/lib/black-scholes'
import { OptionSurfaceHeatmap } from './OptionSurfaceHeatmap'

const DESKTOP_RES = 48
const MOBILE_RES = 20
const X_SCALE = 1.7
const Z_SCALE = 1.1
const Y_SCALE = 1.3

const DEFAULT_AZIMUTH = 0.7
const DEFAULT_POLAR = Math.PI / 2 - 0.32
const MIN_POLAR = THREE.MathUtils.degToRad(25)
const MAX_POLAR = THREE.MathUtils.degToRad(75)
const EASE_BACK_MS = 600

// Solves the CSS-style cubic-bezier(x1,y1,x2,y2) easing for y at a given
// x (time fraction), matching the [0.23, 1, 0.32, 1] curve already used by
// BlurText/EquityCurve elsewhere in the site.
function cubicBezierEase(x1: number, y1: number, x2: number, y2: number) {
  const sampleCurveX = (u: number) => 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u
  const sampleCurveY = (u: number) => 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u
  return (x: number) => {
    let u = x
    for (let i = 0; i < 8; i++) {
      const dx = sampleCurveX(u) - x
      if (Math.abs(dx) < 1e-5) break
      const derivative = 3 * (1 - u) * (1 - u) * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u * u * (1 - x2)
      if (Math.abs(derivative) < 1e-6) break
      u -= dx / derivative
    }
    return sampleCurveY(Math.min(Math.max(u, 0), 1))
  }
}

const ease = cubicBezierEase(0.23, 1, 0.32, 1)

type GeometryData = {
  positions: Float32Array
  colors: Float32Array
  indices: number[]
  flat: SurfaceVertex[]
  atmIx: number
}

function buildGeometryData(res: number): GeometryData {
  const grid = buildSurfaceGrid(res, res)
  const flat = grid.flat()
  const premiums = flat.map((v) => v.premium)
  const minP = Math.min(...premiums)
  const maxP = Math.max(...premiums)
  const range = maxP - minP || 1

  const positions = new Float32Array(res * res * 3)
  const colors = new Float32Array(res * res * 3)
  const washColor = new THREE.Color('#e9edfb')
  const cobaltColor = new THREE.Color('#1e3fcc')

  for (let iy = 0; iy < res; iy++) {
    for (let ix = 0; ix < res; ix++) {
      const i = iy * res + ix
      const v = grid[iy][ix]
      const t = (v.premium - minP) / range
      const x = (ix / (res - 1) - 0.5) * 2 * X_SCALE
      const z = (iy / (res - 1) - 0.5) * 2 * Z_SCALE
      const y = t * Y_SCALE

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const c = washColor.clone().lerp(cobaltColor, t)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
  }

  const indices: number[] = []
  for (let iy = 0; iy < res - 1; iy++) {
    for (let ix = 0; ix < res - 1; ix++) {
      const a = iy * res + ix
      const b = a + 1
      const c = a + res
      const d = c + 1
      indices.push(a, c, b, b, c, d)
    }
  }

  return { positions, colors, indices, flat, atmIx: nearestSpotIndex(res) }
}

function Surface({
  data,
  res,
  onProbe,
}: {
  data: GeometryData
  res: number
  onProbe: (v: SurfaceVertex) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const draggingRef = useRef(false)

  useEffect(() => {
    const onUp = () => {
      draggingRef.current = false
    }
    window.addEventListener('pointerup', onUp)
    return () => window.removeEventListener('pointerup', onUp)
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(data.positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(data.colors, 3))
    geo.setIndex(data.indices)
    geo.computeVertexNormals()
    return geo
  }, [data])

  const ringPoints = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let iy = 0; iy < res; iy++) {
      const i = iy * res + data.atmIx
      pts.push(new THREE.Vector3(data.positions[i * 3], data.positions[i * 3 + 1] + 0.015, data.positions[i * 3 + 2]))
    }
    return pts
  }, [data, res])

  const ringGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(ringPoints), [ringPoints])
  const ringMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: '#16309e', linewidth: 2 }), [])
  // `<line>` collides with the SVG intrinsic of the same name in TS's JSX
  // namespace, so the ATM ring is built as a real THREE.Line and mounted
  // via <primitive> instead. R3F treats <primitive> objects as externally
  // managed and never disposes them, so the geometry/material are disposed
  // explicitly whenever they're recreated or the component unmounts.
  const ringLine = useMemo(() => new THREE.Line(ringGeometry, ringMaterial), [ringGeometry, ringMaterial])

  useEffect(() => {
    return () => {
      ringGeometry.dispose()
      ringMaterial.dispose()
    }
  }, [ringGeometry, ringMaterial])

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (!draggingRef.current || !meshRef.current || !e.face) return
    e.stopPropagation()
    const posAttr = geometry.attributes.position as THREE.BufferAttribute
    const local = meshRef.current.worldToLocal(e.point.clone())
    let best = e.face.a
    let bestDist = Infinity
    for (const idx of [e.face.a, e.face.b, e.face.c]) {
      const dx = posAttr.getX(idx) - local.x
      const dy = posAttr.getY(idx) - local.y
      const dz = posAttr.getZ(idx) - local.z
      const dist = dx * dx + dy * dy + dz * dz
      if (dist < bestDist) {
        bestDist = dist
        best = idx
      }
    }
    const vertex = data.flat[best]
    if (vertex) onProbe(vertex)
  }

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerDown={() => {
          draggingRef.current = true
        }}
        onPointerMove={handleMove}
      >
        <meshBasicMaterial vertexColors side={THREE.DoubleSide} />
      </mesh>
      <primitive object={ringLine} />
    </group>
  )
}

function Scene({ res, isMobile, onProbe }: { res: number; isMobile: boolean; onProbe: (v: SurfaceVertex) => void }) {
  const data = useMemo(() => buildGeometryData(res), [res])
  const { camera, invalidate } = useThree()
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const groupRef = useRef<THREE.Group>(null)
  const easeRef = useRef<number | null>(null)

  useEffect(() => {
    camera.position.set(
      Math.sin(DEFAULT_AZIMUTH) * Math.sin(DEFAULT_POLAR) * 3.4,
      Math.cos(DEFAULT_POLAR) * 3.4,
      Math.cos(DEFAULT_AZIMUTH) * Math.sin(DEFAULT_POLAR) * 3.4,
    )
    camera.lookAt(0, Y_SCALE * 0.35, 0)
  }, [camera])

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    const onEnd = () => {
      if (easeRef.current) cancelAnimationFrame(easeRef.current)
      const fromAzimuth = controls.getAzimuthalAngle()
      const fromPolar = controls.getPolarAngle()
      const radius = camera.position.distanceTo(controls.target)
      const start = performance.now()
      controls.enabled = false

      const tick = (now: number) => {
        const t = Math.min((now - start) / EASE_BACK_MS, 1)
        const eased = ease(t)
        const azimuth = THREE.MathUtils.lerp(fromAzimuth, DEFAULT_AZIMUTH, eased)
        const polar = THREE.MathUtils.lerp(fromPolar, DEFAULT_POLAR, eased)
        const offset = new THREE.Vector3().setFromSpherical(new THREE.Spherical(radius, polar, azimuth))
        camera.position.copy(controls.target).add(offset)
        camera.lookAt(controls.target)
        invalidate()
        if (t < 1) {
          easeRef.current = requestAnimationFrame(tick)
        } else {
          controls.enabled = true
          easeRef.current = null
        }
      }
      easeRef.current = requestAnimationFrame(tick)
    }

    controls.addEventListener('end', onEnd)
    return () => {
      controls.removeEventListener('end', onEnd)
      if (easeRef.current) cancelAnimationFrame(easeRef.current)
    }
  }, [camera, invalidate])

  const { gl } = useThree()
  useEffect(() => {
    if (isMobile) return
    const el = gl.domElement
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !groupRef.current) return
      const rect = el.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      groupRef.current.rotation.y = THREE.MathUtils.degToRad(nx * 3)
      groupRef.current.rotation.x = THREE.MathUtils.degToRad(ny * -3)
      invalidate()
    }
    const onLeave = () => {
      if (!groupRef.current) return
      groupRef.current.rotation.set(0, 0, 0)
      invalidate()
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [gl, invalidate, isMobile])

  return (
    <>
      <group ref={groupRef}>
        <Surface data={data} res={res} onProbe={onProbe} />
      </group>
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={MIN_POLAR}
        maxPolarAngle={MAX_POLAR}
        target={[0, Y_SCALE * 0.35, 0]}
        makeDefault
      />
    </>
  )
}

export default function OptionSurfaceScene() {
  // This component only ever mounts client-side (next/dynamic with
  // ssr:false), so window/navigator are guaranteed to exist here — the
  // capability checks can run as lazy initializers instead of an effect.
  const [isMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches)
  const [canRenderWebGL] = useState(() => {
    const nav = navigator as Navigator & { deviceMemory?: number }
    const lowEnd = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2
    const canvas = document.createElement('canvas')
    const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    return hasWebGL && !lowEnd
  })
  const midRow = Math.floor(DESKTOP_RES / 2)
  const [probe, setProbe] = useState<SurfaceVertex>(() => {
    const grid = buildSurfaceGrid(DESKTOP_RES, DESKTOP_RES)
    return grid[midRow][nearestSpotIndex(DESKTOP_RES)]
  })

  const res = isMobile ? MOBILE_RES : DESKTOP_RES

  // Keyboard path for the probe: the pointer-driven hover in <Surface> has
  // no keyboard equivalent, so focusing the canvas and pressing the arrow
  // keys walks the same ATM ring up/down through days-to-expiry. `res` is
  // fixed for the lifetime of this component (isMobile is only read once,
  // at mount), so a plain ref is enough to track the current row — no
  // effect needed to keep it in sync.
  const ringGrid = useMemo(() => buildSurfaceGrid(res, res), [res])
  const ringAtmIx = useMemo(() => nearestSpotIndex(res), [res])
  const ringRowRef = useRef(Math.floor(res / 2))

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      ringRowRef.current = Math.max(ringRowRef.current - 1, 0)
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      ringRowRef.current = Math.min(ringRowRef.current + 1, res - 1)
    } else {
      return
    }
    e.preventDefault()
    const vertex = ringGrid[ringRowRef.current]?.[ringAtmIx]
    if (vertex) setProbe(vertex)
  }

  if (!canRenderWebGL) return <OptionSurfaceHeatmap />

  return (
    <figure className="m-0 border border-hair bg-surface p-5 shadow-[0_18px_40px_-28px_rgba(18,21,28,0.35)]">
      <figcaption className="mb-3 flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
        <span>
          Fig. 08 live model – <span className="text-ink">Black-Scholes price surface</span>
        </span>
        <span>Drag to orbit</span>
      </figcaption>

      <div
        className="relative aspect-[16/9] w-full"
        tabIndex={0}
        role="group"
        aria-label={`Interactive Black-Scholes call premium surface across spot price and days to expiry, strike ${BS_PARAMS.strike}, rate ${(BS_PARAMS.rate * 100).toFixed(0)}%, volatility ${(BS_PARAMS.vol * 100).toFixed(0)}%. Drag to orbit with a pointer, or use arrow keys to move the highlighted ring position and read its values below.`}
        onKeyDown={handleKeyDown}
      >
        <Canvas
          frameloop="demand"
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 42, near: 0.1, far: 20 }}
        >
          <Scene res={res} isMobile={isMobile} onProbe={setProbe} />
        </Canvas>

        <div
          className="pointer-events-none absolute right-2 top-2 w-[172px] border border-hair bg-surface/95 p-2.5 font-mono text-[10.5px] leading-snug text-ink shadow-[0_10px_24px_-16px_rgba(18,21,28,0.4)]"
          aria-live="polite"
        >
          <div className="mb-1 text-[9.5px] uppercase tracking-[0.1em] text-ink-3">At ring position</div>
          <div>
            Spot <span className="text-cobalt">${probe.spot.toFixed(1)}</span>
          </div>
          <div>Days {probe.days.toFixed(0)}</div>
          <div>
            Premium <span className="text-cobalt">${probe.premium.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-6 border-t border-hair pt-3.5 font-mono text-[11px] text-ink-3">
        <div>Strike ${BS_PARAMS.strike}</div>
        <div>Rate {(BS_PARAMS.rate * 100).toFixed(0)}%</div>
        <div>Vol {(BS_PARAMS.vol * 100).toFixed(0)}%</div>
      </div>
    </figure>
  )
}
