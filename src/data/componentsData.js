export const componentCategories = [
  { id: 'all', label: 'All' },
  { id: 'templates', label: 'Templates' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'panels', label: 'Panels' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'indicators', label: 'Indicators' },
  { id: 'data', label: 'Data' },
  { id: 'layout', label: 'Layout' },
  { id: 'mobile', label: 'Mobile' }
]

export const componentsData = [
  // ─── PAGE TEMPLATES ───
  {
    id: 'hero-page',
    name: 'Hero, Headlines & CTA Page',
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    description: 'Production-grade landing page with sticky glass nav, ambient gradient glow orbs, headlines, key metrics row, and feature cards.',
    tags: ['template', 'hero', 'landing', 'headline', 'cta', 'page'],
    props: {},
    vueCode: (p) => `<script setup>
import { HeroTemplate } from '@idesign/vue'
</script>

<template>
  <HeroTemplate />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import (pages/index.vue) -->
<template>
  <HeroTemplate />
</template>`,
    htmlCode: (p) => `<section class="template-hero-page">
  <header class="glass-nav">
    <div class="nav-brand"><span>⚡</span> Idesign</div>
    <nav class="nav-links">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <button class="btn btn-primary btn-sm">Get Started</button>
    </nav>
  </header>
  <main class="hero-content">
    <span class="eyebrow-tag">DESIGN SYSTEM V2.0</span>
    <h1 class="hero-title">Spatial Computing Interfaces</h1>
    <p class="hero-desc">Production-grade liquid glass component library for Vue 3 & Nuxt 3.</p>
  </main>
</section>`
  },

  {
    id: 'product-page',
    name: 'Product Showcase & Store Page',
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    description: 'Store e-commerce page with category pill filters, image banner cards, price tags, quick view modal, and shopping bag counter.',
    tags: ['template', 'product', 'store', 'ecommerce', 'shop', 'page'],
    props: {},
    vueCode: (p) => `<script setup>
import { ProductShowcaseTemplate } from '@idesign/vue'
</script>

<template>
  <ProductShowcaseTemplate />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import (pages/store.vue) -->
<template>
  <ProductShowcaseTemplate />
</template>`,
    htmlCode: (p) => `<div class="template-product-page">
  <header class="store-header">
    <h2>Online Store</h2>
    <div class="bag-counter">Bag (2)</div>
  </header>
  <div class="product-grid">
    <article class="product-card">
      <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500" alt="Vision Studio Pro" />
      <h3>Vision Studio Pro</h3>
      <span class="price">$3,499</span>
      <button class="btn btn-primary">Buy Now</button>
    </article>
  </div>
</div>`
  },

  {
    id: 'ai-chat-page',
    name: 'AI Chat Interface',
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
    description: 'AI assistant page with variants for full page with sidebar vs standalone chat window without sidebar.',
    tags: ['template', 'ai', 'chat', 'imessage', 'assistant', 'prompt', 'page'],
    props: {
      variant: { type: 'select', options: ['full', 'standalone', 'widget'], default: 'full', description: 'Layout structure variant for AI conversation shell.' }
    },
    vueCode: (p) => `<script setup>
import { AiChatTemplate } from '@idesign/vue'
</script>

<template>
  <AiChatTemplate variant="${p.variant}" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <AiChatTemplate variant="${p.variant}" />
</template>`,
    htmlCode: (p) => `<div class="template-chat-page variant-${p.variant}">
  <aside class="chat-sidebar">
    <button class="btn-new-chat">+ New Chat</button>
  </aside>
  <main class="chat-main">
    <div class="chat-messages">
      <div class="message user">How do I integrate Idesign?</div>
      <div class="message assistant">Import components from @idesign/vue directly.</div>
    </div>
    <div class="chat-input-bar">
      <input type="text" placeholder="Ask AI Assistant..." />
      <button class="btn-send">Send</button>
    </div>
  </main>
</div>`
  },

  {
    id: 'dashboard-page',
    name: 'Analytics & Systems Dashboard',
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    description: 'System & Health dashboard with 4 KPI stat cards, interactive data table with search/selection, control panels, and team collaborators.',
    tags: ['template', 'dashboard', 'analytics', 'admin', 'table', 'kpi', 'page'],
    props: {},
    vueCode: (p) => `<script setup>
import { DashboardTemplate } from '@idesign/vue'
</script>

<template>
  <DashboardTemplate />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <DashboardTemplate />
</template>`,
    htmlCode: (p) => `<div class="template-dashboard-page">
  <div class="kpi-grid">
    <div class="stat-card">
      <span class="label">Total Revenue</span>
      <span class="value">$128,450</span>
    </div>
  </div>
  <div class="data-table-container">
    <table>
      <thead>
        <tr><th>Name</th><th>Role</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td>Jane Doe</td><td>Design Lead</td><td>Active</td></tr>
      </tbody>
    </table>
  </div>
</div>`
  },

  {
    id: 'auth-page',
    name: 'Login & Sign Up Page',
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    description: 'Liquid Glass authentication page supporting split-hero, centered-card, and minimal-glass passkey layouts.',
    tags: ['template', 'login', 'signup', 'auth', 'signin', 'register', 'page', 'passkey'],
    props: {
      variant: { type: 'select', options: ['default', 'split-hero', 'centered-card', 'minimal-glass'], default: 'default', description: 'Visual style layout variant for authentication card.' }
    },
    vueCode: (p) => `<script setup>
import { AuthTemplate } from '@idesign/vue'
</script>

<template>
  <AuthTemplate variant="${p.variant}" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <AuthTemplate variant="${p.variant}" />
</template>`,
    htmlCode: (p) => `<div class="auth-page-container variant-${p.variant}">
  <div class="auth-card">
    <div class="auth-header">
      <h2>Welcome Back</h2>
      <p>Enter your credentials to access your dashboard.</p>
    </div>
    <form class="auth-form">
      <div class="input-group">
        <label>Email Address</label>
        <input type="email" placeholder="jane@example.com" required />
      </div>
      <div class="input-group">
        <label>Password</label>
        <input type="password" placeholder="••••••••" required />
      </div>
      <button type="submit" class="btn btn-primary btn-block">Sign In →</button>
    </form>
  </div>
</div>`
  },

  {
    id: 'settings-page',
    name: 'System Preferences & Settings Page',
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    description: 'Liquid Glass system settings panel with profile management, appearance/density controls, 2FA security keys, and billing usage meters.',
    tags: ['template', 'settings', 'preferences', 'profile', 'security', 'billing', 'page'],
    props: {},
    vueCode: (p) => `<script setup>
import { SettingsTemplate } from '@idesign/vue'
<\/script>

<template>
  <SettingsTemplate />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <SettingsTemplate />
</template>`,
    htmlCode: (p) => `<div class="template-settings-page">
  <div class="settings-panel">
    <h2>System Settings</h2>
  </div>
</div>`
  },

  {
    id: 'analytics-page',
    name: 'Real-Time Telemetry & Metrics Page',
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    description: 'Real-time telemetry dashboard with interactive metric tiles, sparklines, cohort bar charts, traffic distribution, and live activity streams.',
    tags: ['template', 'analytics', 'telemetry', 'metrics', 'charts', 'sparkline', 'page'],
    props: {},
    vueCode: (p) => `<script setup>
import { AnalyticsTemplate } from '@idesign/vue'
<\/script>

<template>
  <AnalyticsTemplate />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <AnalyticsTemplate />
</template>`,
    htmlCode: (p) => `<div class="template-analytics-page">
  <div class="metrics-grid">
    <div class="metric-card">Live Telemetry</div>
  </div>
</div>`
  },

  {
    id: 'checkout-page',
    name: 'Compound Form & Checkout Page',
    category: 'templates',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=600&auto=format&fit=crop&q=80',
    description: 'Production onboarding & checkout flow demonstrating the new Compound Form System with step indicators, organization setup, payment authorization, and receipt summary.',
    tags: ['template', 'checkout', 'form', 'compound', 'onboarding', 'payment', 'stepper', 'page'],
    props: {},
    vueCode: (p) => `<script setup>
import { CheckoutTemplate } from '@idesign/vue'
<\/script>

<template>
  <CheckoutTemplate />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <CheckoutTemplate />
</template>`,
    htmlCode: (p) => `<div class="template-checkout-page">
  <div class="checkout-form">
    <h2>Enterprise Subscription</h2>
  </div>
</div>`
  },


  // ─── NAVIGATION ───
  {
    id: 'glass-nav',
    name: 'Sticky Glass Nav',
    category: 'navigation',
    description: 'Frosted header with saturation, blur, pill/solid/full-width variants, dynamic title, icon, and nav links.',
    tags: ['nav', 'header', 'glass', 'sticky', 'pill'],
    props: {
      title: { type: 'text', default: 'Idesign', description: 'Brand or page title rendered in the navbar header.' },
      variant: { type: 'select', options: ['glass', 'solid', 'pill', 'full-width'], default: 'glass', description: 'Visual surface presentation variant.' },
      icon: { type: 'text', default: '⚡', description: 'Brand icon emoji or SVG symbol displayed next to title.' }
    },
    vueCode: (p) => `<script setup>
import { IdGlassNav, IdButton } from '@idesign/vue'
</script>

<template>
  <IdGlassNav
    title="${p.title}"
    variant="${p.variant}"
    icon="${p.icon}"
    :links="[
      { label: 'Features', href: '#features' },
      { label: 'Components', href: '#components' },
      { label: 'Pricing', href: '#pricing' }
    ]"
  >
    <template #actions>
      <IdButton size="sm" variant="primary">Get Started</IdButton>
    </template>
  </IdGlassNav>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdGlassNav
    title="${p.title}"
    variant="${p.variant}"
    icon="${p.icon}"
    :links="[
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' }
    ]"
  />
</template>`,
    htmlCode: (p) => `<header class="glass-nav variant-${p.variant}">
  <div class="nav-brand">
    <span class="brand-icon">${p.icon}</span>
    <span class="brand-title">${p.title}</span>
  </div>
  <nav class="nav-links">
    <a href="#features">Features</a>
    <a href="#components">Components</a>
    <a href="#pricing">Pricing</a>
  </nav>
  <div class="nav-actions">
    <button class="btn btn-primary btn-sm">Get Started</button>
  </div>
</header>`
  },

  {
    id: 'stepper',
    name: 'Step Progress Bar (Stepper)',
    category: 'navigation',
    description: 'Step progress bar component with completed checkmarks, active indicators, step labels, and descriptions.',
    tags: ['stepper', 'steps', 'progress', 'wizard'],
    props: {
      activeStep: { type: 'number', default: 1, description: 'Zero-based index of the currently active step.' },
      orientation: { type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal', description: 'Progress bar layout orientation.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Sizing scale for step indicators and labels.' },
      variant: { type: 'select', options: ['default', 'glass'], default: 'default', description: 'Container surface background variant.' },
      color: { type: 'select', options: ['blue', 'green', 'purple', 'orange'], default: 'blue', description: 'Active step accent theme color.' },
      clickable: { type: 'boolean', default: true, description: 'Allows clicking steps directly to change active step.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdStepper } from '@idesign/vue'

const currentStep = ref(${p.activeStep})
const steps = [
  { label: 'Account', description: 'Create credentials' },
  { label: 'Security', description: 'Set up 2FA' },
  { label: 'Confirm', description: 'Review details' }
]
</script>

<template>
  <IdStepper
    v-model="currentStep"
    orientation="${p.orientation || 'horizontal'}"
    size="${p.size}"
    variant="${p.variant}"
    color="${p.color}"
    :clickable="${p.clickable}"
    :steps="steps"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdStepper
    v-model="activeStep"
    size="${p.size}"
    variant="${p.variant}"
    color="${p.color}"
    :clickable="${p.clickable}"
    :steps="steps"
  />
</template>`,
    htmlCode: (p) => `<div class="id-stepper size-${p.size} variant-${p.variant} color-${p.color}">
  <ol class="stepper-list">
    <li class="step-item is-completed">
      <span class="step-badge">✓</span>
      <div class="step-meta"><span class="label">Account</span></div>
    </li>
    <li class="step-item is-active">
      <span class="step-badge">2</span>
      <div class="step-meta"><span class="label">Security</span></div>
    </li>
    <li class="step-item">
      <span class="step-badge">3</span>
      <div class="step-meta"><span class="label">Confirm</span></div>
    </li>
  </ol>
</div>`
  },

  {
    id: 'segmented-control',
    name: 'Segmented Pill Control',
    category: 'navigation',
    description: 'Grey track pill with white/black active modes and dynamic active prop state.',
    tags: ['segmented', 'pill', 'filter', 'active'],
    props: {
      active: { type: 'select', options: ['Overview', 'Components', 'Tokens'], default: 'Overview', description: 'Currently active tab label.' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Padding and text scale.' },
      theme: { type: 'select', options: ['white', 'black'], default: 'white', description: 'Active pill background theme color.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdSegmentedControl } from '@idesign/vue'

const currentSegment = ref('${p.active}')
const options = ['Overview', 'Components', 'Tokens']
</script>

<template>
  <IdSegmentedControl
    v-model="currentSegment"
    size="${p.size}"
    theme="${p.theme}"
    :options="options"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSegmentedControl
    v-model="selected"
    size="${p.size}"
    theme="${p.theme}"
    :options="['Overview', 'Components', 'Tokens']"
  />
</template>`,
    htmlCode: (p) => `<div class="segmented-control size-${p.size} theme-${p.theme}">
  <button class="seg-item ${p.active === 'Overview' ? 'is-active' : ''}">Overview</button>
  <button class="seg-item ${p.active === 'Components' ? 'is-active' : ''}">Components</button>
  <button class="seg-item ${p.active === 'Tokens' ? 'is-active' : ''}">Tokens</button>
</div>`
  },

  {
    id: 'mobile-navbar',
    name: 'Mobile Navbar',
    category: 'navigation',
    categories: ['navigation', 'mobile'],
    description: 'Large pill mobile navigation bar with vertically stacked icons and labels, subtle selected pill background, 44px+ touch targets, and notification badges.',
    tags: ['mobile', 'navbar', 'navigation', 'pill', 'bottombar', 'tabbar', 'badge', 'bar', 'segmented', 'app'],
    props: {
      active: { type: 'select', options: ['home', 'explore', 'notifications', 'profile'], default: 'home', description: 'Currently active navigation item ID.' },
      variant: { type: 'select', options: ['glass', 'liquid', 'floating', 'solid', 'bordered', 'flat', 'minimal'], default: 'glass', description: 'Container surface treatment (liquid glass glow, frosted glass, floating elevated, solid, bordered, flat track, minimal).' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Container dimensions and label scale.' },
      color: { type: 'select', options: ['blue', 'purple', 'green', 'orange', 'red', 'black'], default: 'blue', description: 'Active item highlight color.' },
      position: { type: 'select', options: ['static', 'fixed', 'sticky'], default: 'static', description: 'Positioning strategy.' },
      safeArea: { type: 'boolean', default: true, description: 'Respect mobile safe-area bottom padding.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdMobileNavbar } from '@idesign/vue'
import { Home, Compass, Bell, User } from 'lucide-vue-next'

const currentTab = ref('${p.active}')

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'notifications', label: 'Alerts', icon: Bell, badge: 3 },
  { id: 'profile', label: 'Profile', icon: User }
]
</script>

<template>
  <IdMobileNavbar
    v-model="currentTab"
    variant="${p.variant}"
    size="${p.size}"
    color="${p.color}"
    position="${p.position}"
    :safe-area="${p.safeArea}"
    :items="navItems"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<script setup>
const currentTab = ref('${p.active}')

const navItems = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'explore', label: 'Explore', icon: 'Compass' },
  { id: 'notifications', label: 'Alerts', icon: 'Bell', badge: 3 },
  { id: 'profile', label: 'Profile', icon: 'User' }
]
</script>

<template>
  <IdMobileNavbar
    v-model="currentTab"
    variant="${p.variant}"
    size="${p.size}"
    color="${p.color}"
    position="${p.position}"
    :safe-area="${p.safeArea}"
    :items="navItems"
  />
</template>`,
    htmlCode: (p) => `<nav class="id-mobile-navbar-wrapper position-${p.position}">
  <div class="id-mobile-navbar size-${p.size} variant-${p.variant} color-${p.color}" role="tablist">
    <button class="id-navbar-item ${p.active === 'home' ? 'is-active' : ''}" role="tab">
      <span class="id-navbar-icon-box">🏠</span>
      <span class="id-navbar-label">Home</span>
    </button>
    <button class="id-navbar-item ${p.active === 'explore' ? 'is-active' : ''}" role="tab">
      <span class="id-navbar-icon-box">🧭</span>
      <span class="id-navbar-label">Explore</span>
    </button>
    <button class="id-navbar-item ${p.active === 'notifications' ? 'is-active' : ''}" role="tab">
      <span class="id-navbar-icon-box">🔔<span class="id-navbar-badge">3</span></span>
      <span class="id-navbar-label">Alerts</span>
    </button>
    <button class="id-navbar-item ${p.active === 'profile' ? 'is-active' : ''}" role="tab">
      <span class="id-navbar-icon-box">👤</span>
      <span class="id-navbar-label">Profile</span>
    </button>
  </div>
</nav>`
  },

  {
    id: 'tabs',
    name: 'Tab Navigation',
    category: 'navigation',
    description: 'Tab list with animated sliding indicator bar and ARIA tab roles.',
    tags: ['tabs', 'navigation', 'indicator'],
    props: {
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Tab text and padding size.' },
      variant: { type: 'select', options: ['default', 'pill', 'glass'], default: 'default', description: 'Tab container layout style.' },
      color: { type: 'select', options: ['blue', 'green', 'purple'], default: 'blue', description: 'Active bar accent color.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdTabs } from '@idesign/vue'

const activeTab = ref('overview')
const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'code', label: 'Code Snippets' },
  { value: 'api', label: 'API Reference' }
]
</script>

<template>
  <IdTabs
    v-model="activeTab"
    size="${p.size}"
    variant="${p.variant}"
    color="${p.color}"
    :tabs="tabs"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTabs
    v-model="activeTab"
    size="${p.size}"
    variant="${p.variant}"
    color="${p.color}"
    :tabs="tabs"
  />
</template>`,
    htmlCode: (p) => `<div role="tablist" class="id-tabs size-${p.size} variant-${p.variant} color-${p.color}">
  <button role="tab" aria-selected="true" class="tab-item active">Overview</button>
  <button role="tab" aria-selected="false" class="tab-item">Code Snippets</button>
  <button role="tab" aria-selected="false" class="tab-item">API Reference</button>
  <div class="active-indicator-bar"></div>
</div>`
  },

  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    category: 'navigation',
    description: 'ARIA breadcrumb trail with intelligent responsive mobile collapsing (Home / … / Product), interactive middle hierarchy popover, with-icons, and liquid glass variants.',
    tags: ['breadcrumbs', 'navigation', 'path', 'icon', 'collapsing', 'mobile', 'responsive', 'ellipsis'],
    props: {
      variant: { type: 'select', options: ['default', 'with-icons', 'glass', 'subtle'], default: 'default', description: 'Breadcrumb visual presentation style.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Text and icon sizing.' },
      color: { type: 'select', options: ['blue', 'purple', 'green', 'gray'], default: 'blue', description: 'Active item accent color.' },
      maxItems: { type: 'number', default: 0, description: 'Maximum visible items before collapsing middle trail (0 = auto mobile collapsing).' },
      collapseOnMobile: { type: 'boolean', default: true, description: 'Automatically collapse long trails on mobile screens.' },
      itemsBeforeCollapse: { type: 'number', default: 1, description: 'Number of root items preserved before the ellipsis.' },
      itemsAfterCollapse: { type: 'number', default: 1, description: 'Number of trail items preserved at the end.' }
    },
    vueCode: (p) => `<script setup>
import { IdBreadcrumbs } from '@idesign/vue'

const items = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Products', href: '/products', icon: 'Folder' },
  { label: 'Electronics', href: '/products/electronics', icon: 'Folder' },
  { label: 'Computers', href: '/products/electronics/computers', icon: 'Folder' },
  { label: 'MacBook Pro', icon: 'FileText' }
]
</script>

<template>
  <IdBreadcrumbs
    variant="${p.variant || 'default'}"
    size="${p.size || 'md'}"
    color="${p.color || 'blue'}"
    :items="items"
    ${p.maxItems ? `:max-items="${p.maxItems}"\n    ` : ''}:collapse-on-mobile="${p.collapseOnMobile !== false}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdBreadcrumbs
    variant="${p.variant || 'default'}"
    size="${p.size || 'md'}"
    :items="items"
    collapse-on-mobile
  />
</template>`,
    htmlCode: (p) => `<nav aria-label="Breadcrumb" class="id-breadcrumbs variant-${p.variant || 'default'} size-${p.size || 'md'} color-${p.color || 'blue'}">
  <ol class="crumbs-list">
    <li class="crumb-item"><a href="/" class="crumb-link">Home</a><span class="crumb-sep">›</span></li>
    <li class="crumb-item crumb-collapsed-item"><button class="crumb-ellipsis-btn" aria-label="Show hidden breadcrumb levels">…</button><span class="crumb-sep">›</span></li>
    <li class="crumb-item"><span class="crumb-current" aria-current="page">MacBook Pro</span></li>
  </ol>
</nav>`
  },

  {
    id: 'pagination',
    name: 'Pagination',
    category: 'navigation',
    description: 'Page navigation with ellipsis, prev/next arrows, and tabular-nums.',
    tags: ['pagination', 'pages', 'navigation'],
    props: {
      totalPages: { type: 'number', default: 12, description: 'Total number of pages.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Button size scale.' },
      variant: { type: 'select', options: ['default', 'pill', 'glass'], default: 'default', description: 'Page button shape variant.' },
      color: { type: 'select', options: ['blue', 'green', 'purple'], default: 'blue', description: 'Active page accent color.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdPagination } from '@idesign/vue'

const currentPage = ref(1)
</script>

<template>
  <IdPagination
    v-model="currentPage"
    :total-pages="${p.totalPages || 12}"
    size="${p.size}"
    variant="${p.variant}"
    color="${p.color}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdPagination
    v-model="currentPage"
    :total-pages="${p.totalPages || 12}"
    size="${p.size}"
    variant="${p.variant}"
    color="${p.color}"
  />
</template>`,
    htmlCode: (p) => `<nav aria-label="Pagination" class="id-pagination size-${p.size} variant-${p.variant} color-${p.color}">
  <button class="page-btn prev" aria-label="Previous Page">‹</button>
  <button class="page-btn is-active">1</button>
  <button class="page-btn">2</button>
  <button class="page-btn">3</button>
  <span class="ellipsis">…</span>
  <button class="page-btn">${p.totalPages || 12}</button>
  <button class="page-btn next" aria-label="Next Page">›</button>
</nav>`
  },

  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'navigation',
    description: 'Context/action menu with keyboard nav, shortcuts, and separators.',
    tags: ['dropdown', 'menu', 'context'],
    props: {
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Menu padding and font size scale.' },
      variant: { type: 'select', options: ['default', 'glass'], default: 'default', description: 'Frosted glass or default surface backdrop.' }
    },
    vueCode: (p) => `<script setup>
import { IdDropdownMenu, IdButton } from '@idesign/vue'

const items = [
  { label: 'Edit Project', shortcut: '⌘E' },
  { label: 'Duplicate', shortcut: '⌘D' },
  { separator: true },
  { label: 'Delete', danger: true, shortcut: '⌘⌫' }
]
</script>

<template>
  <IdDropdownMenu size="${p.size}" variant="${p.variant}" :items="items">
    <template #trigger>
      <IdButton variant="secondary">Actions ▾</IdButton>
    </template>
  </IdDropdownMenu>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdDropdownMenu size="${p.size}" variant="${p.variant}" :items="items">
    <template #trigger>
      <IdButton variant="secondary">Actions ▾</IdButton>
    </template>
  </IdDropdownMenu>
</template>`,
    htmlCode: (p) => `<div class="id-dropdown-wrapper">
  <button class="btn btn-secondary">Actions ▾</button>
  <div class="dropdown-menu size-${p.size} variant-${p.variant}" role="menu">
    <div class="menu-item" role="menuitem"><span>Edit Project</span><kbd>⌘E</kbd></div>
    <div class="menu-item" role="menuitem"><span>Duplicate</span><kbd>⌘D</kbd></div>
    <div class="menu-divider"></div>
    <div class="menu-item is-danger" role="menuitem"><span>Delete</span><kbd>⌘⌫</kbd></div>
  </div>
</div>`
  },

  {
    id: 'dock',
    name: 'macOS Floating Dock',
    category: 'navigation',
    description: 'macOS-style Liquid Glass floating navigation dock with smooth cursor magnification physics, tooltips, notification badges, active running dots, and full keyboard navigation.',
    tags: ['dock', 'macos', 'navbar', 'glass', 'floating', 'navigation', 'magnification'],
    props: {
      variant: { type: 'select', options: ['glass', 'solid', 'translucent', 'tinted'], default: 'glass', description: 'Visual surface styling.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Overall size and icon scale.' },
      position: { type: 'select', options: ['bottom', 'top', 'left', 'right', 'none'], default: 'bottom', description: 'Fixed placement or relative embedding.' },
      alignment: { type: 'select', options: ['start', 'center', 'end'], default: 'center', description: 'Dock alignment along its axis.' },
      direction: { type: 'select', options: ['auto', 'horizontal', 'vertical'], default: 'auto', description: 'Dock layout orientation.' },
      magnification: { type: 'boolean', default: true, description: 'Smooth Gaussian/cosine hover magnification physics.' },
      tooltip: { type: 'boolean', default: true, description: 'Display floating spring tooltip on hover/focus.' },
      color: { type: 'select', options: ['blue', 'green', 'purple', 'orange', 'red'], default: 'blue', description: 'Accent color for active states.' },
      disabled: { type: 'boolean', default: false, description: 'Disable entire dock interaction.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdDock } from '@idesign/vue'

const activeApp = ref('finder')

const items = [
  { id: 'finder', label: 'Finder', icon: '📁', iconBg: '#007aff' },
  { id: 'safari', label: 'Safari', icon: '🌐', iconBg: '#34c759', badge: 3 },
  { id: 'messages', label: 'Messages', icon: '💬', iconBg: '#30d158', badge: 'NEW' },
  { id: 'notes', label: 'Notes', icon: '📝', iconBg: '#ff9500' },
  { separator: true },
  { id: 'settings', label: 'Settings', icon: '⚙️', iconBg: '#8e8e93' }
]
</script>

<template>
  <IdDock
    v-model:activeId="activeApp"
    :items="items"
    variant="${p.variant || 'glass'}"
    size="${p.size || 'md'}"
    position="${p.position || 'bottom'}"
    alignment="${p.alignment || 'center'}"
    direction="${p.direction || 'auto'}"
    :magnification="${p.magnification ?? true}"
    :tooltip="${p.tooltip ?? true}"
    color="${p.color || 'blue'}"
    ${p.disabled ? ':disabled="true"' : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<script setup>
const activeApp = ref('finder')

const items = [
  { id: 'finder', label: 'Finder', icon: '📁', iconBg: '#007aff' },
  { id: 'safari', label: 'Safari', icon: '🌐', iconBg: '#34c759', badge: 3 },
  { separator: true },
  { id: 'settings', label: 'Settings', icon: '⚙️', iconBg: '#8e8e93' }
]
</script>

<template>
  <IdDock
    v-model:activeId="activeApp"
    :items="items"
    variant="${p.variant || 'glass'}"
    size="${p.size || 'md'}"
    position="${p.position || 'bottom'}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-dock-wrap position-${p.position || 'bottom'} dir-${p.direction || 'horizontal'} size-${p.size || 'md'} variant-${p.variant || 'glass'}" role="toolbar" aria-label="macOS Dock">
  <div class="dock-container">
    <div class="dock-list">
      <div class="dock-item-wrapper">
        <button class="dock-item is-active" aria-label="Finder">
          <div class="dock-tooltip">Finder</div>
          <div class="icon-squircle" style="background:#007aff; color:#fff;">📁</div>
          <span class="dock-dot"></span>
        </button>
      </div>
      <div class="dock-item-wrapper">
        <button class="dock-item" aria-label="Safari">
          <div class="dock-tooltip">Safari</div>
          <div class="icon-squircle" style="background:#34c759; color:#fff;">
            🌐
            <span class="dock-badge">3</span>
          </div>
        </button>
      </div>
      <div class="dock-item-wrapper is-separator">
        <div class="dock-separator" role="separator"></div>
      </div>
      <div class="dock-item-wrapper">
        <button class="dock-item" aria-label="Settings">
          <div class="dock-tooltip">Settings</div>
          <div class="icon-squircle" style="background:#8e8e93; color:#fff;">⚙️</div>
        </button>
      </div>
    </div>
  </div>
</div>`
  },

  // ─── BUTTONS ───
  {
    id: 'liquid-button',
    name: 'Liquid Pill Buttons',
    category: 'buttons',
    description: 'Pill-shaped buttons with ≥44px touch targets, left/right Lucide icon support, color selection, disabled state, loading spinner, and 7 variants including outline.',
    tags: ['button', 'pill', 'primary', 'secondary', 'outline', 'color', 'icon', 'disabled'],
    props: {
      label: { type: 'text', default: 'Continue', description: 'Button text content.' },
      variant: { type: 'select', options: ['primary', 'secondary', 'outline', 'glass', 'dark', 'ghost', 'danger'], default: 'primary', description: 'Visual style variant.' },
      color: { type: 'select', options: ['blue', 'green', 'purple', 'orange', 'red', 'black'], default: 'blue', description: 'Accent background or outline color theme.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Size scale (sm: 34px, md: 42px, lg: 48px height).' },
      iconLeft: { type: 'text', default: '⚡', description: 'Left icon component name or emoji.' },
      iconRight: { type: 'text', default: '→', description: 'Right icon component name or emoji.' },
      disabled: { type: 'boolean', default: false, description: 'Disables user interactions and applies muted styling.' },
      loading: { type: 'boolean', default: false, description: 'Replaces icon/text with animated loading spinner.' },
      block: { type: 'boolean', default: false, description: 'Expands button to fill 100% of parent width.' }
    },
    vueCode: (p) => `<script setup>
import { IdButton } from '@idesign/vue'
</script>

<template>
  <IdButton
    variant="${p.variant}"
    color="${p.color}"
    size="${p.size}"
    ${p.iconLeft ? `icon-left="${p.iconLeft}"` : ''}
    ${p.iconRight ? `icon-right="${p.iconRight}"` : ''}
    ${p.disabled ? 'disabled' : ''}
    ${p.loading ? 'loading' : ''}
    ${p.block ? 'block' : ''}
  >
    ${p.label}
  </IdButton>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdButton
    variant="${p.variant}"
    color="${p.color}"
    size="${p.size}"
    ${p.iconLeft ? `icon-left="${p.iconLeft}"` : ''}
    ${p.iconRight ? `icon-right="${p.iconRight}"` : ''}
  >
    ${p.label}
  </IdButton>
</template>`,
    htmlCode: (p) => `<button type="button" class="id-btn btn-${p.variant} color-${p.color} size-${p.size} ${p.block ? 'is-block' : ''}" ${p.disabled ? 'disabled' : ''}>
  ${p.iconLeft ? `<span class="icon-left">${p.iconLeft}</span>` : ''}
  <span class="btn-label">${p.label}</span>
  ${p.iconRight ? `<span class="icon-right">${p.iconRight}</span>` : ''}
</button>`
  },

  // ─── PANELS & CARDS ───
  {
    id: 'unified-panel',
    name: 'Unified Panel List',
    category: 'panels',
    description: 'Anti-fragmentation pattern — one surface, no-dividers, glass, inset variants, Lucide icons.',
    tags: ['panel', 'list', 'rows', 'glass', 'inset'],
    props: {
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Row padding and text size.' },
      variant: { type: 'select', options: ['default', 'no-dividers', 'glass', 'inset'], default: 'default', description: 'Panel surface and border styling variant.' },
      noDividers: { type: 'boolean', default: false, description: 'Hides item row divider hairline borders.' }
    },
    vueCode: (p) => `<script setup>
import { IdPanel, IdPanelRow } from '@idesign/vue'
</script>

<template>
  <IdPanel size="${p.size}" variant="${p.variant}" ${p.noDividers ? 'no-dividers' : ''}>
    <IdPanelRow title="Wi-Fi" icon="Wifi" iconBg="#007aff" detail="Home Network" />
    <IdPanelRow title="Bluetooth" icon="Bluetooth" iconBg="#34c759" detail="On" />
    <IdPanelRow title="Notifications" icon="Bell" iconBg="#ff9500" detail="Enabled" />
  </IdPanel>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdPanel size="${p.size}" variant="${p.variant}">
    <IdPanelRow title="Wi-Fi" icon="Wifi" iconBg="#007aff" detail="Home Network" />
    <IdPanelRow title="Bluetooth" icon="Bluetooth" iconBg="#34c759" detail="On" />
  </IdPanel>
</template>`,
    htmlCode: (p) => `<div class="id-panel size-${p.size} variant-${p.variant}">
  <div class="panel-row">
    <div class="row-left"><span class="icon-sq" style="background:#007aff;">📶</span> <span class="row-title">Wi-Fi</span></div>
    <span class="row-detail">Home Network ›</span>
  </div>
  <div class="panel-row">
    <div class="row-left"><span class="icon-sq" style="background:#34c759;">⚡</span> <span class="row-title">Bluetooth</span></div>
    <span class="row-detail">On ›</span>
  </div>
</div>`
  },

  {
    id: 'hero-cta',
    name: 'Liquid Glass Hero CTA',
    category: 'panels',
    description: 'Gradient & glass CTA with ambient blur orbs behind frosted glass buttons.',
    tags: ['hero', 'cta', 'gradient', 'glass'],
    props: {
      title: { type: 'text', default: 'Build Production-Grade Apps', description: 'Hero section primary title.' },
      description: { type: 'text', default: 'Clean, unified surfaces with frosted glass used only where layers overlap.', description: 'Body description text.' },
      eyebrow: { type: 'text', default: 'DESIGN SYSTEM V2.0', description: 'Small uppercase tagline pill text.' },
      actionLabel: { type: 'text', default: 'Get Started', description: 'Primary action button label.' },
      variant: { type: 'select', options: ['glass', 'gradient'], default: 'glass', description: 'Hero background presentation style.' }
    },
    vueCode: (p) => `<script setup>
import { IdHeroCta, IdButton } from '@idesign/vue'
</script>

<template>
  <IdHeroCta
    title="${p.title}"
    description="${p.description}"
    eyebrow="${p.eyebrow}"
    action-label="${p.actionLabel}"
    variant="${p.variant}"
  >
    <template #actions>
      <IdButton variant="glass">Explore Documentation</IdButton>
    </template>
  </IdHeroCta>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdHeroCta
    title="${p.title}"
    description="${p.description}"
    eyebrow="${p.eyebrow}"
    action-label="${p.actionLabel}"
    variant="${p.variant}"
  />
</template>`,
    htmlCode: (p) => `<section class="id-hero-cta variant-${p.variant}">
  <div class="hero-orb orb-1"></div>
  <div class="hero-orb orb-2"></div>
  <div class="hero-inner">
    <span class="eyebrow">${p.eyebrow}</span>
    <h2 class="title">${p.title}</h2>
    <p class="desc">${p.description}</p>
    <div class="cta-actions">
      <button class="btn btn-primary">${p.actionLabel}</button>
      <button class="btn btn-glass">Explore</button>
    </div>
  </div>
</section>`
  },

  {
    id: 'accordion',
    name: 'Accordion',
    category: 'panels',
    description: 'Collapsible content panels supporting default, separated, and glass card variants.',
    tags: ['accordion', 'collapse', 'expand', 'separated', 'cards', 'glass'],
    props: {
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Item padding and header size.' },
      variant: { type: 'select', options: ['default', 'separated', 'glass'], default: 'default', description: 'Item container separation variant.' }
    },
    vueCode: (p) => `<script setup>
import { IdAccordion } from '@idesign/vue'

const items = [
  { title: 'What is Idesign?', content: 'A production-grade Vue 3 & Nuxt 3 component library.' },
  { title: 'Is it production ready?', content: 'Yes, fully tested with ESM and UMD bundles.' }
]
</script>

<template>
  <IdAccordion size="${p.size}" variant="${p.variant}" :items="items" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdAccordion size="${p.size}" variant="${p.variant}" :items="items" />
</template>`,
    htmlCode: (p) => `<div class="id-accordion size-${p.size} variant-${p.variant}">
  <div class="accordion-item is-expanded">
    <button class="accordion-header"><span>What is Idesign?</span><span class="chevron">▲</span></button>
    <div class="accordion-body"><p>A production-grade Vue 3 component library.</p></div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header"><span>Is it free?</span><span class="chevron">▼</span></button>
  </div>
</div>`
  },

  {
    id: 'card',
    name: 'Card (IdCard)',
    category: 'panels',
    description: 'Unified surface container supporting default text, action buttons, glass, hero, top image banner, and full background image variants.',
    tags: ['card', 'image', 'banner', 'media', 'container'],
    props: {
      title: { type: 'text', default: 'Vision Studio Pro', description: 'Card primary title.' },
      subtitle: { type: 'text', default: 'Spatial Computing UI', description: 'Subtitle metadata label.' },
      description: { type: 'text', default: 'Welcome to the era of spatial computing.', description: 'Body text content.' },
      tag: { type: 'text', default: 'FEATURED', description: 'Header tag pill text.' },
      variant: { type: 'select', options: ['default', 'framed', 'glass', 'hero', 'image-top', 'image-bg'], default: 'default', description: 'Card visual container style.' },
      image: { type: 'text', default: '', description: 'Optional header banner image URL.' },
      showActions: { type: 'boolean', default: true, description: 'Controls rendering of footer action buttons slot.' },
      padding: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Card internal padding size.' },
      interactive: { type: 'boolean', default: false, description: 'Enables hover elevation physics animation.' }
    },
    vueCode: (p) => `<script setup>
import { IdCard, IdButton } from '@idesign/vue'
</script>

<template>
  <IdCard
    title="${p.title}"
    subtitle="${p.subtitle}"
    description="${p.description}"
    variant="${p.variant}"
    padding="${p.padding}"
    ${p.tag ? `tag="${p.tag}"` : ''}
    ${p.image ? `image="${p.image}"` : ''}
    ${p.interactive ? 'interactive' : ''}
  >
    ${p.showActions ? `<template #actions>
      <IdButton size="sm" variant="secondary">Details</IdButton>
      <IdButton size="sm" variant="primary">Action</IdButton>
    </template>` : ''}
  </IdCard>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdCard
    title="${p.title}"
    subtitle="${p.subtitle}"
    variant="${p.variant}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-card variant-${p.variant} padding-${p.padding} ${p.interactive ? 'is-interactive' : ''}">
  <div class="card-header">
    <span class="card-tag">${p.tag || 'FEATURED'}</span>
    <h3 class="card-title">${p.title}</h3>
    <span class="card-subtitle">${p.subtitle}</span>
  </div>
  <p class="card-body">${p.description}</p>
  <div class="card-actions">
    <button class="btn btn-secondary btn-sm">Details</button>
    <button class="btn btn-primary btn-sm">Action</button>
  </div>
</div>`
  },

  // ─── FORM INPUTS ───
  {
    id: 'input',
    name: 'Text Input',
    category: 'inputs',
    description: 'Quiet text input with search variant, password masking with eye toggle, clearable button, trailing text, and status rings.',
    tags: ['input', 'text', 'password', 'masked', 'form', 'search'],
    props: {
      placeholder: { type: 'text', default: 'Enter text...', description: 'Input placeholder guidance text.' },
      label: { type: 'text', default: 'Label', description: 'Top label text.' },
      variant: { type: 'select', options: ['default', 'search', 'error', 'success'], default: 'default', description: 'Input status or search variant.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Input height scale.' },
      masked: { type: 'boolean', default: false, description: 'Masks input content as a password with an eye reveal toggle.' },
      clearable: { type: 'boolean', default: true, description: 'Displays an (x) clear button when text is present.' },
      trailingText: { type: 'text', default: '', description: 'Trailing text unit badge (e.g. "USD").' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdInput } from '@idesign/vue'

const textValue = ref('')
</script>

<template>
  <IdInput
    v-model="textValue"
    label="${p.label}"
    placeholder="${p.placeholder}"
    variant="${p.variant}"
    size="${p.size}"
    ${p.masked ? 'masked' : ''}
    ${p.clearable ? 'clearable' : ''}
    ${p.trailingText ? `trailing-text="${p.trailingText}"` : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdInput
    v-model="textValue"
    label="${p.label}"
    placeholder="${p.placeholder}"
    variant="${p.variant}"
    size="${p.size}"
    ${p.masked ? 'masked' : ''}
  />
</template>`,
    htmlCode: (p) => `<div class="id-input-group size-${p.size} variant-${p.variant}">
  <label class="input-label">${p.label}</label>
  <div class="input-wrapper">
    <input type="${p.masked ? 'password' : 'text'}" class="id-input" placeholder="${p.placeholder}" />
    ${p.masked ? '<button class="mask-toggle-btn" aria-label="Toggle password">👁️</button>' : ''}
    ${p.clearable && !p.masked ? '<button class="clear-btn" aria-label="Clear input">✕</button>' : ''}
  </div>
</div>`
  },

  {
    id: 'textarea',
    name: 'Textarea',
    category: 'inputs',
    description: 'Multiline text input with size, glass variant, and optional character counter.',
    tags: ['textarea', 'form', 'multiline', 'glass'],
    props: {
      label: { type: 'text', default: 'Description', description: 'Header label text.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Textarea padding and font scale.' },
      variant: { type: 'select', options: ['default', 'glass', 'error'], default: 'default', description: 'Surface glass or error border style.' },
      maxlength: { type: 'number', default: 200, description: 'Maximum allowed characters.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdTextarea } from '@idesign/vue'

const message = ref('')
</script>

<template>
  <IdTextarea
    v-model="message"
    label="${p.label}"
    size="${p.size}"
    variant="${p.variant}"
    :maxlength="${p.maxlength}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTextarea
    v-model="message"
    label="${p.label}"
    size="${p.size}"
    variant="${p.variant}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-textarea-group size-${p.size} variant-${p.variant}">
  <label class="textarea-label">${p.label}</label>
  <textarea class="id-textarea" maxlength="${p.maxlength}" placeholder="Type message..."></textarea>
  <span class="char-count">0 / ${p.maxlength}</span>
</div>`
  },

  {
    id: 'select',
    name: 'Select Dropdown',
    category: 'inputs',
    description: 'Custom dropdown with real-time search filter, keyboard navigation, clearable value, ARIA combobox role, and Liquid Glass variants.',
    tags: ['select', 'dropdown', 'searchable', 'filter', 'combobox', 'form', 'no-divider', 'glass'],
    props: {
      label: { type: 'text', default: 'Framework', description: 'Label text above dropdown trigger.' },
      searchable: { type: 'boolean', default: true, description: 'Enables real-time search filter input inside dropdown.' },
      clearable: { type: 'boolean', default: true, description: 'Shows clear icon button when value is selected.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Height and font size scale.' },
      variant: { type: 'select', options: ['default', 'no-divider', 'glass'], default: 'default', description: 'Dropdown item divider visual style.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdSelect } from '@idesign/vue'

const selected = ref('Vue 3')
const options = ['Vue 3', 'Nuxt 3', 'React', 'Svelte', 'Solid', 'Astro', 'Angular']
</script>

<template>
  <IdSelect
    v-model="selected"
    label="${p.label}"
    size="${p.size}"
    variant="${p.variant}"
    :searchable="${p.searchable}"
    :clearable="${p.clearable}"
    :options="options"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSelect
    v-model="selected"
    label="${p.label}"
    size="${p.size}"
    variant="${p.variant}"
    :searchable="${p.searchable}"
    :clearable="${p.clearable}"
    :options="['Vue 3', 'Nuxt 3', 'React', 'Svelte', 'Solid', 'Astro']"
  />
</template>`,
    htmlCode: (p) => `<div class="id-select-group size-${p.size} variant-${p.variant}">
  <label class="select-label">${p.label}</label>
  <div class="select-wrapper" role="combobox" aria-expanded="false">
    <span class="select-value">Vue 3</span>
    <span class="chevron">▾</span>
  </div>
</div>`
  },

  {
    id: 'tour',
    name: 'Product Tour Guide',
    category: 'overlays',
    description: 'Step-by-step product onboarding tour guide modal card supporting step-level custom badges, images, icons, and action button labels per step.',
    tags: ['tour', 'onboarding', 'walkthrough', 'guide', 'steps', 'modal'],
    props: {
      nextLabel: { type: 'text', default: 'Continue →', description: 'Default next step button text.' },
      finishLabel: { type: 'text', default: 'Get Started ✨', description: 'Final step primary action button text.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdTour, IdButton } from '@idesign/vue'

const tourOpen = ref(false)
const steps = [
  { title: 'Welcome to Idesign', description: 'Explore our Liquid Glass design system.', badge: 'STEP 1 OF 3', icon: '⚡' },
  { title: 'Interactive Sandbox', description: 'Customize properties dynamically.', badge: 'STEP 2 OF 3', icon: '🎛️' },
  { title: 'Production Ready', description: 'Export clean ESM/UMD code snippets.', badge: 'STEP 3 OF 3', icon: '🚀' }
]
</script>

<template>
  <IdButton @click="tourOpen = true">Start Product Tour ✨</IdButton>
  <IdTour v-model="tourOpen" :steps="steps" next-label="${p.nextLabel}" finish-label="${p.finishLabel}" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdButton @click="tourOpen = true">Start Product Tour ✨</IdButton>
  <IdTour v-model="tourOpen" :steps="steps" next-label="${p.nextLabel}" finish-label="${p.finishLabel}" />
</template>`,
    htmlCode: (p) => `<div class="id-tour-overlay">
  <div class="tour-backdrop"></div>
  <div class="tour-card" role="dialog">
    <div class="tour-header">
      <span class="tour-step-pill">STEP 1 OF 3</span>
      <button class="tour-close-btn">✕</button>
    </div>
    <div class="tour-body">
      <h3>Welcome to Idesign</h3>
      <p>Explore our Liquid Glass design system.</p>
    </div>
    <div class="tour-footer">
      <button class="btn btn-primary">${p.nextLabel}</button>
    </div>
  </div>
</div>`
  },

  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'inputs',
    description: 'Checkbox with size, label, and system color palette selection.',
    tags: ['checkbox', 'form', 'boolean', 'color'],
    props: {
      label: { type: 'text', default: 'Accept terms', description: 'Label text next to checkbox.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Checkbox indicator size scale.' },
      color: { type: 'select', options: ['blue', 'green', 'purple', 'orange', 'red'], default: 'blue', description: 'Checked accent background color.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdCheckbox } from '@idesign/vue'

const agreed = ref(true)
</script>

<template>
  <IdCheckbox
    v-model="agreed"
    label="${p.label}"
    size="${p.size}"
    color="${p.color}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdCheckbox
    v-model="agreed"
    label="${p.label}"
    size="${p.size}"
    color="${p.color}"
  />
</template>`,
    htmlCode: (p) => `<label class="id-checkbox size-${p.size} color-${p.color}">
  <input type="checkbox" checked />
  <span class="checkbox-box">✓</span>
  <span class="checkbox-label">${p.label}</span>
</label>`
  },

  {
    id: 'radio-group',
    name: 'Radio Group',
    category: 'inputs',
    description: 'Radio button group with vertical/horizontal layout.',
    tags: ['radio', 'form', 'group'],
    props: {
      direction: { type: 'select', options: ['vertical', 'horizontal'], default: 'vertical', description: 'Layout arrangement direction.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdRadioGroup } from '@idesign/vue'

const plan = ref('Pro')
const options = ['Free', 'Pro', 'Enterprise']
</script>

<template>
  <IdRadioGroup
    v-model="plan"
    label="Select Plan"
    direction="${p.direction}"
    :options="options"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdRadioGroup
    v-model="plan"
    label="Plan"
    direction="${p.direction}"
    :options="['Free', 'Pro', 'Enterprise']"
  />
</template>`,
    htmlCode: (p) => `<div class="id-radio-group direction-${p.direction}" role="radiogroup">
  <label class="radio-item"><input type="radio" name="plan" value="Free" /> <span>Free</span></label>
  <label class="radio-item"><input type="radio" name="plan" value="Pro" checked /> <span>Pro</span></label>
</div>`
  },

  {
    id: 'slider',
    name: 'Range Slider',
    category: 'inputs',
    description: 'Slider with accent fill track and ARIA range attributes.',
    tags: ['slider', 'range', 'form'],
    props: {
      min: { type: 'number', default: 0, description: 'Minimum range value.' },
      max: { type: 'number', default: 100, description: 'Maximum range value.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdSlider } from '@idesign/vue'

const val = ref(65)
</script>

<template>
  <IdSlider v-model="val" label="Volume" :min="${p.min}" :max="${p.max}" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSlider v-model="val" label="Volume" :min="${p.min}" :max="${p.max}" />
</template>`,
    htmlCode: (p) => `<div class="id-slider">
  <label>Volume: 65%</label>
  <input type="range" min="${p.min}" max="${p.max}" value="65" />
</div>`
  },

  {
    id: 'ios-switch',
    name: 'Fluid Toggle Switch',
    category: 'inputs',
    description: 'Switch toggle with green, blue, purple, orange, red active color variants, sizes, and spring thumb.',
    tags: ['toggle', 'switch', 'color', 'size'],
    props: {
      label: { type: 'text', default: 'Notifications', description: 'Label text next to toggle switch.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Switch scale size.' },
      variant: { type: 'select', options: ['success', 'primary', 'purple', 'orange', 'red'], default: 'success', description: 'Active track color theme.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdToggle } from '@idesign/vue'

const enabled = ref(true)
</script>

<template>
  <IdToggle
    v-model="enabled"
    label="${p.label}"
    size="${p.size}"
    variant="${p.variant}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdToggle
    v-model="enabled"
    label="${p.label}"
    size="${p.size}"
    variant="${p.variant}"
  />
</template>`,
    htmlCode: (p) => `<button type="button" role="switch" aria-checked="true" class="id-toggle size-${p.size} variant-${p.variant} is-active">
  <span class="toggle-thumb"></span>
</button>`
  },

  {
    id: 'theme-toggle',
    name: 'Theme Toggle (Dark/Light)',
    category: 'inputs',
    description: 'Polished Apple-grade animated theme switcher with smooth SVG sun/moon morphing, View Transitions API radial reveal, button, icon, segmented, and switch variants.',
    tags: ['theme', 'dark-mode', 'light-mode', 'toggle', 'switch', 'transition', 'reveal', 'color-scheme'],
    props: {
      variant: { type: 'select', options: ['button', 'icon', 'segmented', 'switch', 'glass'], default: 'button', description: 'Visual display style.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Control sizing scale.' },
      transitionEffect: { type: 'select', options: ['reveal', 'fade', 'none'], default: 'reveal', description: 'Animated transition animation effect.' },
      showLabel: { type: 'boolean', default: true, description: 'Shows text mode label alongside the icon.' },
      lightLabel: { type: 'text', default: 'Light', description: 'Label for light mode.' },
      darkLabel: { type: 'text', default: 'Dark', description: 'Label for dark mode.' },
      autoLabel: { type: 'text', default: 'Auto', description: 'Label for system auto mode.' },
      animated: { type: 'boolean', default: true, description: 'Enables icon morph and animated theme transition.' },
      disabled: { type: 'boolean', default: false, description: 'Disables interaction.' }
    },
    vueCode: (p) => `<script setup>
import { IdThemeToggle } from '@idesign/vue'
</script>

<template>
  <IdThemeToggle
    variant="${p.variant || 'button'}"
    size="${p.size || 'md'}"
    transition-effect="${p.transitionEffect || 'reveal'}"
    :show-label="${p.showLabel !== false}"
    :animated="${p.animated !== false}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdThemeToggle variant="${p.variant || 'button'}" size="${p.size || 'md'}" />
</template>`,
    htmlCode: (p) => `<button type="button" class="id-theme-toggle-btn variant-${p.variant || 'button'} size-${p.size || 'md'}" aria-label="Toggle theme">
  <div class="toggle-icon-container">
    <span class="icon-layer icon-sun">☀️</span>
  </div>
  <span class="toggle-label-text">${p.darkLabel || 'Dark'}</span>
</button>`
  },

  {
    id: 'date-picker',
    name: 'Date Picker',
    category: 'inputs',
    description: 'Calendar-style date picker popover.',
    tags: ['date', 'calendar', 'picker', 'form'],
    props: {
      label: { type: 'text', default: 'Select Date', description: 'Input label text.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdDatePicker } from '@idesign/vue'

const date = ref('2026-08-15')
</script>

<template>
  <IdDatePicker v-model="date" label="${p.label}" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdDatePicker v-model="date" label="${p.label}" />
</template>`,
    htmlCode: (p) => `<div class="id-date-picker">
  <label>${p.label}</label>
  <input type="date" value="2026-08-15" class="date-input" />
</div>`
  },

  {
    id: 'file-upload',
    name: 'File & Avatar Upload',
    category: 'inputs',
    description: 'Versatile Liquid Glass file uploader supporting full drag-and-drop dropzone, standalone button trigger, circular/squircle avatar with + badge, photo thumbnail card, and compact inline bar.',
    tags: ['file', 'upload', 'avatar', 'dropzone', 'attachment', 'image', 'photo', 'media'],
    props: {
      variant: { type: 'select', options: ['default', 'avatar', 'button', 'image-card', 'compact', 'glass'], default: 'default', description: 'Upload visual variant style.' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Uploader sizing tier.' },
      shape: { type: 'select', options: ['circle', 'squircle', 'rounded'], default: 'circle', description: 'Avatar / media thumbnail silhouette.' },
      title: { type: 'text', default: 'Upload your photo or file', description: 'Primary headline text.' },
      hint: { type: 'text', default: 'PNG, JPG, WebP or PDF (up to 25MB)', description: 'Secondary guidance text.' },
      buttonLabel: { type: 'text', default: 'Choose File', description: 'Button label for button variant.' },
      buttonVariant: { type: 'select', options: ['primary', 'secondary', 'glass'], default: 'primary', description: 'Button variant style.' },
      multiple: { type: 'boolean', default: false, description: 'Allow multiple files.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdFileUpload } from '@idesign/vue'

const uploadedFiles = ref([])
const avatarUrl = ref('')
</script>

<template>
  <IdFileUpload
    v-model="uploadedFiles"
    v-model:src="avatarUrl"
    variant="${p.variant || 'default'}"
    size="${p.size || 'md'}"
    shape="${p.shape || 'circle'}"
    title="${p.title || 'Upload your photo or file'}"
    hint="${p.hint || 'PNG, JPG, WebP up to 25MB'}"
    ${p.buttonLabel ? `button-label="${p.buttonLabel}"\n    ` : ''}button-variant="${p.buttonVariant || 'primary'}"
    ${p.multiple ? 'multiple' : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdFileUpload
    variant="${p.variant || 'default'}"
    size="${p.size || 'md'}"
    shape="${p.shape || 'circle'}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-file-upload variant-${p.variant || 'default'} size-${p.size || 'md'}">
  <div class="drop-zone">
    <div class="upload-icon-wrapper">☁️</div>
    <span class="upload-title">${p.title || 'Click to upload or drag and drop'}</span>
    <span class="upload-hint">${p.hint || 'PNG, JPG, WebP up to 25MB'}</span>
  </div>
</div>`
  },

  // ─── OVERLAYS ───
  {
    id: 'command-palette',
    name: 'Command Palette (⌘K)',
    category: 'overlays',
    description: 'Spotlight-style command palette modal with global ⌘K shortcut and keyboard nav.',
    tags: ['command', 'palette', 'shortcut', 'spotlight'],
    props: {},
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdCommandPalette } from '@idesign/vue'

const open = ref(false)
const groups = [
  { title: 'Navigation', items: [{ id: '1', label: 'Go to Components', shortcut: '⌘C' }] },
  { title: 'Actions', items: [{ id: '2', label: 'Create New Token', shortcut: '⌘N' }] }
]
</script>

<template>
  <IdCommandPalette v-model="open" :groups="groups" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdCommandPalette v-model="open" :groups="groups" />
</template>`,
    htmlCode: (p) => `<div class="command-palette-overlay">
  <div class="command-card" role="dialog">
    <div class="command-search"><span class="icon">🔍</span><input type="text" placeholder="Type a command or search..." /></div>
    <div class="command-group">
      <div class="group-title">Navigation</div>
      <div class="command-item active"><span>Go to Components</span><kbd>⌘C</kbd></div>
    </div>
  </div>
</div>`
  },

  {
    id: 'liquid-modal',
    name: 'Liquid Glass Modal',
    category: 'overlays',
    description: 'Clean frosted modal materializing with scale+opacity spring animation, seamless unified surface glass variant, body text prop, action slots, and dismissal controls.',
    tags: ['modal', 'dialog', 'overlay', 'glass', 'seamless'],
    props: {
      title: { type: 'text', default: 'Save Workspace Changes', description: 'Modal header title.' },
      description: { type: 'text', default: 'Your changes will be synced across all connected devices.', description: 'Header description text.' },
      content: { type: 'text', default: 'Review your team settings before publishing. All active sessions will automatically receive the updated profile.', description: 'Body text content.' },
      variant: { type: 'select', options: ['glass', 'seamless', 'clean', 'plain', 'default', 'alert'], default: 'glass', description: 'Modal surface visual style (glass frosted, clean solid with no dividers, default, or alert).' },
      size: { type: 'select', options: ['sm', 'md', 'lg', 'xl'], default: 'md', description: 'Modal width scale.' },
      closeOnOutsideClick: { type: 'boolean', default: true, description: 'Dismiss when clicking outside modal.' },
      closeOnEscape: { type: 'boolean', default: true, description: 'Dismiss when pressing Escape key.' },
      showClose: { type: 'boolean', default: true, description: 'Show top-corner close button.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdModal, IdButton } from '@idesign/vue'

const open = ref(false)
</script>

<template>
  <IdButton variant="primary" @click="open = true">Launch Modal</IdButton>

  <IdModal
    v-model="open"
    title="${p.title}"
    description="${p.description || p.subtitle || ''}"
    content="${p.content}"
    variant="${p.variant}"
    size="${p.size}"
    :close-on-outside-click="${p.closeOnOutsideClick ?? true}"
    :close-on-escape="${p.closeOnEscape ?? true}"
    :show-close="${p.showClose ?? true}"
  >
    <template #actions>
      <IdButton variant="secondary" @click="open = false">Cancel</IdButton>
      <IdButton variant="primary" @click="open = false">Confirm</IdButton>
    </template>
  </IdModal>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdButton variant="primary" @click="open = true">Launch Modal</IdButton>

  <IdModal
    v-model="open"
    title="${p.title}"
    description="${p.description || p.subtitle || ''}"
    content="${p.content}"
    variant="${p.variant}"
    size="${p.size}"
    :close-on-outside-click="${p.closeOnOutsideClick ?? true}"
    :close-on-escape="${p.closeOnEscape ?? true}"
    :show-close="${p.showClose ?? true}"
  >
    <template #actions>
      <IdButton variant="secondary" @click="open = false">Cancel</IdButton>
      <IdButton variant="primary" @click="open = false">Confirm</IdButton>
    </template>
  </IdModal>
</template>`,
    htmlCode: (p) => `<div class="id-modal-overlay">
  <div class="modal-card size-${p.size} variant-${p.variant}" role="dialog">
    <div class="modal-header">
      <h3>${p.title}</h3>
      <p>${p.description || p.subtitle || ''}</p>
    </div>
    <div class="modal-body"><p>${p.content}</p></div>
    <div class="modal-actions">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>`
  },

  {
    id: 'bottom-sheet',
    name: 'Bottom Sheet',
    category: 'overlays',
    description: 'Edge-anchored mobile sheet supporting title, description, body props, and grabber handle.',
    tags: ['sheet', 'mobile', 'overlay'],
    props: {
      title: { type: 'text', default: 'Sheet Actions', description: 'Header title.' },
      description: { type: 'text', default: 'Choose an action to proceed.', description: 'Subheader description.' },
      variant: { type: 'select', options: ['default', 'inset', 'persistent'], default: 'default', description: 'Sheet frame style variant.' },
      position: { type: 'select', options: ['bottom', 'bottom-start', 'bottom-end', 'top', 'top-start', 'top-end', 'left', 'right', 'center'], default: 'bottom', description: 'Screen alignment anchor position.' },
      showGrabber: { type: 'boolean', default: true, description: 'Shows the drag grabber handle.' },
      closeOnBackdrop: { type: 'boolean', default: true, description: 'Closes when backdrop is clicked.' },
      backdrop: { type: 'select', options: ['blur', 'dim', 'glass', 'none', 'transparent'], default: 'blur', description: 'Backdrop overlay background appearance or invisible.' },
      closeOnEsc: { type: 'boolean', default: true, description: 'Closes when Escape key is pressed.' },
      dismissible: { type: 'boolean', default: true, description: 'Shows left close button.' },
      height: { type: 'text', default: '', description: 'Configurable height (e.g. 50vh, 400px).' },
      maxHeight: { type: 'text', default: '85vh', description: 'Max-height of bottom sheet.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdBottomSheet } from '@idesign/vue'

const open = ref(false)
</script>

<template>
  <IdBottomSheet
    v-model="open"
    title="${p.title}"
    description="${p.description}"
    :show-grabber="${p.showGrabber}"
    :close-on-backdrop="${p.closeOnBackdrop}"
    :close-on-esc="${p.closeOnEsc}"
    :dismissible="${p.dismissible}"
    ${p.height ? `height="${p.height}"` : ''}
    max-height="${p.maxHeight}"
  >
    <p>Sheet body content.</p>
  </IdBottomSheet>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdBottomSheet
    v-model="open"
    title="${p.title}"
    description="${p.description}"
    :show-grabber="${p.showGrabber}"
    :close-on-backdrop="${p.closeOnBackdrop}"
    :close-on-esc="${p.closeOnEsc}"
    :dismissible="${p.dismissible}"
    ${p.height ? `height="${p.height}"` : ''}
    max-height="${p.maxHeight}"
  >
    <p>Sheet content</p>
  </IdBottomSheet>
</template>`,
    htmlCode: (p) => `<div class="id-bottom-sheet">
  <div class="sheet-handle"></div>
  <div class="sheet-header"><h3>${p.title}</h3><p>${p.description}</p></div>
</div>`
  },

  {
    id: 'drawer',
    name: 'Side Drawer',
    category: 'overlays',
    description: 'Left/right sliding drawer supporting default and floating-sheet variants.',
    tags: ['drawer', 'sidebar', 'overlay', 'sheet'],
    props: {
      title: { type: 'text', default: 'Settings', description: 'Drawer title.' },
      description: { type: 'text', default: 'Manage your preferences.', description: 'Subheader description.' },
      position: { type: 'select', options: ['right', 'left'], default: 'right', description: 'Screen edge anchor position.' },
      variant: { type: 'select', options: ['default', 'floating-sheet'], default: 'default', description: 'Drawer card style.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdDrawer } from '@idesign/vue'

const open = ref(false)
</script>

<template>
  <IdDrawer
    v-model="open"
    title="${p.title}"
    description="${p.description}"
    position="${p.position}"
    variant="${p.variant}"
  >
    <p>Drawer body content.</p>
  </IdDrawer>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdDrawer
    v-model="open"
    title="${p.title}"
    position="${p.position}"
    variant="${p.variant}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-drawer position-${p.position} variant-${p.variant}">
  <div class="drawer-header"><h3>${p.title}</h3></div>
  <div class="drawer-body"><p>${p.description}</p></div>
</div>`
  },

  {
    id: 'toast',
    name: 'Toast Notification System',
    category: 'overlays',
    description: 'Floating liquid glass toast notifications with useToast() composable, status icons, action buttons, and auto-dismiss.',
    tags: ['toast', 'notification', 'alert', 'floating', 'composable'],
    props: {
      message: { type: 'text', default: 'File saved successfully', description: 'Notification message.' },
      type: { type: 'select', options: ['success', 'info', 'warning', 'error'], default: 'success', description: 'Status icon and color theme.' },
      position: { type: 'select', options: ['bottom-center', 'bottom-right', 'top-center', 'top-right'], default: 'bottom-center', description: 'Toast container screen anchor.' }
    },
    vueCode: (p) => `<script setup>
import { useToast, IdToast } from '@idesign/vue'

const toast = useToast()
const notify = () => {
  toast.${p.type}('${p.message}', { description: 'All changes stored in cloud.' })
}
</script>

<template>
  <!-- Mount root container in App.vue -->
  <IdToast position="${p.position}" />
  <button @click="notify">Show Toast</button>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdToast position="${p.position}" />
</template>`,
    htmlCode: (p) => `<div class="id-toast-container position-${p.position}">
  <div class="toast-item type-${p.type}">
    <span class="toast-icon">✓</span>
    <div class="toast-meta">
      <span class="toast-msg">${p.message}</span>
    </div>
  </div>
</div>`
  },

  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'overlays',
    description: 'Rounded hover tooltip with dark mode support and top/bottom/left/right positions.',
    tags: ['tooltip', 'popover', 'hover', 'darkmode'],
    props: {
      text: { type: 'text', default: 'Helpful tip', description: 'Tooltip message text.' },
      position: { type: 'select', options: ['top', 'bottom', 'left', 'right'], default: 'top', description: 'Anchor orientation.' }
    },
    vueCode: (p) => `<script setup>
import { IdTooltip, IdButton } from '@idesign/vue'
</script>

<template>
  <IdTooltip text="${p.text}" position="${p.position}">
    <IdButton>Hover me</IdButton>
  </IdTooltip>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTooltip text="${p.text}" position="${p.position}">
    <IdButton>Hover me</IdButton>
  </IdTooltip>
</template>`,
    htmlCode: (p) => `<div class="id-tooltip-wrap">
  <button class="btn">Hover me</button>
  <div class="tooltip-card position-${p.position}" role="tooltip">${p.text}</div>
</div>`
  },

  // ─── INDICATORS ───
  {
    id: 'live-indicator',
    name: 'Live Pulsing Dot',
    category: 'indicators',
    description: 'Animated green pulsing indicator for live statuses.',
    tags: ['live', 'dot', 'pulse'],
    props: {
      text: { type: 'text', default: 'SYSTEM · LIVE', description: 'Badge label text.' }
    },
    vueCode: (p) => `<script setup>
import { IdLiveDot } from '@idesign/vue'
</script>

<template>
  <IdLiveDot>${p.text}</IdLiveDot>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdLiveDot>${p.text}</IdLiveDot>
</template>`,
    htmlCode: (p) => `<span class="id-live-dot">
  <span class="pulse-ring"></span>
  <span class="dot"></span>
  <span class="live-label">${p.text}</span>
</span>`
  },

  {
    id: 'tag',
    name: 'Tags & Status Pills',
    category: 'indicators',
    description: 'Status pills and chips with left/right Lucide icon support, status colors, and dismiss buttons.',
    tags: ['tag', 'chip', 'pill', 'status', 'icon'],
    props: {
      label: { type: 'text', default: 'Active', description: 'Tag label text.' },
      variant: { type: 'select', options: ['plain', 'accent', 'success', 'warning', 'danger', 'heat', 'mono'], default: 'success', description: 'Color theme variant.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Tag scale size.' },
      iconLeft: { type: 'text', default: '⚡', description: 'Left icon symbol.' },
      removable: { type: 'boolean', default: false, description: 'Shows close dismiss button.' }
    },
    vueCode: (p) => `<script setup>
import { IdTag } from '@idesign/vue'
</script>

<template>
  <IdTag
    variant="${p.variant}"
    size="${p.size}"
    ${p.iconLeft ? `icon-left="${p.iconLeft}"` : ''}
    ${p.removable ? 'removable' : ''}
  >
    ${p.label}
  </IdTag>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTag variant="${p.variant}" size="${p.size}">
    ${p.label}
  </IdTag>
</template>`,
    htmlCode: (p) => `<span class="id-tag variant-${p.variant} size-${p.size}">
  ${p.iconLeft ? `<span class="icon">${p.iconLeft}</span>` : ''}
  <span>${p.label}</span>
</span>`
  },

  {
    id: 'alert',
    name: 'Alert Banner',
    category: 'indicators',
    description: 'Info/success/warning/error/glass alert banner supporting custom icons, sizes, title, description, and dismissible props.',
    tags: ['alert', 'banner', 'notification', 'icon', 'glass'],
    props: {
      color: { type: 'select', options: ['info', 'success', 'warning', 'error'], default: 'info', description: 'Semantic status tone.' },
      variant: { type: 'select', options: ['subtle', 'solid', 'glass', 'outline'], default: 'subtle', description: 'Surface visual style.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Padding and text scale.' },
      title: { type: 'text', default: 'Update Available', description: 'Header title.' },
      description: { type: 'text', default: 'A new version is ready to install.', description: 'Body text content.' },
      dismissible: { type: 'boolean', default: true, description: 'Shows close button.' }
    },
    vueCode: (p) => `<script setup>
import { IdAlert } from '@idesign/vue'
</script>

<template>
  <IdAlert
    color="${p.color}"
    variant="${p.variant}"
    size="${p.size}"
    title="${p.title}"
    description="${p.description}"
    ${p.dismissible ? 'dismissible' : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdAlert
    variant="${p.variant}"
    size="${p.size}"
    title="${p.title}"
    description="${p.description}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-alert variant-${p.variant} size-${p.size}" role="alert">
  <div class="alert-content">
    <h4 class="alert-title">${p.title}</h4>
    <p class="alert-desc">${p.description}</p>
  </div>
</div>`
  },

  // ─── DATA DISPLAY ───
  {
    id: 'table',
    name: 'Data Table & Row Actions',
    category: 'data',
    description: 'Clean data table with striped, glass, compact, borderless variants, column sorting, row selection checkboxes, live filter bar, dynamic count badge, and action dropdown slots.',
    tags: ['table', 'grid', 'data', 'actions', 'select', 'sort', 'count'],
    props: {
      title: { type: 'text', default: 'Team Members', description: 'Header title.' },
      count: { type: 'text', default: '', description: 'Custom count badge text.' },
      variant: { type: 'select', options: ['default', 'striped', 'glass', 'compact', 'borderless'], default: 'default', description: 'Table surface and border style.' },
      selectable: { type: 'boolean', default: true, description: 'Enables row checkbox selection.' },
      searchable: { type: 'boolean', default: true, description: 'Shows search filter bar.' },
      hasRowActions: { type: 'boolean', default: true, description: 'Enables row action dropdown slot.' }
    },
    vueCode: (p) => `<script setup>
import { IdTable, IdButton } from '@idesign/vue'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' }
]
const data = [
  { name: 'Jane Doe', role: 'Design Lead', status: 'Active' }
]
</script>

<template>
  <IdTable
    title="${p.title}"
    variant="${p.variant}"
    :columns="columns"
    :data="data"
    ${p.selectable ? 'selectable' : ''}
    ${p.searchable ? 'searchable' : ''}
  >
    <template #actions="{ row }">
      <IdButton size="sm" variant="ghost">Edit</IdButton>
    </template>
  </IdTable>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTable
    title="${p.title}"
    variant="${p.variant}"
    :columns="columns"
    :data="data"
  />
</template>`,
    htmlCode: (p) => `<div class="id-table-container variant-${p.variant}">
  <div class="table-header">
    <h3>${p.title}</h3>
  </div>
  <table class="id-table">
    <thead>
      <tr><th>Name</th><th>Role</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr><td>Jane Doe</td><td>Design Lead</td><td>Active</td></tr>
    </tbody>
  </table>
</div>`
  },

  {
    id: 'avatar',
    name: 'Avatar',
    category: 'data',
    description: 'User avatar supporting photo src images, Lucide icons, emojis, initials fallback, framed ring, status dot, and squircle shape.',
    tags: ['avatar', 'user', 'profile', 'squircle', 'icon', 'image'],
    props: {
      name: { type: 'text', default: 'Jane Smith', description: 'User full name (used for initials fallback & tooltip).' },
      src: { type: 'text', default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', description: 'Image avatar URL.' },
      icon: { type: 'select', options: ['', '⚡', '🤖', '👑', 'User', 'Sparkles'], default: '', description: 'Icon symbol instead of image.' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Avatar dimension scale.' },
      shape: { type: 'select', options: ['circle', 'squircle'], default: 'circle', description: 'Border radius shape.' },
      framed: { type: 'boolean', default: false, description: 'Adds glass border frame ring.' },
      status: { type: 'select', options: ['online', 'offline', 'busy'], default: 'online', description: 'Presence status indicator dot.' }
    },
    vueCode: (p) => `<script setup>
import { IdAvatar } from '@idesign/vue'
</script>

<template>
  <IdAvatar
    name="${p.name}"
    src="${p.src}"
    size="${p.size}"
    shape="${p.shape}"
    status="${p.status}"
    ${p.framed ? 'framed' : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdAvatar
    name="${p.name}"
    src="${p.src}"
    size="${p.size}"
    shape="${p.shape}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-avatar size-${p.size} shape-${p.shape} ${p.framed ? 'is-framed' : ''}">
  <img src="${p.src}" alt="${p.name}" />
  <span class="status-dot ${p.status}"></span>
</div>`
  },

  {
    id: 'avatar-group',
    name: 'Avatar Group',
    category: 'data',
    description: 'Stacked, grid, liquid glass hero, and expanded avatar groups with dynamic framed and shape props.',
    tags: ['avatar', 'group', 'stacked', 'grid', 'glass', 'users'],
    props: {
      variant: { type: 'select', options: ['stacked', 'grid', 'hero', 'expanded'], default: 'hero', description: 'Layout arrangement style.' },
      shape: { type: 'select', options: ['circle', 'squircle'], default: 'circle', description: 'Avatar item shape.' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Avatar size scale.' },
      max: { type: 'number', default: 3, description: 'Maximum visible avatars before showing +N counter.' },
      label: { type: 'text', default: '5 active team members', description: 'Metadata label text.' },
      framed: { type: 'boolean', default: false, description: 'Applies glass frame ring to each avatar.' }
    },
    vueCode: (p) => `<script setup>
import { IdAvatarGroup } from '@idesign/vue'

const users = [
  { name: 'Jane Smith' },
  { name: 'Alex Rivera' },
  { name: 'Sarah Chen' },
  { name: 'David Kim' }
]
</script>

<template>
  <IdAvatarGroup
    variant="${p.variant}"
    shape="${p.shape}"
    size="${p.size}"
    :max="${p.max}"
    label="${p.label}"
    ${p.framed ? 'framed' : ''}
    :users="users"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdAvatarGroup
    variant="${p.variant}"
    shape="${p.shape}"
    size="${p.size}"
    :max="${p.max}"
    :users="users"
  />
</template>`,
    htmlCode: (p) => `<div class="id-avatar-group variant-${p.variant} size-${p.size}">
  <div class="avatar-stack">
    <div class="avatar-item">JS</div>
    <div class="avatar-item">AR</div>
    <div class="avatar-more">+2</div>
  </div>
  <span class="group-label">${p.label}</span>
</div>`
  },

  {
    id: 'stat',
    name: 'Statistic Card',
    category: 'data',
    description: 'Key-value stat card with percentage change badge, size, glass/hero variants, comparison description prop, and SVG sparkline chart.',
    tags: ['stat', 'sparkline', 'chart', 'kpi', 'description', 'hero', 'glass'],
    props: {
      label: { type: 'text', default: 'Total Revenue', description: 'Metric title.' },
      value: { type: 'text', default: '$128,450', description: 'Primary value text.' },
      change: { type: 'text', default: '+14.2%', description: 'Percentage change tag text.' },
      description: { type: 'text', default: 'Compared to $112,400 last month', description: 'Subtext comparison detail.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Card scale size.' },
      variant: { type: 'select', options: ['default', 'glass', 'hero'], default: 'default', description: 'Container visual style.' }
    },
    vueCode: (p) => `<script setup>
import { IdStat } from '@idesign/vue'
</script>

<template>
  <IdStat
    label="${p.label}"
    value="${p.value}"
    change="${p.change}"
    description="${p.description}"
    size="${p.size}"
    variant="${p.variant}"
    change-type="positive"
    :sparkline-data="[10, 25, 18, 35, 28, 45, 60]"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdStat
    label="${p.label}"
    value="${p.value}"
    change="${p.change}"
    size="${p.size}"
    variant="${p.variant}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-stat-card size-${p.size} variant-${p.variant}">
  <div class="stat-header">
    <span class="stat-label">${p.label}</span>
    <span class="change-tag positive">${p.change}</span>
  </div>
  <div class="stat-value">${p.value}</div>
  <p class="stat-desc">${p.description}</p>
</div>`
  },

  {
    id: 'empty-state',
    name: 'Empty / Error State',
    category: 'indicators',
    description: 'Empty or error state container with dynamic Lucide icons, emojis, titles, descriptions, and action buttons.',
    tags: ['empty', 'error', 'state', 'blank', 'icon'],
    props: {
      title: { type: 'text', default: 'No Data Available', description: 'Title header text.' },
      description: { type: 'text', default: 'Create your first item to get started.', description: 'Body guidance description.' },
      icon: { type: 'select', options: ['🔍', '📂', '📦', '⚡', 'Search', 'FolderOpen'], default: '🔍', description: 'Center graphic icon symbol.' },
      actionLabel: { type: 'text', default: 'Create New', description: 'Action button text.' },
      noBg: { type: 'boolean', default: false, description: 'Strips container background and border styles.' }
    },
    vueCode: (p) => `<script setup>
import { IdEmpty } from '@idesign/vue'
</script>

<template>
  <IdEmpty
    title="${p.title}"
    description="${p.description}"
    icon="${p.icon}"
    action-label="${p.actionLabel}"
    ${p.noBg ? 'no-bg' : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdEmpty
    title="${p.title}"
    description="${p.description}"
    icon="${p.icon}"
    action-label="${p.actionLabel}"
    ${p.noBg ? 'no-bg' : ''}
  />
</template>`,
    htmlCode: (p) => `<div class="id-empty-state${p.noBg ? ' no-bg' : ''}">
  <div class="empty-icon">${p.icon}</div>
  <h3 class="empty-title">${p.title}</h3>
  <p class="empty-desc">${p.description}</p>
  <button class="btn btn-primary">${p.actionLabel}</button>
</div>`
  },

  {
    id: 'badge',
    name: 'Badge',
    category: 'data',
    description: 'Notification badge with count overlay and dot indicator (hides count if 0 or null).',
    tags: ['badge', 'count', 'notification'],
    props: {
      count: { type: 'number', default: 5, description: 'Notification count number.' },
      showZero: { type: 'boolean', default: false, description: 'Renders badge even when count is 0.' }
    },
    vueCode: (p) => `<script setup>
import { IdBadge, IdButton } from '@idesign/vue'
</script>

<template>
  <IdBadge :count="${p.count}" ${p.showZero ? 'show-zero' : ''}>
    <IdButton>Notifications</IdButton>
  </IdBadge>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdBadge :count="${p.count}">
    <IdButton>Notifications</IdButton>
  </IdBadge>
</template>`,
    htmlCode: (p) => `<div class="id-badge-wrap">
  <button class="btn">Notifications</button>
  <span class="badge-count">${p.count}</span>
</div>`
  },

  {
    id: 'progress',
    name: 'Progress Bar',
    category: 'data',
    description: 'Determinate/indeterminate progress with ARIA progressbar, color selection, and shimmer animation.',
    tags: ['progress', 'loading', 'bar', 'color'],
    props: {
      value: { type: 'number', default: 65, description: 'Completion percentage (0-100).' },
      label: { type: 'text', default: 'Upload Progress', description: 'Progress bar text label.' },
      showValue: { type: 'boolean', default: true, description: 'Display percentage value.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Progress bar height.' },
      variant: { type: 'select', options: ['default', 'glass'], default: 'default', description: 'Track surface style.' },
      color: { type: 'select', options: ['blue', 'green', 'purple', 'orange', 'red'], default: 'blue', description: 'Fill accent color.' },
      indeterminate: { type: 'boolean', default: false, description: 'Enables continuous pulsing shimmer animation.' }
    },
    vueCode: (p) => `<script setup>
import { IdProgress } from '@idesign/vue'
</script>

<template>
  <IdProgress
    :value="${p.value}"
    label="${p.label || 'Upload Progress'}"
    :show-value="${p.showValue !== false}"
    size="${p.size}"
    variant="${p.variant}"
    color="${p.color}"
    ${p.indeterminate ? 'indeterminate' : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdProgress
    :value="${p.value}"
    size="${p.size}"
    color="${p.color}"
  />
</template>`,
    htmlCode: (p) => `<div role="progressbar" aria-valuenow="${p.value}" class="id-progress size-${p.size} color-${p.color}">
  <div class="progress-track">
    <div class="progress-fill" style="width: ${p.value}%;"></div>
  </div>
</div>`
  },

  {
    id: 'skeleton',
    name: 'Skeleton Loader',
    category: 'data',
    description: 'Shimmer loading placeholders rendering exact selected variant (rect, text, circle, card) and size.',
    tags: ['skeleton', 'loading', 'placeholder', 'variant', 'size'],
    props: {
      variant: { type: 'select', options: ['rect', 'text', 'circle', 'card'], default: 'rect', description: 'Placeholder geometric shape.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Dimension scale.' }
    },
    vueCode: (p) => `<script setup>
import { IdSkeleton } from '@idesign/vue'
</script>

<template>
  <IdSkeleton variant="${p.variant}" size="${p.size}" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSkeleton variant="${p.variant}" size="${p.size}" />
</template>`,
    htmlCode: (p) => `<div class="id-skeleton variant-${p.variant} size-${p.size}"></div>`
  },

  {
    id: 'spinner',
    name: 'Loading Spinner',
    category: 'data',
    description: 'SVG arc spinner with optional label text, size, and color props.',
    tags: ['spinner', 'loading', 'indicator', 'color'],
    props: {
      size: { type: 'select', options: ['sm', 'md', 'lg', 'xl'], default: 'md', description: 'Spinner diameter scale.' },
      color: { type: 'select', options: ['blue', 'green', 'purple', 'white', 'gray'], default: 'blue', description: 'Arc stroke color.' },
      label: { type: 'text', default: 'Loading...', description: 'Optional label subtext.' }
    },
    vueCode: (p) => `<script setup>
import { IdSpinner } from '@idesign/vue'
</script>

<template>
  <IdSpinner size="${p.size}" color="${p.color}" label="${p.label}" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSpinner size="${p.size}" color="${p.color}" label="${p.label}" />
</template>`,
    htmlCode: (p) => `<div class="id-spinner size-${p.size} color-${p.color}">
  <svg viewBox="0 0 24 24" class="spinner-svg"><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2.5" /></svg>
  <span>${p.label}</span>
</div>`
  },

  // ─── LAYOUT ───
  {
    id: 'stack',
    name: 'Stack Layout',
    category: 'layout',
    description: 'Flex container helper supporting vertical/horizontal direction and custom gap.',
    tags: ['stack', 'layout', 'flex'],
    props: {
      direction: { type: 'select', options: ['vertical', 'horizontal'], default: 'vertical', description: 'Flex layout direction.' },
      gap: { type: 'number', default: 12, description: 'Gap spacing between child elements in pixels.' }
    },
    vueCode: (p) => `<script setup>
import { IdStack } from '@idesign/vue'
</script>

<template>
  <IdStack direction="${p.direction}" :gap="${p.gap}">
    <div>Item 1</div>
    <div>Item 2</div>
  </IdStack>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdStack direction="${p.direction}" :gap="${p.gap}">
    <div>Item 1</div>
    <div>Item 2</div>
  </IdStack>
</template>`,
    htmlCode: (p) => `<div class="id-stack direction-${p.direction}" style="gap: ${p.gap}px;">
  <div>Item 1</div>
  <div>Item 2</div>
</div>`
  },

  {
    id: 'grid',
    name: 'Responsive Layout Grid',
    category: 'layout',
    description: 'CSS Grid layout helper with columns, gap, and responsive auto-fit props.',
    tags: ['grid', 'layout', 'responsive', 'columns'],
    props: {
      cols: { type: 'select', options: [1, 2, 3, 4, 6], default: 3, description: 'Number of grid columns.' },
      gap: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Grid gap spacing size.' },
      autoFit: { type: 'boolean', default: false, description: 'Enables responsive auto-fit column width.' }
    },
    vueCode: (p) => `<script setup>
import { IdGrid, IdCard } from '@idesign/vue'
</script>

<template>
  <IdGrid :cols="${p.cols}" gap="${p.gap}" ${p.autoFit ? 'auto-fit' : ''}>
    <IdCard title="Card 1" />
    <IdCard title="Card 2" />
    <IdCard title="Card 3" />
  </IdGrid>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdGrid :cols="${p.cols}" gap="${p.gap}">
    <IdCard title="Card 1" />
  </IdGrid>
</template>`,
    htmlCode: (p) => `<div class="id-grid cols-${p.cols} gap-${p.gap}">
  <div class="grid-item">Card 1</div>
  <div class="grid-item">Card 2</div>
  <div class="grid-item">Card 3</div>
</div>`
  },

  {
    id: 'file-upload',
    name: 'File Upload',
    category: 'inputs',
    description: 'Drag & drop file upload zone with file list preview and size formatting.',
    tags: ['upload', 'file', 'drag'],
    props: {},
    vueCode: (p) => `<script setup>
import { IdFileUpload } from '@idesign/vue'
</script>

<template>
  <IdFileUpload @change="files => console.log(files)" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdFileUpload @change="files => console.log(files)" />
</template>`,
    htmlCode: (p) => `<div class="id-file-upload">
  <div class="drop-zone">
    <span class="upload-icon">📁</span>
    <p>Drag & drop files here, or <button class="btn-link">browse</button></p>
  </div>
</div>`
  },

  {
    id: 'confirm-dialog',
    name: 'Confirm Dialog',
    category: 'overlays',
    description: 'Apple-grade confirmation dialog supporting inset, compact, default, and centered-empty variants with soft content area.',
    tags: ['confirm', 'dialog', 'modal', 'centered', 'inset', 'compact'],
    props: {
      title: { type: 'text', default: 'Delete Security Token', description: 'Dialog title.' },
      description: { type: 'text', default: 'This action is irreversible. All connected apps will lose access immediately.', description: 'Description explaining the consequence.' },
      variant: { type: 'select', options: ['inset', 'compact', 'default', 'centered-empty'], default: 'inset', description: 'Visual dialog layout.' },
      danger: { type: 'boolean', default: true, description: 'Highlights primary button in red danger styling.' },
      content: { type: 'text', default: 'Token ID: sec_live_99f018a38c', description: 'Optional soft inset content or details.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdConfirmDialog } from '@idesign/vue'

const open = ref(false)
</script>

<template>
  <IdConfirmDialog
    v-model="open"
    title="${p.title}"
    description="${p.description}"
    variant="${p.variant}"
    content="${p.content}"
    ${p.danger ? 'danger' : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdConfirmDialog
    v-model="open"
    title="${p.title}"
    description="${p.description}"
    variant="${p.variant}"
    content="${p.content}"
    ${p.danger ? 'danger' : ''}
  />
</template>`,
    htmlCode: (p) => `<div class="confirm-dialog-overlay">
  <div class="confirm-card variant-${p.variant}">
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    ${p.content ? `<div class="confirm-inset-box">${p.content}</div>` : ''}
    <div class="actions">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn ${p.danger ? 'btn-danger' : 'btn-primary'}">Confirm</button>
    </div>
  </div>
</div>`
  },

  {
    id: 'carousel',
    name: 'Card Carousel',
    category: 'panels',
    description: 'Horizontal snap card carousel with pagination dots and smooth physics.',
    tags: ['carousel', 'cards', 'banner', 'slider'],
    props: {
      showDots: { type: 'boolean', default: true, description: 'Shows bottom dot page indicators.' },
      showControls: { type: 'boolean', default: true, description: 'Shows prev/next arrow navigation buttons.' }
    },
    vueCode: (p) => `<script setup>
import { IdCarousel, IdCard } from '@idesign/vue'
</script>

<template>
  <IdCarousel :show-dots="${p.showDots}" :show-controls="${p.showControls}">
    <IdCard title="Slide 1" />
    <IdCard title="Slide 2" />
    <IdCard title="Slide 3" />
  </IdCarousel>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdCarousel :show-dots="${p.showDots}" :show-controls="${p.showControls}">
    <IdCard title="Slide 1" />
  </IdCarousel>
</template>`,
    htmlCode: (p) => `<div class="id-carousel-wrap">
  <div class="carousel-track">
    <div class="carousel-slide">Slide 1</div>
    <div class="carousel-slide">Slide 2</div>
  </div>
  ${p.showDots ? '<div class="carousel-dots"><span class="dot active"></span><span class="dot"></span></div>' : ''}
</div>`
  },

  {
    id: 'macos-banner',
    name: 'macOS System Banner',
    category: 'indicators',
    description: 'macOS floating notification card with dynamic app name, title, message, time, icon, primary action, and secondary action buttons.',
    tags: ['macos', 'banner', 'notification', 'system', 'icon', 'action'],
    props: {
      appName: { type: 'text', default: 'System Settings', description: 'Application title label.' },
      title: { type: 'text', default: 'Software Update Ready', description: 'Banner title.' },
      message: { type: 'text', default: 'macOS Sequoia 15.1 is ready to install.', description: 'Notification message.' },
      time: { type: 'text', default: 'now', description: 'Timestamp label.' },
      icon: { type: 'select', options: ['⚡', '🔔', '⚙️', '📁'], default: '⚡', description: 'App icon symbol.' },
      actionLabel: { type: 'text', default: 'Update Now', description: 'Primary action label.' },
      secondaryActionLabel: { type: 'text', default: 'Options...', description: 'Secondary options button label.' }
    },
    vueCode: (p) => `<script setup>
import { IdMacOsBanner } from '@idesign/vue'
</script>

<template>
  <IdMacOsBanner
    app-name="${p.appName}"
    title="${p.title}"
    message="${p.message}"
    time="${p.time}"
    icon="${p.icon}"
    action-label="${p.actionLabel}"
    secondary-action-label="${p.secondaryActionLabel}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdMacOsBanner
    app-name="${p.appName}"
    title="${p.title}"
    message="${p.message}"
  />
</template>`,
    htmlCode: (p) => `<div class="macos-banner">
  <div class="banner-top">
    <span class="app-icon">${p.icon}</span>
    <span class="app-name">${p.appName}</span>
    <span class="time">${p.time}</span>
  </div>
  <h4 class="banner-title">${p.title}</h4>
  <p class="banner-msg">${p.message}</p>
  <div class="banner-actions">
    <button class="btn-action">${p.actionLabel}</button>
  </div>
</div>`
  },

  {
    id: 'file-tree',
    name: 'macOS Finder Tree',
    category: 'data',
    description: 'macOS Finder style expandable directory tree view with file/folder icons.',
    tags: ['tree', 'finder', 'files', 'directory'],
    props: {},
    vueCode: (p) => `<script setup>
import { IdFileTree } from '@idesign/vue'

const items = [
  { id: '1', name: 'src', children: [{ id: '2', name: 'App.vue' }] }
]
</script>

<template>
  <IdFileTree :items="items" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdFileTree :items="items" />
</template>`,
    htmlCode: (p) => `<div class="id-file-tree">
  <div class="tree-item folder expanded">
    <span class="icon">📁</span> <span class="name">src</span>
    <div class="tree-children">
      <div class="tree-item file"><span class="icon">📄</span> <span class="name">App.vue</span></div>
    </div>
  </div>
</div>`
  },

  {
    id: 'popover',
    name: 'Floating Popover',
    category: 'overlays',
    description: 'Floating card anchored to any trigger with title, subtitle, body text props, glass variant, and auto-outside click dismiss.',
    tags: ['popover', 'floating', 'anchor', 'glass', 'body'],
    props: {
      position: { type: 'select', options: ['bottom', 'top', 'left', 'right'], default: 'bottom', description: 'Placement orientation.' },
      title: { type: 'text', default: 'Popover Title', description: 'Card title.' },
      body: { type: 'text', default: 'Popover body content text goes here.', description: 'Body text content.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Popover card size.' },
      variant: { type: 'select', options: ['default', 'glass'], default: 'default', description: 'Frosted glass or default surface background.' }
    },
    vueCode: (p) => `<script setup>
import { IdPopover, IdButton } from '@idesign/vue'
</script>

<template>
  <IdPopover
    position="${p.position}"
    title="${p.title}"
    body="${p.body}"
    size="${p.size}"
    variant="${p.variant}"
  >
    <template #trigger>
      <IdButton>Toggle Popover</IdButton>
    </template>
  </IdPopover>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdPopover
    position="${p.position}"
    title="${p.title}"
    body="${p.body}"
    size="${p.size}"
    variant="${p.variant}"
  >
    <template #trigger>
      <IdButton>Toggle Popover</IdButton>
    </template>
  </IdPopover>
</template>`,
    htmlCode: (p) => `<div class="id-popover-wrapper">
  <button class="btn">Toggle Popover</button>
  <div class="popover-card position-${p.position} size-${p.size} variant-${p.variant}" role="dialog">
    <div class="popover-title">${p.title}</div>
    <div class="popover-body">${p.body}</div>
  </div>
</div>`
  },

  // ─── MOBILE ───
  {
    id: 'iphone-shell',
    name: 'iPhone Frame Shell',
    category: 'mobile',
    description: 'Device frame with Dynamic Island, status bar, and home indicator.',
    tags: ['iphone', 'mobile', 'ios'],
    props: {},
    vueCode: (p) => `<script setup>
import { IdIphoneFrame } from '@idesign/vue'
</script>

<template>
  <IdIphoneFrame>
    <div style="padding: 16px;">
      <h3>iOS Application Content</h3>
    </div>
  </IdIphoneFrame>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdIphoneFrame>
    <div style="padding: 16px;">
      <h3>iOS Application Content</h3>
    </div>
  </IdIphoneFrame>
</template>`,
    htmlCode: (p) => `<div class="iphone-shell">
  <div class="dynamic-island"></div>
  <div class="screen-content">
    <h3>iOS App Content</h3>
  </div>
  <div class="home-indicator"></div>
</div>`
  },

  {
    id: 'bar-chart',
    name: 'Dashboard Bar Chart',
    category: 'data',
    description: 'Animated SVG dashboard bar chart with value tooltips and custom bar colors.',
    tags: ['chart', 'bar', 'graph', 'dashboard', 'data'],
    props: {
      height: { type: 'number', default: 180, description: 'SVG chart height in pixels.' }
    },
    vueCode: (p) => `<script setup>
import { IdBarChart } from '@idesign/vue'

const chartData = [
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 82 },
  { label: 'Wed', value: 60 },
  { label: 'Thu', value: 95 },
  { label: 'Fri', value: 75 }
]
</script>

<template>
  <IdBarChart :height="${p.height}" :data="chartData" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdBarChart :height="${p.height}" :data="chartData" />
</template>`,
    htmlCode: (p) => `<div class="id-bar-chart" style="height: ${p.height}px;">
  <svg viewBox="0 0 400 180" class="chart-svg">
    <rect x="20" y="80" width="30" height="90" fill="#0071e3" rx="4" />
    <rect x="80" y="40" width="30" height="130" fill="#0071e3" rx="4" />
  </svg>
</div>`
  },

  {
    id: 'pie-chart',
    name: 'Dashboard Donut Chart',
    category: 'data',
    description: 'Interactive SVG donut & progress ring chart component with closed full and open activity gauge variants, composable center content, and legend.',
    tags: ['chart', 'pie', 'donut', 'progress', 'ring', 'gauge', 'graph', 'dashboard', 'analytics'],
    props: {
      variant: { type: 'select', default: 'progress', options: ['full', 'progress'], description: 'Visual style: full closed 360 circle or open 240 progress gauge.' },
      value: { type: 'number', default: 78, description: 'Progress / metric numeric value.' },
      max: { type: 'number', default: 100, description: 'Maximum scale value.' },
      unit: { type: 'text', default: 'AQI', description: 'Unit or secondary metric text.' },
      label: { type: 'text', default: 'Air Quality', description: 'Center label text.' },
      color: { type: 'select', default: 'blue', options: ['blue', 'green', 'orange', 'red', 'purple', 'indigo', 'gradient-cta', 'gradient-warm'], description: 'Progress arc stroke color.' },
      size: { type: 'select', default: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'Donut diameter size.' }
    },
    vueCode: (p) => `<script setup>
import { IdDonutChart } from '@idesign/vue'
</script>

<template>
  <IdDonutChart
    variant="${p.variant || 'progress'}"
    :value="${p.value || 78}"
    :max="${p.max || 100}"
    unit="${p.unit || 'AQI'}"
    label="${p.label || 'Air Quality'}"
    color="${p.color || 'blue'}"
    size="${p.size || 'md'}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdDonutChart
    variant="${p.variant || 'progress'}"
    :value="${p.value || 78}"
    :max="${p.max || 100}"
    unit="${p.unit || 'AQI'}"
    label="${p.label || 'Air Quality'}"
    color="${p.color || 'blue'}"
    size="${p.size || 'md'}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-donut-chart variant-${p.variant || 'progress'} size-${p.size || 'md'}">
  <div class="donut-center">
    <span class="donut-value">${p.value || 78}</span>
    <span class="donut-unit">${p.unit || 'AQI'}</span>
    <span class="donut-label">${p.label || 'Air Quality'}</span>
  </div>
</div>`
  },

  {
    id: 'timeline',
    name: 'Activity Timeline',
    category: 'data',
    description: 'Vertical timeline component for activity feeds, release changelogs, audit logs, and status history with default line and cards variants.',
    tags: ['timeline', 'activity', 'feed', 'history', 'changelog', 'cards'],
    props: {
      variant: { type: 'select', options: ['default', 'cards'], default: 'cards', description: 'Timeline display style.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Timeline size scale.' },
      connector: { type: 'boolean', default: true, description: 'Shows vertical timeline spine connector.' }
    },
    vueCode: (p) => `<script setup>
import { IdTimeline } from '@idesign/vue'

const items = [
  { title: 'v2.4 Released', description: 'Added 5 new Liquid Glass components and tokens.', time: '10 min ago', status: 'primary' },
  { title: 'Security Audit Passed', description: 'Enclave verification completed cleanly.', time: '2 hours ago', status: 'success' },
  { title: 'System Deployment', description: 'Deployed edge cluster to 14 regions.', time: 'Yesterday', status: 'info' }
]
</script>

<template>
  <IdTimeline
    variant="${p.variant || 'cards'}"
    size="${p.size || 'md'}"
    :connector="${p.connector !== false}"
    :items="items"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTimeline
    variant="${p.variant || 'cards'}"
    size="${p.size || 'md'}"
    :items="items"
  />
</template>`,
    htmlCode: (p) => `<div class="id-timeline variant-${p.variant || 'cards'}">
  <div class="timeline-item">
    <div class="timeline-spine">
      <div class="timeline-indicator status-primary"></div>
      <div class="timeline-line"></div>
    </div>
    <div class="timeline-content timeline-card">
      <h4>v2.4 Released</h4>
      <p>Added 5 new Liquid Glass components.</p>
    </div>
  </div>
</div>`
  },

  {
    id: 'project-section',
    name: 'Featured Projects Section',
    category: 'panels',
    description: 'Portfolio section card container with inner project cards, status pills, tech stack icon badges, and chevron hover state.',
    tags: ['projects', 'portfolio', 'section', 'cards', 'list'],
    props: {
      title: { type: 'text', default: 'Featured Projects', description: 'Section title.' },
      icon: { type: 'text', default: '📁', description: 'Section header icon.' }
    },
    vueCode: (p) => `<script setup>
import { IdProjectSection, IdProjectCard } from '@idesign/vue'
</script>

<template>
  <IdProjectSection title="${p.title}" icon="${p.icon}">
    <IdProjectCard title="Spatial Studio" description="Next-gen spatial computing workstation." logo="⚡" />
  </IdProjectSection>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdProjectSection title="${p.title}" icon="${p.icon}">
    <IdProjectCard title="Spatial Studio" description="Next-gen spatial computing workstation." logo="⚡" />
  </IdProjectSection>
</template>`,
    htmlCode: (p) => `<div class="id-project-section">
  <h3>${p.icon} ${p.title}</h3>
  <div class="project-card">Spatial Studio</div>
</div>`
  },

  {
    id: 'image-frame',
    name: 'Image Bezel Frame',
    category: 'data',
    description: 'Standalone photo frame component with thick squircle or circular bezel, inset photo shadow, aspect ratios, and hover zoom physics.',
    tags: ['frame', 'photo', 'bezel', 'image', 'portfolio'],
    props: {
      src: { type: 'text', default: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800', description: 'Image source URL.' },
      shape: { type: 'select', options: ['squircle', 'circle'], default: 'squircle', description: 'Frame bezel border radius shape.' },
      aspectRatio: { type: 'select', options: ['1-1', '16-9', '4-3', '3-4'], default: '1-1', description: 'Aspect ratio container proportion.' },
      bezelSize: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Bezel border thickness.' },
      caption: { type: 'text', default: 'Studio Portrait', description: 'Optional image caption.' },
      interactive: { type: 'boolean', default: true, description: 'Enables hover zoom animation.' }
    },
    vueCode: (p) => `<script setup>
import { IdImageFrame } from '@idesign/vue'
<\/script>

<template>
  <IdImageFrame
    src="${p.src}"
    shape="${p.shape}"
    aspect-ratio="${p.aspectRatio}"
    bezel-size="${p.bezelSize}"
    caption="${p.caption}"
    ${p.interactive ? 'interactive' : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdImageFrame
    src="${p.src}"
    shape="${p.shape}"
    aspect-ratio="${p.aspectRatio}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-image-frame shape-${p.shape} aspect-${p.aspectRatio} bezel-${p.bezelSize}">
  <img src="${p.src}" alt="${p.caption}" />
  <span class="caption">${p.caption}</span>
</div>`
  },

  // ─── HARDWARE SHELLS & LAYOUT ───
  {
    id: 'macbook-frame',
    name: 'MacBook Hardware Shell',
    category: 'frames',
    description: 'Hardware MacBook shell container with camera notch, simulated macOS glass menu bar, and responsive screen canvas.',
    tags: ['macbook', 'frame', 'hardware', 'mockup', 'device', 'laptop', 'shell'],
    props: {
      appName: { type: 'text', default: 'Idesign Studio', description: 'Application name displayed in menu bar.' },
      color: { type: 'select', options: ['silver', 'space-gray', 'midnight', 'starlight'], default: 'space-gray', description: 'Anodized aluminum chassis color.' },
      showMenuBar: { type: 'boolean', default: true, description: 'Toggles macOS top menu bar simulation.' }
    },
    vueCode: (p) => `<script setup>
import { IdMacbookFrame } from '@idesign/vue'
<\/script>

<template>
  <IdMacbookFrame app-name="${p.appName}" color="${p.color}" :show-menu-bar="${p.showMenuBar}">
    <div style="padding: 24px; text-align: center;">
      <h3>Inside MacBook Screen</h3>
    </div>
  </IdMacbookFrame>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdMacbookFrame app-name="${p.appName}" color="${p.color}">
    <div>MacBook Canvas</div>
  </IdMacbookFrame>
</template>`,
    htmlCode: (p) => `<div class="id-macbook-frame color-${p.color}">
  <div class="macbook-screen">Content</div>
</div>`
  },

  {
    id: 'ipad-frame',
    name: 'iPad Tablet Shell',
    category: 'frames',
    description: 'Tablet hardware frame with slim bezels, front camera, home bar indicator, and portrait/landscape orientation support.',
    tags: ['ipad', 'tablet', 'frame', 'hardware', 'mockup', 'device', 'shell'],
    props: {
      orientation: { type: 'select', options: ['landscape', 'portrait'], default: 'landscape', description: 'Tablet orientation.' },
      color: { type: 'select', options: ['space-gray', 'silver', 'starlight'], default: 'space-gray', description: 'Chassis finish.' },
      showStatusBar: { type: 'boolean', default: true, description: 'Shows iPadOS status bar.' },
      showHomeBar: { type: 'boolean', default: true, description: 'Shows home indicator bar.' }
    },
    vueCode: (p) => `<script setup>
import { IdIpadFrame } from '@idesign/vue'
<\/script>

<template>
  <IdIpadFrame orientation="${p.orientation}" color="${p.color}">
    <div style="padding: 20px;">Tablet Viewport</div>
  </IdIpadFrame>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdIpadFrame orientation="${p.orientation}" color="${p.color}" />
</template>`,
    htmlCode: (p) => `<div class="id-ipad-frame orientation-${p.orientation}">
  <div class="ipad-screen">Tablet View</div>
</div>`
  },

  {
    id: 'sidebar',
    name: 'Sidebar Navigation Menu',
    category: 'navigation',
    description: 'Collapsible sidebar menu with grouped navigation items, active pill indicators, counter badges, and bottom user drawer.',
    tags: ['sidebar', 'menu', 'navigation', 'drawer', 'nav'],
    props: {
      title: { type: 'text', default: 'Idesign Studio', description: 'Brand title in header.' },
      variant: { type: 'select', options: ['default', 'glass', 'bordered', 'floating'], default: 'default', description: 'Surface treatment.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Navigation size scale.' },
      collapsible: { type: 'boolean', default: true, description: 'Allows collapsing sidebar to icon-only mode.' },
      collapsed: { type: 'boolean', default: false, description: 'Collapsed state.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdSidebar } from '@idesign/vue'

const activeItem = ref('dashboard')
const groups = [
  {
    title: 'Workspace',
    collapsible: true,
    items: [
      { id: 'dashboard', label: 'Overview', icon: '📊' },
      {
        id: 'projects',
        label: 'Projects',
        icon: '📁',
        badge: '12',
        children: [
          { id: 'all-projects', label: 'All Projects' },
          { id: 'archived', label: 'Archived' }
        ]
      },
      { id: 'analytics', label: 'Analytics', icon: '⚡' }
    ]
  },
  {
    title: 'Settings',
    items: [
      { id: 'team', label: 'Team Members', icon: '👥', badge: '3' },
      { id: 'billing', label: 'Billing & Plan', icon: '💳' }
    ]
  }
]
</script>

<template>
  <IdSidebar
    v-model="activeItem"
    title="${p.title}"
    variant="${p.variant}"
    size="${p.size}"
    :collapsible="${p.collapsible}"
    :collapsed="${p.collapsed}"
    :groups="groups"
    :user="{ name: 'Alex Rivera', role: 'Lead Architect' }"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSidebar v-model="activeItem" :groups="groups" />
</template>`,
    htmlCode: (p) => `<aside class="id-sidebar variant-${p.variant}">
  <nav class="sidebar-nav"></nav>
</aside>`
  },

  {
    id: 'header',
    name: 'Semantic Page Header',
    category: 'layout',
    description: 'Structured page header with sticky glass option, title/eyebrow, breadcrumbs, search slot, and action buttons.',
    tags: ['header', 'topbar', 'title', 'layout', 'navbar'],
    props: {
      title: { type: 'text', default: 'Workspace Overview', description: 'Primary page header title.' },
      eyebrow: { type: 'text', default: 'ANALYTICS', description: 'Uppercase eyebrow badge label.' },
      subtitle: { type: 'text', default: 'Real-time telemetry and cluster operations.', description: 'Header description caption.' },
      variant: { type: 'select', options: ['default', 'glass', 'transparent'], default: 'glass', description: 'Surface visual style.' },
      sticky: { type: 'boolean', default: false, description: 'Enables sticky positioning at top.' }
    },
    vueCode: (p) => `<script setup>
import { IdHeader, IdButton } from '@idesign/vue'
<\/script>

<template>
  <IdHeader
    title="${p.title}"
    eyebrow="${p.eyebrow}"
    subtitle="${p.subtitle}"
    variant="${p.variant}"
    ${p.sticky ? 'sticky' : ''}
  >
    <template #actions>
      <IdButton variant="secondary" size="sm">Export</IdButton>
      <IdButton variant="primary" size="sm">Create +</IdButton>
    </template>
  </IdHeader>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdHeader title="${p.title}" subtitle="${p.subtitle}" />
</template>`,
    htmlCode: (p) => `<header class="id-header variant-${p.variant}">
  <h1>${p.title}</h1>
</header>`
  },

  {
    id: 'footer',
    name: 'Semantic Page Footer',
    category: 'layout',
    description: 'Page footer with columns, copyright, language selector, and social link buttons.',
    tags: ['footer', 'layout', 'links', 'copyright', 'bottom'],
    props: {
      variant: { type: 'select', options: ['default', 'glass', 'muted'], default: 'default', description: 'Surface variant.' },
      countryText: { type: 'text', default: 'United States', description: 'Localized region label.' }
    },
    vueCode: (p) => `<script setup>
import { IdFooter } from '@idesign/vue'

const columns = [
  { title: 'Product', links: [{ label: 'Features' }, { label: 'Components' }, { label: 'Templates' }] },
  { title: 'Resources', links: [{ label: 'Documentation' }, { label: 'Design Tokens' }, { label: 'GitHub' }] }
]
<\/script>

<template>
  <IdFooter :columns="columns" variant="${p.variant}" country-text="${p.countryText}" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdFooter :columns="columns" />
</template>`,
    htmlCode: (p) => `<footer class="id-footer variant-${p.variant}">
  <div class="footer-inner"></div>
</footer>`
  },

  {
    id: 'banner',
    name: 'Announcement Banner',
    category: 'feedback',
    description: 'Prominent announcement banner with variants, action button, and dismissible close button.',
    tags: ['banner', 'alert', 'announcement', 'notification', 'cta'],
    props: {
      message: { type: 'text', default: 'Idesign v2.0 is now live with 60+ Liquid Glass components!', description: 'Banner announcement message.' },
      actionLabel: { type: 'text', default: 'Learn More →', description: 'Call to action button text.' },
      icon: { type: 'text', default: '✨', description: 'Leading emoji or symbol.' },
      variant: { type: 'select', options: ['accent', 'glass', 'warning', 'success', 'rainbow-glow'], default: 'accent', description: 'Banner color variant.' },
      dismissible: { type: 'boolean', default: true, description: 'Shows close dismiss button.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdBanner } from '@idesign/vue'

const showBanner = ref(true)
<\/script>

<template>
  <IdBanner
    v-model="showBanner"
    message="${p.message}"
    action-label="${p.actionLabel}"
    icon="${p.icon}"
    variant="${p.variant}"
    :dismissible="${p.dismissible}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdBanner message="${p.message}" variant="${p.variant}" />
</template>`,
    htmlCode: (p) => `<div class="id-banner variant-${p.variant}">
  <span>${p.message}</span>
</div>`
  },

  {
    id: 'separator',
    name: 'Hairline Separator & Divider',
    category: 'layout',
    description: 'Hairline decorative and semantic divider with horizontal/vertical orientations and optional center label.',
    tags: ['separator', 'divider', 'line', 'hairline', 'split'],
    props: {
      orientation: { type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal', description: 'Separator orientation.' },
      label: { type: 'text', default: 'OR', description: 'Optional center label text.' },
      variant: { type: 'select', options: ['hairline', 'faint', 'gradient', 'dashed'], default: 'hairline', description: 'Divider styling.' },
      spacing: { type: 'select', options: ['none', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Margin spacing.' }
    },
    vueCode: (p) => `<script setup>
import { IdSeparator } from '@idesign/vue'
<\/script>

<template>
  <IdSeparator
    orientation="${p.orientation}"
    label="${p.label}"
    variant="${p.variant}"
    spacing="${p.spacing}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdSeparator label="${p.label}" />
</template>`,
    htmlCode: (p) => `<div class="id-separator orientation-${p.orientation} variant-${p.variant}">
  <span>${p.label}</span>
</div>`
  },

  {
    id: 'kbd',
    name: 'Keyboard Shortcut Chip (Kbd)',
    category: 'data',
    description: 'Keyboard shortcut badge supporting macOS symbol formatting (cmd, shift, opt, ctrl, enter, esc).',
    tags: ['kbd', 'keyboard', 'shortcut', 'key', 'hotkey'],
    props: {
      keys: { type: 'text', default: 'cmd+k', description: 'Shortcut combination string (e.g. cmd+k, opt+shift+p).' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg'], default: 'md', description: 'Key size scale.' },
      variant: { type: 'select', options: ['default', 'glass', 'outline'], default: 'default', description: 'Visual styling.' }
    },
    vueCode: (p) => `<script setup>
import { IdKbd } from '@idesign/vue'
<\/script>

<template>
  <IdKbd keys="${p.keys}" size="${p.size}" variant="${p.variant}" />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdKbd keys="${p.keys}" />
</template>`,
    htmlCode: (p) => `<kbd class="id-kbd size-${p.size}">⌘K</kbd>`
  },

  // ─── ADVANCED FORM INPUTS ───
  {
    id: 'pin-input',
    name: 'PIN & OTP Code Input',
    category: 'forms',
    description: 'Multi-box verification code input with auto-advance, backspace navigation, paste handling, individual box & full clearing, masked mode, and separator groups.',
    tags: ['pin', 'otp', 'verification', 'code', 'auth', 'input', 'paste', 'clear'],
    props: {
      length: { type: 'number', default: 6, description: 'Number of PIN digit boxes.' },
      type: { type: 'select', options: ['numeric', 'alphanumeric', 'alpha', 'any'], default: 'numeric', description: 'Character validation type.' },
      size: { type: 'select', options: ['sm', 'md', 'lg', 'xl'], default: 'md', description: 'Box sizing scale.' },
      masked: { type: 'boolean', default: false, description: 'Masks digits with dots for password protection.' },
      separator: { type: 'boolean', default: false, description: 'Inserts visual separator between digit groups.' },
      label: { type: 'text', default: 'Verification Code', description: 'Form field label.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdPinInput } from '@idesign/vue'

const code = ref('')
const onComplete = (val) => console.log('PIN completed:', val)
<\/script>

<template>
  <IdPinInput
    v-model="code"
    :length="${p.length}"
    type="${p.type}"
    size="${p.size}"
    :masked="${p.masked}"
    :separator="${p.separator}"
    label="${p.label}"
    @complete="onComplete"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdPinInput v-model="code" :length="${p.length}" />
</template>`,
    htmlCode: (p) => `<div class="id-pin-input size-${p.size}">
  <input class="pin-digit-input" maxlength="1" />
</div>`
  },

  {
    id: 'time-picker',
    name: 'Time Input & Stepper',
    category: 'forms',
    description: 'Precision Liquid Glass time input control combining editable segments (hours, minutes, seconds, AM/PM) with synchronized horizontal or vertical steppers, continuous-hold repeat, bounds, and full variant support.',
    tags: ['time', 'picker', 'clock', 'hour', 'minute', 'second', 'stepper', 'input', 'schedule'],
    props: {
      label: { type: 'text', default: 'Meeting Start Time', description: 'Form field label.' },
      variant: { type: 'select', options: ['default', 'glass', 'subtle', 'ghost', 'outline', 'pill'], default: 'default', description: 'Visual surface style.' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Component height and font scale.' },
      direction: { type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal', description: 'Stepper controls layout.' },
      radius: { type: 'select', options: ['none', 'sm', 'md', 'lg', 'full'], default: 'full', description: 'Corner radius semantic tier.' },
      color: { type: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'], default: 'default', description: 'Accent focus color.' },
      is24Hour: { type: 'boolean', default: false, description: 'Toggles between 12-hour AM/PM and 24-hour mode.' },
      showSeconds: { type: 'boolean', default: false, description: 'Enables seconds precision segment.' },
      minuteStep: { type: 'number', default: 5, description: 'Minute stepping interval (e.g. 1, 5, 15, 30).' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdTimePicker } from '@idesign/vue'

const meetingTime = ref('09:41 AM')
<\/script>

<template>
  <IdTimePicker
    v-model="meetingTime"
    label="${p.label}"
    variant="${p.variant || 'default'}"
    size="${p.size || 'md'}"
    direction="${p.direction || 'horizontal'}"
    radius="${p.radius || 'full'}"
    color="${p.color || 'default'}"
    ${p.is24Hour ? 'is-24-hour\n    ' : ''}${p.showSeconds ? 'show-seconds\n    ' : ''}:minute-step="${p.minuteStep || 5}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdTimePicker v-model="meetingTime" label="${p.label}" variant="${p.variant || 'default'}" direction="${p.direction || 'horizontal'}" />
</template>`,
    htmlCode: (p) => `<div class="id-time-picker-group size-${p.size || 'md'} direction-${p.direction || 'horizontal'} variant-${p.variant || 'default'}">
  <label class="time-label">${p.label}</label>
  <div class="time-stepper-box is-${p.direction || 'horizontal'}">
    <button class="stepper-btn decrement" aria-label="Decrement">−</button>
    <div class="time-value-wrapper">
      <div class="time-segments">
        <input class="time-unit-input hour" value="09" />
        <span class="time-separator">:</span>
        <input class="time-unit-input minute" value="41" />
      </div>
      <div class="time-period-toggle">
        <button class="period-btn active">AM</button>
        <button class="period-btn">PM</button>
      </div>
    </div>
    <button class="stepper-btn increment" aria-label="Increment">+</button>
  </div>
</div>`
  },

  {
    id: 'tag-input',
    name: 'Tag & Pill Creator Input',
    category: 'forms',
    description: 'Compact Liquid Glass inline tag & pill creator input with Enter/Comma addition, backspace deletion, duplicate prevention, overflow handling, and customizable ui system.',
    tags: ['tags', 'chips', 'pills', 'tokens', 'input', 'creator', 'badge'],
    props: {
      label: { type: 'text', default: 'Project Tags', description: 'Form field label.' },
      placeholder: { type: 'text', default: 'Add tag...', description: 'Input placeholder.' },
      tagVariant: { type: 'select', options: ['default', 'accent', 'heat', 'live', 'gray', 'warning', 'danger', 'mono'], default: 'accent', description: 'Tag chip color variant.' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Input sizing.' },
      clearable: { type: 'boolean', default: false, description: 'Shows clear all tags action.' },
      allowDuplicates: { type: 'boolean', default: false, description: 'Allows duplicate tags.' },
      loading: { type: 'boolean', default: false, description: 'Loading spinner state.' },
      disabled: { type: 'boolean', default: false, description: 'Disables user input.' },
      readonly: { type: 'boolean', default: false, description: 'Readonly presentation state.' },
      errorText: { type: 'text', default: '', description: 'Validation error message.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdTagInput } from '@idesign/vue'

const tags = ref(['Design', 'Vue3', 'LiquidGlass'])
<\/script>

<template>
  <IdTagInput
    v-model="tags"
    label="${p.label}"
    placeholder="${p.placeholder}"
    tag-variant="${p.tagVariant}"
    size="${p.size}"${p.clearable ? '\n    clearable' : ''}${p.allowDuplicates ? '\n    allow-duplicates' : ''}${p.loading ? '\n    loading' : ''}${p.disabled ? '\n    disabled' : ''}${p.readonly ? '\n    readonly' : ''}${p.errorText ? `\n    error-text="${p.errorText}"` : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<script setup>
const tags = ref(['Design', 'Vue3', 'LiquidGlass'])
<\/script>

<template>
  <IdTagInput
    v-model="tags"
    label="${p.label}"
    tag-variant="${p.tagVariant}"
    size="${p.size}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-tag-input size-${p.size}">
  <label class="tag-input-label">${p.label}</label>
  <div class="tag-input-box">
    <div class="tags-list">
      <span class="tag-pill variant-${p.tagVariant}">
        <span class="tag-text">Design</span>
        <button class="tag-remove-btn" type="button" aria-label="Remove Design">×</button>
      </span>
    </div>
    <input type="text" class="tag-native-input" placeholder="${p.placeholder}" />
  </div>
</div>`
  },

  {
    id: 'rating',
    name: 'Interactive Star Rating',
    category: 'forms',
    description: 'Apple-grade interactive star rating component with hover preview, half-star precision, customizable colors, keyboard navigation, and full UI customization.',
    tags: ['rating', 'stars', 'review', 'feedback', 'score', 'input', 'half-star'],
    props: {
      modelValue: { type: 'number', default: 4, description: 'Current rating value.' },
      label: { type: 'text', default: 'Customer Satisfaction', description: 'Rating field label.' },
      max: { type: 'number', default: 5, description: 'Total number of stars.' },
      allowHalf: { type: 'boolean', default: true, description: 'Enables 0.5 step fractional ratings.' },
      clearable: { type: 'boolean', default: true, description: 'Allows clearing rating on second click.' },
      showScore: { type: 'boolean', default: true, description: 'Displays numeric score alongside stars.' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Star icon sizing.' },
      color: { type: 'select', options: ['amber', 'blue', 'green', 'red', 'orange', 'purple'], default: 'amber', description: 'Active star color token.' },
      disabled: { type: 'boolean', default: false, description: 'Disables rating control.' },
      readonly: { type: 'boolean', default: false, description: 'Readonly display mode.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdRating } from '@idesign/vue'

const ratingScore = ref(4)
<\/script>

<template>
  <IdRating
    v-model="ratingScore"
    label="${p.label || 'Customer Satisfaction'}"
    :max="${p.max || 5}"
    :allow-half="${p.allowHalf !== false}"
    :clearable="${p.clearable !== false}"
    :show-score="${p.showScore !== false}"
    size="${p.size || 'md'}"
    color="${p.color || 'amber'}"
    :disabled="${p.disabled || false}"
    :readonly="${p.readonly || false}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdRating v-model="ratingScore" :allow-half="true" show-score />
</template>`,
    htmlCode: (p) => `<div class="id-rating size-md color-amber">
  <label class="rating-label">Customer Satisfaction</label>
  <div class="rating-body">
    <div class="stars-row">
      <button class="star-btn is-filled">★</button>
      <button class="star-btn is-filled">★</button>
      <button class="star-btn is-filled">★</button>
      <button class="star-btn is-filled">★</button>
      <button class="star-btn is-empty">★</button>
    </div>
    <span class="rating-score">4 / 5</span>
  </div>
</div>`
  },

  {
    id: 'number-input',
    name: 'Numeric Stepper Input',
    category: 'forms',
    description: 'Precision Apple-inspired numeric stepper with editable center input, horizontal & vertical layouts, continuous hold-to-repeat, min/max limits, step precision, prefix/suffix affixes, and ui customization.',
    tags: ['number', 'stepper', 'counter', 'quantity', 'spin', 'input', 'numeric'],
    props: {
      modelValue: { type: 'number', default: 16, description: 'Current numeric value.' },
      label: { type: 'text', default: 'Border Radius', description: 'Field label.' },
      unit: { type: 'text', default: 'px', description: 'Unit suffix label (e.g. px, %, ms, kg).' },
      prefix: { type: 'text', default: '', description: 'Optional prefix string or symbol (e.g. $).' },
      step: { type: 'number', default: 2, description: 'Increment/decrement step size.' },
      min: { type: 'number', default: 0, description: 'Minimum allowed value.' },
      max: { type: 'number', default: 100, description: 'Maximum allowed value.' },
      variant: { type: 'select', options: ['default', 'glass', 'subtle', 'ghost', 'outline', 'pill'], default: 'default', description: 'Visual surface style.' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Component sizing.' },
      direction: { type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal', description: 'Layout orientation.' },
      radius: { type: 'select', options: ['none', 'sm', 'md', 'lg', 'full'], default: 'full', description: 'Corner radius tier.' },
      color: { type: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'], default: 'default', description: 'Accent color.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdNumberInput } from '@idesign/vue'

const count = ref(16)
<\/script>

<template>
  <IdNumberInput
    v-model="count"
    label="${p.label}"
    variant="${p.variant || 'default'}"
    size="${p.size || 'md'}"
    direction="${p.direction || 'horizontal'}"
    radius="${p.radius || 'full'}"
    color="${p.color || 'default'}"
    ${p.prefix ? `prefix="${p.prefix}"\n    ` : ''}${p.unit ? `unit="${p.unit}"\n    ` : ''}:step="${p.step || 2}"
    :min="${p.min || 0}"
    :max="${p.max || 100}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdNumberInput v-model="count" variant="${p.variant || 'default'}" direction="${p.direction || 'horizontal'}" unit="${p.unit || 'px'}" />
</template>`,
    htmlCode: (p) => `<div class="id-number-input-group size-${p.size || 'md'} direction-${p.direction || 'horizontal'} variant-${p.variant || 'default'}">
  <div class="number-stepper-box is-${p.direction || 'horizontal'}">
    <button class="stepper-btn decrement" aria-label="Decrement">−</button>
    <div class="number-value-wrapper">
      <input type="text" class="number-native-input" value="16" />
      <span class="number-affix unit">px</span>
    </div>
    <button class="stepper-btn increment" aria-label="Increment">+</button>
  </div>
</div>`
  },

  {
    id: 'color-picker',
    name: 'Visual Color Picker',
    category: 'forms',
    description: 'Premier Liquid Glass visual color picker with 2D saturation/brightness spectrum, continuous hue and alpha sliders, multi-format inputs (HEX, RGB, HSL, HSV), palette grid, and eyedropper.',
    tags: ['color', 'picker', 'palette', 'swatch', 'hex', 'rgb', 'hsl', 'spectrum', 'input'],
    props: {
      label: { type: 'text', default: 'Accent Color', description: 'Field label.' },
      mode: { type: 'select', options: ['spectrum', 'grid', 'sliders'], default: 'spectrum', description: 'Picker layout mode.' },
      format: { type: 'select', options: ['auto', 'hex', 'rgb', 'hsl', 'hsv'], default: 'auto', description: 'Color output format.' },
      size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', description: 'Picker sizing tier.' },
      inline: { type: 'boolean', default: false, description: 'Render directly inline instead of floating popover.' },
      opacity: { type: 'boolean', default: true, description: 'Enable alpha/opacity channel.' }
    },
    vueCode: (p) => `<script setup>
import { ref } from 'vue'
import { IdColorPicker } from '@idesign/vue'

const brandColor = ref('#0071E3')
<\/script>

<template>
  <IdColorPicker
    v-model="brandColor"
    label="${p.label}"
    mode="${p.mode}"
    format="${p.format}"
    size="${p.size}"
    :inline="${p.inline}"
    :opacity="${p.opacity}"
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdColorPicker
    v-model="brandColor"
    label="${p.label}"
    mode="${p.mode}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-color-picker-root">
  <label class="picker-label">${p.label}</label>
  <div class="picker-trigger">
    <div class="trigger-swatch-wrapper">
      <div class="swatch-fill" style="background-color: #0071E3;"></div>
    </div>
    <span class="trigger-value-text">#0071E3</span>
  </div>
</div>`
  },

  {
    id: 'wallpaper',
    name: 'Wallpaper & Background Gradient',
    category: 'layout',
    description: 'Apple-grade decorative background and gradient system with presets (solid, gradient, mesh, radial, aurora, glow, noise, image), masks, and full theme customization.',
    tags: ['wallpaper', 'background', 'gradient', 'mesh', 'radial', 'aurora', 'glow', 'noise', 'backdrop', 'hero', 'layout'],
    props: {
      variant: { type: 'select', options: ['gradient', 'mesh', 'radial', 'aurora', 'glow', 'solid', 'noise', 'image'], default: 'gradient', description: 'Background aesthetic preset.' },
      theme: { type: 'select', options: ['auto', 'light', 'dark'], default: 'auto', description: 'Explicit theme override or auto dark mode adaptation.' },
      intensity: { type: 'select', options: ['subtle', 'soft', 'normal', 'vibrant'], default: 'normal', description: 'Color saturation and light/dark mode glow factor.' },
      direction: { type: 'select', options: ['135deg', '180deg', 'to bottom right', 'to bottom', 'to right', '45deg'], default: '135deg', description: 'Linear gradient angle / direction.' },
      mask: { type: 'select', options: ['none', 'fade-bottom', 'fade-top', 'fade-edges', 'radial'], default: 'none', description: 'Alpha gradient mask for seamless hero-to-page transitions.' },
      overlay: { type: 'select', options: ['none', 'vignette', 'scrim', 'frosted', 'dots', 'grid'], default: 'none', description: 'Decorative top texture or backdrop scrim.' },
      animated: { type: 'boolean', default: false, description: 'Gentle ambient motion (respects prefers-reduced-motion).' },
      noise: { type: 'boolean', default: false, description: 'Micro-texture grain overlay.' }
    },
    vueCode: (p) => `<script setup>
import { IdWallpaper } from '@idesign/vue'
<\/script>

<template>
  <IdWallpaper
    variant="${p.variant}"
    intensity="${p.intensity}"
    direction="${p.direction}"
    mask="${p.mask}"
    overlay="${p.overlay}"
    :animated="${p.animated}"
    :noise="${p.noise}"
  >
    <!-- Foreground content -->
    <div style="padding: 48px 24px; text-align: center;">
      <h1 style="font-size: 32px; font-weight: 700; letter-spacing: -0.025em; margin: 0 0 12px;">Spatial Interfaces</h1>
      <p style="color: var(--text-2); max-width: 520px; margin: 0 auto;">Subtle, Apple-inspired ambient backgrounds designed with restraint.</p>
    </div>
  </IdWallpaper>
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import -->
<template>
  <IdWallpaper variant="${p.variant}" intensity="${p.intensity}" mask="${p.mask}">
    <slot />
  </IdWallpaper>
</template>`,
    htmlCode: (p) => `<div class="id-wallpaper-root mask-${p.mask}">
  <div class="id-wallpaper-canvas variant-${p.variant}"></div>
  <div class="id-wallpaper-content">...</div>
</div>`
  },

  {
    id: 'qr-code',
    name: 'QR Code Generator',
    category: 'data',
    description: 'High-precision, vector SVG QR code generator with Apple Liquid Glass styling, customizable error correction (L/M/Q/H), center logo badges, dark mode adaptability, and Retina-sharp scanning reliability.',
    tags: ['qr', 'qrcode', 'barcode', 'generator', 'scan', 'camera', 'svg', 'matrix', 'data', 'link'],
    props: {
      value: { type: 'text', default: 'https://idesign.io', description: 'URL, text, or payload string to encode into the QR matrix.' },
      variant: { type: 'select', options: ['default', 'rounded', 'minimal', 'glass'], default: 'default', description: 'Visual surface aesthetic variant.' },
      size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md', description: 'Size preset (xs: 120px, sm: 160px, md: 200px, lg: 260px, xl: 320px) or custom pixel number.' },
      errorCorrection: { type: 'select', options: ['L', 'M', 'Q', 'H'], default: 'M', description: 'Reed-Solomon Error Correction Level (L: 7%, M: 15%, Q: 25%, H: 30%).' },
      margin: { type: 'number', default: 2, description: 'Quiet zone margin padding modules surrounding the matrix.' },
      label: { type: 'text', default: 'Scan with Camera', description: 'Optional primary label heading.' },
      caption: { type: 'text', default: 'Point your iPhone camera at this code to open.', description: 'Optional secondary descriptive caption.' },
      logo: { type: 'boolean', default: false, description: 'Embed a center icon or logo badge with safe quiet cutout.' },
      downloadable: { type: 'boolean', default: true, description: 'Show quick SVG download action button.' },
      disabled: { type: 'boolean', default: false, description: 'Visually dim the QR code with accessible aria-disabled state.' }
    },
    vueCode: (p) => `<script setup>
import { IdQRCode } from '@idesign/vue'
<\/script>

<template>
  <IdQRCode
    value="${p.value || 'https://idesign.io'}"
    variant="${p.variant || 'default'}"
    size="${p.size || 'md'}"
    error-correction="${p.errorCorrection || 'M'}"
    :margin="${p.margin ?? 2}"${p.label ? `\n    label="${p.label}"` : ''}${p.caption ? `\n    caption="${p.caption}"` : ''}${p.logo ? `\n    logo-src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80"` : ''}${p.downloadable ? `\n    :downloadable="true"` : ''}${p.disabled ? `\n    :disabled="true"` : ''}
  />
</template>`,
    nuxtCode: (p) => `<!-- Nuxt 3 Auto-Import (Zero imports required) -->
<template>
  <IdQRCode
    value="${p.value || 'https://idesign.io'}"
    variant="${p.variant || 'default'}"
    size="${p.size || 'md'}"
    error-correction="${p.errorCorrection || 'M'}"
    label="${p.label || 'Scan with Camera'}"
  />
</template>`,
    htmlCode: (p) => `<div class="id-qr-code variant-${p.variant || 'default'} size-${p.size || 'md'}" role="img" aria-label="QR Code">
  <div class="qr-frame">
    <svg class="qr-svg" viewBox="0 0 250 250">
      <!-- High-contrast vector modules -->
      <path d="..." fill="currentColor" />
    </svg>
  </div>
  <div class="qr-meta-box">
    <span class="qr-label-text">${p.label || 'Scan with Camera'}</span>
    <span class="qr-caption-text">${p.caption || 'Point your camera'}</span>
  </div>
</div>`
  }
]


