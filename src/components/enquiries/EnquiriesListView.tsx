import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ArrowUpDown, 
  ChevronRight, 
  User, 
  Calendar, 
  MapPin, 
  Sparkles,
  Inbox,
  AlertCircle,
  FileQuestion,
  RotateCcw
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '../../types/travel';
import { formatCurrency, getStatusBadgeConfig } from '../../utils/formatters';

interface EnquiriesListViewProps {
  enquiries: Enquiry[];
  onSelectEnquiry: (id: string) => void;
  onOpenTripDetail: () => void;
}

export const EnquiriesListView: React.FC<EnquiriesListViewProps> = ({
  enquiries,
  onSelectEnquiry,
  onOpenTripDetail
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOwner, setSelectedOwner] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'value' | 'date' | 'urgency'>('urgency');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [forceEmptyState, setForceEmptyState] = useState(false);

  // Filter & Search Logic
  const filteredEnquiries = useMemo(() => {
    if (forceEmptyState) return [];

    return enquiries.filter((item) => {
      // Query search
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !query ||
        item.reference.toLowerCase().includes(query) ||
        item.clientName.toLowerCase().includes(query) ||
        item.companyName.toLowerCase().includes(query) ||
        item.destination.toLowerCase().includes(query) ||
        item.owner.toLowerCase().includes(query);

      // Status filter
      const matchesStatus = 
        selectedStatus === 'all' || item.status === selectedStatus;

      // Owner filter
      const matchesOwner =
        selectedOwner === 'all' || item.owner === selectedOwner;

      return matchesQuery && matchesStatus && matchesOwner;
    }).sort((a, b) => {
      if (sortBy === 'value') {
        return sortOrder === 'desc' 
          ? b.estimatedValue - a.estimatedValue 
          : a.estimatedValue - b.estimatedValue;
      }
      if (sortBy === 'urgency') {
        const score = (enq: Enquiry) => 
          enq.urgency === 'stale' ? 3 : enq.urgency === 'urgent' ? 2 : 1;
        return sortOrder === 'desc' ? score(b) - score(a) : score(a) - score(b);
      }
      return sortOrder === 'desc' 
        ? b.departureDate.localeCompare(a.departureDate) 
        : a.departureDate.localeCompare(b.departureDate);
    });
  }, [enquiries, searchQuery, selectedStatus, selectedOwner, sortBy, sortOrder, forceEmptyState]);

  const ownersList = Array.from(new Set(enquiries.map(e => e.owner)));

  const handleRowClick = (enquiryId: string) => {
    onSelectEnquiry(enquiryId);
    onOpenTripDetail();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedOwner('all');
    setForceEmptyState(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Fast Triage Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              All Enquiries Registry
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono border border-slate-700">
              {filteredEnquiries.length} matching of {enquiries.length} total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            High-density enterprise index. Designed for agents triaging 200+ enquiries with rapid keyboard and filter shortcuts.
          </p>
        </div>

        {/* Demo trigger for empty state (explicitly required in brief) */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setForceEmptyState(!forceEmptyState)}
            className={`px-2.5 py-1 rounded text-xs font-mono transition border ${
              forceEmptyState
                ? 'bg-rose-950 border-rose-700 text-rose-300 font-bold'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {forceEmptyState ? 'Simulating: No Results State (Active)' : 'Preview: "No Results" State'}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-wrap items-center gap-3 text-xs">
        {/* Instant Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client, company, destination, PNR ref..."
            className="w-full bg-slate-950 border border-slate-800 rounded pl-8 pr-8 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono text-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Chips / Select */}
        <div className="flex items-center space-x-1.5">
          <span className="text-slate-400 font-medium">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Statuses (6)</option>
            <option value="new">New Enquiry</option>
            <option value="quoted">Quoted</option>
            <option value="accepted">Accepted</option>
            <option value="partially_booked">Partially Booked</option>
            <option value="fully_booked">Fully Booked</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* Owner Filter */}
        <div className="flex items-center space-x-1.5">
          <span className="text-slate-400 font-medium">Desk Owner:</span>
          <select
            value={selectedOwner}
            onChange={(e) => setSelectedOwner(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Agents</option>
            {ownersList.map((owner) => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Trigger */}
        <div className="flex items-center space-x-1.5">
          <span className="text-slate-400 font-medium">Sort:</span>
          <button
            onClick={() => {
              if (sortBy === 'urgency') setSortBy('value');
              else if (sortBy === 'value') setSortBy('date');
              else setSortBy('urgency');
            }}
            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-300 font-mono flex items-center space-x-1 hover:border-slate-700"
          >
            <ArrowUpDown className="w-3 h-3 text-cyan-400" />
            <span className="capitalize">{sortBy}</span>
          </button>
        </div>

        {(searchQuery || selectedStatus !== 'all' || selectedOwner !== 'all') && (
          <button
            onClick={handleClearFilters}
            className="text-slate-400 hover:text-slate-200 flex items-center space-x-1 text-xs px-2 py-1 rounded bg-slate-800/80"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Main Table / Data Grid */}
      {filteredEnquiries.length > 0 ? (
        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider select-none">
                  <th className="py-2.5 px-3">Ref & Client Name</th>
                  <th className="py-2.5 px-3">Destination</th>
                  <th className="py-2.5 px-3">Travel Dates</th>
                  <th className="py-2.5 px-3 text-center">Pax</th>
                  <th className="py-2.5 px-3 text-right">Value (Est / Quoted)</th>
                  <th className="py-2.5 px-3">Desk Owner</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredEnquiries.map((enq) => {
                  const badge = getStatusBadgeConfig(enq.status);
                  const isStale = enq.urgency === 'stale';
                  const isUrgent = enq.urgency === 'urgent';

                  return (
                    <tr
                      key={enq.id}
                      onClick={() => handleRowClick(enq.id)}
                      className={`hover:bg-slate-800/70 transition cursor-pointer group ${
                        isStale ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      {/* Client Name & Reference */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-cyan-400 font-semibold text-[11px] group-hover:text-cyan-300">
                            {enq.reference}
                          </span>
                          {isStale && (
                            <span className="px-1.5 py-0.2 rounded bg-rose-900 text-rose-200 text-[9px] font-mono font-bold animate-pulse">
                              STALE
                            </span>
                          )}
                          {isUrgent && !isStale && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-900 text-amber-200 text-[9px] font-mono">
                              EXPIRING
                            </span>
                          )}
                        </div>
                        <div className="font-medium text-slate-200 text-xs mt-0.5">
                          {enq.clientName}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {enq.companyName}
                        </div>
                      </td>

                      {/* Destination */}
                      <td className="py-2.5 px-3 text-slate-200">
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate max-w-[180px] font-medium">
                            {enq.destination}
                          </span>
                        </div>
                      </td>

                      {/* Travel Dates */}
                      <td className="py-2.5 px-3 text-slate-300 font-mono text-[11px]">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{enq.travelDates}</span>
                        </div>
                      </td>

                      {/* Travellers Count */}
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono font-semibold text-[11px]">
                          {enq.travellersCount}
                        </span>
                      </td>

                      {/* Value */}
                      <td className="py-2.5 px-3 text-right">
                        <div className="font-mono font-semibold text-slate-100 text-xs">
                          {formatCurrency(enq.estimatedValue, enq.currency)}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {enq.currency}
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="py-2.5 px-3 text-slate-300 text-[11px]">
                        <div className="flex items-center space-x-1.5">
                          <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-mono text-cyan-400">
                            {enq.owner.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span>{enq.owner}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          <span>{badge.label}</span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center space-x-1 text-slate-400 group-hover:text-cyan-400 transition text-[11px]">
                          <span>Open</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Summary Stats */}
          <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Showing {filteredEnquiries.length} rows</span>
            <div className="flex items-center space-x-4">
              <span>Total Pipeline: {formatCurrency(filteredEnquiries.reduce((acc, curr) => acc + curr.estimatedValue, 0))}</span>
              <span>Avg SLA Response: 42 mins</span>
            </div>
          </div>
        </div>
      ) : (
        /* SCREEN 4 REQUIREMENT: "What the screen looks like with no results" */
        <div className="bg-slate-900/60 rounded-lg border border-slate-800 p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
            <FileQuestion className="w-6 h-6 text-slate-400" />
          </div>
          <div className="max-w-md">
            <h3 className="text-base font-semibold text-slate-200">
              No Enquiries Found
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              No travel enquiries matched your current search parameters:
              <span className="font-mono text-cyan-400 block mt-1">
                query: "{searchQuery || 'none'}" • status: "{selectedStatus}" • owner: "{selectedOwner}"
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={handleClearFilters}
              className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters & Reset</span>
            </button>
            <button
              onClick={() => alert('New Corporate Enquiry form opened')}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition"
            >
              + Create New Enquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
