# Idesign — Liquid Glass Component Library

> **A state-of-the-art Vue 3 & Nuxt 3 design system and component library engineered with Liquid Glass aesthetics, fluid spring physics, dynamic dark mode, and 100% mobile responsiveness.**

![Vue 3](https://img.shields.io/badge/Vue-3.x-4fc08d?style=flat-square&logo=vue.js)
![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00dc82?style=flat-square&logo=nuxt.js)
![Design System](https://img.shields.io/badge/Design-Liquid%20Glass-0071e3?style=flat-square)
![Responsive](https://img.shields.io/badge/Mobile-100%25%20Responsive-34c759?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ⚡ Key Features

- **Liquid Glass Aesthetic**: Frosted saturation (`backdrop-filter: saturate(180%) blur(20px)`), unified white surfaces, hairline dividers (`rgba(0,0,0,0.07)`), and spring-physics micro-interactions.
- **🚀 Dual Vue 3 & Nuxt 3 Engine**: Native support for Vue 3 Single File Components (SFC) and Nuxt 3 auto-imported module usage.
- **📱 100% Mobile Responsive**: Touch targets $\ge 44 \times 44\text{px}$, responsive breakpoint scale (`xs`–`2xl`), fluid grid containers, touch-pan scroll physics, and edge-anchored mobile bottom sheets.
- **🎨 Centralized Token & Theming System**: Every component supports configurable sizes (`xs`, `sm`, `md`, `lg`, `xl`), visual variants (`default`, `glass`, `hero`, `pill`, `framed`, `no-divider`), and color themes.
- **♿ Full WAI-ARIA Accessibility**: Complete keyboard navigation (Arrow keys, Home, End, Escape), focus rings (`:focus-visible`), live regions, and semantic roles across all overlays, selects, tabs, and forms.
- **🌐 Global UI Configuration**: Declarative design system customization with `createUI` / `createIdesign` supporting tokens, component defaults, RTL direction, and localized date/number/currency formatting.

---

## 📦 Installation & CLI Scaffolding

### 1. NPM Package Installation

```bash
npm install @idesign/vue
```

### 2. Interactive CLI Scaffolding (`npx idesign`)

Scaffold components, compound bundles, design tokens, and full page templates directly into your Vue 3 or Nuxt 3 project:

```bash
# 🚀 Initialize design tokens (tokens.css) & useIdesignConfig composable
npx idesign init

# 📦 Add individual components or compound bundles
npx idesign add button input toggle pin-input
npx idesign add form card dialog frames

# 📑 Scaffold full Liquid Glass page templates
npx idesign template settings
npx idesign template analytics
npx idesign template checkout

# 🔍 List all available components or inspect installed status
npx idesign list
npx idesign status
```


### Vue 3 Setup & Global Configuration

In your main entry file (`src/main.js` or `src/main.ts`):

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Idesign, { createUI } from '@idesign/vue'

// Import global styles
import '@idesign/vue/dist/idesign.css'

const app = createApp(App)

// 🌐 Optional: Configure global theme, density, tokens, and component defaults
app.use(createUI({
  theme: 'auto',          // 'light' | 'dark' | 'auto'
  density: 'comfortable',  // 'compact' | 'comfortable' | 'spacious'
  locale: 'en',
  dir: 'ltr',

  ui: {
    colors: {
      primary: '#0071e3',  // System Blue accent
      surface: '#ffffff',
      border: 'rgba(0, 0, 0, 0.07)'
    },
    radius: {
      md: '12px',
      lg: '18px',
      full: '999px'
    },
    components: {
      Button: { size: 'md', variant: 'primary' },
      Input: { size: 'md', clearable: true }
    }
  }
}))

app.use(Idesign)
app.mount('#app')
```

---

## 🧩 Usage Examples

### 1. Compound Form System

```vue
<script setup>
import { reactive } from 'vue'
import {
  IdForm,
  IdFormField,
  IdFormGroup,
  IdFormSection,
  IdFormActions,
  IdInput,
  IdButton
} from '@idesign/vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
}
</script>

<template>
  <IdForm @submit="handleSubmit">
    <IdFormSection title="User Profile" description="Update your personal details.">
      <IdFormGroup inline>
        <IdFormField label="First Name" required>
          <IdInput v-model="form.firstName" placeholder="Alex" />
        </IdFormField>

        <IdFormField label="Last Name" required>
          <IdInput v-model="form.lastName" placeholder="Rivera" />
        </IdFormField>
      </IdFormGroup>

      <IdFormField label="Email" required>
        <IdInput v-model="form.email" type="email" placeholder="alex@domain.com">
          <template #prefix>✉️</template>
        </IdInput>
      </IdFormField>
    </IdFormSection>

    <IdFormActions align="right">
      <IdButton variant="ghost" type="reset">Reset</IdButton>
      <IdButton variant="primary" type="submit">Save Changes</IdButton>
    </IdFormActions>
  </IdForm>
</template>
```

### 2. Compound Card System

```vue
<template>
  <IdCard variant="glass" padding="lg">
    <template #header>
      <IdCardTitle tag="h2">Spatial Computing UI</IdCardTitle>
      <IdCardDescription>High fidelity visual panel</IdCardDescription>
    </template>

    <p>Unified white surface with hairline dividers and smooth elevation shadows.</p>

    <template #footer>
      <IdButton size="sm" variant="primary">Explore →</IdButton>
    </template>
  </IdCard>
</template>
```

### 3. Compound Dialog System

```vue
<script setup>
import { ref } from 'vue'
import { IdDialog, IdButton } from '@idesign/vue'

const isOpen = ref(false)
</script>

<template>
  <IdButton variant="primary" @click="isOpen = true">Open Dialog</IdButton>

  <IdDialog v-model="isOpen" title="Workspace Settings" max-width="540px">
    <p>Dialog body content with automatic Escape key handling and focus trapping.</p>

    <template #footer>
      <IdButton variant="ghost" @click="isOpen = false">Cancel</IdButton>
      <IdButton variant="primary" @click="isOpen = false">Confirm</IdButton>
    </template>
  </IdDialog>
</template>
```

---

## 🛠️ Runtime Theming & Formatting Helpers

Use `useIdesignConfig` in any component to dynamically adapt themes, RTL, and localization:

```vue
<script setup>
import { useIdesignConfig } from '@idesign/vue'

const {
  setTheme,
  setDensity,
  setDir,
  setUi,
  formatNumber,
  formatCurrency,
  formatDate
} = useIdesignConfig()

// Dynamic updates
const switchDark = () => setTheme('dark')
const switchRtl = () => setDir('rtl')
const updateAccent = (color) => setUi({ colors: { primary: color } })

const formattedPrice = formatCurrency(1499.99, 'USD') // "$1,499.99"
const formattedDate = formatDate(new Date())           // "Aug 16, 2026"
</script>
```

---

## 🧪 Testing

Run the test suite with Vitest:

```bash
npm test
```

Build production library bundles (ESM, UMD, and CSS):

```bash
npm run build:lib
```

---

## 📄 License

MIT © [Idesign](https://github.com/joniffer10/iDesign)
