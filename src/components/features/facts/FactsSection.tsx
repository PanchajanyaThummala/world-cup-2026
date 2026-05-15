import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FactCard } from './FactCard'
import { DEEP_FACTS } from '@/data/facts'
import { staggerContainer } from '@/lib/motion'

export function FactsSection() {
  return (
    <SectionWrapper id="facts" style={{ background: 'var(--color-bg-base)' }}>
      <SectionHeading
        eyebrow="The Untold Story"
        title="Facts That Will Change How You See the World Cup"
        subtitle="Records, curiosities, and forgotten heroes from 96 years of football's greatest stage."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
      >
        {DEEP_FACTS.map((fact, i) => (
          <FactCard key={fact.id} fact={fact} index={i} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
