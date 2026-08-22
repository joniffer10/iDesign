<template>
  <div
    :class="[
      'id-donut-chart',
      'id-pie-chart',
      `size-${sizePreset}`,
      `variant-${currentVariant}`,
      `color-${currentColorName}`,
      {
        'is-card': isCard,
        'has-legend': hasLegend,
        'is-standalone': !isCard && !hasLegend
      },
      config.mergedUi.value.base
    ]"
    :style="customDimensions"
  >
    <!-- Donut SVG Area -->
    <div :class="['donut-wrapper', config.mergedUi.value.chart]" :style="wrapperStyle">
      <svg
        viewBox="0 0 100 100"
        :class="['donut-svg', `svg-${currentVariant}`, { 'is-animated': animated }, config.mergedUi.value.svg]"
        :style="svgStyle"
        role="img"
        :aria-label="ariaLabel"
      >
        <!-- Gradient Definitions -->
        <defs>
          <linearGradient :id="`grad-cta-${uid}`" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0071e3" />
            <stop offset="100%" stop-color="#5e5ce6" />
          </linearGradient>
          <linearGradient :id="`grad-warm-${uid}`" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff9f0a" />
            <stop offset="100%" stop-color="#ff375f" />
          </linearGradient>
          <linearGradient :id="`grad-blue-${uid}`" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0a84ff" />
            <stop offset="100%" stop-color="#5e5ce6" />
          </linearGradient>
        </defs>

        <!-- Track Circle / Arc -->
        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="transparent"
          :stroke="resolvedTrackColor"
          :stroke-width="strokeWidth"
          :stroke-dasharray="trackDashArray"
          :stroke-linecap="currentVariant === 'progress' ? 'round' : 'butt'"
          :class="['donut-track', config.mergedUi.value.track]"
        />

        <!-- Multi-segment Slices (Data Mode) -->
        <template v-if="isDataMode">
          <circle
            v-for="(slice, idx) in slices"
            :key="idx"
            cx="50"
            cy="50"
            :r="radius"
            fill="transparent"
            :stroke="slice.color"
            :stroke-width="strokeWidth"
            :stroke-dasharray="`${slice.dash} ${circumference - slice.dash}`"
            :stroke-dashoffset="-slice.offset"
            :stroke-linecap="currentVariant === 'progress' ? 'round' : 'butt'"
            :class="['donut-segment', config.mergedUi.value.progress]"
          />
        </template>

        <!-- Single Value Progress Arc -->
        <template v-else>
          <circle
            cx="50"
            cy="50"
            :r="radius"
            fill="transparent"
            :stroke="resolvedProgressColor"
            :stroke-width="strokeWidth"
            :stroke-dasharray="`${progressDash} ${circumference - progressDash}`"
            stroke-dashoffset="0"
            :stroke-linecap="currentVariant === 'progress' ? 'round' : (pct >= 1 ? 'butt' : 'round')"
            :class="['donut-progress', config.mergedUi.value.progress]"
          />
        </template>
      </svg>

      <!-- Center Content -->
      <div :class="['donut-center', config.mergedUi.value.center]">
        <slot
          name="default"
          :value="numericValue"
          :percent="Math.round(pct * 100)"
          :max="maxVal"
          :min="minVal"
          :display-value="displayValue"
        >
          <slot
            name="center"
            :value="numericValue"
            :percent="Math.round(pct * 100)"
            :max="maxVal"
            :min="minVal"
            :display-value="displayValue"
          >
            <!-- Optional Icon -->
            <div v-if="icon || $slots.icon" :class="['donut-icon', config.mergedUi.value.icon]">
              <slot name="icon">
                <component :is="icon" v-if="isComponent(icon)" class="icon-svg" />
                <span v-else class="icon-str">{{ icon }}</span>
              </slot>
            </div>

            <!-- Value & Unit Group -->
            <div v-if="showValue" :class="['donut-value-group', config.mergedUi.value.value]">
              <slot name="value" :value="numericValue" :display-value="displayValue">
                <span class="donut-total donut-value">{{ displayValue }}</span>
              </slot>
              <slot name="unit" :unit="unit">
                <span v-if="unit" :class="['donut-unit', config.mergedUi.value.unit]">{{ unit }}</span>
              </slot>
            </div>

            <!-- Label / Center Label -->
            <div v-if="effectiveLabel || $slots.label" :class="['donut-label-wrapper', config.mergedUi.value.label]">
              <slot name="label" :label="effectiveLabel">
                <span class="donut-label">{{ effectiveLabel }}</span>
              </slot>
            </div>

            <!-- Description -->
            <p v-if="description || $slots.description" :class="['donut-desc', config.mergedUi.value.description]">
              <slot name="description" :description="description">
                {{ description }}
              </slot>
            </p>
          </slot>
        </slot>
      </div>
    </div>

    <!-- Multi-Segment Legend -->
    <div v-if="hasLegend" :class="['pie-legend', config.mergedUi.value.legend]">
      <slot name="legend" :items="data" :total="totalDataValue">
        <div
          v-for="(item, idx) in data"
          :key="idx"
          :class="['legend-item', config.mergedUi.value.legendItem]"
        >
          <span
            :class="['legend-dot', config.mergedUi.value.legendDot]"
            :style="{ background: item.color || defaultColors[idx % defaultColors.length] }"
          />
          <span :class="['legend-name', config.mergedUi.value.legendName]">{{ item.label }}</span>
          <span :class="['legend-val', config.mergedUi.value.legendVal]">{{ item.value }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, isVNode } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

