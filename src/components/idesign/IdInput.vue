<template>
  <div :class="['id-input-group', `size-${size}`, { 'has-error': variant === 'error', 'has-success': variant === 'success', 'is-disabled': disabled }]">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div :class="['input-wrapper', { 'is-focused': isFocused, 'is-search': variant === 'search' }]">
      <!-- Search icon or custom left icon -->
      <span v-if="variant === 'search' || $slots.iconLeft" class="input-icon left">
        <slot name="iconLeft">
          <Search v-if="variant === 'search'" :size="16" />
        </slot>
      </span>

      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder || (variant === 'search' ? 'Search...' : '')"
        :disabled="disabled"
        class="id-input"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />

      <!-- Clear button when clearable -->
      <button
        v-if="clearable && modelValue"
        type="button"
        class="clear-btn"
        aria-label="Clear text"
        @click="$emit('update:modelValue', '')"
      >
        <X :size="12" />
      </button>

      <!-- Right icon or trailing action slot -->
      <span v-if="$slots.iconRight || trailingText" class="input-icon right">
        <slot name="iconRight">
          <span v-if="trailingText" class="trailing-text">{{ trailingText }}</span>
        </slot>
      </span>
    </div>
    <span v-if="hint || errorText" :class="['input-hint', { 'error-msg': variant === 'error' }]">
      {{ variant === 'error' && errorText ? errorText : hint }}
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, X } from '@lucide/vue'

defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: String,
  placeholder: String,
  hint: String,
  errorText: String,
  trailingText: String,
  type: { type: String, default: 'text' },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  variant: { type: String, default: 'default', validator: v => ['default', 'search', 'error', 'success'].includes(v) },
  clearable: Boolean,
  disabled: Boolean
})

defineEmits(['update:modelValue'])

const isFocused = ref(false)
</script>

<style scoped>
.id-input-group { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.input-label { font-size: 13px; font-weight: 600; color: var(--text-2); }

.input-wrapper {
  display: flex; align-items: center; background: var(--surface);
  border: 1px solid var(--hairline); border-radius: 10px; padding: 0 12px; gap: 8px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.size-sm .input-wrapper { height: 34px; border-radius: 8px; font-size: 13px; }
.size-md .input-wrapper { height: 42px; border-radius: 10px; font-size: 14.5px; }
.size-lg .input-wrapper { height: 48px; border-radius: 12px; font-size: 16px; }

.input-wrapper.is-search { border-radius: 999px; }
.input-wrapper.is-focused { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.15); }
.has-error .input-wrapper { border-color: #ff3b30; }
.has-error .input-wrapper.is-focused { box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.15); }
.has-success .input-wrapper { border-color: var(--live); }

.id-input { flex: 1; border: none; background: transparent; outline: none; font-family: var(--font); color: var(--text); min-width: 0; }
.id-input::placeholder { color: var(--text-4); }

.input-icon { display: flex; align-items: center; color: var(--text-3); }
.trailing-text { font-size: 12.5px; font-weight: 600; color: var(--text-3); font-family: var(--mono); }
.clear-btn { border: none; background: rgba(0,0,0,0.1); color: var(--text-2); border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer; }
.clear-btn:hover { background: rgba(0,0,0,0.2); color: var(--text); }

.input-hint { font-size: 12px; color: var(--text-3); }
.error-msg { color: #ff3b30; font-weight: 550; }
.is-disabled { opacity: .5; pointer-events: none; }
</style>
