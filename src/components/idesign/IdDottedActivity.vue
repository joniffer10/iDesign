<template>
  <div
    :class="[
      'id-dotted-activity',
      `variant-${computedVariant}`,
      `color-${currentColor}`,
      `size-${currentSize}`,
      { 'is-disabled': disabled, 'is-readonly': readonly, 'is-responsive': responsive },
      config.mergedUi.value.base
    ]"
    :style="customStyle"
  >
    <!-- Header / Stats Bar (shown in panel/default mode if showStats or header slot used) -->
    <div
      v-if="($slots.header || showStats) && computedVariant !== 'minimal'"
      :class="['activity-header', config.mergedUi.value.header]"
    >
      <slot name="header">
        <div class="activity-summary">
          <span class="total-count">{{ totalValueFormatted }}</span>
          <span class="total-label">{{ totalLabel }}</span>
        </div>
      </slot>
    </div>

    <!-- Main Container / Scroll Wrapper -->
    <div class="activity-scroll-wrapper" ref="scrollContainer">
      <div :class="['activity-container', config.mergedUi.value.grid]">
        <!-- Day Labels (Optional, left axis) -->
        <div v-if="showLabels && hasDateInfo" class="axis-y-labels" aria-hidden="true">
          <span
            v-for="(dayLabel, dIdx) in dayLabels"
            :key="dIdx"
            class="day-label"
            :style="{ height: dotSizePx, lineHeight: dotSizePx, marginBottom: gapPx }"
          >
            {{ dayLabel }}
          </span>
        </div>

        <div class="activity-grid-body">
          <!-- Month/Date Column Header Labels (Optional, top axis) -->
          <div v-if="showLabels && hasDateInfo && monthLabels.length > 0" class="axis-x-labels" aria-hidden="true">
            <span
              v-for="(m, mIdx) in monthLabels"
              :key="mIdx"
              class="month-label"
              :style="{ left: `${m.colIndex * (numericSize + numericGap)}px` }"
            >
              {{ m.name }}
            </span>
          </div>

          <!-- Dots Grid -->
          <div
            class="dots-grid"
            role="grid"
            :aria-label="ariaGridLabel"
            :style="gridStyle"
            @mouseleave="handleMouseLeave"
          >
            <div
              v-for="(dot, index) in processedDots"
              :key="dot.id || index"
              ref="dotRefs"
              role="gridcell"
              :tabindex="isDotFocusable(index) ? 0 : -1"
              :aria-label="dot.ariaLabel"
              :aria-selected="isSelected(dot, index)"
              :class="[
                'activity-dot',
                `intensity-${dot.intensity}`,
                `shape-${computedShape}`,
                {
                  'is-active': isSelected(dot, index),
                  'is-hovered': activeHoverIndex === index,
                  'is-empty': dot.intensity === 0
                },
                config.mergedUi.value.dot,
                isSelected(dot, index) ? config.mergedUi.value.active : ''
              ]"
              :style="getDotStyle(dot, index)"
              @mouseenter="handleMouseEnter(dot, index, $event)"
              @focus="handleMouseEnter(dot, index, $event)"
              @blur="handleMouseBlur(index)"
              @click="handleDotClick(dot, index, $event)"
              @keydown="handleKeyDown(index, $event)"
            >
              <slot name="dot" :dot="dot" :index="index">
                <span class="dot-inner" />
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer & Intensity Legend -->
    <div
      v-if="showLegend || $slots.footer"
      :class="['activity-footer', config.mergedUi.value.legend]"
    >
      <slot name="footer">
        <div v-if="showLegend" class="intensity-legend">
          <span class="legend-text">{{ legendLessLabel }}</span>
          <div class="legend-dots">
            <span
              v-for="lvl in 5"
              :key="lvl - 1"
              :class="['legend-dot', `intensity-${lvl - 1}`, `shape-${computedShape}`, `color-${currentColor}`]"
              :style="getLegendDotStyle(lvl - 1)"
              :title="`Level ${lvl - 1}`"
            />
          </div>
          <span class="legend-text">{{ legendMoreLabel }}</span>
        </div>
      </slot>
    </div>

    <!-- Floating Hover Tooltip -->
    <Teleport to="body" :disabled="!teleportTooltip">
      <Transition name="id-dot-tooltip-fade">
        <div
          v-if="showTooltip && activeHoverDot && isTooltipVisible"
          ref="tooltipRef"
          :class="['id-activity-tooltip', config.mergedUi.value.tooltip]"
          :style="tooltipStyle"
          role="tooltip"
        >
          <slot name="tooltip" :dot="activeHoverDot">
            <div class="tooltip-content">
              <span class="tooltip-val">{{ activeHoverDot.formattedValue }}</span>
              <span v-if="activeHoverDot.formattedDate" class="tooltip-date">
                {{ activeHoverDot.formattedDate }}
              </span>
            </div>
          </slot>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  data: {
    type: Array,
    default: () => null
  },
  rows: {
    type: Number,
    default: 7
  },
  cols: {
    type: Number,
    default: undefined
  },
  columns: {
    type: Number,
    default: undefined
  },
  variant: {
    type: String,
    default: undefined,
    validator: (v) => ['default', 'rounded', 'square', 'minimal'].includes(v)
  },
  color: {
    type: String,
    default: undefined
  },
  size: {
    type: [String, Number],
    default: undefined
  },
  gap: {
    type: [String, Number],
    default: undefined
  },
  radius: {
    type: [String, Number],
    default: undefined
  },
  thresholds: {
    type: Array,
    default: () => null
  },
  max: {
    type: Number,
    default: undefined
  },
  showTooltip: {
    type: Boolean,
    default: true
  },
  teleportTooltip: {
    type: Boolean,
    default: true
  },
  tooltipFormatter: {
    type: Function,
    default: null
  },
  showLegend: {
    type: Boolean,
    default: true
  },
  showLabels: {
    type: Boolean,
    default: true
  },
  showStats: {
    type: Boolean,
    default: true
  },
  totalLabel: {
    type: String,
    default: 'activities in the last year'
  },
  legendLessLabel: {
    type: String,
    default: 'Less'
  },
  legendMoreLabel: {
    type: String,
    default: 'More'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  responsive: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: [Object, String, Number],
    default: null
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click-dot', 'select', 'update:modelValue', 'hover-dot'])

const config = useIdesignConfig('DottedActivity', props)

const computedVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))

