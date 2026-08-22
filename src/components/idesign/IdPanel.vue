<template>
  <div :class="['id-panel', `size-${currentSize}`, `variant-${currentVariant}`, `radius-${currentRadius}`, { 'no-dividers': noDividers || currentVariant === 'no-dividers' }, config.mergedUi.value.base]">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  size: {
    type: String,
    default: undefined
  },
  variant: {
    type: String,
    default: undefined
  },
  noDividers: Boolean,
  radius: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const config = useIdesignConfig('Panel', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'xl')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw, null, {
    'no-dividers': 'seamless',
    'no-divider': 'seamless'
  })
})
</script>

<style scoped>
.id-panel {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-panel);
  box-shadow: var(--sh-panel);
  overflow: hidden;
  width: 100%;
}

/* Radius Classes */
.radius-none { border-radius: var(--r-none) !important; }
.radius-sm { border-radius: var(--r-chip) !important; }
.radius-md { border-radius: var(--r-thumb) !important; }
.radius-lg { border-radius: var(--r-card) !important; }
.radius-full { border-radius: var(--r-pill) !important; }

.variant-glass {
  background: var(--variant-glass-bg);
  backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop);
}

.variant-solid {
  background: var(--variant-solid-bg);
  color: var(--variant-solid-color);
  border: none;
}
.variant-solid :deep(.id-panel-row) { color: rgba(255, 255, 255, 0.95); border-top-color: rgba(255, 255, 255, 0.15); }
.variant-solid :deep(.row-title) { color: #ffffff; }
.variant-solid :deep(.row-subtitle) { color: rgba(255, 255, 255, 0.7); }

.variant-subtle {
  background: var(--variant-subtle-bg);
  border: var(--variant-subtle-border);
  box-shadow: none;
}

.variant-borderless {
  border: none !important;
  box-shadow: none !important;
  background: var(--surface);
}

.variant-seamless :deep(.id-panel-row + .id-panel-row) {
  border-top: none !important;
}

.variant-inset {
  border-radius: 16px;
  margin: 0 4px;
}

.no-dividers :deep(.id-panel-row + .id-panel-row) {
  border-top: none !important;
}

.size-sm :deep(.id-panel-row) {
  padding: 10px 14px; gap: 10px;
}
.size-sm :deep(.row-icon-wrap) {
  width: 26px; height: 26px; border-radius: 6px; font-size: 13px;
}
.size-sm :deep(.row-title) { font-size: 13px; }
.size-sm :deep(.row-subtitle) { font-size: 11.5px; }

.size-lg :deep(.id-panel-row) {
  padding: 20px 26px; gap: 18px;
}
.size-lg :deep(.row-icon-wrap) {
  width: 40px; height: 40px; border-radius: 10px; font-size: 18px;
}
.size-lg :deep(.row-title) { font-size: 16px; }
.size-lg :deep(.row-subtitle) { font-size: 13.5px; }
</style>
