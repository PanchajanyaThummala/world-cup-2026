import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { EASE_OUT_EXPO } from '@/lib/motion'

export function ScheduleCTA() {
  return (
    <SectionWrapper id="schedule" style={{ background: 'var(--color-bg-surface)' }} glowPosition="top-right">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        style={{
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'flex-start',
          gap: 24,
          maxWidth: 640,
        }}
      >
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase' as const,
          color: 'rgba(255,215,0,0.65)',
        }}>
          Road to the Final
        </p>

        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          letterSpacing: '0.04em',
          lineHeight: 1,
          color: 'var(--color-text-primary)',
        }}>
          Full Schedule &amp; Bracket
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          lineHeight: 1.65,
          color: 'rgba(255,240,240,0.55)',
          maxWidth: 480,
        }}>
          72 group stage matches across 17 venues in three nations — plus the complete
          knockout bracket from the Round of 32 to the MetLife Final.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { num: '72', label: 'Group Matches' },
            { num: '16', label: 'Venues' },
            { num: '48', label: 'Nations' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 36,
                letterSpacing: '0.02em',
                lineHeight: 1,
                color: 'rgba(255,215,0,0.85)',
              }}>
                {num}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: 'rgba(255,240,240,0.35)',
                marginTop: 2,
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <motion.a
          href="/schedule"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 28px',
            background: 'rgba(255,215,0,0.1)',
            border: '1px solid rgba(255,215,0,0.5)',
            borderRadius: 7,
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase' as const,
            color: 'rgba(255,215,0,0.9)',
            textDecoration: 'none',
            transition: 'background 0.18s, border-color 0.18s',
          }}
        >
          View Full Schedule
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </motion.div>
    </SectionWrapper>
  )
}
