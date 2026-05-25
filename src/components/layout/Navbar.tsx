import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MobileNav } from './MobileNav'

const NAV_SECTIONS = [
  { id: 'hero',      label: 'Home' },
  { id: 'groups',    label: 'Groups' },
  { id: 'venues',    label: 'Venues' },
  { id: 'nostalgia', label: 'History' },
  { id: 'impact',    label: 'Impact' },
  { id: 'legends',   label: 'Legends' },
  { id: 'facts',     label: 'Facts' },
  { id: 'bracket',   label: 'Bracket' },
]

const LEFT_NAV  = NAV_SECTIONS.slice(0, 4)
const RIGHT_NAV = NAV_SECTIONS.slice(4)

function NavButton({
  id, label, active, onClick,
}: { id: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <li>
      <button
        onClick={onClick}
        aria-label={`Navigate to ${label}`}
        className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: active ? 'var(--color-primary)' : 'rgba(255,240,240,0.65)',
          minHeight: 44,
          minWidth: 44,
          letterSpacing: '0.01em',
        }}
      >
        {active && (
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
  )
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateActive = () => {
      setScrolled(window.scrollY > 60)
      const threshold = window.innerHeight * 0.45
      let current = NAV_SECTIONS[0].id
      for (const { id } of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top < threshold) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive, { passive: true })
    updateActive()
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn('fixed left-0 right-0 z-50 transition-all duration-300', scrolled ? 'border-b' : 'bg-transparent')}
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
        className="max-w-7xl mx-auto h-16 flex items-center"
        style={{ paddingLeft: 'var(--gutter-x)', paddingRight: 'var(--gutter-x)' }}
      >
        {/* All nav links — left side */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_SECTIONS.map(({ id, label }) => (
            <NavButton key={id} id={id} label={label} active={activeSection === id} onClick={() => scrollTo(id)} />
          ))}
        </ul>


        {/* Mobile: logo left + hamburger right */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <button onClick={() => scrollTo('hero')} aria-label="Go to top" style={{ minHeight: 44, display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/logo/wc2026-logo.svg"
              alt="FIFA World Cup 2026"
              style={{ height: 28, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
            />
          </button>
          <MobileNav sections={NAV_SECTIONS} activeSection={activeSection} />
        </div>
      </div>
    </motion.nav>
  )
}
