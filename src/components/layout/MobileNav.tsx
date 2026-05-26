import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  sections: Array<{ id: string; label: string; href?: string }>
  activeSection: string
}

export function MobileNav({ sections, activeSection }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const navigate = (id: string, href?: string) => {
    setOpen(false)
    if (href) {
      setTimeout(() => { window.location.href = href }, 50)
    } else {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="lg:hidden flex items-center justify-center"
        style={{ color: 'var(--color-text-primary)' }}
        style={{ minHeight: 44, minWidth: 44 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="fixed inset-0 z-[70] cursor-default"
              style={{ background: 'rgba(5,4,0,0.7)', backdropFilter: 'blur(4px)' }}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 36 }}
              role="dialog"
              aria-label="Site navigation"
              className="fixed top-0 right-0 bottom-0 z-[80] w-72 max-w-[85vw] flex flex-col"
              style={{
                background: 'rgba(10,8,0,0.97)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderLeft: '1px solid var(--color-border)',
                paddingLeft: 'var(--gutter-x)',
                paddingRight: 'var(--gutter-x)',
                paddingTop: 24,
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <span
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <img
                    src="/images/logo/wc2026-logo.svg"
                    alt="FIFA World Cup 2026"
                    style={{ height: 28, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                  />
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center"
                  style={{ color: 'var(--color-text-secondary)' }}
                  style={{ minHeight: 44, minWidth: 44 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <ul className="flex flex-col gap-1">
                {sections.map(({ id, label, href }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => navigate(id, href)}
                      className={cn(
                        'w-full text-left px-3 py-3 rounded-md transition-colors duration-150',
                      )}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 15,
                        fontWeight: 500,
                        minHeight: 44,
                        color: activeSection === id ? 'var(--color-primary)' : 'var(--color-text-primary)',
                        background: activeSection === id ? 'rgba(255,215,0,0.08)' : 'transparent',
                        border: activeSection === id ? '1px solid rgba(255,215,0,0.2)' : '1px solid transparent',
                      }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
