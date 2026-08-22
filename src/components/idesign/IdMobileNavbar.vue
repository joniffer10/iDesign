<template>
  <nav
    :class="[
      'id-mobile-navbar-wrapper',
      `position-${currentPosition}`,
      `placement-${placement}`,
      {
        'has-safe-area': safeArea && (currentPosition === 'fixed' || currentPosition === 'sticky'),
        'is-full-width': fullWidth
      }
    ]"
    :aria-label="ariaLabel || 'Mobile Navigation'"
  >
    <div
      ref="navContainerRef"
      :class="[
        'id-mobile-navbar',
        `size-${currentSize}`,
        `variant-${currentVariant}`,
        `color-${currentColor}`,
        {
          'is-bordered': bordered,
          'has-animated-pill': animated
        },
        config.mergedUi.value.base
      ]"
      role="tablist"
      :aria-label="ariaLabel || 'Navigation Items'"
      @keydown="handleKeydown"
    >
      <!-- Optional Sliding Active Pill Indicator -->
      <div
        v-if="animated && indicatorStyle.width"
        class="id-navbar-pill-indicator"
        :style="indicatorStyle"
        aria-hidden="true"
      />

      <template v-for="(item, idx) in normalizedItems" :key="item.val">
        <slot
          name="item"
          :item="item"
          :active="currentActive === item.val"
          :index="idx"
          :select="() => selectItem(item)"
        >
          <button
            :id="`nav-item-${uid}-${item.val}`"
            :ref="el => { if (el) itemRefs[idx] = el }"
            type="button"
            role="tab"
            :aria-selected="currentActive === item.val"
            :aria-label="item.ariaLabel || item.lbl"
            :aria-disabled="item.disabled ? 'true' : undefined"
            :disabled="item.disabled"
            :tabindex="item.disabled ? -1 : (currentActive === item.val ? 0 : -1)"
            :class="[
              'id-navbar-item',
              {
                'is-active': currentActive === item.val,
                'is-disabled': item.disabled
              },
              config.mergedUi.value.item,
              currentActive === item.val ? config.mergedUi.value.active : ''
            ]"
            @click="selectItem(item)"
          >
            <!-- Icon Wrapper + Badge -->
            <div :class="['id-navbar-icon-box', config.mergedUi.value.icon]">
              <slot
                name="icon"
                :item="item"
                :active="currentActive === item.val"
                :index="idx"
              >
                <!-- Render Icon Component / SVG / String / Emoji -->
                <component
                  :is="item.icon"
                  v-if="item.icon && typeof item.icon !== 'string'"
                  :size="iconPixelSize"
                  class="id-navbar-icon-svg"
                />
                <span
                  v-else-if="typeof item.icon === 'string' && item.icon.length <= 4"
                  class="id-navbar-icon-emoji"
                >
                  {{ item.icon }}
                </span>
                <span
                  v-else-if="typeof item.icon === 'string'"
                  class="id-navbar-icon-text"
                >
                  {{ item.icon }}
                </span>
                <!-- Fallback Dot/Glyph if no icon provided -->
                <span v-else class="id-navbar-icon-fallback" />
              </slot>

              <!-- Badge / Notification indicator -->
              <slot
                name="badge"
                :item="item"
                :badge="item.badge"
                :active="currentActive === item.val"
              >
                <span
                  v-if="(item.badge !== undefined && item.badge !== null && item.badge !== false) || item.dot"
                  :class="[
                    'id-navbar-badge',
                    {
                      'is-dot': item.badge === true || item.dot,
                      'is-count': typeof item.badge === 'number' || (typeof item.badge === 'string' && item.badge.length > 0)
                    },
                    config.mergedUi.value.badge
                  ]"
                  :style="item.badgeColor ? { background: item.badgeColor } : {}"
                >
                  <template v-if="item.badge !== true && !item.dot">
                    {{ item.badge }}
                  </template>
                </span>
              </slot>
            </div>

            <!-- Label -->
            <span :class="['id-navbar-label', config.mergedUi.value.label]">
              <slot
                name="label"
                :item="item"
                :active="currentActive === item.val"
                :index="idx"
              >
                {{ item.lbl }}
              </slot>
            </span>
          </button>
        </slot>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: undefined
  },
  active: {
    type: [String, Number],
    default: undefined
  },
  items: {
    type: Array,
    default: () => [
      { id: 'home', label: 'Home' },
      { id: 'search', label: 'Search' },
      { id: 'activity', label: 'Activity' },
      { id: 'profile', label: 'Profile' }
    ]
  },
  size: {
    type: String,
    default: undefined,
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  variant: {
    type: String,
    default: undefined,
    validator: v => ['glass', 'liquid', 'solid', 'floating', 'elevated', 'bordered', 'flat', 'minimal', 'ghost'].includes(v)
  },
  color: {
    type: String,
    default: undefined,
    validator: v => ['blue', 'purple', 'green', 'orange', 'red', 'indigo', 'black'].includes(v)
  },
  position: {
    type: String,
    default: 'static',
    validator: v => ['static', 'fixed', 'sticky'].includes(v)
  },
  placement: {
    type: String,
    default: 'bottom',
    validator: v => ['bottom', 'top'].includes(v)
  },
  safeArea: {
    type: Boolean,
    default: true
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: true
  },
  bordered: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: 'Mobile Navigation'
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:active', 'change', 'select'])

const config = useIdesignConfig('MobileNavbar', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'glass'
  return resolveVariant(raw, null, {
    'elevated': 'floating',
    'ghost': 'minimal',
    'track': 'flat'
  })
})
const currentColor = computed(() => {
  const c = config.resolvedColor.value || 'blue'
  if (c === 'default' || c === 'primary') return 'blue'
  return c
})
const currentPosition = computed(() => props.position || 'static')

