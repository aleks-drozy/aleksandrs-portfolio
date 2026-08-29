import * as THREE from 'three'

// Pure geometry for the Evidence Rail's authored camera dolly, kept free of
// any @react-three/fiber or DOM dependency so it can be unit-tested directly
// (see evidence-rail-camera.test.ts) and imported by the scene component.
//
// Design: the camera dollies parallel to the row of slabs, offset sideways
// by a *constant* LATERAL_OFFSET and pulled back by a constant CAM_Z, and it
// always looks at a target that glides linearly along the row in lockstep
// with the camera. The rail is deliberately a straight-line polyline (not a
// curved Catmull-Rom spline) through the nine station points: with both the
// camera track and the look-target track being simple lerps between the same
// evenly-spaced x positions, the horizontal offset between camera-x and
// look-x is the *same constant* LATERAL_OFFSET at every value of t, not just
// at the nine station knots. That makes the yaw between the camera and the
// slab it is looking at exactly atan2(LATERAL_OFFSET, CAM_Z) everywhere along
// the rail, which keeps the "20-55 degree" grazing-angle safety rule true by
// construction rather than by tuning — the unit test below samples 100
// points along the rail to confirm it, but the bound is really a closed-form
// identity of this parameterization.

export const SLAB_SPACING = 2.4
export const LATERAL_OFFSET = 1.8
export const CAM_Z = 4.4
export const CAM_Y = 1.9
export const LOOK_Y = 1.0

export function slabX(index: number, count: number): number {
  return (index - (count - 1) / 2) * SLAB_SPACING
}

export function stationCameraPoint(index: number, count: number): THREE.Vector3 {
  return new THREE.Vector3(slabX(index, count) + LATERAL_OFFSET, CAM_Y, CAM_Z)
}

export function stationLookPoint(index: number, count: number): THREE.Vector3 {
  return new THREE.Vector3(slabX(index, count), LOOK_Y, 0)
}

/** A simple piecewise-linear "rail" through a fixed set of points, exposing
 *  the same `getPoint(t)` shape as three's spline curves so it drops
 *  straight into camera.position.copy(rail.getPoint(t)). */
export class PolylineRail {
  constructor(private readonly points: THREE.Vector3[]) {}

  getPoint(t: number, out = new THREE.Vector3()): THREE.Vector3 {
    const n = this.points.length
    if (n === 0) return out.set(0, 0, 0)
    if (n === 1) return out.copy(this.points[0])
    const clamped = THREE.MathUtils.clamp(t, 0, 1)
    const scaled = clamped * (n - 1)
    const i = Math.min(Math.floor(scaled), n - 2)
    const frac = scaled - i
    return out.copy(this.points[i]).lerp(this.points[i + 1], frac)
  }
}

export function buildRailCurves(count: number): {
  cameraCurve: PolylineRail
  lookCurve: PolylineRail
} {
  const cameraPoints = Array.from({ length: count }, (_, i) => stationCameraPoint(i, count))
  const lookPoints = Array.from({ length: count }, (_, i) => stationLookPoint(i, count))
  return {
    cameraCurve: new PolylineRail(cameraPoints),
    lookCurve: new PolylineRail(lookPoints),
  }
}

export function stationT(index: number, count: number): number {
  return count <= 1 ? 0 : index / (count - 1)
}

export function nearestStationIndex(t: number, count: number): number {
  if (count <= 1) return 0
  return Math.round(THREE.MathUtils.clamp(t, 0, 1) * (count - 1))
}

/** Angle in degrees, in the horizontal (XZ) plane, between the vector from
 *  `target` to `camera` and the slab face normal (0, 0, 1). Every slab faces
 *  +Z (the camera sits in front, at positive Z), so 0deg is dead-on and
 *  90deg is edge-on. */
export function yawDegrees(camera: THREE.Vector3, target: THREE.Vector3): number {
  const dx = camera.x - target.x
  const dz = camera.z - target.z
  return THREE.MathUtils.radToDeg(Math.abs(Math.atan2(dx, dz)))
}
