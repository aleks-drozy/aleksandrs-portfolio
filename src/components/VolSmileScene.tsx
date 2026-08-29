'use client'

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import * as THREE from 'three'
import { Canvas, type ThreeEvent, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { buildSmileLines, FLAT_VOL_REFERENCE, SPY_SNAPSHOT, type SmileLine } from '@/lib/spy-chain'
import { VolSmileChart } from './VolSmileChart'

const DESKTOP_LINES = 5
const MOBILE_LINES = 3
const X_SCALE = 1.7
const Y_SCALE = 1.3
const Z_SCALE = 1.1
const IV_MIN = 0.08
const IV_MAX = 0.28

const DEFAULT_AZIMUTH = 0.7
const DEFAULT_POLAR = THREE.MathUtils.degToRad(55)
const MIN_POLAR = THREE.MathUtils.degToRad(35)
const MAX_POLAR = THREE.MathUtils.degToRad(65)
const EASE_BACK_MS = 600

// Same cubic-bezier solver as OptionSurfaceScene, kept local so this figure
// has no import dependency on that file (they are siblings, not a shared
// hierarchy).
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

type Vertex = {
  x: number
  y: number
  z: number
  lineIx: number
  pointIx: number
  strike: number
  mid: number
  iv: number
  dte: number
  expiry: string
}

type GeometryData = {
  lines: SmileLine[]
  vertices: Vertex[][]
  merged: Vertex[]
  minStrike: number
  maxStrike: number
  atmPoints: Vertex[]
}

function xFor(strike: number, minStrike: number, maxStrike: number): number {
  const t = (strike - minStrike) / (maxStrike - minStrike || 1)
  return (t - 0.5) * 2 * X_SCALE
}

function yFor(iv: number): number {
  const t = Math.min(Math.max((iv - IV_MIN) / (IV_MAX - IV_MIN), 0), 1)
  return t * Y_SCALE
}

function buildGeometryData(lineCount: number): GeometryData {
  const allLines = buildSmileLines()
  const lines = allLines.slice(0, lineCount)
  const allStrikes = lines.flatMap((l) => l.points.map((p) => p.strike))
  const minStrike = Math.min(...allStrikes)
  const maxStrike = Math.max(...allStrikes)
  const spot = SPY_SNAPSHOT.spot

  const vertices: Vertex[][] = lines.map((line, li) => {
    const z = lines.length > 1 ? Z_SCALE - li * ((2 * Z_SCALE) / (lines.length - 1)) : 0
    return line.points.map((p, pi) => ({
      x: xFor(p.strike, minStrike, maxStrike),
      y: yFor(p.iv),
      z,
      lineIx: li,
      pointIx: pi,
      strike: p.strike,
      mid: p.mid,
      iv: p.iv,
      dte: line.dte,
      expiry: line.expiry,
    }))
  })

  const merged = vertices.flat()

  const atmPoints = vertices.map((row) =>
    row.reduce((best, v) => (Math.abs(v.strike - spot) < Math.abs(best.strike - spot) ? v : best)),
  )

  return { lines, vertices, merged, minStrike, maxStrike, atmPoints }
}

const washColor = new THREE.Color('#e9edfb')
const cobaltColor = new THREE.Color('#1e3fcc')

function colorFor(iv: number): THREE.Color {
  const t = Math.min(Math.max((iv - IV_MIN) / (IV_MAX - IV_MIN), 0), 1)
  return washColor.clone().lerp(cobaltColor, t)
}

function SmileLines({ data, onProbe }: { data: GeometryData; onProbe: (v: Vertex) => void }) {
  const draggingRef = useRef(false)

  useEffect(() => {
    const onUp = () => {
      draggingRef.current = false
    }
    window.addEventListener('pointerup', onUp)
    return () => window.removeEventListener('pointerup', onUp)
  }, [])

  // One THREE.Line per expiry, unlit + vertex-colored, opacity attenuated by
  // depth so the stack reads as depth without fog or lighting.
  const lineObjects = useMemo(() => {
    return data.vertices.map((row, li) => {
      const positions = new Float32Array(row.length * 3)
      const colors = new Float32Array(row.length * 3)
      row.forEach((v, i) => {
        positions[i * 3] = v.x
        positions[i * 3 + 1] = v.y
        positions[i * 3 + 2] = v.z
        const c = colorFor(v.iv)
        colors[i * 3] = c.r
        colors[i * 3 + 1] = c.g
        colors[i * 3 + 2] = c.b
      })
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      const opacity = data.vertices.length > 1 ? 1 - 0.45 * (li / (data.vertices.length - 1)) : 1
      const material = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity })
      return new THREE.Line(geometry, material)
    })
  }, [data])

  // Flat-vol reference: one dashed hairline per depth level, all at the same
  // implied-vol height, so the whole stack reads against a single flat plane.
  const flatRefObjects = useMemo(() => {
    const y = yFor(FLAT_VOL_REFERENCE)
    return data.vertices.map((row) => {
      const z = row[0]?.z ?? 0
      const x0 = -X_SCALE
      const x1 = X_SCALE
      const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x0, y, z), new THREE.Vector3(x1, y, z)])
      const material = new THREE.LineDashedMaterial({ color: '#e1e5ec', dashSize: 0.05, gapSize: 0.04, transparent: true, opacity: 0.9 })
      const line = new THREE.Line(geometry, material)
      line.computeLineDistances()
      return line
    })
  }, [data])

  // ATM tick: threads the nearest-to-spot point on every expiry into one
  // line, mirroring the OptionSurfaceScene ring construction exactly.
  const atmGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(data.atmPoints.map((v) => new THREE.Vector3(v.x, v.y + 0.012, v.z))),
    [data],
  )
  const atmMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: '#16309e', linewidth: 2 }), [])
  const atmLine = useMemo(() => new THREE.Line(atmGeometry, atmMaterial), [atmGeometry, atmMaterial])

  // Merged quoted-strike markers across every expiry, unlit points with the
  // same vertex colors as their host line.
  const pointsObject = useMemo(() => {
    const merged = data.merged
    const positions = new Float32Array(merged.length * 3)
    const colors = new Float32Array(merged.length * 3)
    merged.forEach((v, i) => {
      positions[i * 3] = v.x
      positions[i * 3 + 1] = v.y
      positions[i * 3 + 2] = v.z
      const c = colorFor(v.iv)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({ vertexColors: true, size: 0.028, sizeAttenuation: true, transparent: true })
    return new THREE.Points(geometry, material)
  }, [data])

  useEffect(() => {
    return () => {
      lineObjects.forEach((l) => {
        l.geometry.dispose()
        ;(l.material as THREE.Material).dispose()
      })
      flatRefObjects.forEach((l) => {
        l.geometry.dispose()
        ;(l.material as THREE.Material).dispose()
      })
      atmGeometry.dispose()
      atmMaterial.dispose()
      pointsObject.geometry.dispose()
      ;(pointsObject.material as THREE.Material).dispose()
    }
  }, [lineObjects, flatRefObjects, atmGeometry, atmMaterial, pointsObject])

  const handlePoint = (e: ThreeEvent<PointerEvent>) => {
    if (e.index === undefined) return
    const v = data.merged[e.index]
    if (v) onProbe(v)
  }

  return (
    <group>
      {lineObjects.map((l, i) => (
        <primitive key={data.vertices[i][0]?.expiry ?? i} object={l} />
      ))}
      {flatRefObjects.map((l, i) => (
        <primitive key={`flat-${i}`} object={l} />
      ))}
      <primitive object={atmLine} />
      <primitive
        object={pointsObject}
        onPointerDown={(e: ThreeEvent<PointerEvent>) => {
          draggingRef.current = true
          handlePoint(e)
        }}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          if (!draggingRef.current) return
          handlePoint(e)
        }}
      />
    </group>
  )
}

