import { motion } from 'framer-motion'
import type { DeepFact } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { fadeInUp } from '@/lib/motion'

const categoryVariant: Record<string, 'gold' | 'neutral'> = {
  Records: 'gold',
  Firsts: 'gold',
  Oddities: 'neutral',
  Stats: 'neutral',
  'Forgotten Heroes': 'neutral',
}

interface FactCardProps {
  fact: DeepFact
  index: number
}

// Deterministic pseudo-random delay for organic stagger
function organicDelay(index: number) {
  const seed = (index * 9301 + 49297) % 233280
  return (seed / 233280) * 0.18 + 0.04
}

export function FactCard({ fact, index }: FactCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: organicDelay(index) }}
    >
      <Card hover className="h-full flex flex-col">
        <div className="mb-4">
          <Badge label={fact.category} variant={categoryVariant[fact.category] ?? 'neutral'} />
        </div>
        <p
          className="text-neutral-50 font-bold text-lg mb-4 min-w-0"
          style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.4, overflowWrap: 'anywhere' }}
        >
          {fact.hook}
        </p>
        <p
          className="text-neutral-400 text-sm min-w-0"
          style={{ lineHeight: 1.65, overflowWrap: 'anywhere' }}
        >
          {fact.supporting}
        </p>
      </Card>
    </motion.div>
  )
}