const currentColor = computed(() => {
  const c = resolvedColor.value
  if (c === 'primary') return 'accent'
  return c || 'accent'
})

// Custom size calculations
const numericSize = computed(() => {
  const s = props.size || resolvedSize.value
  if (typeof s === 'number') return s
  if (s === 'xs') return 8
  if (s === 'sm') return 10
  if (s === 'md') return 12
  if (s === 'lg') return 15
  if (s === 'xl') return 18
  const parsed = parseInt(s, 10)
  return isNaN(parsed) ? 12 : parsed
})

const numericGap = computed(() => {
  const g = props.gap
  if (typeof g === 'number') return g
  if (g === '2xs') return 2
  if (g === 'xs') return 3
  if (g === 'sm') return 4
  if (g === 'md') return 6
  if (g === 'lg') return 8
  const parsed = parseInt(g, 10)
  return isNaN(parsed) ? 3 : parsed
})

const dotSizePx = computed(() => `${numericSize.value}px`)
const gapPx = computed(() => `${numericGap.value}px`)

const computedShape = computed(() => {
  if (props.radius === 'full' || props.radius === 'circle' || computedVariant.value === 'rounded') {
    return 'circle'
  }
  if (props.radius === 0 || props.radius === 'none' || computedVariant.value === 'square') {
    return 'square'
  }
  return 'rounded'
})

const computedRadiusPx = computed(() => {
  if (props.radius !== undefined) {
    if (props.radius === 'full' || props.radius === 'circle') return '999px'
    if (props.radius === 'none' || props.radius === 0) return '0px'
    if (typeof props.radius === 'number') return `${props.radius}px`
    return props.radius
  }
  if (computedShape.value === 'circle') return '999px'
  if (computedShape.value === 'square') return '2px'
  return `${Math.max(2, Math.round(numericSize.value * 0.25))}px`
})

// Custom style object
const customStyle = computed(() => {
  return {
    '--dot-size': dotSizePx.value,
    '--dot-gap': gapPx.value,
    '--dot-radius': computedRadiusPx.value
  }
})

