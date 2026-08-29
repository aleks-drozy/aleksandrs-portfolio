'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, type ThreeEvent, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { evidenceStations, type EvidenceStation } from '@/lib/evidence-rail'
import { SLAB_SPACING, buildRailCurves, nearestStationIndex, slabX, stationT } from '@/lib/evidence-rail-camera'
import { EvidenceLedgerTable } from './EvidenceLedgerTable'

const EASE_MS = 600
const SLAB_WIDTH = 1.2
const SLAB_DEPTH = 0.5
const MAX_SLAB_HEIGHT = 2.6
const MIN_SLAB_HEIGHT = 1.0
const VERDICT_BLOCK_HEIGHT = 0.18
const N = evidenceStations.length

// Matches the [0.23, 1, 0.32, 1] curve used across the site (BlurText,
// EquityCurve, OptionSurfaceScene's ease-back) — see OptionSurfaceScene.tsx
// for the same helper.
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

function heightForScore(score: number): number {
  const t = (score - 1) / Math.max(N - 1, 1)
  return MIN_SLAB_HEIGHT + t * (MAX_SLAB_HEIGHT - MIN_SLAB_HEIGHT)
}

// The scene takes commands as a plain prop rather than an imperative ref
// handle — next/dynamic-wrapped components have historically inconsistent
// ref-forwarding behavior across Next versions, so a `command` value plus a
// monotonic `nonce` (bump it to re-fire the same command, e.g. "Prev" twice
// in a row) is the more robust way to drive the single-writer camera state
// machine from the parent's keyboard/button handlers.
export type EvidenceRailCommand = { type: 'goTo' | 'step'; value: number; nonce: number }

type SlabProps = {
  station: EvidenceStation
  height: number
  focused: boolean
  hovered: boolean
  onHover: (i: number | null) => void
  onSelect: (i: number) => void
}

// One physical monolith: the slab body (height = evidence score), a verdict
// block at the top in the site's real pos/neg tokens, and three metric-bar
// reliefs on the face — all real extruded geometry, never a 1px line, so the
// scene degrades gracefully at any viewing angle (cameraSafetyRules #3b).
function Slab({ station, height, focused, hovered, onHover, onSelect }: SlabProps) {
  const x = slabX(station.index, N)

  const bodyColor = focused ? '#1e3fcc' : hovered ? '#3a5bef' : '#e9edfb'
  const verdictColor = station.verdict === 'pos' ? '#0f7a52' : '#b23b32'

  const barCount = Math.min(station.metrics.length, 3) || 1
  const bars = useMemo(
    () =>
      Array.from({ length: barCount }, (_, i) => ({
        // Ordinal bar heights (tallest = first/primary metric) — a real
        // relief of the exhibit's own metric count, not a decorative motif.
        h: 0.28 - i * 0.07,
        z: SLAB_DEPTH / 2 + 0.02,
        x: (i - (barCount - 1) / 2) * 0.22,
      })),
    [barCount],
  )

  return (
    <group position={[x, 0, 0]}>
      <mesh
        position={[0, height / 2, 0]}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          onHover(station.index)
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          onHover(null)
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation()
          onSelect(station.index)
        }}
      >
        <boxGeometry args={[SLAB_WIDTH, height, SLAB_DEPTH]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} />
      </mesh>

      {/* verdict block, chamfered visually by sitting proud of the slab top */}
      <mesh position={[0, height + VERDICT_BLOCK_HEIGHT / 2, 0]}>
        <boxGeometry args={[SLAB_WIDTH * 0.7, VERDICT_BLOCK_HEIGHT, SLAB_DEPTH * 0.7]} />
        <meshStandardMaterial color={verdictColor} roughness={0.6} />
      </mesh>

      {/* metric-bar reliefs on the front face */}
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 + 0.08, b.z]}>
          <boxGeometry args={[0.12, b.h, 0.03]} />
          <meshStandardMaterial color={focused ? '#ffffff' : '#16309e'} roughness={0.5} />
        </mesh>
      ))}

      {/* Real DOM text projected over the canvas, not canvas-painted glyphs —
          avoids mounting nine simultaneous troika-three-text SDF generators
          (which was crashing the WebGL context) and keeps this label in the
          accessibility tree like every other piece of real content. */}
      <Html
        position={[0, height + VERDICT_BLOCK_HEIGHT + 0.2, 0]}
        center
        distanceFactor={6}
        style={{ pointerEvents: 'none' }}
      >
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-ink">
          {station.fig}
        </span>
      </Html>
    </group>
  )
}

function GroundAndHairlines() {
  const geometry = useMemo(() => new THREE.PlaneGeometry(SLAB_SPACING * N + 6, 6), [])
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: '#f5f7fa', roughness: 1 }), [])
  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )
  return <mesh geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} />
}

