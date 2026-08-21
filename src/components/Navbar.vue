<template>
  <header class="glass-nav main-navbar">
    <div class="nav-container">
      <a href="#" class="brand" @click.prevent="$emit('navigate', 'home')">
        <div class="brand-badge">
          <img src="/icon.png" alt="Idesign Logo" class="brand-logo-img" />
        </div>
        <div class="brand-text">
          <span class="name">Idesign</span>
          <span class="badge-vue">Vue 3 / Nuxt 3</span>
        </div>
      </a>

      <!-- Functional Desktop Search Bar -->
      <div class="search-input-wrap desktop-search">
        <Search :size="15" class="nav-search-icon" />
        <input
          ref="searchInputRef"
          :value="searchQuery"
          type="text"
          placeholder="Search 60+ components..."
          class="nav-search-input"
          @input="$emit('update:searchQuery', $event.target.value)"
        />
        <button v-if="searchQuery" type="button" class="clear-btn" aria-label="Clear search" @click="$emit('update:searchQuery', '')">
          <X :size="14" />
        </button>
        <kbd v-else class="shortcut-kbd">⌘K</kbd>
      </div>

      <!-- Desktop Nav Actions -->
      <div class="nav-actions desktop-actions">
        <button type="button" class="nav-btn-link" @click="$emit('open-tokens')">
          <Sliders :size="15" />
          UI Guidelines & Tokens
        </button>

        <IdThemeToggle
          variant="button"
          size="sm"
          transition-effect="reveal"
        />

        <button type="button" class="cli-btn" @click="$emit('open-install')">
          <Terminal :size="15" />
          Install CLI
        </button>
      </div>

      <!-- Mobile Hamburger Button -->
      <button
        type="button"
        class="mobile-hamburger-btn"
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle Navigation Menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <X v-if="mobileMenuOpen" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </div>

    <!-- Mobile Slide-over Drawer -->
    <Teleport to="body">
      <Transition name="drawer-fade">
        <div
          v-if="mobileMenuOpen"
          class="mobile-drawer-backdrop"
          @click="mobileMenuOpen = false"
        />
      </Transition>

      <Transition name="drawer-slide">
        <aside
          v-if="mobileMenuOpen"
          class="mobile-drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <!-- Drawer Header -->
          <div class="drawer-header">
            <div class="drawer-brand">
              <div class="brand-badge">
                <img src="/icon.png" alt="Idesign Logo" class="brand-logo-img" />
              </div>
              <span class="brand-name">Idesign</span>
              <span class="drawer-badge">Vue 3 / Nuxt 3</span>
            </div>
            <button
              type="button"
              class="drawer-close-btn"
              aria-label="Close menu"
              @click="mobileMenuOpen = false"
            >
              <X :size="18" />
            </button>
          </div>

          <!-- Mobile Search Bar Section -->
          <div class="drawer-section search-section">
            <div class="search-input-wrap mobile-search">
              <Search :size="15" class="nav-search-icon" />
              <input
                :value="searchQuery"
                type="text"
                placeholder="Search 60+ components..."
                class="nav-search-input"
                @input="$emit('update:searchQuery', $event.target.value)"
              />
              <button v-if="searchQuery" type="button" class="clear-btn" aria-label="Clear search" @click="$emit('update:searchQuery', '')">
                <X :size="14" />
              </button>
            </div>
          </div>

          <!-- Drawer Body Content -->
          <div class="drawer-content">
            <!-- Group 1: Navigation Features -->
            <div class="drawer-group">
              <div class="drawer-group-title">NAVIGATION</div>
              <div class="drawer-list">
                <button type="button" class="drawer-list-row" @click="triggerMobileAction('navigate-home')">
                  <div class="row-icon-box blue">
                    <Grid :size="16" />
                  </div>
                  <div class="row-content">
                    <span class="row-title">Component Catalog</span>
                    <span class="row-sub">Browse 60+ Vue 3 SFC components</span>
                  </div>
                  <ChevronRight :size="15" class="row-arrow" />
                </button>

                <button type="button" class="drawer-list-row" @click="triggerMobileAction('open-tokens')">
                  <div class="row-icon-box purple">
                    <Sliders :size="16" />
                  </div>
                  <div class="row-content">
                    <span class="row-title">UI Guidelines & Tokens</span>
                    <span class="row-sub">Inspect color, motion & typography</span>
                  </div>
                  <ChevronRight :size="15" class="row-arrow" />
                </button>

                <button type="button" class="drawer-list-row" @click="triggerMobileAction('open-mobile-demo')">
                  <div class="row-icon-box green">
                    <Smartphone :size="16" />
                  </div>
                  <div class="row-content">
                    <span class="row-title">iOS Shell Simulator</span>
                    <span class="row-sub">Preview native mobile frames</span>
                  </div>
                  <ChevronRight :size="15" class="row-arrow" />
                </button>
              </div>
            </div>

            <!-- Group 2: Quick Jump Categories -->
            <div class="drawer-group">
              <div class="drawer-group-title">QUICK CATEGORIES</div>
              <div class="drawer-pills-grid">
                <button
                  v-for="cat in quickCategories"
                  :key="cat.id"
                  type="button"
                  :class="['drawer-pill-item', { active: cat.id === activeCategory }]"
                  @click="selectQuickCategory(cat.id)"
                >
                  {{ cat.label }}
                </button>
              </div>
            </div>

            <!-- Group 3: Preferences & Setup -->
            <div class="drawer-group">
              <div class="drawer-group-title">PREFERENCES & SETUP</div>
              <div class="drawer-list">
                <button type="button" class="drawer-list-row" @click="toggleDarkMode">
                  <div class="row-icon-box amber">
                    <Sun v-if="isDark" :size="16" />
                    <Moon v-else :size="16" />
                  </div>
                  <div class="row-content">
                    <span class="row-title">Appearance</span>
                    <span class="row-sub">Switch between Light and Dark mode</span>
                  </div>
                  <span class="theme-badge-pill">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
                </button>

                <button type="button" class="drawer-list-row primary-row" @click="triggerMobileAction('open-install')">
                  <div class="row-icon-box primary">
                    <Terminal :size="16" />
                  </div>
                  <div class="row-content">
                    <span class="row-title">Install CLI & Setup</span>
                    <span class="row-sub">Run `npx @idesign/cli init`</span>
                  </div>
                  <ChevronRight :size="15" class="row-arrow" />
                </button>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="drawer-footer">
            <span class="drawer-footer-text">Idesign Liquid Glass System • Vue 3 & Nuxt 3</span>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import {
  Search,
  Sliders,
  Sun,
  Moon,
  Terminal,
  X,
  Menu,
  Grid,
  Smartphone,
  ChevronRight,
  Sparkles
} from '@lucide/vue'
import IdThemeToggle from './idesign/IdThemeToggle.vue'
import { useTheme } from '../composables/useTheme'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  activeCategory: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits([
  'navigate',
  'update:searchQuery',
  'select-category',
  'open-tokens',
  'open-mobile-demo',
  'open-install'
])

