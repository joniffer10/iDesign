<template>
  <div :class="['id-tag-input', `size-${size}`, { 'is-disabled': disabled, 'has-error': error, 'is-focused': isFocused }]">
    <label v-if="label" class="tag-input-label">{{ label }}</label>

    <div class="tag-input-box" @click="focusInput">
      <!-- Tag Chips List -->
      <TransitionGroup name="tag-chip-anim" tag="div" class="tags-list">
        <span
          v-for="(tag, idx) in tagsList"
          :key="tag"
          :class="['tag-pill', `variant-${tagVariant}`]"
        >
          <span class="tag-text">{{ tag }}</span>
          <button
            v-if="!disabled && !readonly"
            type="button"
            class="tag-remove-btn"
            :aria-label="`Remove ${tag}`"
            @click.stop="removeTag(idx)"
          >
            ×
          </button>
        </span>
      </TransitionGroup>

      <!-- Text Input -->
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        :placeholder="tagsList.length === 0 ? placeholder : ''"
        :disabled="disabled || readonly"
        :maxlength="maxTagLength"
        class="tag-native-input"
        @keydown="handleKeydown"
        @blur="onBlur"
        @focus="isFocused = true"
      />
    </div>

    <span v-if="errorText" class="tag-error-text">{{ errorText }}</span>
    <span v-else-if="hint" class="tag-hint-text">{{ hint }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Add tag and press Enter...'
  },
  label: String,
  hint: String,
  errorText: String,
  error: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  allowDuplicates: {
    type: Boolean,
    default: false
  },
  maxTags: {
    type: Number,
    default: 20
  },
  maxTagLength: {
    type: Number,
    default: 32
  },
  tagVariant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'accent', 'heat', 'live', 'gray'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'add', 'remove', 'change'])

const inputRef = ref(null)
const inputValue = ref('')
const isFocused = ref(false)

const tagsList = computed(() => props.modelValue || [])

const focusInput = () => {
  if (!props.disabled && !props.readonly) {
    inputRef.value?.focus()
  }
}

const addTag = (text) => {
  const trimmed = text.trim()
  if (!trimmed) return
  if (tagsList.value.length >= props.maxTags) return
  if (!props.allowDuplicates && tagsList.value.includes(trimmed)) return

  const updated = [...tagsList.value, trimmed]
  emit('update:modelValue', updated)
  emit('add', trimmed)
  emit('change', updated)
  inputValue.value = ''
}

const removeTag = (idx) => {
  const removed = tagsList.value[idx]
  const updated = tagsList.value.filter((_, i) => i !== idx)
  emit('update:modelValue', updated)
  emit('remove', removed)
  emit('change', updated)
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    addTag(inputValue.value)
  } else if (e.key === 'Backspace' && !inputValue.value && tagsList.value.length > 0) {
    removeTag(tagsList.value.length - 1)
  }
}

const onBlur = () => {
  isFocused.value = false
  if (inputValue.value) {
    addTag(inputValue.value)
  }
}
</script>

<style scoped>
.id-tag-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font);
  width: 100%;
}

.tag-input-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}

.tag-input-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-height: 42px;
  padding: 6px 10px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-sheet);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  cursor: text;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.is-focused .tag-input-box {
  border-color: var(--accent);
  box-shadow: var(--focus-ring);
}

.tags-list {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: var(--r-pill);
  font-size: 12px;
  font-weight: 600;
  background: var(--hover);
  color: var(--text);
  border: 1px solid var(--hairline);
  user-select: none;
}

.variant-accent {
  background: rgba(0, 113, 227, 0.12);
  color: var(--accent);
  border-color: rgba(0, 113, 227, 0.2);
}

.variant-heat {
  background: rgba(255, 107, 0, 0.12);
  color: var(--heat);
  border-color: rgba(255, 107, 0, 0.2);
}

.variant-live {
  background: rgba(48, 209, 88, 0.12);
  color: var(--live);
  border-color: rgba(48, 209, 88, 0.2);
}

.tag-remove-btn {
  background: transparent;
  border: none;
  color: currentColor;
  opacity: 0.6;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  padding: 0 1px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-remove-btn:hover {
  opacity: 1;
}

.tag-native-input {
  flex: 1;
  min-width: 120px;
  border: none;
  background: transparent;
  font-family: var(--font);
  font-size: 13.5px;
  color: var(--text);
  outline: none;
  padding: 2px 0;
}

.tag-error-text {
  font-size: 12px;
  color: var(--danger);
}

.tag-hint-text {
  font-size: 12px;
  color: var(--text-3);
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.tag-chip-anim-enter-active,
.tag-chip-anim-leave-active {
  transition: all 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.tag-chip-anim-enter-from,
.tag-chip-anim-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
</style>
