<template>
  <div
    class="id-grid"
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
  autoFit: Boolean
})

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
