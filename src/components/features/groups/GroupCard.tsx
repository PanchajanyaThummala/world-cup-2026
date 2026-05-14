import { motion } from 'framer-motion'
import type { Group } from '@/types'
import { Card } from '@/components/ui/Card'
import { StandingsTable } from './StandingsTable'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface GroupCardProps {
  group: Group
}

// T008: 3D rotateY flip-in entry
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
      className="h-full"
    >
      <Card hover className="p-6 h-full flex flex-col">
        <div className="flex items-baseline gap-3 mb-5">
          <span
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, lineHeight: 1, letterSpacing: '0.04em' }}
            className="text-gold-400"
          >
            {group.label}
          </span>
          <span className="text-neutral-500 text-xs uppercase tracking-widest" style={{ letterSpacing: '0.14em' }}>
            Group
          </span>
        </div>
        <StandingsTable standings={group.standings} compact />
      </Card>
    </motion.div>
  )
}
