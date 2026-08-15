<template>
  <div :class="['id-toggle-container', `size-${size}`, { 'is-disabled': disabled }]">
    <span v-if="label" class="toggle-label">{{ label }}</span>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :class="['id-toggle', `variant-${variant}`, { 'is-active': modelValue }]"
      :disabled="disabled"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span class="toggle-thumb" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: String,
  variant: {
    type: String,
    default: 'success',
    validator: v => ['success', 'primary', 'purple', 'orange', 'red'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: Boolean
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.id-toggle-container {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  font-family: var(--font);
}

.size-sm .toggle-label { font-size: 12.5px; }
.size-md .toggle-label { font-size: 14px; }
.size-lg .toggle-label { font-size: 16px; }

.toggle-label {
  font-weight: 550;
  color: var(--text);
}

.size-sm .id-toggle { width: 38px; height: 22px; padding: 2px; }
.size-sm .toggle-thumb { width: 18px; height: 18px; }
.size-sm .id-toggle.is-active .toggle-thumb { transform: translateX(16px); }

.size-md .id-toggle { width: 48px; height: 28px; padding: 2px; }
.size-md .toggle-thumb { width: 24px; height: 24px; }
.size-md .id-toggle.is-active .toggle-thumb { transform: translateX(20px); }

.size-lg .id-toggle { width: 58px; height: 34px; padding: 2px; }
.size-lg .toggle-thumb { width: 30px; height: 30px; }
.size-lg .id-toggle.is-active .toggle-thumb { transform: translateX(24px); }

.id-toggle {
  position: relative;
  border-radius: var(--r-pill);
  background: var(--track);
  border: none;
  cursor: pointer;
  transition: background 0.25s var(--ease-out-quart);
  flex-shrink: 0;
}

.id-toggle.is-active.variant-success { background: #34c759; }
.id-toggle.is-active.variant-primary { background: #0071e3; }
.id-toggle.is-active.variant-purple { background: #af52de; }
.id-toggle.is-active.variant-orange { background: #ff9500; }
.id-toggle.is-active.variant-red { background: #ff3b30; }

.toggle-thumb {
  display: block;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.3);
  transition: transform 0.25s var(--ease-out-quart);
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