let idCounter = 0

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: undefined
  },
  value: {
    type: [Number, String],
    default: undefined
  },
  max: {
    type: Number,
    default: 100
  },
  min: {
    type: Number,
    default: 0
  },
  variant: {
    type: String,
    default: undefined,
    validator: v => !v || ['full', 'progress', 'default'].includes(v)
  },
  size: {
    type: [String, Number],
    default: undefined
  },
  thickness: {
    type: [String, Number],
    default: undefined
  },
  color: {
    type: String,
    default: undefined
  },
  trackColor: {
    type: String,
    default: undefined
  },
  centerLabel: {
    type: String,
    default: undefined
  },
  label: {
    type: String,
    default: undefined
  },
  valueText: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: undefined
  },
  unit: {
    type: String,
    default: undefined
  },
  icon: {
    type: [Object, Function, String],
    default: undefined
  },
  showValue: {
    type: Boolean,
    default: true
  },
  showLegend: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  card: {
    type: Boolean,
    default: undefined
  },
  data: {
    type: Array,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const uid = ++idCounter
const config = useIdesignConfig('PieChart', props)

const defaultColors = ['#0071e3', '#30d158', '#af52de', '#ff9f0a', '#ff3b30', '#5e5ce6']

const isComponent = (comp) => comp && (typeof comp === 'object' || typeof comp === 'function' || isVNode(comp))

// Variant resolution
const currentVariant = computed(() => {
  const raw = props.variant || config.resolvedVariant.value || 'full'
  return resolveVariant(raw)
})

// Data mode vs single-value mode
const isDataMode = computed(() => Array.isArray(props.data) && props.data.length > 0)
const hasLegend = computed(() => isDataMode.value && props.showLegend)

const isCard = computed(() => {
  if (props.card !== undefined) return props.card
  // If in data mode with legend, default to card styling for backwards compatibility
  return isDataMode.value
})

// Sizes
const sizePresetMap = {
  xs: { size: 64, stroke: 6 },
  sm: { size: 96, stroke: 8 },
  md: { size: 130, stroke: 10 },
  lg: { size: 180, stroke: 13 },
  xl: { size: 220, stroke: 16 }
}

const sizePreset = computed(() => {
  const s = props.size || config.resolvedSize.value || 'md'
  if (typeof s === 'string' && sizePresetMap[s]) return s
  return 'custom'
})

const resolvedPixelSize = computed(() => {
  const s = props.size || config.resolvedSize.value || 'md'
  if (typeof s === 'number') return s
  if (typeof s === 'string') {
    if (sizePresetMap[s]) return sizePresetMap[s].size
    const parsed = parseFloat(s)
    if (!isNaN(parsed)) return parsed
  }
  return 130
})

const customDimensions = computed(() => {
  if (sizePreset.value === 'custom') {
    return {
      '--donut-size': `${resolvedPixelSize.value}px`
    }
  }
  return {}
})

const wrapperStyle = computed(() => {
  const sz = resolvedPixelSize.value
  return {
    width: `${sz}px`,
    height: `${sz}px`
  }
})

// Stroke width calculation
const strokeWidth = computed(() => {
  if (props.thickness !== undefined) {
    if (typeof props.thickness === 'number') return props.thickness
    if (props.thickness === 'thin') return 6
    if (props.thickness === 'normal') return 10
    if (props.thickness === 'thick') return 15
    const parsed = parseFloat(props.thickness)
    if (!isNaN(parsed)) return parsed
  }
  const preset = sizePresetMap[sizePreset.value]
  return preset ? preset.stroke : 10
})

// Geometry in 100x100 viewBox
const radius = computed(() => 50 - strokeWidth.value / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

// Progress variant sweep angle (240 degrees sweep, 120 degree bottom opening gap)
const SWEEP_ANGLE = 240
const progressArcLength = computed(() => circumference.value * (SWEEP_ANGLE / 360))

const trackDashArray = computed(() => {
  if (currentVariant.value === 'progress') {
    return `${progressArcLength.value} ${circumference.value - progressArcLength.value}`
  }
  return `${circumference.value} 0`
})

// Color resolution
const currentColorName = computed(() => {
  const c = props.color || config.resolvedColor.value || 'blue'
  return c
})

const resolvedProgressColor = computed(() => {
  const c = props.color || config.resolvedColor.value || 'blue'
  if (c === 'blue' || c === 'primary' || c === 'default') return 'var(--accent, #0071e3)'
  if (c === 'green' || c === 'success' || c === 'live') return 'var(--live, #30d158)'
  if (c === 'orange' || c === 'warning' || c === 'heat') return 'var(--heat, #ff9f0a)'
  if (c === 'red' || c === 'danger' || c === 'error') return 'var(--danger, #ff3b30)'
  if (c === 'purple') return '#af52de'
  if (c === 'indigo') return 'var(--indigo, #5e5ce6)'
  if (c === 'gradient-cta' || c === 'grad-cta') return `url(#grad-cta-${uid})`
  if (c === 'gradient-warm' || c === 'grad-warm') return `url(#grad-warm-${uid})`
  if (c === 'gradient-blue' || c === 'grad-blue') return `url(#grad-blue-${uid})`
  return c
})

const resolvedTrackColor = computed(() => {
  if (props.trackColor) return props.trackColor
  return 'var(--track, #e8e8ed)'
})

// Value calculations
const minVal = computed(() => props.min ?? 0)
const maxVal = computed(() => {
  if (props.max !== undefined) return props.max
  return 100
})

const numericValue = computed(() => {
  if (props.modelValue !== undefined) return Number(props.modelValue) || 0
  if (props.value !== undefined) return Number(props.value) || 0
  return 0
})

const totalDataValue = computed(() => {
  if (!isDataMode.value) return 0
  return props.data.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0)
})

const pct = computed(() => {
  const range = maxVal.value - minVal.value
  if (range <= 0) return 0
  const normalized = (numericValue.value - minVal.value) / range
  return Math.min(1, Math.max(0, normalized))
})

const progressDash = computed(() => {
  if (currentVariant.value === 'progress') {
    return pct.value * progressArcLength.value
  }
  return pct.value * circumference.value
})

const slices = computed(() => {
  if (!isDataMode.value) return []
  const tot = totalDataValue.value || 1
  const totalLength = currentVariant.value === 'progress' ? progressArcLength.value : circumference.value
  let cumulative = 0

  return props.data.map((item, idx) => {
    const slicePct = (Number(item.value) || 0) / tot
    const dash = slicePct * totalLength
    const offset = (cumulative / tot) * totalLength
    cumulative += Number(item.value) || 0

    return {
      dash,
      offset,
      color: item.color || defaultColors[idx % defaultColors.length]
    }
  })
})

const displayValue = computed(() => {
  if (props.valueText !== undefined) return props.valueText
  if (isDataMode.value) return totalDataValue.value
  return numericValue.value
})

const effectiveLabel = computed(() => {
  if (props.label !== undefined) return props.label
  if (props.centerLabel !== undefined) return props.centerLabel
  if (isDataMode.value) return 'Total'
  return ''
})

const svgStyle = computed(() => {
  if (currentVariant.value === 'progress') {
    // Gauge rotation: starts at 150deg (bottom-left) and sweeps 240deg to 390deg/30deg (bottom-right)
    return {
      transform: 'rotate(150deg)'
    }
  }
  // Full 360 circular donut starts at 12 o'clock (-90deg)
  return {
    transform: 'rotate(-90deg)'
  }
})

const ariaLabel = computed(() => {
  if (effectiveLabel.value) {
    return `${effectiveLabel.value}: ${displayValue.value}${props.unit ? ' ' + props.unit : ''}`
  }
  return `Progress: ${Math.round(pct.value * 100)}%`
})
</script>

<style scoped>
.id-donut-chart {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font);
  box-sizing: border-box;
}