const searchInputRef = ref(null)
const mobileMenuOpen = ref(false)

const themeEngine = useTheme()
const isDark = themeEngine.isDark

const quickCategories = [
  { id: 'all', label: 'All' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'mobile', label: 'Mobile Shell' },
  { id: 'inputs', label: 'Form Inputs' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'panels', label: 'Panels & Cards' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'indicators', label: 'Indicators' },
  { id: 'data', label: 'Data Display' },
  { id: 'layout', label: 'Layout' },
  { id: 'templates', label: 'Templates' }
]

const selectQuickCategory = (catId) => {
  mobileMenuOpen.value = false
  emit('select-category', catId)
  if (typeof document !== 'undefined') {
    const el = document.getElementById('components')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const triggerMobileAction = (eventName) => {
  mobileMenuOpen.value = false
  if (eventName === 'navigate-home') {
    emit('navigate', 'home')
  } else {
    emit(eventName)
  }
}

const focusSearch = () => {
  if (searchInputRef.value) {
    searchInputRef.value.focus()
  }
}

defineExpose({ focusSearch })

const toggleDarkMode = (event) => {
  themeEngine.toggleTheme(event)
}

// Lock body scrolling when drawer is active
watch(mobileMenuOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.main-navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
}

.nav-container {
  max-width: var(--max-grid);
  margin: 0 auto;
  padding: 0 var(--pad-x);
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
}

.brand-badge {
  width: 32px;
  height: 32px;
  border-radius: var(--r-chip);
  background: var(--text);
  color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.brand-logo-img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.brand-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-text .name {
  font-size: 17px;
  font-weight: 750;
  letter-spacing: -0.02em;
}

.badge-vue {
  font-size: 10.5px;
  font-weight: 600;
  background: rgba(48, 209, 88, 0.12);
  color: #248a3d;
  padding: 2px 7px;
  border-radius: var(--r-pill);
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-pill);
  padding: 0 12px;
  color: var(--text-3);
  height: 38px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: var(--sh-card);
}

.desktop-search {
  width: 320px;
}

.search-input-wrap:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.15);
}

.nav-search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font);
  font-size: 13.5px;
  color: var(--text);
  min-width: 0;
}

.nav-search-input::placeholder {
  color: var(--text-4);
}

.clear-btn {
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--text-3);
  cursor: pointer;
  padding: 0 4px;
}

.clear-btn:hover {
  color: var(--text);
}

