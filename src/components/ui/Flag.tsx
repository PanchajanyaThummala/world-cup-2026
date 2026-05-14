import { cn } from '@/lib/utils'

interface FlagProps {
  emoji: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  decorative?: boolean
}

const sizes = { sm: 'text-base', md: 'text-xl', lg: 'text-3xl' }

/**
 * Flag component. When `decorative` is true (default), the flag is aria-hidden
 * and adjacent visible text provides the country name. When `decorative` is false,
 * the flag carries its own aria-label.
 */
export function Flag({ emoji, label, size = 'md', decorative = true }: FlagProps) {
  if (decorative) {
    return (
      <span aria-hidden="true" className={cn('leading-none select-none', sizes[size])}>
        {emoji}
      </span>
    )
  }
  return (
    <span
      role="img"
      aria-label={label ?? ''}
      className={cn('leading-none select-none', sizes[size])}
    >
      {emoji}
    </span>
  )
}
