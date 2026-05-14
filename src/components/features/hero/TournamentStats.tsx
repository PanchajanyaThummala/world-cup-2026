import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const STATS = [
  { value: 48, label: 'Teams' },
  { value: 12, label: 'Groups' },
  { value: 16, label: 'Venues' },
  { value: 104, label: 'Matches' },
  { value: 32, label: 'Days' },
]

function Stat({ value, label, index }: { value: number; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!isInView) return
    if (shouldReduce) { setCount(value); setCompleted(true); return }
    const startTime = performance.now()
    const duration = 1600
    let raf = 0
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(step)
      else setCompleted(true)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value, shouldReduce])

  return (
    <div ref={ref} className="relative flex flex-col items-center text-center py-6 px-2">
      {/* Gold gradient divider on the right (except last) */}
      {index < STATS.length - 1 && (
        <div
          className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.25), transparent)' }}
          aria-hidden="true"
        />
      )}

      <motion.p
        animate={completed && !shouldReduce ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="text-gold-400 tabular-nums leading-none"
        style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 'clamp(40px, 5vw, 56px)' }}
      >
        {count}
      </motion.p>
      <p
        className="text-neutral-500 uppercase mt-3"
        style={{ fontSize: 11, letterSpacing: '0.18em', fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </p>
    </div>
  )
}

export function TournamentStats() {
  return (
    <div
      className="w-full relative"
      style={{
        background: 'linear-gradient(180deg, #0D1117 0%, #080A0F 100%)',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      {/* Subtle horizontal gold accent line */}
      <div
        className="absolute top-1/2 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.06), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5"
        style={{ paddingLeft: 'var(--gutter-x)', paddingRight: 'var(--gutter-x)' }}
      >
        {STATS.map((s, i) => <Stat key={s.label} {...s} index={i} />)}
      </div>
    </div>
  )
}
