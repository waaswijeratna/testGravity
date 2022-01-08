import React, { useState } from 'react';
import { 
  Building2, 
  Star, 
  MapPin, 
  CameraOff, 
  Bed, 
  Check, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Coffee,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { mockHotelSearchResults, HotelSearchResult } from '../../data/mockHotels';
import { HotelRoomRate } from '../../types/travel';
import { formatCurrency } from '../../utils/formatters';

interface HotelSearchSelectProps {
  onSelectRoom?: (hotel: HotelSearchResult, rate: HotelRoomRate, rooms: number, nights: number) => void;
}

export const HotelSearchSelect: React.FC<HotelSearchSelectProps> = ({
  onSelectRoom
}) => {
  // PDF REQUIREMENT: "The client booked three rooms for five nights. Show how quantity and duration are handled."
  const [roomsCount, setRoomsCount] = useState<number>(3);
  const [nightsCount, setNightsCount] = useState<number>(5);
  const [selectedRates, setSelectedRates] = useState<{ [hotelId: string]: string }>({
    'HTL-001': 'RR-102',
    'HTL-002': 'RR-202',
    'HTL-003': 'RR-301'
  });

  const totalRoomNights = roomsCount * nightsCount;

  const handleSelectRoomRate = (hotel: HotelSearchResult, rate: HotelRoomRate) => {
    setSelectedRates(prev => ({ ...prev, [hotel.id]: rate.id }));
    if (onSelectRoom) {
      onSelectRoom(hotel, rate, roomsCount, nightsCount);
    } else {
      const total = rate.ratePerNight * totalRoomNights;
      alert(`Selected ${rate.roomName} at ${hotel.name}: ${roomsCount} rooms × ${nightsCount} nights = ${formatCurrency(total)}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              Hotel Properties & Room Inventory
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">
              Corporate Negotiated Rates
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Property-first, room-second hierarchy. Multi-room duration multiplier automatically calculates across all available rate plans.
          </p>
        </div>

        {/* Global Rooms & Nights Multiplier (Brief Requirement) */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-purple-700/60 p-1.5 rounded-lg text-xs font-mono">
          <div className="flex items-center space-x-1.5 px-2">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">Rooms:</span>
            <input
              type="number"
              min="1"
              max="20"
              value={roomsCount}
              onChange={(e) => setRoomsCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-center text-slate-100 font-bold focus:border-purple-500"
            />
          </div>

          <span className="text-slate-600">×</span>

          <div className="flex items-center space-x-1.5 px-2">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">Nights:</span>
            <input
              type="number"
              min="1"
              max="30"
              value={nightsCount}
              onChange={(e) => setNightsCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-center text-slate-100 font-bold focus:border-purple-500"
            />
          </div>

          <div className="px-2 py-0.5 bg-purple-950/80 rounded border border-purple-800 text-purple-200 font-bold text-[11px]">
            = {totalRoomNights} room-nights total
          </div>
        </div>
      </div>

      {/* Hotel Cards List */}
      <div className="space-y-6">
        {mockHotelSearchResults.map((hotel) => {
          const selectedRateId = selectedRates[hotel.id];

          return (
            <div 
              key={hotel.id}
              className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-xl"
            >
              {/* PROPERTY LEVEL HEADER (Decision made on property first) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-slate-800 bg-slate-950/60">
                {/* Photo or No-Photo Edge Case (Brief Requirement) */}
                <div className="md:col-span-4 h-48 md:h-full min-h-[170px] rounded-lg overflow-hidden relative bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {hotel.hasPhotos && hotel.images.length > 0 ? (
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* PDF REQUIREMENT: "Include a property with no photographs available, which happens often." */
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-900 to-slate-950">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mb-2">
                        <CameraOff className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">
                        No Media Synchronized
                      </span>
                      <span className="text-[10px] text-slate-500 max-w-[200px] mt-1 font-mono">
                        Direct corporate contract. Visual assets not published to GDS feed.
                      </span>
                    </div>
                  )}

                  {/* Guest Score Badge */}
                  <div className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-950/90 backdrop-blur border border-slate-700 font-mono text-xs flex items-center space-x-1 shadow">
                    <span className="font-bold text-emerald-400">{hotel.guestScore}</span>
                    <span className="text-[10px] text-slate-400">/10</span>
                  </div>
                </div>

                {/* Property Metadata & Lead Pricing */}
                <div className="md:col-span-8 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h2 className="text-base font-bold text-slate-100">{hotel.name}</h2>
                          <div className="flex text-amber-400">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{hotel.location}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-cyan-400 font-mono text-[11px]">{hotel.distanceToCenter}</span>
                        </div>
                      </div>

                      <div className="text-right font-mono">
                        <span className="text-[10px] text-slate-400 block uppercase">Lead Rate From</span>
                        <div className="text-base font-bold text-slate-100">
                          {formatCurrency(hotel.leadPricePerNight)}
                          <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">/night</span>
                        </div>
                        <div className="text-[10px] text-purple-400 mt-0.5">
                          {formatCurrency(hotel.leadPricePerNight * totalRoomNights)} ({totalRoomNights} room-nts)
                        </div>
                      </div>
                    </div>

                    {/* Amenities tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {hotel.amenities.map((amenity, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 font-mono flex items-center justify-between">
                    <span>{hotel.roomRates.length} Room Rate Plans Available</span>
                    <span className="text-cyan-400">Agent picks specific room & board plan below ↓</span>
                  </div>
                </div>
              </div>

              {/* ROOM LEVEL SELECTION (The agent picks a specific room, not just a hotel) */}
              <div className="p-4 bg-slate-900/90 space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Select Room Type, Board Basis & Cancellation Terms:
                </div>

                <div className="space-y-2.5">
                  {hotel.roomRates.map((rate) => {
                    const isSelected = selectedRateId === rate.id;
                    const totalCostForStay = rate.ratePerNight * totalRoomNights;

                    return (
                      <div
                        key={rate.id}
                        onClick={() => handleSelectRoomRate(hotel, rate)}
                        className={`p-3 rounded-lg border transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-purple-950/40 border-purple-500 ring-1 ring-purple-500/40'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {/* Room Info & Board Basis */}
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2 flex-wrap">
                            <span className="font-bold text-slate-100 text-xs">{rate.roomName}</span>
                            <span className="text-[11px] text-slate-400">({rate.bedType})</span>
                            <span className={`text-[10px] font-mono px-2 py-0.2 rounded font-medium ${
                              rate.boardBasis === 'Bed & Breakfast' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                              rate.boardBasis === 'Half Board' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                              'bg-slate-800 text-slate-300'
                            }`}>
                              🍽️ {rate.boardBasis}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400">
                            Cancellation: <span className="text-slate-300">{rate.cancellationPolicy}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 pt-0.5">
                            {rate.amenities.map((am, idx) => (
                              <span key={idx}>• {am}</span>
                            ))}
                          </div>
                        </div>

                        {/* Financial Math Breakdown (Brief Requirement: 3 rooms x 5 nights calculation) */}
                        <div className="flex items-center justify-between md:justify-end space-x-4 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                          <div className="text-right font-mono">
                            <div className="text-xs text-slate-400">
                              {formatCurrency(rate.ratePerNight)} <span className="text-[10px]">/ room / nt</span>
                            </div>
                            <div className="text-sm font-bold text-purple-300 mt-0.5">
                              {formatCurrency(totalCostForStay)}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {roomsCount} rms × {nightsCount} nts ({totalRoomNights} room-nts)
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectRoomRate(hotel, rate);
                            }}
                            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1.5 transition ${
                              isSelected
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            <span>{isSelected ? 'Room Selected' : 'Select Room'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
