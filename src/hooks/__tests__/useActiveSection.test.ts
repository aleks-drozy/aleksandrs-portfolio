import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useActiveSection } from '../useActiveSection'

describe('useActiveSection', () => {
  beforeEach(() => {
    const mockObserver = { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() }
    vi.stubGlobal('IntersectionObserver', vi.fn(() => mockObserver))
  })
  it('returns empty string as initial active section', () => {
    const { result } = renderHook(() => useActiveSection(['hero', 'about', 'skills']))
    expect(result.current).toBe('')
  })
  it('accepts an array of section ids without throwing', () => {
    expect(() => renderHook(() => useActiveSection(['hero', 'about', 'contact']))).not.toThrow()
  })
})
