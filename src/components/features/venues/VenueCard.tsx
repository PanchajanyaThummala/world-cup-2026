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
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }}>
      <Card hover className="p-5 h-full flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-neutral-100 font-bold text-sm leading-snug flex-1">{venue.name}</h3>
          {(venue.isOpeningVenue || venue.isFinalVenue) && (
            <Badge
              label={venue.isFinalVenue ? 'Final' : 'Opening'}
              variant="gold"
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-neutral-500 text-xs">
          <span role="img" aria-label={venue.country}>{countryFlag[venue.country]}</span>
          <span>{venue.city}{venue.state ? `, ${venue.state}` : ''}</span>
        </div>
        {showCapacity && (
          <p className="text-neutral-600 text-xs mt-auto">
            <span className="text-gold-500 font-semibold">{formatCapacity(venue.capacity)}</span> capacity
          </p>
        )}
      </Card>
    </motion.div>
  )
}
