import { motion } from 'framer-motion'
import type { Venue } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCapacity } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'

const countryFlag: Record<string, string> = { USA: '🇺🇸', Canada: '🇨🇦', Mexico: '🇲🇽' }
const countryName: Record<string, string> = { USA: 'United States', Canada: 'Canada', Mexico: 'Mexico' }

interface VenueCardProps {
  venue: Venue
  showCapacity?: boolean
}

export function VenueCard({ venue, showCapacity = true }: VenueCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="min-w-0"
    >
      {/* Card: content-driven height, no fixed min-h, generous p-6 padding */}
      <Card hover className="p-6 h-full flex flex-col gap-4">
        {/* Final / Opening badge — top right (absolute, only when present) */}
        {(venue.isOpeningVenue || venue.isFinalVenue) && (
          <div className="absolute top-4 right-4">
            <Badge label={venue.isFinalVenue ? 'Final' : 'Opening'} variant="gold" />
          </div>
        )}

        {/* Row 1: country badge */}
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-sm leading-none">{countryFlag[venue.country]}</span>
          <span
            className="text-neutral-500 uppercase"
            style={{ fontSize: 10, letterSpacing: '0.14em', fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
          >
            {countryName[venue.country]}
          </span>
        </div>

        {/* Row 2: venue name + location */}
        <div>
          <h3
            className="text-neutral-50"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}
          >
            {venue.name}
          </h3>
          <p
            className="text-neutral-400 mt-1"
            style={{ fontSize: 13, lineHeight: 1.6 }}
          >
            {venue.city}{venue.state ? `, ${venue.state}` : ''}
          </p>
        </div>

        {/* Row 3: divider + capacity (only shown if showCapacity, no trailing whitespace) */}
        {showCapacity && (
          <div
            className="pt-4 flex items-baseline gap-2"
            style={{ borderTop: '1px solid rgba(31,41,55,0.6)' }}
          >
            <span
              className="text-gold-400"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 600, lineHeight: 1 }}
            >
              {formatCapacity(venue.capacity)}
            </span>
            <span
              className="text-neutral-600 uppercase"
              style={{ fontSize: 10, letterSpacing: '0.14em', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
            >
              capacity
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  )
}
