import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { SoccerBall } from '@/components/ui/SoccerBall'
import { EASE_OUT_EXPO } from '@/lib/motion'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()
  const [imgLoaded, setImgLoaded] = useState(false)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080A0F' }}
    >
      {/* Background photo with parallax */}
      <motion.div
        style={{ y: shouldReduce ? 0 : yImg }}
        className="absolute inset-0 w-full h-[115%] -top-[8%]"
      >
        <img
          src="/images/hero-bg.jpg"
          alt="FIFA World Cup 2026 stadium"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          onLoad={() => setImgLoaded(true)}
          className="w-full h-full object-cover object-center"
          style={{
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />
        {/* Dark gradient overlay — ensures text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,10,15,0.55) 0%, rgba(8,10,15,0.35) 40%, rgba(8,10,15,0.75) 80%, #080A0F 100%)',
          }}
        />
      </motion.div>

      {/* Content — 3 zones only */}
      <motion.div
        style={{ y: shouldReduce ? 0 : yContent, opacity: shouldReduce ? 1 : opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
      >
        {/* Zone 1: Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="text-gold-400 font-semibold uppercase mb-6 tracking-widest"
          style={{ fontSize: 11, letterSpacing: '0.2em', fontFamily: "'Inter', sans-serif" }}
        >
          The Greatest Tournament on Earth
        </motion.p>

        {/* Zone 2: Title */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT_EXPO }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(72px, 13vw, 180px)',
            lineHeight: 0.88,
            letterSpacing: '0.03em',
          }}
          className="text-neutral-50 leading-none"
        >
          FIFA<br />
          <span className="text-gold-400">World Cup</span><br />
          2026
        </motion.h1>

        {/* Zone 3: Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT_EXPO }}
          className="text-neutral-300 text-lg md:text-xl mt-8 font-light"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          June 11 – July 19, 2026 &nbsp;·&nbsp; 🇺🇸 USA &nbsp;·&nbsp; 🇨🇦 Canada &nbsp;·&nbsp; 🇲🇽 Mexico
        </motion.p>
      </motion.div>

      {/* Soccer ball — right edge only */}
      <motion.div
        className="absolute right-8 md:right-16 bottom-24 z-10"
        animate={!shouldReduce ? { y: [0, -18, 0] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SoccerBall size={100} glow spin />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-neutral-600 text-xs uppercase" style={{ letterSpacing: '0.2em' }}>Scroll</span>
        <motion.div
          animate={!shouldReduce ? { y: [0, 8, 0], opacity: [0.4, 1, 0.4] } : {}}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-gold-500 to-transparent"
        />
      </motion.div>
    </section>
  )
}
