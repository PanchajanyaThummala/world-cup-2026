import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  sectionNum?: string
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', sectionNum }: SectionHeadingProps) {
  return (
    <div className={`mb-16 relative ${align === 'center' ? 'text-center' : 'text-left'}`} style={{ minWidth: 0 }}>

      {/* Large faint section number watermark */}
      {sectionNum && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: align === 'center' ? '50%' : '-10%',
            left: align === 'center' ? '50%' : '-2%',
            transform: align === 'center' ? 'translate(-50%, -50%)' : 'none',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(120px, 18vw, 200px)',
            lineHeight: 1,
            fontWeight: 400,
            color: 'rgba(255,215,0,0.04)',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0,
            letterSpacing: '-0.02em',
          }}
        >
          {sectionNum}
        </span>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="inline-flex items-center gap-3 mb-6"
          >
            {/* Gold accent tick */}
            <span style={{ width: 24, height: 2, background: 'var(--color-primary)', flexShrink: 0, display: 'block' }} />
            <p
              style={{
                color: 'var(--color-primary)',
                fontSize: 11,
                letterSpacing: '0.22em',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </p>
          </motion.div>
        )}

        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: '100%' }}
            whileInView={{ opacity: 1, y: '0%' }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.01em',
              fontSize: 'clamp(48px, 7vw, 96px)',
              lineHeight: 0.92,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              color: 'var(--color-text-primary)',
            }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Gold underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT_EXPO }}
          style={{
            marginTop: 16,
            height: 2,
            width: align === 'center' ? '40%' : '80px',
            margin: align === 'center' ? '16px auto 0' : '16px 0 0',
            background: 'linear-gradient(to right, var(--color-primary), transparent)',
            transformOrigin: 'left center',
          }}
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              lineHeight: 1.65,
              color: 'rgba(255,240,240,0.65)',
              maxWidth: '52ch',
              marginTop: 20,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