/* Card Mode */
.id-donut-chart.is-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-card);
  box-shadow: var(--sh-card);
  width: 100%;
}

.donut-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.donut-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.donut-svg.is-animated .donut-progress,
.donut-svg.is-animated .donut-segment {
  transition: stroke-dasharray 0.6s var(--ease-out-quart), stroke-dashoffset 0.6s var(--ease-out-quart), stroke 0.3s ease;
}

.donut-track {
  transition: stroke 0.3s ease;
}

/* Center Content */
.donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
  padding: 8px;
  box-sizing: border-box;
}

/* For open progress ring gauge, slightly elevate center to align visually with the 240deg cradle */
.variant-progress .donut-center {
  transform: translateY(-4px);
}

.donut-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-2);
  margin-bottom: 2px;
}

.donut-icon .icon-svg {
  width: 18px;
  height: 18px;
}

.donut-value-group {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 3px;
}

.donut-total,
.donut-value {
  font-size: 22px;
  font-weight: 750;
  color: var(--text);
  line-height: 1.1;
  letter-spacing: var(--tracking-tightest, -0.03em);
  font-variant-numeric: tabular-nums;
}

.size-xs .donut-total,
.size-xs .donut-value {
  font-size: 14px;
}

.size-sm .donut-total,
.size-sm .donut-value {
  font-size: 18px;
}

