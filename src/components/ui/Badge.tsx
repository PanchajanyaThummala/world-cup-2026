import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  variant?: 'gold' | 'neutral' | 'outline'
  size?: 'sm' | 'md'
}

export function Badge({ label, variant = 'neutral', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold tracking-wide uppercase',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variant === 'gold' && 'bg-gold-500/20 text-gold-400 ring-1 ring-gold-500/30',
        variant === 'neutral' && 'bg-neutral-800 text-neutral-400',
        variant === 'outline' && 'ring-1 ring-neutral-700 text-neutral-400',
      )}
    >
      {label}
    </span>
  )
}
