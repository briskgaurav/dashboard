# Deal Dashboard & Performance Analytics — Project Requirements

## Objective

Build a responsive front-end web application that replicates the provided UI/UX screens (Dashboard + Performance Analytics) and implements all interactions and behaviors shown in the demo video, using clean and maintainable code.

---

## Screens to Implement

### 1) Deal Dashboard (Summary View)

Create a page that includes:

#### Global Header
- Logo/brand
- Notifications icon with badge
- User/profile icon

#### Left Sidebar Navigation
- Menu items with active item highlighted
- Collapse/expand behavior (if shown in demo)

#### Deal Header Section
- Deal name/title
- Date range
- Status dropdown
- Buttons (e.g., Live dropdown, Sync to OMS, tag/button like "Peach Pod", Edit)

#### Deal Metadata Row
- Deal ID (link-style)
- Advertiser
- Agency
- Deal Dates
- Deal Budget
- IO Dates
- IO Budget
- Type
- DSP

#### KPI / Analytics Cards
- **Impressions card** with trend indicator
- **Performance mini-metrics:** Big Scroller, Sunrise, Avg CTR, Avg Time Spent, Avg VCR
- **Campaign Delivery** donut/progress ring (Delivered % + Delivered/Contracted values)
- **IO Budget** gauge widget (with pacing and spend breakdown)
- **Deal Budget** gauge widget (similar layout)

---

### 2) Performance Analytics (Chart View)

Create a page/section that includes:

- **Title:** Performance Analytics
- **Time range selector** (date range dropdown / picker)
- **Metrics selector control** that opens a panel (multi-select with checkboxes)

#### Data Sections
- "Big Happy Data"
- "Third Party Data"

**Example metrics:** Impressions, Clicks, QR Clicks, CTR, VCR, Time Spent, SSP Spend, SSP Impressions, Revenue

#### Controls & Filters
- **Export button** (implement behavior as shown in demo video)
- **Filter chips/dropdowns:** Packages, Placements, Targeting, Creative, Product

#### Main Chart
- Bar series (e.g., Impressions)
- Line series (e.g., CTR) on secondary axis
- **Zoom In / Zoom Out** controls (must function as shown)
- Axes labels/units consistent with the UI

---

## Functional Requirements (Must-Have)

- All functionality depicted in the demo video **must** be implemented.
- Any missing interaction, incomplete flow, or partially working feature will be considered incomplete.
- Incomplete code submission will be rejected.
- **Responsive layout** — desktop-first, but should not break on smaller widths.
- **Reasonable accessibility:**
  - Keyboard navigation for dropdowns/modals/panels
  - Focus states and ARIA labels for interactive controls
- **Clean state management** for filters, metric selections, time range, and zoom.

---

## Suggested Data Handling

- You may use mocked/static JSON data.
- Ensure the UI updates correctly when:
  - Changing date range
  - Toggling metrics
  - Using zoom in/out
  - Switching filters (Packages, Placements, etc.)
- If the demo video shows loading states, empty states, or error states — implement them.

---

## Deliverables & Submission Rules (Strict)

- Share source code in a Git repository folder structure and compress it into a **ZIP file**.
- **DO NOT** share code over GitHub or any online repository.
- **DO NOT** bundle the `node_modules` folder in the ZIP.

### README.md Requirements

Include a `README.md` with detailed step-by-step instructions to set up and run the project locally:

- Prerequisites (Node version, package manager)
- Installation steps
- Run commands (dev + production build if applicable)
- Any environment variables (with sample `.env.example` if needed)
- How to run tests/lint (if included)

---

## Tech Guidelines

- Extra points for using core HTML5, CSS3, and JavaScript (ES6) standards cleanly.
- You may use a framework/library (React, Vue, etc.) if you prefer — keep the implementation clear and maintainable.

### If Using TypeScript

- All types must be defined.
- **DO NOT** use `any` anywhere in the codebase.
- Prefer `unknown`, generics, union types, and proper interfaces/types instead.

---

## Evaluation Criteria

### A) Completeness (Highest Priority)
- 100% of demo-video functionality implemented
- All UI components from the provided designs are present and working
- No broken/placeholder flows

### B) UI/UX Fidelity
- Layout, spacing, typography, and components closely match the provided screens
- Chart styling, legends, axes, and interactions align with the demo

### C) Code Quality
- Clear component structure and reusable UI patterns
- Consistent naming, formatting, and folder organization
- Minimal duplication and good separation of concerns

### D) Functionality & State Handling
- Filters, metrics, time range, and zoom work reliably
- Predictable state updates and no UI glitches

### E) Performance & Robustness
- No unnecessary re-renders or heavy operations
- Smooth interactions and chart performance with typical dataset sizes

### F) Documentation & Setup
- README is complete, accurate, and easy to follow
- Project runs successfully from a clean machine setup

### G) Bonus Points
- Strong ES6 + semantic HTML usage
- Accessibility considerations done well
- Tests (unit/integration) and/or linting + formatting setup
