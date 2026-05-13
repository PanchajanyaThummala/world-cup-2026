import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { reducedMotionVariants } from '@/lib/motion'

export function useReducedMotion(variants: Variants): Variants {
  const shouldReduce = useFramerReducedMotion()
  return shouldReduce ? reducedMotionVariants(variants) : variants
}
