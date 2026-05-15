import { motion } from 'framer-motion'
import type { Group } from '@/types'
import { Card } from '@/components/ui/Card'
import { StandingsTable } from './StandingsTable'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface GroupCardProps {
  group: Group
}

const flipInVariants = {
  hidden: { opacity: 0, rotateY: -12, y: 24 },
  visible: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <motion.div
      variants={flipInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="h-full min-w-0"
    >
      <Card hover className="h-full flex flex-col">
        <div className="flex items-baseline gap-3 mb-6">
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 36,
              lineHeight: 1,
              letterSpacing: 0,
            }}
            style={{ color: 'var(--color-primary)' }}
          >
            {group.label}
          </span>
          <span
            className="uppercase"
            style={{ color: 'var(--color-text-secondary)', fontSize: 11, letterSpacing: '0.12em', fontFamily: "'Inter', sans-serif" }}
            style={{ fontSize: 11, letterSpacing: '0.12em', fontFamily: "'Inter', sans-serif" }}
          >
            Group
          </span>
        </div>
        <StandingsTable standings={group.standings} compact />
      </Card>
    </motion.div>
  )
}
