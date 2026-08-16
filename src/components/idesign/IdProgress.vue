<template>
  <div :class="['id-progress', `size-${currentSize}`, `variant-${currentVariant}`, `color-${currentColor}`, `radius-${currentRadius}`, config.mergedUi.value.base]" role="progressbar" :aria-valuenow="indeterminate ? null : value" :aria-valuemin="0" :aria-valuemax="100" :aria-label="label">
    <div v-if="label || (showValue && !indeterminate)" :class="['progress-header', config.mergedUi.value.header]">
      <span v-if="label" :class="['progress-label', config.mergedUi.value.label]">{{ label }}</span>
      <span v-if="showValue && !indeterminate" :class="['progress-value', config.mergedUi.value.value]">{{ Math.round(clampedPct) }}%</span>
    </div>
    <div :class="['progress-track', `size-${currentSize}`, config.mergedUi.value.track]">
      <div
        :class="['progress-fill', { 'is-indeterminate': indeterminate }, config.mergedUi.value.fill]"
        :style="!indeterminate ? { width: clampedPct + '%' } : {}"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  value: { type: Number, default: 0 },
  label: String,
  showValue: { type: Boolean, default: true },
  size: { type: String, default: undefined },
  indeterminate: Boolean,
  variant: { type: String, default: undefined },
  color: { type: String, default: undefined },
  radius: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('Progress', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'full')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')

const currentColor = computed(() => {
  const c = config.resolvedColor.value || 'blue'
  if (c === 'default' || c === 'primary') return 'blue'
  if (c === 'success') return 'green'
  if (c === 'warning') return 'orange'
  if (c === 'danger') return 'red'
  return c
})

const clampedPct = computed(() => Math.min(100, Math.max(0, props.value)))
</script>

<style scoped>
.id-progress { width: 100%; font-family: var(--font); }

/* Radius Classes */
.radius-none .progress-track, .radius-none .progress-fill { border-radius: var(--r-none) !important; }
.radius-sm .progress-track, .radius-sm .progress-fill { border-radius: var(--r-chip) !important; }
.radius-md .progress-track, .radius-md .progress-fill { border-radius: var(--r-thumb) !important; }
.radius-lg .progress-track, .radius-lg .progress-fill { border-radius: var(--r-card) !important; }
.radius-full .progress-track, .radius-full .progress-fill { border-radius: var(--r-pill) !important; }

.variant-glass {
  padding: 10px 14px; border-radius: var(--r-panel); background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--hairline); box-shadow: var(--sh-card);
}
:root.dark .variant-glass { background: rgba(28, 28, 30, 0.65); }

.progress-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.progress-label { font-size: 13px; font-weight: 600; color: var(--text-2); }
.progress-value { font-size: 13px; font-weight: 600; color: var(--text); font-variant-numeric: tabular-nums; }
.progress-track { width: 100%; background: var(--track); border-radius: 999px; overflow: hidden; position: relative; }

.size-xs { height: 2px; }
.size-sm { height: 4px; }
.size-md { height: 6px; }
.size-lg { height: 10px; }
.size-xl { height: 14px; }

.progress-fill { height: 100%; background: var(--accent); border-radius: 999px; transition: width .4s var(--ease-out-quart); }

.color-green .progress-fill { background: #34c759; }
.color-purple .progress-fill { background: #af52de; }
.color-orange .progress-fill { background: #ff9500; }
.color-red .progress-fill { background: #ff3b30; }

.progress-fill.is-indeterminate {
  width: 45% !important;
  animation: indeterminate-slide 1.5s ease-in-out infinite;
}
@keyframes indeterminate-slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}
</style>
