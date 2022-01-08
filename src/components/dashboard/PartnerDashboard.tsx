import React from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Download, 
  ExternalLink, 
  Send, 
  ShieldAlert, 
  UserCheck, 
  PhoneCall, 
  Building2, 
  Plane, 
  Briefcase 
} from 'lucide-react';
import { Enquiry } from '../../types/travel';
import { formatCurrency, getStatusBadgeConfig } from '../../utils/formatters';

interface PartnerDashboardProps {
  enquiries: Enquiry[];
  onSelectEnquiry: (id: string) => void;
  onOpenTripDetail: () => void;
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({
  enquiries,
  onSelectEnquiry,
  onOpenTripDetail
}) => {
  // Partner sees only their corporate enquiries (e.g. Atlas Corporate Travel)
  const partnerEnquiries = enquiries.filter(
    e => e.partnerAgency === 'Atlas Corporate Travel' || e.partnerAgency === 'Horizon Elite VIP'
  );

  const readyForApproval = partnerEnquiries.filter(e => e.status === 'quoted');
  const beingProcessedByDesk = partnerEnquiries.filter(e => e.status === 'new');
  const confirmedTrips = partnerEnquiries.filter(
    e => e.status === 'accepted' || e.status === 'partially_booked' || e.status === 'fully_booked'
  );

  return (
    <div className="space-y-6">
      {/* Partner Agency Header Banner */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/60 border border-purple-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-0.5 rounded bg-purple-900 text-purple-200 border border-purple-700 font-mono">
              PARTNER PORTAL: ATLAS CORPORATE TRAVEL
            </span>
            <span className="text-xs text-slate-400">• Account ID: PRT-99201</span>
          </div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight mt-1">
            Partner Executive Desk Overview
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Restricted client portal. Internal markup formulas and supplier net costs are masked. All figures reflect approved client gross rates.
          </p>
        </div>

        {/* Dedicated Account Manager badge */}
        <div className="p-2.5 rounded bg-slate-950/80 border border-purple-800/50 flex items-center space-x-3 text-xs">
          <div className="w-8 h-8 rounded-full bg-cyan-600/30 border border-cyan-500 flex items-center justify-center font-bold text-cyan-300 text-xs">
            MV
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">Assigned Central Desk Lead:</div>
            <div className="font-semibold text-slate-100">Marcus Vance (Senior Director)</div>
            <div className="text-cyan-400 text-[10px] font-mono flex items-center space-x-1">
              <PhoneCall className="w-2.5 h-2.5" />
              <span>Priority Desk: +44 20 7946 0912</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 3 Pillars for Partner Agency Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. Quotes Ready For Your Clients */}
        <div className="bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col shadow-lg">
          <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider text-[11px]">
                1. Quotations Ready for Client Review
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              {readyForApproval.length} Ready
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-800/70 overflow-y-auto max-h-[580px] space-y-3">
            {readyForApproval.map((enq) => (
              <div 
                key={enq.id}
                className="pt-3 first:pt-0 rounded p-2.5 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800/70 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-semibold text-purple-400">
                      {enq.reference}
                    </span>
                    <div className="font-medium text-slate-100 text-xs mt-1">
                      {enq.clientName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {enq.companyName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">
                      {formatCurrency(enq.estimatedValue, enq.currency)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Client Gross Price
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-slate-300 bg-slate-950 p-2 rounded border border-slate-800 flex items-center justify-between">
                  <span>Destination: {enq.destination}</span>
                  <span className="font-mono text-amber-400 text-[10px]">Valid for 48 hrs</span>
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <button 
                    onClick={() => alert(`Downloading branded Client Proposal PDF for ${enq.reference}`)}
                    className="text-[11px] text-slate-300 hover:text-slate-100 flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3 text-cyan-400" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => { onSelectEnquiry(enq.id); onOpenTripDetail(); }}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-[11px] transition shadow"
                  >
                    Approve / Authorize
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Requests In Progress with Central Desk */}
        <div className="bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col shadow-lg">
          <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider text-[11px]">
                2. Requests Under Assembly
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {beingProcessedByDesk.length} In Progress
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-800/70 overflow-y-auto max-h-[580px] space-y-3">
            {beingProcessedByDesk.map((enq) => (
              <div 
                key={enq.id}
                className="pt-3 first:pt-0 rounded p-2.5 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800/70 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-semibold text-cyan-400">
                      {enq.reference}
                    </span>
                    <div className="font-medium text-slate-100 text-xs mt-1">
                      {enq.clientName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {enq.companyName}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Desk SLA: Active
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Assigned Specialist:</span>
                    <span className="text-slate-200">{enq.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Quote Time:</span>
                    <span className="text-cyan-400 font-mono">Today, 15:00 GMT</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => { onSelectEnquiry(enq.id); onOpenTripDetail(); }}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    View Status Log →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Confirmed Client Itineraries & Vouchers */}
        <div className="bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col shadow-lg">
          <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider text-[11px]">
                3. Confirmed Trips & Travel Docs
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              {confirmedTrips.length} Booked
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-800/70 overflow-y-auto max-h-[580px] space-y-3">
            {confirmedTrips.map((enq) => (
              <div 
                key={enq.id}
                className="pt-3 first:pt-0 rounded p-2.5 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800/70 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-semibold text-emerald-400">
                      {enq.reference}
                    </span>
                    <div className="font-medium text-slate-100 text-xs mt-1">
                      {enq.clientName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {enq.destination}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[11px] font-mono text-slate-400">
                  Travel Dates: {enq.travelDates}
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button 
                    onClick={() => alert(`Downloading Travel Voucher Package for ${enq.reference}`)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Voucher Package</span>
                  </button>

                  <button
                    onClick={() => { onSelectEnquiry(enq.id); onOpenTripDetail(); }}
                    className="text-[11px] text-slate-300 hover:text-slate-100"
                  >
                    Full Itinerary →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
