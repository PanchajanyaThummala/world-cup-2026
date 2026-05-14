import { motion } from 'framer-motion'
import type { Venue } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCapacity } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'

const countryFlag: Record<string, string> = { USA: '🇺🇸', Canada: '🇨🇦', Mexico: '🇲🇽' }

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
    >
      <Card hover className="p-6 h-full flex flex-col gap-4 min-h-[180px]">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-neutral-50 font-bold text-base leading-snug flex-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {venue.name}
          </h3>
          {(venue.isOpeningVenue || venue.isFinalVenue) && (
            <Badge label={venue.isFinalVenue ? 'Final' : 'Opening'} variant="gold" />
          )}
        </div>

        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <span role="img" aria-label={venue.country} className="text-base">{countryFlag[venue.country]}</span>
          <span>{venue.city}{venue.state ? `, ${venue.state}` : ''}</span>
        </div>

        {showCapacity && (
          <p
            className="text-xs mt-auto pt-2 border-t"
            style={{ borderColor: 'rgba(31,41,55,0.5)' }}
          >
            <span
              className="text-gold-400 font-bold text-base"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {formatCapacity(venue.capacity)}
            </span>
            <span className="text-neutral-600 ml-2 uppercase tracking-widest" style={{ letterSpacing: '0.12em' }}>
              capacity
            </span>
          </p>
        )}
      </Card>
    </motion.div>
  )
}
