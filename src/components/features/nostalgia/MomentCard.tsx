import { motion } from 'framer-motion'
import type { HistoricMoment } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { slideInLeft, slideInRight } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MomentCardProps {
  moment: HistoricMoment
  side: 'left' | 'right'
  index: number
}

export function MomentCard({ moment, side, index }: MomentCardProps) {
  const baseVariant = side === 'left' ? slideInLeft : slideInRight
  const variants = useReducedMotion(baseVariant)

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.04 }}
      className={`flex ${side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col gap-8 items-start`}
    >
      {/* Year marker */}
      <div className="flex-shrink-0 md:w-28 flex flex-col items-start md:items-end gap-1 pt-1">
        <span
          style={{ fontFamily: "'Oswald', sans-serif" }}
          className="text-gold-400 font-bold text-4xl leading-none"
        >
          {moment.year}
        </span>
        <span className="text-neutral-600 text-xs uppercase tracking-wider">{moment.host}</span>
      </div>

      {/* Card — overflow visible on outer wrapper so significance line never clips.
          The photo header below has its own overflow-hidden scope. */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="flex-1 rounded-xl"
        style={{
          border: '1px solid rgba(31,41,55,0.8)',
          background: 'rgba(13,17,23,0.9)',
          minWidth: 0,
        }}
      >
        {/* Photo header (own clipping scope, rounded top corners) */}
        {moment.photo ? (
          <div
            className="relative h-40 overflow-hidden"
            style={{ borderTopLeftRadius: 11, borderTopRightRadius: 11 }}
          >
            <img
              src={`/${moment.photo}`}
              alt={moment.title}
              width={800}
              height={320}
              loading="lazy"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.7) saturate(0.6)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(13,17,23,0.95) 100%)' }}
            />
          </div>
        ) : (
          <div
            className="h-16 flex items-center px-6 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1F2937 0%, #161B26 100%)',
              borderTopLeftRadius: 11,
              borderTopRightRadius: 11,
            }}
          >
            <span
              className="text-gold-900 font-bold select-none"
              style={{ fontFamily: "'Oswald', sans-serif", fontSize: 40, opacity: 0.4, position: 'relative', zIndex: 0 }}
            >
              {moment.year}
            </span>
          </div>
        )}

        {/* Body — generous padding, content drives height */}
        <div className="p-6" style={{ position: 'relative', zIndex: 1 }}>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge label={moment.era} variant="gold" />
            <Badge label={moment.category} variant="neutral" />
          </div>
          <h3
            className="text-neutral-50 text-xl font-bold mb-3 leading-snug"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {moment.title}
          </h3>
          <p
            className="text-neutral-400 text-sm mb-4"
            style={{ lineHeight: 1.65, overflowWrap: 'anywhere' }}
          >
            {moment.narrative}
          </p>
          <p
            className="text-neutral-500 text-xs italic mt-4 pt-4"
            style={{
              lineHeight: 1.65,
              borderTop: '1px solid rgba(31,41,55,0.6)',
              overflowWrap: 'anywhere',
            }}
          >
            {moment.significance}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
