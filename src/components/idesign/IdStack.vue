<template>
  <div
    :class="['id-stack', config.mergedUi.value.base]"
    :style="{
      flexDirection: currentDirection === 'horizontal' ? 'row' : 'column',
      gap: typeof gap === 'number' ? `${gap}px` : gap,
      alignItems: align,
      justify: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap'
    }"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  direction: { type: String, default: undefined },
  gap: { type: [Number, String], default: 12 },
  align: { type: String, default: 'stretch' },
  justify: { type: String, default: 'flex-start' },
  wrap: Boolean,
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('Stack', props)
const currentDirection = computed(() => config.resolvedDirection.value || 'vertical')
</script>

<style scoped>
.id-stack {
  display: flex;
  width: 100%;
}
</style>
