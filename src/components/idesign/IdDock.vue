<template>
  <div
    ref="dockWrapRef"
    :class="[
      'id-dock-wrap',
      `position-${resolvedPosition}`,
      `align-${resolvedAlignment}`,
      `dir-${currentDirection}`,
      `size-${currentSize}`,
      `variant-${currentVariant}`,
      `color-${currentColor}`,
      {
        'is-disabled': disabled,
        'has-safe-area': safeArea && ['bottom', 'top', 'left', 'right'].includes(resolvedPosition)
      },
      config.mergedUi.value.base
    ]"
    role="toolbar"
    :aria-label="ariaLabel"
    :aria-orientation="currentDirection"
    @keydown="handleKeyNavigation"
  >
    <div
      ref="containerRef"
      :class="['dock-container', config.mergedUi.value.container]"
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
      @focusout="onContainerFocusOut"
    >
      <!-- Leading / Start Slot -->
      <slot name="leading" />
      <slot name="start" />

      <!-- Default Slot if provided, otherwise render items list -->
      <slot>
        <div :class="['dock-list', config.mergedUi.value.list]">
          <div
            v-for="(item, index) in items"
            :key="item.id || index"
            :ref="el => setItemRef(el, index)"
            :class="['dock-item-wrapper', { 'is-separator': item.separator }]"
            :style="getItemWrapperStyle(index, item)"
          >
            <!-- Divider / Separator -->
            <div
              v-if="item.separator"
              :class="['dock-separator', config.mergedUi.value.separator]"
              role="separator"
              :aria-orientation="currentDirection === 'vertical' ? 'horizontal' : 'vertical'"
            />

            <!-- Item Button or Custom Slot -->
            <slot
              v-else
              name="item"
              :item="item"
              :index="index"
              :active="isItemActive(item)"
              :disabled="Boolean(disabled || item.disabled)"
              :scale="itemScales[index] || 1"
              :select="(e) => handleSelect(item, e)"
            >
              <button
                type="button"
                :class="[
                  'dock-item',
                  {
                    'is-active': isItemActive(item),
                    'is-disabled': Boolean(disabled || item.disabled),
                    'is-focused': focusedIndex === index
                  },
                  config.mergedUi.value.item,
                  isItemActive(item) ? config.mergedUi.value.active : '',
                  (disabled || item.disabled) ? config.mergedUi.value.disabled : ''
                ]"
                :disabled="Boolean(disabled || item.disabled)"
                :tabindex="getItemTabIndex(index)"
                :aria-label="item.label || item.tooltip"
                :aria-pressed="isItemActive(item)"
                :aria-disabled="Boolean(disabled || item.disabled)"
                @click="handleSelect(item, $event)"
                @focus="onItemFocus(index)"
                @blur="onItemBlur(index)"
              >
                <!-- Tooltip / Hover Label -->
                <div
                  v-if="shouldShowTooltip(item)"
                  :class="[
                    'dock-tooltip',
                    `tooltip-${resolvedTooltipPlacement}`,
                    config.mergedUi.value.label || config.mergedUi.value.tooltip
                  ]"
                  role="tooltip"
                  aria-hidden="true"
                >
                  <slot name="label" :item="item" :index="index">
                    {{ item.tooltip || item.label }}
                  </slot>
                </div>

                <!-- Icon Squircle Surface -->
                <div
                  :class="['icon-squircle', config.mergedUi.value.icon]"
                  :style="getIconSquircleStyle(item)"
                >
                  <slot
                    name="icon"
                    :item="item"
                    :index="index"
                    :active="isItemActive(item)"
                    :disabled="Boolean(disabled || item.disabled)"
                  >
                    <!-- Component Icon -->
                    <component
                      :is="item.icon"
                      v-if="item.icon && typeof item.icon !== 'string'"
                      :size="iconPixelSize"
                      class="dock-icon-svg"
                    />
                    <!-- Emoji / Short String -->
                    <span
                      v-else-if="typeof item.icon === 'string' && (item.icon.length <= 4 || isEmoji(item.icon))"
                      class="item-emoji"
                    >
                      {{ item.icon }}
                    </span>
                    <!-- Text Icon -->
                    <span
                      v-else-if="typeof item.icon === 'string' && item.icon"
                      class="item-text-icon"
                    >
                      {{ item.icon }}
                    </span>
                    <!-- Fallback Letter -->
                    <span v-else class="item-letter">
                      {{ item.label ? item.label[0].toUpperCase() : '•' }}
                    </span>
                  </slot>

                  <!-- Notification Badge -->
                  <slot
                    v-if="item.badge !== undefined && item.badge !== null && item.badge !== false"
                    name="badge"
                    :item="item"
                    :index="index"
                    :badge="item.badge"
                  >
                    <span
                      v-if="item.badge === true"
                      :class="['dock-badge-dot', config.mergedUi.value.badge]"
                      :style="item.badgeColor ? { background: item.badgeColor } : {}"
                    />
                    <span
                      v-else
                      :class="['dock-badge', config.mergedUi.value.badge]"
                      :style="item.badgeColor ? { background: item.badgeColor } : {}"
                    >
                      {{ item.badge }}
                    </span>
                  </slot>
                </div>

                <!-- Running / Active Dot Indicator -->
                <span
                  v-if="isItemActive(item) || item.showDot"
                  :class="['dock-dot', `dot-${resolvedDotPlacement}`, config.mergedUi.value.dot]"
                  aria-hidden="true"
                />
              </button>
            </slot>
          </div>
        </div>
      </slot>

      <!-- Trailing / End Slot -->
      <slot name="trailing" />
      <slot name="end" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  activeId: {
    type: [String, Number],
    default: undefined
  },
  modelValue: {
    type: [String, Number],
    default: undefined
  },
  variant: {
    type: String,
    default: undefined,
    validator: v => ['glass', 'solid', 'translucent', 'tinted', 'default'].includes(v)
  },
  size: {
    type: String,
    default: undefined,
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  direction: {
    type: String,
    default: undefined,
    validator: v => ['horizontal', 'vertical', 'auto'].includes(v)
  },
  position: {
    type: String,
    default: 'bottom',
    validator: v => ['bottom', 'top', 'left', 'right', 'none', 'static', 'relative'].includes(v)
  },
  alignment: {
    type: String,
    default: 'center',
    validator: v => ['start', 'center', 'end'].includes(v)
  },
  color: {
    type: String,
    default: undefined
  },
  magnification: {
    type: [Boolean, Number],
    default: true
  },
  magnifyDistance: {
    type: Number,
    default: 140
  },
  tooltip: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  safeArea: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: 'macOS Dock'
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['select', 'update:activeId', 'update:modelValue'])

