import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  variant?: 'gold' | 'neutral' | 'outline'
  size?: 'sm' | 'md'
}

const VARIANT_STYLES: Record<string, React.CSSProperties> = {
  gold: {
    background: 'rgba(255,215,0,0.12)',
    color: 'var(--color-primary)',
    boxShadow: '0 0 0 1px rgba(255,215,0,0.3)',
  },
  neutral: {
    background: 'rgba(255,240,240,0.06)',
    color: 'rgba(255,240,240,0.6)',
    boxShadow: '0 0 0 1px rgba(255,240,240,0.1)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    boxShadow: '0 0 0 1px var(--color-border)',
  },
}

export function Badge({ label, variant = 'neutral', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold tracking-wide uppercase',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      )}
      style={VARIANT_STYLES[variant]}
    >
      {label}
    </span>
  )
}
