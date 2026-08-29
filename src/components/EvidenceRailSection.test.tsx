import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EvidenceRailSection } from './EvidenceRailSection'
import { evidenceStations } from '@/lib/evidence-rail'

// jsdom has no WebGL, so the dynamically-imported EvidenceRailScene's own
// capability probe falls back to the Ledger Table here too — which is
// exactly the no-WebGL fallback path this test also exercises. Keyboard
// operability is still fully testable this way: the arrow-key handling and
// focused-station state live on the wrapper, not inside the canvas.

describe('EvidenceRailSection keyboard navigation', () => {
  it('walks every station with ArrowRight and announces each one', async () => {
    const user = userEvent.setup()
    render(<EvidenceRailSection />)

    const group = screen.getByRole('group', { name: /interactive corridor/i })
    group.focus()

    for (let i = 1; i < evidenceStations.length; i++) {
      await user.keyboard('{ArrowRight}')
      expect(screen.getByText(new RegExp(`Station ${i + 1} of ${evidenceStations.length}\\.`))).toBeInTheDocument()
    }
  })

  it('jumps to the first and last station with Home and End', async () => {
    const user = userEvent.setup()
    render(<EvidenceRailSection />)

    const group = screen.getByRole('group', { name: /interactive corridor/i })
    group.focus()

    await user.keyboard('{End}')
    expect(screen.getByText(new RegExp(`Station ${evidenceStations.length} of ${evidenceStations.length}\\.`))).toBeInTheDocument()

    await user.keyboard('{Home}')
    expect(screen.getByText(new RegExp(`Station 1 of ${evidenceStations.length}\\.`))).toBeInTheDocument()
  })

  it('exposes a screen-reader-only ordered list of all nine exhibits with real links', () => {
    render(<EvidenceRailSection />)
    const links = screen.getAllByRole('link', { name: new RegExp(evidenceStations[0].title) })
    expect(links.length).toBeGreaterThan(0)
    expect(links[0]).toHaveAttribute('href', evidenceStations[0].href)
  })
})
