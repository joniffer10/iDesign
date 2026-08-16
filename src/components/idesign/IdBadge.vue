<template>
  <span :class="['id-badge', `badge-${currentColor}`, `size-${currentSize}`, { 'has-count': hasCount }, config.mergedUi.value.base]">
    <slot />
    <span v-if="hasCount" :class="['badge-count', config.mergedUi.value.count]">{{ displayCount }}</span>
    <span v-else-if="dot && showBadge" :class="['badge-dot', config.mergedUi.value.dot]" />
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  variant: { type: String, default: undefined },
  color: { type: String, default: undefined },
  count: { type: [Number, String], default: null },
  dot: Boolean,
  showZero: { type: Boolean, default: false },
  max: { type: Number, default: 99 },
  size: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('Badge', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentColor = computed(() => {
  const c = props.color || config.resolvedColor.value || props.variant || 'default'
  if (c === 'primary') return 'accent'
  return c
})

const numCount = computed(() => {
  if (props.count === null || props.count === undefined || props.count === '') return null
  const parsed = Number(props.count)
  return isNaN(parsed) ? props.count : parsed
})

const hasCount = computed(() => {
  if (numCount.value === null) return false
  if (typeof numCount.value === 'number') {
    return props.showZero ? true : numCount.value > 0
  }
  return true
})

const showBadge = computed(() => props.dot || hasCount.value)

const displayCount = computed(() => {
  if (typeof numCount.value === 'number') {
    return numCount.value > props.max ? `${props.max}+` : numCount.value
  }
  return numCount.value
})
</script>

<style scoped>
.id-badge { position: relative; display: inline-flex; align-items: center; }
.badge-count {
  position: absolute; top: -6px; right: -8px; min-width: 18px; height: 18px; padding: 0 5px;
  border-radius: 999px; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center;
  font-variant-numeric: tabular-nums; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* Size Variants */
.size-sm .badge-count { font-size: 9px; min-width: 14px; height: 14px; top: -4px; right: -6px; }
.size-sm .badge-dot { width: 7px; height: 7px; top: -1px; right: -1px; }

.size-md .badge-count { font-size: 11px; min-width: 18px; height: 18px; top: -6px; right: -8px; }
.size-md .badge-dot { width: 9px; height: 9px; top: -2px; right: -2px; }

.size-lg .badge-count { font-size: 13px; min-width: 22px; height: 22px; top: -8px; right: -10px; }
.size-lg .badge-dot { width: 11px; height: 11px; top: -3px; right: -3px; }

.badge-default .badge-count { background: #ff3b30; color: #fff; }
.badge-accent .badge-count { background: var(--accent); color: #fff; }
.badge-success .badge-count { background: #30d158; color: #fff; }
.badge-warning .badge-count { background: #ff9f0a; color: #fff; }
.badge-dot { position: absolute; top: -2px; right: -2px; width: 9px; height: 9px; border-radius: 50%; background: #ff3b30; border: 2px solid var(--surface); }
</style>
