import type { Variants } from 'framer-motion'

// Premium easing — expo out
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
}

export const charReveal: Variants = {
  hidden: { opacity: 0, y: '100%', rotateX: -20 },
  visible: { opacity: 1, y: '0%', rotateX: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
}

export const reducedMotionVariants = (original: Variants): Variants => ({
  hidden: { opacity: 0 },
  visible: { ...(original.visible as object), opacity: 1, x: 0, y: 0, scale: 1 },
})
