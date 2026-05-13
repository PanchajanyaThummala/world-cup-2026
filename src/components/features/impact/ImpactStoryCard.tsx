import { motion } from 'framer-motion'
import type { ImpactStory } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { scaleIn } from '@/lib/motion'

interface ImpactStoryCardProps {
  story: ImpactStory
  index: number
}

export function ImpactStoryCard({ story, index }: ImpactStoryCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-gold-500/40 transition-colors duration-300 overflow-hidden"
    >
      {/* Gold left border accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-neutral-600 text-xs mb-1">{story.tournament}</p>
          <Badge label={story.eraBadge} variant="gold" />
        </div>
        <Badge label={story.category} variant="outline" />
      </div>

      <h3 className="text-neutral-100 font-bold text-lg leading-snug mb-3">{story.title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{story.narrative}</p>
    </motion.div>
  )
}
