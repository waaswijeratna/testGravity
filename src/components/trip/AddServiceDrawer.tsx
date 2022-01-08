import React, { useState } from 'react';
import { X, Plane, Building2, Utensils, Check, Plus, AlertCircle, PhoneCall } from 'lucide-react';
import { AnyServiceItem, ServiceType } from '../../types/travel';
import { mockFlightSearchResults } from '../../data/mockFlights';
import { mockHotelSearchResults } from '../../data/mockHotels';
import { mockRestaurantSearchResults } from '../../data/mockRestaurants';
import { formatCurrency } from '../../utils/formatters';

interface AddServiceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (service: AnyServiceItem) => void;
}

export const AddServiceDrawer: React.FC<AddServiceDrawerProps> = ({
  isOpen,
  onClose,
  onAddService,
}) => {
  const [activeType, setActiveType] = useState<ServiceType>('flight');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-2xl bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full z-10">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                INLINE INVENTORY ATTACH
              </span>
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Add Service to Itinerary
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Add services directly without context switching away from the active trip workspace.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Service Type Tab Bar */}
        <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center space-x-2 text-xs">
          <button
            onClick={() => setActiveType('flight')}
            className={`flex-1 py-2 px-3 rounded-md font-medium flex items-center justify-center space-x-2 transition ${
              activeType === 'flight'
                ? 'bg-sky-950 text-sky-300 border border-sky-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Plane className="w-3.5 h-3.5 text-sky-400" />
            <span>1. Flight Leg</span>
          </button>

          <button
            onClick={() => setActiveType('hotel')}
            className={`flex-1 py-2 px-3 rounded-md font-medium flex items-center justify-center space-x-2 transition ${
              activeType === 'hotel'
                ? 'bg-purple-950 text-purple-300 border border-purple-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>2. Hotel Stay</span>
          </button>

          <button
            onClick={() => setActiveType('restaurant')}
            className={`flex-1 py-2 px-3 rounded-md font-medium flex items-center justify-center space-x-2 transition ${
              activeType === 'restaurant'
                ? 'bg-amber-950 text-amber-300 border border-amber-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Dining Table</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {activeType === 'flight' && (
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                Available GDS Flight Segments ({mockFlightSearchResults.length})
              </div>

              {mockFlightSearchResults.map((fl) => {
                const leadFare = fl.fareTiers[0];
                const bizFare = fl.fareTiers.find(f => f.cabin === 'Business') || fl.fareTiers[fl.fareTiers.length - 1];

                return (
                  <div key={fl.id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-sky-800/80 transition space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-100">{fl.airline}</span>
                          <span className="font-mono text-cyan-400 text-[11px]">{fl.flightNumbers}</span>
                          {fl.hasTightLayover && (
                            <span className="text-[9px] font-mono px-1.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                              45m Tight Connection
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-slate-300 mt-1">
                          {fl.origin} {fl.departureTime} → {fl.destination} {fl.arrivalTime} ({fl.totalDuration})
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-slate-100">
                          {formatCurrency(bizFare.price * 8)} <span className="text-[10px] text-slate-400 font-sans">total 8 pax</span>
                        </div>
                        <div className="text-[10px] text-sky-400">
                          {bizFare.cabin}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{fl.connectionSummary}</span>
                      <button
                        onClick={() => {
                          onAddService({
                            id: `SRV-NEW-${Date.now().toString().slice(-4)}`,
                            type: 'flight',
                            name: `${fl.origin} → ${fl.destination} (${fl.airline})`,
                            airline: fl.airline,
                            airlineCode: fl.airlineCode,
                            flightNumber: fl.flightNumbers,
                            cabinClass: bizFare.cabin,
                            origin: fl.origin,
                            destination: fl.destination,
                            departureTime: fl.departureTime,
                            arrivalTime: fl.arrivalTime,
                            totalDuration: fl.totalDuration,
                            stops: fl.stopsCount,
                            connectionsText: fl.connectionSummary,
                            baggage: bizFare.baggage,
                            selectedTierName: bizFare.name,
                            dateStart: '12 Oct 2026',
                            status: 'draft',
                            supplierCost: Math.round(bizFare.price * 8 * 0.88),
                            quotedPrice: bizFare.price * 8,
                            currency: 'USD',
                            segments: fl.segments
                          });
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs flex items-center space-x-1 shadow"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Flight Leg</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeType === 'hotel' && (
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                Available Hotel Properties ({mockHotelSearchResults.length})
              </div>

              {mockHotelSearchResults.map((htl) => {
                const rate = htl.roomRates[0];
                const rooms = 3;
                const nights = 5;
                const totalPrice = rate.ratePerNight * rooms * nights;

                return (
                  <div key={htl.id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-purple-800/80 transition space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-slate-100">{htl.name}</span>
                          <span className="text-[10px] text-amber-400">★ {htl.stars}</span>
                          {!htl.hasPhotos && (
                            <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-400">
                              No Media (GDS text-only)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{htl.location}</div>
                        <div className="text-[11px] text-purple-300 font-medium mt-1">
                          {rate.roomName} ({rate.boardBasis})
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-slate-100">
                          {formatCurrency(totalPrice)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {rooms} rms × {nights} nts
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">
                        Lead: {formatCurrency(rate.ratePerNight)}/night
                      </span>
                      <button
                        onClick={() => {
                          onAddService({
                            id: `SRV-NEW-${Date.now().toString().slice(-4)}`,
                            type: 'hotel',
                            name: `${htl.name} — ${rate.roomName}`,
                            hotelName: htl.name,
                            starRating: htl.stars,
                            location: htl.location,
                            roomTypeName: rate.roomName,
                            boardBasis: rate.boardBasis,
                            roomsCount: rooms,
                            nightsCount: nights,
                            ratePerNight: rate.ratePerNight,
                            hasPhoto: htl.hasPhotos,
                            imageUrl: htl.images[0],
                            guestScore: htl.guestScore,
                            cancellationPolicy: rate.cancellationPolicy,
                            dateStart: '15 Oct 2026',
                            dateEnd: '20 Oct 2026',
                            status: 'draft',
                            supplierCost: Math.round(totalPrice * 0.9),
                            quotedPrice: totalPrice,
                            currency: 'USD'
                          });
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs flex items-center space-x-1 shadow"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Hotel Stay</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeType === 'restaurant' && (
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                Available Dining Venues ({mockRestaurantSearchResults.length})
              </div>

              {mockRestaurantSearchResults.map((rst) => {
                const isTel = rst.bookingMethod === 'telephone_only';
                const estPrice = rst.priceBand === '$$$$' ? 2800 : rst.priceBand === '$$$' ? 1400 : 400;

                return (
                  <div key={rst.id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-amber-800/80 transition space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-slate-100">{rst.name}</span>
                          <span className="text-amber-400 font-mono text-xs">{rst.priceBand}</span>
                          {rst.michelinStars && (
                            <span className="text-[10px] text-amber-300 font-semibold">
                              ({rst.michelinStars}★ Michelin)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{rst.cuisine} • {rst.district}</div>
                        
                        {isTel ? (
                          <div className="mt-1 text-[10px] font-mono text-amber-300 flex items-center space-x-1">
                            <PhoneCall className="w-3 h-3" />
                            <span>Telephone Arrangement Required: {rst.telephoneNumber}</span>
                          </div>
                        ) : !rst.takesBookings ? (
                          <div className="mt-1 text-[10px] font-mono text-rose-400">
                            Walk-in Only (No Advance Reservations)
                          </div>
                        ) : (
                          <div className="mt-1 text-[10px] font-mono text-emerald-400">
                            Available: {rst.exactRequestedTime} (8 covers)
                          </div>
                        )}
                      </div>

                      <div className="text-right font-mono">
                        <div className="text-xs font-bold text-slate-100">
                          {formatCurrency(estPrice)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          est. 8 covers
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {rst.takesBookings ? 'Table reservation' : 'Informational only'}
                      </span>

                      {rst.takesBookings && (
                        <button
                          onClick={() => {
                            onAddService({
                              id: `SRV-NEW-${Date.now().toString().slice(-4)}`,
                              type: 'restaurant',
                              name: `${rst.name} — Private Dinner`,
                              restaurantName: rst.name,
                              cuisine: rst.cuisine,
                              location: rst.location,
                              priceBand: rst.priceBand,
                              bookingDate: '16 Oct 2026',
                              bookingTime: rst.requestedTimeAvailable ? rst.exactRequestedTime : (rst.availableNearbyTimes[0] || '20:00'),
                              covers: 8,
                              bookingMethod: rst.bookingMethod as any,
                              contactPhone: rst.telephoneNumber,
                              specialRequests: isTel ? 'Direct concierge phone confirmation logged' : 'Standard executive table',
                              dateStart: '16 Oct 2026',
                              status: 'draft',
                              supplierCost: Math.round(estPrice * 0.85),
                              quotedPrice: estPrice,
                              currency: 'USD'
                            });
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-1 shadow"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Dining</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Adding item will recalculate quote total instantly</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
