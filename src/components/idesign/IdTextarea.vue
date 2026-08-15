<template>
  <div :class="['id-textarea-group', `size-${size}`, `variant-${variant}`]">
    <label v-if="label" class="textarea-label">{{ label }}</label>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      :class="['id-textarea', { 'is-focused': isFocused }]"
      :aria-label="label"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <div v-if="hint || maxlength" class="textarea-footer">
      <span v-if="hint" class="textarea-hint">{{ hint }}</span>
      <span v-if="maxlength" class="textarea-count">{{ (modelValue || '').length }}/{{ maxlength }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: { type: String, default: '' },
  label: String,
  placeholder: String,
  hint: String,
  rows: { type: Number, default: 4 },
  maxlength: Number,
  disabled: Boolean,
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  variant: { type: String, default: 'default', validator: v => ['default', 'glass', 'error'].includes(v) }
})

defineEmits(['update:modelValue'])

const isFocused = ref(false)
</script>

<style scoped>
.id-textarea-group { display: flex; flex-direction: column; gap: 6px; width: 100%; font-family: var(--font); }
.textarea-label { font-size: 13px; font-weight: 600; color: var(--text-2); }

.size-sm .id-textarea { padding: 8px 10px; font-size: 13px; border-radius: 8px; }
.size-md .id-textarea { padding: 10px 14px; font-size: 14.5px; border-radius: 10px; }
.size-lg .id-textarea { padding: 14px 18px; font-size: 16px; border-radius: 12px; }

.id-textarea {
  width: 100%; background: var(--surface); border: 1px solid var(--hairline);
  color: var(--text); resize: vertical; outline: none; transition: border-color .2s, box-shadow .2s; line-height: 1.6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.id-textarea::placeholder { color: var(--text-4); }

.variant-glass .id-textarea {
  background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
:root.dark .variant-glass .id-textarea { background: rgba(28, 28, 30, 0.65); }

.variant-error .id-textarea { border-color: #ff3b30; }

.id-textarea.is-focused { border-color: var(--accent); box-shadow: 0 0 0 3.5px rgba(0,113,227,0.15); }
.textarea-footer { display: flex; justify-content: space-between; }
.textarea-hint { font-size: 12px; color: var(--text-3); }
.textarea-count { font-size: 12px; color: var(--text-3); font-family: var(--mono); font-variant-numeric: tabular-nums; }
</style>
