# Component Library Reference
## FIFA World Cup 2026 Smart Stadium Operating System

### State Components (`/components/states`)

#### LoadingState
Shows a skeleton loader while data is fetching.
```tsx
<LoadingState message="Loading matches..." />
```

#### SkeletonCard
Animated skeleton card for content placeholders.
```tsx
<SkeletonCard />
```

#### SkeletonGrid
Grid of skeleton cards.
```tsx
<SkeletonGrid count={6} />
```

#### EmptyState
Shows when no data is available.
```tsx
<EmptyState
  title="No tickets found"
  description="You haven't purchased any tickets yet."
  action={{
    label: "Browse matches",
    href: "/match-center"
  }}
/>
```

#### ErrorState
Shows error with retry option.
```tsx
<ErrorState
  title="Failed to load matches"
  message="Unable to fetch match data. Please try again."
  onRetry={() => { /* retry logic */ }}
/>
```

#### OfflineBanner
Indicates offline status.
```tsx
<OfflineBanner />
```

### Layout Components (`/components/layout`)

#### PageLayout
Full-page layout with header.
```tsx
<PageLayout
  title="Matches"
  subtitle="FIFA World Cup 2026"
  action={<Button>Add Match</Button>}
  maxWidth="2xl"
>
  {/* Page content */}
</PageLayout>
```

#### SectionLayout
Content section with header.
```tsx
<SectionLayout
  title="Live Matches"
  subtitle="Today's games"
  variant="card"
  action={<Button>Refresh</Button>}
>
  {/* Section content */}
</SectionLayout>
```

#### GridLayout
Responsive grid layout.
```tsx
<GridLayout cols={3} gap="md">
  {/* Grid items */}
</GridLayout>
```

### Custom Hooks (`/lib/hooks`)

#### useMediaQuery
Responsive queries.
```tsx
const isMobile = useMediaQuery('(max-width: 768px)')
const isTablet = useMediaQuery('(max-width: 1024px)')
const isDark = useMediaQuery('(prefers-color-scheme: dark)')
```

#### useIsMobile / useIsTablet / useIsDarkMode
Convenience hooks.
```tsx
const isMobile = useIsMobile()
const isTablet = useIsTablet()
const isDark = useIsDarkMode()
```

#### useAsync
Async operations.
```tsx
const { data, loading, error, retry } = useAsync(async () => {
  return fetch('/api/matches').then(r => r.json())
})
```

#### usePrevious
Track previous value.
```tsx
const previousValue = usePrevious(value)
```

### Utility Functions

#### Format Utilities (`/lib/utils/format`)
```tsx
formatCurrency(1000) // "$1,000.00"
formatPercent(85.5) // "85.5%"
formatNumber(1000000) // "1,000,000"
formatDate(new Date()) // "Jan 1, 2026"
formatTime(new Date()) // "14:30"
formatDuration(3661) // "1h 1m"
formatBytes(1024) // "1 KB"
```

#### Validation Utilities (`/lib/utils/validation`)
```tsx
isValidEmail("test@example.com") // true
isValidPhone("555-1234") // true
isValidURL("https://example.com") // true
validatePassword("Test@1234") // { isValid: true, strength: 'good', errors: [] }
```

### AI Components (`/components/ai`)

#### ChatBubble
Conversational message display.
```tsx
<ChatBubble
  role="assistant"
  content="How can I help you today?"
  timestamp="2:30 PM"
/>
```

#### InsightCard
AI-discovered insights.
```tsx
<InsightCard
  title="High Attendance Prediction"
  description="Expected 95% capacity for next match"
  confidence={92}
  icon={TrendingUp}
/>
```

#### RecommendationCard
Actionable recommendations.
```tsx
<RecommendationCard
  title="Increase parking capacity"
  description="Demand expected to exceed 110%"
  priority="high"
/>
```

#### PredictionCard
Future forecasts.
```tsx
<PredictionCard
  title="Weather Forecast"
  value="12°C, Rainy"
  confidence={85}
/>
```

### Operations Components (`/components/ops`)

#### KPICard
Key performance indicator.
```tsx
<KPICard
  label="Volunteers On Duty"
  value="234"
  change={12}
  status="active"
/>
```

#### StatusBadge
Live status indicator.
```tsx
<StatusBadge status="active" label="All Systems Go" />
```

#### AlertBanner
Multi-level alerts.
```tsx
<AlertBanner
  title="Security Alert"
  message="High crowd density in Zone A"
  severity="warning"
  dismissible
/>
```

#### IncidentCard
Incident tracking.
```tsx
<IncidentCard
  title="Medical Response Needed"
  severity="critical"
  location="Section 5B"
  time="2:15 PM"
/>
```

### Infrastructure Components (`/components/infrastructure`)

#### ParkingCard
Parking status.
```tsx
<ParkingCard
  zone="A"
  available={123}
  total={250}
  status="normal"
/>
```

#### EnergyCard
Energy monitoring.
```tsx
<EnergyCard
  current={1540}
  solar={450}
  peak={2000}
  unit="kW"
/>
```

#### AssetCard
Equipment lifecycle.
```tsx
<AssetCard
  name="HVAC System A"
  status="operational"
  nextMaintenance="Jan 15"
/>
```

### Base UI Components (`/components/ui)

All shadcn/ui components available:
- Button
- Input
- Select
- Textarea
- Checkbox
- Radio
- Switch
- Dialog
- Drawer
- Dropdown Menu
- Tabs
- Accordion
- Card
- Badge
- Progress
- And more...

### Type Definitions (`/lib/types`)

```tsx
// User types
interface User {
  id: string
  name: string
  email: string
  role: Role
}

// Match types
interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  status: 'scheduled' | 'live' | 'finished'
}

// API Response
interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}
```

### Constants (`/lib/constants`)

```tsx
export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
}

export const PRIORITY_COLORS = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
}
```

### Best Practices

1. **Always use layout components** for consistent structure
2. **Always handle loading/empty/error states**
3. **Use utility functions** for formatting
4. **Use hooks** for responsive behavior
5. **Follow naming conventions** (PascalCase for components)
6. **Use TypeScript** for type safety
7. **Use CSS variables** for colors, never hardcode
8. **Make components responsive** with Tailwind breakpoints
9. **Add ARIA labels** for accessibility
10. **Test on mobile** before committing

### Responsive Guidelines

- Use `sm:`, `md:`, `lg:`, `xl:`, `2xl:` prefixes
- Mobile-first approach
- Test at: 360px, 640px, 768px, 1024px, 1280px, 1536px
- Touch targets minimum 48x48px
- Safe area on notched devices

### Accessibility Standards

- WCAG 2.2 AA compliance
- Semantic HTML
- ARIA labels where needed
- Color not the only differentiator
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Motion preferences respected
