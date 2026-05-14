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
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn('rounded-2xl relative', onClick && 'cursor-pointer', className)}
      style={{
        background: 'rgba(13, 17, 23, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(201, 168, 76, 0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
      onHoverStart={hover ? (e) => {
        const el = e.target as HTMLElement
        const card = el.closest('[data-card]') as HTMLElement
        if (card) {
          card.style.borderColor = 'rgba(201,168,76,0.4)'
          card.style.boxShadow = '0 8px 40px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.07)'
        }
      } : undefined}
      data-card
    >
      {/* Content layer — z-index 1 ensures it always renders above decorative children */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  )
}
