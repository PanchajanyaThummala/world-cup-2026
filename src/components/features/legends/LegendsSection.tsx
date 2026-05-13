import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LegendCard } from './LegendCard'
import { LEGENDS } from '@/data/legends'
import { staggerContainer } from '@/lib/motion'

export function LegendsSection() {
  const [featured, ...rest] = LEGENDS

  return (
    <SectionWrapper id="legends" style={{ background: '#0D1117' } as React.CSSProperties}>
      <SectionHeading
        eyebrow="The Greats"
        title="Legends of the Game"
        subtitle="They didn't just play the World Cup — they defined it. Six players who left the game permanently changed."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
        }}
      >
        {/* Featured card — spans 1 col on mobile, 1 col left on desktop */}
        <div className="col-span-3 md:col-span-1 md:row-span-2">
          <LegendCard legend={featured} featured index={0} />
        </div>

        {/* Remaining 4 cards — 2×2 grid beside featured on desktop */}
        {rest.slice(0, 4).map((legend, i) => (
          <div key={legend.id} className="col-span-3 md:col-span-1">
            <LegendCard legend={legend} index={i + 1} />
          </div>
        ))}
      </motion.div>

      {/* Sixth legend — full width strip */}
      {rest[4] && (
        <div className="mt-4">
          <LegendCard legend={rest[4]} index={5} />
        </div>
      )}
    </SectionWrapper>
  )
}
