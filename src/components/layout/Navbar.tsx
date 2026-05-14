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
    const handleScroll = () => setScrolled(window.scrollY > 60)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 },
    )
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    window.addEventListener('scroll', handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
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
        scrolled
          ? 'border-b border-neutral-800/60'
          : 'bg-transparent',
      )}
      style={{
        top: 'var(--banner-h)',
        ...(scrolled ? {
          background: 'rgba(8,10,15,0.85)',
          backdropFilter: 'blur(16px)',
        } : {}),
      }}
    >
      <div
        className="max-w-7xl mx-auto h-16 flex items-center justify-between"
        style={{ paddingLeft: 'var(--gutter-x)', paddingRight: 'var(--gutter-x)' }}
      >
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 group"
          aria-label="Go to top"
        >
          <SoccerBall size={26} glow={false} spin />
          <span
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.08em' }}
            className="text-neutral-100 text-xl group-hover:text-gold-400 transition-colors"
          >
            WC<span className="text-gold-400">2026</span>
          </span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                aria-label={`Navigate to ${label}`}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
                  activeSection === id ? 'text-gold-400' : 'text-neutral-500 hover:text-neutral-200',
                )}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
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
