export function Footer() {
  return (
    <footer
      className="relative border-t py-16 overflow-hidden"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-surface)' }}
    >
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ paddingLeft: 'var(--gutter-x)', paddingRight: 'var(--gutter-x)' }}
      >
        <div className="flex items-center gap-4">
          <img
            src="/images/logo/wc2026-logo.svg"
            alt="FIFA World Cup 2026"
            style={{ height: 48, width: 'auto', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.3))' }}
          />
          <div>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              USA · Canada · Mexico · June 11 – July 19
            </p>
          </div>
        </div>
        <p className="text-xs text-center md:text-right leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Fan-made tribute site.<br/>Not affiliated with FIFA.
        </p>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,215,0,0.3), transparent)' }}
      />
    </footer>
  )
}