const config = useIdesignConfig('Dock', props)
const currentSize = computed(() => config.resolvedSize.value || props.size || 'md')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || props.variant || 'glass'
  return resolveVariant(raw)
})
const currentColor = computed(() => {
  const c = config.resolvedColor.value || props.color || 'blue'
  if (c === 'default' || c === 'primary') return 'blue'
  return c
})

const resolvedPosition = computed(() => props.position || 'bottom')
const resolvedAlignment = computed(() => props.alignment || 'center')

const currentDirection = computed(() => {
  const dir = config.resolvedDirection.value || props.direction
  if (dir && dir !== 'auto') return dir
  if (resolvedPosition.value === 'left' || resolvedPosition.value === 'right') return 'vertical'
  return 'horizontal'
})

const currentActiveId = computed(() => {
  if (props.activeId !== undefined) return props.activeId
  if (props.modelValue !== undefined) return props.modelValue
  return undefined
})

const isItemActive = (item) => {
  if (item.active !== undefined) return Boolean(item.active)
  if (currentActiveId.value !== undefined && item.id !== undefined) {
    return String(item.id) === String(currentActiveId.value)
  }
  return false
}

const shouldShowTooltip = (item) => {
  if (props.tooltip === false) return false
  if (item.tooltip === false) return false
  return Boolean(item.label || item.tooltip)
}