// Generate realistic dummy data for a full year if none provided
const sampleData = computed(() => {
  if (props.data && Array.isArray(props.data) && props.data.length > 0) {
    return props.data
  }
  
  // Default: generate 52 weeks (7 rows x 52 cols = 364 days = 1 full year) ending today
  const items = []
  const defaultCols = props.cols || props.columns || 52
  const totalDots = (props.rows || 7) * defaultCols
  const today = new Date()
  
  for (let i = totalDots - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    
    // Seed pseudo-random values to make realistic contribution/activity pattern
    const seed = (i * 17 + d.getDay() * 31) % 100
    let value = 0
    if (seed > 35 && seed <= 60) value = Math.floor(seed % 4) + 1
    else if (seed > 60 && seed <= 82) value = Math.floor(seed % 8) + 3
    else if (seed > 82) value = Math.floor(seed % 14) + 6
    
    items.push({
      date: d,
      value: value,
      label: `${value} ${value === 1 ? 'activity' : 'activities'}`
    })
  }
  return items
})

// Process dots and normalize intensity levels 0..4
const processedDots = computed(() => {
  const rawList = sampleData.value
  if (!rawList || rawList.length === 0) return []

  // Extract raw numerical values
  const values = rawList.map(item => {
    if (typeof item === 'number') return item
    if (item && typeof item === 'object') {
      if (typeof item.value === 'number') return item.value
      if (typeof item.count === 'number') return item.count
      if (typeof item.intensity === 'number') return item.intensity
    }
    return 0
  })

  let maxVal = props.max
  if (maxVal === undefined) {
    maxVal = Math.max(...values, 1)
  }

  const customThresholds = props.thresholds

  return rawList.map((item, idx) => {
    let rawVal = 0
    let dateObj = null
    let customLabel = null
    let explicitIntensity = null

    if (typeof item === 'number') {
      rawVal = item
    } else if (item && typeof item === 'object') {
      rawVal = item.value ?? item.count ?? 0
      explicitIntensity = item.intensity
      if (item.date) {
        dateObj = item.date instanceof Date ? item.date : new Date(item.date)
      }
      customLabel = item.label || item.tooltip
    }

    // Determine intensity 0..4
    let intensity = 0
    if (explicitIntensity !== null && explicitIntensity !== undefined) {
      intensity = Math.min(4, Math.max(0, Math.round(explicitIntensity)))
    } else if (rawVal <= 0) {
      intensity = 0
    } else if (customThresholds && Array.isArray(customThresholds) && customThresholds.length >= 4) {
      if (rawVal >= customThresholds[3]) intensity = 4
      else if (rawVal >= customThresholds[2]) intensity = 3
      else if (rawVal >= customThresholds[1]) intensity = 2
      else intensity = 1
    } else {
      // Dynamic ratio mapping
      const ratio = rawVal / Math.max(1, maxVal)
      if (ratio > 0.75) intensity = 4
      else if (ratio > 0.45) intensity = 3
      else if (ratio > 0.2) intensity = 2
      else intensity = 1
    }

    // Formatting date
    let formattedDate = ''
    if (dateObj && !isNaN(dateObj.getTime())) {
      formattedDate = config.formatDate(dateObj, { month: 'short', day: 'numeric', year: 'numeric' })
    }

    // Formatting value label
    let formattedValue = ''
    if (props.tooltipFormatter) {
      formattedValue = props.tooltipFormatter(item, idx)
    } else if (customLabel) {
      formattedValue = customLabel
    } else {
      const unit = rawVal === 1 ? 'activity' : 'activities'
      formattedValue = rawVal === 0 ? `No activity` : `${rawVal} ${unit}`
    }

    const ariaLabel = formattedDate ? `${formattedValue} on ${formattedDate}` : formattedValue

    return {
      id: item?.id ?? idx,
      index: idx,
      value: rawVal,
      intensity,
      date: dateObj,
      formattedDate,
      formattedValue,
      ariaLabel,
      original: item
    }
  })
})

const numColumns = computed(() => {
  if (props.cols || props.columns) return props.cols || props.columns
  const total = processedDots.value.length
  return Math.ceil(total / Math.max(1, props.rows))
})

const gridStyle = computed(() => {
  return {
    display: 'grid',
    gridTemplateRows: `repeat(${props.rows}, ${dotSizePx.value})`,
    gridTemplateColumns: `repeat(${numColumns.value}, ${dotSizePx.value})`,
    gridAutoFlow: 'column',
    gap: gapPx.value
  }
})

// Summary stats calculations
const totalValue = computed(() => {
  return processedDots.value.reduce((sum, d) => sum + d.value, 0)
})

const totalValueFormatted = computed(() => {
  return config.formatNumber(totalValue.value)
})

const hasDateInfo = computed(() => {
  return processedDots.value.some(d => d.date && !isNaN(d.date.getTime()))
})

