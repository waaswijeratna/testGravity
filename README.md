# MERIDIAN — B2B Corporate Travel OS

A high-density, volume-oriented corporate travel orchestration platform built with **Vite 6**, **React 19**, **TypeScript 5.7**, and **Tailwind CSS v4**.

Designed for travel consultants and enterprise agents assembling complex, multi-service itineraries across **flights, hotels, and dining**.

---

## 🧭 Key Features & Screen Implementation

### 1. Brand Identity & Perspective Switching
- **Product Name**: **MERIDIAN** — Inspired by celestial lines of constant longitude that span poles, anchoring global time zones and navigation.
- **Perspective Toggle**:
  - **Internal Agent Mode**: Full desk access, unmasked supplier net costs, markup calculators, SLA breach countdowns, and multi-agency assignment.
  - **Partner Agency Mode**: Narrower scope showing only partner corporate accounts, client gross pricing, branded quote approvals, and confirmed travel voucher downloads.

### 2. Screen 3: Dashboard ("What Needs Me Today")
- Built strictly around action items rather than decorative charts:
  - **Urgent Enquiries & Stale Leads**: Highlighting requests >24h without response and active SLA timers.
  - **Active Quotes Awaiting Decision**: Track 48-hour quote validity windows with 1-click client nudges.
  - **Pending Supplier Confirmations**: GDS Sabre/Amadeus ticketing holds, airline PNR queues, and hotel supplier confirmations.
  - **Dedicated Partner Agency Dashboard**: Customized view displaying client-ready proposals, desk turnaround SLAs, and departure feeds.

### 3. Screen 4: Enquiries Registry (200+ Volume Scale)
- Ultra-dense tabular layout (36px row height) designed for rapid keyboard triage.
- Instant search across reference codes, client names, corporations, and destinations.
- Domain-specific status filtering: `New`, `Quoted`, `Accepted`, `Partially Booked`, `Fully Booked`, and `Lost`.
- **"No Results" State Simulation**: One-click preview showing the exact empty search state with clear reset actions.

### 4. Screen 5: Trip Detail (The Core Workspace)
- **Unified Services Timeline**: Flights, hotels, and restaurants coexist in a single chronological list while retaining their domain-specific summaries:
  - **Flights**: Route, IATA codes, flight number, times with timezones, cabin class, baggage allowances, and PNR references.
  - **Hotels**: Property, star rating, room type, board basis, and the required **3 rooms × 5 nights** duration math.
  - **Restaurants**: Venue, cuisine, date, time, covers, and direct concierge telephone flags.
- **Service Pricing & Status**: Individual status pills (`Draft`, `Quoted`, `Requested`, `Confirmed`) with net/gross calculations.
- **Non-disruptive Service Insertion**: "+ Add Service to Itinerary" opens an inline slide-over drawer so agents never leave the workspace.
- **Scenario Switcher**: Toggle between:
  - **14 Services (Heavy Trip)**: Tokyo, Kyoto & Niseko Partner Strategy Retreat.
  - **3 Services (Standard Trip)**: Frankfurt Finance Summit.
  - **0 Services (Empty Trip)**: Brand new enquiry with contextual onboarding prompts.

### 5. Screen 6: Flight Search & Fare Tier Matrix
- Side-by-side fare flexibility matrix: Compare Economy, Premium Economy, and Business Suite rates, baggage allowances, and cancellation penalties.
- Leg connection analysis: Prominent warnings for **45-minute tight layovers** (Frankfurt) and **overnight layovers** (Doha).
- **Zero-Results State**: Built-in toggle to view the empty flight search response with automated recovery recommendations.

### 6. Screen 7: Hotel Search & Multi-Room Multiplier
- Property-first, room-second visual decision flow.
- Interactive room and night counters displaying total room-nights (e.g. `3 rooms × 5 nights = 15 room-nights × $240 = $3,600`).
- **No-Photo Fallback**: Realistic handling for corporate properties with missing GDS media.
- Multi-rate room plans with board basis variants (`Room Only`, `Bed & Breakfast`, `Half Board`).

### 7. Screen 8: Restaurant & Covers Reservation
- Real-world dining constraints:
  - **Exact Time Unavailable, Nearby Available**: Suggests alternative time chips (e.g., 19:15, 19:30, 20:45) when 20:00 is full.
  - **Telephone-Only Concierge Bookings**: Clean, functional telephone arrangement card with calling window hours and concierge notes.
  - **Walk-in Only Handling**: Explicit guidance when venues do not accept reservations.

### 8. Alongside the Screens (Page 4 Deliverables)
- **Token Spec Explorer**: Interactive guide to color tokens, type scale, spacing, elevation, and the 6 semantic domain states (`Draft`, `Quoted`, `Requested`, `Confirmed`, `Cancelled`, `Stale`).
- **Awkward States Gallery**: Live preview of the 4 required edge cases:
  1. Table row with an **eleven-word service name** without breaking pricing alignment.
  2. Input field with active **validation error** and format guidance.
  3. Empty list with contextual recovery guidance.
  4. Panel still loading with **skeleton animation**.
- **300-Word Written Rationale**: Available via the top-bar button and full-screen view.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```
