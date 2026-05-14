import { motion } from 'framer-motion'
import type { Venue } from '@/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCapacity } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion'

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
      className="min-w-0 h-full"
    >
      <Card hover className="h-full flex flex-col gap-5">
        {/* Final / Opening badge — only when applicable */}
        {(venue.isOpeningVenue || venue.isFinalVenue) && (
          <div className="absolute top-4 right-4">
            <Badge label={venue.isFinalVenue ? 'Final' : 'Opening'} variant="gold" />
          </div>
        )}

        {/* Venue name + location */}
        <div className="min-w-0">
          <h3
            className="text-neutral-50"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, lineHeight: 1.35 }}
          >
            {venue.name}
          </h3>
          <p
            className="text-neutral-400 mt-1"
            style={{ fontSize: 13, lineHeight: 1.5 }}
          >
            {venue.city}{venue.state ? `, ${venue.state}` : ''}
          </p>
        </div>

        {/* Divider + capacity */}
        {showCapacity && (
          <div
            className="mt-auto pt-5 flex items-baseline gap-2"
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