const isEmoji = (str) => {
  if (typeof str !== 'string') return false
  try {
    return /\p{Extended_Pictographic}/u.test(str)
  } catch {
    return str.length <= 2
  }
}

// Icon Pixel Size mapping
const iconPixelSize = computed(() => {
  switch (currentSize.value) {
    case 'sm': return 16
    case 'lg': return 26
    case 'md':
    default: return 20
  }
})

// Dynamic Tooltip Placement
const resolvedTooltipPlacement = computed(() => {
  if (currentDirection.value === 'vertical') {
    return resolvedPosition.value === 'right' ? 'left' : 'right'
  }
  return resolvedPosition.value === 'top' ? 'bottom' : 'top'
})

// Dynamic Dot Placement
const resolvedDotPlacement = computed(() => {
  if (currentDirection.value === 'vertical') {
    return resolvedPosition.value === 'right' ? 'left' : 'right'
  }
  return resolvedPosition.value === 'top' ? 'top' : 'bottom'
})

// ── Magnification Physics & Interactive State ──
const dockWrapRef = ref(null)
const containerRef = ref(null)
const itemElements = ref([])
const itemScales = reactive({})
const isHovering = ref(false)
const focusedIndex = ref(-1)

const setItemRef = (el, index) => {
  if (el) {
    itemElements.value[index] = el
  }
}

const maxScaleFactor = computed(() => {
  if (props.magnification === false) return 1
  if (typeof props.magnification === 'number') return props.magnification
  switch (currentSize.value) {
    case 'sm': return 1.32
    case 'lg': return 1.45
    case 'md':
    default: return 1.38
  }
})

const onPointerMove = (e) => {
  if (props.magnification === false || props.disabled) return
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  isHovering.value = true
  const isVertical = currentDirection.value === 'vertical'
  const pointerCoord = isVertical ? e.clientY : e.clientX
  const distanceLimit = props.magnifyDistance || 140
  const maxFactor = maxScaleFactor.value

  const count = props.items.length
  for (let i = 0; i < count; i++) {
    const el = itemElements.value[i]
    if (!el || props.items[i]?.separator) {
      itemScales[i] = 1
      continue
    }

    const rect = el.getBoundingClientRect()
    const centerCoord = isVertical ? (rect.top + rect.height / 2) : (rect.left + rect.width / 2)
    const distance = Math.abs(pointerCoord - centerCoord)

    if (distance < distanceLimit) {
      // Smooth cosine bell curve
      const factor = Math.cos((distance / distanceLimit) * (Math.PI / 2)) ** 2
      itemScales[i] = 1 + (maxFactor - 1) * factor
    } else {
      itemScales[i] = 1
    }
  }
}

const onPointerLeave = () => {
  isHovering.value = false
  const count = props.items.length
  for (let i = 0; i < count; i++) {
    itemScales[i] = 1
  }
}

const getItemScale = (index) => {
  if (props.magnification === false) return 1
  if (focusedIndex.value === index && !isHovering.value) {
    return Math.min(1.2, maxScaleFactor.value)
  }
  return itemScales[index] || 1
}

const getItemWrapperStyle = (index, item) => {
  if (item.separator) return {}
  const scale = getItemScale(index)
  const isVertical = currentDirection.value === 'vertical'
  const pos = resolvedPosition.value

  // Directional lift calculation
  let tx = 0
  let ty = 0
  const liftAmount = (scale - 1) * (currentSize.value === 'sm' ? 14 : currentSize.value === 'lg' ? 22 : 18)

  if (isVertical) {
    if (pos === 'right') tx = -liftAmount
    else tx = liftAmount
  } else {
    if (pos === 'top') ty = liftAmount
    else ty = -liftAmount
  }

  return {
    '--dock-scale': scale,
    '--dock-tx': `${tx}px`,
    '--dock-ty': `${ty}px`,
    '--is-hovering': isHovering.value ? '1' : '0'
  }
}

const getIconSquircleStyle = (item) => {
  const styles = {}
  if (item.iconBg) {
    styles.background = item.iconBg
    styles.color = '#ffffff'
    styles.borderColor = 'transparent'
  }
  return styles
}

