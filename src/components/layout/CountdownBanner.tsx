import { motion } from 'framer-motion'
import { useCountdown, type CountdownState } from '@/hooks/useCountdown'

const TARGET = '2026-06-11T20:00:00-04:00'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function Segment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span
        className="text-gold-400 tabular-nums"
        style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1 }}
      >
        {pad(value)}
      </span>
      <span className="text-neutral-500 uppercase" style={{ fontSize: 9, letterSpacing: '0.14em' }}>
        {label}
      </span>
    </div>
  )
}

export function CountdownBanner() {
  const state: CountdownState = useCountdown(TARGET)

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="banner"
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center"
      style={{
        height: 'var(--banner-h)',
        background: 'linear-gradient(180deg, rgba(8,10,15,0.98) 0%, rgba(13,17,23,0.92) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(201,168,76,0.18)',
      }}
    >
      <div className="flex items-center gap-4 md:gap-6 px-4 text-center flex-wrap justify-center">
        {state.phase === 'countdown' ? (
          <>
            <span
              className="text-gold-500 uppercase font-bold whitespace-nowrap"
              style={{ fontSize: 10, letterSpacing: '0.2em', fontFamily: "'Inter', sans-serif" }}
            >
              KICKOFF IN
            </span>
            <div className="flex items-center gap-3 md:gap-4">
              <Segment value={state.days} label="Days" />
              <span className="text-neutral-700" aria-hidden="true">·</span>
              <Segment value={state.hours} label="Hours" />
              <span className="text-neutral-700" aria-hidden="true">·</span>
              <Segment value={state.minutes} label="Minutes" />
              <span className="text-neutral-700" aria-hidden="true">·</span>
              <Segment value={state.seconds} label="Seconds" />
            </div>
            <span
              className="hidden md:inline text-neutral-500 whitespace-nowrap"
              style={{ fontSize: 11, fontFamily: "'Inter', sans-serif" }}
            >
              Mexico v TBD · Estadio Azteca
            </span>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }}
              aria-hidden="true"
            />
            <span
              className="text-neutral-100 font-bold uppercase"
              style={{ fontSize: 11, letterSpacing: '0.18em', fontFamily: "'Inter', sans-serif" }}
            >
              Tournament Live
            </span>
            <span className="text-neutral-500" style={{ fontSize: 11 }}>
              Matchday {state.matchday}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
