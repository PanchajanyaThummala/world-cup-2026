import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type P = { id:string; name:string; group:string; tagline:string; colors:{ bg:string; surface:string; primary:string; text:string; muted:string }; glow:string; border:string; hero:string; btn:string; btnTxt:string }

const mk = (id:string,name:string,group:string,tagline:string,bg:string,surface:string,primary:string,text:string,muted:string,glowC:string,heroEnd?:string,btn?:string,btnTxt?:string):P => ({
  id,name,group,tagline,
  colors:{bg,surface,primary,text,muted},
  glow:`rgba(${glowC},0.14)`,
  border:`rgba(${glowC},0.2)`,
  hero:`linear-gradient(150deg,${bg} 0%,${heroEnd||surface} 100%)`,
  btn:btn||primary, btnTxt:btnTxt||bg,
})

const PALETTES:P[] = [
  // ── DARK (16) ──────────────────────────────────────────────────────────────
  mk('d1','FIFA Prestige','Dark','Championship navy · 24k gold','#001020','#011830','#C9A029','#FFFFFF','#5A7A99','201,160,41'),
  mk('d2','Broadcast Noir','Dark','Pure black · stadium amber','#080808','#111111','#F97316','#FAFAFA','#525252','249,115,22'),
  mk('d3','Trophy Gold','Dark','Warm black · antique 18k · ivory','#0A0805','#130F08','#D4AF37','#FDF8EE','#6B5C3E','212,175,55'),
  mk('d4','Deep Forest','Dark','Pitch black · emerald · champagne','#050F08','#081508','#4ADE80','#F0FDF4','#4B7A5E','74,222,128'),
  mk('d5','Royal Crimson','Dark','Deep wine · rose gold · pearl','#1A0508','#26090C','#F43F5E','#FFF1F2','#7A3040','244,63,94'),
  mk('d6','Midnight Galaxy','Dark','Space black · electric violet · silver','#050510','#0D0D1E','#8B5CF6','#F5F3FF','#5B5B8E','139,92,246'),
  mk('d7','Jade Luxury','Dark','Dark teal · jade green · gold','#04130F','#071A14','#2DD4BF','#F0FDF9','#3D7A6A','45,212,191'),
  mk('d8','Chrome Steel','Dark','Gunmetal · silver · white','#0C0E10','#14181C','#CBD5E1','#F8FAFC','#475569','203,213,225'),
  mk('d9','Midnight Plum','Dark','Deep purple-black · lavender · gold','#0E0818','#150D24','#C084FC','#FAF5FF','#6B4A9E','192,132,252'),
  mk('d10','Ocean Abyss','Dark','Deepest blue · aqua · white','#020C18','#031424','#06B6D4','#ECFEFF','#1E6A7A','6,182,212'),
  mk('d11','Volcanic','Dark','Dark charcoal · molten red-orange','#0F0806','#180D0A','#FF4500','#FFF5F0','#7A3A20','255,69,0'),
  mk('d12','Raven','Dark','Pure black · electric lime · white','#050505','#0A0A0A','#84CC16','#F7FEE7','#3A5A10','132,204,22'),
  mk('d13','Obsidian','Dark','True black · pure white · hairline gold','#000000','#0A0A0A','#FFFFFF','#FFFFFF','#404040','255,255,255','#C9A029','#000000'),
  mk('d14','Rust & Steel','Dark','Dark rust · silver chrome · white','#1A0C08','#240E0A','#94A3B8','#F8FAFC','#7A4030','148,163,184'),
  mk('d15','Arctic Night','Dark','Midnight navy · ice white · cyan','#040C14','#070F1C','#E0F2FE','#F0F9FF','#1E4A6A','224,242,254','#00B4D8','#040C14'),
  mk('d16','Espresso','Dark','Deep espresso brown · cream · gold','#100804','#180C06','#D4AF37','#FDF8EE','#6B4A2E','212,175,55'),
  // ── MEDIUM (10) ────────────────────────────────────────────────────────────
  mk('m1','Slate & Gold','Medium','Blue-slate · warm gold · white','#1E293B','#283447','#F59E0B','#F8FAFC','#94A3B8','245,158,11'),
  mk('m2','Forest & Flame','Medium','Forest green · fire orange · cream','#14321E','#1A3E26','#FB923C','#FFF7ED','#6B8F72','251,146,60'),
  mk('m3','Electric Blue','Medium','Deep navy · neon cyan · ice','#030B1A','#071428','#00E5FF','#E0F7FA','#3D7A9A','0,229,255'),
  mk('m4','Rose Gold Dark','Medium','Dark charcoal · rose gold · blush','#1C1419','#241C22','#F9A8D4','#FDF2F8','#8B5A6F','249,168,212'),
  mk('m5','Dusk Purple','Medium','Warm purple-grey · gold · cream','#201A2C','#2A2238','#E8B840','#FAF5FF','#7A6A9E','232,184,64'),
  mk('m6','Terracotta','Medium','Warm terracotta · cream · dark','#7C3A28','#8C4630','#FDF4E7','#1A0A06','#C4785A','253,244,231','#1A0A06','#FDF4E7'),
  mk('m7','Military Olive','Medium','Olive green · antique gold · sand','#2A2A1E','#343426','#D4AF37','#F5F0DC','#6A6A40','212,175,55'),
  mk('m8','Indigo Wave','Medium','Deep indigo · electric cyan · white','#1E1B4B','#262360','#67E8F9','#ECFEFF','#4A4A8A','103,232,249'),
  mk('m9','Copper & Stone','Medium','Blue-grey stone · copper · white','#2C2F36','#363A42','#E07B39','#F8F9FA','#8A8A9A','224,123,57'),
  mk('m10','Mocha','Medium','Warm mocha brown · cream · gold','#2C1F14','#38271A','#D4AF37','#FDF8EE','#8B6B50','212,175,55'),
  // ── LIGHT (12) ─────────────────────────────────────────────────────────────
  // Whites & Creams
  mk('l1','Arctic White','Light','Pure white · FIFA navy · gold','#F8FAFC','#FFFFFF','#1E3A5F','#0F172A','#64748B','30,58,95','#EFF6FF','#1E3A5F','#FFFFFF'),
  mk('l2','Champagne','Light','Warm cream · antique gold · espresso','#FDFAF4','#FFFDF7','#B8960C','#1C1208','#8B7355','184,150,12','#F5EDD8'),
  mk('l4','Graphite Clean','Light','Warm white · graphite · gold accent','#FAFAFA','#FFFFFF','#C9A029','#171717','#737373','201,160,41','#F5F5F5'),
  mk('l7','Pearl & Navy','Light','Pearl white · deep navy · gold','#FEFEFE','#FFFFFF','#1E3A5F','#0F172A','#94A3B8','30,58,95','#F0F4F8','#C9A029','#0F172A'),
  // Coloured light backgrounds
  mk('l3','Glacier Blue','Light','Ice blue bg · dark navy · white','#EFF6FF','#DBEAFE','#1D4ED8','#1E3A5F','#93C5FD','29,78,216','#BFDBFE','#1D4ED8','#FFFFFF'),
  mk('l5','Coral Glow','Light','Soft coral bg · dark red · white','#FFF0EC','#FFE4DC','#C2410C','#1A0A04','#F9A68A','194,65,12','#FFD5C8','#C2410C','#FFFFFF'),
  mk('l6','Sage Green','Light','Sage green bg · dark forest · gold','#F0FDF4','#DCFCE7','#14532D','#052E16','#6EE7B7','20,83,45','#BBFDE0','#14532D','#F0FDF4'),
  mk('l8','Linen Sand','Light','Warm sandy linen · chocolate · gold','#FAF7F2','#F5EFE6','#92400E','#1C0D04','#D4A574','146,64,14','#EDE0CC','#92400E','#FAF7F2'),
  mk('l9','Sky Blue','Light','Bright sky blue bg · navy · white','#E0F2FE','#BAE6FD','#0C4A6E','#082843','#38BDF8','12,74,110','#7DD3FC','#0C4A6E','#E0F2FE'),
  mk('l10','Ivory Scarlet','Light','Warm ivory bg · deep scarlet · dark','#FFFAF0','#FEF3C7','#9B1C1C','#1A0A0A','#FCA5A5','155,28,28','#FDE68A','#9B1C1C','#FFFAF0'),
  mk('l11','Nordic Red','Light','Light grey bg · bold red · dark','#F3F4F6','#E5E7EB','#DC2626','#111827','#9CA3AF','220,38,38','#D1D5DB','#DC2626','#FFFFFF'),
  mk('l12','Blush Pink','Light','Soft blush bg · deep rose · navy','#FFF1F5','#FFE4EC','#9F1239','#0F172A','#FDA4AF','159,18,57','#FECDD3','#9F1239','#FFF1F5'),
  // More distinctive light backgrounds
  mk('l13','Lavender Dream','Light','Soft lavender bg · deep violet · gold','#F5F3FF','#EDE9FE','#5B21B6','#2E1065','#A78BFA','91,33,182','#DDD6FE','#5B21B6','#F5F3FF'),
  mk('l14','Peach Glow','Light','Warm peach bg · dark orange · white','#FFF7ED','#FFEDD5','#C2410C','#7C2D12','#FB923C','194,65,12','#FED7AA','#C2410C','#FFFFFF'),
  mk('l15','Seafoam','Light','Seafoam teal bg · dark teal · white','#F0FDFA','#CCFBF1','#0F766E','#042F2E','#34D399','15,118,110','#99F6E4','#0F766E','#F0FDFA'),
  mk('l16','Sunflower','Light','Warm yellow bg · dark brown · black','#FEFCE8','#FEF9C3','#713F12','#1C0A02','#CA8A04','113,63,18','#FEF08A','#713F12','#FEFCE8'),
  mk('l17','Rose Garden','Light','Dusty rose bg · deep burgundy · gold','#FFF1F2','#FFE4E6','#881337','#1A0A0D','#FB7185','136,19,55','#FECDD3','#881337','#FFF1F2'),
  mk('l18','Mint Breeze','Light','Minty green bg · dark forest · navy','#F0FDF4','#DCFCE7','#166534','#052E16','#86EFAC','22,101,52','#A7F3D0','#166534','#F0FDF4'),
  mk('l19','Storm Grey','Light','Cool grey bg · navy · electric blue','#F8FAFC','#F1F5F9','#1E40AF','#0F172A','#93C5FD','30,64,175','#E2E8F0','#1E40AF','#FFFFFF'),
  mk('l20','Golden Hour','Light','Warm amber bg · deep brown · white','#FFFBEB','#FEF3C7','#78350F','#1C0902','#D97706','120,53,15','#FDE68A','#78350F','#FFFBEB'),
  // ── VIBRANT (12) ───────────────────────────────────────────────────────────
  mk('v1','Sunset Sport','Vibrant','Bold coral-orange · pure white','#EA4500','#FF5722','#FFFFFF','#FFFFFF','#FFD0C0','255,255,255','#FF6B2B','#FFFFFF','#EA4500'),
  mk('v2','Neon Night','Vibrant','Ultra dark · neon green · electric','#020A04','#031206','#39FF14','#ECFDF5','#2A5C30','57,255,20'),
  mk('v3','Electric Violet','Vibrant','Pure bright purple · white · gold','#3B0764','#4C1D95','#FFFFFF','#FFFFFF','#C4B5FD','255,255,255','#5B21B6','#FBBF24','#3B0764'),
  mk('v4','Hot Magenta','Vibrant','Vivid magenta · black · white','#7C0E5A','#9D1272','#FFFFFF','#FFFFFF','#F9A8D4','255,255,255','#9D1272','#FFFFFF','#7C0E5A'),
  mk('v5','Acid Gold','Vibrant','Deep black · acid yellow-gold · white','#050400','#0A0800','#FFD700','#FFFFF0','#8B7A00','255,215,0'),
  mk('v6','Tropical Teal','Vibrant','Bright teal bg · dark · white','#0D9488','#0F766E','#FFFFFF','#F0FDFA','#99F6E4','255,255,255','#0F766E','#FFFFFF','#0D9488'),
  mk('v7','Blood Orange','Vibrant','Deep blood orange · white · black','#C2410C','#EA580C','#FFFFFF','#FFF7ED','#FED7AA','255,255,255','#EA580C','#FFFFFF','#C2410C'),
  mk('v8','Cobalt Flash','Vibrant','Cobalt blue · white · light','#1D4ED8','#2563EB','#FFFFFF','#EFF6FF','#BFDBFE','255,255,255','#2563EB','#FFFFFF','#1D4ED8'),
  mk('v9','Scarlet Stadium','Vibrant','Vivid red · gold · white','#BE123C','#E11D48','#FFD700','#FFF5F7','#FDA4AF','255,215,0'),
  mk('v10','Ultra Lime','Vibrant','Electric lime · near black · white','#3D9900','#4CAF50','#000000','#F7FEE7','#86EFAC','0,0,0','#4CAF50','#000000','#3D9900'),
  mk('v11','Deep Sky','Vibrant','Electric sky blue · dark navy · white','#0284C7','#0369A1','#FFFFFF','#F0F9FF','#BAE6FD','255,255,255','#0369A1','#FFFFFF','#0284C7'),
  mk('v12','Royal Purple Burst','Vibrant','Rich purple · gold · white','#6D28D9','#7C3AED','#FCD34D','#FAF5FF','#C4B5FD','252,211,77'),
]

