import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GroupCard } from './GroupCard'
import { GroupsBackground } from './GroupsBackground'
import { GROUPS } from '@/data/groups'
import { staggerContainer } from '@/lib/motion'

export function GroupsSection() {
  return (
    <SectionWrapper id="groups" style={{ background: 'var(--color-bg-base)' }} glowPosition="top-right" backgroundLayer={<GroupsBackground />}>
      <SectionHeading
        eyebrow="48 Teams · 12 Groups"
        title="The Group Stage"
        subtitle="Every nation's journey starts here. The top two from each group advance to the Round of 32."
        sectionNum="01"
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr"
      >
        {GROUPS.map(group => (
          <GroupCard key={group.label} group={group} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
