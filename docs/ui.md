# UI Coding Standards

## Core Rule: shadcn/ui Only

**All UI components in this project must use shadcn/ui components exclusively.**

No custom UI components are to be created under any circumstances. If a UI element is needed, find the appropriate shadcn/ui component or compose existing shadcn/ui components together.

## What This Means

- **DO NOT** create custom `<Button>`, `<Card>`, `<Input>`, `<Dialog>`, or any other UI primitive from scratch.
- **DO NOT** build wrapper components that replicate what shadcn/ui already provides.
- **DO** install the required shadcn/ui component via the CLI and use it directly.
- **DO** compose multiple shadcn/ui components together to build more complex UI sections.

## Adding shadcn/ui Components

Install components using the shadcn CLI:

```bash
npx shadcn@latest add <component-name>
```

Examples:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add table
```

Installed components land in `src/components/ui/`. Import them from there:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
```

## What Is Allowed

| Allowed | Not Allowed |
|---|---|
| shadcn/ui components from `src/components/ui/` | Custom-built UI primitives |
| Composing shadcn/ui components into page sections | Wrapper components that duplicate shadcn/ui |
| Styling via Tailwind CSS utility classes on shadcn/ui components | Custom component files in `src/components/` that are not from shadcn |
| Page-level layout files (`layout.tsx`, `page.tsx`) | Hand-rolled form controls, modals, dropdowns, etc. |

## Tailwind CSS Usage

Tailwind CSS utility classes may be used freely to:

- Adjust layout, spacing, and sizing on shadcn/ui components via `className`
- Set colors, typography, and responsive behavior

Do not use Tailwind to build a component that should come from shadcn/ui.

## Available shadcn/ui Components

Refer to the full component list at [https://ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components). Key components include:

- **Layout:** Separator, Aspect Ratio, Scroll Area
- **Forms:** Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider, Form
- **Feedback:** Alert, Alert Dialog, Toast, Progress, Skeleton
- **Overlay:** Dialog, Drawer, Sheet, Popover, Tooltip, Hover Card, Context Menu
- **Navigation:** Breadcrumb, Navigation Menu, Tabs, Pagination, Sidebar
- **Data Display:** Table, Card, Badge, Avatar, Calendar
- **Typography:** Label

If the component you need exists in shadcn/ui, install it — do not build it.

## Date Formatting

All dates displayed in the UI must be formatted using the **date-fns** library. No other date formatting approach (`toLocaleDateString`, `Intl.DateTimeFormat`, `moment`, `dayjs`, custom helpers, etc.) is permitted.

### Required Format

Dates must render in `DDo MMM yyyy` format — day with ordinal suffix, abbreviated month, four-digit year:

```
07th Jun 2026
02nd Jan 2026
11th Sep 2026
```

### Usage

Install date-fns if not already present:

```bash
npm install date-fns
```

Format a date value:

```tsx
import { format } from "date-fns";

format(new Date(order.createdAt), "do MMM yyyy");
// → "7th Jun 2026"
```

`date-fns` generates the correct ordinal suffix (`st`, `nd`, `rd`, `th`) automatically via the `do` token.

### Rules

- **DO** use `format(date, "do MMM yyyy")` for every date shown to the user.
- **DO NOT** use `new Date().toLocaleDateString()` or any browser/Node built-in formatting.
- **DO NOT** use moment.js, dayjs, or any other date library.
- **DO NOT** hand-write ordinal logic — let `date-fns` handle it.

---

## Enforcement

Code reviews must reject any PR that introduces a custom UI component. If a required UI pattern does not exist in shadcn/ui, the preferred approach is to compose existing shadcn/ui components to achieve the desired result.
