import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { geoAlbers, geoPath } from 'd3-geo'
import type { GeoPermissibleObjects } from 'd3-geo'

const SVG_W = 1400
const SVG_H = 700

const G = (a: number) => `rgba(255,215,0,${a})`
const EASE = [0.22, 1, 0.36, 1] as const

// ── Venue data ────────────────────────────────────────────────────────────────

type VenueData = {
  id: string
  name: string
  stadium: string
  lat: number
  lng: number
  country: 'USA' | 'Canada' | 'Mexico'
  isOpening?: boolean
  isFinal?: boolean
  tx?: 'start' | 'end' | 'middle'
  dx?: number
  dy?: number
}

const VENUES: VenueData[] = [
  { id:'lumen',    name:'Seattle',        stadium:'Lumen Field',       lat:47.60,lng:-122.33,country:'USA',    tx:'start', dx:8,  dy:0   },
  { id:'bc',       name:'Vancouver',      stadium:'BC Place',          lat:49.28,lng:-123.11,country:'Canada', tx:'end',   dx:-8, dy:0   },
  { id:'levis',    name:'San Francisco',  stadium:"Levi's Stadium",   lat:37.40,lng:-121.97,country:'USA',    tx:'end',   dx:-8, dy:0   },
  { id:'sofi',     name:'Los Angeles',    stadium:'SoFi Stadium',      lat:33.95,lng:-118.34,country:'USA',    tx:'end',   dx:-8, dy:5   },
  { id:'rose',     name:'(Rose Bowl)',    stadium:'Rose Bowl',         lat:34.16,lng:-118.17,country:'USA',    tx:'end',   dx:-8, dy:-10 },
  { id:'att',      name:'Dallas',         stadium:'AT&T Stadium',      lat:32.75,lng:-97.09, country:'USA',    tx:'start', dx:8,  dy:0   },
  { id:'arrowhead',name:'Kansas City',    stadium:'Arrowhead Stadium', lat:39.05,lng:-94.48, country:'USA',    tx:'start', dx:8,  dy:0   },
  { id:'nrg',      name:'Houston',        stadium:'NRG Stadium',       lat:29.68,lng:-95.41, country:'USA',    tx:'start', dx:8,  dy:4   },
  { id:'lincoln',  name:'Philadelphia',   stadium:'Lincoln Financial', lat:39.90,lng:-75.17, country:'USA',    tx:'end',   dx:-8, dy:12  },
  { id:'metlife',  name:'New York / NJ',  stadium:'MetLife Stadium',   lat:40.81,lng:-74.07, country:'USA',    tx:'start', dx:8,  dy:-8, isFinal:true  },
  { id:'gillette', name:'Boston',         stadium:'Gillette Stadium',  lat:42.09,lng:-71.26, country:'USA',    tx:'start', dx:8,  dy:0   },
  { id:'hardrock', name:'Miami',          stadium:'Hard Rock Stadium', lat:25.96,lng:-80.24, country:'USA',    tx:'start', dx:8,  dy:4   },
  { id:'bmo',      name:'Toronto',        stadium:'BMO Field',         lat:43.63,lng:-79.42, country:'Canada', tx:'middle',dx:0,  dy:-12 },
  { id:'azteca',   name:'Mexico City',    stadium:'Estadio Azteca',    lat:19.30,lng:-99.15, country:'Mexico', tx:'middle',dx:0,  dy:14, isOpening:true },
  { id:'akron',    name:'Guadalajara',    stadium:'Estadio Akron',     lat:20.67,lng:-103.31,country:'Mexico', tx:'end',   dx:-8, dy:0   },
  { id:'bbva',     name:'Monterrey',      stadium:'Estadio BBVA',      lat:25.67,lng:-100.25,country:'Mexico', tx:'start', dx:8,  dy:0   },
]

const CONNECTIONS: [string,string][] = [
  ['bc','lumen'],['lumen','levis'],['levis','sofi'],['sofi','rose'],
  ['sofi','att'],['att','nrg'],['nrg','bbva'],['bbva','azteca'],
  ['azteca','akron'],['att','arrowhead'],['arrowhead','bmo'],
  ['bmo','metlife'],['metlife','lincoln'],['lincoln','gillette'],
  ['metlife','gillette'],['hardrock','metlife'],
]

// ── Types ─────────────────────────────────────────────────────────────────────

interface GeoState {
  usPaths: string[]
  caPaths: string[]
  mxPaths: string[]
  usOutline: string
  caOutline: string
  mxOutline: string
  venuePts: { id: string; x: number; y: number }[]
}

