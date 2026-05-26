import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FactCard } from './FactCard'
import { DEEP_FACTS } from '@/data/facts'
import type { FactCategory } from '@/types'

const ALL = 'All'
const CATEGORIES = [ALL, 'Records', 'Firsts', 'Oddities', 'Stats', 'Forgotten Heroes'] as const
type Filter = typeof CATEGORIES[number]

export function FactsSection() {
  const [active, setActive] = useState<Filter>(ALL)

  const filtered = active === ALL
    ? DEEP_FACTS
    : DEEP_FACTS.filter(f => f.category === (active as FactCategory))

  return (
    <SectionWrapper id="facts" style={{ background: 'var(--color-bg-base)' }} glowPosition="top-left">
      <SectionHeading
        eyebrow="The Untold Story"
        sectionNum="06"
        title="Facts That Will Change How You See the World Cup"
        subtitle="Records, curiosities, and forgotten heroes from 96 years of football's greatest stage."
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
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((fact, i) => (
            <FactCard key={fact.id} fact={fact} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  )
}
