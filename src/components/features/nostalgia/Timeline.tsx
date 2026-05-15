import type { HistoricMoment } from '@/types'
import { MomentCard } from './MomentCard'

interface TimelineProps {
  moments: HistoricMoment[]
}

export function Timeline({ moments }: TimelineProps) {
  const sorted = [...moments].sort((a, b) => a.year - b.year)

  return (
    <div className="relative">
      {/* Center line — desktop only */}
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.2), transparent)' }}
      />

      <div className="flex flex-col gap-12">
        {sorted.map((moment, i) => (
          <MomentCard
            key={moment.id}
            moment={moment}
            side={i % 2 === 0 ? 'left' : 'right'}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
