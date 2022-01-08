import React, { useState, useMemo } from 'react';
import { 
  Plane, 
  Search, 
  Clock, 
  ArrowRight, 
  Luggage, 
  AlertTriangle, 
  Moon, 
  Check, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  RotateCcw
} from 'lucide-react';
import { mockFlightSearchResults, FlightSearchResult } from '../../data/mockFlights';
import { FlightFareTier } from '../../types/travel';
import { formatCurrency } from '../../utils/formatters';

interface FlightSearchSelectProps {
  onSelectFlightTier?: (flight: FlightSearchResult, tier: FlightFareTier) => void;
}

export const FlightSearchSelect: React.FC<FlightSearchSelectProps> = ({
  onSelectFlightTier
}) => {
  const [origin, setOrigin] = useState('LHR');
  const [destination, setDestination] = useState('HND');
  const [selectedCabin, setSelectedCabin] = useState<'All' | 'Economy' | 'Premium Economy' | 'Business'>('All');
  const [selectedAirline, setSelectedAirline] = useState<string>('All');
  const [expandedConnections, setExpandedConnections] = useState<{ [key: string]: boolean }>({
    'FL-002': true,
    'FL-003': true // Expand multi-stop by default so the layovers are visible
  });
  const [selectedTiers, setSelectedTiers] = useState<{ [flightId: string]: string }>({
    'FL-001': 'FT-1C',
    'FL-002': 'FT-2C',
    'FL-003': 'FT-3B',
    'FL-004': 'FT-4B'
  });
  const [forceNoResults, setForceNoResults] = useState(false);

  const toggleConnection = (id: string) => {
    setExpandedConnections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFlights = useMemo(() => {
    if (forceNoResults) return [];

    return mockFlightSearchResults.filter(fl => {
      if (selectedAirline !== 'All' && !fl.airline.includes(selectedAirline)) return false;
      return true;
    });
  }, [selectedAirline, forceNoResults]);

  const handleSelectTier = (flight: FlightSearchResult, tier: FlightFareTier) => {
    setSelectedTiers(prev => ({ ...prev, [flight.id]: tier.id }));
    if (onSelectFlightTier) {
      onSelectFlightTier(flight, tier);
    } else {
      alert(`Selected ${flight.airline} ${flight.flightNumbers} - ${tier.name} (${formatCurrency(tier.price)}) for 8 passengers.`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Comparison Strategy */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              Flight Search & Fare Tier Matrix
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-mono">
              GDS Multi-Source
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Dense comparative view. Evaluates connection risks (tight/overnight layovers) and side-by-side fare flexibility.
          </p>
        </div>

        {/* Brief Requirement: "Include the state where a search returns nothing" */}
        <button
          onClick={() => setForceNoResults(!forceNoResults)}
          className={`px-2.5 py-1 rounded text-xs font-mono transition border ${
            forceNoResults
              ? 'bg-rose-950 border-rose-700 text-rose-300 font-bold'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          {forceNoResults ? 'Simulating: No Results State (Active)' : 'Preview: "No Flights Found" State'}
        </button>
      </div>

      {/* Flight Search Parameters Bar */}
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase text-slate-400">Origin IATA</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono font-bold focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase text-slate-400">Destination IATA</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono font-bold focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase text-slate-400">Departure Date</label>
          <input
            type="text"
            readOnly
            value="12 Oct 2026 (Mon)"
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-300 font-mono"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase text-slate-400">Airline Filter</label>
          <select
            value={selectedAirline}
            onChange={(e) => setSelectedAirline(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Carriers</option>
            <option value="British Airways">British Airways</option>
            <option value="Qatar Airways">Qatar Airways</option>
            <option value="Lufthansa">Lufthansa / ANA</option>
            <option value="Japan Airlines">Japan Airlines</option>
          </select>
        </div>

        <div className="space-y-1 flex flex-col justify-end">
          <button
            onClick={() => setForceNoResults(false)}
            className="w-full py-1.5 px-3 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium flex items-center justify-center space-x-1 shadow"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Fares</span>
          </button>
        </div>
      </div>

      {/* Flight Comparison Cards List */}
      {filteredFlights.length > 0 ? (
        <div className="space-y-4">
          {filteredFlights.map((flight) => {
            const hasTight = flight.hasTightLayover;
            const hasOvernight = flight.hasOvernightLayover;
            const isExpanded = expandedConnections[flight.id];

            return (
              <div 
                key={flight.id}
                className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-lg hover:border-slate-700 transition"
              >
                {/* Flight Main Header Line */}
                <div className="p-3.5 bg-slate-950/70 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-100 text-sm">{flight.airline}</span>
                        <span className="font-mono text-cyan-400 text-xs px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800">
                          {flight.flightNumbers}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{flight.aircraft}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {flight.originName} → {flight.destinationName}
                      </div>
                    </div>
                  </div>

                  {/* Schedule & Duration Display */}
                  <div className="flex items-center space-x-6 text-xs font-mono">
                    <div className="text-center">
                      <div className="text-sm font-bold text-slate-100">{flight.departureTime}</div>
                      <div className="text-[10px] text-slate-400">{flight.origin}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 font-sans">{flight.totalDuration}</span>
                      <div className="flex items-center space-x-1 my-0.5">
                        <div className="w-12 h-px bg-slate-700 relative">
                          {flight.stopsCount > 0 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900" />
                          )}
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                      </div>
                      <span className={`text-[10px] font-mono ${flight.stopsCount === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {flight.stopsCount === 0 ? 'Direct Non-stop' : `${flight.stopsCount} Stop (${flight.connectionSummary})`}
                      </span>
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-bold text-slate-100">
                        {flight.arrivalTime}
                        {flight.daysDifference > 0 && (
                          <span className="text-cyan-400 text-[10px] ml-1">+{flight.daysDifference}d</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{flight.destination}</div>
                    </div>
                  </div>
                </div>

                {/* Connection Warnings & Details Callout (Brief Requirement: Tight Layover & Overnight Layover) */}
                {(hasTight || hasOvernight || flight.segments.length > 1) && (
                  <div className="px-3.5 py-2 bg-slate-950/40 border-b border-slate-800/80 text-xs">
                    {hasTight && (
                      <div className="flex items-center space-x-2 text-rose-300 bg-rose-950/40 px-2.5 py-1.5 rounded border border-rose-800/70 mb-2 font-mono text-[11px]">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{flight.tightLayoverWarning}</span>
                      </div>
                    )}

                    {hasOvernight && (
                      <div className="flex items-center space-x-2 text-indigo-300 bg-indigo-950/40 px-2.5 py-1.5 rounded border border-indigo-800/70 mb-2 font-mono text-[11px]">
                        <Moon className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{flight.overnightLayoverDetail}</span>
                      </div>
                    )}

                    {/* Collapsible Flight Leg Details */}
                    {flight.segments.length > 1 && (
                      <div>
                        <button
                          onClick={() => toggleConnection(flight.id)}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-mono"
                        >
                          <span>{isExpanded ? 'Hide Segment Details' : 'View All Connecting Segments'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-cyan-500/30">
                            {flight.segments.map((seg, idx) => (
                              <div key={idx} className="text-[11px] text-slate-300 font-mono flex items-center justify-between">
                                <div>
                                  <span className="font-bold text-slate-100">{seg.airline} {seg.flightNumber}</span>
                                  <span className="text-slate-500"> ({seg.aircraft}): </span>
                                  <span>{seg.origin} ({seg.departureTime}) → {seg.destination} ({seg.arrivalTime}) [{seg.duration}]</span>
                                </div>
                                {seg.layoverAfter && (
                                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                                    seg.layoverAfter.isTight ? 'bg-rose-900 text-rose-200 font-bold' : 'bg-slate-800 text-amber-300'
                                  }`}>
                                    Layover: {seg.layoverAfter.duration} in {seg.layoverAfter.airport}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* SIDE-BY-SIDE FARE COMPARISON TIERS (Brief Requirement) */}
                <div className="p-3.5 bg-slate-900">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Select Fare Tier & Flexibility:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {flight.fareTiers.map((tier) => {
                      const isSelected = selectedTiers[flight.id] === tier.id;

                      return (
                        <div
                          key={tier.id}
                          onClick={() => handleSelectTier(flight, tier)}
                          className={`p-3 rounded-lg border transition cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-sky-950/50 border-sky-500 shadow-md ring-1 ring-sky-500/50'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-100 text-xs">{tier.name}</span>
                              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                                tier.cabin === 'Business' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                                tier.cabin === 'Premium Economy' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                                'bg-slate-800 text-slate-300'
                              }`}>
                                {tier.cabin}
                              </span>
                            </div>

                            <div className="mt-2 text-base font-bold font-mono text-slate-100">
                              {formatCurrency(tier.price)}
                              <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">/ seat</span>
                            </div>

                            <div className="mt-2 space-y-1.5 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                              <div className="flex items-center space-x-1.5">
                                <Luggage className="w-3 h-3 text-cyan-400 shrink-0" />
                                <span>{tier.baggage}</span>
                              </div>
                              <div className="flex items-start space-x-1.5">
                                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="text-[10px] text-slate-300">{tier.cancellation}</span>
                              </div>
                              <div className="text-[10px] text-slate-400">
                                Changes: <span className="text-slate-200">{tier.changeFee}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-mono">
                              Seat: {tier.seatSelection}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectTier(flight, tier);
                              }}
                              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition ${
                                isSelected
                                  ? 'bg-sky-500 text-slate-950'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                              <span>{isSelected ? 'Selected' : 'Select Tier'}</span>
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
      ) : (
        /* PDF REQUIREMENT: "Include the state where a search returns nothing" */
        <div className="bg-slate-900/60 rounded-lg border border-slate-800 p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
            <FileQuestion className="w-6 h-6 text-slate-400" />
          </div>
          <div className="max-w-md">
            <h3 className="text-base font-semibold text-slate-200">
              No Flights Found for {origin} → {destination}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              GDS returned 0 published fares matching your criteria. Suggestions:
            </p>
            <ul className="text-xs text-slate-400 text-left list-disc list-inside mt-2 space-y-1">
              <li>Relax airline carrier filter (currently set to "{selectedAirline}")</li>
              <li>Expand search to co-terminal airports (e.g. NRT instead of HND, or LGW/STN)</li>
              <li>Allow connecting itineraries via Middle East or European hubs</li>
            </ul>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setForceNoResults(false);
                setSelectedAirline('All');
              }}
              className="px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Flight Filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
