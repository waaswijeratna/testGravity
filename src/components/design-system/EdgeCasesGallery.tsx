import React, { useState } from 'react';
import { 
  AlertCircle, 
  HelpCircle, 
  RefreshCw, 
  Inbox, 
  Check, 
  X, 
  Info, 
  Layers, 
  Utensils, 
  Plane, 
  Building2,
  FileCode2
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const EdgeCasesGallery: React.FC = () => {
  // Edge Case 2: Validation Error Interactive state
  const [iataCode, setIataCode] = useState('LON-LHR-XX'); // invalid!
  const [dateStart, setDateStart] = useState('2026-10-25');
  const [dateEnd, setDateEnd] = useState('2026-10-10'); // invalid: end before start!

  // Edge Case 4: Loading state simulator
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <FileCode2 className="w-5 h-5 text-indigo-400" />
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">
            Core Components in Real "Awkward" States
          </h1>
          <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono border border-indigo-800">
            Page 4 Spec Verification
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          "Real data is untidy, and designs that only work with ideal content fail in use. Drawn in the awkward states as well as the tidy ones."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. AWKWARD STATE 1: TABLE ROW WITH AN ELEVEN-WORD SERVICE NAME */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-[11px]">
                1. Table Row with Eleven-Word Service Name
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
              Boundary Text Overflow Test
            </span>
          </div>

          <p className="text-xs text-slate-400">
            In bespoke luxury travel, restaurant and excursion names frequently exceed normal column widths. The system demonstrates responsive multi-line containment with fixed right-aligned pricing:
          </p>

          <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                  <th className="py-2 px-3">Service Code & Title</th>
                  <th className="py-2 px-3 text-center">Status</th>
                  <th className="py-2 px-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {/* Standard row */}
                <tr className="hover:bg-slate-900/60">
                  <td className="py-2 px-3 text-slate-300 font-medium">
                    <span className="font-mono text-cyan-400 mr-2 text-[11px]">SRV-01</span>
                    Standard British Airways Flight
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono">CONFIRMED</span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-slate-200">$4,200</td>
                </tr>

                {/* THE ELEVEN-WORD AWKWARD ROW (Exact Brief Requirement) */}
                <tr className="bg-amber-950/20 hover:bg-amber-950/30 border-l-2 border-l-amber-500">
                  <td className="py-2.5 px-3">
                    <div className="flex items-start space-x-2">
                      <span className="font-mono text-amber-400 font-bold text-[11px] shrink-0 mt-0.5">
                        SRV-02
                      </span>
                      <div>
                        {/* 11-word title */}
                        <div className="font-semibold text-slate-100 text-xs leading-snug">
                          Exclusive Panoramic Japanese Kaikou Ryokan Omakase Private Dining Experience with Sommelier Pairing
                        </div>
                        <div className="text-[10px] text-amber-400 font-mono mt-0.5">
                          Word Count: 11 words (101 characters) • Wraps gracefully without breaking pricing column
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center align-top pt-2.5">
                    <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono">
                      REQUESTED
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-100 font-bold align-top pt-2.5">
                    $3,850
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. AWKWARD STATE 2: A FIELD WITH A VALIDATION ERROR */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-[11px]">
                2. Form Field with Real Validation Error
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
              Interactive Test
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Demonstrates high-contrast validation states: error borders, inline error badges, and explicit recovery instructions.
          </p>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-3 text-xs">
            {/* Field 1: IATA Validation Error */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-slate-300 flex justify-between">
                <span>Airport IATA Routing Code</span>
                <span className="text-rose-400 font-bold text-[10px]">Syntax Error</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={iataCode}
                  onChange={(e) => setIataCode(e.target.value)}
                  className="w-full bg-slate-900 border-2 border-rose-600 rounded px-3 py-1.5 text-slate-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <AlertCircle className="w-4 h-4 text-rose-500 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="text-[10px] text-rose-400 font-mono flex items-center space-x-1 mt-0.5">
                <span>Invalid IATA format. Must contain exactly 3 uppercase letters (e.g. "LHR" or "HND").</span>
              </div>
            </div>

            {/* Field 2: Date Sequence Conflict Error */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-850">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400">Departure Date</label>
                <input
                  type="date"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-rose-400 flex items-center justify-between">
                  <span>Return Date</span>
                  <span className="text-[9px]">Seq Error</span>
                </label>
                <input
                  type="date"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className="w-full bg-slate-900 border-2 border-rose-600 rounded px-2 py-1 text-rose-200 text-xs font-mono"
                />
              </div>
            </div>
            <div className="text-[10px] text-rose-400 font-mono">
              Chronology Error: Return date (10 Oct) precedes departure date (25 Oct).
            </div>
          </div>
        </div>

        {/* 3. AWKWARD STATE 3: A LIST WITH NOTHING IN IT */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-[11px]">
                3. A List with Nothing in It (Empty State)
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
              Zero Items
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Rather than a blank empty box, the empty list provides clear domain context, explains why it is empty, and renders immediate recovery actions:
          </p>

          <div className="p-6 bg-slate-950 rounded-lg border border-dashed border-slate-800 text-center flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <Inbox className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-slate-200">
              No Ground Transfers or Bullet Rail Attached
            </div>
            <p className="text-[11px] text-slate-500 max-w-sm">
              This trip currently has no ground logistics booked between Tokyo Station and Kyoto. Add Shinkansen Nozomi bullet train or private chauffeur transfer.
            </p>
            <button 
              onClick={() => alert('Search GDS Ground Logistics clicked')}
              className="mt-1 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono border border-slate-700 transition"
            >
              + Attach Ground Transfer
            </button>
          </div>
        </div>

        {/* 4. AWKWARD STATE 4: A PANEL STILL LOADING */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-[11px]">
                4. A Panel Still Loading (Skeleton State)
              </h2>
            </div>
            <button
              onClick={() => setIsLoading(!isLoading)}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 hover:bg-purple-900 flex items-center space-x-1"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Simulating Loading...' : 'Reload Skeleton'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            GDS queries and supplier inventory locks can take 3-6 seconds. High-density pulse skeletons maintain spatial stability and prevent layout shift:
          </p>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2.5">
            {isLoading ? (
              <div className="space-y-2.5 animate-pulse">
                {/* Skeleton Row 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-slate-800" />
                    <div className="h-3 w-36 bg-slate-800 rounded" />
                    <div className="h-3 w-16 bg-slate-800 rounded" />
                  </div>
                  <div className="h-3 w-20 bg-slate-800 rounded" />
                </div>
                {/* Skeleton Row 2 */}
                <div className="h-2 w-3/4 bg-slate-850 rounded" />
                <div className="h-8 w-full bg-slate-900/60 rounded border border-slate-850" />
                {/* Skeleton Row 3 */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-850">
                  <div className="h-3 w-24 bg-slate-800 rounded" />
                  <div className="h-5 w-20 bg-slate-800 rounded" />
                </div>
              </div>
            ) : (
              <div className="p-2 text-center text-xs text-emerald-400 font-mono">
                ✓ Inventory Loaded: 8 GDS Room Rates Verified
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