const uid = Math.random().toString(36).substring(2, 8)
const navContainerRef = ref(null)
const itemRefs = ref([])

const normalizedItems = computed(() => {
  return props.items.map((item, idx) => {
    if (typeof item === 'object' && item !== null) {
      const val = item.value !== undefined ? item.value : (item.id !== undefined ? item.id : (item.name !== undefined ? item.name : idx))
      const lbl = item.label || item.title || item.name || String(val)
      return {
        ...item,
        val,
        lbl,
        icon: item.icon,
        badge: item.badge,
        badgeColor: item.badgeColor,
        dot: item.dot,
        disabled: Boolean(item.disabled),
        ariaLabel: item.ariaLabel || lbl
      }
    }
    return {
      val: item,
      lbl: String(item),
      icon: null,
      badge: undefined,
      disabled: false,
      ariaLabel: String(item)
    }
  })
})

const initialValue = computed(() => {
  if (props.active !== undefined && props.active !== null && props.active !== '') {
    return props.active
  }
  if (props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '') {
    return props.modelValue
  }
  const firstEnabled = normalizedItems.value.find(i => !i.disabled)
  return firstEnabled ? firstEnabled.val : normalizedItems.value[0]?.val
})

const currentActive = ref(initialValue.value)

// Dynamic indicator calculation
const indicatorStyle = ref({
  left: '0px',
  width: '0px',
  height: '0px',
  top: '0px',
  opacity: 0
})

const updateIndicator = () => {
  if (!props.animated || typeof window === 'undefined' || !navContainerRef.value) return
  const activeIdx = normalizedItems.value.findIndex(item => item.val === currentActive.value)
  if (activeIdx >= 0 && itemRefs.value[activeIdx]) {
    const containerEl = navContainerRef.value
    const activeEl = itemRefs.value[activeIdx]
    const containerRect = containerEl.getBoundingClientRect()
    const activeRect = activeEl.getBoundingClientRect()

    const left = activeRect.left - containerRect.left + containerEl.scrollLeft
    const top = activeRect.top - containerRect.top + containerEl.scrollTop
    const width = activeRect.width
    const height = activeRect.height

    indicatorStyle.value = {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      opacity: 1
    }
  } else {
    indicatorStyle.value = { ...indicatorStyle.value, opacity: 0 }
  }
}

const iconPixelSize = computed(() => {
  switch (currentSize.value) {
    case 'sm': return 18
    case 'lg': return 24
    case 'md':
    default: return 20
  }
})

watch(() => [props.active, props.modelValue], ([newActive, newModel]) => {
  if (newActive !== undefined && newActive !== null && newActive !== '') {
    currentActive.value = newActive
  } else if (newModel !== undefined && newModel !== null && newModel !== '') {
    currentActive.value = newModel
  }
  nextTick(updateIndicator)
})

watch(() => props.items, () => {
  nextTick(updateIndicator)
}, { deep: true })

const selectItem = (item) => {
  if (item.disabled) return
  currentActive.value = item.val
  emit('update:modelValue', item.val)
  emit('update:active', item.val)
  emit('change', item.val)
  emit('select', item)
  nextTick(updateIndicator)
}

// Keyboard navigation for tablist
const handleKeydown = (e) => {
  const enabledItems = normalizedItems.value.filter(i => !i.disabled)
  if (!enabledItems.length) return

  const currentIdx = enabledItems.findIndex(i => i.val === currentActive.value)
  let targetIdx = -1

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault()
    targetIdx = currentIdx < enabledItems.length - 1 ? currentIdx + 1 : 0
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    targetIdx = currentIdx > 0 ? currentIdx - 1 : enabledItems.length - 1
  } else if (e.key === 'Home') {
    e.preventDefault()
    targetIdx = 0
  } else if (e.key === 'End') {
    e.preventDefault()
    targetIdx = enabledItems.length - 1
  }

  if (targetIdx >= 0 && enabledItems[targetIdx]) {
    const targetItem = enabledItems[targetIdx]
    selectItem(targetItem)
    const fullIdx = normalizedItems.value.findIndex(i => i.val === targetItem.val)
    if (itemRefs.value[fullIdx]) {
      itemRefs.value[fullIdx].focus()
    }
  }
}

