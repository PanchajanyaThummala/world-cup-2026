import { useCountUp } from '@/hooks/useCountUp'

const STATS = [
  { value: 48, label: 'Teams' },
  { value: 12, label: 'Groups' },
  { value: 16, label: 'Venues' },
  { value: 104, label: 'Matches' },
  { value: 32, label: 'Days' },
]

function Stat({ value, label }: { value: number; label: string }) {
  const { count, ref } = useCountUp(value, 1800)
  return (
    <div className="text-center px-8 py-8 flex flex-col items-center">
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        style={{ fontFamily: "'Oswald', sans-serif" }}
        className="text-5xl md:text-6xl font-bold text-gold-400 leading-none tabular-nums"
      >
        {count}
      </p>
      <p
        className="text-neutral-500 text-xs uppercase mt-3 tracking-widest"
        style={{ letterSpacing: '0.14em' }}
      >
        {label}
      </p>
    </div>
  )
}

export function TournamentStats() {
  return (
    <div
      className="w-full"
      style={{ background: '#0D1117', borderTop: '1px solid rgba(31,41,55,0.6)', borderBottom: '1px solid rgba(31,41,55,0.6)' }}
    >
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center divide-x divide-neutral-800">
        {STATS.map(s => <Stat key={s.label} {...s} />)}
      </div>
    </div>
  )
}
