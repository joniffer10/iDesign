<template>
  <div :class="['id-divider', currentDirection, `variant-${currentVariant}`, config.mergedUi.value.base]" role="separator" />
</template>
<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  direction: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('Divider', props)
const currentDirection = computed(() => config.resolvedDirection.value || 'horizontal')
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'hairline'))
</script>
<style scoped>
.id-divider.horizontal { width: 100%; height: 1px; }
.id-divider.vertical { width: 1px; align-self: stretch; }
.variant-hairline { background: var(--hairline); }
.variant-faint { background: var(--faint); }
.variant-spaced { background: var(--hairline); margin: clamp(16px, 3vw, 28px) 0; }
</style>
