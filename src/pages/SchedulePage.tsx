import { useState } from 'react'
import { motion } from 'framer-motion'
import { CountdownBanner } from '@/components/layout/CountdownBanner'
import { Footer } from '@/components/layout/Footer'
import { GroupScheduleView } from '@/components/features/schedule/GroupScheduleView'
import { KnockoutBracket } from '@/components/features/bracket/KnockoutBracket'
import { ScheduleBackground } from '@/components/features/schedule/ScheduleBackground'
import { KNOCKOUT_BRACKET } from '@/data/bracket'
import { TEAMS } from '@/data/teams'
import { EASE_OUT_EXPO } from '@/lib/motion'

type Tab = 'group' | 'knockout'

const TAB_LABELS: { id: Tab; label: string }[] = [
  { id: 'group', label: 'Group Stage' },
  { id: 'knockout', label: 'Knockout Bracket' },
]

export function SchedulePage() {
  const [tab, setTab] = useState<Tab>('group')

  return (
    <div style={{ background: 'var(--color-bg-base)', minHeight: '100vh', color: 'var(--color-text-primary)', position: 'relative' }}>
      <ScheduleBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
      <CountdownBanner />

      {/* Schedule page navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        style={{
          position: 'sticky',
          top: 'var(--banner-h)',
          zIndex: 50,
          background: 'rgba(5,4,0,0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div
          className="max-w-7xl mx-auto h-16 flex items-center justify-between"
          style={{ paddingLeft: 'var(--gutter-x)', paddingRight: 'var(--gutter-x)' }}
        >
          <button
            onClick={() => (window.location.href = '/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: 'rgba(255,240,240,0.6)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              minHeight: 44,
              padding: '0 4px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,215,0,0.85)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,240,240,0.6)')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Home
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img
              src="/images/logo/wc2026-logo.svg"
              alt="FIFA World Cup 2026"
              style={{ height: 26, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }}
            />
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 16,
              letterSpacing: '0.1em',
              color: 'rgba(255,215,0,0.8)',
            }}>
              Schedule
            </span>
          </div>

          {/* Empty spacer for balance */}
          <div style={{ width: 72 }} />
        </div>
      </motion.nav>

      <main>
        <div
          className="max-w-7xl mx-auto"
          style={{ padding: '48px var(--gutter-x) 96px' }}
        >
          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            style={{ marginBottom: 40 }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,215,0,0.65)',
              marginBottom: 10,
            }}>
              FIFA World Cup 2026
            </p>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '0.04em',
              lineHeight: 1,
              color: 'var(--color-text-primary)',
              marginBottom: 12,
            }}>
              Full Tournament Schedule
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              lineHeight: 1.6,
              color: 'rgba(255,240,240,0.5)',
              maxWidth: 540,
            }}>
              72 group stage matches across 16 venues — USA, Canada, and Mexico. June 11 – July 19.
            </p>
          </motion.div>

          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT_EXPO }}
            style={{
              display: 'inline-flex',
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              padding: 4,
              gap: 4,
              marginBottom: 40,
            }}
          >
            {TAB_LABELS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  position: 'relative',
                  padding: '8px 20px',
                  borderRadius: 5,
                  border: 'none',
                  background: tab === id ? 'rgba(255,215,0,0.1)' : 'transparent',
                  color: tab === id ? 'rgba(255,215,0,0.95)' : 'rgba(255,240,240,0.45)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  outline: tab === id ? '1px solid rgba(255,215,0,0.3)' : 'none',
                  minHeight: 44,
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          {tab === 'group' ? (
            <GroupScheduleView />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: 'rgba(255,240,240,0.4)',
                marginBottom: 32,
              }}>
                All knockout matches are TBD pending group stage results. Venues and dates subject to confirmation.
              </p>
              <KnockoutBracket slots={KNOCKOUT_BRACKET} teams={TEAMS} />
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
      </div>{/* end z-1 wrapper */}
    </div>
  )
}
