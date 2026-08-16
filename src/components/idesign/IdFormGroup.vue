<template>
  <div
    :class="[
      'id-form-group',
      `layout-${currentDirection}`,
      { 'is-inline': inline },
      config.mergedUi.value.base
    ]"
    :style="columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : {}"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  direction: {
    type: String,
    default: undefined
  },
  inline: Boolean,
  columns: [Number, String],
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('FormGroup', props)
const currentDirection = computed(() => config.resolvedDirection.value || 'vertical')
</script>

<style scoped>
.id-form-group {
  display: flex;
  gap: var(--space-md, 16px);
  width: 100%;
}

.layout-vertical {
  flex-direction: column;
}

.layout-horizontal,
.is-inline {
  flex-direction: row;
  align-items: flex-end;
  flex-wrap: wrap;
}

.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
