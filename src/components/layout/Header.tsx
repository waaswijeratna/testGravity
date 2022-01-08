import React from 'react';
import { 
  Compass, 
  ShieldCheck, 
  Users, 
  Clock, 
  Bell, 
  Search, 
  SlidersHorizontal,
  FileCode2,
  BookOpen
} from 'lucide-react';
import { UserRole } from '../../types/travel';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenRationale: () => void;
  onOpenTokens: () => void;
  onOpenEdgeCases: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onOpenRationale,
  onOpenTokens,
  onOpenEdgeCases
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800 text-slate-200">
      {/* Top Utility Bar */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-slate-900 text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-xs shadow-sm">
              M
            </div>
            <span className="font-semibold tracking-wider text-slate-100 uppercase">MERIDIAN</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono border border-slate-700">
              B2B TRAVEL OS v2.4
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-3 text-slate-400 font-mono text-[11px] pl-4 border-l border-slate-800">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-cyan-500" />
              <span>LON 07:55 GMT</span>
            </span>
            <span className="text-slate-600">•</span>
            <span>TYO 16:55 JST</span>
            <span className="text-slate-600">•</span>
            <span>NYC 02:55 EST</span>
          </div>
        </div>

        {/* Global Action / Perspective Switcher */}
        <div className="flex items-center space-x-3">
          {/* Deliverables / Assessment Quick Links */}
          <div className="flex items-center space-x-1 bg-slate-900/80 p-0.5 rounded-md border border-slate-800">
            <button
              onClick={onOpenTokens}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'tokens' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Design Tokens</span>
            </button>
            <button
              onClick={onOpenEdgeCases}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'edge-cases' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode2 className="w-3 h-3" />
              <span>Awkward States</span>
            </button>
            <button
              onClick={onOpenRationale}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'rationale' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>Rationale (300w)</span>
            </button>
          </div>

          {/* User Role Perspective Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-md p-0.5">
            <button
              onClick={() => onRoleChange('internal_agent')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition flex items-center space-x-1.5 ${
                userRole === 'internal_agent'
                  ? 'bg-cyan-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Full desk access: All corporate accounts, supplier net costs, markup margins, and SLA controls"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Internal Agent</span>
            </button>
            <button
              onClick={() => onRoleChange('partner_agency')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition flex items-center space-x-1.5 ${
                userRole === 'partner_agency'
                  ? 'bg-purple-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Restricted partner agency view: Only own client accounts, client-ready quotes, gross pricing, no internal supplier net costs"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Partner Agency</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <button className="relative p-1 text-slate-400 hover:text-slate-200 rounded">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950 animate-pulse" />
            </button>
            <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-mono text-[11px]">
              {userRole === 'internal_agent' ? 'MV' : 'AT'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="px-4 flex items-center justify-between">
        <nav className="flex space-x-1 overflow-x-auto py-1 text-xs">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`px-3 py-2 rounded-md font-medium transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-inner'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
            }`}
          >
            <span>Dashboard</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
              Action Required
            </span>
          </button>

          <button
            onClick={() => onTabChange('enquiries')}
            className={`px-3 py-2 rounded-md font-medium transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'enquiries'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-inner'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
            }`}
          >
            <span>Enquiries List</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 font-mono">
              200
            </span>
          </button>

          <button
            onClick={() => onTabChange('trip-detail')}
            className={`px-3 py-2 rounded-md font-medium transition-colors whitespace-nowrap flex items-center space-x-2 ${
              activeTab === 'trip-detail'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700/80 shadow-inner'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
            }`}
          >
            <span>Trip Detail</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
              Core Workspace
            </span>
          </button>

          <div className="h-5 w-px bg-slate-800 my-auto mx-1" />

          {/* Direct Service Pickers */}
          <button
            onClick={() => onTabChange('flights')}
            className={`px-3 py-2 rounded-md font-medium transition-colors whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'flights'
                ? 'bg-sky-950/60 text-sky-300 border border-sky-800'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>Flight Search & Compare</span>
          </button>

          <button
            onClick={() => onTabChange('hotels')}
            className={`px-3 py-2 rounded-md font-medium transition-colors whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'hotels'
                ? 'bg-purple-950/60 text-purple-300 border border-purple-800'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span>Hotel Search & Multi-Room</span>
          </button>

          <button
            onClick={() => onTabChange('restaurants')}
            className={`px-3 py-2 rounded-md font-medium transition-colors whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'restaurants'
                ? 'bg-amber-950/60 text-amber-300 border border-amber-800'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Restaurant & Covers Search</span>
          </button>
        </nav>

        {/* Global Quick Search */}
        <div className="hidden md:flex items-center pl-4 py-1.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search PNR, client, flight (Ctrl+K)..."
              className="bg-slate-900 border border-slate-800 rounded text-xs pl-8 pr-12 py-1 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 w-56"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 bg-slate-800 px-1 py-0.5 rounded border border-slate-700">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </header>
  );
};