// ── Interactive Selection & Focus ──
const handleSelect = (item, event) => {
  if (props.disabled || item.disabled || item.separator) return
  if (typeof item.onClick === 'function') {
    item.onClick(event)
  }
  emit('select', item, event)
  if (item.id !== undefined) {
    emit('update:activeId', item.id)
    emit('update:modelValue', item.id)
  }
}

const onItemFocus = (index) => {
  focusedIndex.value = index
}

const onItemBlur = (index) => {
  if (focusedIndex.value === index) {
    focusedIndex.value = -1
  }
}

const onContainerFocusOut = (e) => {
  if (!containerRef.value?.contains(e.relatedTarget)) {
    focusedIndex.value = -1
  }
}

// ── Keyboard Navigation & Accessibility ──
const getItemTabIndex = (index) => {
  const item = props.items[index]
  if (props.disabled || item?.disabled || item?.separator) return -1
  if (focusedIndex.value === -1) {
    // Find first interactive item
    const firstInteractive = props.items.findIndex(it => !it.separator && !it.disabled)
    return index === firstInteractive ? 0 : -1
  }
  return focusedIndex.value === index ? 0 : -1
}

const focusItemByIndex = (targetIndex) => {
  if (targetIndex < 0 || targetIndex >= props.items.length) return
  const item = props.items[targetIndex]
  if (item?.separator || item?.disabled) return

  const el = itemElements.value[targetIndex]
  const btn = el?.querySelector('button') || el
  if (btn && typeof btn.focus === 'function') {
    btn.focus()
    focusedIndex.value = targetIndex
  }
}

const findNextInteractiveIndex = (currentIndex, step) => {
  const len = props.items.length
  let next = currentIndex + step
  while (next >= 0 && next < len) {
    const item = props.items[next]
    if (!item.separator && !item.disabled) return next
    next += step
  }
  return -1
}

const handleKeyNavigation = (e) => {
  const isVertical = currentDirection.value === 'vertical'
  const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'

  if (e.key === nextKey) {
    e.preventDefault()
    const nextIdx = findNextInteractiveIndex(focusedIndex.value === -1 ? 0 : focusedIndex.value, 1)
    if (nextIdx !== -1) focusItemByIndex(nextIdx)
  } else if (e.key === prevKey) {
    e.preventDefault()
    const prevIdx = findNextInteractiveIndex(focusedIndex.value === -1 ? 0 : focusedIndex.value, -1)
    if (prevIdx !== -1) focusItemByIndex(prevIdx)
  } else if (e.key === 'Home') {
    e.preventDefault()
    const first = findNextInteractiveIndex(-1, 1)
    if (first !== -1) focusItemByIndex(first)
  } else if (e.key === 'End') {
    e.preventDefault()
    const last = findNextInteractiveIndex(props.items.length, -1)
    if (last !== -1) focusItemByIndex(last)
  }
}

onBeforeUnmount(() => {
  itemElements.value = []
})
</script>

<style scoped>
/* ─── BASE WRAPPER & POSITIONING ─── */
.id-dock-wrap {
  display: flex;
  width: 100%;
  pointer-events: none;
  z-index: 60;
  box-sizing: border-box;
  font-family: var(--font);
}

/* Fixed Dock Positions */
.position-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 16px;
}

.position-bottom.has-safe-area {
  padding-bottom: max(16px, env(safe-area-inset-bottom, 16px));
}

.position-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: 16px;
}

.position-top.has-safe-area {
  padding-top: max(16px, env(safe-area-inset-top, 16px));
}

.position-left {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: auto;
  padding-left: 16px;
}

.position-left.has-safe-area {
  padding-left: max(16px, env(safe-area-inset-left, 16px));
}

.position-right {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: auto;
  padding-right: 16px;
}

.position-right.has-safe-area {
  padding-right: max(16px, env(safe-area-inset-right, 16px));
}

.position-none,
.position-static,
.position-relative {
  position: relative;
  width: 100%;
  padding: 0;
}

