export type UserRole = 'internal_agent' | 'partner_agency';

export type EnquiryStatus = 
  | 'new'
  | 'quoted'
  | 'accepted'
  | 'partially_booked'
  | 'fully_booked'
  | 'lost';

export type ServiceType = 'flight' | 'hotel' | 'restaurant';

export type ServiceStatus = 
  | 'draft'
  | 'quoted'
  | 'requested'
  | 'confirmed'
  | 'cancelled';

export interface Traveller {
  id: string;
  name: string;
  type: 'lead' | 'adult' | 'child' | 'vip';
  corporateRole?: string;
  passportCountry?: string;
  frequentFlyerNo?: string;
  dietaryRestrictions?: string;
}

export interface BaseService {
  id: string;
  type: ServiceType;
  name: string;
  dateStart: string;
  dateEnd?: string;
  status: ServiceStatus;
  supplierCost: number;
  quotedPrice: number;
  currency: string;
  notes?: string;
  confirmationRef?: string;
}

export interface FlightFareTier {
  id: string;
  name: string; // e.g. Economy Classic, Economy Flex, Business Semi-Flex
  cabin: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  price: number;
  baggage: string; // e.g. "1x 23kg", "2x 32kg"
  cancellation: string; // e.g. "Non-refundable", "Free cancel up to 24h"
  changeFee: string; // e.g. "$150 fee", "Free changes"
  mealIncluded: boolean;
  seatSelection: 'Chargeable' | 'Included' | 'Priority';
}

export interface FlightSegment {
  airline: string;
  airlineCode: string;
  flightNumber: string;
  aircraft: string;
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  layoverAfter?: {
    airport: string;
    duration: string;
    isTight: boolean;
    isOvernight: boolean;
  };
}

export interface FlightServiceItem extends BaseService {
  type: 'flight';
  airline: string;
  airlineCode: string;
  flightNumber: string;
  cabinClass: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  totalDuration: string;
  stops: number;
  connectionsText: string;
  baggage: string;
  selectedTierName: string;
  segments: FlightSegment[];
}

export interface HotelRoomRate {
  id: string;
  roomName: string;
  bedType: string;
  boardBasis: 'Room Only' | 'Bed & Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive';
  ratePerNight: number;
  cancellationPolicy: string; // e.g. "Free cancellation until 48h before check-in", "Non-refundable"
  instantConfirmation: boolean;
  amenities: string[];
}

export interface HotelServiceItem extends BaseService {
  type: 'hotel';
  hotelName: string;
  starRating: number;
  location: string;
  roomTypeName: string;
  boardBasis: string;
  roomsCount: number;
  nightsCount: number;
  ratePerNight: number;
  hasPhoto: boolean;
  imageUrl?: string;
  guestScore: number;
  cancellationPolicy: string;
}

export interface RestaurantServiceItem extends BaseService {
  type: 'restaurant';
  restaurantName: string;
  cuisine: string;
  location: string;
  priceBand: '$' | '$$' | '$$$' | '$$$$';
  bookingDate: string;
  bookingTime: string;
  covers: number;
  bookingMethod: 'system' | 'telephone_only';
  contactPhone?: string;
  specialRequests?: string;
  alternativeTimes?: string[];
}

export type AnyServiceItem = FlightServiceItem | HotelServiceItem | RestaurantServiceItem;

export interface Enquiry {
  id: string;
  reference: string;
  clientName: string;
  companyName: string;
  partnerAgency?: string;
  destination: string;
  travelDates: string;
  departureDate: string;
  returnDate: string;
  travellersCount: number;
  estimatedValue: number;
  currency: string;
  owner: string;
  status: EnquiryStatus;
  urgency: 'normal' | 'urgent' | 'stale';
  hoursSinceLastAction: number;
  slaDeadline?: string;
  servicesCount: {
    flights: number;
    hotels: number;
    restaurants: number;
  };
}

export interface TripDetail {
  id: string;
  reference: string;
  title: string;
  clientName: string;
  companyName: string;
  partnerAgency?: string;
  owner: string;
  status: EnquiryStatus;
  dates: string;
  destination: string;
  budgetCap?: number;
  travellers: Traveller[];
  services: AnyServiceItem[];
  createdDate: string;
  lastUpdated: string;
  internalNotes: string;
}
