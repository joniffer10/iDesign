<template>
  <div
    :class="[
      'id-form-actions',
      `align-${currentAlign}`,
      { 'is-sticky': sticky },
      config.mergedUi.value.base
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  align: {
    type: String,
    default: undefined
  },
  sticky: Boolean,
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('FormActions', props)
const currentAlign = computed(() => props.align || 'right')
</script>

<style scoped>
.id-form-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  width: 100%;
}

.align-left { justify-content: flex-start; }
.align-center { justify-content: center; }
.align-right { justify-content: flex-end; }
.align-between { justify-content: space-between; }

.is-sticky {
  position: sticky;
  bottom: 0;
  background: var(--surface);
  padding: 12px 0;
  border-top: 1px solid var(--hairline);
  z-index: 10;
}
</style>