/* Alignments */
.dir-horizontal.align-center { justify-content: center; }
.dir-horizontal.align-start { justify-content: flex-start; padding-left: 20px; }
.dir-horizontal.align-end { justify-content: flex-end; padding-right: 20px; }

.dir-vertical.align-center { align-items: center; justify-content: center; }
.dir-vertical.align-start { align-items: flex-start; justify-content: flex-start; padding-top: 20px; }
.dir-vertical.align-end { align-items: flex-end; justify-content: flex-end; padding-bottom: 20px; }

/* ─── DOCK CONTAINER SURFACE ─── */
.dock-container {
  pointer-events: auto;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: var(--r-hero, 26px);
  box-sizing: border-box;
  transition: transform 0.3s var(--ease-spring), box-shadow 0.3s var(--ease-out-quart), background 0.3s ease;
}

.dir-vertical .dock-container {
  flex-direction: column;
}

/* ─── SIZES ─── */
.size-sm .dock-container {
  padding: 6px 8px;
  gap: 6px;
  border-radius: 20px;
}
.size-md .dock-container {
  padding: 8px 12px;
  gap: 8px;
  border-radius: 26px;
}
.size-lg .dock-container {
  padding: 10px 14px;
  gap: 10px;
  border-radius: 30px;
}

/* ─── VARIANTS ─── */
/* Glass (Apple Liquid Glass Standard) */
.variant-glass .dock-container {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.08));
  box-shadow: var(--sh-overlay, 0 2px 8px rgba(0,0,0,0.1), 0 30px 80px rgba(0,0,0,0.24));
}

:root.dark .variant-glass .dock-container,
.dark .variant-glass .dock-container {
  background: rgba(28, 28, 30, 0.78);
  border-color: var(--hairline, rgba(255, 255, 255, 0.12));
  box-shadow: var(--sh-overlay, 0 2px 8px rgba(0,0,0,0.4), 0 30px 80px rgba(0,0,0,0.6));
}

/* Solid */
.variant-solid .dock-container {
  background: var(--surface, #ffffff);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.08));
  box-shadow: var(--sh-panel, 0 1px 3px rgba(0,0,0,0.05), 0 14px 40px rgba(0,0,0,0.05));
}

:root.dark .variant-solid .dock-container,
.dark .variant-solid .dock-container {
  background: #1c1c1e;
  border-color: var(--hairline, rgba(255, 255, 255, 0.12));
}

/* Translucent */
.variant-translucent .dock-container {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.06));
  box-shadow: var(--sh-card, 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05));
}

:root.dark .variant-translucent .dock-container,
.dark .variant-translucent .dock-container {
  background: rgba(30, 30, 32, 0.52);
  border-color: var(--hairline, rgba(255, 255, 255, 0.1));
}

/* Tinted */
.variant-tinted .dock-container {
  background: rgba(0, 113, 227, 0.08);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0, 113, 227, 0.18);
  box-shadow: var(--sh-overlay);
}

:root.dark .variant-tinted .dock-container,
.dark .variant-tinted .dock-container {
  background: rgba(10, 132, 255, 0.15);
  border-color: rgba(10, 132, 255, 0.28);
}

/* ─── ITEMS LIST & WRAPPERS ─── */
.dock-list {
  display: flex;
  align-items: center;
  gap: inherit;
}

.dir-vertical .dock-list {
  flex-direction: column;
}

.dock-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: translate(var(--dock-tx, 0px), var(--dock-ty, 0px)) scale(var(--dock-scale, 1));
  transform-origin: center center;
  transition: transform 0.24s var(--ease-spring, cubic-bezier(0.32, 0.72, 0, 1));
  will-change: transform;
}

.position-bottom .dock-item-wrapper { transform-origin: bottom center; }
.position-top .dock-item-wrapper { transform-origin: top center; }
.position-left .dock-item-wrapper { transform-origin: center left; }
.position-right .dock-item-wrapper { transform-origin: center right; }

