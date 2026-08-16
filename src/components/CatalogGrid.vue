<template>
  <section class="catalog-section" id="components">
    <!-- Category Controls Header -->
    <div class="catalog-controls">
      <IdSegmentedControl
        v-model="selectedCategory"
        :options="categories"
        theme="black"
        block
      />
    </div>

    <!-- Component Cards Grid -->
    <div v-if="filteredComponents.length > 0" class="cards-grid">
      <div
        v-for="item in filteredComponents"
        :key="item.id"
        class="component-card"
        @click="$emit('select-component', item)"
      >
        <!-- Live Mini Preview Box -->
        <div class="preview-box">
          <!-- Glass Nav Mini -->
          <template v-if="item.id === 'glass-nav'">
            <div class="mini-nav">
              <div class="mini-brand"><span>⚡</span> Idesign</div>
              <div class="mini-links"><span>Docs</span> <span class="mini-btn">Action</span></div>
            </div>
          </template>

          <!-- macOS Dock Mini -->
          <template v-else-if="item.id === 'dock'">
            <div class="mini-dock">
              <div class="mini-dock-icon" style="background:#007aff;">📁</div>
              <div class="mini-dock-icon" style="background:#34c759;">🌐</div>
              <div class="mini-dock-icon" style="background:#ff9500;">📝</div>
              <div class="mini-dock-dot"></div>
            </div>
          </template>

          <!-- Segmented Control Mini -->
          <template v-else-if="item.id === 'segmented-control'">
            <div class="mini-seg">
              <span class="active">Overview</span>
              <span>Components</span>
              <span>Tokens</span>
            </div>
          </template>

          <!-- Tabs Mini -->
          <template v-else-if="item.id === 'tabs'">
            <div class="mini-tabs">
              <div class="mini-tab-item active">Overview</div>
              <div class="mini-tab-item">Components</div>
              <div class="mini-tab-bar"></div>
            </div>
          </template>

          <!-- Breadcrumbs Mini -->
          <template v-else-if="item.id === 'breadcrumbs'">
            <div class="mini-crumbs">
              <span>Home</span><span class="sep">›</span><span>Components</span><span class="sep">›</span><span class="active">Button</span>
            </div>
          </template>

          <!-- Pagination Mini -->
          <template v-else-if="item.id === 'pagination'">
            <div class="mini-pagination">
              <span>‹</span><span class="p-page">1</span><span class="p-page active">2</span><span class="p-page">3</span><span>›</span>
            </div>
          </template>

          <!-- Dropdown Menu Mini -->
          <template v-else-if="item.id === 'dropdown-menu'">
            <div class="mini-dropdown">
              <div class="d-item"><span>Edit</span><kbd>⌘E</kbd></div>
              <div class="d-item danger"><span>Delete</span></div>
            </div>
          </template>

          <!-- Liquid Button Mini -->
          <template v-else-if="item.id === 'liquid-button'">
            <div class="mini-btns">
              <button class="m-btn-primary">Primary →</button>
              <button class="m-btn-glass">Glass</button>
            </div>
          </template>

          <!-- Unified Panel Mini -->
          <template v-else-if="item.id === 'unified-panel'">
            <div class="mini-panel">
              <div class="mini-row"><span class="m-row-left"><span class="m-sq" style="background:#007aff;">📶</span> Wi-Fi</span><span class="m-detail">Home ›</span></div>
              <div class="mini-row"><span class="m-row-left"><span class="m-sq" style="background:#34c759;">⚡</span> Bluetooth</span><span class="m-detail">On ›</span></div>
            </div>
          </template>

          <!-- Card Container Mini -->
          <template v-else-if="item.id === 'card'">
            <div class="mini-card-box">
              <div class="m-card-title">Vision Studio Pro</div>
              <div class="m-card-sub">Spatial Computing</div>
              <div class="m-card-chip">Explore</div>
            </div>
          </template>

          <!-- Hero CTA Mini -->
          <template v-else-if="item.id === 'hero-cta'">
            <div class="mini-hero-cta">
              <div class="mini-cta-title">Liquid Glass Hero CTA</div>
              <div class="mini-glass-chip">Explore</div>
            </div>
          </template>

          <!-- Accordion Mini -->
          <template v-else-if="item.id === 'accordion'">
            <div class="mini-accordion">
              <div class="m-acc-header"><span>What is Idesign?</span><span>˅</span></div>
              <div class="m-acc-body">A production-grade Vue 3 component library.</div>
            </div>
          </template>

          <!-- Project Section Mini -->
          <template v-else-if="item.id === 'project-section'">
            <div class="mini-proj-section">
              <div class="m-proj-head">📁 Featured Projects</div>
              <div class="m-proj-card"><span>⚡ Spatial Studio</span></div>
            </div>
          </template>

          <!-- Image Frame Mini -->
          <template v-else-if="item.id === 'image-frame'">
            <div class="mini-img-frame">
              <div class="m-frame-inner">
                <span class="m-photo-icon">📷</span>
              </div>
            </div>
          </template>

          <!-- Stepper Mini -->
          <template v-else-if="item.id === 'stepper'">
            <div class="mini-stepper-box">
              <div class="m-step done">✓</div>
              <div class="m-step-line done"></div>
              <div class="m-step active">2</div>
              <div class="m-step-line"></div>
              <div class="m-step">3</div>
            </div>
          </template>

          <!-- Timeline Mini -->
          <template v-else-if="item.id === 'timeline'">
            <div class="mini-timeline-box">
              <div class="m-tl-item"><span class="m-dot primary"></span><span>v2.4 System Update</span></div>
              <div class="m-tl-item"><span class="m-dot success"></span><span>Security Audit Passed</span></div>
            </div>
          </template>

          <!-- Grid Mini -->
          <template v-else-if="item.id === 'grid'">
            <div class="mini-grid-box">
              <div class="m-g-col">Col 1</div>
              <div class="m-g-col">Col 2</div>
              <div class="m-g-col">Col 3</div>
            </div>
          </template>

          <!-- Bar Chart Mini -->
          <template v-else-if="item.id === 'bar-chart'">
            <div class="mini-barchart-box">
              <div class="m-bar" style="height: 40%;"></div>
              <div class="m-bar" style="height: 75%;"></div>
              <div class="m-bar active" style="height: 100%;"></div>
              <div class="m-bar" style="height: 60%;"></div>
              <div class="m-bar" style="height: 80%;"></div>
            </div>
          </template>

          <!-- Pie Chart Mini -->
          <template v-else-if="item.id === 'pie-chart'">
            <div class="mini-piechart-box">
              <svg width="40" height="40" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="var(--hairline)" stroke-width="4"/>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#0071e3" stroke-width="4" stroke-dasharray="55 100" stroke-dashoffset="0"/>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#30d158" stroke-width="4" stroke-dasharray="30 100" stroke-dashoffset="-55"/>
              </svg>
              <span class="m-pie-label">Direct Traffic</span>
            </div>
          </template>

          <!-- Input Mini -->
          <template v-else-if="item.id === 'input'">
            <div class="mini-input-box">
              <span class="m-search-icon">🔍</span>
              <span class="m-input-text">Search components...</span>
              <span class="m-clear-btn">×</span>
            </div>
          </template>

          <!-- Textarea Mini -->
          <template v-else-if="item.id === 'textarea'">
            <div class="mini-textarea-box">
              <span class="m-ta-text">Write description...</span>
              <span class="m-ta-count">14/200</span>
            </div>
          </template>

          <!-- Select Mini -->
          <template v-else-if="item.id === 'select'">
            <div class="mini-select-box">
              <span>Framework: Vue 3</span>
              <span>▾</span>
            </div>
          </template>

          <!-- Checkbox Mini -->
          <template v-else-if="item.id === 'checkbox'">
            <div class="mini-checkbox-box">
              <div class="m-chk-square">✓</div>
              <span>Accept terms & conditions</span>
            </div>
          </template>

          <!-- Radio Group Mini -->
          <template v-else-if="item.id === 'radio-group'">
            <div class="mini-radio-box">
              <div class="m-radio-item active"><span class="r-dot"></span> Free</div>
              <div class="m-radio-item"><span class="r-dot-off"></span> Pro</div>
            </div>
          </template>

          <!-- Slider Mini -->
          <template v-else-if="item.id === 'slider'">
            <div class="mini-slider-box">
              <div class="m-slider-track">
                <div class="m-slider-fill"></div>
                <div class="m-slider-thumb"></div>
              </div>
            </div>
          </template>

          <!-- Switch Mini -->
          <template v-else-if="item.id === 'ios-switch'">
            <div class="mini-switch-wrap">
              <span>Notifications</span>
              <div class="m-switch"><span class="m-thumb"></span></div>
            </div>
          </template>

          <!-- Date Picker Mini -->
          <template v-else-if="item.id === 'date-picker'">
            <div class="mini-date-box">
              <span>📅 Aug 15, 2026</span>
              <span class="m-cal-badge">Calendar</span>
            </div>
          </template>

          <!-- File Upload Mini -->
          <template v-else-if="item.id === 'file-upload'">
            <div class="mini-upload-box">
              <span class="m-up-icon">☁️</span>
              <span class="m-up-text">Drag & drop files here</span>
            </div>
          </template>

          <!-- Command Palette Mini -->
          <template v-else-if="item.id === 'command-palette'">
            <div class="mini-cmd-box">
              <div class="m-cmd-input">🔍 Type a command... <kbd>⌘K</kbd></div>
            </div>
          </template>

          <!-- Modal Mini -->
          <template v-else-if="item.id === 'liquid-modal'">
            <div class="mini-modal">
              <div class="m-modal-card">
                <div class="m-modal-head">Confirm Action</div>
                <div class="m-modal-btns"><span>Cancel</span><span class="m-accent">Confirm</span></div>
              </div>
            </div>
          </template>

          <!-- Bottom Sheet Mini -->
          <template v-else-if="item.id === 'bottom-sheet'">
            <div class="mini-sheet-box">
              <div class="m-sheet-bar"></div>
              <div class="m-sheet-title">Actions Sheet</div>
            </div>
          </template>

          <!-- Drawer Mini -->
          <template v-else-if="item.id === 'drawer'">
            <div class="mini-drawer-box">
              <div class="m-drawer-panel">
                <span>Settings Drawer</span>
              </div>
            </div>
          </template>

          <!-- Popover Mini -->
          <template v-else-if="item.id === 'popover'">
            <div class="mini-popover-box">
              <div class="m-pop-card">Popover anchored</div>
            </div>
          </template>

          <!-- Tooltip Mini -->
          <template v-else-if="item.id === 'tooltip'">
            <div class="mini-tooltip-box">
              <div class="m-tooltip-pill">Helpful tip</div>
              <div class="m-tooltip-btn">Hover Button</div>
            </div>
          </template>

          <!-- Confirm Dialog Mini -->
          <template v-else-if="item.id === 'confirm-dialog'">
            <div class="mini-confirm-box">
              <div class="m-conf-head">Delete Item</div>
              <div class="m-conf-btns"><span>Cancel</span><span class="m-danger">Delete</span></div>
            </div>
          </template>

          <!-- Live Indicator Mini -->
          <template v-else-if="item.id === 'live-indicator'">
            <div class="mini-live">
              <span class="pulse-dot"></span>
              <span>SYSTEM ONLINE · LIVE</span>
            </div>
          </template>

          <!-- Tag Mini -->
          <template v-else-if="item.id === 'tag'">
            <div class="mini-tags-box">
              <span class="m-tag plain">plain</span>
              <span class="m-tag accent">accent</span>
              <span class="m-tag heat">🔥 hot</span>
            </div>
          </template>

          <!-- Alert Banner Mini -->
          <template v-else-if="item.id === 'alert'">
            <div class="mini-alert-box">
              <span class="m-alert-icon">ℹ️</span>
              <span class="m-alert-title">Software Update Available</span>
            </div>
          </template>

          <!-- Table Mini -->
          <template v-else-if="item.id === 'table'">
            <div class="mini-table-box">
              <div class="m-t-head"><span>Name</span><span>Role</span></div>
              <div class="m-t-row"><span>Jane</span><span>Developer</span></div>
            </div>
          </template>

          <!-- Avatar Mini -->
          <template v-else-if="item.id === 'avatar'">
            <div class="mini-avatar-box">
              <div class="m-av circle">JS</div>
              <div class="m-av squircle framed">AR</div>
            </div>
          </template>

          <!-- Avatar Group Mini -->
          <template v-else-if="item.id === 'avatar-group'">
            <div class="mini-av-group">
              <div class="m-av-stack s1">JS</div>
              <div class="m-av-stack s2">AR</div>
              <div class="m-av-stack s3">+3</div>
            </div>
          </template>

          <!-- Badge Mini -->
          <template v-else-if="item.id === 'badge'">
            <div class="mini-badge-box">
              <span class="m-bell">🔔</span>
              <span class="m-count">5</span>
            </div>
          </template>

          <!-- Progress Bar Mini -->
          <template v-else-if="item.id === 'progress'">
            <div class="mini-progress-box">
              <div class="m-prog-bar"><div class="m-prog-fill"></div></div>
              <span class="m-prog-val">65%</span>
            </div>
          </template>

          <!-- Skeleton Loader Mini -->
          <template v-else-if="item.id === 'skeleton'">
            <div class="mini-skel-box">
              <div class="m-skel line1"></div>
              <div class="m-skel line2"></div>
            </div>
          </template>

          <!-- Spinner Mini -->
          <template v-else-if="item.id === 'spinner'">
            <div class="mini-spin-box">
              <div class="m-spin-arc"></div>
              <span>Loading...</span>
            </div>
          </template>

          <!-- Stat Card Mini -->
          <template v-else-if="item.id === 'stat'">
            <div class="mini-stat-box">
              <div class="m-stat-top"><span>Revenue</span><span class="m-stat-badge">+14.2%</span></div>
              <div class="m-stat-val">$128,450</div>
            </div>
          </template>

          <!-- Sparkline Mini -->
          <template v-else-if="item.id === 'sparkline'">
            <div class="mini-spark-box">
              <svg width="100" height="30" viewBox="0 0 100 30">
                <path d="M 0 25 L 20 15 L 40 20 L 60 8 L 80 12 L 100 2" fill="none" stroke="#0071e3" stroke-width="2.5" />
              </svg>
            </div>
          </template>

          <!-- Empty State Mini -->
          <template v-else-if="item.id === 'empty-state'">
            <div class="mini-empty-box">
              <span>🔍</span>
              <span class="m-empty-title">No Results Found</span>
            </div>
          </template>

          <!-- File Tree Mini -->
          <template v-else-if="item.id === 'file-tree'">
            <div class="mini-tree-box">
              <div>📁 src</div>
              <div class="m-indent">📄 App.vue</div>
            </div>
          </template>

          <!-- Carousel Mini -->
          <template v-else-if="item.id === 'carousel'">
            <div class="mini-carousel-box">
              <div class="m-car-card">Slide Card</div>
              <div class="m-car-dots"><span class="active"></span><span></span><span></span></div>
            </div>
          </template>

          <!-- macOS Banner Mini -->
          <template v-else-if="item.id === 'macos-banner'">
            <div class="mini-mac-banner">
              <div class="m-mac-head">⚡ System • now</div>
              <div class="m-mac-title">Update Ready</div>
            </div>
          </template>

          <!-- Stack Mini -->
          <template v-else-if="item.id === 'stack'">
            <div class="mini-stack-box">
              <div class="m-st-item">Item 1</div>
              <div class="m-st-item">Item 2</div>
            </div>
          </template>

          <!-- Divider Mini -->
          <template v-else-if="item.id === 'divider'">
            <div class="mini-divider-box">
              <span>Above</span>
              <hr class="m-hr" />
              <span>Below</span>
            </div>
          </template>

          <!-- Hero Page Mini -->
          <template v-else-if="item.id === 'hero-page'">
            <div class="mini-hero-page">
              <div class="m-hero-nav"><span>✦ AURA</span><span class="m-btn-mini">Start</span></div>
              <div class="m-hero-body">
                <span class="m-pill">AURA 2.0</span>
                <div class="m-title">Intelligence for Vision</div>
              </div>
            </div>
          </template>

          <!-- Product Store Page Mini -->
          <template v-else-if="item.id === 'product-page'">
            <div class="mini-product-page">
              <div class="m-store-head"><span>Design Store</span><span class="m-bag">🛍️ (2)</span></div>
              <div class="m-store-card">
                <div class="m-store-img"></div>
                <div class="m-store-info"><span>Vision Pro</span><b>$3,499</b></div>
              </div>
            </div>
          </template>

          <!-- AI Chat Page Mini -->
          <template v-else-if="item.id === 'ai-chat-page'">
            <div class="mini-chat-page">
              <div class="m-chat-side">📁</div>
              <div class="m-chat-main">
                <div class="m-msg ai"><span>✦ Hello Jane!</span></div>
                <div class="m-msg user"><span>Write Vue button</span></div>
              </div>
            </div>
          </template>

          <!-- Toast Mini -->
          <template v-else-if="item.id === 'toast'">
            <div class="mini-toast-box">
              <span class="m-toast-icon">✨</span>
              <span class="m-toast-text">Changes Saved</span>
            </div>
          </template>

          <!-- Tour Mini -->
          <template v-else-if="item.id === 'tour'">
            <div class="mini-tour-card">
              <div class="m-tour-head">
                <span class="m-tour-pill">STEP 1 OF 3</span>
                <span class="m-tour-close">×</span>
              </div>
              <div class="m-tour-body">
                <span class="m-tour-icon">⚡</span>
                <span class="m-tour-title">Welcome to Idesign</span>
              </div>
            </div>
          </template>

          <!-- Dashboard Page Mini -->
          <template v-else-if="item.id === 'dashboard-page'">
            <div class="mini-dash-page">
              <div class="m-dash-stats"><div class="m-stat"><b>$128k</b></div><div class="m-stat"><b>48k</b></div></div>
              <div class="m-dash-table"><span>Team Members</span></div>
            </div>
          </template>

          <!-- Auth Page Mini -->
          <template v-else-if="item.id === 'auth-page'">
            <div class="mini-auth-page">
              <div class="m-auth-tabs"><span class="active">Sign In</span><span>Sign Up</span></div>
              <div class="m-auth-field">Email address...</div>
              <div class="m-auth-btn">Sign In →</div>
            </div>
          </template>

          <!-- Default Generic Graphic Fallback -->
          <template v-else>
            <div class="generic-preview">
              <div class="m-icon-box">✦</div>
              <span>{{ item.name }}</span>
            </div>
          </template>
        </div>

        <!-- Card Meta Info -->
        <div class="card-info">
          <div class="card-header">
            <span class="category-badge">{{ item.category }}</span>
            <span class="vue-ready-tag">Vue SFC</span>
          </div>

          <h3 class="card-title">{{ item.name }}</h3>
          <p class="card-description">{{ item.description }}</p>

          <div class="card-actions">
            <button
              class="quick-copy-btn"
              title="Copy SFC code"
              @click.stop="$emit('quick-copy', item)"
            >
              <Copy :size="13" />
              Copy SFC
            </button>

            <span class="explore-link">Inspect & Edit →</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty Search State -->
    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>No components match "{{ searchQuery }}"</h3>
      <p>Try searching for navigation, panel, toggle, modal, or hero.</p>
      <button class="reset-btn" @click="$emit('update:searchQuery', ''); $emit('update:activeCategory', 'all')">Reset Search Filter</button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Copy } from '@lucide/vue'
