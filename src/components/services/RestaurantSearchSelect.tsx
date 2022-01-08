import React, { useState } from 'react';
import { 
  Utensils, 
  Users, 
  Clock, 
  MapPin, 
  PhoneCall, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { mockRestaurantSearchResults, RestaurantSearchResult } from '../../data/mockRestaurants';
import { formatCurrency } from '../../utils/formatters';

interface RestaurantSearchSelectProps {
  onSelectTable?: (restaurant: RestaurantSearchResult, time: string, covers: number) => void;
}

export const RestaurantSearchSelect: React.FC<RestaurantSearchSelectProps> = ({
  onSelectTable
}) => {
  const [selectedDate, setSelectedDate] = useState('14 Oct 2026');
  const [requestedTime, setRequestedTime] = useState('20:00');
  const [coversCount, setCoversCount] = useState<number>(8);
  const [selectedTimes, setSelectedTimes] = useState<{ [id: string]: string }>({
    'RST-001': '19:30', // Picked nearby time
    'RST-002': '19:30',
    'RST-003': '20:00'
  });

  const handleSelectSlot = (restaurant: RestaurantSearchResult, time: string) => {
    setSelectedTimes(prev => ({ ...prev, [restaurant.id]: time }));
    if (onSelectTable) {
      onSelectTable(restaurant, time, coversCount);
    } else {
      alert(`Reserved table at ${restaurant.name} for ${coversCount} covers on ${selectedDate} at ${time}.`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              Restaurant Inventory & Dining Reservations
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
              Concierge Dining Desk
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Addresses the three restaurant reality traps: exact time unavailability, concierge telephone-only workflows, and walk-in policies.
          </p>
        </div>

        {/* Target Dining Reservation Request Bar */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-amber-800/60 p-1.5 rounded-lg text-xs font-mono">
          <div className="flex items-center space-x-1.5 px-2">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Date:</span>
            <span className="text-slate-100 font-semibold">{selectedDate}</span>
          </div>

          <span className="text-slate-600">|</span>

          <div className="flex items-center space-x-1.5 px-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Target Time:</span>
            <input
              type="text"
              value={requestedTime}
              onChange={(e) => setRequestedTime(e.target.value)}
              className="w-16 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-center text-amber-300 font-bold focus:border-amber-500"
            />
          </div>

          <span className="text-slate-600">|</span>

          <div className="flex items-center space-x-1.5 px-2">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Covers:</span>
            <input
              type="number"
              min="1"
              max="30"
              value={coversCount}
              onChange={(e) => setCoversCount(parseInt(e.target.value) || 1)}
              className="w-12 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-center text-slate-100 font-bold focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Restaurants List with Distinct Edge Case Handling */}
      <div className="space-y-4">
        {mockRestaurantSearchResults.map((restaurant) => {
          const isSelected = selectedTimes[restaurant.id];
          const isTelephoneOnly = restaurant.bookingMethod === 'telephone_only';
          const isWalkInOnly = restaurant.bookingMethod === 'walk_in_only';
          const isExactTimeAvailable = restaurant.requestedTimeAvailable;

          return (
            <div
              key={restaurant.id}
              className="bg-slate-900 rounded-lg border border-slate-800 p-4 shadow-lg hover:border-slate-700 transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left: Metadata */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-base font-bold text-slate-100">{restaurant.name}</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-950 text-amber-300 border border-amber-800/80 font-bold">
                      {restaurant.priceBand}
                    </span>
                    {restaurant.michelinStars && (
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-700 font-medium">
                        {restaurant.michelinStars} Michelin Stars
                      </span>
                    )}
                    <span className="text-slate-500">•</span>
                    <span className="text-xs text-slate-300">{restaurant.cuisine}</span>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{restaurant.location}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-cyan-400 font-mono text-[11px]">{restaurant.district}</span>
                  </div>

                  <p className="text-xs text-slate-400 max-w-2xl">
                    {restaurant.description}
                  </p>

                  {/* Dietary notes */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {restaurant.dietarySuitability.map((item, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Booking Mechanism & Availability Resolution */}
                <div className="lg:w-96 shrink-0 bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex flex-col justify-between space-y-3">
                  
                  {/* CASE 1: EXACT TIME UNAVAILABLE, BUT NEARBY TIMES ARE (Brief Requirement) */}
                  {!isTelephoneOnly && !isWalkInOnly && !isExactTimeAvailable && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1.5 text-amber-300 font-mono text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Exact time {requestedTime} full. Available nearby:</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {restaurant.availableNearbyTimes.map((slot) => {
                          const isPicked = selectedTimes[restaurant.id] === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => handleSelectSlot(restaurant, slot)}
                              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition flex items-center space-x-1 ${
                                isPicked
                                  ? 'bg-amber-500 text-slate-950 font-bold ring-2 ring-amber-400/50'
                                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
                              }`}
                            >
                              <span>{slot}</span>
                              {isPicked && <CheckCircle2 className="w-3 h-3 ml-0.5" />}
                            </button>
                          );
                        })}
                      </div>

                      <div className="text-[10px] text-slate-500 font-mono">
                        Deposit: {restaurant.depositRequired}
                      </div>
                    </div>
                  )}

                  {/* CASE 2: TELEPHONE ONLY BOOKING (Brief Requirement: "Some restaurants cannot be booked through the system and must be arranged by telephone. Make that clear without making it look broken.") */}
                  {isTelephoneOnly && (
                    <div className="space-y-2 bg-amber-950/20 p-2.5 rounded border border-amber-800/60">
                      <div className="flex items-center space-x-1.5 text-amber-300 font-semibold text-xs">
                        <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
                        <span>Direct Telephone Arrangement Required</span>
                      </div>

                      <div className="text-[11px] text-slate-300 font-mono">
                        Desk Line: <span className="text-cyan-400 font-bold text-xs">{restaurant.telephoneNumber}</span>
                      </div>

                      <div className="text-[10px] text-amber-200/90 font-mono leading-relaxed">
                        Calling Window: {restaurant.telephoneBookingHours}
                      </div>

                      <div className="text-[10px] text-slate-400 leading-tight">
                        {restaurant.telephoneInstructions}
                      </div>

                      <button
                        onClick={() => handleSelectSlot(restaurant, restaurant.exactRequestedTime)}
                        className="w-full py-1.5 px-3 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition shadow flex items-center justify-center space-x-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Log Direct Telephone Hold @ {restaurant.exactRequestedTime}</span>
                      </button>
                    </div>
                  )}

                  {/* CASE 3: INSTANT SYSTEM RESERVATION AVAILABLE */}
                  {!isTelephoneOnly && !isWalkInOnly && isExactTimeAvailable && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Requested Time {requestedTime} Confirmed Available!</span>
                      </div>

                      <div className="text-xs text-slate-300 font-mono">
                        Reserved for {coversCount} covers • Executive tatami room
                      </div>

                      <button
                        onClick={() => handleSelectSlot(restaurant, requestedTime)}
                        className="w-full py-1.5 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow flex items-center justify-center space-x-1"
                      >
                        <span>Confirm Instant Booking ({requestedTime})</span>
                      </button>
                    </div>
                  )}

                  {/* CASE 4: DOES NOT TAKE BOOKINGS AT ALL (Brief Requirement) */}
                  {isWalkInOnly && (
                    <div className="space-y-2 bg-slate-900 p-2.5 rounded border border-slate-800">
                      <div className="flex items-center space-x-1.5 text-slate-400 font-semibold text-xs">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>No Advance Reservations Accepted</span>
                      </div>

                      <p className="text-[10px] text-slate-400">
                        Venue operates exclusively on first-come queue. Inform the corporate client that bookings cannot be guaranteed.
                      </p>

                      <div className="text-[10px] font-mono text-cyan-400 bg-slate-950 p-1.5 rounded border border-slate-800">
                        Policy: {restaurant.depositRequired}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
