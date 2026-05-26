import { motion } from 'framer-motion'

const G = (a: number) => `rgba(255,215,0,${a})`

// Each layer drifts in a slow organic ellipse at its own pace
const LAYERS = [
  {
    // Large dominant glow — upper centre
    size: 700,
    x:  [0,  120,  0, -120, 0],
    y:  [0,  -60, -130, -60, 0],
    duration: 20,
    gradient: `radial-gradient(ellipse 55% 45% at 50% 50%, ${G(0.11)} 0%, ${G(0.04)} 45%, transparent 75%)`,
    blur: 60,
    initialX: '10%',
    initialY: '-15%',
  },
  {
    // Mid glow — lower left
    size: 540,
    x:  [0, -140,  0, 140, 0],
    y:  [0,   80, 160,  80, 0],
    duration: 28,
    gradient: `radial-gradient(ellipse 60% 50% at 50% 50%, ${G(0.08)} 0%, ${G(0.025)} 50%, transparent 75%)`,
    blur: 50,
    initialX: '-20%',
    initialY: '30%',
  },
  {
    // Accent glow — right side
    size: 420,
    x:  [0,  90,  0, -90, 0],
    y:  [0,  50, -60,  50, 0],
    duration: 23,
    gradient: `radial-gradient(ellipse 65% 55% at 50% 50%, ${G(0.07)} 0%, transparent 70%)`,
    blur: 40,
    initialX: '35%',
    initialY: '10%',
  },
  {
    // Small tight hot-spot — breathes in place
    size: 260,
    x:  [0,  30, 0, -30, 0],
    y:  [0, -30, 0,  30, 0],
    duration: 14,
    gradient: `radial-gradient(circle, ${G(0.14)} 0%, ${G(0.05)} 40%, transparent 70%)`,
    blur: 24,
    initialX: '5%',
    initialY: '-5%',
  },
]

export function GroupsBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    >
      {/* Subtle scan lines */}
      <style>{`
        @keyframes groups-scan {
          from { transform: translateY(0px); }
          to   { transform: translateY(6px); }
        }
      `}</style>
      <div style={{
        position: 'absolute',
        inset: '-6px 0 0 0',
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent 3px,
          ${G(0.018)} 3px,
          ${G(0.018)} 4px
        )`,
        animation: 'groups-scan 4s linear infinite',
      }} />

      {/* WC 2026 logo watermark */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 1.8, delay: 0.2 }}
      >
        <div style={{ position: 'relative', width: '70%', maxWidth: 860, overflow: 'hidden' }}>
          <img
            src="/images/logo/wc2026-logo.svg"
            alt=""
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              opacity: 0.08,
              mixBlendMode: 'luminosity',
              filter: 'brightness(3) sepia(1) hue-rotate(5deg) saturate(4)',
              userSelect: 'none',
              position: 'relative',
              zIndex: 1,
            } as React.CSSProperties}
          />
        </div>
      </motion.div>

      {/* Atmospheric depth layers */}
      {LAYERS.map((layer, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: layer.size,
            height: layer.size,
            borderRadius: '50%',
            background: layer.gradient,
            filter: `blur(${layer.blur}px)`,
            left: '50%',
            top: '50%',
            marginLeft: -layer.size / 2,
            marginTop: -layer.size / 2,
            translateX: layer.initialX,
            translateY: layer.initialY,
          }}
          animate={{
            x: layer.x,
            y: layer.y,
          }}
          transition={{
            duration: layer.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}

      {/* Vignette — keeps glow contained, protects card readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: [
          `radial-gradient(ellipse 85% 70% at 50% 50%, transparent 25%, rgba(8,10,15,0.65) 100%)`,
          `linear-gradient(to bottom, rgba(8,10,15,0.25) 0%, transparent 12%, transparent 88%, rgba(8,10,15,0.25) 100%)`,
        ].join(', '),
      }} />
    </div>
  )
}
