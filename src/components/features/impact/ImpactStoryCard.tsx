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
      <Card hover className="h-full overflow-hidden flex flex-col">
        {/* Gold left accent bar — decorative, sits at z-0 (default) */}
        <div
          className="absolute left-0 top-6 bottom-6 w-0.5"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,215,0,0.5), transparent)',
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
              className="text-xs mb-2 uppercase"
            style={{ color: 'var(--color-text-secondary)' }}
              style={{ letterSpacing: '0.12em' }}
            >
              {story.tournament}
            </p>
            <Badge label={story.eraBadge} variant="gold" size="md" />
          </div>
          <Badge label={story.category} variant="outline" />
        </div>

        <h3
          className="font-bold text-xl mb-3 min-w-0"
          style={{ color: 'var(--color-text-primary)' }}
          style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.3, overflowWrap: 'anywhere' }}
        >
          {story.title}
        </h3>
        <p
          className="text-sm min-w-0"
          style={{ color: 'rgba(255,240,240,0.7)' }}
          style={{ lineHeight: 1.65, overflowWrap: 'anywhere' }}
        >
          {story.narrative}
        </p>
      </Card>
    </motion.div>
  )
}