function MiniCard({ p, onClick }: { p:P; onClick:()=>void }) {
  return (
    <motion.div whileHover={{ y:-5, scale:1.03 }} transition={{ duration:0.18, ease:[0.22,1,0.36,1] }} onClick={onClick}
      style={{ background:p.colors.bg, border:`1.5px solid ${p.border}`, borderRadius:16, overflow:'hidden', cursor:'pointer', boxShadow:`0 4px 20px ${p.glow}` }}>
      <div style={{ background:p.hero, padding:'18px 16px 14px', position:'relative', borderBottom:`1px solid ${p.border}` }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 40% 0%,${p.glow} 0%,transparent 70%)` }} />
        <div style={{ position:'relative' }}>
          <p style={{ color:p.colors.primary, fontSize:7, letterSpacing:'0.16em', textTransform:'uppercase', fontFamily:'Inter,sans-serif', marginBottom:5, fontWeight:700 }}>FIFA WC 2026</p>
          <p style={{ color:p.colors.text, fontFamily:'Bebas Neue,sans-serif', fontSize:26, lineHeight:0.9 }}>WORLD</p>
          <p style={{ color:p.colors.primary, fontFamily:'Bebas Neue,sans-serif', fontSize:26, lineHeight:0.9 }}>CUP 2026</p>
          <div style={{ display:'flex', gap:12, marginTop:10 }}>
            {[['48','Teams'],['104','Matches']].map(([n,l]) => (
              <div key={l}>
                <p style={{ color:p.colors.primary, fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:16, lineHeight:1 }}>{n}</p>
                <p style={{ color:p.colors.muted, fontSize:7, letterSpacing:'0.08em', textTransform:'uppercase' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background:p.colors.surface, padding:'10px 12px' }}>
        <p style={{ color:p.colors.primary, fontFamily:'Bebas Neue,sans-serif', fontSize:14, marginBottom:5 }}>A GROUP</p>
        {['🇲🇽 MEX','🇧🇷 BRA','🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENG','🇦🇷 ARG'].map((t,i) => (
          <div key={t} style={{ display:'flex', justifyContent:'space-between', padding:'3px 0', borderTop:`1px solid ${p.border}`, color:i<2?p.colors.text:p.colors.muted, fontSize:9 }}>
            <span>{t}</span><span style={{ color:i<2?p.colors.primary:p.colors.muted, fontWeight:700, fontFamily:'Oswald,sans-serif' }}>0</span>
          </div>
        ))}
      </div>
      <div style={{ background:p.colors.surface, padding:'6px 12px', display:'flex', gap:3, borderTop:`1px solid ${p.border}` }}>
        {[p.colors.bg,p.colors.surface,p.colors.primary,p.colors.text,p.colors.muted].map((c,i) => (
          <div key={i} title={c} style={{ flex:1, height:14, borderRadius:3, background:c, border:`1px solid ${p.border}` }} />
        ))}
      </div>
    </motion.div>
  )
}

function FullPreview({ p, onBack, onSelect }: { p:P; onBack:()=>void; onSelect:()=>void }) {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{ background:p.colors.bg, minHeight:'100vh', fontFamily:'Inter,sans-serif' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 56px', height:60, position:'sticky', top:0, zIndex:10, background:`${p.colors.bg}EE`, backdropFilter:'blur(16px)', borderBottom:`1px solid ${p.border}` }}>
        <span style={{ color:p.colors.text, fontFamily:'Bebas Neue,sans-serif', fontSize:22, letterSpacing:'0.08em' }}>WC<span style={{ color:p.colors.primary }}>2026</span></span>
        <div style={{ display:'flex', gap:2 }}>{['Groups','Venues','History','Legends','Bracket'].map(l => <span key={l} style={{ color:p.colors.muted, fontSize:13, padding:'6px 12px' }}>{l}</span>)}</div>
        <button onClick={onBack} style={{ background:'transparent', border:`1px solid ${p.border}`, color:p.colors.muted, borderRadius:8, padding:'7px 16px', cursor:'pointer', fontSize:13 }}>← Gallery</button>
      </div>
      <div style={{ background:p.hero, padding:'80px 72px 60px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 80% 60% at 50% 60%,${p.glow} 0%,transparent 70%)` }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:900 }}>
          <p style={{ color:p.colors.primary, fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:20, fontWeight:700 }}>The Greatest Tournament on Earth</p>
          <p style={{ color:p.colors.text, fontFamily:'Bebas Neue,sans-serif', fontSize:100, lineHeight:0.88, letterSpacing:'0.03em' }}>FIFA</p>
          <p style={{ color:p.colors.primary, fontFamily:'Bebas Neue,sans-serif', fontSize:88, lineHeight:0.88, letterSpacing:'0.02em' }}>WORLD CUP</p>
          <p style={{ color:'transparent', fontFamily:'Bebas Neue,sans-serif', fontSize:112, lineHeight:0.85, WebkitTextStroke:`2px ${p.border}` }}>2026</p>
          <p style={{ color:p.colors.muted, fontSize:17, marginTop:24, lineHeight:1.6 }}>June 11 – July 19, 2026 · USA · Canada · Mexico</p>
          <button style={{ background:p.btn, color:p.btnTxt, border:'none', borderRadius:8, padding:'15px 40px', fontSize:15, fontWeight:700, letterSpacing:'0.06em', cursor:'default', marginTop:28, boxShadow:`0 0 32px ${p.glow}` }}>Explore the tournament</button>
        </div>
      </div>
      <div style={{ background:p.colors.surface, borderTop:`1px solid ${p.border}`, borderBottom:`1px solid ${p.border}`, padding:'22px 72px', display:'flex', justifyContent:'center', gap:52 }}>
        {[['48','Teams'],['12','Groups'],['16','Venues'],['104','Matches'],['32','Days']].map(([n,l]) => (
          <div key={l} style={{ textAlign:'center' }}>
            <p style={{ color:p.colors.primary, fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:40, lineHeight:1 }}>{n}</p>
            <p style={{ color:p.colors.muted, fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', marginTop:6 }}>{l}</p>
          </div>
        ))}
      </div>
      <div style={{ padding:'44px 72px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:22, maxWidth:1200, margin:'0 auto' }}>
        {['A','B','C'].map(label => (
          <div key={label} style={{ background:p.colors.surface, border:`1px solid ${p.border}`, borderRadius:18, padding:28, boxShadow:`0 4px 24px ${p.glow}` }}>
            <p style={{ color:p.colors.primary, fontFamily:'Bebas Neue,sans-serif', fontSize:32, marginBottom:16 }}>{label} <span style={{ color:p.colors.muted, fontSize:11, fontFamily:'Inter,sans-serif' }}>GROUP</span></p>
            {['MEX 🇲🇽','BRA 🇧🇷','ENG 🏴󠁧󠁢󠁥󠁮󠁧󠁿','ARG 🇦🇷'].map((t,i) => (
              <div key={t} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderTop:`1px solid ${p.border}`, color:i<2?p.colors.text:p.colors.muted, fontSize:13 }}>
                <span>{t}</span><span style={{ color:i<2?p.colors.primary:p.colors.muted, fontWeight:700, fontFamily:'Oswald,sans-serif' }}>0</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ textAlign:'center', padding:'8px 72px 72px' }}>
        <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} onClick={onSelect}
          style={{ background:p.btn, color:p.btnTxt, border:'none', borderRadius:10, padding:'16px 52px', fontSize:17, fontWeight:700, letterSpacing:'0.06em', cursor:'pointer', fontFamily:'Inter,sans-serif', boxShadow:`0 0 40px ${p.glow}` }}>
          ✓ Select {p.name}
        </motion.button>
        <p style={{ color:p.colors.muted, fontSize:12, marginTop:14 }}>Records your colour decision for the next development phase</p>
      </div>
    </motion.div>
  )
}

function Confirmed({ p, onReset }: { p:P; onReset:()=>void }) {
  const [copied, setCopied] = useState(false)
  const tokens = `:root {\n${Object.entries(p.colors).map(([k,v])=>`  --color-${k}: ${v};`).join('\n')}\n}`
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
      style={{ minHeight:'100vh', background:p.colors.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:32 }}>
      <div style={{ background:p.colors.surface, border:`1.5px solid ${p.border}`, borderRadius:28, padding:52, maxWidth:540, width:'100%', textAlign:'center', boxShadow:`0 8px 80px ${p.glow}` }}>
        <div style={{ fontSize:52, marginBottom:8 }}>🏆</div>
        <h1 style={{ color:p.colors.text, fontFamily:'Bebas Neue,sans-serif', fontSize:52, letterSpacing:'0.04em', marginBottom:6 }}>{p.name}</h1>
        <p style={{ color:p.colors.muted, fontSize:14, marginBottom:32 }}>{p.tagline}</p>
        <div style={{ background:p.colors.bg, border:`1px solid ${p.border}`, borderRadius:12, padding:'16px 20px', textAlign:'left', marginBottom:24 }}>
          <pre style={{ color:p.colors.primary, fontSize:12, fontFamily:'monospace', margin:0, whiteSpace:'pre-wrap', lineHeight:1.8 }}>{tokens}</pre>
        </div>
        <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
          <button onClick={()=>{ navigator.clipboard.writeText(tokens); setCopied(true); setTimeout(()=>setCopied(false),2000) }}
            style={{ background:p.btn, color:p.btnTxt, border:'none', borderRadius:8, padding:'12px 28px', fontWeight:700, cursor:'pointer', fontSize:14 }}>
            {copied?'✓ Copied!':'📋 Copy Tokens'}
          </button>
          <button onClick={onReset} style={{ background:'transparent', color:p.colors.muted, border:`1.5px solid ${p.border}`, borderRadius:8, padding:'12px 22px', cursor:'pointer', fontSize:14 }}>← Try another</button>
        </div>
      </div>
    </motion.div>
  )
}

export function PalettePage() {
  const [selected, setSelected] = useState<P|null>(null)
  const [confirmed, setConfirmed] = useState<P|null>(null)

  if (confirmed) return <Confirmed p={confirmed} onReset={()=>{setConfirmed(null);setSelected(null)}} />
  if (selected) return <AnimatePresence><FullPreview p={selected} onBack={()=>setSelected(null)} onSelect={()=>setConfirmed(selected)} /></AnimatePresence>

  const groups = [
    { label:'Dark', sub:'Rich, deep, dramatic backgrounds', items:PALETTES.filter(p=>p.group==='Dark') },
    { label:'Medium', sub:'Mid-tone, balanced, editorial', items:PALETTES.filter(p=>p.group==='Medium') },
    { label:'Light', sub:'Clean, bright, accessible', items:PALETTES.filter(p=>p.group==='Light') },
    { label:'Vibrant', sub:'Bold, saturated, high-energy', items:PALETTES.filter(p=>p.group==='Vibrant') },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#080A0F', padding:'52px 40px 80px', fontFamily:'Inter,sans-serif' }}>
      <div style={{ maxWidth:1500, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <p style={{ color:'#C9A84C', fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:12 }}>Design Direction · Phase 2</p>
          <h1 style={{ color:'#FFFFFF', fontFamily:'Bebas Neue,sans-serif', fontSize:76, lineHeight:0.88, letterSpacing:'0.03em', marginBottom:16 }}>50 Colour Worlds</h1>
          <p style={{ color:'#6B7280', fontSize:16, maxWidth:480, margin:'0 auto', lineHeight:1.65 }}>Dark, light, vibrant, mixed — every combination. Click any card → full-screen preview → select your direction.</p>
        </div>

        {groups.map(({ label, sub, items }) => (
          <div key={label} style={{ marginBottom:56 }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:8 }}>
              <span style={{ color:'#C9A84C', fontSize:13, letterSpacing:'0.14em', textTransform:'uppercase', fontWeight:700 }}>{label}</span>
              <div style={{ flex:1, height:1, background:'rgba(201,168,76,0.15)' }} />
              <span style={{ color:'#4B5563', fontSize:11 }}>{items.length} options</span>
            </div>
            <p style={{ color:'#4B5563', fontSize:12, marginBottom:20 }}>{sub}</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:18 }}>
              {items.map(p => (
                <div key={p.id}>
                  <MiniCard p={p} onClick={()=>setSelected(p)} />
                  <p style={{ color:'#E5E7EB', fontSize:12, fontWeight:600, textAlign:'center', marginTop:10, marginBottom:2 }}>{p.name}</p>
                  <p style={{ color:'#6B7280', fontSize:10, textAlign:'center', lineHeight:1.4 }}>{p.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
