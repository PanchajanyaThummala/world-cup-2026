import type { Group } from '@/types'
import { TEAMS } from './teams'

const zeroed = (team: typeof TEAMS[0]) => ({
  team,
  mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0,
})

const teamsInGroup = (label: string) =>
  TEAMS.filter(t => t.group === label).map(zeroed)

export const GROUPS: Group[] = [
  { label: 'A', name: 'Group A', standings: teamsInGroup('A') },
  { label: 'B', name: 'Group B', standings: teamsInGroup('B') },
  { label: 'C', name: 'Group C', standings: teamsInGroup('C') },
  { label: 'D', name: 'Group D', standings: teamsInGroup('D') },
  { label: 'E', name: 'Group E', standings: teamsInGroup('E') },
  { label: 'F', name: 'Group F', standings: teamsInGroup('F') },
  { label: 'G', name: 'Group G', standings: teamsInGroup('G') },
  { label: 'H', name: 'Group H', standings: teamsInGroup('H') },
  { label: 'I', name: 'Group I', standings: teamsInGroup('I') },
  { label: 'J', name: 'Group J', standings: teamsInGroup('J') },
  { label: 'K', name: 'Group K', standings: teamsInGroup('K') },
  { label: 'L', name: 'Group L', standings: teamsInGroup('L') },
]
