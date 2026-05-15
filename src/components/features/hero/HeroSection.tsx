import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

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
          style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(5,4,0,0.3) 0%, rgba(5,4,0,0.2) 30%, rgba(5,4,0,0.75) 75%, #050400 100%)',
          }}
        />
      </motion.div>

      {/* Light streak / lens flare */}
      <div
        className="absolute top-0 right-0 w-1/3 h-2/3 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(255,215,0,0.06) 0%, transparent 60%)',
          zIndex: 3,
        }}
      />

      {/* Main content */}
      <motion.div
        style={{
          y: shouldReduce ? 0 : yContent,
          opacity: shouldReduce ? 1 : opacity,
          paddingLeft: 'var(--gutter-x)',
          paddingRight: 'var(--gutter-x)',
        }}
        className="relative z-10 text-center max-w-5xl mx-auto w-full"
      >
        {/* Official logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="flex justify-center mb-6"
        >
          <img
            src="/images/logo/wc2026-logo.svg"
            alt="FIFA World Cup 2026 Official Logo"
            width={120}
            height={120}
            loading="eager"
            style={{
              height: 'clamp(72px, 10vw, 120px)',
              width: 'auto',
              filter: 'drop-shadow(0 0 24px rgba(255,215,0,0.4))',
            }}
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="font-bold uppercase mb-8 tracking-widest"
          style={{ color: 'var(--color-primary)', fontSize: 11, letterSpacing: '0.22em', fontFamily: "'Inter', sans-serif" }}
        >
          The Greatest Tournament on Earth
        </motion.p>

        {/* FIFA — white */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(56px, 10vw, 128px)',
            lineHeight: 0.9,
            letterSpacing: '0.06em',
            color: 'var(--color-text-primary)',
            wordBreak: 'keep-all',
          }}
        >
          FIFA
        </motion.p>

        {/* WORLD CUP — gold gradient */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(52px, 10vw, 140px)',
            lineHeight: 0.9,
            letterSpacing: '0.04em',
            wordBreak: 'keep-all',
            background: 'linear-gradient(135deg, #FFFFF0 0%, #FFD700 45%, #B8960C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          WORLD CUP
        </motion.p>

        {/* 2026 — outlined stroke */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(64px, 12vw, 160px)',
            lineHeight: 0.85,
            letterSpacing: '0.06em',
            WebkitTextStroke: '2px rgba(255,215,0,0.6)',
            color: 'transparent',
          }}
        >
          2026
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: EASE_OUT_EXPO }}
          className="text-base md:text-lg mt-8 font-light"
          style={{ color: 'var(--color-text-primary)', opacity: 0.8, fontFamily: "'Inter', sans-serif", letterSpacing: '0.04em' }}
        >
          June 11 – July 19, 2026&nbsp;&nbsp;·&nbsp;&nbsp;🇺🇸 USA&nbsp;&nbsp;·&nbsp;&nbsp;🇨🇦 Canada&nbsp;&nbsp;·&nbsp;&nbsp;🇲🇽 Mexico
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE_OUT_EXPO }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            onClick={() => document.getElementById('groups')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            animate={shouldReduce ? {} : {
              boxShadow: [
                '0 0 24px rgba(255,215,0,0.3)',
                '0 0 48px rgba(255,215,0,0.6)',
                '0 0 24px rgba(255,215,0,0.3)',
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="font-bold"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              letterSpacing: '0.06em',
              padding: '14px 40px',
              minHeight: 44,
              background: '#FFD700',
              color: '#050400',
              borderRadius: 8,
            }}
          >
            Explore the tournament
          </motion.button>
        </motion.div>
      </motion.div>


      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs uppercase" style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.2em' }}>Scroll</span>
        <motion.div
          animate={!shouldReduce ? { y: [0, 8, 0], opacity: [0.4, 1, 0.4] } : {}}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--color-primary), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
