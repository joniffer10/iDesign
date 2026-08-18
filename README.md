# Idesign — Liquid Glass Component Library

> **A state-of-the-art Vue 3 & Nuxt 3 design system and component library engineered with Liquid Glass aesthetics, fluid spring physics, dynamic dark mode, and 100% mobile responsiveness.**

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4fc08d?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00dc82?style=flat-square&logo=nuxt.js)](https://nuxt.com/)
[![Design System](https://img.shields.io/badge/Design-Liquid%20Glass-0071e3?style=flat-square)](https://idesign-ui.vercel.app/)
[![Tests](https://img.shields.io/badge/Tests-94%20Passed-30d158?style=flat-square)](https://github.com/joniffer10/iDesign)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## ⚡ Key Highlights

- **Liquid Glass Aesthetic**: Frosted saturation (`backdrop-filter: saturate(180%) blur(20px)`), unified white surfaces, hairline dividers (`rgba(0,0,0,0.07)`), and Apple spring-physics micro-interactions.
- **🚀 Native Nuxt 3 Module**: One-line integration with `@idesign/vue/nuxt` — auto-imports all 90+ components, tokens, and composables.
- **⚡ Vite / Webpack Auto-Import**: Built-in `IdesignResolver` for `unplugin-vue-components` with zero manual imports.
- **🛠️ Zero-Bloat CLI Scaffolding**: Copy-paste individual components (`npx idesign add button`) like shadcn with zero extra dependencies.
- **📱 100% Mobile Responsive**: Touch targets $\ge 44 \times 44\text{px}$, responsive breakpoint scale (`xs`–`2xl`), fluid grid containers, and edge-anchored mobile bottom sheets.
- **🎨 Centralized Token & Theming System**: Every component supports configurable sizes (`xs`–`xl`), visual variants (`default`, `glass`, `hero`, `pill`, `framed`), and color themes.
- **♿ Full WAI-ARIA Accessibility**: Complete keyboard navigation (Arrow keys, Home, End, Escape), focus rings (`:focus-visible`), focus traps, and screen reader attributes.
- **📋 Form Validation Ready**: Native integration with `zod`, `vee-validate`, and standard HTML5 form validation.

---

## 📦 Installation & Setup Options

### Option 1: Nuxt 3 Zero-Config Module *(Recommended for Nuxt)*

Add the official module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@idesign/vue/nuxt']
})
```

*That's it!* All 90+ components (`<IdButton>`, `<IdCard>`, `<IdPinInput>`), design tokens, and composables are automatically available across your entire Nuxt app without manual imports.

---

### Option 2: Vite Auto-Import via `unplugin-vue-components`

In your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { IdesignResolver } from '@idesign/vue/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [IdesignResolver()]
    })
  ]
})
```

---

### Option 3: Full Package Global Plugin

Install the package via npm:

```bash
npm install @idesign/vue
```

In your `src/main.js`:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Idesign, { createUI } from '@idesign/vue'

// Import global design tokens
import '@idesign/vue/tokens'

const app = createApp(App)

// 🌐 Optional: Global configuration (theming, density, component defaults)
app.use(createUI({
  theme: 'auto',          // 'light' | 'dark' | 'auto'
  density: 'comfortable',  // 'compact' | 'comfortable' | 'spacious'
  ui: {
    colors: {
      primary: '#0071e3',  // System Blue accent
      surface: '#ffffff'
    },
    radius: {
      md: '12px',
      lg: '18px',
      full: '999px'
    }
  }
}))

app.use(Idesign)
app.mount('#app')
```

---

### Option 4: Individual Component Scaffolding (`npx idesign`)

If you prefer **zero-bloat copy-paste components** (shadcn-style) instead of installing the entire library:

```bash
# 1. Initialize tokens (tokens.css) & config in your project
npx idesign init

# 2. Add only the specific component(s) you need
npx idesign add button
npx idesign add pin-input toggle modal
npx idesign add form card dialog

# 3. Scaffold complete page templates
npx idesign template settings
npx idesign template analytics
npx idesign template checkout

# 4. List all 90+ available components or inspect installed status
npx idesign list
npx idesign status
```

---

### Option 5: Vanilla HTML / CDN Usage

Include the Liquid Glass stylesheet via unpkg CDN:

```html
<!-- 1. Include Liquid Glass Styles & Tokens in <head> -->
<link rel="stylesheet" href="https://unpkg.com/@idesign/vue@latest/dist/idesign.css">

<!-- 2. Component HTML Markup -->
<button type="button" class="id-btn btn-primary size-md">
  <span>Continue</span>
</button>
```

---

## 🧩 Usage Examples

### 1. Compound Form System & Validation

`<IdFormField>` automatically injects validation context (`error`, `required`, `disabled`, `name`) into `<IdInput>`, `<IdSelect>`, and `<IdPinInput>`:

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
  email: '',
  password: ''
})

const errors = reactive({
  email: ''
})

const handleSubmit = () => {
  if (!form.email.includes('@')) {
    errors.email = 'Please enter a valid email address.'
    return
  }
  errors.email = ''
  console.log('Submitted:', form)
}
</script>

<template>
  <IdForm @submit="handleSubmit">
    <IdFormSection title="Account Security" description="Update your credentials.">
      <IdFormField label="Email Address" :error="errors.email" required>
        <IdInput v-model="form.email" type="email" placeholder="alex@company.com">
          <template #prefix>✉️</template>
        </IdInput>
      </IdFormField>

      <IdFormField label="Password" required>
        <IdInput v-model="form.password" type="password" placeholder="••••••••" />
      </IdFormField>
    </IdFormSection>

    <IdFormActions align="right">
      <IdButton variant="ghost" type="reset">Reset</IdButton>
      <IdButton variant="primary" type="submit">Sign In</IdButton>
    </IdFormActions>
  </IdForm>
</template>
```

---

### 2. Compound Card with Glassmorphism

```vue
<template>
  <IdCard variant="glass" padding="lg" interactive>
    <template #header>
      <IdCardTitle tag="h2">Spatial Computing UI</IdCardTitle>
      <IdCardDescription>High fidelity visual panel</IdCardDescription>
    </template>

    <p>Unified white surface with hairline dividers and smooth spring elevation shadows.</p>

    <template #footer>
      <IdButton size="sm" variant="primary">Explore →</IdButton>
    </template>
  </IdCard>
</template>
```

---

### 3. Accessible Dropdown Menu with Keyboard Navigation

```vue
<script setup>
import { IdDropdownMenu, IdButton } from '@idesign/vue'

const menuItems = [
  { label: 'Edit Profile', shortcut: '⌘E' },
  { label: 'Duplicate Item', shortcut: '⌘D' },
  { separator: true },
  { label: 'Delete Project', danger: true }
]

const handleSelect = (item) => {
  console.log('Selected item:', item)
}
</script>

<template>
  <IdDropdownMenu :items="menuItems" @select="handleSelect">
    <template #trigger>
      <IdButton variant="secondary">Actions ▾</IdButton>
    </template>
  </IdDropdownMenu>
</template>
```

---

### 4. Interactive PIN / OTP Input

```vue
<script setup>
import { ref } from 'vue'
import { IdPinInput } from '@idesign/vue'

const otp = ref('')
</script>

<template>
  <IdPinInput
    v-model="otp"
    :length="6"
    type="numeric"
    separator
    autofocus
  />
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
const formattedDate = formatDate(new Date())           // "Aug 19, 2026"
</script>
```

---

## 🧪 Testing & Verification

Run the comprehensive 94-test Vitest suite:

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
