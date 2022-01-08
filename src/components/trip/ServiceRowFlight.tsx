import React from 'react';
import { Plane, Luggage, Clock, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { FlightServiceItem, UserRole } from '../../types/travel';
import { formatCurrency, getStatusBadgeConfig } from '../../utils/formatters';

interface ServiceRowFlightProps {
  item: FlightServiceItem;
  index: number;
  userRole: UserRole;
  onUpdateStatus?: (newStatus: any) => void;
  onRemove?: () => void;
}

export const ServiceRowFlight: React.FC<ServiceRowFlightProps> = ({
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
        {/* Left: Type Indicator, Flight Info, Route */}
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          {/* Index & Type Badge */}
          <div className="flex flex-col items-center justify-center w-8 shrink-0">
            <span className="text-[10px] font-mono text-slate-500 font-bold">#{index + 1}</span>
            <div className="w-7 h-7 rounded-md bg-sky-950/80 border border-sky-800/80 flex items-center justify-center text-sky-400 mt-0.5">
              <Plane className="w-4 h-4" />
            </div>
          </div>

          {/* Core Flight Data Block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-mono font-bold text-[10px] uppercase">
                FLIGHT
              </span>
              <span className="font-semibold text-slate-100 text-xs truncate">
                {item.airline} ({item.flightNumber})
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-sky-300 text-xs font-medium">
                {item.cabinClass}
              </span>
              {item.confirmationRef && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-cyan-400 border border-slate-700">
                  PNR: {item.confirmationRef}
                </span>
              )}
            </div>

            {/* Flight Timing & Itinerary Matrix */}
            <div className="mt-1.5 flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5 font-mono">
                <span className="font-bold text-slate-100">{item.origin}</span>
                <span className="text-slate-400 text-[11px]">{item.departureTime}</span>
                <ArrowRight className="w-3 h-3 text-slate-600" />
                <span className="font-bold text-slate-100">{item.destination}</span>
                <span className="text-slate-400 text-[11px]">{item.arrivalTime}</span>
              </div>

              <span className="text-slate-600">|</span>

              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{item.totalDuration}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">{item.connectionsText}</span>
              </div>

              <span className="text-slate-600 hidden sm:inline">|</span>

              <div className="hidden sm:flex items-center space-x-1 text-slate-400 text-[11px]">
                <Luggage className="w-3 h-3 text-slate-500" />
                <span>{item.baggage}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status Pill & Financial Pricing (Masked for Partner) */}
        <div className="flex items-center justify-between lg:justify-end space-x-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
          {/* Status Badge */}
          <div>
            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              <span className="uppercase tracking-wider font-mono text-[9px]">{badge.label}</span>
            </span>
          </div>

          {/* Pricing Column */}
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