onMounted(() => {
  nextTick(() => {
    updateIndicator()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateIndicator, { passive: true })
    }
  })
})
</script>

<style scoped>
/* ── Outer Wrapper & Positioning ── */
.id-mobile-navbar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  z-index: 60;
  pointer-events: none;
}

.id-mobile-navbar-wrapper.position-static {
  position: relative;
  pointer-events: auto;
}

.id-mobile-navbar-wrapper.position-fixed {
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 16px;
}

.id-mobile-navbar-wrapper.position-sticky {
  position: sticky;
  left: 0;
  right: 0;
  padding: 0 16px;
}

.id-mobile-navbar-wrapper.placement-bottom.position-fixed,
.id-mobile-navbar-wrapper.placement-bottom.position-sticky {
  bottom: 16px;
}

.id-mobile-navbar-wrapper.placement-top.position-fixed,
.id-mobile-navbar-wrapper.placement-top.position-sticky {
  top: 16px;
}

.id-mobile-navbar-wrapper.has-safe-area.placement-bottom {
  bottom: max(16px, env(safe-area-inset-bottom));
  padding-bottom: max(0px, env(safe-area-inset-bottom));
}

.id-mobile-navbar-wrapper.has-safe-area.placement-top {
  top: max(16px, env(safe-area-inset-top));
}

.id-mobile-navbar-wrapper.is-full-width {
  padding: 0;
}

.id-mobile-navbar-wrapper.is-full-width .id-mobile-navbar {
  max-width: 100%;
  border-radius: 0;
  width: 100%;
}

/* ── Large Pill Container ── */
.id-mobile-navbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  border-radius: var(--r-pill, 999px);
  padding: 6px;
  gap: 4px;
  box-sizing: border-box;
  user-select: none;
  font-family: var(--font);
  pointer-events: auto;
  transition: all 0.24s var(--ease-out-quart);
  overflow: hidden;
}

/* ── Variants ── */
.variant-glass {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  box-shadow: var(--sh-overlay, 0 12px 36px rgba(0, 0, 0, 0.12));
}

:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.82);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
}

.variant-liquid {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(245, 245, 247, 0.78) 100%);
  backdrop-filter: saturate(200%) blur(28px);
  -webkit-backdrop-filter: saturate(200%) blur(28px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: 
    0 16px 40px rgba(0, 113, 227, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.06),
    inset 0 1px 2px rgba(255, 255, 255, 0.95),
    inset 0 -1px 2px rgba(0, 0, 0, 0.04);
}

:root.dark .variant-liquid {
  background: linear-gradient(135deg, rgba(35, 35, 40, 0.88) 0%, rgba(20, 20, 24, 0.82) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 16px 44px rgba(0, 0, 0, 0.55),
    0 0 24px rgba(10, 132, 255, 0.14),
    inset 0 1px 2px rgba(255, 255, 255, 0.22),
    inset 0 -1px 2px rgba(0, 0, 0, 0.4);
}

.variant-floating {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.08));
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.04);
}

:root.dark .variant-floating {
  background: rgba(28, 28, 30, 0.94);
  box-shadow: 0 20px 54px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.3);
}

