import { motion } from 'framer-motion'
import { fadeInUp, EASE_OUT_EXPO } from '@/lib/motion'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <motion.p
          variants={fadeInUp}
          className="text-gold-400 font-bold uppercase mb-5"
          style={{ fontSize: 11, letterSpacing: '0.22em', fontFamily: "'Inter', sans-serif" }}
        >
          {eyebrow}
        </motion.p>
      )}
      <div className="overflow-hidden">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: '100%' },
            visible: { opacity: 1, y: '0%', transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
          }}
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
          className="text-[clamp(52px,7vw,96px)] font-normal text-neutral-50 leading-none"
        >
          {title}
        </motion.h2>
      </div>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-neutral-300 leading-relaxed max-w-2xl"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 18 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
