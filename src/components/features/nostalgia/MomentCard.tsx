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
      viewport={{ once: false, margin: '-60px' }}
      transition={{ delay: index * 0.04 }}
      className={`flex ${side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col gap-8 items-start`}
    >
      {/* Year marker */}
      <div className="flex-shrink-0 md:w-28 flex flex-col items-start md:items-end gap-1 pt-1">
        <span
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: 40, lineHeight: 1, fontWeight: 600 }}
          style={{ color: 'var(--color-primary)' }}
        >
          {moment.year}
        </span>
        <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>{moment.host}</span>
      </div>

      {/* Card — NO overflow:hidden so significance line is never clipped */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="flex-1 rounded-xl"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-surface)',
          minWidth: 0,
        }}
      >
        {/* Photo header — own clipping scope for rounded corners */}
        {moment.photo ? (
          <div
            className="relative overflow-hidden"
            style={{ height: 160, borderTopLeftRadius: 11, borderTopRightRadius: 11 }}
          >
            <img
              src={`/${moment.photo}`}
              alt={moment.title}
              width={800}
              height={320}
              loading="lazy"
              className="w-full h-full object-cover object-center"
              style={{ filter: 'brightness(0.65) saturate(0.55)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(10,8,0,0.97) 100%)' }}
            />
          </div>
        ) : (
          /* Thin accent bar — no year text, year already shown in left column */
          <div
            style={{
              height: 4,
              background: 'linear-gradient(90deg, rgba(255,215,0,0.5), rgba(255,215,0,0.15), transparent)',
              borderTopLeftRadius: 11,
              borderTopRightRadius: 11,
            }}
          />
        )}

        {/* Body — 32px padding, no constraints, content drives height */}
        <div style={{ padding: 'var(--card-padding, 32px)' }}>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge label={moment.era} variant="gold" />
            <Badge label={moment.category} variant="neutral" />
          </div>

          <h3
            className="font-bold mb-4"
            style={{ color: 'var(--color-text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 18, lineHeight: 1.35, overflowWrap: 'anywhere' }}
          >
            {moment.title}
          </h3>

          <p
            style={{ fontSize: 14, lineHeight: 1.7, overflowWrap: 'anywhere', color: 'rgba(255,240,240,0.7)' }}
          >
            {moment.narrative}
          </p>

          {/* Significance — always visible, separated by top border */}
          <p
            className="italic mt-5 pt-5"
            style={{
              fontSize: 13,
              lineHeight: 1.65,
              borderTop: '1px solid var(--color-border)',
              overflowWrap: 'anywhere',
              color: 'var(--color-text-secondary)',
            }}
          >
            {moment.significance}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