.shortcut-kbd {
  font-family: var(--mono);
  font-size: 11px;
  background: var(--hover);
  border: 1px solid var(--hairline);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--text-3);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-btn-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  font-family: var(--font);
  font-size: 13.5px;
  font-weight: 550;
  color: var(--text-2);
  padding: 6px 12px;
  border-radius: var(--r-pill);
  cursor: pointer;
  transition: all 0.15s ease;
}

.nav-btn-link:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text);
}

.theme-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid var(--hairline);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  padding: 6px 12px;
  border-radius: var(--r-pill);
  cursor: pointer;
  transition: all 0.15s ease;
}

.theme-toggle-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.15);
}

.cli-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  border-radius: var(--r-pill);
  background: var(--accent);
  color: #ffffff;
  font-family: var(--font);
  font-size: 13.5px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}

.cli-btn:hover {
  background: #0062c4;
}

.cli-btn:active {
  transform: scale(0.97);
}

/* Mobile Hamburger */
.mobile-hamburger-btn {
  display: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--hairline);
  background: var(--surface);
  color: var(--text);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;
}

.mobile-hamburger-btn:hover {
  background: var(--hover);
}

/* Mobile Slide-over Drawer Backdrop & Panel */
.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.mobile-drawer-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  max-width: 360px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: saturate(180%) blur(28px);
  -webkit-backdrop-filter: saturate(180%) blur(28px);
  border-left: 1px solid var(--hairline);
  box-shadow: var(--sh-overlay);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  font-family: var(--font);
}

:root.dark .mobile-drawer-panel {
  background: rgba(28, 28, 30, 0.92);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--hairline);
}

.drawer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.drawer-brand .brand-name {
  font-size: 17px;
  font-weight: 750;
  letter-spacing: -0.02em;
  color: var(--text);
}

.drawer-badge {
  font-size: 10.5px;
  font-weight: 600;
  background: rgba(48, 209, 88, 0.12);
  color: #248a3d;
  padding: 2px 7px;
  border-radius: var(--r-pill);
}

.drawer-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--hairline);
  background: var(--surface);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;
}

.drawer-close-btn:hover {
  background: var(--hover);
}

.drawer-section {
  padding: 14px 20px 0 20px;
}

.mobile-search {
  width: 100%;
}

.drawer-content {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.drawer-group-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-3);
  margin-bottom: 8px;
  padding-left: 4px;
}

.drawer-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.drawer-list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  color: var(--text);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.drawer-list-row:hover {
  background: var(--hover);
  transform: translateY(-1px);
}

.drawer-list-row:active {
  transform: scale(0.98);
}

.drawer-list-row.primary-row {
  background: rgba(0, 113, 227, 0.06);
  border-color: rgba(0, 113, 227, 0.2);
}

.drawer-list-row.primary-row:hover {
  background: rgba(0, 113, 227, 0.1);
}

.row-icon-box {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.row-icon-box.blue { background: rgba(0, 122, 255, 0.12); color: #007aff; }
.row-icon-box.purple { background: rgba(175, 82, 222, 0.12); color: #af52de; }
.row-icon-box.green { background: rgba(52, 199, 89, 0.12); color: #34c759; }
.row-icon-box.amber { background: rgba(255, 149, 0, 0.12); color: #ff9500; }
.row-icon-box.primary { background: var(--accent); color: #ffffff; }

.row-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.row-title {
  font-size: 13.5px;
  font-weight: 650;
  color: var(--text);
  line-height: 1.2;
}

.row-sub {
  font-size: 11.5px;
  color: var(--text-3);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-arrow {
  color: var(--text-3);
  flex-shrink: 0;
}

.theme-badge-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: var(--r-pill);
  background: var(--hover);
  color: var(--text-2);
  border: 1px solid var(--hairline);
}

.drawer-pills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.drawer-pill-item {
  font-size: 12px;
  font-weight: 550;
  padding: 6px 12px;
  border-radius: var(--r-pill);
  background: var(--surface);
  border: 1px solid var(--hairline);
  color: var(--text-2);
  text-decoration: none;
  transition: all 0.15s ease;
}

.drawer-pill-item:hover {
  background: var(--hover);
  color: var(--text);
  border-color: var(--accent);
}

.drawer-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--hairline);
  text-align: center;
}

.drawer-footer-text {
  font-size: 11.5px;
  color: var(--text-3);
}

/* Responsive Media Queries */
@media (max-width: 840px) {
  .desktop-search,
  .desktop-actions {
    display: none;
  }
  .mobile-hamburger-btn {
    display: flex;
  }
}

@media (max-width: 480px) {
  .badge-vue {
    display: none;
  }
}

/* Animations */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
  opacity: 0.9;
}
</style>