.variant-solid {
  background: var(--surface, #ffffff);
  box-shadow: var(--sh-panel, 0 8px 30px rgba(0, 0, 0, 0.08));
}

:root.dark .variant-solid {
  background: var(--surface, #1c1c1e);
}

.variant-bordered {
  background: var(--surface, #ffffff);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.1));
  box-shadow: var(--sh-card, 0 2px 8px rgba(0, 0, 0, 0.04));
}

:root.dark .variant-bordered {
  background: var(--surface, #1c1c1e);
}

.variant-flat {
  background: var(--track, #e8e8ed);
  box-shadow: none;
}

:root.dark .variant-flat {
  background: var(--track, #2c2c2e);
}

.variant-minimal {
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: none;
  border: none;
}

.is-bordered.variant-glass {
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
}

.is-bordered.variant-solid {
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
}

/* ── Sizes ── */
.size-sm {
  padding: 4px;
  gap: 2px;
}
.size-sm .id-navbar-item {
  min-height: 44px;
  padding: 4px 6px;
  border-radius: var(--r-pill, 999px);
}
.size-sm .id-navbar-label {
  font-size: 10px;
  margin-top: 1px;
}

.size-md {
  padding: 5px;
  gap: 4px;
}
.size-md .id-navbar-item {
  min-height: 50px;
  padding: 6px 8px;
  border-radius: var(--r-pill, 999px);
}
.size-md .id-navbar-label {
  font-size: 11px;
  margin-top: 2px;
}

.size-lg {
  padding: 6px;
  gap: 6px;
}
.size-lg .id-navbar-item {
  min-height: 56px;
  padding: 8px 12px;
  border-radius: var(--r-pill, 999px);
}
.size-lg .id-navbar-label {
  font-size: 12px;
  margin-top: 3px;
}

/* ── Sliding Indicator Pill ── */
.id-navbar-pill-indicator {
  position: absolute;
  border-radius: var(--r-pill, 999px);
  background: var(--surface, #ffffff);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  pointer-events: none;
  z-index: 1;
  transition: all 0.28s var(--ease-spring, cubic-bezier(0.32, 0.72, 0, 1));
}

:root.dark .id-navbar-pill-indicator {
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
}

.variant-flat .id-navbar-pill-indicator {
  background: var(--surface, #ffffff);
}
:root.dark .variant-flat .id-navbar-pill-indicator {
  background: rgba(255, 255, 255, 0.14);
}

/* ── Navigation Item ── */
.id-navbar-item {
  position: relative;
  z-index: 2;
  flex: 1 1 0px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  color: var(--text-2, #6e6e73);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.16s var(--ease-spring);
  -webkit-tap-highlight-color: transparent;
}

.id-navbar-item:active:not(.is-disabled) {
  transform: scale(0.95);
}

.id-navbar-item:hover:not(.is-disabled) {
  color: var(--text, #1d1d1f);
}

.id-navbar-item.is-disabled {
  opacity: 0.35;
  cursor: not-allowed;
  pointer-events: none;
}

/* Fallback static active background when animated is false */
.id-mobile-navbar:not(.has-animated-pill) .id-navbar-item.is-active {
  background: var(--surface, #ffffff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}

:root.dark .id-mobile-navbar:not(.has-animated-pill) .id-navbar-item.is-active {
  background: rgba(255, 255, 255, 0.12);
}

/* ── Icon Box & Centering ── */
.id-navbar-icon-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: currentColor;
  transition: transform 0.2s var(--ease-spring);
}

.id-navbar-icon-svg {
  display: block;
  stroke-width: 2px;
  color: currentColor;
}

.id-navbar-icon-emoji {
  font-size: 18px;
  line-height: 1;
}

.id-navbar-icon-text {
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
}

.id-navbar-icon-fallback {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

/* ── Label ── */
.id-navbar-label {
  display: block;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: currentColor;
  transition: font-weight 0.15s ease;
}

.id-navbar-item.is-active .id-navbar-label {
  font-weight: 650;
}

/* ── Badge / Dot Notification Indicator ── */
.id-navbar-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--danger, #ff3b30);
  color: #ffffff;
  font-family: var(--font);
  font-variant-numeric: tabular-nums;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  border-radius: var(--r-pill, 999px);
  padding: 2px 5px;
  min-width: 15px;
  height: 15px;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  z-index: 3;
}

.id-navbar-badge.is-dot {
  width: 7px;
  height: 7px;
  min-width: 7px;
  padding: 0;
  top: -2px;
  right: -4px;
  border-radius: 50%;
}

/* ── Active Color States ── */
.id-navbar-item.is-active {
  color: var(--accent, #0071e3);
}

.color-blue .id-navbar-item.is-active {
  color: var(--accent, #0071e3);
}
:root.dark .color-blue .id-navbar-item.is-active {
  color: var(--accent, #0a84ff);
}

.color-purple .id-navbar-item.is-active {
  color: var(--indigo, #5e5ce6);
}

.color-green .id-navbar-item.is-active {
  color: var(--live, #30d158);
}

.color-orange .id-navbar-item.is-active {
  color: var(--heat, #ff6b00);
}

.color-red .id-navbar-item.is-active {
  color: var(--danger, #ff3b30);
}

.color-indigo .id-navbar-item.is-active {
  color: #5856d6;
}

.color-black .id-navbar-item.is-active {
  color: var(--text, #1d1d1f);
}
:root.dark .color-black .id-navbar-item.is-active {
  color: var(--text, #f5f5f7);
}

/* ── Reduced Motion Accessibility ── */
@media (prefers-reduced-motion: reduce) {
  .id-navbar-pill-indicator,
  .id-navbar-item,
  .id-navbar-icon-box {
    transition: none !important;
  }
}

/* ── Mobile Layout Adjustments ── */
@media (max-width: 480px) {
  .id-mobile-navbar {
    max-width: 100%;
  }
}
</style>
