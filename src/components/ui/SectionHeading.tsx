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
      viewport={{ once: false, margin: '-60px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
      style={{ minWidth: 0 }}
    >
      {eyebrow && (
        <motion.div variants={fadeInUp} className="inline-block mb-5">
          <p
            style={{
              color: 'var(--color-primary)',
              fontSize: 11,
              letterSpacing: '0.22em',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {eyebrow}
          </p>
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
            style={{
              height: 1,
              background: 'linear-gradient(to right, var(--color-primary), transparent)',
              transformOrigin: 'left center',
              width: '100%',
            }}
          />
        </motion.div>
      )}

      <div className="overflow-hidden">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: '100%' },
            visible: { opacity: 1, y: '0%', transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
          }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '0.02em',
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: 0.95,
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          variants={fadeInUp}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17,
            lineHeight: 1.65,
            color: 'rgba(255,240,240,0.7)',
            maxWidth: '52ch',
            marginTop: 20,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
