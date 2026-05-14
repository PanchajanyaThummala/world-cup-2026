import { CursorFollower } from '@/components/ui/CursorFollower'
import { CountdownBanner } from '@/components/layout/CountdownBanner'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/features/hero/HeroSection'
import { TournamentStats } from '@/components/features/hero/TournamentStats'
import { GroupsSection } from '@/components/features/groups/GroupsSection'
import { VenuesSection } from '@/components/features/venues/VenuesSection'
import { NostalgiaSection } from '@/components/features/nostalgia/NostalgiaSection'
import { ImpactSection } from '@/components/features/impact/ImpactSection'
import { LegendsSection } from '@/components/features/legends/LegendsSection'
import { FactsSection } from '@/components/features/facts/FactsSection'
import { BracketSection } from '@/components/features/bracket/BracketSection'

export default function App() {
  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E5E7EB' }}>
      <CursorFollower />
      <CountdownBanner />
      <Navbar />
      <main>
        <HeroSection />
        <TournamentStats />
        <GroupsSection />
        <VenuesSection />
        <NostalgiaSection />
        <ImpactSection />
        <LegendsSection />
        <FactsSection />
        <BracketSection />
      </main>
      <Footer />
    </div>
  )
}
