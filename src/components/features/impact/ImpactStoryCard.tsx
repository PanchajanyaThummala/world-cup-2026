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
      className="min-w-0"
    >
      <Card hover className="p-7 h-full overflow-hidden">
        {/* Gold left accent bar — decorative, sits at z-0 (default) */}
        <div
          className="absolute left-0 top-6 bottom-6 w-0.5"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.6), transparent)',
            zIndex: 0,
          }}
        />

        {/* Card body — content layer renders above accent bar.
            Card primitive already wraps in z-index:1 div, but ImpactStoryCard
            adds its own overflow-hidden on the Card so we re-establish the
            content layer here too. */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="min-w-0 flex-1">
            <p
              className="text-neutral-500 text-xs mb-2 uppercase"
              style={{ letterSpacing: '0.12em' }}
            >
              {story.tournament}
            </p>
            <Badge label={story.eraBadge} variant="gold" size="md" />
          </div>
          <Badge label={story.category} variant="outline" />
        </div>

        <h3
          className="text-neutral-50 font-bold text-xl mb-3"
          style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.3 }}
        >
          {story.title}
        </h3>
        <p
          className="text-neutral-400 text-sm"
          style={{ lineHeight: 1.65 }}
        >
          {story.narrative}
        </p>
      </Card>
    </motion.div>
  )
}
