export interface RestaurantSearchResult {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  district: string;
  priceBand: '$' | '$$' | '$$$' | '$$$$';
  takesBookings: boolean;
  bookingMethod: 'system' | 'telephone_only' | 'walk_in_only';
  telephoneNumber?: string;
  telephoneBookingHours?: string;
  telephoneInstructions?: string;
  requestedTimeAvailable: boolean;
  exactRequestedTime: string; // e.g. "20:00"
  availableNearbyTimes: string[]; // e.g. ["19:15", "19:30", "20:45", "21:00"]
  michelinStars?: number;
  description: string;
  dietarySuitability: string[];
  depositRequired: string;
}

export const mockRestaurantSearchResults: RestaurantSearchResult[] = [
  {
    id: 'RST-001',
    name: 'Narisawa',
    cuisine: 'Innovative Satoyama Fine Dining',
    location: '2-6-15 Minamiaoyama, Minato-ku, Tokyo',
    district: 'Aoyama / Minato',
    priceBand: '$$$$',
    takesBookings: true,
    bookingMethod: 'system',
    requestedTimeAvailable: false, // EDGE CASE: Exact time unavailable, nearby times are!
    exactRequestedTime: '20:00',
    availableNearbyTimes: ['19:15', '19:30', '20:45', '21:15'],
    michelinStars: 2,
    description: 'Pioneering Japanese sustainable gastronomy honoring forestry and maritime terroir.',
    dietarySuitability: ['Pescatarian options', 'Nut allergy alertable', 'Gluten-free with 48h notice'],
    depositRequired: 'Full prepayment of tasting menu ($320/person) upon confirmation'
  },
  {
    id: 'RST-002',
    name: 'Sukiyabashi Jiro Roppongi',
    cuisine: 'Traditional Edomae Sushi',
    location: 'Roppongi Hills Keyakizaka Dori 3F, Minato-ku, Tokyo',
    district: 'Roppongi',
    priceBand: '$$$$',
    takesBookings: true,
    bookingMethod: 'telephone_only', // EDGE CASE: Must be arranged by telephone without looking broken!
    telephoneNumber: '+81 3-5413-6626',
    telephoneBookingHours: 'Mon-Sat 10:00 - 11:30 JST (Strict 90-minute morning calling window)',
    telephoneInstructions: 'Corporate concierge must call direct line during Japanese morning desk hours. State hotel partner code and guest dietary specifics.',
    requestedTimeAvailable: true,
    exactRequestedTime: '19:30',
    availableNearbyTimes: ['19:30'],
    michelinStars: 2,
    description: 'Intimate eight-seat counter supervised by Takashi Ono. Singular focus on pristine Edomae nigiri.',
    dietarySuitability: ['Strictly sushi-focused; no kosher or strict vegan accommodations'],
    depositRequired: '¥35,000 / seat cancellation guarantee authorization'
  },
  {
    id: 'RST-003',
    name: 'Seizan (Executive Kaiseki)',
    cuisine: 'Contemporary Kaiseki & Dashi Artistry',
    location: '2-17-29 Mita, Minato-ku, Tokyo',
    district: 'Mita / Shirokane',
    priceBand: '$$$$',
    takesBookings: true,
    bookingMethod: 'system',
    requestedTimeAvailable: true,
    exactRequestedTime: '20:00',
    availableNearbyTimes: ['18:30', '19:00', '20:00', '20:30'],
    michelinStars: 2,
    description: 'Renowned for exquisite dashi broths and private tatami dining chambers suitable for corporate entertainment.',
    dietarySuitability: ['Vegetarian available', 'Halal-friendly pork-free menu with advance request'],
    depositRequired: 'Credit card hold; cancellation fee applies within 72h'
  },
  {
    id: 'RST-004',
    name: 'Rokurinsha Ramen Tokyo Station',
    cuisine: 'Artisanal Tsukemen & Noodles',
    location: 'Tokyo Ramen Street, B1F Tokyo Station',
    district: 'Marunouchi',
    priceBand: '$',
    takesBookings: false, // EDGE CASE: Restaurant does not take bookings at all!
    bookingMethod: 'walk_in_only',
    requestedTimeAvailable: false,
    exactRequestedTime: '20:00',
    availableNearbyTimes: [],
    description: 'Famed dipping ramen destination. High turnover, queues form continuously.',
    dietarySuitability: ['Standard noodle prep; contains wheat and pork broth'],
    depositRequired: 'Ticket machine payment on site'
  }
];
