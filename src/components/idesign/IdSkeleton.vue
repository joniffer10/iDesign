<template>
  <div
    :class="['id-skeleton', `variant-${currentVariant}`, `size-${currentSize}`, `radius-${currentRadius}`, { 'is-animated': animated }, config.mergedUi.value.base]"
    :style="customStyle"
    role="status"
    aria-label="Loading..."
  />
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  variant: {
    type: String,
    default: 'rect',
    validator: v => ['rect', 'text', 'circle', 'card'].includes(v)
  },
  size: {
    type: String,
    default: undefined
  },
  width: String,
  height: String,
  borderRadius: String,
  animated: { type: Boolean, default: true },
  radius: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('Skeleton', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'rect')

const defaultHeights = computed(() => ({
  sm: { text: '12px', circle: '36px', card: '100px', rect: '60px' },
  md: { text: '16px', circle: '56px', card: '140px', rect: '100px' },
  lg: { text: '20px', circle: '72px', card: '180px', rect: '140px' }
}))

const customStyle = computed(() => {
  const hMap = defaultHeights.value[currentSize.value] || defaultHeights.value.md
  return {
    width: props.width || (props.variant === 'circle' ? hMap.circle : '100%'),
    height: props.height || hMap[props.variant] || '100px',
    borderRadius: props.borderRadius || (props.variant === 'circle' ? '50%' : props.variant === 'text' ? '6px' : '14px')
  }
})
</script>

<style scoped>
.id-skeleton {
  background: var(--hover);
  display: block;
}

/* Radius Classes */
.radius-none { border-radius: var(--r-none) !important; }
.radius-sm { border-radius: var(--r-chip) !important; }
.radius-md { border-radius: var(--r-thumb) !important; }
.radius-lg { border-radius: var(--r-card) !important; }
.radius-full { border-radius: var(--r-pill) !important; }

:root.dark .id-skeleton {
  background: rgba(255, 255, 255, 0.08);
}

.variant-circle {
  flex-shrink: 0;
}

.is-animated {
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
</style>
