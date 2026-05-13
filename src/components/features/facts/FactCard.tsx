import { motion } from 'framer-motion'
import type { DeepFact } from '@/types'
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

export function FactCard({ fact, index }: FactCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.05 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors duration-200"
    >
      <div className="mb-3">
        <Badge label={fact.category} variant={categoryVariant[fact.category] ?? 'neutral'} />
      </div>
      <p className="text-neutral-100 font-bold text-base leading-snug mb-3">{fact.hook}</p>
      <p className="text-neutral-500 text-sm leading-relaxed">{fact.supporting}</p>
    </motion.div>
  )
}
