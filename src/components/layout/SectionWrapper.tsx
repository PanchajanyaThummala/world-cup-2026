import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  fullBleed?: boolean
  glowPosition?: 'top-left' | 'top-right' | 'none'
  backgroundLayer?: React.ReactNode
}

export function SectionWrapper({
  id,
  children,
  className,
  style,
  fullBleed = false,
  glowPosition = 'none',
  backgroundLayer,
}: SectionWrapperProps) {
  return (
    <>
      {/* Gold section divider */}
      <div className="section-divider" aria-hidden="true" />

      <section
        id={id}
        className={cn('relative overflow-hidden', className)}
        style={{
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
          ...style,
        }}
      >
        {/* Background layer — sits at section level, behind all content */}
        {backgroundLayer}

        {/* Radial ambient glow */}
        {glowPosition !== 'none' && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: glowPosition === 'top-left' ? 0 : 'auto',
              right: glowPosition === 'top-right' ? 0 : 'auto',
              width: '55%',
              height: '50%',
              background: glowPosition === 'top-left'
                ? 'radial-gradient(ellipse at top left, rgba(255,215,0,0.055) 0%, transparent 70%)'
                : 'radial-gradient(ellipse at top right, rgba(255,215,0,0.055) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

        <div style={{ position: 'relative', zIndex: 1 }}>
          {fullBleed ? children : (
            <div
              className="max-w-7xl mx-auto"
              style={{
                paddingLeft: 'var(--gutter-x)',
                paddingRight: 'var(--gutter-x)',
              }}
            >
              {children}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
