import '@testing-library/jest-dom'

// jsdom ships neither matchMedia nor IntersectionObserver; framer-motion's
// useReducedMotion and useInView require both. Tests can override matchMedia
// to simulate prefers-reduced-motion.
export function mockMatchMedia(matchingQueries: string[] = []) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: matchingQueries.includes(query),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

mockMatchMedia()

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  root = null
  rootMargin = ''
  thresholds = []
}

if (typeof window.IntersectionObserver === 'undefined') {
  window.IntersectionObserver = IntersectionObserverStub as unknown as typeof IntersectionObserver
  globalThis.IntersectionObserver = window.IntersectionObserver
}
