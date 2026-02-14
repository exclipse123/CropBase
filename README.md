# Cropbase - Farm Operations Dashboard

A high-fidelity, responsive web application dashboard that converts farm spreadsheets into a live operational command center.

## Product Overview

**Cropbase** is an Excel-in, ops-out operations layer for farms. It allows farms to continue using spreadsheets while getting a unified operational view, prioritized daily plans, and clear change summaries.

### Key Features

- Upload Excel/CSV files in 2 minutes
- Get instant dashboard of fields, tasks, and notes
- See what changed since yesterday
- Export back to CSV anytime
- Keep Excel as source of truth

## Prototype Navigation Flow

### Recommended Click Path

**Landing → Try Demo Data → Overview → Today Plan → Field Detail → Tasks**

1. **Start at Landing Page** (`/`)
   - Hero section with value proposition
   - Two CTAs: "Upload Spreadsheet" and "Try Demo Data"
   - Click "Try Demo Data" to see the dashboard with sample data

2. **Overview Dashboard** (`/dashboard`)
   - Command center with KPI cards (Active Fields, Tasks Due, Overdue, Blocked)
   - "Fields at a glance" table - click any field name to drill down
   - "Needs attention" section highlighting critical items
   - "What changed since last update" panel (key differentiator)
   - Today Plan preview in right sidebar

3. **Today Plan** (`/dashboard/today`) - **HERO PAGE FOR PMF**
   - Prioritized daily task list grouped by time: Morning, Afternoon, Night
   - Overdue tasks prominently displayed
   - Tomorrow preview section
   - "Crew View" toggle for simplified mobile-friendly checklist
   - Bulk actions: Print, Export, Mark multiple done

4. **Field Detail** (`/dashboard/fields/field-a`)
   - Comprehensive field view with tabs: Timeline, Tasks, Notes, Context
   - Timeline shows chronological activity (tasks + notes)
   - Right rail with "Next actions for this field"
   - Add notes with tags functionality

5. **Fields List** (`/dashboard/fields`)
   - Filterable, sortable table of all fields
   - Filters: crop type, growth stage, status
   - Click any field to see detail view

6. **Tasks Page** (`/dashboard/tasks`)
   - All tasks grouped by due date
   - Searchable and filterable
   - Click any task to open detail drawer with audit trail
   - Shows import source and change history

## All Available Screens

### Core Navigation
- **Landing** (`/`) - Marketing page with CTAs
- **Overview** (`/dashboard`) - Main command center
- **Today Plan** (`/dashboard/today`) - Prioritized daily operations
- **Fields** (`/dashboard/fields`) - All fields list view
- **Field Detail** (`/dashboard/fields/:fieldId`) - Individual field deep dive
- **Tasks** (`/dashboard/tasks`) - All tasks across farm
- **Imports** (`/dashboard/imports`) - Import history and management
- **Reports** (`/dashboard/reports`) - Generate operational reports
- **Alerts** (`/dashboard/alerts`) - Configure notifications
- **Settings** (`/dashboard/settings`) - Farm profile and preferences

### Upload Flow
- **Upload Wizard** (`/upload`) - 3-step import process:
  1. Upload file (drag & drop)
  2. Preview data with warnings
  3. Map columns to Cropbase fields
  4. Success screen with summary

## Sample Data

The demo includes **Aggie Demo Farm** with:
- **6 fields**: Rice, Corn, Tomatoes, Alfalfa, Orchards, Wheat
- **25 tasks**: Mix of statuses, categories, and time windows
- **9 field notes**: Realistic operational notes
- **4 import records**: Showing import history

### Field Statuses Demonstrated
- Normal (healthy operations)
- Attention (needs action)
- Blocked (weather/conditions)
- Overdue (past due tasks)
- Watch (monitoring required)

### Task Categories
- Irrigation
- Fertilization
- Spray
- Scout
- Harvest
- Maintenance
- Planting

## Key UX States Implemented

### Empty States
- No imports yet (Imports page)
- No tasks found (with clear filters CTA)
- No fields match filters

### Loading States
- Upload progress bar
- File parsing status
- Export generation animation

### Success States
- Import complete with summary
- Task created confirmation
- Export ready toast

### Error/Warning States
- Upload warnings (invalid dates, missing columns)
- Blocked tasks with reason
- Overdue task badges

## Design System

### Style
- Modern SaaS aesthetic with "rugged clean" agriculture feel
- Desktop-first with full mobile responsiveness
- Sidebar collapses to drawer on mobile
- Tables become stacked cards on small screens

### Color Palette
- Neutral grays for primary UI
- Severity badges: Green (Normal), Yellow (Watch), Orange (Attention), Red (Critical/Blocked)
- Category colors: Blue (irrigation), Purple (spray), Green (fertilization), etc.

### Components Used
- Cards, tables, badges, filters, tabs
- Modals, drawers, tooltips, toasts
- Empty states, skeleton loaders
- Progress indicators, breadcrumbs

### Accessibility
- High contrast colors
- Visible focus states
- Keyboard navigable
- Large touch targets for mobile

## Responsive Behavior

### Desktop (1024px+)
- Left sidebar navigation always visible
- Multi-column layouts (2/3 + 1/3 grids)
- Tables with full column display
- Hover states and tooltips

### Tablet (768px - 1023px)
- Sidebar collapses to hamburger menu
- Two-column layouts stack
- Tables remain horizontal with scroll

### Mobile (< 768px)
- Drawer navigation
- Single column layouts
- Tables convert to stacked cards
- "Crew View" optimized for large touch targets
- Bottom-sticky CTAs

## Farmer-Friendly Language

All UI copy reflects practical, trustworthy tone:
- "Upload your Excel in 2 minutes"
- "Keep Excel as your source of truth"
- "See what changed since yesterday"
- No hype, no jargon - built for working farmers

## Technical Stack

- React with TypeScript
- React Router v7 (Data Mode)
- Tailwind CSS v4
- shadcn/ui components
- Lucide React icons
- Sonner for toasts

## No Backend Implementation

This is a **frontend-only prototype**. All features that would require backend APIs are:
- Mocked with realistic sample data
- Shown with placeholder UI states
- Indicated as "coming soon" where appropriate (AI summaries, team features)

Data flows and API integration points are designed but not implemented.

## Future Enhancements (Not Built)

- Real-time weather integration
- AI-powered daily briefings
- SMS/Email notifications
- Team collaboration features
- Mobile native apps
- Equipment tracking
- Actual backend persistence

---

**Built for farmers who live in spreadsheets.**