.size-md .donut-total,
.size-md .donut-value {
  font-size: 22px;
}

.size-lg .donut-total,
.size-lg .donut-value {
  font-size: 32px;
}

.size-xl .donut-total,
.size-xl .donut-value {
  font-size: 40px;
}

.donut-unit {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-2);
  letter-spacing: normal;
}

.size-xs .donut-unit { font-size: 9px; }
.size-sm .donut-unit { font-size: 10px; }
.size-lg .donut-unit { font-size: 15px; }
.size-xl .donut-unit { font-size: 18px; }

.donut-label-wrapper {
  margin-top: 2px;
}

.donut-label {
  font-size: 11.5px;
  color: var(--text-2);
  font-weight: 550;
  letter-spacing: var(--tracking-tight, -0.01em);
  white-space: nowrap;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.size-xs .donut-label { font-size: 9px; }
.size-sm .donut-label { font-size: 10px; }
.size-lg .donut-label { font-size: 13px; }
.size-xl .donut-label { font-size: 15px; }

.donut-desc {
  font-size: 10px;
  color: var(--text-3);
  margin: 2px 0 0 0;
  line-height: 1.2;
}

/* Legend */
.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-name {
  color: var(--text-2);
  font-weight: 550;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend-val {
  color: var(--text);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 480px) {
  .id-donut-chart.is-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
