import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VenueCard } from './VenueCard'
import { VENUES } from '@/data/venues'
import { staggerContainer } from '@/lib/motion'
import type { HostCountry } from '@/types'

const COUNTRY_LABELS: Record<HostCountry, { label: string; flag: string }> = {
  USA: { label: 'United States', flag: '🇺🇸' },
  Canada: { label: 'Canada', flag: '🇨🇦' },
  Mexico: { label: 'Mexico', flag: '🇲🇽' },
}

export function VenuesSection() {
  const byCountry = (['USA', 'Canada', 'Mexico'] as HostCountry[]).map(country => ({
    country,
    venues: VENUES.filter(v => v.country === country),
    ...COUNTRY_LABELS[country],
  }))

  return (
    <SectionWrapper id="venues" style={{ background: 'var(--color-bg-surface)' }}>
      <SectionHeading
        eyebrow="16 Stadiums · 3 Nations"
        title="The Host Venues"
        subtitle="From the iconic Azteca to MetLife's record-breaking capacity — the stages are set."
      />
      <div className="space-y-12">
        {byCountry.map(({ country, venues, label, flag }) => (
          <div key={country}>
            <div className="flex items-center gap-3 mb-6">
              <span role="img" aria-label={label} className="text-2xl">{flag}</span>
              <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{label}</h3>
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>({venues.length} venues)</span>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr"
            >
              {venues.map(venue => <VenueCard key={venue.id} venue={venue} />)}
            </motion.div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
