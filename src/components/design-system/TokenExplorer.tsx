import React from 'react';
import { SlidersHorizontal, Layers, Palette, Type, Box, ShieldCheck, Check, Clock, AlertTriangle, X } from 'lucide-react';
import { getStatusBadgeConfig } from '../../utils/formatters';

export const TokenExplorer: React.FC = () => {
  const semanticStates = [
    {
      state: 'draft',
      label: 'Draft',
      description: 'Service added to trip by agent, but not yet assembled into an outbound quotation.',
      intent: 'Internal work-in-progress, safe to edit/remove without client or supplier impact.',
    },
    {
      state: 'quoted',
      label: 'Quoted',
      description: 'Sent to corporate client with 48h rate validity lock. Awaiting client acceptance.',
      intent: 'Commitment threshold. Changes trigger version bump or re-quote notification.',
    },
    {
      state: 'requested',
      label: 'Supplier Requested',
      description: 'Booking request transmitted to GDS, airline queue, or hotel desk. Pending confirmation ref.',
      intent: 'Urgent supplier dependency. Requires monitoring of hold expiration timers.',
    },
    {
      state: 'confirmed',
      label: 'Confirmed',
      description: 'Supplier confirmed with official PNR / voucher code. Ready for voucher generation.',
      intent: 'Firm commitment. Cancellation penalties now apply per supplier contract.',
    },
    {
      state: 'cancelled',
      label: 'Cancelled / Lost',
      description: 'Enquiry lost to competitor, expired, or voided by client request.',
      intent: 'Terminal state. Preserved for audit trail and post-mortem conversion analytics.',
    },
    {
      state: 'stale',
      label: 'Stale / SLA Warning',
      description: 'Enquiry untouched for >24h or quotation expiring within 2h.',
      intent: 'High-priority desk triage interrupt requiring immediate agent resolution.',
    }
  ];

  const colorTokens = [
    { name: 'Canvas Dark', hex: '#090d16', class: 'bg-[#090d16]', border: 'border-slate-800', usage: 'Deep background reducing eye strain during 8h shifts' },
    { name: 'Surface Slate-900', hex: '#0f172a', class: 'bg-slate-900', border: 'border-slate-800', usage: 'Card surfaces, table bodies, modal containers' },
    { name: 'Surface Slate-950', hex: '#020617', class: 'bg-slate-950', border: 'border-slate-800', usage: 'Input controls, table headers, deep utility docks' },
    { name: 'Flight Cyan/Sky', hex: '#0284c7', class: 'bg-sky-600', border: 'border-sky-500', usage: 'Flight legs, route vectors, GDS PNR badges' },
    { name: 'Hotel Purple', hex: '#9333ea', class: 'bg-purple-600', border: 'border-purple-500', usage: 'Properties, room types, board basis labels' },
    { name: 'Dining Amber', hex: '#d97706', class: 'bg-amber-600', border: 'border-amber-500', usage: 'Restaurant reservations, covers, telephone concierge' },
    { name: 'Success Emerald', hex: '#059669', class: 'bg-emerald-600', border: 'border-emerald-500', usage: 'Confirmed bookings, voucher ready, active approvals' },
    { name: 'Breach Rose', hex: '#e11d48', class: 'bg-rose-600', border: 'border-rose-500', usage: 'SLA breaches, tight layover warnings, lost enquiries' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            Design Tokens & Semantic State System
          </h1>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
            Handoff Specification
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          "Colour, type scale, spacing, corner radius and elevation, enough for an engineer to build from. Include the semantic states this domain needs."
        </p>
      </div>

      {/* 1. SEMANTIC DOMAIN STATES (Crucial PDF Requirement) */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 space-y-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            1. Semantic Domain States Matrix
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          In high-volume B2B travel, a service cannot simply be "active" or "inactive". Each state represents distinct legal liability, margin exposure, and supplier obligations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {semanticStates.map((item) => {
            const badge = getStatusBadgeConfig(item.state);
            return (
              <div 
                key={item.state} 
                className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      <span className="uppercase tracking-wider font-mono font-bold text-[9px]">{item.label}</span>
                    </span>
                    <code className="text-[10px] text-slate-500 font-mono">status: '{item.state}'</code>
                  </div>
                  <p className="text-xs text-slate-200 font-medium mt-2">
                    {item.description}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                  Intent: <span className="text-cyan-300">{item.intent}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. COLOR PALETTE TOKENS */}
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 space-y-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            2. Master Color & Surface Palette
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {colorTokens.map((c) => (
            <div key={c.name} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded border ${c.border} ${c.class} shadow-sm shrink-0`} />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-200 text-xs truncate">{c.name}</div>
                  <div className="font-mono text-[10px] text-slate-400">{c.hex}</div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                {c.usage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TYPE SCALE & SPACING TOKENS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type Scale */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              3. Typography & Monospace Rules
            </h3>
          </div>
          <div className="space-y-2 text-xs divide-y divide-slate-800/80">
            <div className="pt-1.5 flex justify-between items-baseline">
              <span className="text-[10px] font-mono text-slate-400">Micro (9-10px)</span>
              <span className="font-mono text-[10px] text-cyan-300">PNR, IATA Codes, Timestamps, Table Footers</span>
            </div>
            <div className="pt-1.5 flex justify-between items-baseline">
              <span className="text-xs font-mono text-slate-400">Compact (11-12px)</span>
              <span className="text-slate-200 text-xs">Primary data grid text, service summaries, flight legs</span>
            </div>
            <div className="pt-1.5 flex justify-between items-baseline">
              <span className="text-sm font-mono text-slate-400">Section Header (14px)</span>
              <span className="text-slate-100 font-semibold text-sm">Card headings, sub-panel titles</span>
            </div>
            <div className="pt-1.5 flex justify-between items-baseline">
              <span className="text-base font-mono text-slate-400">Workspace Title (18-20px)</span>
              <span className="text-slate-100 font-bold text-base tracking-tight">Trip Detail, Enquiry Overview</span>
            </div>
          </div>
        </div>

        {/* Spacing & Elevation */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Box className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              4. Spacing, Radii & Density
            </h3>
          </div>
          <div className="space-y-2 text-xs divide-y divide-slate-800/80 font-mono">
            <div className="pt-1.5 flex justify-between">
              <span className="text-slate-400">Table Row Height:</span>
              <span className="text-slate-200 font-bold">36px - 40px (High data-ink ratio)</span>
            </div>
            <div className="pt-1.5 flex justify-between">
              <span className="text-slate-400">Border Radius:</span>
              <span className="text-slate-200">Rounded-md (6px) buttons, Rounded-lg (8px) cards</span>
            </div>
            <div className="pt-1.5 flex justify-between">
              <span className="text-slate-400">Elevation / Shadows:</span>
              <span className="text-slate-200">Inner shadow for selected tabs, shadow-2xl for drawers</span>
            </div>
            <div className="pt-1.5 flex justify-between">
              <span className="text-slate-400">Whitespace Rule:</span>
              <span className="text-cyan-400">"Whitespace that costs a scroll is a cost, not a courtesy"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
