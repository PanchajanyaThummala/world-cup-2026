import type { KnockoutSlot } from '@/types'

const tbd = (id: string, round: KnockoutSlot['round'], matchNumber: number): KnockoutSlot => ({
  id,
  round,
  matchNumber,
  teamA: 'TBD',
  teamB: 'TBD',
})

export const KNOCKOUT_BRACKET: KnockoutSlot[] = [
  // Round of 32 (32 slots)
  ...Array.from({ length: 32 }, (_, i) => tbd(`r32-m${String(i + 1).padStart(2, '0')}`, 'R32', i + 1)),
  // Round of 16 (16 slots)
  ...Array.from({ length: 16 }, (_, i) => tbd(`r16-m${String(i + 1).padStart(2, '0')}`, 'R16', i + 1)),
  // Quarter-finals (8 slots)
  ...Array.from({ length: 8 }, (_, i) => tbd(`qf-m${String(i + 1).padStart(2, '0')}`, 'QF', i + 1)),
  // Semi-finals (4 slots)
  ...Array.from({ length: 4 }, (_, i) => tbd(`sf-m${String(i + 1).padStart(2, '0')}`, 'SF', i + 1)),
  // 3rd place
  tbd('3rd-m01', '3rd', 1),
  // Final
  tbd('final-m01', 'Final', 1),
]
