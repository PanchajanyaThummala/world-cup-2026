import { motion } from 'framer-motion'
import type { ImpactStory } from '@/types'
import { Card } from '@/components/ui/Card'
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
    >
      <Card hover className="p-7 h-full relative overflow-hidden">
        {/* Gold left accent bar */}
        <div
          className="absolute left-0 top-6 bottom-6 w-0.5"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.6), transparent)' }}
        />

        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-neutral-500 text-xs mb-2 uppercase tracking-widest" style={{ letterSpacing: '0.12em' }}>
              {story.tournament}
            </p>
            <Badge label={story.eraBadge} variant="gold" size="md" />
          </div>
          <Badge label={story.category} variant="outline" />
        </div>

        <h3
          className="text-neutral-50 font-bold text-xl leading-snug mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {story.title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed">{story.narrative}</p>
      </Card>
    </motion.div>
  )
}
