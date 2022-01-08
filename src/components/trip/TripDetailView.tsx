import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Users, 
  Plus, 
  Download, 
  Send, 
  DollarSign, 
  Clock, 
  FileText, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Inbox
} from 'lucide-react';
import { TripDetail, UserRole, AnyServiceItem } from '../../types/travel';
import { mockHeavyTrip14, mockStandardTrip3, mockEmptyTrip0 } from '../../data/mockTrips';
import { ServiceRowFlight } from './ServiceRowFlight';
import { ServiceRowHotel } from './ServiceRowHotel';
import { ServiceRowRestaurant } from './ServiceRowRestaurant';
import { AddServiceDrawer } from './AddServiceDrawer';
import { formatCurrency, getStatusBadgeConfig } from '../../utils/formatters';

interface TripDetailViewProps {
  userRole: UserRole;
  onOpenFlightSearch: () => void;
  onOpenHotelSearch: () => void;
  onOpenRestaurantSearch: () => void;
}

export const TripDetailView: React.FC<TripDetailViewProps> = ({
  userRole,
  onOpenFlightSearch,
  onOpenHotelSearch,
  onOpenRestaurantSearch
}) => {
  // Scenario state: 14 services vs 3 services vs 0 services
  const [selectedScenario, setSelectedScenario] = useState<'14' | '3' | '0'>('14');
  const [tripsData, setTripsData] = useState<{ [key: string]: TripDetail }>({
    '14': mockHeavyTrip14,
    '3': mockStandardTrip3,
    '0': mockEmptyTrip0
  });

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [showTravellers, setShowTravellers] = useState(true);

  const activeTrip = tripsData[selectedScenario];
  const badge = getStatusBadgeConfig(activeTrip.status);

  // Financial calculations
  const totalQuoted = activeTrip.services.reduce((sum, s) => sum + s.quotedPrice, 0);
  const totalSupplierCost = activeTrip.services.reduce((sum, s) => sum + s.supplierCost, 0);
  const totalMargin = totalQuoted - totalSupplierCost;
  const marginPercentage = totalQuoted > 0 ? Math.round((totalMargin / totalQuoted) * 100) : 0;

  const handleAddService = (newService: AnyServiceItem) => {
    setTripsData(prev => ({
      ...prev,
      [selectedScenario]: {
        ...prev[selectedScenario],
        services: [...prev[selectedScenario].services, newService]
      }
    }));
  };

  return (
    <div className="space-y-5">
      {/* Top Scenario Switcher & Compliance Bar */}
      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">
            Test Scenario:
          </span>
          {/* PDF REQUIREMENT: "Handle a trip with fourteen services as well as one with none." */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-md border border-slate-800">
            <button
              onClick={() => setSelectedScenario('14')}
              className={`px-2.5 py-1 rounded font-mono text-xs font-medium transition ${
                selectedScenario === '14'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              14 Services (Heavy Trip)
            </button>
            <button
              onClick={() => setSelectedScenario('3')}
              className={`px-2.5 py-1 rounded font-mono text-xs font-medium transition ${
                selectedScenario === '3'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3 Services (Standard)
            </button>
            <button
              onClick={() => setSelectedScenario('0')}
              className={`px-2.5 py-1 rounded font-mono text-xs font-medium transition ${
                selectedScenario === '0'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              0 Services (Empty Trip)
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-slate-400 font-mono text-[11px]">
          <span>Enquiry ID: <span className="text-slate-200">{activeTrip.reference}</span></span>
          <span className="text-slate-700">•</span>
          <span>Last modified: <span className="text-slate-200">{activeTrip.lastUpdated}</span></span>
        </div>
      </div>

      {/* Main Trip Overview Card */}
      <div className="bg-slate-900/90 rounded-lg border border-slate-800 p-4 shadow-lg space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-semibold border border-slate-700">
                {activeTrip.reference}
              </span>
              <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                <span>{badge.label}</span>
              </span>
              <span className="text-xs text-slate-400">Desk Lead: {activeTrip.owner}</span>
            </div>
            <h1 className="text-lg font-bold text-slate-100 tracking-tight mt-1">
              {activeTrip.title}
            </h1>
            <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1 flex-wrap">
              <span className="flex items-center space-x-1 text-slate-300">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>{activeTrip.companyName} ({activeTrip.clientName})</span>
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{activeTrip.destination}</span>
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center space-x-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{activeTrip.dates}</span>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert(`Downloading Client Quotation PDF for ${activeTrip.reference}`)}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition flex items-center space-x-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Quote PDF</span>
            </button>
            <button
              onClick={() => alert(`Quotation sent to ${activeTrip.clientName} (${activeTrip.companyName})`)}
              className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Quotation</span>
            </button>
          </div>
        </div>

        {/* Travellers Bar (Expandable) */}
        <div className="bg-slate-950/70 rounded-md border border-slate-800 p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">
                Travellers Manifest ({activeTrip.travellers.length} Pax)
              </span>
              <span className="text-[10px] text-slate-500">
                Corporate VIP Travel Group
              </span>
            </div>
            <button
              onClick={() => setShowTravellers(!showTravellers)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1"
            >
              <span>{showTravellers ? 'Collapse' : 'Show Details'}</span>
              {showTravellers ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {showTravellers && (
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
              {activeTrip.travellers.map((traveller) => (
                <div key={traveller.id} className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-100">{traveller.name}</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                      traveller.type === 'lead' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                      traveller.type === 'vip' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {traveller.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[10px] truncate">{traveller.corporateRole || 'Executive'}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Pass: {traveller.passportCountry || 'GBR'}</span>
                    {traveller.dietaryRestrictions && (
                      <span className="text-amber-400/90 font-sans">🥗 {traveller.dietaryRestrictions}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Services List Header & Quick Add Dock */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-100 tracking-tight">
              Integrated Itinerary Services
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
              {activeTrip.services.length} items
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Mixed timeline combining flights, accommodation, and private dining with individual price and supplier status.
          </p>
        </div>

        {/* PDF REQUIREMENT: "Adding a new service should not feel like leaving the page." */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAddDrawerOpen(true)}
            className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Service to Itinerary</span>
          </button>
        </div>
      </div>

      {/* Main Services Timeline / List */}
      {activeTrip.services.length > 0 ? (
        <div className="space-y-2.5">
          {activeTrip.services.map((service, index) => {
            if (service.type === 'flight') {
              return (
                <ServiceRowFlight
                  key={service.id}
                  item={service}
                  index={index}
                  userRole={userRole}
                />
              );
            }
            if (service.type === 'hotel') {
              return (
                <ServiceRowHotel
                  key={service.id}
                  item={service}
                  index={index}
                  userRole={userRole}
                />
              );
            }
            if (service.type === 'restaurant') {
              return (
                <ServiceRowRestaurant
                  key={service.id}
                  item={service}
                  index={index}
                  userRole={userRole}
                />
              );
            }
            return null;
          })}
        </div>
      ) : (
        /* Empty State for Trip with 0 services */
        <div className="bg-slate-900/60 rounded-lg border border-slate-800 p-10 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
            <Inbox className="w-6 h-6 text-slate-400" />
          </div>
          <div className="max-w-md">
            <h3 className="text-base font-semibold text-slate-200">
              No Services Added Yet
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              This enquiry is empty. Assemble the multi-service quotation by adding flight segments, hotel stays, or dining reservations.
            </p>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <button
              onClick={() => setIsAddDrawerOpen(true)}
              className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Attach First Service</span>
            </button>
          </div>
        </div>
      )}

      {/* Financial Quotation Summary Dock */}
      {activeTrip.services.length > 0 && (
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Financial Summary & Margin Breakdown
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Currency: USD • Standard corporate terms • Payment due net 30 upon confirmation
              </p>
            </div>

            <div className="flex items-center space-x-6 font-mono">
              {/* Internal agent sees full net margin breakdown; partner sees gross client price */}
              {userRole === 'internal_agent' ? (
                <>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Supplier Net Cost</span>
                    <span className="text-sm font-semibold text-slate-300">
                      {formatCurrency(totalSupplierCost)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Gross Margin ({marginPercentage}%)</span>
                    <span className="text-sm font-bold text-emerald-400">
                      +{formatCurrency(totalMargin)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-right">
                  <span className="text-[10px] text-purple-300 block uppercase">Partner Account Code</span>
                  <span className="text-xs text-slate-300">PRT-ATLAS-992</span>
                </div>
              )}

              <div className="text-right pl-6 border-l border-slate-800">
                <span className="text-[10px] text-cyan-400 block uppercase font-bold">Total Client Quote</span>
                <span className="text-xl font-bold text-slate-100">
                  {formatCurrency(totalQuoted)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline Add Service Drawer Modal */}
      <AddServiceDrawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onAddService={handleAddService}
      />
    </div>
  );
};
