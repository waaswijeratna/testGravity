import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Send, 
  FileCheck, 
  ArrowUpRight, 
  AlertCircle,
  Building,
  Users,
  ChevronRight,
  Plane,
  Building2,
  Utensils,
  PhoneForwarded,
  Filter
} from 'lucide-react';
import { Enquiry } from '../../types/travel';
import { formatCurrency, getStatusBadgeConfig } from '../../utils/formatters';

interface AgentDashboardProps {
  enquiries: Enquiry[];
  onSelectEnquiry: (id: string) => void;
  onOpenTripDetail: () => void;
}

export const AgentDashboard: React.FC<AgentDashboardProps> = ({
  enquiries,
  onSelectEnquiry,
  onOpenTripDetail
}) => {
  // 1. Enquiries waiting for response / going stale
  const waitingOrStale = enquiries.filter(
    e => e.status === 'new' || e.urgency === 'stale' || e.urgency === 'urgent'
  );

  // 2. Quotations sent but not accepted/declined
  const pendingQuotations = enquiries.filter(e => e.status === 'quoted');

  // 3. Bookings requested but not yet confirmed by supplier
  const supplierPendingBookings = enquiries.filter(
    e => e.status === 'accepted' || e.status === 'partially_booked'
  );

  return (
    <div className="space-y-6">
      {/* Morning Action Directive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              Action Required Today
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
              Desk: London Corporate Core
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Zero decorative fluff. Priority queue generated from SLA expirations, pending supplier confirms, and expiring quote windows.
          </p>
        </div>

        {/* Quick Triage Summary Bar */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-center space-x-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-bold">{waitingOrStale.length}</span>
            <span className="text-[11px] text-rose-400/80">Stale / SLA Urgencies</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-indigo-950/40 border border-indigo-800/60 text-indigo-300 flex items-center space-x-1.5">
            <Send className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-bold">{pendingQuotations.length}</span>
            <span className="text-[11px] text-indigo-400/80">Quotes Out</span>
          </div>
          <div className="px-3 py-1.5 rounded bg-amber-950/40 border border-amber-800/60 text-amber-300 flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">{supplierPendingBookings.length}</span>
            <span className="text-[11px] text-amber-400/80">Awaiting Suppliers</span>
          </div>
        </div>
      </div>

      {/* Grid: 3 Focused Action Panels answering "What Needs Me Today" */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* SECTION 1: Enquiries Waiting for Response / Going Stale */}
        <div className="bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col h-full shadow-lg">
          <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider text-[11px]">
                1. Urgent Enquiries & Stale Leads
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/80">
              {waitingOrStale.length} Actionable
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-800/70 overflow-y-auto max-h-[580px] space-y-3">
            {waitingOrStale.map((enq) => {
              const isStale = enq.urgency === 'stale';
              return (
                <div 
                  key={enq.id}
                  className={`pt-3 first:pt-0 rounded p-2.5 transition-all hover:bg-slate-800/60 border ${
                    isStale ? 'border-rose-900/60 bg-rose-950/10' : 'border-transparent bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-semibold text-cyan-400 hover:underline cursor-pointer" onClick={() => { onSelectEnquiry(enq.id); onOpenTripDetail(); }}>
                          {enq.reference}
                        </span>
                        {isStale ? (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-900 text-rose-200 font-bold border border-rose-700 animate-pulse">
                            STALE ({Math.round(enq.hoursSinceLastAction)}h no action)
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                            {enq.slaDeadline || 'SLA 2h limit'}
                          </span>
                        )}
                      </div>
                      <div className="font-medium text-slate-100 text-xs mt-1">
                        {enq.clientName}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                        <Building className="w-3 h-3 text-slate-500" />
                        <span>{enq.companyName}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-semibold text-slate-200">
                        {formatCurrency(enq.estimatedValue, enq.currency)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {enq.travellersCount} travellers
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 truncate max-w-[160px]">
                      📍 {enq.destination}
                    </span>
                    <button
                      onClick={() => { onSelectEnquiry(enq.id); onOpenTripDetail(); }}
                      className="px-2 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-[11px] flex items-center space-x-1 shadow transition"
                    >
                      <span>Build Quote</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Quotations Sent But Not Yet Accepted or Declined */}
        <div className="bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col h-full shadow-lg">
          <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider text-[11px]">
                2. Active Quotes Awaiting Decision
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/80">
              {pendingQuotations.length} Sent
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-800/70 overflow-y-auto max-h-[580px] space-y-3">
            {pendingQuotations.map((enq) => {
              const badge = getStatusBadgeConfig(enq.status);
              return (
                <div 
                  key={enq.id}
                  className="pt-3 first:pt-0 rounded p-2.5 transition-all hover:bg-slate-800/60 bg-slate-900/40 border border-transparent"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-semibold text-cyan-400 hover:underline cursor-pointer" onClick={() => { onSelectEnquiry(enq.id); onOpenTripDetail(); }}>
                          {enq.reference}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                          {enq.slaDeadline || 'Quote Sent'}
                        </span>
                      </div>
                      <div className="font-medium text-slate-100 text-xs mt-1">
                        {enq.clientName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {enq.companyName}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-semibold text-indigo-300">
                        {formatCurrency(enq.estimatedValue, enq.currency)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Dates: {enq.travelDates.split(' - ')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Included Services breakdown chip */}
                  <div className="mt-2 flex items-center space-x-2 text-[11px] text-slate-400">
                    <span className="flex items-center space-x-0.5">
                      <Plane className="w-3 h-3 text-sky-400" />
                      <span>{enq.servicesCount.flights}</span>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center space-x-0.5">
                      <Building2 className="w-3 h-3 text-purple-400" />
                      <span>{enq.servicesCount.hotels}</span>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center space-x-0.5">
                      <Utensils className="w-3 h-3 text-amber-400" />
                      <span>{enq.servicesCount.restaurants}</span>
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-amber-400/90 font-mono">
                      ⏳ Expiration: 48h limit
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <button 
                        onClick={() => alert(`Client Nudge sent for ${enq.reference} to ${enq.clientName}`)}
                        className="px-2 py-0.8 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-medium transition border border-slate-700"
                      >
                        1-Click Nudge
                      </button>
                      <button
                        onClick={() => { onSelectEnquiry(enq.id); onOpenTripDetail(); }}
                        className="px-2 py-0.8 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-medium transition"
                      >
                        Modify / View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Bookings Requested But Not Yet Confirmed By Supplier */}
        <div className="bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col h-full shadow-lg">
          <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider text-[11px]">
                3. Pending Supplier Confirmations
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80">
              {supplierPendingBookings.length} In Flight
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-800/70 overflow-y-auto max-h-[580px] space-y-3">
            {supplierPendingBookings.map((enq) => {
              return (
                <div 
                  key={enq.id}
                  className="pt-3 first:pt-0 rounded p-2.5 transition-all hover:bg-slate-800/60 bg-slate-900/40 border border-transparent"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-semibold text-cyan-400 hover:underline cursor-pointer" onClick={() => { onSelectEnquiry(enq.id); onOpenTripDetail(); }}>
                          {enq.reference}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          PNR Hold Active
                        </span>
                      </div>
                      <div className="font-medium text-slate-100 text-xs mt-1">
                        {enq.clientName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {enq.companyName}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-semibold text-emerald-300">
                        {formatCurrency(enq.estimatedValue, enq.currency)}
                      </div>
                      <div className="text-[10px] text-amber-400 font-mono mt-0.5">
                        Hold: 6h remaining
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 p-2 rounded bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 space-y-1 font-mono">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Supplier Channel:</span>
                      <span className="text-slate-200">GDS Sabre / Amadeus Direct</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Status:</span>
                      <span className="text-amber-400 flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span>Awaiting Ticket Issuance</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => alert(`Calling supplier ticketing desk for ${enq.reference}`)}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                    >
                      <PhoneForwarded className="w-3 h-3" />
                      <span>Direct GDS Helpdesk</span>
                    </button>

                    <button
                      onClick={() => { onSelectEnquiry(enq.id); onOpenTripDetail(); }}
                      className="px-2 py-0.8 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-[10px] transition"
                    >
                      Audit Inventory
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
