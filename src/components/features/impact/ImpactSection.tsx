import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ImpactStoryCard } from './ImpactStoryCard'
import { IMPACT_STORIES } from '@/data/impact-stories'
import { staggerContainer } from '@/lib/motion'

export function ImpactSection() {
  return (
    <SectionWrapper id="impact" style={{ background: 'var(--color-bg-surface)' }}>
      <SectionHeading
        eyebrow="Beyond the Pitch"
        title="How the World Cup Changed the World"
        subtitle="Politics, identity, power, and protest — the tournament that moves more than just football."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr"
      >
        {IMPACT_STORIES.map((story, i) => (
          <ImpactStoryCard key={story.id} story={story} index={i} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
