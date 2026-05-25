import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Legend } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface LegendCardProps {
  legend: Legend
  featured?: boolean
  index: number
}

const focusInVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

export function LegendCard({ legend, featured = false, index }: LegendCardProps) {
  const [hovered, setHovered] = useState(false)
  const ordinal = String(index + 1).padStart(2, '0')

  // ── FEATURED (Pelé) — full overlay layout ─────────────────────────────
  if (featured) {
    return (
      <motion.div
        variants={focusInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-40px' }}
        transition={{ delay: index * 0.08 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative overflow-hidden rounded-2xl h-full min-h-[520px]"
        style={{
          border: '1px solid var(--color-border)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div className="absolute z-20" style={{ top: 16, right: 18 }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,215,0,0.38)' }}>
            {ordinal}
          </span>
        </div>

        {legend.photo ? (
          <>
            <motion.img
              src={`/${legend.photo}`}
              alt={legend.name}
              width={800} height={600}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,4,0,0.97) 0%, rgba(5,4,0,0.75) 35%, rgba(5,4,0,0.18) 60%, rgba(5,4,0,0.03) 100%)' }} />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A1400 0%, #0A0800 60%, #0F0C00 100%)' }}>
            <span className="select-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 140, lineHeight: 1, color: 'rgba(255,215,0,0.1)' }}>
              {legend.era.slice(0, 4)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-end z-10" style={{ padding: 32 }}>
          <Badge label={legend.era} variant="gold" size="sm" />
          <motion.h3
            whileHover={{ color: '#FFD700' }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, lineHeight: 1, letterSpacing: '0.02em', color: 'var(--color-text-primary)', marginTop: 8 }}
          >
            {legend.name}
          </motion.h3>
          <div className="flex items-center gap-2 mt-1" style={{ fontSize: 12, color: 'rgba(255,240,240,0.6)' }}>
            <span aria-hidden="true">{legend.flag}</span>
            <span>{legend.nation}</span>
          </div>
          <p className="leading-relaxed mt-3" style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
            {legend.description}
          </p>
        </div>

        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ border: '1px solid var(--color-border-hover)' }} />
      </motion.div>
    )
  }

  // ── COMPACT — info panel on TOP, photo fills the bottom ───────────────
  return (
    <motion.div
      variants={focusInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-40px' }}
      transition={{ delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl h-full min-h-[260px] flex flex-col"
      style={{
        border: '1px solid var(--color-border)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* ── Info panel — TOP, dark strip, text never touches the photo ── */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0C0A00 0%, #080600 100%)',
          borderBottom: '1px solid rgba(255,215,0,0.08)',
          padding: '12px 14px 10px',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {/* Ordinal top-right inside info panel */}
        <span
          style={{
            position: 'absolute', top: 10, right: 12,
            fontFamily: "'Oswald', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', color: 'rgba(255,215,0,0.4)',
          }}
        >
          {ordinal}
        </span>

        <Badge label={legend.era} variant="gold" size="sm" />
        <motion.h3
          whileHover={{ color: '#FFD700' }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 22,
            lineHeight: 1.1, letterSpacing: '0.02em',
            color: 'var(--color-text-primary)', marginTop: 5,
          }}
        >
          {legend.name}
        </motion.h3>
        <div className="flex items-center gap-1.5 mt-1" style={{ fontSize: 11, color: 'rgba(255,240,240,0.55)' }}>
          <span aria-hidden="true">{legend.flag}</span>
          <span>{legend.nation}</span>
        </div>

        {/* Description slides in below on hover */}
        <motion.p
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4, height: hovered ? 'auto' : 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ fontSize: 11, lineHeight: 1.55, marginTop: hovered ? 7 : 0, color: 'var(--color-text-secondary)', overflow: 'hidden' }}
        >
          {legend.description}
        </motion.p>
      </div>

      {/* ── Photo zone — bottom, completely unobscured ── */}
      <div className="relative overflow-hidden flex-1">
        {legend.photo ? (
          <motion.img
            src={`/${legend.photo}`}
            alt={legend.name}
            width={800} height={600}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A1400 0%, #0A0800 60%, #0F0C00 100%)' }}>
            <span className="select-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, lineHeight: 1, color: 'rgba(255,215,0,0.1)' }}>
              {legend.era.slice(0, 4)}
            </span>
          </div>
        )}
      </div>

      {/* Gold border on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: '1px solid var(--color-border-hover)' }}
      />
    </motion.div>
  )
}
