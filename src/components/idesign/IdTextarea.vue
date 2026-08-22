<template>
  <div :class="['id-textarea-group', `size-${currentSize}`, `variant-${currentVariant}`, `radius-${currentRadius}`, config.mergedUi.value.base]">
    <label v-if="label" :class="['textarea-label', config.mergedUi.value.label]">{{ label }}</label>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      :class="['id-textarea', { 'is-focused': isFocused }, config.mergedUi.value.textarea]"
      :aria-label="label"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <div v-if="hint || maxlength" :class="['textarea-footer', config.mergedUi.value.footer]">
      <span v-if="hint" :class="['textarea-hint', config.mergedUi.value.hint]">{{ hint }}</span>
      <span v-if="maxlength" :class="['textarea-count', config.mergedUi.value.count]">{{ (modelValue || '').length }}/{{ maxlength }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: String,
  placeholder: String,
  hint: String,
  rows: { type: Number, default: 4 },
  maxlength: Number,
  disabled: Boolean,
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  radius: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

defineEmits(['update:modelValue'])

const config = useIdesignConfig('Textarea', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'md')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw, null, {
    'no-outline': 'borderless',
    'no-border': 'borderless'
  })
})

const isFocused = ref(false)
</script>

<style scoped>
.id-textarea-group { display: flex; flex-direction: column; gap: 6px; width: 100%; font-family: var(--font); }
.textarea-label { font-size: 13px; font-weight: 600; color: var(--text-2); }

/* Size variants */
.size-xs .id-textarea { padding: 6px 8px; font-size: 12px; border-radius: 6px; }
.size-sm .id-textarea { padding: 8px 10px; font-size: 13px; border-radius: 8px; }
.size-md .id-textarea { padding: 10px 14px; font-size: 14.5px; border-radius: 10px; }
.size-lg .id-textarea { padding: 14px 18px; font-size: 16px; border-radius: 12px; }
.size-xl .id-textarea { padding: 16px 22px; font-size: 17.5px; border-radius: 14px; }

/* Radius Classes */
.radius-none .id-textarea { border-radius: var(--r-none) !important; }
.radius-sm .id-textarea { border-radius: var(--r-chip) !important; }
.radius-md .id-textarea { border-radius: var(--r-thumb) !important; }
.radius-lg .id-textarea { border-radius: var(--r-card) !important; }
.radius-full .id-textarea { border-radius: var(--r-pill) !important; }

.id-textarea {
  width: 100%; background: var(--surface); border: 1px solid var(--hairline);
  color: var(--text); resize: vertical; outline: none; transition: border-color .2s, box-shadow .2s; line-height: 1.6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.id-textarea::placeholder { color: var(--text-4); }

.variant-glass .id-textarea {
  background: var(--variant-glass-bg); backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop); border: var(--variant-glass-border);
}

.variant-outline .id-textarea { border: var(--variant-outline-border); background: transparent; }
.variant-soft .id-textarea { background: var(--variant-soft-bg); border: none; color: var(--variant-soft-color); }
.variant-subtle .id-textarea { background: var(--variant-subtle-bg); border: var(--variant-subtle-border); }
.variant-ghost .id-textarea { background: transparent; border: none; }
.variant-ghost .id-textarea:hover { background: var(--hover); }
.variant-borderless .id-textarea { border: none !important; box-shadow: none !important; background: transparent; }

.variant-error .id-textarea { border-color: #ff3b30; }

.id-textarea.is-focused { border-color: var(--accent); box-shadow: 0 0 0 3.5px rgba(0,113,227,0.15); }
.textarea-footer { display: flex; justify-content: space-between; }
.textarea-hint { font-size: 12px; color: var(--text-3); }
.textarea-count { font-size: 12px; color: var(--text-3); font-family: var(--mono); font-variant-numeric: tabular-nums; }
</style>
