import React from 'react';
import { Utensils, Users, PhoneCall, Clock, MapPin, AlertCircle } from 'lucide-react';
import { RestaurantServiceItem, UserRole } from '../../types/travel';
import { formatCurrency, getStatusBadgeConfig } from '../../utils/formatters';

interface ServiceRowRestaurantProps {
  item: RestaurantServiceItem;
  index: number;
  userRole: UserRole;
  onUpdateStatus?: (newStatus: any) => void;
  onRemove?: () => void;
}

export const ServiceRowRestaurant: React.FC<ServiceRowRestaurantProps> = ({
  item,
  index,
  userRole,
  onUpdateStatus,
  onRemove
}) => {
  const badge = getStatusBadgeConfig(item.status);
  const margin = item.quotedPrice - item.supplierCost;
  const marginPercent = Math.round((margin / item.quotedPrice) * 100);

  const isTelephoneBooking = item.bookingMethod === 'telephone_only';

  return (
    <div className="group bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-lg p-3 transition shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Type Indicator, Restaurant Info */}
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          {/* Index & Type Badge */}
          <div className="flex flex-col items-center justify-center w-8 shrink-0">
            <span className="text-[10px] font-mono text-slate-500 font-bold">#{index + 1}</span>
            <div className="w-7 h-7 rounded-md bg-amber-950/80 border border-amber-800/80 flex items-center justify-center text-amber-400 mt-0.5">
              <Utensils className="w-4 h-4" />
            </div>
          </div>

          {/* Core Restaurant Data Block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono font-bold text-[10px] uppercase">
                DINING
              </span>
              <span className="font-semibold text-slate-100 text-xs truncate">
                {item.restaurantName}
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-amber-300 font-mono text-xs">
                {item.priceBand}
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-slate-400 text-xs">
                {item.cuisine}
              </span>

              {/* PDF REQUIREMENT: "Some restaurants cannot be booked through the system and must be arranged by telephone. Make that clear without making it look broken." */}
              {isTelephoneBooking ? (
                <span className="inline-flex items-center space-x-1 px-1.5 py-0.2 rounded bg-amber-950/90 text-amber-300 border border-amber-700/80 text-[10px] font-mono font-medium">
                  <PhoneCall className="w-2.5 h-2.5 text-amber-400" />
                  <span>Direct Concierge Phone Booking</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-emerald-400 border border-slate-700">
                  Instant GDS Table Confirm
                </span>
              )}
            </div>

            {/* Date, Time, Covers, Special Requests */}
            <div className="mt-1.5 flex items-center space-x-3 text-xs flex-wrap">
              <div className="flex items-center space-x-1.5 font-mono text-slate-200">
                <span className="text-slate-400">📅</span>
                <span>{item.bookingDate}</span>
                <span className="text-cyan-400 font-bold">@ {item.bookingTime}</span>
              </div>

              <span className="text-slate-600">|</span>

              <div className="flex items-center space-x-1 text-slate-300 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                <Users className="w-3 h-3 text-amber-400" />
                <span className="font-bold">{item.covers} covers</span>
              </div>

              <span className="text-slate-600 hidden sm:inline">|</span>

              <div className="text-[11px] text-slate-400 truncate max-w-[280px]">
                {item.specialRequests ? (
                  <span>Note: <span className="text-slate-300">{item.specialRequests}</span></span>
                ) : (
                  <span className="text-slate-500">Standard seating arrangement</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status Pill & Financial Pricing */}
        <div className="flex items-center justify-between lg:justify-end space-x-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
          <div>
            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              <span className="uppercase tracking-wider font-mono text-[9px]">{badge.label}</span>
            </span>
          </div>

          <div className="text-right font-mono min-w-[120px]">
            <div className="text-xs font-bold text-slate-100">
              {formatCurrency(item.quotedPrice, item.currency)}
            </div>

            {userRole === 'internal_agent' ? (
              <div className="text-[10px] text-slate-400 flex items-center justify-end space-x-1">
                <span>Cost: {formatCurrency(item.supplierCost, item.currency)}</span>
                <span className="text-emerald-400">+{marginPercent}%</span>
              </div>
            ) : (
              <div className="text-[10px] text-slate-400">
                Gross Client Rate
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
