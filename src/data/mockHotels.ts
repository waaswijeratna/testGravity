import { HotelRoomRate } from '../types/travel';

export interface HotelSearchResult {
  id: string;
  name: string;
  stars: number;
  location: string;
  neighborhood: string;
  distanceToCenter: string;
  guestScore: number;
  reviewsCount: number;
  leadPricePerNight: number;
  hasPhotos: boolean;
  images: string[];
  chainName?: string;
  amenities: string[];
  roomRates: HotelRoomRate[];
}

export const mockHotelSearchResults: HotelSearchResult[] = [
  {
    id: 'HTL-001',
    name: 'Aman Tokyo',
    stars: 5,
    location: 'The Otemachi Tower, 1-5-6 Otemachi, Chiyoda-ku',
    neighborhood: 'Chiyoda / Financial District',
    distanceToCenter: '0.4 km from Tokyo Station',
    guestScore: 9.6,
    reviewsCount: 428,
    leadPricePerNight: 1250,
    hasPhotos: true,
    images: [
      'https://images.unsplash.com/photo-1542314831-c6a4d27fa2f3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
    ],
    chainName: 'Aman Resorts',
    amenities: ['Spa & Onsen', 'Indoor Lap Pool', 'Valet Parking', 'Fine Dining', 'Meeting Suites', 'Butler Service'],
    roomRates: [
      {
        id: 'RR-101',
        roomName: 'Deluxe Room (King)',
        bedType: '1 King Bed • 71 m²',
        boardBasis: 'Room Only',
        ratePerNight: 1250,
        cancellationPolicy: 'Non-refundable. Full payment charged at booking.',
        instantConfirmation: true,
        amenities: ['City Skyline View', 'Traditional Furo Soaking Tub', 'Complimentary Minibar', 'High-Speed Wi-Fi']
      },
      {
        id: 'RR-102',
        roomName: 'Deluxe Room (King or Twin)',
        bedType: '1 King or 2 Double Beds • 71 m²',
        boardBasis: 'Bed & Breakfast',
        ratePerNight: 1450,
        cancellationPolicy: 'Free cancellation until 7 days prior to check-in (15:00 JST)',
        instantConfirmation: true,
        amenities: ['Full American/Japanese Breakfast for 2', 'Traditional Furo Tub', 'Lounge Access']
      },
      {
        id: 'RR-103',
        roomName: 'Premier Palace View Suite',
        bedType: '1 King Bed + Separate Living • 121 m²',
        boardBasis: 'Half Board',
        ratePerNight: 2150,
        cancellationPolicy: 'Free cancellation until 48 hours prior to arrival',
        instantConfirmation: false,
        amenities: ['Direct Imperial Palace Gardens View', 'Daily Breakfast & 4-Course Dinner', 'Chauffeur Airport Transfer']
      }
    ]
  },
  {
    id: 'HTL-002',
    name: 'Hotel Niwa Tokyo (Corporate Preferred Partner)',
    stars: 4,
    location: '1-1-8 Misaki-cho, Chiyoda-ku, Tokyo',
    neighborhood: 'Chiyoda / Suidobashi',
    distanceToCenter: '2.1 km from Tokyo Station',
    guestScore: 8.9,
    reviewsCount: 1120,
    leadPricePerNight: 240,
    hasPhotos: false, // EDGE CASE REQUIRED IN BRIEF: "Include a property with no photographs available, which happens often"
    images: [],
    chainName: 'Independent Corporate Partner',
    amenities: ['Business Center', 'Japanese Garden Patio', 'Meeting Rooms', 'High-Speed Fiber Wi-Fi'],
    roomRates: [
      {
        id: 'RR-201',
        roomName: 'Standard Double Room',
        bedType: '1 Queen Bed • 24 m²',
        boardBasis: 'Room Only',
        ratePerNight: 240,
        cancellationPolicy: 'Non-refundable corporate rate',
        instantConfirmation: true,
        amenities: ['Work Desk', 'Air Purifier', 'Rain Shower']
      },
      {
        id: 'RR-202',
        roomName: 'Superior Twin Room',
        bedType: '2 Single Beds • 30 m²',
        boardBasis: 'Bed & Breakfast',
        ratePerNight: 290,
        cancellationPolicy: 'Free cancellation until 24 hours prior to check-in',
        instantConfirmation: true,
        amenities: ['Buffet Breakfast at Grill Dining', 'Ergonomic Workstation', 'Ironing Facilities']
      },
      {
        id: 'RR-203',
        roomName: 'Executive Suite',
        bedType: '1 King Bed • 54 m²',
        boardBasis: 'Bed & Breakfast',
        ratePerNight: 460,
        cancellationPolicy: 'Free cancellation until 48 hours prior',
        instantConfirmation: true,
        amenities: ['Separate Meeting Lounge', 'Japanese Cedar Bath', 'Complimentary Refreshments']
      }
    ]
  },
  {
    id: 'HTL-003',
    name: 'The Ritz-Carlton Tokyo',
    stars: 5,
    location: 'Tokyo Midtown, 9-7-1 Akasaka, Minato-ku',
    neighborhood: 'Roppongi / Akasaka',
    distanceToCenter: '3.5 km from Tokyo Station',
    guestScore: 9.3,
    reviewsCount: 654,
    leadPricePerNight: 980,
    hasPhotos: true,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    chainName: 'Marriott Luxury Collection',
    amenities: ['Club Level Lounge', 'Michelin-starred Hinokizaka', 'Indoor Pool & Spa', 'Mount Fuji Views'],
    roomRates: [
      {
        id: 'RR-301',
        roomName: 'Deluxe City View Room',
        bedType: '1 King or 2 Doubles • 52 m²',
        boardBasis: 'Room Only',
        ratePerNight: 980,
        cancellationPolicy: 'Non-refundable',
        instantConfirmation: true,
        amenities: ['Tokyo Tower View', 'Marble Bathroom with Asprey Amenities', 'Nespresso']
      },
      {
        id: 'RR-302',
        roomName: 'Club Executive Room (Lounge Privileges)',
        bedType: '1 King Bed • 52 m²',
        boardBasis: 'Bed & Breakfast',
        ratePerNight: 1320,
        cancellationPolicy: 'Free cancellation until 3 days prior',
        instantConfirmation: true,
        amenities: ['5 Daily Culinary Presentations at Club Lounge', 'Private Concierge Check-in', 'Pressing Service']
      }
    ]
  }
];
