import { motion } from 'framer-motion'
import type { Legend } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { scaleIn } from '@/lib/motion'

interface LegendCardProps {
  legend: Legend
  featured?: boolean
  index: number
}

export function LegendCard({ legend, featured = false, index }: LegendCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07 }}
      className={`group relative overflow-hidden rounded-xl ${featured ? 'min-h-[480px]' : 'min-h-[300px]'}`}
      style={{ border: '1px solid rgba(31,41,55,0.8)' }}
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
        <p className="text-neutral-400 text-sm mt-1">
          <span role="img" aria-label={legend.nation}>{legend.flag}</span>
          {' '}{legend.nation}
        </p>
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
