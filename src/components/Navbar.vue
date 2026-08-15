<template>
  <header class="glass-nav main-navbar">
    <div class="nav-container">
      <a href="#" class="brand" @click.prevent="$emit('navigate', 'home')">
        <div class="brand-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
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
          Tokens & Rules
        </button>

        <button type="button" class="theme-toggle-btn" aria-label="Toggle Dark Mode" @click="toggleDarkMode">
          <Sun v-if="isDark" :size="15" />
          <Moon v-else :size="15" />
          {{ isDark ? 'Light' : 'Dark' }}
        </button>

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

    <!-- Mobile Dropdown Menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-nav-dropdown">
        <!-- Search bar inside mobile menu -->
        <div class="search-input-wrap mobile-search">
          <Search :size="15" class="nav-search-icon" />
          <input
            :value="searchQuery"
            type="text"
            placeholder="Search components..."
            class="nav-search-input"
            @input="$emit('update:searchQuery', $event.target.value)"
          />
          <button v-if="searchQuery" type="button" class="clear-btn" aria-label="Clear search" @click="$emit('update:searchQuery', '')">
            <X :size="14" />
          </button>
        </div>

        <div class="mobile-actions-list">
          <button type="button" class="mobile-menu-item" @click="triggerMobileAction('open-tokens')">
            <Sliders :size="16" />
            <span>Tokens & Design System</span>
          </button>

          <button type="button" class="mobile-menu-item" @click="toggleDarkMode">
            <Sun v-if="isDark" :size="16" />
            <Moon v-else :size="16" />
            <span>Theme: {{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
          </button>

          <button type="button" class="mobile-menu-item primary" @click="triggerMobileAction('open-install')">
            <Terminal :size="16" />
            <span>Install CLI & Setup</span>
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search, Sliders, Sun, Moon, Terminal, X, Menu } from '@lucide/vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['navigate', 'update:searchQuery', 'open-tokens', 'open-mobile-demo', 'open-install'])

const searchInputRef = ref(null)
const isDark = ref(false)
const mobileMenuOpen = ref(false)

const triggerMobileAction = (eventName) => {
  mobileMenuOpen.value = false
  emit(eventName)
}

const focusSearch = () => {
  if (searchInputRef.value) {
    searchInputRef.value.focus()
  }
}

defineExpose({ focusSearch })

const setDarkMode = (dark) => {
  isDark.value = dark
  if (dark) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }
  localStorage.setItem('idesign_dark', dark ? 'true' : 'false')
}

const toggleDarkMode = () => {
  setDarkMode(!isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('idesign_dark')
  let dark = false
  if (saved !== null) {
    dark = saved === 'true'
  } else {
    dark = document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  setDarkMode(dark)
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

/* Mobile Dropdown */
.mobile-nav-dropdown {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 20px 20px 20px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border-bottom: 1px solid var(--hairline);
  box-shadow: var(--sh-overlay);
}

:root.dark .mobile-nav-dropdown {
  background: rgba(28, 28, 30, 0.94);
}

.mobile-search {
  width: 100%;
}

.mobile-actions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--hairline);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}

.mobile-menu-item:hover {
  background: var(--hover);
}

.mobile-menu-item.primary {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
}

.mobile-menu-item.primary:hover {
  background: #0062c4;
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

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s var(--ease-out-quart);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
