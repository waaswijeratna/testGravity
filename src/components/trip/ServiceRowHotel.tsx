import React from 'react';
import { Building2, Bed, Calendar, Star, ShieldCheck } from 'lucide-react';
import { HotelServiceItem, UserRole } from '../../types/travel';
import { formatCurrency, getStatusBadgeConfig } from '../../utils/formatters';

interface ServiceRowHotelProps {
  item: HotelServiceItem;
  index: number;
  userRole: UserRole;
  onUpdateStatus?: (newStatus: any) => void;
  onRemove?: () => void;
}

export const ServiceRowHotel: React.FC<ServiceRowHotelProps> = ({
  item,
  index,
  userRole,
  onUpdateStatus,
  onRemove
}) => {
  const badge = getStatusBadgeConfig(item.status);
  const margin = item.quotedPrice - item.supplierCost;
  const marginPercent = Math.round((margin / item.quotedPrice) * 100);

  return (
    <div className="group bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-lg p-3 transition shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Type Indicator, Hotel Info */}
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          {/* Index & Type Badge */}
          <div className="flex flex-col items-center justify-center w-8 shrink-0">
            <span className="text-[10px] font-mono text-slate-500 font-bold">#{index + 1}</span>
            <div className="w-7 h-7 rounded-md bg-purple-950/80 border border-purple-800/80 flex items-center justify-center text-purple-400 mt-0.5">
              <Building2 className="w-4 h-4" />
            </div>
          </div>

          {/* Core Hotel Data Block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold text-[10px] uppercase">
                HOTEL
              </span>
              <span className="font-semibold text-slate-100 text-xs truncate">
                {item.hotelName}
              </span>
              <div className="flex items-center text-amber-400 text-xs">
                {Array.from({ length: item.starRating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-slate-400 text-xs truncate max-w-[200px]">
                {item.location}
              </span>
              {item.confirmationRef && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-purple-400 border border-slate-700">
                  REF: {item.confirmationRef}
                </span>
              )}
            </div>

            {/* Room Breakdown & Duration Calculation (Brief Requirement) */}
            <div className="mt-1.5 flex items-center space-x-3 text-xs flex-wrap">
              <div className="flex items-center space-x-1 text-purple-300 font-medium">
                <Bed className="w-3.5 h-3.5 text-purple-400" />
                <span>{item.roomTypeName}</span>
              </div>

              <span className="text-slate-600">|</span>

              <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                {item.boardBasis}
              </span>

              <span className="text-slate-600">|</span>

              {/* PDF REQUIREMENT: "The client booked three rooms for five nights. Show how quantity and duration are handled." */}
              <div className="flex items-center space-x-1 text-slate-300 font-mono text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                <span className="font-bold text-cyan-400">{item.roomsCount} rooms</span>
                <span className="text-slate-500">×</span>
                <span className="font-bold text-cyan-400">{item.nightsCount} nights</span>
                <span className="text-slate-500">=</span>
                <span className="text-slate-400">({item.roomsCount * item.nightsCount} room-nights)</span>
              </div>

              <span className="text-slate-600 hidden sm:inline">|</span>

              <div className="text-[11px] text-slate-400 truncate max-w-[260px]">
                Policy: <span className="text-slate-300">{item.cancellationPolicy}</span>
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
