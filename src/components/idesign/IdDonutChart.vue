<template>
  <IdPieChart v-bind="$props" :variant="currentVariant">
    <!-- Forward all slots dynamically -->
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </IdPieChart>
</template>

<script setup>
import { computed } from 'vue'
import IdPieChart from './IdPieChart.vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: { type: [Number, String], default: undefined },
  value: { type: [Number, String], default: undefined },
  max: { type: Number, default: 100 },
  min: { type: Number, default: 0 },
  variant: { type: String, default: undefined },
  size: { type: [String, Number], default: undefined },
  thickness: { type: [String, Number], default: undefined },
  color: { type: String, default: undefined },
  trackColor: { type: String, default: undefined },
  centerLabel: { type: String, default: undefined },
  label: { type: String, default: undefined },
  valueText: { type: String, default: undefined },
  description: { type: String, default: undefined },
  unit: { type: String, default: undefined },
  icon: { type: [Object, Function, String], default: undefined },
  showValue: { type: Boolean, default: true },
  showLegend: { type: Boolean, default: true },
  animated: { type: Boolean, default: true },
  card: { type: Boolean, default: undefined },
  data: { type: Array, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const config = useIdesignConfig('DonutChart', props)
const currentVariant = computed(() => {
  const raw = props.variant || config.resolvedVariant.value || 'full'
  return resolveVariant(raw)
})
</script>
