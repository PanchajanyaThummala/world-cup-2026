import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ImpactStoryCard } from './ImpactStoryCard'
import { IMPACT_STORIES } from '@/data/impact-stories'
import type { ImpactCategory } from '@/types'

const ALL = 'All'
const CATEGORIES = [ALL, 'Politics', 'Identity', 'Economics', 'Social', 'Human Rights', 'Diplomacy'] as const
type Filter = typeof CATEGORIES[number]

export function ImpactSection() {
  const [active, setActive] = useState<Filter>(ALL)

  const filtered = active === ALL
    ? IMPACT_STORIES
    : IMPACT_STORIES.filter(s => s.category === (active as ImpactCategory))

  return (
    <SectionWrapper id="impact" style={{ background: 'var(--color-bg-surface)' }} glowPosition="top-left">
      <SectionHeading
        eyebrow="Beyond the Pitch"
        sectionNum="04"
        title="How the World Cup Changed the World"
        subtitle="Politics, identity, power, and protest — the tournament that moves more than just football."
      />

      {/* Filter tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
        {CATEGORIES.map(cat => {
          const isActive = active === cat
          return (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                border: `1px solid ${isActive ? 'rgba(255,215,0,0.7)' : 'rgba(255,215,0,0.18)'}`,
                background: isActive ? 'rgba(255,215,0,0.1)' : 'transparent',
                color: isActive ? 'rgba(255,215,0,0.95)' : 'rgba(255,240,240,0.45)',
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </motion.button>
          )
        })}
      </div>

      {/* Cards grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((story, i) => (
            <ImpactStoryCard key={story.id} story={story} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  )
}