/* ─── SEPARATOR ─── */
.dock-separator {
  background: var(--hairline, rgba(0, 0, 0, 0.08));
  border-radius: 999px;
  flex-shrink: 0;
}

.dir-horizontal .dock-separator {
  width: 1px;
  height: 28px;
  margin: 0 4px;
}
.size-sm.dir-horizontal .dock-separator { height: 22px; margin: 0 2px; }
.size-lg.dir-horizontal .dock-separator { height: 34px; margin: 0 5px; }

.dir-vertical .dock-separator {
  height: 1px;
  width: 28px;
  margin: 4px 0;
}
.size-sm.dir-vertical .dock-separator { width: 22px; margin: 2px 0; }
.size-lg.dir-vertical .dock-separator { width: 34px; margin: 5px 0; }

:root.dark .dock-separator,
.dark .dock-separator {
  background: var(--hairline, rgba(255, 255, 255, 0.12));
}

/* ─── DOCK ITEM BUTTON ─── */
.dock-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 2px;
  margin: 0;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.dir-vertical .dock-item {
  flex-direction: row;
}

.dock-item:active .icon-squircle {
  transform: scale(0.93);
  transition: transform 0.1s var(--ease-out-quart);
}

.dock-item:focus-visible .icon-squircle {
  outline: 2px solid var(--accent, #0071e3);
  outline-offset: 2px;
}

/* ─── ICON SQUIRCLE ─── */
.icon-squircle {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--surface, #ffffff);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.08));
  color: var(--text, #1d1d1f);
  box-shadow: var(--sh-card, 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05));
  transition: box-shadow 0.2s var(--ease-out-quart), border-color 0.2s ease, transform 0.15s ease;
  box-sizing: border-box;
}

.size-sm .icon-squircle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-size: 16px;
}

.size-md .icon-squircle {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  font-size: 20px;
}

.size-lg .icon-squircle {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  font-size: 24px;
}

