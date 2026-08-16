<template>
  <label
    :class="[
      'id-checkbox',
      `size-${size}`,
      `color-${color}`,
      {
        'is-checked': modelValue,
        'is-indeterminate': indeterminate,
        'is-disabled': disabled,
        'has-error': error
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="indeterminate ? 'mixed' : modelValue"
      :aria-invalid="error"
      class="sr-only"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span :class="['checkbox-box', { checked: modelValue || indeterminate }]">
      <!-- Indeterminate Dash -->
      <svg v-if="indeterminate && !modelValue" :width="checkSize" :height="checkSize" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round">
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <!-- Checked Checkmark -->
      <svg v-else-if="modelValue" :width="checkSize" :height="checkSize" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    </span>
    <span v-if="label || $slots.default" class="checkbox-label"><slot>{{ label }}</slot></span>
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  indeterminate: Boolean,
  label: String,
  disabled: Boolean,
  error: Boolean,
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  color: { type: String, default: 'blue', validator: v => ['blue', 'green', 'purple', 'orange', 'red'].includes(v) }
})

defineEmits(['update:modelValue'])

const checkSize = computed(() => props.size === 'sm' ? 11 : props.size === 'lg' ? 16 : 13)
</script>

<style scoped>
.id-checkbox { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; font-family: var(--font); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

.size-sm .checkbox-box { width: 18px; height: 18px; border-radius: 5px; }
.size-sm .checkbox-label { font-size: 12.5px; }

.size-md .checkbox-box { width: 22px; height: 22px; border-radius: 6px; }
.size-md .checkbox-label { font-size: 14px; }

.size-lg .checkbox-box { width: 26px; height: 26px; border-radius: 7px; }
.size-lg .checkbox-label { font-size: 15.5px; }

.checkbox-box {
  border: 2px solid var(--faint); background: var(--surface); display: flex; align-items: center; justify-content: center;
  transition: all .2s var(--ease-out-quart); flex-shrink: 0;
}
.sr-only:focus-visible + .checkbox-box {
  box-shadow: var(--focus-ring);
  border-color: var(--accent);
}

.checkbox-box.checked { background: var(--accent); border-color: var(--accent); }

.color-green .checkbox-box.checked { background: #34c759; border-color: #34c759; }
.color-purple .checkbox-box.checked { background: #af52de; border-color: #af52de; }
.color-orange .checkbox-box.checked { background: #ff9500; border-color: #ff9500; }
.color-red .checkbox-box.checked { background: #ff3b30; border-color: #ff3b30; }

.has-error .checkbox-box { border-color: var(--danger); }

.checkbox-label { color: var(--text); font-weight: 500; }
.is-disabled { opacity: .5; cursor: not-allowed; pointer-events: none; }
</style>