// ── Venue dot ─────────────────────────────────────────────────────────────────

function VenueDot({ v, pt, index }: { v: VenueData; pt: { x: number; y: number }; index: number }) {
  const { x, y } = pt
  const reduced = useReducedMotion()
  const special = !!(v.isOpening || v.isFinal)
  const r = special ? 5 : 3.5
  const delay = 1.4 + index * 0.055

  // Label anchor: shift text away from dot edge
  const tx = v.tx ?? 'start'
  const dx = v.dx ?? 8
  const dy = v.dy ?? 0
  const anchor = tx === 'end' ? 'end' : tx === 'middle' ? 'middle' : 'start'
  const lx = x + dx
  const ly = y + dy

  return (
    <g filter="url(#dot-glow)">
      {/* Expanding pulse rings — all venues */}
      {!reduced && [0, 0.9].map((rd, ri) => (
        <motion.circle key={ri} cx={x} cy={y} r={r}
          stroke={G(special ? 0.55 : 0.35)} fill="none" strokeWidth={0.7}
          animate={{ r: [r, r + (special ? 22 : 14)], opacity: [0.6, 0] }}
          transition={{ duration: special ? 2.4 : 1.8, repeat: Infinity, delay: rd, ease: 'easeOut' }}
        />
      ))}

      {/* Outer glow halo */}
      <motion.circle cx={x} cy={y} r={special ? 13 : 9} fill={G(special ? 0.14 : 0.09)}
        initial={reduced ? {} : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: false }}
        transition={{ delay, duration: 0.4, ease: 'easeOut' }}
        style={{ originX: `${x}px`, originY: `${y}px` }}
      />

      {/* Core dot */}
      <motion.circle cx={x} cy={y} r={r} fill={G(special ? 1 : 0.8)}
        initial={reduced ? {} : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: false }}
        transition={{ delay: delay + 0.05, duration: 0.25, type: 'spring', stiffness: 420, damping: 18 }}
        style={{ originX: `${x}px`, originY: `${y}px` }}
      />

      {/* City name label */}
      <motion.text
        x={lx} y={ly + 4}
        textAnchor={anchor}
        fill={G(special ? 0.85 : 0.55)}
        fontSize={special ? 10 : 8.5}
        fontFamily="'Oswald', 'Inter', sans-serif"
        fontWeight={special ? 600 : 400}
        letterSpacing="0.06em"
        style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
        initial={reduced ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }} viewport={{ once: false }}
        transition={{ delay: delay + 0.15, duration: 0.4 }}
      >
        {v.name}
      </motion.text>

      {/* Badge for opening/final */}
      {special && (
        <motion.text
          x={lx} y={ly + (anchor === 'middle' ? 16 : 16)}
          textAnchor={anchor}
          fill={G(0.65)}
          fontSize={7}
          fontFamily="'Inter', sans-serif"
          fontWeight={700}
          letterSpacing="0.10em"
          style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }} viewport={{ once: false }}
          transition={{ delay: delay + 0.25, duration: 0.4 }}
        >
          {v.isOpening ? '⬡ OPENING' : '★ FINAL'}
        </motion.text>
      )}
    </g>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function VenueMapBackground() {
  const [geo, setGeo] = useState<GeoState | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    async function load() {
      const [naAdmin1Raw, mxRaw] = await Promise.all([
        fetch('/data/na-admin1-50m.geojson').then(r => r.json()),
        fetch('/data/mx-states-10m.geojson').then(r => r.json()),
      ])

      const naAdmin1 = naAdmin1Raw as GeoJSON.FeatureCollection
      const mxData   = mxRaw as GeoJSON.FeatureCollection

      // Albers Equal-Area — purpose-built for North America, stable with rotate()
      const proj = geoAlbers()
        .rotate([100, 0])
        .center([0, 35])
        .parallels([20, 50])
        .scale(780)
        .translate([SVG_W / 2, SVG_H / 2])

      const pg = geoPath(proj)

      const usFeatures = naAdmin1.features.filter(f => f.properties?.admin === 'United States of America')
      const caFeatures = naAdmin1.features.filter(f => f.properties?.admin === 'Canada')
      const mxFeatures = mxData.features

      // Individual filled polygons per subdivision
      const usPaths = usFeatures.map(f => pg(f as GeoPermissibleObjects) ?? '')
      const caPaths = caFeatures.map(f => pg(f as GeoPermissibleObjects) ?? '')
      const mxPaths = mxFeatures.map(f => pg(f as GeoPermissibleObjects) ?? '')

      // Merged outlines per country (single path = one stroke)
      const usOutline = pg({ type: 'FeatureCollection', features: usFeatures } as GeoPermissibleObjects) ?? ''
      const caOutline = pg({ type: 'FeatureCollection', features: caFeatures } as GeoPermissibleObjects) ?? ''
      const mxOutline = pg({ type: 'FeatureCollection', features: mxFeatures } as GeoPermissibleObjects) ?? ''

      // Project venue coordinates to screen space
      const venuePts = VENUES.map(v => {
        const [x, y] = proj([v.lng, v.lat]) ?? [0, 0]
        return { id: v.id, x, y }
      })

      setGeo({ usPaths, caPaths, mxPaths, usOutline, caOutline, mxOutline, venuePts })
    }

    load().catch(console.error)
  }, [])

  const ptMap = useMemo(
    () => Object.fromEntries((geo?.venuePts ?? []).map(p => [p.id, p])),
    [geo]
  )

  return (
    <div aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}
    >
      <motion.svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <defs>
          <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {geo && (
          <>
            {/* ── Country fills (very subtle) ── */}
            <motion.g
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: false }} transition={{ duration: 1.0, delay: 0.1 }}
            >
              {geo.usPaths.map((d, i) => d && (
                <path key={`us-${i}`} d={d} fill={G(0.07)} stroke="none" />
              ))}
              {geo.caPaths.map((d, i) => d && (
                <path key={`ca-${i}`} d={d} fill={G(0.05)} stroke="none" />
              ))}
              {geo.mxPaths.map((d, i) => d && (
                <path key={`mx-${i}`} d={d} fill={G(0.06)} stroke="none" />
              ))}
            </motion.g>

            {/* ── Internal subdivision borders ── */}
            <motion.g
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: false }} transition={{ duration: 1.2, delay: 0.4 }}
            >
              {geo.usPaths.map((d, i) => d && (
                <path key={`us-b-${i}`} d={d} fill="none" stroke={G(0.14)} strokeWidth={0.6} />
              ))}
              {geo.caPaths.map((d, i) => d && (
                <path key={`ca-b-${i}`} d={d} fill="none" stroke={G(0.11)} strokeWidth={0.6} />
              ))}
              {geo.mxPaths.map((d, i) => d && (
                <path key={`mx-b-${i}`} d={d} fill="none" stroke={G(0.11)} strokeWidth={0.6} />
              ))}
            </motion.g>

            {/* ── Country outline (brighter stroke on top) ── */}
            <motion.g
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: false }} transition={{ duration: 1.0, delay: 0.6 }}
            >
              {[geo.usOutline, geo.caOutline, geo.mxOutline].map((d, i) => d && (
                <path key={`outline-${i}`} d={d} fill="none" stroke={G(0.32)} strokeWidth={1.1} />
              ))}
            </motion.g>

            {/* ── Constellation connections ── */}
            {CONNECTIONS.map(([aId, bId], i) => {
              const a = ptMap[aId], b = ptMap[bId]
              if (!a || !b) return null
              return (
                <motion.path
                  key={`${aId}-${bId}`}
                  d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                  stroke={G(0.20)} strokeWidth={0.8} fill="none"
                  initial={reduced ? {} : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: false, margin: '-80px' }}
                  transition={{
                    pathLength: { duration: 0.65, delay: 1.0 + i * 0.04, ease: EASE },
                    opacity: { duration: 0.2, delay: 1.0 + i * 0.04 },
                  }}
                />
              )
            })}

            {/* ── Venue markers ── */}
            {VENUES.map((v, i) => {
              const pt = ptMap[v.id]
              return pt ? <VenueDot key={v.id} v={v} pt={pt} index={i} /> : null
            })}
          </>
        )}
      </motion.svg>

      {/* Edge vignettes */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'linear-gradient(to right,  rgba(5,4,0,0.55) 0%, transparent 10%, transparent 90%, rgba(5,4,0,0.55) 100%)',
          'linear-gradient(to bottom, rgba(5,4,0,0.35) 0%, transparent 12%, transparent 82%, rgba(5,4,0,0.55) 100%)',
        ].join(', '),
      }} />

      {/* Centre ambient glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 75% 55% at 50% 50%, rgba(255,215,0,0.03) 0%, transparent 100%)',
      }} />
    </div>
  )
}
