<template>
  <div class="idesign-app">
    <Navbar
      ref="navbarRef"
      v-model:search-query="searchQuery"
      :active-category="selectedCategory"
      @select-category="handleSelectCategory"
      @open-tokens="showTokensModal = true"
      @open-mobile-demo="showMobileModal = true"
      @open-install="showInstallModal = true"
    />

    <!-- Hero Section -->
    <HeroSection @toast="showToast" />

    <!-- Main Catalog Grid -->
    <CatalogGrid
      v-model:search-query="searchQuery"
      v-model:active-category="selectedCategory"
      :components="componentsData"
      :categories="componentCategories"
      @select-component="selectedComponent = $event"
      @quick-copy="quickCopyVueSfc"
    />

    <!-- Mobile Shell Simulator Modal -->
    <IdModal
      v-model="showMobileModal"
      title="Mobile Shell Simulator"
      max-width="420px"
    >
      <div style="display: flex; justify-content: center; padding: 10px 0;">
        <IdIphoneFrame>
          <div style="padding: 16px; flex: 1;">
            <div style="font-size: 11px; font-weight: 700; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;">
              APP SHELL DEMO
            </div>
            <h2 style="font-size: 22px; font-weight: 700; letter-spacing: -0.02em; margin-top: 4px;">
              Idesign Mobile
            </h2>
            
            <div style="margin-top: 16px;">
              <IdPanel>
                <IdPanelRow title="Large Title Collapse Nav" subtitle="Smooth mobile scrolling behavior" />
                <IdPanelRow title="Edge Bottom Sheet" subtitle="Native sheet transitions" />
                <IdPanelRow title="Safe Areas & Targets" subtitle="Touch target ≥ 44px" />
              </IdPanel>
            </div>
          </div>
        </IdIphoneFrame>
      </div>
    </IdModal>

    <!-- Component Playground Modal -->
    <ComponentPlaygroundModal
      :component="selectedComponent"
      @close="selectedComponent = null"
      @toast="showToast"
    />

    <!-- Tokens Inspector Modal -->
    <TokenInspectorModal
      v-model="showTokensModal"
      @toast="showToast"
    />

    <!-- Install CLI Modal -->
    <InstallCliModal
      v-model="showInstallModal"
      @toast="showToast"
    />

    <!-- Footer -->
    <footer class="main-footer">
      <div class="footer-container">
        <div class="footer-brand">
          <span class="footer-logo">
            <img src="/icon.png" alt="Idesign Logo" class="footer-icon-img" />
            Idesign
          </span>
          <p class="footer-tagline">Production-grade component system for Vue 3 and Nuxt 3.</p>
        </div>
        <div class="footer-links">
          <a href="#components">Components</a>
          <a href="#" @click.prevent="showTokensModal = true">UI Guidelines & Tokens</a>
          <a href="#" @click.prevent="showInstallModal = true">CLI Installation</a>
        </div>
      </div>
    </footer>

    <!-- Toast Notification -->
    <Toast :message="toastMsg" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import CatalogGrid from './components/CatalogGrid.vue'
import ComponentPlaygroundModal from './components/ComponentPlaygroundModal.vue'
import TokenInspectorModal from './components/TokenInspectorModal.vue'
import InstallCliModal from './components/InstallCliModal.vue'
import Toast from './components/Toast.vue'
import IdModal from './components/idesign/IdModal.vue'
import IdIphoneFrame from './components/idesign/IdIphoneFrame.vue'
import IdPanel from './components/idesign/IdPanel.vue'
import IdPanelRow from './components/idesign/IdPanelRow.vue'

import { componentsData, componentCategories } from './data/componentsData'

const navbarRef = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedComponent = ref(null)
const showTokensModal = ref(false)
const showMobileModal = ref(false)
const showInstallModal = ref(false)
const toastMsg = ref(null)

const handleSelectCategory = (catId) => {
  selectedCategory.value = catId
  searchQuery.value = ''
}

let toastTimer = null

const showToast = (msg) => {
  toastMsg.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMsg.value = null
  }, 2400)
}

const quickCopyVueSfc = (comp) => {
  const code = comp.vueCode({})
  navigator.clipboard.writeText(code)
  showToast(`Copied ${comp.name} .vue SFC to clipboard!`)
}

const triggerSearch = () => {
  if (navbarRef.value) {
    navbarRef.value.focusSearch()
  }
}

// ⌘K Keyboard Shortcut Listener
const handleKeyDown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    triggerSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.idesign-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-footer {
  margin-top: auto;
  background: var(--surface);
  border-top: 1px solid var(--hairline);
  padding: 40px var(--pad-x);
}
.footer-container {
  max-width: var(--max-grid);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.footer-logo {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.footer-icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.footer-tagline {
  font-size: 13.5px;
  color: var(--text-2);
  margin-top: 4px;
}
.footer-links {
  display: flex;
  gap: 20px;
}
.footer-links a {
  color: var(--text-2);
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 550;
  transition: color 0.15s ease;
}
.footer-links a:hover {
  color: var(--accent);
}
</style>
