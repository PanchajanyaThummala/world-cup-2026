import '@testing-library/jest-dom'

// Framer Motion uses IntersectionObserver for whileInView — mock for jsdom
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

// Canvas not supported in jsdom — stub getContext
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  fillStyle: '',
  globalAlpha: 1,
  shadowBlur: 0,
  shadowColor: '',
}) as unknown as typeof HTMLCanvasElement.prototype.getContext
