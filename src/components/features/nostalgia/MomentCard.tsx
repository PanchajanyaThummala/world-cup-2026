import { useState } from 'react'
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
  const [hovered, setHovered] = useState(false)

  const readMore = moment.sourceUrl && (
    <motion.div
      animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
      transition={{ duration: 0.18 }}
      style={{
        marginTop: 16,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-primary)',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      Read Article <span style={{ fontSize: 14 }}>→</span>
    </motion.div>
  )

  const card = moment.photo ? (
    /* ── IMMERSIVE: full-card background + Ken Burns ── */
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex-1 rounded-xl relative overflow-hidden"
      style={{
        border: '1px solid var(--color-border)',
        minWidth: 0,
        minHeight: 420,
        cursor: moment.sourceUrl ? 'pointer' : 'default',
      }}
    >
      {/* Ken Burns image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.08 }}
        viewport={{ once: false }}
        transition={{ duration: 8, ease: 'easeOut' }}
        style={{ willChange: 'transform' }}
      >
        <img
          src={`/${moment.photo}`}
          alt={moment.title}
          width={800}
          height={500}
          loading="lazy"
          className="w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.85) saturate(0.9)' }}
        />
      </motion.div>

      {/* Multi-layer gradient: light at top, heavy at bottom for text */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to bottom, rgba(5,4,0,0.1) 0%, rgba(5,4,0,0.05) 20%, rgba(5,4,0,0.65) 52%, rgba(5,4,0,0.98) 100%)',
            'radial-gradient(ellipse at 50% 100%, rgba(255,215,0,0.04) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      {/* Content pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: 'var(--card-padding, 32px)' }}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge label={moment.era} variant="gold" />
          <Badge label={moment.category} variant="neutral" />
        </div>

        <h3
          className="font-bold mb-3"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 20,
            lineHeight: 1.3,
            overflowWrap: 'anywhere',
          }}
        >
          {moment.title}
        </h3>

        <p style={{ fontSize: 14, lineHeight: 1.7, overflowWrap: 'anywhere', color: 'rgba(255,240,240,0.8)' }}>
          {moment.narrative}
        </p>

        <p
          className="italic mt-4 pt-4"
          style={{
            fontSize: 12,
            lineHeight: 1.6,
            borderTop: '1px solid rgba(255,215,0,0.18)',
            overflowWrap: 'anywhere',
            color: 'rgba(255,215,0,0.55)',
          }}
        >
          {moment.significance}
        </p>

        {readMore}
      </div>
    </motion.div>
  ) : (
    /* ── STANDARD: gold accent bar + surface card ── */
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex-1 rounded-xl"
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-surface)',
        minWidth: 0,
        cursor: moment.sourceUrl ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          height: 4,
          background: 'linear-gradient(90deg, rgba(255,215,0,0.5), rgba(255,215,0,0.15), transparent)',
          borderTopLeftRadius: 11,
          borderTopRightRadius: 11,
        }}
      />

      <div style={{ padding: 'var(--card-padding, 32px)' }}>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge label={moment.era} variant="gold" />
          <Badge label={moment.category} variant="neutral" />
        </div>

        <h3
          className="font-bold mb-4"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            lineHeight: 1.35,
            overflowWrap: 'anywhere',
          }}
        >
          {moment.title}
        </h3>

        <p style={{ fontSize: 14, lineHeight: 1.7, overflowWrap: 'anywhere', color: 'rgba(255,240,240,0.7)' }}>
          {moment.narrative}
        </p>

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

        {readMore}
      </div>
    </motion.div>
  )

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
          style={{ fontFamily: "'Oswald', sans-serif", fontSize: 40, lineHeight: 1, fontWeight: 600, color: 'var(--color-primary)' }}
        >
          {moment.year}
        </span>
        <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
          {moment.host}
        </span>
      </div>

      {moment.sourceUrl ? (
        <a
          href={moment.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read article about: ${moment.title}`}
          style={{ flex: 1, minWidth: 0, display: 'block', textDecoration: 'none' }}
        >
          {card}
        </a>
      ) : (
        <div style={{ flex: 1, minWidth: 0 }}>{card}</div>
      )}
    </motion.div>
  )
}