// Axis Labels
const dayLabels = computed(() => {
  if (props.rows === 7) {
    return ['', 'Mon', '', 'Wed', '', 'Fri', '']
  }
  return []
})

const monthLabels = computed(() => {
  if (!hasDateInfo.value) return []
  const labels = []
  let lastMonth = -1
  let lastColIndex = -10
  const cols = numColumns.value
  const rows = props.rows

  for (let c = 0; c < cols; c++) {
    const dotIdx = c * rows
    const dot = processedDots.value[dotIdx]
    if (dot && dot.date) {
      const m = dot.date.getMonth()
      if (m !== lastMonth) {
        lastMonth = m
        // Prevent Month labels from overlapping if transitions occur within 2 columns
        if (c - lastColIndex >= 2) {
          const monthName = dot.date.toLocaleDateString(config.localeRef.value || 'en', { month: 'short' })
          labels.push({ name: monthName, colIndex: c })
          lastColIndex = c
        }
      }
    }
  }
  return labels
})

// Selection state
const isSelected = (dot, idx) => {
  if (!props.modelValue) return false
  if (typeof props.modelValue === 'object') {
    return props.modelValue === dot.original || props.modelValue?.id === dot.id || props.modelValue?.date === dot.date
  }
  return props.modelValue === dot.value || props.modelValue === idx
}

// Focus Management
const focusedIndex = ref(0)
const isDotFocusable = (idx) => idx === focusedIndex.value

// Hover & Tooltip logic
const activeHoverIndex = ref(null)
const activeHoverDot = computed(() => {
  if (activeHoverIndex.value === null) return null
  return processedDots.value[activeHoverIndex.value] || null
})
const isTooltipVisible = ref(false)
const tooltipRef = ref(null)
const dotRefs = ref([])
const tooltipPosition = ref({ top: 0, left: 0 })

const tooltipStyle = computed(() => {
  return {
    position: 'fixed',
    top: `${tooltipPosition.value.top}px`,
    left: `${tooltipPosition.value.left}px`,
    transform: 'translate(-50%, -100%) translateY(-8px)',
    pointerEvents: 'none',
    zIndex: 9999
  }
})

const updateTooltipPos = (el) => {
  if (!el) return
  const rect = el.getBoundingClientRect()
  tooltipPosition.value = {
    top: rect.top,
    left: rect.left + rect.width / 2
  }
}

const handleMouseEnter = (dot, index, event) => {
  if (props.disabled) return
  activeHoverIndex.value = index
  focusedIndex.value = index
  updateTooltipPos(event.currentTarget)
  isTooltipVisible.value = true
  emit('hover-dot', { dot, index, event })
}

const handleMouseBlur = (index) => {
  if (activeHoverIndex.value === index) {
    isTooltipVisible.value = false
    activeHoverIndex.value = null
  }
}

const handleMouseLeave = () => {
  isTooltipVisible.value = false
  activeHoverIndex.value = null
}

const handleDotClick = (dot, index, event) => {
  if (props.disabled || props.readonly) return
  emit('click-dot', { dot: dot.original, info: dot, index, event })
  emit('select', dot.original)
  emit('update:modelValue', dot.original)
}

// Keyboard Navigation (Arrow Keys)
const handleKeyDown = (index, event) => {
  if (props.disabled) return

  const rows = props.rows
  const total = processedDots.value.length
  let targetIndex = index

  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      targetIndex = Math.max(0, index - 1)
      break
    case 'ArrowDown':
      event.preventDefault()
      targetIndex = Math.min(total - 1, index + 1)
      break
    case 'ArrowLeft':
      event.preventDefault()
      targetIndex = Math.max(0, index - rows)
      break
    case 'ArrowRight':
      event.preventDefault()
      targetIndex = Math.min(total - 1, index + rows)
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      handleDotClick(processedDots.value[index], index, event)
      return
  }

  if (targetIndex !== index && dotRefs.value[targetIndex]) {
    focusedIndex.value = targetIndex
    dotRefs.value[targetIndex].focus()
    updateTooltipPos(dotRefs.value[targetIndex])
    activeHoverIndex.value = targetIndex
    isTooltipVisible.value = true
  }
}

// Dynamic style generation per dot
const getDotStyle = (dot, idx) => {
  return {}
}

const getLegendDotStyle = (lvl) => {
  return {}
}

