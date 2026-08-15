# Idesign — Apple Liquid Glass Component Library

> **A state-of-the-art Vue 3 & Nuxt 3 design system and component library engineered with Apple's Liquid Glass aesthetic, fluid spring physics, dynamic dark mode, and 100% mobile responsiveness.**

![Vue 3](https://img.shields.io/badge/Vue-3.x-4fc08d?style=flat-square&logo=vue.js)
![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00dc82?style=flat-square&logo=nuxt.js)
![Apple Design](https://img.shields.io/badge/Design-Apple%20Liquid%20Glass-0071e3?style=flat-square&logo=apple)
![Responsive](https://img.shields.io/badge/Mobile-100%25%20Responsive-34c759?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ⚡ Key Features

- ** Apple Liquid Glass Aesthetic**: Frosted saturation & backdrop-blur overlays, squircle border radii, ambient glow orbs, and spring-physics micro-interactions.
- **🚀 Dual Vue 3 & Nuxt 3 Engine**: Native support for Vue 3 Single File Components (SFC) and Nuxt 3 auto-imported module usage.
- **📱 100% Mobile Responsive**: Adheres strictly to Apple Human Interface Guidelines (HIG) with touch targets $\ge 44 \times 44\text{px}$, fluid grid containers, touch-pan scroll physics, and edge-anchored mobile bottom sheets.
- **🎨 Rich Color & Size Token System**: Every component supports configurable sizes (`sm`, `md`, `lg`, `xl`), visual variants (`default`, `glass`, `hero`, `pill`, `framed`, `no-divider`), and Apple color themes (`blue`, `green`, `purple`, `orange`, `red`, `black`, `gray`).
- **🎛️ Interactive Component Sandbox**: Integrated live playground with real-time prop controls, light/dark mode toggling, and 1-click code copying for **Vue 3 SFC**, **Nuxt 3**, and **Pure HTML + CSS**.

---

## 📦 Installation

Install `@idesign/vue` via npm, pnpm, or yarn:

```bash
npm install @idesign/vue
```

### Vue 3 Plugin Setup

In your main entry file (`src/main.js` or `src/main.ts`):

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// Import Idesign global styles
import '@idesign/vue/dist/idesign.css'

const app = createApp(App)
app.mount('#app')
```

### Vue 3 Single File Component (SFC) Usage

Import components directly into your components:

```vue
<script setup>
import { IdButton, IdCard, useToast } from '@idesign/vue'

const toast = useToast()

const handleAction = () => {
  toast.success('Action Completed!', {
    description: 'All changes synchronized to your Apple iCloud account.'
  })
}
</script>

<template>
  <IdCard
    title="Apple Vision Pro"
    subtitle="Spatial Computing UI"
    variant="glass"
    interactive
  >
    <p>Welcome to the era of spatial computing.</p>

    <template #actions>
      <IdButton variant="secondary" size="sm">Details</IdButton>
      <IdButton variant="primary" size="sm" @click="handleAction">
        Get Started →
      </IdButton>
    </template>
  </IdCard>
</template>
```

### Nuxt 3 Integration

In your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  css: ['@idesign/vue/dist/idesign.css'],
  build: {
    transpile: ['@idesign/vue']
  }
})
```

Use components directly in `pages/index.vue` without manual imports:

```vue
<template>
  <IdGlassNav title="Idesign" icon="⚡" variant="glass" />
  
  <main class="container">
    <IdHeroCta
      title="Build Apple-Grade Web Applications"
      description="Clean, unified surfaces with frosted glass used only where layers overlap."
      eyebrow="DESIGN SYSTEM V2.0"
      action-label="Explore System"
    />
  </main>
</template>
```

---

## 🧩 Component Catalog (60 Components & Templates)

### 📄 Page Templates
| Component | Description |
|---|---|
| `HeroTemplate` | Apple-grade landing page with sticky glass nav, gradient glow orbs, and feature grid. |
| `ProductShowcaseTemplate` | Apple Store e-commerce page with category filters, price cards, and shopping bag counter. |
| `AiChatTemplate` | Vision Pro AI assistant page supporting `full`, `standalone`, and `widget` modes. |
| `DashboardTemplate` | Analytics dashboard with KPI stat cards, interactive data table, and team collaborators. |
| `AuthTemplate` | Authentication page supporting `default`, `split-hero`, `centered-card`, and `minimal-glass` passkey layouts. |

### 🧭 Navigation
| Component | Key Props | Description |
|---|---|---|
| `IdGlassNav` | `title`, `variant`, `icon`, `links` | Sticky frosted header with blur saturation and navigation links. |
| `IdStepper` | `activeStep`, `size`, `variant`, `color`, `clickable` | Step progress wizard with checkmarks and vertical mobile collapse. |
| `IdSegmentedControl` | `active`, `size`, `theme`, `options` | Segmented pill control with touch pan scrolling. |
| `IdTabs` | `v-model`, `size`, `variant`, `color`, `tabs` | ARIA tab list with animated sliding indicator bar. |
| `IdBreadcrumbs` | `variant`, `size`, `color`, `items` | Breadcrumb navigation with icon and glass variants. |
| `IdPagination` | `v-model`, `totalPages`, `size`, `variant`, `color` | Page navigation with tabular-nums and ellipsis. |
| `IdDropdownMenu` | `size`, `variant`, `items` | Action menu with keyboard shortcuts and dividers. |
| `IdDock` | `position`, `items` | macOS liquid glass floating dock with magnification physics. |

### 🔘 Buttons
| Component | Key Props | Description |
|---|---|---|
| `IdButton` | `label`, `variant`, `color`, `size`, `iconLeft`, `iconRight`, `disabled`, `loading`, `block` | Apple pill buttons with 7 variants (`primary`, `secondary`, `outline`, `glass`, `dark`, `ghost`, `danger`) and 6 colors. |

### 🎛️ Form Inputs
| Component | Key Props | Description |
|---|---|---|
| `IdInput` | `v-model`, `label`, `placeholder`, `variant`, `size`, `clearable`, `trailingText` | Quiet text input with search, error, success, and clear button. |
| `IdTextarea` | `v-model`, `label`, `size`, `variant`, `maxlength` | Multiline text input with character counter and glass style. |
| `IdSelect` | `v-model`, `label`, `size`, `variant`, `options` | Dropdown select with `no-divider` rounded item mode. |
| `IdCheckbox` | `v-model`, `label`, `size`, `color` | Checkbox with Apple color selection. |
| `IdRadioGroup` | `v-model`, `label`, `direction`, `options` | Radio button group with vertical/horizontal layouts. |
| `IdSlider` | `v-model`, `label`, `min`, `max` | Range slider with accent fill track. |
| `IdToggle` | `v-model`, `label`, `size`, `variant` | iOS switch toggle with green, blue, purple, orange, red colors. |
| `IdDatePicker` | `v-model`, `label` | Apple Calendar-style date picker popover. |
| `IdFileUpload` | `@change`, `hint` | Drag & drop file upload zone with preview list. |

### 🖼️ Panels & Cards
| Component | Key Props | Description |
|---|---|---|
| `IdCard` | `title`, `subtitle`, `description`, `variant`, `image`, `padding`, `interactive` | Container supporting `default`, `framed`, `glass`, `hero`, `image-top`, `image-bg`. |
| `IdPanel` & `IdPanelRow` | `size`, `variant`, `noDividers`, `icon`, `iconBg`, `detail` | Anti-fragmentation unified settings panel surface. |
| `IdHeroCta` | `title`, `description`, `eyebrow`, `actionLabel`, `variant` | Liquid glass hero CTA with ambient blur orbs. |
| `IdAccordion` | `size`, `variant`, `items` | Collapsible panels supporting `default`, `separated`, and `glass`. |
| `IdProjectSection` | `title`, `icon` | Apple portfolio project section container. |
| `IdImageFrame` | `src`, `shape`, `aspectRatio`, `bezelSize`, `caption`, `interactive` | Photo frame with squircle/circle bezel and hover zoom. |
| `IdCarousel` | `showDots`, `showControls` | Horizontal snap card carousel with dot pagination. |

### 🪟 Overlays & Dialogs
| Component | Key Props | Description |
|---|---|---|
| `IdModal` | `v-model`, `title`, `subtitle`, `content`, `variant`, `size` | Frosted glass modal card with scale+opacity animation. |
| `IdTour` | `v-model`, `steps`, `nextLabel`, `finishLabel`, `backLabel`, `skipLabel` | Product tour guide with per-step badges, images, and labels. |
| `IdCommandPalette` | `v-model`, `groups` | Spotlight command palette modal with global ⌘K shortcut. |
| `IdPopover` | `position`, `title`, `body`, `size`, `variant` | Floating anchored popover card with outside click dismiss. |
| `IdBottomSheet` | `v-model`, `title`, `description` | Mobile bottom sheet anchored to screen edge. |
| `IdDrawer` | `v-model`, `title`, `description`, `position`, `variant` | Side sliding drawer supporting default & floating sheet. |
| `IdToast` | `position` + `useToast()` composable | Floating toast notification queue system. |
| `IdTooltip` | `text`, `position` | Rounded hover tooltip with dark mode support. |
| `IdConfirmDialog` | `v-model`, `title`, `message`, `variant`, `danger` | Action confirmation dialog. |

### 📊 Data Display & Indicators
| Component | Key Props | Description |
|---|---|---|
| `IdTable` | `title`, `count`, `variant`, `columns`, `data`, `selectable`, `searchable` | Data table with striped, glass, borderless, compact, sorting, and row actions. |
| `IdAvatar` | `name`, `src`, `icon`, `size`, `shape`, `framed`, `status` | Profile avatar with initials fallback, status dot, and Vision Pro glass frame. |
| `IdAvatarGroup` | `variant`, `shape`, `size`, `max`, `label`, `framed`, `users` | Stacked, grid, hero, and expanded user avatar group. |
| `IdStat` | `label`, `value`, `change`, `description`, `size`, `variant`, `sparklineData` | Key metric card with positive/negative badge & SVG sparkline. |
| `IdLiveDot` | `slot` | Animated pulsing green status indicator. |
| `IdTag` | `label`, `variant`, `size`, `iconLeft`, `removable` | Status chips and tag pills with 7 color themes. |
| `IdAlert` | `variant`, `size`, `title`, `description`, `dismissible` | Info, success, warning, error, and glass alert banners. |
| `IdEmpty` | `title`, `description`, `icon`, `actionLabel` | Empty or error state container. |
| `IdBadge` | `count`, `showZero` | Count notification badge overlay. |
| `IdProgress` | `value`, `size`, `variant`, `color`, `indeterminate` | Progress bar with shimmer loading. |
| `IdSkeleton` | `variant`, `size` | Loading placeholder for rect, text, circle, card. |
| `IdSpinner` | `size`, `color`, `label` | SVG arc spinner with optional label. |
| `IdBarChart` | `height`, `data` | Animated SVG dashboard bar chart with tooltips. |
| `IdPieChart` | `centerLabel`, `data` | SVG donut/pie chart with legend and center summary label. |
| `IdTimeline` | `items` | Vertical activity timeline for feeds and changelogs. |

### 📐 Layout & Devices
| Component | Key Props | Description |
|---|---|---|
| `IdGrid` | `cols`, `gap`, `autoFit`, `minColWidth` | Responsive CSS Grid layout helper. |
| `IdStack` | `direction`, `gap` | Flex container helper for vertical/horizontal alignment. |
| `IdDivider` | `variant` | Hairline section divider. |
| `IdMacOsBanner` | `appName`, `title`, `message`, `time`, `icon`, `actionLabel` | macOS system notification card. |
| `IdFileTree` | `items`, `selectedId`, `expandedIds` | macOS Finder style directory tree view. |
| `IdIphoneFrame` | `slot` | Mobile simulator frame with Dynamic Island and status bar. |

---

## 📱 Mobile Responsiveness Architecture

Idesign components are engineered to work flawlessly on smartphones, tablets, laptops, and spatial displays:

1. **HIG Touch Targets**: Every control maintains minimum touch target boundaries ($\ge 44 \times 44\text{px}$) to comply with Apple Human Interface Guidelines.
2. **Fluid Column Collapse**: `IdGrid` and `IdStepper` automatically adapt from multi-column desktop arrangements to single-column mobile views below `768px` and `640px`.
3. **Touch Physics & Pan Scrolling**: Data tables ([IdTable](file:///c:/Users/Jmakes/OneDrive/Documents/codethingz/Idesign/src/components/idesign/IdTable.vue)), tab bars ([IdTabs](file:///c:/Users/Jmakes/OneDrive/Documents/codethingz/Idesign/src/components/idesign/IdTabs.vue)), segmented controls ([IdSegmentedControl](file:///c:/Users/Jmakes/OneDrive/Documents/codethingz/Idesign/src/components/idesign/IdSegmentedControl.vue)), and floating docks ([IdDock](file:///c:/Users/Jmakes/OneDrive/Documents/codethingz/Idesign/src/components/idesign/IdDock.vue)) include `-webkit-overflow-scrolling: touch` protection.
4. **Edge-Anchored Overlays**: Modals, bottom sheets, and drawers dynamically adjust to `calc(100vw - 32px)` with mobile viewport height safeguards.

---

## 🛠️ Development & Building

```bash
# Start local Vite development playground server
npm run dev

# Compile production ESM & UMD library bundles to dist/
npm run build:lib

# Build production website application bundle
npm run build
```

---

## 📄 License

MIT © [Idesign Team](https://github.com/idesign-ui)
