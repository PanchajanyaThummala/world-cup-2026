import { SoccerBall } from '@/components/ui/SoccerBall'

export function Footer() {
  return (
    <footer
      className="relative border-t py-16 overflow-hidden"
      style={{ borderColor: 'rgba(31,41,55,0.6)', background: '#080A0F' }}
    >
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ paddingLeft: 'var(--gutter-x)', paddingRight: 'var(--gutter-x)' }}
      >
        <div className="flex items-center gap-4">
          <SoccerBall size={40} glow spin />
          <div>
            <p
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em' }}
              className="text-neutral-50 text-2xl"
            >
              FIFA World Cup <span className="text-gold-400">2026</span>
            </p>
            <p className="text-neutral-600 text-xs mt-0.5">
              USA · Canada · Mexico · June 11 – July 19
            </p>
          </div>
        </div>
        <p className="text-neutral-700 text-xs text-center md:text-right leading-relaxed">
          Fan-made tribute site.<br/>Not affiliated with FIFA.
        </p>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2"
        style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }}
      />
    </footer>
  )
}
