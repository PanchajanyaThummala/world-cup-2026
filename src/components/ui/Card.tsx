import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl bg-neutral-900 border border-neutral-800',
        hover && 'transition-all duration-200 hover:border-gold-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-500/5',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  )
}
