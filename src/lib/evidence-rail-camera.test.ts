import { describe, expect, it } from 'vitest'
import { evidenceStations } from './evidence-rail'
import { buildRailCurves, slabX, yawDegrees } from './evidence-rail-camera'

const COUNT = evidenceStations.length

describe('evidence rail camera curve', () => {
  it('keeps the camera yaw within the 20-55 degree grazing-angle safety bound', () => {
    const { cameraCurve, lookCurve } = buildRailCurves(COUNT)
    const samples = 100
    for (let s = 0; s <= samples; s++) {
      const t = s / samples
      const cameraPoint = cameraCurve.getPoint(t)
      const target = lookCurve.getPoint(t)
      const yaw = yawDegrees(cameraPoint, target)
      expect(yaw).toBeGreaterThanOrEqual(20)
      expect(yaw).toBeLessThanOrEqual(55)
    }
  })

  it('passes exactly through every station control point', () => {
    const { cameraCurve } = buildRailCurves(COUNT)
    for (let i = 0; i < COUNT; i++) {
      const t = i / (COUNT - 1)
      const point = cameraCurve.getPoint(t)
      expect(point.x).toBeCloseTo(slabX(i, COUNT) + 1.8, 5)
    }
  })
})
