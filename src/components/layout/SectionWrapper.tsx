import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  fullBleed?: boolean
}

export function SectionWrapper({ id, children, className, style, fullBleed = false }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('py-32 md:py-40 relative overflow-hidden', className)} style={style}>
      {fullBleed ? children : (
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {children}
        </div>
      )}
    </section>
  )
}
