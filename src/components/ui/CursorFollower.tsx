import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export function CursorFollower() {
  const shouldReduce = useReducedMotion()
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const trailX = useMotionValue(-200)
  const trailY = useMotionValue(-200)

  const springConfig = { damping: 28, stiffness: 280, mass: 0.6 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const trailConfig = { damping: 40, stiffness: 180, mass: 1 }
  const trailSpringX = useSpring(trailX, trailConfig)
  const trailSpringY = useSpring(trailY, trailConfig)

  const visibleRef = useRef(false)

  useEffect(() => {
    if (shouldReduce) return
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
      visibleRef.current = true
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY, trailX, trailY, shouldReduce])

  if (shouldReduce) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 10000,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#FFD700',
          boxShadow: '0 0 12px rgba(255,215,0,0.8)',
        }}
      />
      {/* Trail ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: trailSpringX,
          y: trailSpringY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(255,215,0,0.4)',
        }}
      />
    </>
  )
}
