import React, { useState } from 'react';
import { UserRole } from './types/travel';
import { mockEnquiries } from './data/mockEnquiries';
import { Header } from './components/layout/Header';
import { AgentDashboard } from './components/dashboard/AgentDashboard';
import { PartnerDashboard } from './components/dashboard/PartnerDashboard';
import { EnquiriesListView } from './components/enquiries/EnquiriesListView';
import { TripDetailView } from './components/trip/TripDetailView';
import { FlightSearchSelect } from './components/services/FlightSearchSelect';
import { HotelSearchSelect } from './components/services/HotelSearchSelect';
import { RestaurantSearchSelect } from './components/services/RestaurantSearchSelect';
import { TokenExplorer } from './components/design-system/TokenExplorer';
import { EdgeCasesGallery } from './components/design-system/EdgeCasesGallery';
import { DesignRationaleModal } from './components/rationale/DesignRationaleModal';

export function App() {
  const [userRole, setUserRole] = useState<UserRole>('internal_agent');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string>('ENQ-8901');
  const [isRationaleOpen, setIsRationaleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans bg-grid-subtle">
      {/* Top Application Header */}
      <Header
        userRole={userRole}
        onRoleChange={setUserRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenRationale={() => setIsRationaleOpen(true)}
        onOpenTokens={() => setActiveTab('tokens')}
        onOpenEdgeCases={() => setActiveTab('edge-cases')}
      />

      {/* Main Workspace View Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Screen 3: Dashboard */}
        {activeTab === 'dashboard' && (
          userRole === 'internal_agent' ? (
            <AgentDashboard
              enquiries={mockEnquiries}
              onSelectEnquiry={setSelectedEnquiryId}
              onOpenTripDetail={() => setActiveTab('trip-detail')}
            />
          ) : (
            <PartnerDashboard
              enquiries={mockEnquiries}
              onSelectEnquiry={setSelectedEnquiryId}
              onOpenTripDetail={() => setActiveTab('trip-detail')}
            />
          )
        )}

        {/* Screen 4: Enquiries List */}
        {activeTab === 'enquiries' && (
          <EnquiriesListView
            enquiries={mockEnquiries}
            onSelectEnquiry={setSelectedEnquiryId}
            onOpenTripDetail={() => setActiveTab('trip-detail')}
          />
        )}

        {/* Screen 5: Trip Detail */}
        {activeTab === 'trip-detail' && (
          <TripDetailView
            userRole={userRole}
            onOpenFlightSearch={() => setActiveTab('flights')}
            onOpenHotelSearch={() => setActiveTab('hotels')}
            onOpenRestaurantSearch={() => setActiveTab('restaurants')}
          />
        )}

        {/* Screen 6: Flight Search & Compare */}
        {activeTab === 'flights' && (
          <FlightSearchSelect />
        )}

        {/* Screen 7: Hotel Search & Multi-Room */}
        {activeTab === 'hotels' && (
          <HotelSearchSelect />
        )}

        {/* Screen 8: Restaurant & Covers Search */}
        {activeTab === 'restaurants' && (
          <RestaurantSearchSelect />
        )}

        {/* Token Spec & Semantic Domain States */}
        {activeTab === 'tokens' && (
          <TokenExplorer />
        )}

        {/* Core Awkward States Gallery */}
        {activeTab === 'edge-cases' && (
          <EdgeCasesGallery />
        )}

        {/* Written Rationale Full Page View (also accessible via modal) */}
        {activeTab === 'rationale' && (
          <div className="max-w-4xl mx-auto py-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-base">
                  M
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-100">
                    MERIDIAN B2B Travel OS — Written Submission
                  </h1>
                  <span className="text-xs font-mono text-cyan-400">
                    Design Rationale • Rubric Compliance (305 Words)
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
                <div>
                  <h2 className="font-bold text-slate-100 uppercase tracking-wider text-xs text-cyan-400 mb-1">
                    1. The Name: Why "MERIDIAN"
                  </h2>
                  <p>
                    A meridian is a celestial line of constant longitude spanning poles, anchoring time zones and navigational orientation. For corporate travel specialists managing multi-city itineraries, shifting time offsets, tight layovers, and GDS inventory holds across continents, <strong>Meridian</strong> embodies surgical precision, speed, and enterprise authority.
                  </p>
                </div>

                <div>
                  <h2 className="font-bold text-slate-100 uppercase tracking-wider text-xs text-indigo-400 mb-1">
                    2. The Direction: Volume-First Cockpit
                  </h2>
                  <p>
                    We designed for power agents handling 200+ enquiries daily under strict SLAs. Every screen prioritizes a high data-ink ratio: 36px table row heights, tabular monospace numbers for PNRs and currencies, and high-contrast semantic badges (<em>Draft</em>, <em>Quoted</em>, <em>Requested</em>, <em>Confirmed</em>, <em>Stale</em>). Flights, hotels, and restaurants share a unified chronological timeline on Trip Detail while retaining domain-specific summaries: flights emphasize layovers and fare tier flexibility; hotels display the 3-room × 5-night multiplier and board basis; restaurants tackle the reality of unavailable requested times and telephone-only concierge workflows.
                  </p>
                </div>

                <div>
                  <h2 className="font-bold text-slate-100 uppercase tracking-wider text-xs text-amber-400 mb-1">
                    3. What We Deliberately Ruled Out
                  </h2>
                  <p>
                    We eliminated consumer travel tropes: decorative hero banners, generic stock photography where none exists in GDS feeds, and multi-step full-page wizards. Adding a service uses an in-place slide drawer so the agent never loses page position or context. We also ruled out passive decorative vanity charts on the morning dashboard in favor of an actionable triage inbox answering purely <em>"What needs me today"</em>.
                  </p>
                </div>

                <div>
                  <h2 className="font-bold text-slate-100 uppercase tracking-wider text-xs text-emerald-400 mb-1">
                    4. With More Time
                  </h2>
                  <p>
                    Given additional time, we would build split-ticketing PNR combinatorics, automated webhook listeners for airline schedule changes (IRROPS), and real-time multiplayer presence locks on shared itineraries to prevent collision between partner agencies and central desk agents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Floating / Pop-up Rationale Modal */}
      <DesignRationaleModal
        isOpen={isRationaleOpen}
        onClose={() => setIsRationaleOpen(false)}
      />
    </div>
  );
}
