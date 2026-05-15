import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, style: styleProp, hover = false, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? {
        y: -6,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 340, damping: 28 },
      } : undefined}
      whileTap={onClick ? { scale: 0.98, transition: { duration: 0.1 } } : undefined}
      className={cn('rounded-2xl relative', onClick && 'cursor-pointer', className)}
      style={{
        padding: 'var(--card-padding, 32px)',
        background: 'rgba(255, 215, 0, 0.025)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 215, 0, 0.14)',
        boxShadow: [
          '0 4px 32px rgba(0,0,0,0.7)',
          'inset 0 1px 0 rgba(255,215,0,0.1)',
          'inset 0 -1px 0 rgba(0,0,0,0.3)',
        ].join(', '),
        transition: hover
          ? 'border-color 180ms ease, box-shadow 200ms ease'
          : undefined,
        ...styleProp,
      }}
      onHoverStart={hover ? (e) => {
        const el = (e.target as HTMLElement).closest('[data-card]') as HTMLElement
        if (el) {
          el.style.borderColor = 'rgba(255,215,0,0.55)'
          el.style.boxShadow = [
            '0 12px 48px rgba(0,0,0,0.8)',
            '0 0 0 1px rgba(255,215,0,0.3)',
            'inset 0 1px 0 rgba(255,215,0,0.2)',
            'inset 0 -1px 0 rgba(0,0,0,0.4)',
          ].join(', ')
        }
      } : undefined}
      onHoverEnd={hover ? (e) => {
        const el = (e.target as HTMLElement).closest('[data-card]') as HTMLElement
        if (el) {
          el.style.borderColor = 'rgba(255,215,0,0.14)'
          el.style.boxShadow = [
            '0 4px 32px rgba(0,0,0,0.7)',
            'inset 0 1px 0 rgba(255,215,0,0.1)',
            'inset 0 -1px 0 rgba(0,0,0,0.3)',
          ].join(', ')
        }
      } : undefined}
      data-card
    >
      {children}
    </motion.div>
  )
}