const ariaGridLabel = computed(() => {
  return `Activity grid chart with ${processedDots.value.length} dates`
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   LIQUID GLASS DOTTED ACTIVITY COMPONENT STYLES
   ═══════════════════════════════════════════════════════ */

.id-dotted-activity {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: var(--font);
  color: var(--text);
  user-select: none;
  box-sizing: border-box;
}

/* Variant: Default (Panel container wrapper) */
.variant-default {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-panel);
  padding: 16px 20px;
  box-shadow: var(--sh-card);
}

/* Variant: Rounded */
.variant-rounded {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 24px;
  padding: 16px 20px;
  box-shadow: var(--sh-card);
}

/* Variant: Square */
.variant-square {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-card);
  padding: 16px 20px;
  box-shadow: var(--sh-card);
}

/* Variant: Minimal */
.variant-minimal {
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
}

/* Header & Stats */
.activity-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.activity-summary {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
}

.total-count {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: var(--tracking-tight);
  font-variant-numeric: tabular-nums;
}

.total-label {
  font-size: 13px;
  font-weight: 450;
  color: var(--text-2);
}

/* Scroll Container */
.activity-scroll-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--faint) transparent;
  padding-bottom: 2px;
}

.activity-scroll-wrapper::-webkit-scrollbar {
  height: 4px;
}

.activity-scroll-wrapper::-webkit-scrollbar-thumb {
  background: var(--faint);
  border-radius: 999px;
}

.activity-container {
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
}

/* Y-Axis Day Labels */
.axis-y-labels {
  display: flex;
  flex-direction: column;
  padding-top: 20px; /* offset for month header */
}

.day-label {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-3);
  text-align: right;
  padding-right: 4px;
  box-sizing: border-box;
}

/* X-Axis Month Labels */
.axis-x-labels {
  position: relative;
  height: 18px;
  width: 100%;
  margin-bottom: 4px;
}

.month-label {
  position: absolute;
  font-size: 10.5px;
  font-weight: 500;
  color: var(--text-2);
  white-space: nowrap;
}

.activity-grid-body {
  display: flex;
  flex-direction: column;
}

/* Dots Grid */
.dots-grid {
  outline: none;
}

.activity-dot {
  position: relative;
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: var(--dot-radius);
  cursor: pointer;
  box-sizing: border-box;
  transition: transform 0.18s var(--ease-spring), opacity 0.15s ease, background-color 0.15s ease;
  outline: none;
}