:root.dark .icon-squircle,
.dark .icon-squircle {
  background: #242426;
  border-color: var(--hairline, rgba(255, 255, 255, 0.1));
  color: var(--text, #f5f5f7);
}

.dock-item:hover .icon-squircle {
  box-shadow: var(--sh-lift, 0 12px 32px rgba(0,0,0,0.12));
  border-color: var(--accent, #0071e3);
}

:root.dark .dock-item:hover .icon-squircle,
.dark .dock-item:hover .icon-squircle {
  border-color: var(--accent, #0a84ff);
  box-shadow: 0 12px 32px rgba(0,0,0,0.45);
}

/* Icon Elements */
.dock-icon-svg {
  flex-shrink: 0;
  display: block;
}

.item-emoji {
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.size-sm .item-emoji { font-size: 18px; }
.size-md .item-emoji { font-size: 22px; }
.size-lg .item-emoji { font-size: 28px; }

.item-letter {
  font-weight: 700;
  letter-spacing: var(--tracking-tight, -0.02em);
}
.size-sm .item-letter { font-size: 14px; }
.size-md .item-letter { font-size: 18px; }
.size-lg .item-letter { font-size: 22px; }

.item-text-icon {
  font-size: 14px;
  font-weight: 600;
}

/* ─── TOOLTIP / FLOATING LABEL ─── */
.dock-tooltip {
  position: absolute;
  padding: 4px 10px;
  background: rgba(28, 28, 30, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: #ffffff;
  font-family: var(--font);
  font-size: 11.5px;
  font-weight: 550;
  letter-spacing: -0.01em;
  border-radius: var(--r-chip, 6px);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: opacity 0.16s var(--ease-spring), transform 0.16s var(--ease-spring);
  z-index: 100;
}

:root.dark .dock-tooltip,
.dark .dock-tooltip {
  background: rgba(44, 44, 46, 0.92);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Tooltip Placements */
.tooltip-top {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 6px) scale(0.92);
  margin-bottom: 10px;
}
.dock-item:hover .tooltip-top,
.dock-item.is-focused .tooltip-top {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}

.tooltip-bottom {
  top: 100%;
  left: 50%;
  transform: translate(-50%, -6px) scale(0.92);
  margin-top: 10px;
}
.dock-item:hover .tooltip-bottom,
.dock-item.is-focused .tooltip-bottom {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}

.tooltip-right {
  left: 100%;
  top: 50%;
  transform: translate(-6px, -50%) scale(0.92);
  margin-left: 10px;
}
.dock-item:hover .tooltip-right,
.dock-item.is-focused .tooltip-right {
  opacity: 1;
  transform: translate(0, -50%) scale(1);
}

.tooltip-left {
  right: 100%;
  top: 50%;
  transform: translate(6px, -50%) scale(0.92);
  margin-right: 10px;
}
.dock-item:hover .tooltip-left,
.dock-item.is-focused .tooltip-left {
  opacity: 1;
  transform: translate(0, -50%) scale(1);
}

/* ─── NOTIFICATION BADGES ─── */
.dock-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: var(--r-pill, 999px);
  background: var(--danger, #ff3b30);
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
  border: 2px solid var(--surface, #ffffff);
  z-index: 2;
  box-sizing: border-box;
}

.size-sm .dock-badge {
  min-width: 15px;
  height: 15px;
  font-size: 9px;
  padding: 0 3px;
  top: -3px;
  right: -3px;
}

.size-lg .dock-badge {
  min-width: 20px;
  height: 20px;
  font-size: 11.5px;
  top: -5px;
  right: -5px;
}

:root.dark .dock-badge,
.dark .dock-badge {
  border-color: #242426;
}

.dock-badge-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--danger, #ff3b30);
  border: 2px solid var(--surface, #ffffff);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

:root.dark .dock-badge-dot,
.dark .dock-badge-dot {
  border-color: #242426;
}

/* ─── RUNNING / ACTIVE INDICATOR DOT ─── */
.dock-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text, #1d1d1f);
  opacity: 0.85;
  transition: transform 0.2s ease, opacity 0.2s ease;
  flex-shrink: 0;
}

.dot-bottom {
  margin-top: 4px;
}

.dot-top {
  margin-bottom: 4px;
  order: -1;
}

.dot-right {
  margin-left: 4px;
}

.dot-left {
  margin-right: 4px;
  order: -1;
}

:root.dark .dock-dot,
.dark .dock-dot {
  background: #ffffff;
  opacity: 0.9;
}

/* Color Overrides for active state */
.color-blue.dock-item.is-active .dock-dot,
.color-blue .dock-item.is-active .dock-dot { background: var(--accent, #0071e3); }
.color-green.dock-item.is-active .dock-dot,
.color-green .dock-item.is-active .dock-dot { background: #34c759; }
.color-purple.dock-item.is-active .dock-dot,
.color-purple .dock-item.is-active .dock-dot { background: #af52de; }
.color-orange.dock-item.is-active .dock-dot,
.color-orange .dock-item.is-active .dock-dot { background: #ff9500; }
.color-red.dock-item.is-active .dock-dot,
.color-red .dock-item.is-active .dock-dot { background: #ff3b30; }

/* ─── DISABLED STATE ─── */
.is-disabled {
  opacity: 0.42;
  cursor: not-allowed;
  pointer-events: none;
}

.dock-item.is-disabled {
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── REDUCED MOTION ─── */
@media (prefers-reduced-motion: reduce) {
  .dock-item-wrapper,
  .dock-container,
  .icon-squircle,
  .dock-tooltip {
    transition: none !important;
    transform: none !important;
  }
  .dock-tooltip {
    transition: opacity 0.1s ease !important;
  }
}

/* ─── RESPONSIVE ADJUSTMENTS ─── */
@media (max-width: 640px) {
  .dock-container {
    gap: 4px;
    padding: 6px 8px;
    border-radius: 20px;
    max-width: 96vw;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .dock-container::-webkit-scrollbar {
    display: none;
  }
  .size-md .icon-squircle {
    width: 38px;
    height: 38px;
    border-radius: 11px;
    font-size: 17px;
  }
  .size-md .item-emoji {
    font-size: 18px;
  }
}
</style>