function Scene({ data, isMobile, onProbe }: { data: GeometryData; isMobile: boolean; onProbe: (v: Vertex) => void }) {
  const { camera, invalidate } = useThree()
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const groupRef = useRef<THREE.Group>(null)
  const easeRef = useRef<number | null>(null)
  const isOrbitingRef = useRef(false)

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

    const onStart = () => {
      isOrbitingRef.current = true
      if (groupRef.current) groupRef.current.rotation.set(0, 0, 0)
    }

    const onEnd = () => {
      isOrbitingRef.current = false
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

    controls.addEventListener('start', onStart)
    controls.addEventListener('end', onEnd)
    return () => {
      controls.removeEventListener('start', onStart)
      controls.removeEventListener('end', onEnd)
      if (easeRef.current) cancelAnimationFrame(easeRef.current)
    }
  }, [camera, invalidate])

  const { gl } = useThree()
  useEffect(() => {
    if (isMobile) return
    const el = gl.domElement
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !groupRef.current || isOrbitingRef.current) return
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
        <SmileLines data={data} onProbe={onProbe} />
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

export default function VolSmileScene() {
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

  const lineCount = isMobile ? MOBILE_LINES : DESKTOP_LINES
  const data = useMemo(() => buildGeometryData(lineCount), [lineCount])

  const [probe, setProbe] = useState<Vertex>(() => data.atmPoints[0])

  // Keyboard path for the probe: ArrowLeft/Right walk quoted strikes on the
  // current expiry, ArrowUp/Down switch expiry — refs because line/point
  // count is fixed for this component's lifetime.
  const lineIxRef = useRef(0)
  const pointIxRef = useRef(data.vertices[0].findIndex((v) => v.strike === data.atmPoints[0].strike))

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      pointIxRef.current = Math.max(pointIxRef.current - 1, 0)
    } else if (e.key === 'ArrowRight') {
      pointIxRef.current = Math.min(pointIxRef.current + 1, data.vertices[lineIxRef.current].length - 1)
    } else if (e.key === 'ArrowUp') {
      lineIxRef.current = Math.max(lineIxRef.current - 1, 0)
    } else if (e.key === 'ArrowDown') {
      lineIxRef.current = Math.min(lineIxRef.current + 1, data.vertices.length - 1)
    } else {
      return
    }
    e.preventDefault()
    const row = data.vertices[lineIxRef.current]
    pointIxRef.current = Math.min(pointIxRef.current, row.length - 1)
    const vertex = row[pointIxRef.current]
    if (vertex) setProbe(vertex)
  }

  if (!canRenderWebGL) return <VolSmileChart />

  const gapPp = (probe.iv - FLAT_VOL_REFERENCE) * 100

  return (
    <figure className="m-0 border border-hair bg-surface p-5 shadow-[0_18px_40px_-28px_rgba(18,21,28,0.35)]">
      <figcaption className="mb-3 flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
        <span>
          Fig. 02b market data – <span className="text-ink">SPY implied-volatility smile</span>
        </span>
        <span>Drag to orbit</span>
      </figcaption>

      <div
        className="relative aspect-[16/9] w-full"
        tabIndex={0}
        role="group"
        aria-label={`Interactive SPY implied volatility smile across ${data.vertices.length} real listed expiries, spot ${SPY_SNAPSHOT.spot.toFixed(2)}, captured ${SPY_SNAPSHOT.fetchedUtc.slice(0, 10)}. Every line bends away from the flat 15% volatility the neighboring Black-Scholes surface assumes. Drag to orbit with a pointer, or use arrow keys to move the highlighted strike and switch expiry, and read the values below.`}
        onKeyDown={handleKeyDown}
      >
        <Canvas
          frameloop="demand"
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 42, near: 0.1, far: 20 }}
          onCreated={(state) => {
            // Merged quoted-strike points sit close together at this scene
            // scale; widen the default hit-test threshold (1 world unit is
            // otherwise too tight here) so probing reliably lands on the
            // nearest marker. Set once, imperatively, on the raycaster this
            // canvas owns — not a mutation of a value returned from a hook.
            if (state.raycaster.params.Points) state.raycaster.params.Points.threshold = 0.05
          }}
        >
          <Scene data={data} isMobile={isMobile} onProbe={setProbe} />
        </Canvas>

        <div
          className="pointer-events-none absolute right-2 top-2 w-[172px] border border-hair bg-surface/95 p-2.5 font-mono text-[10.5px] leading-snug text-ink shadow-[0_10px_24px_-16px_rgba(18,21,28,0.4)]"
          aria-live="polite"
        >
          <div className="mb-1 text-[9.5px] uppercase tracking-[0.1em] text-ink-3">At probe</div>
          <div>Strike ${probe.strike.toFixed(0)}</div>
          <div>Expiry {probe.dte.toFixed(0)}d</div>
          <div>
            Mid <span className="text-cobalt">${probe.mid.toFixed(2)}</span>
          </div>
          <div>
            IV <span className="text-cobalt">{(probe.iv * 100).toFixed(1)}%</span>
          </div>
          <div>
            vs flat 15%{' '}
            <span className="text-cobalt">
              {gapPp >= 0 ? '+' : ''}
              {gapPp.toFixed(1)}pp
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-6 border-t border-hair pt-3.5 font-mono text-[11px] text-ink-3">
        <div>
          SPY chain · captured {SPY_SNAPSHOT.fetchedUtc.slice(0, 10)} · spot ${SPY_SNAPSHOT.spot.toFixed(2)} · mids inverted via
          bisection on load
        </div>
      </div>
    </figure>
  )
}