import IdSegmentedControl from './idesign/IdSegmentedControl.vue'

const props = defineProps({
  components: {
    type: Array,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  searchQuery: {
    type: String,
    default: ''
  },
  activeCategory: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['select-component', 'quick-copy', 'update:searchQuery', 'update:activeCategory'])

const selectedCategory = computed({
  get: () => props.activeCategory,
  set: (val) => emit('update:activeCategory', val)
})

const filteredComponents = computed(() => {
  return props.components.filter(c => {
    // Category match using category ID
    const cat = props.activeCategory || 'all'
    const categoryMatch = cat === 'all' || c.category === cat

    // Search query match
    const q = props.searchQuery.toLowerCase().trim()
    const searchMatch = !q ||
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))

    return categoryMatch && searchMatch
  })
})
</script>

<style scoped>
.catalog-section {
  max-width: var(--max-grid);
  margin: 0 auto;
  padding: 40px var(--pad-x);
}

.catalog-controls {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 32px;
  overflow-x: auto;
  padding-bottom: 6px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.component-card {
  background: var(--surface);
  border-radius: var(--r-card);
  box-shadow: var(--sh-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s var(--ease-out-quart), box-shadow 0.2s var(--ease-out-quart);
  border: 1px solid var(--hairline);
}
.component-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--sh-lift);
}

