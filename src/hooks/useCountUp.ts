import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!isInView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return { count, ref }
}
