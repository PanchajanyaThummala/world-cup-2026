import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ImpactStory } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface ImpactStoryCardProps {
  story: ImpactStory
  index: number
}

export function ImpactStoryCard({ story, index }: ImpactStoryCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE_OUT_EXPO }}
      className="min-w-0"
    >
      <motion.div
        layout
        onClick={() => setExpanded(v => !v)}
        whileHover={{ borderColor: 'rgba(255,215,0,0.3)' }}
        style={{
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: 12,
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          transition: 'border-color 0.2s',
        }}
      >
        {/* Gold top bar */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, rgba(255,215,0,0.6), transparent)' }} />

        {/* Year watermark */}
        <div style={{
          position: 'absolute',
          bottom: -10,
          right: 12,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 100,
          lineHeight: 1,
          color: 'rgba(255,215,0,0.04)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}>
          {story.year}
        </div>

        <div style={{ padding: '18px 20px 20px', position: 'relative', zIndex: 1 }}>

          {/* Top row — badges + tournament */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 8, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <Badge label={story.eraBadge} variant="gold" />
              <Badge label={story.category} variant="outline" />
            </div>
            <span style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'rgba(255,215,0,0.4)',
              flexShrink: 0,
            }}>
              {story.tournament}
            </span>
          </div>

          {/* Title as hook */}
          <h3 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.4,
            color: 'var(--color-text-primary)',
            marginBottom: 14,
            overflowWrap: 'anywhere',
          }}>
            {story.title}
          </h3>

          {/* Expand toggle */}
          <button
            onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,215,0,0.5)',
            }}
          >
            {expanded ? 'Less' : 'Read the story'}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'inline-block', fontSize: 12, lineHeight: 1 }}
            >
              ↓
            </motion.span>
          </button>

          {/* Expandable narrative */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="narrative"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{
                  paddingTop: 14,
                  marginTop: 14,
                  borderTop: '1px solid rgba(255,215,0,0.1)',
                  fontSize: 13,
                  lineHeight: 1.72,
                  color: 'rgba(255,240,240,0.7)',
                  overflowWrap: 'anywhere',
                }}>
                  {story.narrative}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
