import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.02, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } } : undefined}
      className={cn('rounded-2xl relative', onClick && 'cursor-pointer', className)}
      style={{
        padding: 'var(--card-padding, 32px)',
        background: 'var(--color-bg-surface, #0A0800)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--color-border, rgba(255,215,0,0.15))',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
        transition: hover ? 'border-color 150ms ease, box-shadow 200ms ease' : undefined,
      }}
      onHoverStart={hover ? () => {} : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      data-card
    >
      {children}
    </motion.div>
  )
}
