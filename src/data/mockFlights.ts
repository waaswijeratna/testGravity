import { FlightFareTier, FlightSegment } from '../types/travel';

export interface FlightSearchResult {
  id: string;
  airline: string;
  airlineCode: string;
  airlineLogoUrl?: string;
  flightNumbers: string;
  aircraft: string;
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  departureTime: string;
  arrivalTime: string;
  daysDifference: number; // 0 = same day, +1 = next day
  totalDuration: string;
  stopsCount: number;
  connectionSummary: string;
  hasTightLayover: boolean;
  tightLayoverWarning?: string;
  hasOvernightLayover: boolean;
  overnightLayoverDetail?: string;
  segments: FlightSegment[];
  fareTiers: FlightFareTier[];
}

export const mockFlightSearchResults: FlightSearchResult[] = [
  {
    id: 'FL-001',
    airline: 'British Airways',
    airlineCode: 'BA',
    flightNumbers: 'BA 007',
    aircraft: 'Airbus A350-1000',
    origin: 'LHR',
    originName: 'London Heathrow (Terminal 5)',
    destination: 'HND',
    destinationName: 'Tokyo Haneda (Terminal 3)',
    departureTime: '09:30',
    arrivalTime: '07:15',
    daysDifference: 1,
    totalDuration: '13h 45m',
    stopsCount: 0,
    connectionSummary: 'Direct non-stop',
    hasTightLayover: false,
    hasOvernightLayover: false,
    segments: [
      {
        airline: 'British Airways',
        airlineCode: 'BA',
        flightNumber: 'BA 007',
        aircraft: 'Airbus A350-1000',
        origin: 'LHR',
        originName: 'London Heathrow T5',
        destination: 'HND',
        destinationName: 'Tokyo Haneda T3',
        departureTime: '09:30 GMT',
        arrivalTime: '07:15 JST +1',
        duration: '13h 45m'
      }
    ],
    fareTiers: [
      {
        id: 'FT-1A',
        name: 'World Traveller (Economy)',
        cabin: 'Economy',
        price: 1150,
        baggage: '1x 23kg checked bag',
        cancellation: 'Non-refundable. Ticket credit subject to $300 penalty.',
        changeFee: '$180 + fare difference',
        mealIncluded: true,
        seatSelection: 'Chargeable'
      },
      {
        id: 'FT-1B',
        name: 'World Traveller Plus (Premium Economy)',
        cabin: 'Premium Economy',
        price: 1890,
        baggage: '2x 23kg checked bags',
        cancellation: 'Refundable with $200 cancellation fee',
        changeFee: 'Free changes (fare difference only)',
        mealIncluded: true,
        seatSelection: 'Included'
      },
      {
        id: 'FT-1C',
        name: 'Club World (Business Suite)',
        cabin: 'Business',
        price: 3950,
        baggage: '2x 32kg checked bags + Fast Track Lounge',
        cancellation: '100% refundable prior to departure',
        changeFee: 'Complimentary unlimited changes',
        mealIncluded: true,
        seatSelection: 'Priority'
      }
    ]
  },
  {
    id: 'FL-002',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    flightNumbers: 'QR 004 / QR 812',
    aircraft: 'Boeing 777-300ER / Airbus A350',
    origin: 'LHR',
    originName: 'London Heathrow (Terminal 4)',
    destination: 'HND',
    destinationName: 'Tokyo Haneda (Terminal 3)',
    departureTime: '14:05',
    arrivalTime: '19:40',
    daysDifference: 1,
    totalDuration: '21h 35m',
    stopsCount: 1,
    connectionSummary: '1 Stop in Doha (DOH) • 6h 15m Layover',
    hasTightLayover: false,
    hasOvernightLayover: true,
    overnightLayoverDetail: 'Overnight Transit in Doha (DOH) 23:25 - 06:45 (+1). Al Mourjan Lounge transit access.',
    segments: [
      {
        airline: 'Qatar Airways',
        airlineCode: 'QR',
        flightNumber: 'QR 004',
        aircraft: 'Boeing 777-300ER',
        origin: 'LHR',
        originName: 'London Heathrow T4',
        destination: 'DOH',
        destinationName: 'Hamad Intl Doha',
        departureTime: '14:05 GMT',
        arrivalTime: '23:25 AST',
        duration: '6h 50m',
        layoverAfter: {
          airport: 'DOH (Doha)',
          duration: '6h 15m',
          isTight: false,
          isOvernight: true
        }
      },
      {
        airline: 'Qatar Airways',
        airlineCode: 'QR',
        flightNumber: 'QR 812',
        aircraft: 'Airbus A350-1000',
        origin: 'DOH',
        originName: 'Hamad Intl Doha',
        destination: 'HND',
        destinationName: 'Tokyo Haneda T3',
        departureTime: '06:45 AST +1',
        arrivalTime: '19:40 JST +1',
        duration: '8h 30m'
      }
    ],
    fareTiers: [
      {
        id: 'FT-2A',
        name: 'Economy Classic',
        cabin: 'Economy',
        price: 920,
        baggage: '1x 25kg checked bag',
        cancellation: 'Non-refundable',
        changeFee: '$150 fee',
        mealIncluded: true,
        seatSelection: 'Chargeable'
      },
      {
        id: 'FT-2B',
        name: 'Economy Convenience',
        cabin: 'Economy',
        price: 1180,
        baggage: '2x 23kg checked bags',
        cancellation: 'Refundable with $120 fee',
        changeFee: '1 free change',
        mealIncluded: true,
        seatSelection: 'Included'
      },
      {
        id: 'FT-2C',
        name: 'QSuite Business Elite',
        cabin: 'Business',
        price: 3650,
        baggage: '2x 32kg checked bags + Al Mourjan Lounge',
        cancellation: 'Full refund to original form of payment',
        changeFee: 'Unlimited free changes',
        mealIncluded: true,
        seatSelection: 'Priority'
      }
    ]
  },
  {
    id: 'FL-003',
    airline: 'Lufthansa & ANA (Star Alliance)',
    airlineCode: 'LH',
    flightNumbers: 'LH 921 / NH 204',
    aircraft: 'Airbus A321neo / Boeing 787-9',
    origin: 'LHR',
    originName: 'London Heathrow (Terminal 2)',
    destination: 'HND',
    destinationName: 'Tokyo Haneda (Terminal 3)',
    departureTime: '06:30',
    arrivalTime: '08:45',
    daysDifference: 1,
    totalDuration: '18h 15m',
    stopsCount: 2,
    connectionSummary: '2 Stops: Frankfurt (FRA) & Munich (MUC)',
    hasTightLayover: true,
    tightLayoverWarning: 'CRITICAL: 45 min tight connection in Frankfurt (FRA). Inter-terminal transfer required. Minimum connect time at limit.',
    hasOvernightLayover: false,
    segments: [
      {
        airline: 'Lufthansa',
        airlineCode: 'LH',
        flightNumber: 'LH 921',
        aircraft: 'Airbus A321neo',
        origin: 'LHR',
        originName: 'London Heathrow T2',
        destination: 'FRA',
        destinationName: 'Frankfurt Main T1',
        departureTime: '06:30 GMT',
        arrivalTime: '09:05 CET',
        duration: '1h 35m',
        layoverAfter: {
          airport: 'FRA (Frankfurt)',
          duration: '45m',
          isTight: true,
          isOvernight: false
        }
      },
      {
        airline: 'Lufthansa',
        airlineCode: 'LH',
        flightNumber: 'LH 104',
        aircraft: 'Airbus A320',
        origin: 'FRA',
        originName: 'Frankfurt Main T1',
        destination: 'MUC',
        destinationName: 'Munich T2',
        departureTime: '09:50 CET',
        arrivalTime: '10:45 CET',
        duration: '55m',
        layoverAfter: {
          airport: 'MUC (Munich)',
          duration: '2h 10m',
          isTight: false,
          isOvernight: false
        }
      },
      {
        airline: 'All Nippon Airways',
        airlineCode: 'NH',
        flightNumber: 'NH 204',
        aircraft: 'Boeing 787-9 Dreamliner',
        origin: 'MUC',
        originName: 'Munich T2',
        destination: 'HND',
        destinationName: 'Tokyo Haneda T3',
        departureTime: '12:55 CET',
        arrivalTime: '08:45 JST +1',
        duration: '11h 50m'
      }
    ],
    fareTiers: [
      {
        id: 'FT-3A',
        name: 'Economy Basic',
        cabin: 'Economy',
        price: 840,
        baggage: '1x 23kg checked',
        cancellation: 'Non-refundable',
        changeFee: '$200 fee',
        mealIncluded: true,
        seatSelection: 'Chargeable'
      },
      {
        id: 'FT-3B',
        name: 'Business Saver',
        cabin: 'Business',
        price: 3100,
        baggage: '2x 32kg checked + Senator Lounge',
        cancellation: 'Refundable with $250 fee',
        changeFee: 'Free changes',
        mealIncluded: true,
        seatSelection: 'Priority'
      }
    ]
  },
  {
    id: 'FL-004',
    airline: 'Japan Airlines (JAL)',
    airlineCode: 'JL',
    flightNumbers: 'JL 044',
    aircraft: 'Airbus A350-1000',
    origin: 'LHR',
    originName: 'London Heathrow (Terminal 3)',
    destination: 'HND',
    destinationName: 'Tokyo Haneda (Terminal 3)',
    departureTime: '19:00',
    arrivalTime: '17:15',
    daysDifference: 1,
    totalDuration: '14h 15m',
    stopsCount: 0,
    connectionSummary: 'Direct non-stop polar route',
    hasTightLayover: false,
    hasOvernightLayover: false,
    segments: [
      {
        airline: 'Japan Airlines',
        airlineCode: 'JL',
        flightNumber: 'JL 044',
        aircraft: 'Airbus A350-1000',
        origin: 'LHR',
        originName: 'London Heathrow T3',
        destination: 'HND',
        destinationName: 'Tokyo Haneda T3',
        departureTime: '19:00 GMT',
        arrivalTime: '17:15 JST +1',
        duration: '14h 15m'
      }
    ],
    fareTiers: [
      {
        id: 'FT-4A',
        name: 'Economy Standard',
        cabin: 'Economy',
        price: 1210,
        baggage: '2x 23kg checked bags included',
        cancellation: 'Non-refundable',
        changeFee: '$100 fee',
        mealIncluded: true,
        seatSelection: 'Included'
      },
      {
        id: 'FT-4B',
        name: 'Sky Suite Business',
        cabin: 'Business',
        price: 4200,
        baggage: '3x 32kg checked bags + JAL Sakura Lounge',
        cancellation: 'Fully refundable without fee',
        changeFee: 'Free changes',
        mealIncluded: true,
        seatSelection: 'Priority'
      },
      {
        id: 'FT-4C',
        name: 'First Class Suite',
        cabin: 'First',
        price: 9400,
        baggage: '3x 32kg + JAL First Class Lounge + Chauffeur',
        cancellation: 'Fully refundable',
        changeFee: 'Unlimited flexibility',
        mealIncluded: true,
        seatSelection: 'Priority'
      }
    ]
  }
];