.preview-box {
  height: 160px;
  background: var(--bg);
  border-bottom: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.preview-box > * {
  max-width: 100%;
  box-sizing: border-box;
}

/* ─── Mini Previews CSS ─── */
.mini-nav { width: 100%; background: var(--surface); color: var(--text); padding: 10px 14px; border-radius: 12px; border: 1px solid var(--hairline); box-shadow: var(--sh-card); display: flex; align-items: center; justify-content: space-between; font-size: 12px; font-weight: 600; }
.mini-brand { display: flex; align-items: center; gap: 6px; }
.mini-links { display: flex; align-items: center; gap: 8px; color: var(--text-2); }
.mini-btn { background: var(--accent); color: #fff; padding: 2px 8px; border-radius: 999px; }

.mini-dock { display: flex; align-items: center; gap: 8px; background: var(--surface); padding: 8px 14px; border-radius: 20px; border: 1px solid var(--hairline); box-shadow: var(--sh-overlay); }
.mini-dock-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 13px; }
.mini-dock-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--text); }

.mini-seg { display: inline-flex; background: var(--faint); padding: 3px; border-radius: 999px; font-size: 12px; gap: 4px; }
.mini-seg span { padding: 4px 10px; border-radius: 999px; color: var(--text-2); }
.mini-seg span.active { background: var(--surface); color: var(--text); font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }

