<template>
  <div :class="['id-spinner', `size-${currentSize}`, `variant-${currentVariant}`, `color-${currentColor}`, config.mergedUi.value.base]" role="status" aria-label="Loading">
    <svg viewBox="0 0 24 24" fill="none" :class="['spinner-svg', config.mergedUi.value.svg]">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span v-if="label" :class="['spinner-label', config.mergedUi.value.label]">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  size: { type: String, default: undefined },
  color: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  label: String,
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('Spinner', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))
const currentColor = computed(() => {
  const c = config.resolvedColor.value || 'blue'
  if (c === 'default' || c === 'primary') return 'blue'
  if (c === 'success') return 'green'
  if (c === 'warning') return 'purple' // fallback/other
  if (c === 'danger') return 'red'
  if (c === 'muted') return 'gray'
  return c
})
</script>

<style scoped>
.id-spinner { display: inline-flex; align-items: center; gap: 10px; color: var(--accent); font-family: var(--font); }
.spinner-svg { animation: spin .8s linear infinite; }

.size-xs .spinner-svg { width: 14px; height: 14px; }
.size-sm .spinner-svg { width: 18px; height: 18px; }
.size-md .spinner-svg { width: 24px; height: 24px; }
.size-lg .spinner-svg { width: 36px; height: 36px; }
.size-xl .spinner-svg { width: 48px; height: 48px; }

.color-green { color: #34c759; }
.color-purple { color: #af52de; }
.color-white { color: #ffffff; }
.color-gray { color: var(--text-2); }
.color-red { color: #ff3b30; }

.spinner-label { font-size: 13.5px; font-weight: 550; color: var(--text-2); }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
