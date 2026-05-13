import type { Team } from '@/types'

export const TEAMS: Team[] = [
  // Group A
  { name: 'Mexico', code: 'MEX', flag: '🇲🇽', group: 'A', confederation: 'CONCACAF' },
  { name: 'South Korea', code: 'KOR', flag: '🇰🇷', group: 'A', confederation: 'AFC' },
  { name: 'South Africa', code: 'RSA', flag: '🇿🇦', group: 'A', confederation: 'CAF' },
  { name: 'Czechia', code: 'CZE', flag: '🇨🇿', group: 'A', confederation: 'UEFA' },

  // Group B
  { name: 'Canada', code: 'CAN', flag: '🇨🇦', group: 'B', confederation: 'CONCACAF' },
  { name: 'Switzerland', code: 'SUI', flag: '🇨🇭', group: 'B', confederation: 'UEFA' },
  { name: 'Qatar', code: 'QAT', flag: '🇶🇦', group: 'B', confederation: 'AFC' },
  { name: 'Bosnia and Herzegovina', code: 'BIH', flag: '🇧🇦', group: 'B', confederation: 'UEFA' },

  // Group C
  { name: 'Brazil', code: 'BRA', flag: '🇧🇷', group: 'C', confederation: 'CONMEBOL' },
  { name: 'Morocco', code: 'MAR', flag: '🇲🇦', group: 'C', confederation: 'CAF' },
  { name: 'Scotland', code: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C', confederation: 'UEFA' },
  { name: 'Haiti', code: 'HAI', flag: '🇭🇹', group: 'C', confederation: 'CONCACAF' },

  // Group D
  { name: 'USA', code: 'USA', flag: '🇺🇸', group: 'D', confederation: 'CONCACAF' },
  { name: 'Paraguay', code: 'PAR', flag: '🇵🇾', group: 'D', confederation: 'CONMEBOL' },
  { name: 'Australia', code: 'AUS', flag: '🇦🇺', group: 'D', confederation: 'AFC' },
  { name: 'Türkiye', code: 'TUR', flag: '🇹🇷', group: 'D', confederation: 'UEFA' },

  // Group E
  { name: 'Germany', code: 'GER', flag: '🇩🇪', group: 'E', confederation: 'UEFA' },
  { name: 'Ecuador', code: 'ECU', flag: '🇪🇨', group: 'E', confederation: 'CONMEBOL' },
  { name: "Côte d'Ivoire", code: 'CIV', flag: '🇨🇮', group: 'E', confederation: 'CAF' },
  { name: 'Curaçao', code: 'CUW', flag: '🇨🇼', group: 'E', confederation: 'CONCACAF' },

  // Group F
  { name: 'Netherlands', code: 'NED', flag: '🇳🇱', group: 'F', confederation: 'UEFA' },
  { name: 'Japan', code: 'JPN', flag: '🇯🇵', group: 'F', confederation: 'AFC' },
  { name: 'Tunisia', code: 'TUN', flag: '🇹🇳', group: 'F', confederation: 'CAF' },
  { name: 'Sweden', code: 'SWE', flag: '🇸🇪', group: 'F', confederation: 'UEFA' },

  // Group G
  { name: 'Belgium', code: 'BEL', flag: '🇧🇪', group: 'G', confederation: 'UEFA' },
  { name: 'Iran', code: 'IRN', flag: '🇮🇷', group: 'G', confederation: 'AFC' },
  { name: 'Egypt', code: 'EGY', flag: '🇪🇬', group: 'G', confederation: 'CAF' },
  { name: 'New Zealand', code: 'NZL', flag: '🇳🇿', group: 'G', confederation: 'OFC' },

  // Group H
  { name: 'Spain', code: 'ESP', flag: '🇪🇸', group: 'H', confederation: 'UEFA' },
  { name: 'Uruguay', code: 'URU', flag: '🇺🇾', group: 'H', confederation: 'CONMEBOL' },
  { name: 'Saudi Arabia', code: 'KSA', flag: '🇸🇦', group: 'H', confederation: 'AFC' },
  { name: 'Cape Verde', code: 'CPV', flag: '🇨🇻', group: 'H', confederation: 'CAF' },

  // Group I
  { name: 'France', code: 'FRA', flag: '🇫🇷', group: 'I', confederation: 'UEFA' },
  { name: 'Senegal', code: 'SEN', flag: '🇸🇳', group: 'I', confederation: 'CAF' },
  { name: 'Norway', code: 'NOR', flag: '🇳🇴', group: 'I', confederation: 'UEFA' },
  { name: 'Iraq', code: 'IRQ', flag: '🇮🇶', group: 'I', confederation: 'AFC' },

  // Group J
  { name: 'Argentina', code: 'ARG', flag: '🇦🇷', group: 'J', confederation: 'CONMEBOL' },
  { name: 'Austria', code: 'AUT', flag: '🇦🇹', group: 'J', confederation: 'UEFA' },
  { name: 'Algeria', code: 'ALG', flag: '🇩🇿', group: 'J', confederation: 'CAF' },
  { name: 'Jordan', code: 'JOR', flag: '🇯🇴', group: 'J', confederation: 'AFC' },

  // Group K
  { name: 'Portugal', code: 'POR', flag: '🇵🇹', group: 'K', confederation: 'UEFA' },
  { name: 'Colombia', code: 'COL', flag: '🇨🇴', group: 'K', confederation: 'CONMEBOL' },
  { name: 'Uzbekistan', code: 'UZB', flag: '🇺🇿', group: 'K', confederation: 'AFC' },
  { name: 'DR Congo', code: 'COD', flag: '🇨🇩', group: 'K', confederation: 'CAF' },

  // Group L
  { name: 'England', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L', confederation: 'UEFA' },
  { name: 'Croatia', code: 'CRO', flag: '🇭🇷', group: 'L', confederation: 'UEFA' },
  { name: 'Panama', code: 'PAN', flag: '🇵🇦', group: 'L', confederation: 'CONCACAF' },
  { name: 'Ghana', code: 'GHA', flag: '🇬🇭', group: 'L', confederation: 'CAF' },
]
