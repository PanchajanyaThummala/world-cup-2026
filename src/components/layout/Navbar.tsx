import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SoccerBall } from '@/components/ui/SoccerBall'
import { MobileNav } from './MobileNav'

const NAV_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'groups', label: 'Groups' },
  { id: 'venues', label: 'Venues' },
  { id: 'nostalgia', label: 'History' },
  { id: 'impact', label: 'Impact' },
  { id: 'legends', label: 'Legends' },
  { id: 'facts', label: 'Facts' },
  { id: 'bracket', label: 'Bracket' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateActive = () => {
      setScrolled(window.scrollY > 60)

      // getBoundingClientRect().top < threshold → section is above the trigger line.
      // threshold = 45% of viewport height from top.
      const threshold = window.innerHeight * 0.45
      let current = NAV_SECTIONS[0].id

      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top } = el.getBoundingClientRect()
        if (top < threshold) current = id
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', updateActive, { passive: true })
    // Also update on resize
    window.addEventListener('resize', updateActive, { passive: true })
    updateActive()
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'border-b' : 'bg-transparent',
      )}
      style={{
        top: 'var(--banner-h)',
        ...(scrolled ? {
          background: 'rgba(5,4,0,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'var(--color-border)',
        } : {}),
      }}
    >
      <div
        className="max-w-7xl mx-auto h-16 flex items-center justify-between"
        style={{ paddingLeft: 'var(--gutter-x)', paddingRight: 'var(--gutter-x)' }}
      >
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group"
          aria-label="Go to top"
          style={{ minHeight: 44 }}
        >
          <SoccerBall size={28} glow={false} spin />
          <img
            src="/images/logo/wc2026-logo.svg"
            alt="FIFA World Cup 2026"
            width={48}
            height={48}
            style={{ height: 32, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.92 }}
          />
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                aria-label={`Navigate to ${label}`}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
                )}
                style={{
                  color: activeSection === id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  minHeight: 44,
                  minWidth: 44,
                }}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md"
                    style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.25)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger — visible below lg */}
        <MobileNav sections={NAV_SECTIONS} activeSection={activeSection} />
      </div>
    </motion.nav>
  )
}
