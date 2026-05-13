import { cn } from '@/lib/utils'

interface FlagProps {
  emoji: string
  label: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-3xl' }

export function Flag({ emoji, label, size = 'md' }: FlagProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn('leading-none select-none', sizes[size])}
    >
      {emoji}
    </span>
  )
}
