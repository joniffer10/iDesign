<template>
  <div :class="['id-stepper', `size-${size}`, `variant-${variant}`, `color-${color}`]" role="navigation" aria-label="Progress steps">
    <div
      v-for="(step, idx) in steps"
      :key="idx"
      :class="[
        'step-item',
        {
          'is-active': idx === modelValue,
          'is-completed': idx < modelValue,
          'is-clickable': clickable
        }
      ]"
      @click="clickable && $emit('update:modelValue', idx)"
    >
      <div class="step-indicator">
        <Check v-if="idx < modelValue" :size="iconSize" class="check-icon" />
        <component :is="step.icon" v-else-if="step.icon && typeof step.icon !== 'string'" :size="iconSize" />
        <span v-else-if="typeof step.icon === 'string'">{{ step.icon }}</span>
        <span v-else>{{ idx + 1 }}</span>
      </div>

      <div class="step-content">
        <span class="step-label">{{ step.label || step }}</span>
        <span v-if="step.description" class="step-desc">{{ step.description }}</span>
      </div>

      <div v-if="idx < steps.length - 1" class="step-connector" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Check } from '@lucide/vue'

const props = defineProps({
  steps: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
  clickable: Boolean,
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  variant: { type: String, default: 'default', validator: v => ['default', 'glass'].includes(v) },
  color: { type: String, default: 'blue', validator: v => ['blue', 'green', 'purple', 'orange'].includes(v) }
})

defineEmits(['update:modelValue'])

const iconSize = computed(() => props.size === 'sm' ? 13 : props.size === 'lg' ? 18 : 15)
</script>

<style scoped>
.id-stepper {
  display: flex; align-items: flex-start; gap: 16px; width: 100%; font-family: var(--font);
}

.variant-glass {
  padding: 14px 18px; border-radius: var(--r-panel); background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--hairline); box-shadow: var(--sh-card);
}
:root.dark .variant-glass { background: rgba(28, 28, 30, 0.65); }

.step-item { display: flex; align-items: center; gap: 10px; flex: 1; position: relative; }
.step-item.is-clickable { cursor: pointer; }

.step-indicator {
  border-radius: 50%; background: var(--hover); border: 1px solid var(--hairline);
  color: var(--text-2); display: flex; align-items: center; justify-content: center;
  font-weight: 700; flex-shrink: 0; transition: all 0.2s var(--ease-out-quart);
}

.size-sm .step-indicator { width: 26px; height: 26px; font-size: 11.5px; }
.size-md .step-indicator { width: 32px; height: 32px; font-size: 13.5px; }
.size-lg .step-indicator { width: 40px; height: 40px; font-size: 16px; }

.step-item.is-active .step-indicator {
  background: var(--accent); color: #ffffff; border-color: transparent;
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
}

.color-green .step-item.is-active .step-indicator { background: #34c759; box-shadow: 0 0 0 4px rgba(52, 199, 89, 0.18); }
.color-purple .step-item.is-active .step-indicator { background: #af52de; box-shadow: 0 0 0 4px rgba(175, 82, 222, 0.18); }
.color-orange .step-item.is-active .step-indicator { background: #ff9500; box-shadow: 0 0 0 4px rgba(255, 149, 0, 0.18); }

.step-item.is-completed .step-indicator { background: #30d158; color: #ffffff; border-color: transparent; }

.step-content { display: flex; flex-direction: column; min-width: 0; }

.size-sm .step-label { font-size: 12px; }
.size-md .step-label { font-size: 13.5px; }
.size-lg .step-label { font-size: 15px; }

.step-label { font-weight: 650; color: var(--text-2); white-space: nowrap; }
.step-item.is-active .step-label, .step-item.is-completed .step-label { color: var(--text); }

.step-desc { font-size: 12px; color: var(--text-3); margin-top: 1px; }

.step-connector { flex: 1; height: 2px; background: var(--hairline); margin: 0 8px; border-radius: 999px; transition: background 0.2s ease; }
.step-item.is-completed .step-connector { background: #30d158; }

@media (max-width: 640px) {
  .id-stepper { flex-direction: column; }
  .step-connector { display: none; }
}
</style>
