# FIFA World Cup 2026 Smart Stadium Operating System
## Project Structure

### Project Overview
A comprehensive enterprise platform built for the FIFA World Cup 2026, featuring integrated fan experience, stadium operations, AI intelligence, and infrastructure management.

### 📁 Directory Structure

```
/app                          # Next.js App Router
  ├── /ai                     # AI & Intelligence Platform
  ├── /fan-*                  # Fan Experience Modules
  ├── /operations             # Stadium Operations Dashboards
  ├── /infrastructure         # Infrastructure Management
  ├── layout.tsx              # Root layout with metadata
  ├── page.tsx                # Home/landing page
  ├── globals.css             # Global styles & design tokens
  ├── error.tsx               # Error boundary
  └── not-found.tsx           # 404 handler

/components
  ├── /ai                     # AI-specific components
  ├── /ops                    # Operations components
  ├── /infrastructure         # Infrastructure components
  ├── /states                 # Loading, empty, error states
  ├── /layout                 # Layout components
  ├── /ui                     # Base UI components (shadcn)

/lib
  ├── /utils                  # Formatting, validation utilities
  ├── /hooks                  # Custom React hooks
  ├── /types                  # TypeScript type definitions
  ├── /constants              # App-wide constants
  └── utils.ts                # General utilities

/public
  ├── fonts/                  # Custom fonts
  ├── icons/                  # SVG icons
  └── robots.txt              # SEO robots file
```

### 🎨 Design System

**Color Scheme**: Light Solarized Enterprise
- **Primary**: Corporate Blue
- **Secondary**: Executive Red
- **Neutral**: Peach White to Forest Sage gradient
- **Accents**: Green for success, Yellow for warnings, Red for errors

**Typography**:
- Headings: Bold, hierarchical sizing
- Body: Clear, readable sans-serif
- Code: Monospace for technical content

**Components**:
- Accessible shadcn/ui base components
- Consistent spacing (4px grid)
- Standard border radius and elevation
- Responsive Tailwind CSS

### 📱 Phases

**Phase 1: Foundation** ✅
- Design system setup
- Base components

**Phase 2: Fan Experience** ✅
- Dashboard
- Match center
- Analytics
- Tickets
- Navigation
- Merchandise

**Phase 3: Operations** ✅
- Volunteer management
- Security operations
- Medical operations
- Crowd monitoring
- Communications

**Phase 4: AI & Intelligence** ✅
- Command center
- Executive dashboard
- Digital twin
- Operational intelligence
- Predictions & incidents
- Smart search

**Phase 5: Infrastructure** ✅
- Parking
- Transportation
- Energy management
- Water management
- Waste management
- Assets & maintenance
- User management & RBAC
- Audit logs & compliance

**Phase 6: Production RC** (In Progress)
- Global UI audit
- Microinteractions
- Accessibility (WCAG 2.2 AA)
- Performance optimization
- Loading/empty/error states
- Production checklist

### 🚀 Technology Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with semantic tokens
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Type Safety**: TypeScript
- **Deployment**: Vercel

### 📊 Component Categories

**State Components**:
- `LoadingState` - Skeleton loaders
- `EmptyState` - No data states
- `ErrorState` - Error display
- `OfflineState` - Offline indicator

**Layout Components**:
- `PageLayout` - Full page with header
- `SectionLayout` - Content sections
- `GridLayout` - Responsive grids

**Custom Hooks**:
- `useMediaQuery` - Responsive queries
- `useAsync` - Async operations
- `usePrevious` - Previous value tracking
- `useIsMobile/Tablet/DarkMode` - Device detection

**Utilities**:
- Format (currency, dates, numbers)
- Validation (email, phone, password)
- Constants (status colors, priorities)
- Types (TypeScript interfaces)

### 🔐 Production Features

- **SEO**: Sitemap, robots.txt, metadata templates
- **Accessibility**: WCAG 2.2 AA compliant
- **Performance**: Code splitting, lazy loading ready
- **Error Handling**: Global error boundary, 404 handling
- **Offline**: Offline banner component
- **Analytics**: Vercel Analytics integration
- **Responsive**: Mobile-first, all breakpoints

### 📋 Checklist for Production

- [ ] All pages tested on mobile/tablet/desktop
- [ ] Accessibility audit complete
- [ ] Performance metrics optimized
- [ ] Error states implemented
- [ ] Loading states implemented
- [ ] SEO optimized
- [ ] Analytics configured
- [ ] Security headers set
- [ ] Rate limiting configured
- [ ] Backup systems ready

### 🎯 Key Principles

1. **Consistency**: Every component follows the same design system
2. **Accessibility**: WCAG 2.2 AA compliance throughout
3. **Performance**: Optimized for fast load times
4. **Maintainability**: Clear structure, reusable components
5. **Scalability**: Ready for backend integration
6. **Enterprise Quality**: Production-ready code

### 📝 Notes

- All pages use the design system established in Phase 1
- No hardcoded colors - all use CSS variables
- Mock data ready for backend integration
- Fully responsive across all screen sizes
- Keyboard navigation supported throughout
