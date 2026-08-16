<template>
  <form
    :class="[
      'id-form',
      `density-${currentDensity}`,
      { 'is-disabled': disabled }
    ]"
    :data-density="currentDensity"
    @submit.prevent="handleSubmit"
    @reset="handleReset"
  >
    <slot />
  </form>
</template>

<script setup>
import { provide, computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  density: {
    type: String,
    default: undefined,
    validator: v => !v || ['compact', 'comfortable', 'spacious'].includes(v)
  },
  disabled: Boolean,
  gap: [String, Number]
})

const emit = defineEmits(['submit', 'reset'])

const config = useIdesignConfig({ density: props.density })
const currentDensity = computed(() => props.density || config.density || 'comfortable')

provide('id-form-context', {
  disabled: computed(() => props.disabled),
  density: currentDensity
})

const handleSubmit = (e) => {
  if (props.disabled) return
  emit('submit', e)
}

const handleReset = (e) => {
  if (props.disabled) return
  emit('reset', e)
}
</script>

<style scoped>
.id-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 16px);
  width: 100%;
}

.density-compact { gap: var(--space-sm, 12px); }
.density-spacious { gap: var(--space-lg, 24px); }

.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
