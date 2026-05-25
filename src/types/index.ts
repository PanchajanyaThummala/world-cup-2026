export type Confederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC'
export type HostCountry = 'USA' | 'Canada' | 'Mexico'
export type Era = '1930s' | '1950s' | '1960s' | '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s'
export type FactCategory = 'Records' | 'Firsts' | 'Oddities' | 'Stats' | 'Forgotten Heroes'
export type ImpactCategory = 'Politics' | 'Identity' | 'Economics' | 'Social' | 'Human Rights' | 'Diplomacy'
export type KnockoutRound = 'R32' | 'R16' | 'QF' | 'SF' | '3rd' | 'Final'
export type MomentCategory = 'Goal' | 'Match' | 'Player' | 'Final' | 'Upset' | 'Controversy'
export type MatchStage = 'Group Stage' | 'Round of 32' | 'Round of 16' | 'Quarter-final' | 'Semi-final' | '3rd Place' | 'Final'

export interface Team {
  name: string
  code: string
  flag: string
  group: string
  confederation: Confederation
}

export interface GroupStanding {
  team: Team
  mp: number
  w: number
  d: number
  l: number
  gf: number
  ga: number
  gd: number
  pts: number
}

export interface Group {
  label: string
  name: string
  standings: GroupStanding[]
}

export interface Venue {
  id: string
  name: string
  city: string
  state?: string
  country: HostCountry
  capacity: number
  isOpeningVenue?: boolean
  isFinalVenue?: boolean
}

export interface Match {
  id: string
  date: string
  time: string
  stage: MatchStage
  group?: string
  homeTeam: string
  awayTeam: string
  venue: string
  homeScore?: number
  awayScore?: number
}

export interface HistoricMoment {
  id: string
  year: number
  host: string
  title: string
  narrative: string
  significance: string
  era: Era
  category: MomentCategory
  photo?: string
  objectPosition?: string
  imageBrightness?: number
  contentAlign?: 'top' | 'bottom'
  disableKenBurns?: boolean
  kenBurnsOut?: boolean
  sourceUrl?: string
}

export interface Legend {
  id: string
  name: string
  nation: string
  flag: string
  era: string
  description: string
  photo?: string
}

export interface ImpactStory {
  id: string
  year: number
  tournament: string
  title: string
  narrative: string
  eraBadge: string
  category: ImpactCategory
}

export interface DeepFact {
  id: string
  hook: string
  supporting: string
  category: FactCategory
  year?: number
}

export interface KnockoutSlot {
  id: string
  round: KnockoutRound
  matchNumber: number
  teamA: string
  teamB: string
  scoreA?: number
  scoreB?: number
  winner?: string
  date?: string
  venue?: string
}
