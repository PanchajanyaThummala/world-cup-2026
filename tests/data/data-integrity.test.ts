import { describe, it, expect } from 'vitest'
import { TEAMS } from '@/data/teams'
import { GROUPS } from '@/data/groups'
import { VENUES } from '@/data/venues'
import { HISTORIC_MOMENTS } from '@/data/moments'
import { IMPACT_STORIES } from '@/data/impact-stories'
import { DEEP_FACTS } from '@/data/facts'

describe('Teams data integrity', () => {
  it('has exactly 48 teams', () => {
    expect(TEAMS).toHaveLength(48)
  })

  it('all team codes are unique', () => {
    const codes = TEAMS.map(t => t.code)
    expect(new Set(codes).size).toBe(48)
  })

  it('all team groups are A–L', () => {
    const validGroups = ['A','B','C','D','E','F','G','H','I','J','K','L']
    TEAMS.forEach(t => expect(validGroups).toContain(t.group))
  })

  it('each group has exactly 4 teams', () => {
    const groupCounts: Record<string, number> = {}
    TEAMS.forEach(t => { groupCounts[t.group] = (groupCounts[t.group] ?? 0) + 1 })
    Object.values(groupCounts).forEach(count => expect(count).toBe(4))
  })
})

describe('Groups data integrity', () => {
  it('has exactly 12 groups', () => {
    expect(GROUPS).toHaveLength(12)
  })

  it('each group has exactly 4 standings', () => {
    GROUPS.forEach(g => expect(g.standings).toHaveLength(4))
  })

  it('groups are labeled A through L', () => {
    const labels = GROUPS.map(g => g.label).sort()
    expect(labels).toEqual(['A','B','C','D','E','F','G','H','I','J','K','L'])
  })
})

describe('Venues data integrity', () => {
  it('has exactly 16 venues', () => {
    expect(VENUES).toHaveLength(16)
  })

  it('has 11 USA venues', () => {
    expect(VENUES.filter(v => v.country === 'USA')).toHaveLength(11)
  })

  it('has 2 Canada venues', () => {
    expect(VENUES.filter(v => v.country === 'Canada')).toHaveLength(2)
  })

  it('has 3 Mexico venues', () => {
    expect(VENUES.filter(v => v.country === 'Mexico')).toHaveLength(3)
  })

  it('all venue ids are unique', () => {
    const ids = VENUES.map(v => v.id)
    expect(new Set(ids).size).toBe(16)
  })
})

describe('Historic moments data integrity', () => {
  it('has at least 15 moments', () => {
    expect(HISTORIC_MOMENTS.length).toBeGreaterThanOrEqual(15)
  })

  it('covers at least 5 different eras', () => {
    const eras = new Set(HISTORIC_MOMENTS.map(m => m.era))
    expect(eras.size).toBeGreaterThanOrEqual(5)
  })

  it('all years are valid World Cup years', () => {
    const wcYears = [1930,1934,1938,1950,1954,1958,1962,1966,1970,1974,
                     1978,1982,1986,1990,1994,1998,2002,2006,2010,2014,2018,2022]
    HISTORIC_MOMENTS.forEach(m => expect(wcYears).toContain(m.year))
  })
})

describe('Impact stories data integrity', () => {
  it('has at least 6 impact stories', () => {
    expect(IMPACT_STORIES.length).toBeGreaterThanOrEqual(6)
  })

  it('covers at least 3 different categories', () => {
    const cats = new Set(IMPACT_STORIES.map(s => s.category))
    expect(cats.size).toBeGreaterThanOrEqual(3)
  })
})

describe('Deep facts data integrity', () => {
  it('has at least 10 facts', () => {
    expect(DEEP_FACTS.length).toBeGreaterThanOrEqual(10)
  })

  it('all hooks are non-empty and under 100 chars', () => {
    DEEP_FACTS.forEach(f => {
      expect(f.hook.length).toBeGreaterThan(0)
      expect(f.hook.length).toBeLessThanOrEqual(100)
    })
  })

  it('covers all 5 fact categories', () => {
    const cats = new Set(DEEP_FACTS.map(f => f.category))
    const required = ['Records','Firsts','Oddities','Stats','Forgotten Heroes']
    required.forEach(c => expect(cats).toContain(c))
  })
})