function Scene({
  focusedIndex,
  onFocusChange,
  command,
}: {
  focusedIndex: number
  onFocusChange: (i: number) => void
  command: EvidenceRailCommand | null
}) {
  const { camera, invalidate, gl } = useThree()
  const { cameraCurve, lookCurve } = useMemo(() => buildRailCurves(N), [])

  // Single source of truth for camera position: exactly one of drag,
  // keyboard-driven ease, or click-driven ease may write `tRef` at a time,
  // gated by `modeRef`. This is the same single-writer pattern as
  // OptionSurfaceScene's isOrbitingRef, generalized to three states because
  // the rail additionally supports a drag-scrub mode that OrbitControls
  // handled internally there.
  const tRef = useRef(stationT(focusedIndex, N))
  const modeRef = useRef<'idle' | 'scrubbing' | 'easing'>('idle')
  const easeRafRef = useRef<number | null>(null)
  const dragStartXRef = useRef(0)
  const dragStartTRef = useRef(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const applyT = (t: number) => {
    tRef.current = THREE.MathUtils.clamp(t, 0, 1)
    const camPoint = cameraCurve.getPoint(tRef.current)
    const lookPoint = lookCurve.getPoint(tRef.current)
    camera.position.copy(camPoint)
    camera.lookAt(lookPoint)
    invalidate()
  }

  useEffect(() => {
    applyT(tRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cancelEase = () => {
    if (easeRafRef.current !== null) {
      cancelAnimationFrame(easeRafRef.current)
      easeRafRef.current = null
    }
  }

  const easeToStation = (index: number) => {
    const clampedIndex = THREE.MathUtils.clamp(index, 0, N - 1)
    cancelEase()
    modeRef.current = 'easing'
    const from = tRef.current
    const to = stationT(clampedIndex, N)
    const start = performance.now()
    const tick = (now: number) => {
      const frac = Math.min((now - start) / EASE_MS, 1)
      applyT(THREE.MathUtils.lerp(from, to, ease(frac)))
      if (frac < 1) {
        easeRafRef.current = requestAnimationFrame(tick)
      } else {
        modeRef.current = 'idle'
        easeRafRef.current = null
        onFocusChange(clampedIndex)
      }
    }
    easeRafRef.current = requestAnimationFrame(tick)
  }

  // Applies external commands (keyboard arrows, prev/next buttons, sr-only
  // link Enter) from the parent. Keyed off `command`'s identity/nonce so a
  // repeated command (e.g. "step -1" twice) still fires each time.
  useEffect(() => {
    if (!command) return
    if (command.type === 'goTo') {
      easeToStation(command.value)
    } else {
      const current = nearestStationIndex(tRef.current, N)
      easeToStation(current + command.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command])

  // Pointer-drag scrubbing, mounted on the canvas element directly (not via
  // R3F onPointerMove) so it keeps working even while the pointer is over
  // empty space between slabs, not just over mesh surfaces.
  useEffect(() => {
    const el = gl.domElement
    const onDown = (e: PointerEvent) => {
      // Touch drags are left to native page scroll (matches OptionSurfaceScene's
      // `if (isMobile) return` precedent) rather than competing with it for a
      // horizontal scrub gesture.
      if (e.pointerType === 'touch') return
      if (modeRef.current === 'easing') cancelEase()
      modeRef.current = 'scrubbing'
      dragStartXRef.current = e.clientX
      dragStartTRef.current = tRef.current
      el.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (modeRef.current !== 'scrubbing') return
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - dragStartXRef.current) / rect.width
      // Dragging right moves the "camera" forward through stations, i.e.
      // increases t — friction factor keeps a full-width drag short of a
      // full pass through all nine stations for a controllable feel.
      applyT(dragStartTRef.current - dx * 1.4)
    }
    const onUp = () => {
      if (modeRef.current !== 'scrubbing') return
      modeRef.current = 'idle'
      const nearest = nearestStationIndex(tRef.current, N)
      easeToStation(nearest)
    }
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      cancelEase()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl])

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 4]} intensity={0.9} />
      <GroundAndHairlines />
      {evidenceStations.map((station) => (
        <Slab
          key={station.slug}
          station={station}
          height={heightForScore(station.score)}
          focused={station.index === focusedIndex}
          hovered={station.index === hoverIndex}
          onHover={setHoverIndex}
          onSelect={(i) => easeToStation(i)}
        />
      ))}
    </>
  )
}

export function EvidenceRailScene({
  focusedIndex,
  onFocusChange,
  command,
}: {
  focusedIndex: number
  onFocusChange: (i: number) => void
  command: EvidenceRailCommand | null
}) {
  // Client-only capability probe, same pattern as OptionSurfaceScene: this
  // component only ever mounts via next/dynamic with ssr:false, so
  // window/navigator are guaranteed present as lazy initializers.
  const [canRenderWebGL] = useState(() => {
    const nav = navigator as Navigator & { deviceMemory?: number }
    const lowEnd = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2
    const canvas = document.createElement('canvas')
    const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    return hasWebGL && !lowEnd
  })
  const [isMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches)

  if (!canRenderWebGL) return <EvidenceLedgerTable />

  return (
    <Canvas
      frameloop="demand"
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: false }}
      camera={{ fov: 42, near: 0.1, far: 30 }}
      // wheel events are never handled here, so page scroll always passes
      // through untouched — the canvas simply never calls preventDefault.
      // touch-action: pan-y lets vertical page scroll proceed natively over
      // the canvas since drag-scrub is touch-guarded off in the pointer
      // handlers below (belt-and-braces against any future touch path).
      style={{ touchAction: 'pan-y' }}
    >
      <color attach="background" args={['#f5f7fa']} />
      <Scene focusedIndex={focusedIndex} onFocusChange={onFocusChange} command={command} />
    </Canvas>
  )
}
