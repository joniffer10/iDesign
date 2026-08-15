<template>
  <header :class="['glass-nav', `variant-${variant}`, { 'mobile-open': mobileOpen }]">
    <div class="glass-nav-container">
      <!-- Brand Slot / Props -->
      <div class="brand-slot">
        <slot name="brand">
          <a href="#" class="brand-link">
            <div class="brand-icon">
              <slot name="icon">
                <component :is="icon" v-if="icon && typeof icon !== 'string'" :size="18" />
                <span v-else-if="typeof icon === 'string' && icon.length <= 4" class="icon-str">{{ icon }}</span>
                <Layers v-else :size="18" />
              </slot>
            </div>
            <span class="brand-title">{{ title }}</span>
          </a>
        </slot>
      </div>

      <!-- Desktop Nav Links -->
      <nav v-if="links && links.length || $slots.nav" class="nav-links desktop-only">
        <slot name="nav">
          <a
            v-for="(link, idx) in links"
            :key="idx"
            :href="link.href || '#'"
            :class="['nav-link-item', { active: link.active }]"
          >
            {{ link.label || link }}
          </a>
        </slot>
      </nav>

      <!-- Desktop Action Buttons -->
      <div v-if="$slots.actions" class="actions-slot desktop-only">
        <slot name="actions" />
      </div>

      <!-- Mobile Hamburger Toggle Button -->
      <button
        type="button"
        class="nav-hamburger-btn mobile-only"
        :aria-expanded="mobileOpen"
        aria-label="Toggle navigation menu"
        @click="mobileOpen = !mobileOpen"
      >
        <X v-if="mobileOpen" :size="18" />
        <Menu v-else :size="18" />
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="nav-drawer">
      <div v-if="mobileOpen" class="mobile-nav-drawer">
        <nav v-if="links && links.length || $slots.nav" class="mobile-links-list">
          <slot name="nav">
            <a
              v-for="(link, idx) in links"
              :key="idx"
              :href="link.href || '#'"
              :class="['mobile-link-item', { active: link.active }]"
              @click="mobileOpen = false"
            >
              {{ link.label || link }}
            </a>
          </slot>
        </nav>

        <div v-if="$slots.actions" class="mobile-actions-container" @click="mobileOpen = false">
          <slot name="actions" />
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Layers, Menu, X } from '@lucide/vue'

defineProps({
  title: {
    type: String,
    default: 'Idesign'
  },
  icon: [String, Object, Function],
  links: Array, // [{ label: 'Features', href: '#', active?: boolean }]
  variant: {
    type: String,
    default: 'glass',
    validator: v => ['glass', 'solid', 'pill', 'full-width'].includes(v)
  }
})

const mobileOpen = ref(false)
</script>

<style scoped>
.glass-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  transition: all 0.25s var(--ease-out-quart);
  font-family: var(--font);
}

.variant-glass {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--hairline);
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.82);
}

.variant-solid {
  background: var(--surface);
  border-bottom: 1px solid var(--hairline);
  box-shadow: var(--sh-card);
}

.variant-pill {
  top: 12px;
  width: calc(100% - 32px);
  max-width: 980px;
  margin: 0 auto;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid var(--hairline);
  box-shadow: var(--sh-overlay);
}
:root.dark .variant-pill {
  background: rgba(28, 28, 30, 0.86);
}

.variant-full-width {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--hairline);
}

.glass-nav-container {
  max-width: var(--max-grid);
  margin: 0 auto;
  padding: 0 24px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.variant-pill .glass-nav-container {
  padding: 0 20px;
  height: 50px;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  color: var(--text);
}
.brand-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--accent);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.icon-str { font-size: 15px; line-height: 1; }
.brand-title {
  font-size: 16px;
  font-weight: 750;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}
.nav-link-item {
  font-size: 13.5px;
  font-weight: 550;
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.15s ease;
}
.nav-link-item:hover, .nav-link-item.active {
  color: var(--text);
}

.actions-slot {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mobile-only {
  display: none;
}

.nav-hamburger-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--hairline);
  background: var(--surface);
  color: var(--text);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;
}
.nav-hamburger-btn:hover {
  background: var(--hover);
}

/* Mobile Drawer */
.mobile-nav-drawer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 20px 18px 20px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border-bottom: 1px solid var(--hairline);
  box-shadow: var(--sh-overlay);
}

:root.dark .mobile-nav-drawer {
  background: rgba(28, 28, 30, 0.94);
}

.mobile-links-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-link-item {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-2);
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.mobile-link-item:hover, .mobile-link-item.active {
  background: var(--hover);
  color: var(--text);
}

.mobile-actions-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--hairline);
}

@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: flex !important;
  }
}

.nav-drawer-enter-active,
.nav-drawer-leave-active {
  transition: opacity 0.2s ease, transform 0.2s var(--ease-out-quart);
}

.nav-drawer-enter-from,
.nav-drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
