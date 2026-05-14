import { motion } from 'framer-motion'
import type { Legend } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface LegendCardProps {
  legend: Legend
  featured?: boolean
  index: number
}

// T009: cinematic focus-in — scale 0.85 + blur 4px → 1 + clear
const focusInVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

export function LegendCard({ legend, featured = false, index }: LegendCardProps) {
  return (
    <motion.div
      variants={focusInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-2xl ${featured ? 'min-h-[520px]' : 'min-h-[320px]'}`}
      style={{
        border: '1px solid rgba(201, 168, 76, 0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Photo or gradient background */}
      {legend.photo ? (
        <>
          <motion.img
            src={`/${legend.photo}`}
            alt={legend.name}
            width={800}
            height={600}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(8,10,15,0.98) 0%, rgba(8,10,15,0.6) 50%, rgba(8,10,15,0.2) 100%)',
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1F2937 0%, #0D1117 60%, #161B26 100%)' }}
        >
          <span
            className="text-gold-900 select-none font-bold"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: featured ? 140 : 90,
              lineHeight: 1,
              opacity: 0.3,
            }}
          >
            {legend.era.slice(0, 4)}
          </span>
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <Badge label={legend.era} variant="gold" size="sm" />
        <motion.h3
          whileHover={{ color: '#E2C267' }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: featured ? 48 : 32,
            lineHeight: 1,
            letterSpacing: '0.02em',
            color: '#F9FAFB',
          }}
          className="mt-2"
        >
          {legend.name}
        </motion.h3>
        <div className="flex items-center gap-2 mt-1 text-neutral-400 text-sm">
          <span aria-hidden="true">{legend.flag}</span>
          <span>{legend.nation}</span>
        </div>
        {featured && (
          <p className="text-neutral-500 text-sm mt-3 leading-relaxed">{legend.description}</p>
        )}
      </div>

      {/* Gold border on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: '1px solid rgba(201,168,76,0.4)' }}
      />
    </motion.div>
  )
}
