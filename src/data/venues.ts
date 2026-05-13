import type { Venue } from '@/types'

export const VENUES: Venue[] = [
  // USA — 11 venues
  { id: 'att-stadium', name: 'AT&T Stadium', city: 'Dallas/Arlington', state: 'Texas', country: 'USA', capacity: 80000 },
  { id: 'sofi-stadium', name: 'SoFi Stadium', city: 'Los Angeles', state: 'California', country: 'USA', capacity: 70240 },
  { id: 'metlife-stadium', name: 'MetLife Stadium', city: 'New York/New Jersey', state: 'New Jersey', country: 'USA', capacity: 82500, isFinalVenue: true },
  { id: 'levis-stadium', name: "Levi's Stadium", city: 'San Francisco Bay Area', state: 'California', country: 'USA', capacity: 68500 },
  { id: 'rose-bowl', name: 'Rose Bowl Stadium', city: 'Los Angeles', state: 'California', country: 'USA', capacity: 92542 },
  { id: 'arrowhead-stadium', name: 'Arrowhead Stadium', city: 'Kansas City', state: 'Missouri', country: 'USA', capacity: 76416 },
  { id: 'lincoln-financial-field', name: 'Lincoln Financial Field', city: 'Philadelphia', state: 'Pennsylvania', country: 'USA', capacity: 69796 },
  { id: 'hard-rock-stadium', name: 'Hard Rock Stadium', city: 'Miami Gardens', state: 'Florida', country: 'USA', capacity: 65326 },
  { id: 'gillette-stadium', name: 'Gillette Stadium', city: 'Boston/Foxborough', state: 'Massachusetts', country: 'USA', capacity: 65878 },
  { id: 'nrg-stadium', name: 'NRG Stadium', city: 'Houston', state: 'Texas', country: 'USA', capacity: 72220 },
  { id: 'centurylink-field', name: 'Lumen Field', city: 'Seattle', state: 'Washington', country: 'USA', capacity: 69000 },

  // Canada — 2 venues
  { id: 'bmo-field', name: 'BMO Field', city: 'Toronto', country: 'Canada', capacity: 45736 },
  { id: 'bc-place', name: 'BC Place', city: 'Vancouver', country: 'Canada', capacity: 54500 },

  // Mexico — 3 venues
  { id: 'estadio-azteca', name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', capacity: 87523, isOpeningVenue: true },
  { id: 'estadio-akron', name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', capacity: 49850 },
  { id: 'estadio-bbva', name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', capacity: 53500 },
]
