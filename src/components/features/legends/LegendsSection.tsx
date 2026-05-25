import React from 'react'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LegendCard } from './LegendCard'
import { LEGENDS } from '@/data/legends'
import { staggerContainer } from '@/lib/motion'

export function LegendsSection() {
  const [featured, ...rest] = LEGENDS

  return (
    <SectionWrapper id="legends" style={{ background: 'var(--color-bg-base)' } as React.CSSProperties} glowPosition="top-right">
      <SectionHeading
        eyebrow="The Greats"
        sectionNum="05"
        title="Legends of the Game"
        subtitle="They didn't just play the World Cup — they defined it. Seven players who left the game permanently changed."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="flex flex-col md:flex-row gap-6"
      >
        {/* Pelé — tall hero left column */}
        <div className="md:w-5/12 flex-shrink-0 flex flex-col">
          <LegendCard legend={featured} featured index={0} />
        </div>

        {/* Remaining 6 — uniform 2×3 equal grid */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {rest.map((legend, i) => (
            <LegendCard key={legend.id} legend={legend} index={i + 1} />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
