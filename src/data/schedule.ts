import type { Match } from '@/types'

// 72 group stage matches — Groups A–L, June 11 – July 2, 2026
// Matchday 1 = MD1 (each group's first 2 fixtures)
// Matchday 2 = MD2 (each group's middle 2 fixtures)
// Matchday 3 = MD3 (each group's final 2 fixtures — simultaneous kick-offs)

export const MATCHES: Match[] = [
  // ── MATCHDAY 1 ── June 11–18 ─────────────────────────────────────────────

  // June 11
  { id: 'm001', date: '2026-06-11', time: '20:00 ET', stage: 'Group Stage', group: 'A', homeTeam: 'MEX', awayTeam: 'KOR', venue: 'estadio-azteca' },
  { id: 'm002', date: '2026-06-11', time: '15:00 ET', stage: 'Group Stage', group: 'B', homeTeam: 'CAN', awayTeam: 'SUI', venue: 'bmo-field' },
  { id: 'm003', date: '2026-06-11', time: '12:00 ET', stage: 'Group Stage', group: 'C', homeTeam: 'BRA', awayTeam: 'MAR', venue: 'sofi-stadium' },

  // June 12
  { id: 'm004', date: '2026-06-12', time: '20:00 ET', stage: 'Group Stage', group: 'D', homeTeam: 'USA', awayTeam: 'PAR', venue: 'metlife-stadium' },
  { id: 'm005', date: '2026-06-12', time: '16:00 ET', stage: 'Group Stage', group: 'E', homeTeam: 'GER', awayTeam: 'ECU', venue: 'att-stadium' },
  { id: 'm006', date: '2026-06-12', time: '12:00 ET', stage: 'Group Stage', group: 'F', homeTeam: 'NED', awayTeam: 'JPN', venue: 'sofi-stadium' },

  // June 13
  { id: 'm007', date: '2026-06-13', time: '20:00 ET', stage: 'Group Stage', group: 'G', homeTeam: 'BEL', awayTeam: 'IRN', venue: 'hard-rock-stadium' },
  { id: 'm008', date: '2026-06-13', time: '16:00 ET', stage: 'Group Stage', group: 'H', homeTeam: 'ESP', awayTeam: 'URU', venue: 'estadio-bbva' },
  { id: 'm009', date: '2026-06-13', time: '12:00 ET', stage: 'Group Stage', group: 'I', homeTeam: 'FRA', awayTeam: 'SEN', venue: 'lincoln-financial-field' },

  // June 14
  { id: 'm010', date: '2026-06-14', time: '20:00 ET', stage: 'Group Stage', group: 'J', homeTeam: 'ARG', awayTeam: 'AUT', venue: 'arrowhead-stadium' },
  { id: 'm011', date: '2026-06-14', time: '16:00 ET', stage: 'Group Stage', group: 'K', homeTeam: 'POR', awayTeam: 'COL', venue: 'levis-stadium' },
  { id: 'm012', date: '2026-06-14', time: '12:00 ET', stage: 'Group Stage', group: 'L', homeTeam: 'ENG', awayTeam: 'CRO', venue: 'gillette-stadium' },

  // June 15
  { id: 'm013', date: '2026-06-15', time: '20:00 ET', stage: 'Group Stage', group: 'A', homeTeam: 'RSA', awayTeam: 'CZE', venue: 'estadio-akron' },
  { id: 'm014', date: '2026-06-15', time: '16:00 ET', stage: 'Group Stage', group: 'B', homeTeam: 'QAT', awayTeam: 'BIH', venue: 'bc-place' },
  { id: 'm015', date: '2026-06-15', time: '12:00 ET', stage: 'Group Stage', group: 'C', homeTeam: 'SCO', awayTeam: 'HAI', venue: 'nrg-stadium' },

  // June 16
  { id: 'm016', date: '2026-06-16', time: '20:00 ET', stage: 'Group Stage', group: 'D', homeTeam: 'AUS', awayTeam: 'TUR', venue: 'centurylink-field' },
  { id: 'm017', date: '2026-06-16', time: '16:00 ET', stage: 'Group Stage', group: 'E', homeTeam: 'CIV', awayTeam: 'CUW', venue: 'att-stadium' },
  { id: 'm018', date: '2026-06-16', time: '12:00 ET', stage: 'Group Stage', group: 'F', homeTeam: 'TUN', awayTeam: 'SWE', venue: 'sofi-stadium' },

  // June 17
  { id: 'm019', date: '2026-06-17', time: '20:00 ET', stage: 'Group Stage', group: 'G', homeTeam: 'EGY', awayTeam: 'NZL', venue: 'levis-stadium' },
  { id: 'm020', date: '2026-06-17', time: '16:00 ET', stage: 'Group Stage', group: 'H', homeTeam: 'KSA', awayTeam: 'CPV', venue: 'estadio-azteca' },
  { id: 'm021', date: '2026-06-17', time: '12:00 ET', stage: 'Group Stage', group: 'I', homeTeam: 'NOR', awayTeam: 'IRQ', venue: 'mercedes-benz-stadium' },

  // June 18
  { id: 'm022', date: '2026-06-18', time: '20:00 ET', stage: 'Group Stage', group: 'J', homeTeam: 'ALG', awayTeam: 'JOR', venue: 'hard-rock-stadium' },
  { id: 'm023', date: '2026-06-18', time: '16:00 ET', stage: 'Group Stage', group: 'K', homeTeam: 'UZB', awayTeam: 'COD', venue: 'levis-stadium' },
  { id: 'm024', date: '2026-06-18', time: '12:00 ET', stage: 'Group Stage', group: 'L', homeTeam: 'PAN', awayTeam: 'GHA', venue: 'metlife-stadium' },

  // ── MATCHDAY 2 ── June 19–26 ─────────────────────────────────────────────

  // June 19
  { id: 'm025', date: '2026-06-19', time: '20:00 ET', stage: 'Group Stage', group: 'A', homeTeam: 'MEX', awayTeam: 'RSA', venue: 'estadio-azteca' },
  { id: 'm026', date: '2026-06-19', time: '16:00 ET', stage: 'Group Stage', group: 'B', homeTeam: 'CAN', awayTeam: 'QAT', venue: 'bmo-field' },
  { id: 'm027', date: '2026-06-19', time: '12:00 ET', stage: 'Group Stage', group: 'C', homeTeam: 'BRA', awayTeam: 'SCO', venue: 'nrg-stadium' },

  // June 20
  { id: 'm028', date: '2026-06-20', time: '20:00 ET', stage: 'Group Stage', group: 'D', homeTeam: 'USA', awayTeam: 'AUS', venue: 'att-stadium' },
  { id: 'm029', date: '2026-06-20', time: '16:00 ET', stage: 'Group Stage', group: 'E', homeTeam: 'GER', awayTeam: 'CIV', venue: 'arrowhead-stadium' },
  { id: 'm030', date: '2026-06-20', time: '12:00 ET', stage: 'Group Stage', group: 'F', homeTeam: 'NED', awayTeam: 'TUN', venue: 'gillette-stadium' },

  // June 21
  { id: 'm031', date: '2026-06-21', time: '20:00 ET', stage: 'Group Stage', group: 'G', homeTeam: 'BEL', awayTeam: 'EGY', venue: 'centurylink-field' },
  { id: 'm032', date: '2026-06-21', time: '16:00 ET', stage: 'Group Stage', group: 'H', homeTeam: 'ESP', awayTeam: 'KSA', venue: 'estadio-bbva' },
  { id: 'm033', date: '2026-06-21', time: '12:00 ET', stage: 'Group Stage', group: 'I', homeTeam: 'FRA', awayTeam: 'NOR', venue: 'lincoln-financial-field' },

  // June 22
  { id: 'm034', date: '2026-06-22', time: '20:00 ET', stage: 'Group Stage', group: 'J', homeTeam: 'ARG', awayTeam: 'ALG', venue: 'centurylink-field' },
  { id: 'm035', date: '2026-06-22', time: '16:00 ET', stage: 'Group Stage', group: 'K', homeTeam: 'POR', awayTeam: 'UZB', venue: 'mercedes-benz-stadium' },
  { id: 'm036', date: '2026-06-22', time: '12:00 ET', stage: 'Group Stage', group: 'L', homeTeam: 'ENG', awayTeam: 'PAN', venue: 'sofi-stadium' },

  // June 23
  { id: 'm037', date: '2026-06-23', time: '20:00 ET', stage: 'Group Stage', group: 'A', homeTeam: 'KOR', awayTeam: 'CZE', venue: 'estadio-akron' },
  { id: 'm038', date: '2026-06-23', time: '16:00 ET', stage: 'Group Stage', group: 'B', homeTeam: 'SUI', awayTeam: 'BIH', venue: 'bc-place' },
  { id: 'm039', date: '2026-06-23', time: '12:00 ET', stage: 'Group Stage', group: 'C', homeTeam: 'MAR', awayTeam: 'HAI', venue: 'hard-rock-stadium' },

  // June 24
  { id: 'm040', date: '2026-06-24', time: '20:00 ET', stage: 'Group Stage', group: 'D', homeTeam: 'PAR', awayTeam: 'TUR', venue: 'metlife-stadium' },
  { id: 'm041', date: '2026-06-24', time: '16:00 ET', stage: 'Group Stage', group: 'E', homeTeam: 'ECU', awayTeam: 'CUW', venue: 'nrg-stadium' },
  { id: 'm042', date: '2026-06-24', time: '12:00 ET', stage: 'Group Stage', group: 'F', homeTeam: 'JPN', awayTeam: 'SWE', venue: 'levis-stadium' },

  // June 25
  { id: 'm043', date: '2026-06-25', time: '20:00 ET', stage: 'Group Stage', group: 'G', homeTeam: 'IRN', awayTeam: 'NZL', venue: 'att-stadium' },
  { id: 'm044', date: '2026-06-25', time: '16:00 ET', stage: 'Group Stage', group: 'H', homeTeam: 'URU', awayTeam: 'CPV', venue: 'estadio-azteca' },
  { id: 'm045', date: '2026-06-25', time: '12:00 ET', stage: 'Group Stage', group: 'I', homeTeam: 'SEN', awayTeam: 'IRQ', venue: 'arrowhead-stadium' },

  // June 26
  { id: 'm046', date: '2026-06-26', time: '20:00 ET', stage: 'Group Stage', group: 'J', homeTeam: 'AUT', awayTeam: 'JOR', venue: 'gillette-stadium' },
  { id: 'm047', date: '2026-06-26', time: '16:00 ET', stage: 'Group Stage', group: 'K', homeTeam: 'COL', awayTeam: 'COD', venue: 'att-stadium' },
  { id: 'm048', date: '2026-06-26', time: '12:00 ET', stage: 'Group Stage', group: 'L', homeTeam: 'CRO', awayTeam: 'GHA', venue: 'lincoln-financial-field' },

  // ── MATCHDAY 3 ── June 27 – July 2 (simultaneous group pairs) ────────────

  // June 27 — Group A (simultaneous) + Group B (simultaneous)
  { id: 'm049', date: '2026-06-27', time: '20:00 ET', stage: 'Group Stage', group: 'A', homeTeam: 'MEX', awayTeam: 'CZE', venue: 'estadio-azteca' },
  { id: 'm050', date: '2026-06-27', time: '20:00 ET', stage: 'Group Stage', group: 'A', homeTeam: 'KOR', awayTeam: 'RSA', venue: 'estadio-akron' },
  { id: 'm051', date: '2026-06-27', time: '16:00 ET', stage: 'Group Stage', group: 'B', homeTeam: 'CAN', awayTeam: 'BIH', venue: 'bmo-field' },
  { id: 'm052', date: '2026-06-27', time: '16:00 ET', stage: 'Group Stage', group: 'B', homeTeam: 'SUI', awayTeam: 'QAT', venue: 'bc-place' },

  // June 28 — Group C (simultaneous) + Group D (simultaneous)
  { id: 'm053', date: '2026-06-28', time: '20:00 ET', stage: 'Group Stage', group: 'C', homeTeam: 'BRA', awayTeam: 'HAI', venue: 'sofi-stadium' },
  { id: 'm054', date: '2026-06-28', time: '20:00 ET', stage: 'Group Stage', group: 'C', homeTeam: 'MAR', awayTeam: 'SCO', venue: 'nrg-stadium' },
  { id: 'm055', date: '2026-06-28', time: '16:00 ET', stage: 'Group Stage', group: 'D', homeTeam: 'USA', awayTeam: 'TUR', venue: 'att-stadium' },
  { id: 'm056', date: '2026-06-28', time: '16:00 ET', stage: 'Group Stage', group: 'D', homeTeam: 'PAR', awayTeam: 'AUS', venue: 'metlife-stadium' },

  // June 29 — Group E (simultaneous) + Group F (simultaneous)
  { id: 'm057', date: '2026-06-29', time: '20:00 ET', stage: 'Group Stage', group: 'E', homeTeam: 'GER', awayTeam: 'CUW', venue: 'arrowhead-stadium' },
  { id: 'm058', date: '2026-06-29', time: '20:00 ET', stage: 'Group Stage', group: 'E', homeTeam: 'ECU', awayTeam: 'CIV', venue: 'mercedes-benz-stadium' },
  { id: 'm059', date: '2026-06-29', time: '16:00 ET', stage: 'Group Stage', group: 'F', homeTeam: 'NED', awayTeam: 'SWE', venue: 'sofi-stadium' },
  { id: 'm060', date: '2026-06-29', time: '16:00 ET', stage: 'Group Stage', group: 'F', homeTeam: 'JPN', awayTeam: 'TUN', venue: 'centurylink-field' },

  // June 30 — Group G (simultaneous) + Group H (simultaneous)
  { id: 'm061', date: '2026-06-30', time: '20:00 ET', stage: 'Group Stage', group: 'G', homeTeam: 'BEL', awayTeam: 'NZL', venue: 'hard-rock-stadium' },
  { id: 'm062', date: '2026-06-30', time: '20:00 ET', stage: 'Group Stage', group: 'G', homeTeam: 'EGY', awayTeam: 'IRN', venue: 'lincoln-financial-field' },
  { id: 'm063', date: '2026-06-30', time: '16:00 ET', stage: 'Group Stage', group: 'H', homeTeam: 'ESP', awayTeam: 'CPV', venue: 'estadio-bbva' },
  { id: 'm064', date: '2026-06-30', time: '16:00 ET', stage: 'Group Stage', group: 'H', homeTeam: 'URU', awayTeam: 'KSA', venue: 'estadio-azteca' },

  // July 1 — Group I (simultaneous) + Group J (simultaneous)
  { id: 'm065', date: '2026-07-01', time: '20:00 ET', stage: 'Group Stage', group: 'I', homeTeam: 'FRA', awayTeam: 'IRQ', venue: 'sofi-stadium' },
  { id: 'm066', date: '2026-07-01', time: '20:00 ET', stage: 'Group Stage', group: 'I', homeTeam: 'SEN', awayTeam: 'NOR', venue: 'levis-stadium' },
  { id: 'm067', date: '2026-07-01', time: '16:00 ET', stage: 'Group Stage', group: 'J', homeTeam: 'ARG', awayTeam: 'JOR', venue: 'att-stadium' },
  { id: 'm068', date: '2026-07-01', time: '16:00 ET', stage: 'Group Stage', group: 'J', homeTeam: 'AUT', awayTeam: 'ALG', venue: 'hard-rock-stadium' },

  // July 2 — Group K (simultaneous) + Group L (simultaneous)
  { id: 'm069', date: '2026-07-02', time: '20:00 ET', stage: 'Group Stage', group: 'K', homeTeam: 'POR', awayTeam: 'COD', venue: 'levis-stadium' },
  { id: 'm070', date: '2026-07-02', time: '20:00 ET', stage: 'Group Stage', group: 'K', homeTeam: 'COL', awayTeam: 'UZB', venue: 'gillette-stadium' },
  { id: 'm071', date: '2026-07-02', time: '16:00 ET', stage: 'Group Stage', group: 'L', homeTeam: 'ENG', awayTeam: 'GHA', venue: 'metlife-stadium' },
  { id: 'm072', date: '2026-07-02', time: '16:00 ET', stage: 'Group Stage', group: 'L', homeTeam: 'CRO', awayTeam: 'PAN', venue: 'nrg-stadium' },

  // ── KNOCKOUT STAGE ── July 4 – July 19 ───────────────────────────────────

  // Round of 32 — July 4–8
  { id: 'm073', date: '2026-07-04', time: '15:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'att-stadium' },
  { id: 'm074', date: '2026-07-04', time: '19:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'metlife-stadium' },
  { id: 'm075', date: '2026-07-05', time: '15:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'sofi-stadium' },
  { id: 'm076', date: '2026-07-05', time: '19:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'sofi-stadium' },
  { id: 'm077', date: '2026-07-06', time: '15:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'estadio-azteca' },
  { id: 'm078', date: '2026-07-06', time: '19:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'nrg-stadium' },
  { id: 'm079', date: '2026-07-07', time: '15:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'hard-rock-stadium' },
  { id: 'm080', date: '2026-07-07', time: '19:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'gillette-stadium' },
  { id: 'm081', date: '2026-07-08', time: '15:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'centurylink-field' },
  { id: 'm082', date: '2026-07-08', time: '19:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'bc-place' },
  { id: 'm083', date: '2026-07-08', time: '15:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'arrowhead-stadium' },
  { id: 'm084', date: '2026-07-08', time: '19:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'lincoln-financial-field' },
  { id: 'm085', date: '2026-07-08', time: '15:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'levis-stadium' },
  { id: 'm086', date: '2026-07-08', time: '19:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'bmo-field' },
  { id: 'm087', date: '2026-07-08', time: '15:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'mercedes-benz-stadium' },
  { id: 'm088', date: '2026-07-08', time: '19:00 ET', stage: 'Round of 32', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'estadio-bbva' },

  // Round of 16 — July 10–13
  { id: 'm089', date: '2026-07-10', time: '15:00 ET', stage: 'Round of 16', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'att-stadium' },
  { id: 'm090', date: '2026-07-10', time: '19:00 ET', stage: 'Round of 16', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'metlife-stadium' },
  { id: 'm091', date: '2026-07-11', time: '15:00 ET', stage: 'Round of 16', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'levis-stadium' },
  { id: 'm092', date: '2026-07-11', time: '19:00 ET', stage: 'Round of 16', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'sofi-stadium' },
  { id: 'm093', date: '2026-07-12', time: '15:00 ET', stage: 'Round of 16', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'nrg-stadium' },
  { id: 'm094', date: '2026-07-12', time: '19:00 ET', stage: 'Round of 16', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'estadio-azteca' },
  { id: 'm095', date: '2026-07-13', time: '15:00 ET', stage: 'Round of 16', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'gillette-stadium' },
  { id: 'm096', date: '2026-07-13', time: '19:00 ET', stage: 'Round of 16', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'hard-rock-stadium' },

  // Quarter-finals — July 15–16
  { id: 'm097', date: '2026-07-15', time: '15:00 ET', stage: 'Quarter-final', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'metlife-stadium' },
  { id: 'm098', date: '2026-07-15', time: '19:00 ET', stage: 'Quarter-final', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'att-stadium' },
  { id: 'm099', date: '2026-07-16', time: '15:00 ET', stage: 'Quarter-final', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'sofi-stadium' },
  { id: 'm100', date: '2026-07-16', time: '19:00 ET', stage: 'Quarter-final', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'levis-stadium' },

  // Semi-finals — July 18–19
  { id: 'm101', date: '2026-07-18', time: '15:00 ET', stage: 'Semi-final', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'att-stadium' },
  { id: 'm102', date: '2026-07-19', time: '15:00 ET', stage: 'Semi-final', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'metlife-stadium' },

  // 3rd Place — July 18
  { id: 'm103', date: '2026-07-18', time: '19:00 ET', stage: '3rd Place', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'hard-rock-stadium' },

  // Final — July 19
  { id: 'm104', date: '2026-07-19', time: '18:00 ET', stage: 'Final', homeTeam: 'TBD', awayTeam: 'TBD', venue: 'metlife-stadium' },
]
