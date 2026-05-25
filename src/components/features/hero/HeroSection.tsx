import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

const WORLD_CUP_CHARS = 'WORLD CUP'.split('')

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()
  const [imgLoaded, setImgLoaded] = useState(false)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-bg-base)' }}
    >
      {/* Background photo parallax */}
      <motion.div
        style={{ y: shouldReduce ? 0 : yImg }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="FIFA World Cup 2026 soccer stadium"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          onLoad={() => setImgLoaded(true)}
          className="w-full h-full object-cover object-center"
          style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 1.2s ease' }}
        />
        {/* Multi-layer gradient for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to bottom, rgba(5,4,0,0.45) 0%, rgba(5,4,0,0.15) 25%, rgba(5,4,0,0.6) 70%, #050400 100%)',
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,215,0,0.06) 0%, transparent 70%)',
            ].join(', '),
          }}
        />
      </motion.div>

      {/* Ambient corner glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '40%', height: '50%',
          background: 'radial-gradient(ellipse at top left, rgba(255,215,0,0.05) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '35%', height: '45%',
          background: 'radial-gradient(ellipse at top right, rgba(255,215,0,0.04) 0%, transparent 65%)',
        }} />
      </div>

      {/* Main content */}
      <motion.div
        style={{
          y: shouldReduce ? 0 : yContent,
          opacity: shouldReduce ? 1 : opacity,
          paddingLeft: 'var(--gutter-x)',
          paddingRight: 'var(--gutter-x)',
        }}
        className="relative z-10 text-center max-w-5xl mx-auto w-full"
        style={{ paddingTop: 'calc(var(--banner-h) + 64px)' }}
      >
        {/* Official logo */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE_OUT_EXPO }}
          className="flex justify-center mb-8"
        >
          <img
            src="/images/logo/wc2026-logo.svg"
            alt="FIFA World Cup 2026 Official Logo"
            width={120}
            height={120}
            loading="eager"
            style={{
              height: 'clamp(64px, 9vw, 110px)',
              width: 'auto',
              filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.45)) drop-shadow(0 2px 12px rgba(0,0,0,0.8))',
            }}
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT_EXPO }}
          style={{
            color: 'var(--color-primary)',
            fontSize: 11,
            letterSpacing: '0.26em',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          The Greatest Tournament on Earth
        </motion.p>

        {/* FIFA */}
        <motion.p
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(56px, 10vw, 128px)',
            lineHeight: 0.88,
            letterSpacing: '0.08em',
            color: 'var(--color-text-primary)',
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          }}
        >
          FIFA
        </motion.p>

        {/* WORLD CUP — character-by-character with shimmer */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(52px, 10vw, 140px)',
            lineHeight: 0.88,
            letterSpacing: '0.06em',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'nowrap',
          }}
        >
          {/* Visually hidden full text for screen readers + tests */}
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
            WORLD CUP
          </span>
          {WORLD_CUP_CHARS.map((char, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 60, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.65 + i * 0.035,
                ease: EASE_OUT_EXPO,
              }}
              className={char !== ' ' ? 'shimmer-text' : ''}
              style={{
                display: 'inline-block',
                width: char === ' ' ? '0.35em' : 'auto',
              }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </div>

        {/* 2026 — outlined */}
        <motion.p
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 1.05, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(64px, 12vw, 160px)',
            lineHeight: 0.82,
            letterSpacing: '0.08em',
            WebkitTextStroke: '1.5px rgba(255,215,0,0.55)',
            color: 'transparent',
            textShadow: '0 0 60px rgba(255,215,0,0.08)',
          }}
        >
          2026
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25, ease: EASE_OUT_EXPO }}
          style={{
            color: 'rgba(255,240,240,0.7)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            letterSpacing: '0.05em',
            marginTop: 28,
            fontWeight: 300,
          }}
        >
          June 11 – July 19, 2026&nbsp;&nbsp;·&nbsp;&nbsp;🇺🇸 USA&nbsp;&nbsp;·&nbsp;&nbsp;🇨🇦 Canada&nbsp;&nbsp;·&nbsp;&nbsp;🇲🇽 Mexico
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.45, ease: EASE_OUT_EXPO }}
          style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}
        >
          <motion.button
            onClick={() => document.getElementById('groups')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, y: -3, boxShadow: '0 0 48px rgba(255,215,0,0.55)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '15px 44px',
              minHeight: 44,
              background: 'linear-gradient(135deg, #FFD700 0%, #B8960C 100%)',
              color: '#050400',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 24px rgba(255,215,0,0.3)',
              transition: 'box-shadow 200ms ease',
            }}
          >
            Explore the Tournament
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span style={{ color: 'rgba(255,215,0,0.4)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
          Scroll
        </span>
        <motion.div
          animate={!shouldReduce ? { y: [0, 10, 0], opacity: [0.3, 1, 0.3] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
