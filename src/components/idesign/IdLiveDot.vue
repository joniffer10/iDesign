<template>
  <div :class="['live-dot-container', `variant-${currentVariant}`, config.mergedUi.value.base]">
    <span class="pulse-dot" />
    <span class="live-label"><slot>{{ label || 'LIVE' }}</slot></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  label: String,
  variant: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('LiveDot', props)
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))
</script>

<style scoped>
.live-dot-container {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--text-3);
  text-transform: uppercase;
}
</style>