.dot-inner {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

/* Intensity Scaling — Subtle Liquid Glass Colors */

/* Empty Level 0 */
.activity-dot.intensity-0 {
  background-color: rgba(0, 0, 0, 0.05);
}
:root.dark .activity-dot.intensity-0 {
  background-color: rgba(255, 255, 255, 0.08);
}

/* Color Accent (System Blue) */
.color-accent .activity-dot.intensity-1 { background-color: rgba(0, 113, 227, 0.25); }
.color-accent .activity-dot.intensity-2 { background-color: rgba(0, 113, 227, 0.50); }
.color-accent .activity-dot.intensity-3 { background-color: rgba(0, 113, 227, 0.75); }
.color-accent .activity-dot.intensity-4 { background-color: #0071e3; box-shadow: 0 1px 4px rgba(0, 113, 227, 0.35); }

/* Color Heat (Orange) */
.color-heat .activity-dot.intensity-1 { background-color: rgba(255, 107, 0, 0.25); }
.color-heat .activity-dot.intensity-2 { background-color: rgba(255, 107, 0, 0.50); }
.color-heat .activity-dot.intensity-3 { background-color: rgba(255, 107, 0, 0.75); }
.color-heat .activity-dot.intensity-4 { background-color: #ff6b00; box-shadow: 0 1px 4px rgba(255, 107, 0, 0.35); }

/* Color Success (Green) */
.color-success .activity-dot.intensity-1 { background-color: rgba(48, 209, 88, 0.25); }
.color-success .activity-dot.intensity-2 { background-color: rgba(48, 209, 88, 0.50); }
.color-success .activity-dot.intensity-3 { background-color: rgba(48, 209, 88, 0.75); }
.color-success .activity-dot.intensity-4 { background-color: #30d158; box-shadow: 0 1px 4px rgba(48, 209, 88, 0.35); }

/* Color Mono / Grayscale */
.color-mono .activity-dot.intensity-1 { background-color: rgba(0, 0, 0, 0.15); }
.color-mono .activity-dot.intensity-2 { background-color: rgba(0, 0, 0, 0.35); }
.color-mono .activity-dot.intensity-3 { background-color: rgba(0, 0, 0, 0.65); }
.color-mono .activity-dot.intensity-4 { background-color: #1d1d1f; }
:root.dark .color-mono .activity-dot.intensity-1 { background-color: rgba(255, 255, 255, 0.20); }
:root.dark .color-mono .activity-dot.intensity-2 { background-color: rgba(255, 255, 255, 0.40); }
:root.dark .color-mono .activity-dot.intensity-3 { background-color: rgba(255, 255, 255, 0.70); }
:root.dark .color-mono .activity-dot.intensity-4 { background-color: #ffffff; }

/* Hover & Active / Selection Effects */
.activity-dot:hover,
.activity-dot:focus-visible,
.activity-dot.is-hovered {
  transform: scale(1.3);
  z-index: 10;
  box-shadow: 0 0 0 2px var(--surface), 0 0 0 3px var(--accent);
}

.activity-dot.is-active {
  transform: scale(1.25);
  box-shadow: 0 0 0 2px var(--surface), 0 0 0 3.5px var(--accent);
  z-index: 9;
}

/* Disabled & Readonly */
.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.is-readonly .activity-dot {
  cursor: default;
}

/* Footer & Legend */
.activity-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 4px;
}

.intensity-legend {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-text {
  font-size: 11px;
  color: var(--text-3);
}

.legend-dots {
  display: flex;
  align-items: center;
  gap: 3px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--dot-radius);
  display: inline-block;
}

.legend-dot.intensity-0 { background-color: rgba(0, 0, 0, 0.05); }
:root.dark .legend-dot.intensity-0 { background-color: rgba(255, 255, 255, 0.08); }

.color-accent .legend-dot.intensity-1 { background-color: rgba(0, 113, 227, 0.25); }
.color-accent .legend-dot.intensity-2 { background-color: rgba(0, 113, 227, 0.50); }
.color-accent .legend-dot.intensity-3 { background-color: rgba(0, 113, 227, 0.75); }
.color-accent .legend-dot.intensity-4 { background-color: #0071e3; }

.color-heat .legend-dot.intensity-1 { background-color: rgba(255, 107, 0, 0.25); }
.color-heat .legend-dot.intensity-2 { background-color: rgba(255, 107, 0, 0.50); }
.color-heat .legend-dot.intensity-3 { background-color: rgba(255, 107, 0, 0.75); }
.color-heat .legend-dot.intensity-4 { background-color: #ff6b00; }

.color-success .legend-dot.intensity-1 { background-color: rgba(48, 209, 88, 0.25); }
.color-success .legend-dot.intensity-2 { background-color: rgba(48, 209, 88, 0.50); }
.color-success .legend-dot.intensity-3 { background-color: rgba(48, 209, 88, 0.75); }
.color-success .legend-dot.intensity-4 { background-color: #30d158; }

.color-mono .legend-dot.intensity-1 { background-color: rgba(0, 0, 0, 0.15); }
.color-mono .legend-dot.intensity-2 { background-color: rgba(0, 0, 0, 0.35); }
.color-mono .legend-dot.intensity-3 { background-color: rgba(0, 0, 0, 0.65); }
.color-mono .legend-dot.intensity-4 { background-color: #1d1d1f; }
:root.dark .color-mono .legend-dot.intensity-1 { background-color: rgba(255, 255, 255, 0.20); }
:root.dark .legend-dot.intensity-2 { background-color: rgba(255, 255, 255, 0.40); }
:root.dark .legend-dot.intensity-3 { background-color: rgba(255, 255, 255, 0.70); }
:root.dark .legend-dot.intensity-4 { background-color: #ffffff; }

.shape-circle { border-radius: 999px !important; }
.shape-square { border-radius: 2px !important; }

/* Floating Tooltip Styling */
.id-activity-tooltip {
  background: rgba(28, 28, 30, 0.92);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: var(--r-sheet, 12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.35;
  white-space: nowrap;
}

:root.dark .id-activity-tooltip {
  background: rgba(255, 255, 255, 0.92);
  color: #1c1c1e;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.tooltip-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.tooltip-val {
  font-weight: 650;
}

.tooltip-date {
  font-size: 11px;
  opacity: 0.75;
}

/* Tooltip Fade Transition */
.id-dot-tooltip-fade-enter-active,
.id-dot-tooltip-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s var(--ease-out-quart);
}

.id-dot-tooltip-fade-enter-from,
.id-dot-tooltip-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%) translateY(-2px) scale(0.96) !important;
}
</style>
