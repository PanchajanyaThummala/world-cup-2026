import { motion } from 'framer-motion'
import type { Group } from '@/types'
import { Card } from '@/components/ui/Card'
import { StandingsTable } from './StandingsTable'
import { scaleIn } from '@/lib/motion'

interface GroupCardProps {
  group: Group
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <Card hover className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gold-400 font-black text-xl">{group.label}</span>
          <span className="text-neutral-600 text-sm">{group.name}</span>
        </div>
        <StandingsTable standings={group.standings} compact />
      </Card>
    </motion.div>
  )
}
