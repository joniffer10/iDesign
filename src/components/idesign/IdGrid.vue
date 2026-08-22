<template>
  <div
    :class="['id-grid', `variant-${currentVariant}`, config.mergedUi.value.base]"
    :style="{
      gridTemplateColumns: gridCols,
      gap: parsedGap
    }"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  cols: {
    type: [Number, String],
    default: 3
  },
  gap: {
    type: [Number, String],
    default: '20px'
  },
  minColWidth: {
    type: String,
    default: '280px'
  },
  autoFit: Boolean,
  variant: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('Grid', props)
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))

const gridCols = computed(() => {
  if (props.autoFit) {
    return `repeat(auto-fit, minmax(${props.minColWidth}, 1fr))`
  }
  const n = Number(props.cols)
  return isNaN(n) ? props.cols : `repeat(${n}, minmax(0, 1fr))`
})

const parsedGap = computed(() => {
  if (typeof props.gap === 'number') return `${props.gap}px`
  if (props.gap === 'sm') return '12px'
  if (props.gap === 'md') return '20px'
  if (props.gap === 'lg') return '32px'
  return props.gap
})
</script>

<style scoped>
.id-grid {
  display: grid;
  width: 100%;
}

@media (max-width: 768px) {
  .id-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;
  }
}
</style>