.mini-tabs { display: flex; flex-direction: column; gap: 4px; font-size: 12.5px; position: relative; }
.mini-tab-item { display: inline-block; padding: 4px 12px; color: var(--text-2); }
.mini-tab-item.active { color: var(--accent); font-weight: 600; }
.mini-tab-bar { height: 2px; background: var(--accent); width: 60px; border-radius: 2px; }

.mini-crumbs { font-size: 12px; color: var(--accent); display: flex; gap: 6px; align-items: center; }
.mini-crumbs .sep { color: var(--text-3); }
.mini-crumbs .active { color: var(--text); font-weight: 600; }
:root.dark .mini-crumbs { color: #2997ff; }
:root.dark .mini-crumbs .active { color: #f5f5f7; }
:root.dark .mini-crumbs .sep { color: rgba(255, 255, 255, 0.45); }

.mini-pagination { display: flex; gap: 6px; align-items: center; font-size: 12px; }
.p-page { padding: 3px 8px; border-radius: 6px; background: var(--hover); color: var(--text); }
.p-page.active { background: var(--accent); color: #fff; font-weight: 600; }

.mini-dropdown { background: var(--surface); border: 1px solid var(--hairline); border-radius: 10px; padding: 8px; width: 140px; box-shadow: var(--sh-card); font-size: 12px; display: flex; flex-direction: column; gap: 6px; }
.d-item { display: flex; justify-content: space-between; align-items: center; color: var(--text); }
.d-item.danger { color: #ff3b30; }

.mini-panel { width: 100%; background: var(--surface); color: var(--text); border-radius: 14px; border: 1px solid var(--hairline); box-shadow: var(--sh-card); overflow: hidden; }
.mini-row { padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 550; color: var(--text); }
.mini-row + .mini-row { border-top: 1px solid var(--hairline); }
.m-row-left { display: flex; align-items: center; gap: 6px; }
.m-sq { width: 18px; height: 18px; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; }
.m-detail { color: var(--text-3); font-size: 11px; }

.mini-card-box { background: var(--surface); border: 1px solid var(--hairline); border-radius: 14px; padding: 12px 16px; box-shadow: var(--sh-card); width: 100%; max-width: 220px; }
.m-card-title { font-size: 13px; font-weight: 650; color: var(--text); }
.m-card-sub { font-size: 11px; color: var(--text-2); margin-top: 2px; }
.m-card-chip { display: inline-block; margin-top: 8px; font-size: 10px; font-weight: 600; background: var(--accent); color: #fff; padding: 2px 8px; border-radius: 999px; }

.mini-hero-cta { width: 100%; padding: 18px; border-radius: 16px; background: var(--grad-cta); color: #fff; }
.mini-cta-title { font-size: 14px; font-weight: 700; margin-bottom: 8px; }
.mini-glass-chip { display: inline-block; padding: 4px 12px; border-radius: 999px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); font-size: 11px; }

.mini-accordion { background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; width: 100%; max-width: 240px; padding: 10px 12px; font-size: 12px; }
.m-acc-header { display: flex; justify-content: space-between; font-weight: 600; color: var(--text); }
.m-acc-body { color: var(--text-2); margin-top: 4px; font-size: 11px; }

.mini-input-box { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--hairline); border-radius: 999px; padding: 6px 14px; width: 220px; font-size: 12px; color: var(--text-3); }
.m-input-text { flex: 1; }
.m-clear-btn { font-size: 14px; color: var(--text-2); }

.mini-textarea-box { background: var(--surface); border: 1px solid var(--hairline); border-radius: 10px; padding: 8px 12px; width: 220px; height: 60px; display: flex; flex-direction: column; justify-content: space-between; font-size: 11px; color: var(--text-3); }
.m-ta-count { align-self: flex-end; font-size: 10px; font-family: var(--mono); }

.mini-select-box { display: flex; justify-content: space-between; align-items: center; background: var(--surface); border: 1px solid var(--hairline); border-radius: 10px; padding: 8px 14px; width: 200px; font-size: 12px; font-weight: 550; color: var(--text); }

.mini-checkbox-box { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 550; color: var(--text); }
.m-chk-square { width: 18px; height: 18px; border-radius: 4px; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }

.mini-radio-box { display: flex; gap: 12px; font-size: 12px; font-weight: 550; color: var(--text); }
.m-radio-item { display: flex; align-items: center; gap: 6px; }
.r-dot { width: 14px; height: 14px; border-radius: 50%; border: 4px solid var(--accent); background: #fff; }
.r-dot-off { width: 14px; height: 14px; border-radius: 50%; border: 1px solid var(--hairline); }

.mini-slider-box { width: 180px; }
.m-slider-track { height: 6px; background: var(--hairline); border-radius: 999px; position: relative; display: flex; align-items: center; }
.m-slider-fill { width: 60%; height: 100%; background: var(--accent); border-radius: 999px; }
.m-slider-thumb { width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); position: absolute; left: 58%; }

.mini-btns { display: flex; gap: 8px; }
.m-btn-primary { background: var(--accent); color: #fff; border: none; padding: 8px 16px; border-radius: 999px; font-weight: 600; font-size: 13px; }
.m-btn-glass { background: var(--surface); color: var(--text); border: 1px solid var(--hairline); padding: 8px 16px; border-radius: 999px; font-weight: 600; font-size: 13px; }

.mini-switch-wrap { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; color: var(--text); }
.m-switch { width: 40px; height: 24px; border-radius: 999px; background: #34c759; padding: 2px; }
.m-thumb { display: block; width: 20px; height: 20px; border-radius: 50%; background: #fff; transform: translateX(16px); }

.mini-date-box { background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 8px 14px; display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 600; color: var(--text); }
.m-cal-badge { font-size: 10px; background: var(--hover); padding: 2px 6px; border-radius: 4px; color: var(--text-3); }

.mini-upload-box { border: 1px dashed var(--hairline); background: var(--surface); border-radius: 12px; padding: 12px 20px; display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 11px; color: var(--text-2); }
.m-up-icon { font-size: 18px; }

.mini-cmd-box { background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 8px 12px; width: 220px; box-shadow: var(--sh-overlay); }
.m-cmd-input { font-size: 11.5px; color: var(--text-2); display: flex; justify-content: space-between; align-items: center; }

.mini-modal { width: 100%; max-width: 220px; }
.m-modal-card { background: var(--surface); color: var(--text); border-radius: 14px; padding: 14px; border: 1px solid var(--hairline); box-shadow: var(--sh-overlay); }
.m-modal-head { font-size: 13px; font-weight: 650; margin-bottom: 10px; }
.m-modal-btns { display: flex; justify-content: flex-end; gap: 10px; font-size: 12px; font-weight: 600; color: var(--text-2); }
.m-accent { color: var(--accent); }

.mini-sheet-box { background: var(--surface); border: 1px solid var(--hairline); border-radius: 16px 16px 0 0; padding: 10px 16px; width: 180px; display: flex; flex-direction: column; align-items: center; gap: 6px; margin-top: 30px; }
.m-sheet-bar { width: 32px; height: 4px; background: var(--hairline); border-radius: 999px; }
.m-sheet-title { font-size: 11px; font-weight: 650; color: var(--text); }

.mini-drawer-box { width: 180px; display: flex; justify-content: flex-end; }
.m-drawer-panel { background: var(--surface); border-left: 1px solid var(--hairline); padding: 10px 12px; font-size: 11px; font-weight: 600; color: var(--text); height: 80px; width: 120px; border-radius: 8px 0 0 8px; }

.mini-popover-box { position: relative; }
.m-pop-card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 10px; padding: 6px 12px; font-size: 11px; font-weight: 600; color: var(--text); box-shadow: var(--sh-overlay); }

.mini-tooltip-box { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.m-tooltip-pill { background: rgba(0,0,0,0.8); color: #fff; font-size: 10px; padding: 2px 8px; border-radius: 4px; }
.m-tooltip-btn { background: var(--surface); border: 1px solid var(--hairline); padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; color: var(--text); }

.mini-confirm-box { background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 10px 14px; width: 180px; box-shadow: var(--sh-overlay); }
.m-conf-head { font-size: 12px; font-weight: 650; color: var(--text); margin-bottom: 8px; }
.m-conf-btns { display: flex; justify-content: flex-end; gap: 8px; font-size: 11px; font-weight: 600; color: var(--text-2); }
.m-danger { color: #ff3b30; }

.mini-live { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 650; color: var(--text-2); letter-spacing: 0.1em; }

.mini-tags-box { display: flex; gap: 6px; }
.m-tag { padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; }
.m-tag.plain { background: var(--hover); color: var(--text); }
.m-tag.accent { background: rgba(0,113,227,0.12); color: var(--accent); }
.m-tag.heat { background: rgba(255,59,48,0.12); color: #d70015; }

.mini-alert-box { background: rgba(0,113,227,0.08); border: 1px solid rgba(0,113,227,0.2); border-radius: 10px; padding: 8px 12px; display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; color: var(--text); width: 220px; }

.mini-table-box { background: var(--surface); border: 1px solid var(--hairline); border-radius: 10px; width: 200px; font-size: 11px; overflow: hidden; }
.m-t-head { background: var(--faint); padding: 4px 10px; display: flex; justify-content: space-between; font-weight: 600; color: var(--text-3); }
.m-t-row { padding: 6px 10px; display: flex; justify-content: space-between; color: var(--text); border-top: 1px solid var(--hairline); }

.mini-avatar-box { display: flex; gap: 10px; }
.m-av { width: 32px; height: 32px; background: var(--faint); color: var(--text); font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center; }
.m-av.circle { border-radius: 50%; }
.m-av.squircle { border-radius: 8px; }
.m-av.framed { border: 2px solid var(--accent); }

.mini-av-group { display: flex; align-items: center; }
.m-av-stack { width: 28px; height: 28px; border-radius: 50%; background: var(--surface); border: 2px solid var(--bg); font-size: 10px; font-weight: 700; color: var(--text); display: flex; align-items: center; justify-content: center; margin-left: -8px; }
.m-av-stack:first-child { margin-left: 0; }

.mini-badge-box { display: flex; align-items: center; position: relative; }
.m-bell { font-size: 24px; }
.m-count { position: absolute; top: -4px; right: -4px; background: #ff3b30; color: #fff; font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 999px; }

.mini-progress-box { width: 180px; display: flex; align-items: center; gap: 8px; }
.m-prog-bar { flex: 1; height: 6px; background: var(--hairline); border-radius: 999px; overflow: hidden; }
.m-prog-fill { width: 65%; height: 100%; background: var(--accent); }
.m-prog-val { font-size: 11px; font-weight: 600; color: var(--text-2); font-family: var(--mono); }

.mini-skel-box { width: 180px; display: flex; flex-direction: column; gap: 6px; }
.m-skel { height: 10px; background: var(--hover); border-radius: 4px; }
.m-skel.line1 { width: 100%; }
.m-skel.line2 { width: 60%; }

.mini-spin-box { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: var(--text-2); }
.m-spin-arc { width: 18px; height: 18px; border: 2px solid var(--hairline); border-top-color: var(--accent); border-radius: 50%; animation: m-spin 0.8s linear infinite; }
@keyframes m-spin { to { transform: rotate(360deg); } }

.mini-stat-box { background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 10px 14px; width: 180px; box-shadow: var(--sh-card); }
.m-stat-top { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-2); font-weight: 600; }
.m-stat-badge { color: #248a3d; background: rgba(52,199,89,0.12); padding: 1px 5px; border-radius: 4px; font-size: 10px; }
.m-stat-val { font-size: 18px; font-weight: 750; color: var(--text); margin-top: 4px; }

.mini-spark-box { width: 120px; display: flex; align-items: center; justify-content: center; }

.mini-empty-box { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 18px; }
.m-empty-title { font-size: 12px; font-weight: 650; color: var(--text-2); }

.mini-tree-box { background: var(--surface); border: 1px solid var(--hairline); border-radius: 10px; padding: 8px 12px; width: 160px; font-size: 11.5px; font-weight: 550; color: var(--text); }
.m-indent { padding-left: 14px; color: var(--text-2); }

.mini-carousel-box { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.m-car-card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 10px; padding: 8px 20px; font-size: 11.5px; font-weight: 600; color: var(--text); }
.m-car-dots { display: flex; gap: 4px; }
.m-car-dots span { width: 6px; height: 6px; border-radius: 50%; background: var(--text-4); }
.m-car-dots span.active { background: var(--accent); width: 14px; border-radius: 999px; }

.mini-mac-banner { background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 8px 12px; width: 180px; box-shadow: var(--sh-overlay); }
.m-mac-head { font-size: 10px; color: var(--text-3); font-weight: 600; }
.m-mac-title { font-size: 12px; font-weight: 650; color: var(--text); margin-top: 2px; }

.mini-stack-box { display: flex; flex-direction: column; gap: 6px; width: 160px; }
.m-st-item { background: var(--surface); border: 1px solid var(--hairline); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; color: var(--text); }

.mini-divider-box { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 11px; color: var(--text-3); width: 160px; }

/* Page Templates Mini CSS */
.mini-hero-page {
  width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 10px;
}
.m-hero-nav { display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 700; color: var(--text); }
.m-btn-mini { background: var(--accent); color: #fff; padding: 2px 8px; border-radius: 999px; font-size: 9px; }
.m-hero-body { text-align: center; margin: auto 0; }
.m-pill { font-size: 8.5px; font-weight: 700; background: rgba(0,113,227,0.1); color: var(--accent); padding: 2px 6px; border-radius: 999px; }
.m-title { font-size: 13px; font-weight: 800; color: var(--text); margin-top: 4px; }

.mini-product-page { width: 100%; display: flex; flex-direction: column; gap: 8px; }
.m-store-head { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: var(--text); }
.m-bag { font-size: 10px; color: var(--text-2); }
.m-store-card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 8px; padding: 6px; display: flex; gap: 8px; align-items: center; }
.m-store-img { width: 36px; height: 36px; border-radius: 6px; background: linear-gradient(135deg, #0071e3, #af52de); }
.m-store-info { display: flex; flex-direction: column; font-size: 11px; color: var(--text); }

.mini-chat-page { width: 100%; height: 100%; display: flex; gap: 6px; background: var(--surface); border-radius: 8px; padding: 6px; border: 1px solid var(--hairline); }
.m-chat-side { width: 22px; border-right: 1px solid var(--hairline); font-size: 12px; display: flex; justify-content: center; }
.m-chat-main { flex: 1; display: flex; flex-direction: column; gap: 4px; font-size: 10px; }
.m-msg.ai span { background: var(--hover); color: var(--text); padding: 3px 6px; border-radius: 6px; display: inline-block; }
.m-msg.user { text-align: right; }
.m-msg.user span { background: var(--accent); color: #fff; padding: 3px 6px; border-radius: 6px; display: inline-block; }

.mini-dash-page { width: 100%; display: flex; flex-direction: column; gap: 6px; }
.m-dash-stats { display: flex; gap: 6px; }
.m-stat { flex: 1; background: var(--surface); border: 1px solid var(--hairline); border-radius: 6px; padding: 6px; font-size: 11px; color: var(--text); text-align: center; }
.m-dash-table { background: var(--surface); border: 1px solid var(--hairline); border-radius: 6px; padding: 6px 10px; font-size: 10.5px; font-weight: 600; color: var(--text-2); }
.m-hr { width: 100%; border: none; border-top: 1px solid var(--hairline); }

.mini-proj-section { background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 10px 14px; width: 220px; box-shadow: var(--sh-card); font-size: 11px; }
.m-proj-head { font-weight: 700; color: var(--text); margin-bottom: 6px; }
.m-proj-card { background: var(--hover); border: 1px solid var(--hairline); border-radius: 6px; padding: 4px 8px; font-weight: 600; color: var(--text-2); }

.mini-img-frame { width: 90px; height: 90px; background: var(--surface); border: 6px solid var(--hover); border-radius: 18px; box-shadow: var(--sh-card); display: flex; align-items: center; justify-content: center; }
.m-frame-inner { width: 100%; height: 100%; border-radius: 10px; background: linear-gradient(135deg, rgba(0,113,227,0.1), rgba(175,82,222,0.15)); display: flex; align-items: center; justify-content: center; }
.m-photo-icon { font-size: 22px; }

.mini-stepper-box { display: flex; align-items: center; gap: 4px; }
.m-step { width: 22px; height: 22px; border-radius: 50%; background: var(--hover); border: 1px solid var(--hairline); font-size: 10px; font-weight: 700; color: var(--text-3); display: flex; align-items: center; justify-content: center; }
.m-step.done { background: var(--accent); color: #fff; border-color: transparent; }
.m-step.active { background: var(--surface); border-color: var(--accent); color: var(--accent); font-weight: 800; }
.m-step-line { width: 20px; height: 2px; background: var(--hairline); }
.m-step-line.done { background: var(--accent); }

.mini-timeline-box { display: flex; flex-direction: column; gap: 6px; font-size: 11px; font-weight: 600; color: var(--text); }
.m-tl-item { display: flex; align-items: center; gap: 8px; }
.m-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.m-dot.primary { background: var(--accent); }
.m-dot.success { background: #34c759; }

.mini-grid-box { display: flex; gap: 6px; width: 200px; }
.m-g-col { flex: 1; height: 44px; background: var(--surface); border: 1px solid var(--hairline); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 600; color: var(--text-3); }

.mini-barchart-box { display: flex; align-items: flex-end; gap: 6px; height: 50px; }
.m-bar { width: 14px; background: rgba(0, 113, 227, 0.2); border-radius: 4px 4px 0 0; }
.m-bar.active { background: var(--accent); }

.mini-piechart-box { display: flex; align-items: center; gap: 10px; font-size: 11.5px; font-weight: 650; color: var(--text); }

.mini-toast-box { background: rgba(0, 0, 0, 0.82); color: #fff; border-radius: 999px; padding: 6px 14px; font-size: 11.5px; font-weight: 600; display: flex; align-items: center; gap: 8px; box-shadow: var(--sh-overlay); }
:root.dark .mini-toast-box { background: rgba(255, 255, 255, 0.9); color: #1d1d1f; }
.m-toast-icon { font-size: 13px; }

.mini-tour-card { background: var(--surface); border: 1px solid var(--hairline); border-radius: 14px; padding: 10px 14px; width: 200px; box-shadow: var(--sh-overlay); display: flex; flex-direction: column; gap: 6px; }
.m-tour-head { display: flex; justify-content: space-between; align-items: center; }
.m-tour-pill { font-size: 9px; font-weight: 800; color: var(--accent); background: rgba(0, 113, 227, 0.1); padding: 2px 6px; border-radius: 999px; }
.m-tour-close { font-size: 12px; color: var(--text-3); }
.m-tour-body { display: flex; align-items: center; gap: 8px; }
.m-tour-icon { font-size: 16px; }
.m-tour-title { font-size: 11.5px; font-weight: 700; color: var(--text); }

.mini-auth-page { width: 100%; background: var(--surface); border: 1px solid var(--hairline); border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; font-size: 11px; }
.m-auth-tabs { display: flex; gap: 10px; font-weight: 600; color: var(--text-3); border-bottom: 1px solid var(--hairline); padding-bottom: 4px; }
.m-auth-tabs span.active { color: var(--text); border-bottom: 2px solid var(--accent); }
.m-auth-field { background: var(--hover); border: 1px solid var(--hairline); border-radius: 6px; padding: 4px 8px; color: var(--text-3); }
.m-auth-btn { background: var(--accent); color: #fff; border-radius: 999px; text-align: center; padding: 4px; font-weight: 600; margin-top: 2px; }

.generic-preview { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 13px; font-weight: 650; color: var(--text-2); }
.m-icon-box { font-size: 24px; color: var(--accent); }

/* Meta Info */
.card-info { padding: 20px; flex: 1; display: flex; flex-direction: column; }
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.category-badge { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); }
.vue-ready-tag { font-size: 10.5px; font-weight: 600; background: rgba(52, 199, 89, 0.12); color: #248a3d; padding: 2px 7px; border-radius: var(--r-pill); }
.card-title { font-size: 16.5px; font-weight: 650; letter-spacing: -0.015em; color: var(--text); margin-bottom: 6px; }
.card-description { font-size: 13.5px; color: var(--text-2); line-height: 1.5; flex: 1; margin-bottom: 16px; }
.card-actions { display: flex; align-items: center; justify-content: space-between; font-size: 13px; font-weight: 600; margin-top: auto; }
.quick-copy-btn { border: none; background: var(--hover); color: var(--text); padding: 5px 11px; border-radius: var(--r-pill); font-family: var(--font); font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: background 0.15s; }
.quick-copy-btn:hover { background: var(--track); color: var(--text); }
.explore-link { color: var(--accent); }
.empty-state { text-align: center; padding: 60px 20px; background: var(--surface); border-radius: var(--r-card); border: 1px dashed var(--hairline); }
.empty-icon { font-size: 32px; margin-bottom: 12px; }
.reset-btn { margin-top: 16px; background: var(--accent); color: #fff; border: none; padding: 8px 18px; border-radius: var(--r-pill); font-weight: 600; cursor: pointer; }

/* ── Responsive Media Queries ── */
@media (max-width: 840px) {
  .catalog-section {
    padding: 32px 20px;
  }
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  .catalog-controls {
    margin-bottom: 24px;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .catalog-controls::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 600px) {
  .catalog-section {
    padding: 24px 16px;
  }
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .catalog-controls {
    margin-bottom: 18px;
    padding-bottom: 4px;
  }
  .card-info {
    padding: 16px;
  }
  .preview-box {
    height: 140px;
    padding: 14px;
  }
  .card-title {
    font-size: 15.5px;
  }
  .card-description {
    font-size: 13px;
    margin-bottom: 14px;
  }
  .empty-state {
    padding: 40px 16px;
  }
}

@media (max-width: 380px) {
  .catalog-section {
    padding: 16px 12px;
  }
  .card-info {
    padding: 14px 12px;
  }
  .quick-copy-btn {
    font-size: 11px;
    padding: 4px 8px;
  }
  .explore-link {
    font-size: 12px;
  }
}
</style>
