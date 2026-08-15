<template>
  <div
    :class="['id-skeleton', `variant-${variant}`, `size-${size}`, { 'is-animated': animated }]"
    :style="customStyle"
    role="status"
    aria-label="Loading..."
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'rect',
    validator: v => ['rect', 'text', 'circle', 'card'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  width: String,
  height: String,
  borderRadius: String,
  animated: { type: Boolean, default: true }
})

const defaultHeights = computed(() => ({
  sm: { text: '12px', circle: '36px', card: '100px', rect: '60px' },
  md: { text: '16px', circle: '56px', card: '140px', rect: '100px' },
  lg: { text: '20px', circle: '72px', card: '180px', rect: '140px' }
}))

const customStyle = computed(() => {
  const hMap = defaultHeights.value[props.size] || defaultHeights.value.md
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
