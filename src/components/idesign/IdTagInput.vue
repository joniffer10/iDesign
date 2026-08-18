<template>
  <div
    :class="[
      'id-tag-input',
      `size-${currentSize}`,
      `radius-${currentRadius}`,
      {
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-loading': loading,
        'has-error': Boolean(error || errorText),
        'has-success': Boolean(success),
        'has-warning': Boolean(warning),
        'is-focused': isFocused
      },
      config.mergedUi.value.base
    ]"
    :data-size="currentSize"
    :data-disabled="disabled || undefined"
    :data-readonly="readonly || undefined"
  >
    <!-- Field Label -->
    <label
      v-if="label || $slots.label"
      :for="inputId"
      :class="['tag-input-label', config.mergedUi.value.label]"
    >
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="required-star" aria-hidden="true">*</span>
    </label>

    <!-- Tag Input Box (Outer Integrated Field) -->
    <div
      :class="[
        'tag-input-box',
        {
          'is-focused': isFocused,
          'has-tags': tagsList.length > 0,
          'is-empty': tagsList.length === 0 && !inputValue
        },
        config.mergedUi.value.wrapper || config.mergedUi.value.box
      ]"
      @click="focusInput"
    >
      <!-- Prefix / Left Icon -->
      <span
        v-if="$slots.prefix || $slots.iconLeft || iconLeft"
        :class="['tag-input-icon left', config.mergedUi.value.icon]"
      >
        <slot name="prefix">
          <slot name="iconLeft">
            <component :is="iconLeft" v-if="isComponent(iconLeft)" :size="iconSize" />
            <span v-else>{{ iconLeft }}</span>
          </slot>
        </slot>
      </span>

      <!-- Inline Tag Pills List -->
      <TransitionGroup
        name="tag-pill-anim"
        tag="div"
        :class="['tags-list', config.mergedUi.value.tags || config.mergedUi.value.tagsList]"
      >
        <span
          v-for="(tag, idx) in tagsList"
          :key="`${tag}-${idx}`"
          :class="[
            'tag-pill',
            `variant-${resolvedTagVariant}`,
            `color-${resolvedTagColor}`,
            config.mergedUi.value.tag
          ]"
        >
          <!-- Custom Tag Slot -->
          <slot
            name="tag"
            :tag="tag"
            :index="idx"
            :remove="() => removeTag(idx)"
          >
            <!-- Tag Label -->
            <span
              :class="['tag-text', config.mergedUi.value.tagLabel || config.mergedUi.value.label]"
              :title="tag"
            >
              <slot name="tagLabel" :tag="tag" :index="idx">{{ tag }}</slot>
            </span>

            <!-- Remove Button '×' -->
            <button
              v-if="!disabled && !readonly"
              type="button"
              :class="['tag-remove-btn', config.mergedUi.value.remove || config.mergedUi.value.removeButton]"
              :aria-label="`Remove ${tag}`"
              tabindex="-1"
              @click.stop="removeTag(idx)"
            >
              <slot name="remove" :tag="tag" :index="idx" :remove="() => removeTag(idx)">
                <X :size="pillRemoveIconSize" class="remove-icon" />
              </slot>
            </button>
          </slot>
        </span>
      </TransitionGroup>

      <!-- Native Typing Input -->
      <input
        :id="inputId"
        ref="inputRef"
        v-model="inputValue"
        type="text"
        :placeholder="tagsList.length === 0 || !placeholderOnlyWhenEmpty ? placeholder : ''"
        :disabled="disabled || loading"
        :readonly="readonly"
        :maxlength="maxTagLength"
        :aria-invalid="Boolean(error || errorText)"
        :aria-describedby="displayHint ? `${inputId}-hint` : undefined"
        :class="['tag-native-input', config.mergedUi.value.input]"
        @keydown="handleKeydown"
        @input="handleInput"
        @paste="handlePaste"
        @blur="onBlur"
        @focus="onFocus"
      />

      <!-- Loading Spinner -->
      <span
        v-if="loading"
        :class="['tag-input-icon loading-icon', config.mergedUi.value.spinner]"
      >
        <Loader2 class="input-spinner" :size="iconSize" />
      </span>

      <!-- Clear All Button -->
      <button
        v-else-if="clearable && tagsList.length > 0 && !disabled && !readonly"
        type="button"
        :class="['clear-btn', config.mergedUi.value.clearButton]"
        aria-label="Clear all tags"
        tabindex="-1"
        @click.stop="clearAll"
      >
        <X :size="12" />
      </button>

      <!-- Suffix / Right Icon -->
      <span
        v-if="$slots.suffix || $slots.iconRight || iconRight"
        :class="['tag-input-icon right', config.mergedUi.value.icon]"
      >
        <slot name="suffix">
          <slot name="iconRight">
            <component :is="iconRight" v-if="isComponent(iconRight)" :size="iconSize" />
            <span v-else>{{ iconRight }}</span>
          </slot>
        </slot>
      </span>
    </div>

    <!-- Error / Warning / Hint / Description -->
    <span
      v-if="displayHint"
      :id="`${inputId}-hint`"
      :class="[
        'tag-hint-text',
        {
          'error-msg': Boolean(error || errorText),
          'success-msg': Boolean(success),
          'warning-msg': Boolean(warning)
        },
        config.mergedUi.value.hint
      ]"
    >
      <slot name="hint">{{ displayHint }}</slot>
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { X, Loader2 } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  value: {
    type: Array,
    default: undefined
  },
  placeholder: {
    type: String,
    default: 'Add tag...'
  },
  placeholderOnlyWhenEmpty: {
    type: Boolean,
    default: true
  },
  label: String,
  hint: String,
  description: String,
  errorText: String,
  error: [Boolean, String],
  success: [Boolean, String],
  warning: [Boolean, String],
  disabled: Boolean,
  readonly: Boolean,
  loading: Boolean,
  required: Boolean,
  clearable: Boolean,
  allowDuplicates: {
    type: Boolean,
    default: false
  },
  addOnBlur: {
    type: Boolean,
    default: true
  },
  addOnPaste: {
    type: Boolean,
    default: true
  },
  delimiters: {
    type: Array,
    default: () => ['Enter', ',']
  },
  maxTags: {
    type: Number,
    default: Infinity
  },
  maxTagLength: {
    type: Number,
    default: 64
  },
  tagVariant: {
    type: String,
    default: undefined,
    validator: v => ['default', 'accent', 'heat', 'live', 'gray', 'plain', 'success', 'warning', 'danger', 'mono'].includes(v)
  },
  variant: {
    type: String,
    default: undefined
  },
  color: {
    type: String,
    default: undefined
  },
  size: {
    type: String,
    default: undefined,
    validator: v => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  radius: {
    type: String,
    default: undefined
  },
  id: String,
  iconLeft: [Object, Function, String],
  iconRight: [Object, Function, String],
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'update:modelValue',
  'update:value',
  'add',
  'remove',
  'change',
  'focus',
  'blur',
  'clear',
  'input',
  'duplicate',
  'max-tags'
])

const config = useIdesignConfig('TagInput', props)

const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'md')

const resolvedTagVariant = computed(() => {
  const v = props.tagVariant || props.variant || config.resolvedVariant.value || 'default'
  if (v === 'gray' || v === 'plain') return 'default'
  return v
})

const resolvedTagColor = computed(() => {
  const c = props.color || config.resolvedColor.value || 'default'
  if (c === 'primary') return 'accent'
  return c
})

const inputRef = ref(null)
const inputValue = ref('')
const isFocused = ref(false)

const inputId = computed(() => props.id || `id-tag-input-${Math.random().toString(36).substring(2, 9)}`)

const tagsList = computed(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue
  if (Array.isArray(props.value)) return props.value
  return []
})

const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'xs' ? 12 : sz === 'sm' ? 13.5 : sz === 'lg' ? 17 : sz === 'xl' ? 19 : 15
})

const pillRemoveIconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'xs' ? 9.5 : sz === 'sm' ? 10.5 : sz === 'lg' ? 12.5 : sz === 'xl' ? 13.5 : 11.5
})

const isComponent = (val) => typeof val === 'object' || typeof val === 'function'

const displayHint = computed(() => {
  if (typeof props.error === 'string') return props.error
  if (props.errorText) return props.errorText
  if (typeof props.success === 'string') return props.success
  if (typeof props.warning === 'string') return props.warning
  return props.description || props.hint || ''
})

const focusInput = () => {
  if (!props.disabled && !props.readonly) {
    inputRef.value?.focus()
  }
}

const addTag = (text) => {
  if (props.disabled || props.readonly || props.loading) return false
  const trimmed = (text || '').trim()
  if (!trimmed) return false

  if (tagsList.value.length >= props.maxTags) {
    emit('max-tags', { max: props.maxTags, tag: trimmed })
    return false
  }

  if (!props.allowDuplicates) {
    const isDup = tagsList.value.some(t => t.toLowerCase() === trimmed.toLowerCase())
    if (isDup) {
      emit('duplicate', trimmed)
      inputValue.value = ''
      return false
    }
  }

  const updated = [...tagsList.value, trimmed]
  emit('update:modelValue', updated)
  emit('update:value', updated)
  emit('add', trimmed)
  emit('change', updated)
  inputValue.value = ''
  return true
}

const removeTag = (idx) => {
  if (props.disabled || props.readonly) return
  if (idx < 0 || idx >= tagsList.value.length) return
  const removed = tagsList.value[idx]
  const updated = tagsList.value.filter((_, i) => i !== idx)
  emit('update:modelValue', updated)
  emit('update:value', updated)
  emit('remove', { tag: removed, index: idx })
  emit('change', updated)
}

const clearAll = () => {
  if (props.disabled || props.readonly) return
  emit('update:modelValue', [])
  emit('update:value', [])
  emit('clear')
  emit('change', [])
  inputValue.value = ''
  focusInput()
}

const handleKeydown = (e) => {
  const isDelimiter = props.delimiters.includes(e.key) || (e.key === ',' && props.delimiters.includes(','))
  if (isDelimiter) {
    e.preventDefault()
    addTag(inputValue.value)
  } else if (e.key === 'Backspace' && !inputValue.value && tagsList.value.length > 0) {
    removeTag(tagsList.value.length - 1)
  }
}

const handleInput = (e) => {
  emit('input', e)
  // If user typed a comma separator directly
  if (props.delimiters.includes(',') && inputValue.value.includes(',')) {
    const parts = inputValue.value.split(',')
    for (let i = 0; i < parts.length - 1; i++) {
      addTag(parts[i])
    }
    inputValue.value = parts[parts.length - 1]
  }
}

const handlePaste = (e) => {
  if (!props.addOnPaste) return
  const pasteData = e.clipboardData?.getData('text')
  if (!pasteData) return

  // Check if pasted content has commas or line breaks
  if (pasteData.includes(',') || pasteData.includes('\n')) {
    e.preventDefault()
    const tokens = pasteData.split(/[,\n]+/).map(t => t.trim()).filter(Boolean)
    for (const token of tokens) {
      addTag(token)
    }
  }
}

const onFocus = (e) => {
  isFocused.value = true
  emit('focus', e)
}

const onBlur = (e) => {
  isFocused.value = false
  if (props.addOnBlur && inputValue.value.trim()) {
    addTag(inputValue.value)
  }
  emit('blur', e)
}

const focus = () => {
  focusInput()
}

const blur = () => {
  inputRef.value?.blur()
}

const clear = () => {
  clearAll()
}

defineExpose({
  inputRef,
  focus,
  blur,
  clear,
  addTag,
  removeTag
})
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
  display: inline-flex;
  align-items: center;
  gap: 4px;
  letter-spacing: var(--tracking-tight);
}

.required-star {
  color: var(--danger);
  font-size: 12px;
  line-height: 1;
}

/* Outer field container */
.tag-input-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-height: var(--size-md, 42px);
  padding: 4px 10px;
  background: var(--color-input, var(--surface));
  border: 1px solid var(--color-input-border, var(--hairline));
  border-radius: var(--radius-md, 12px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  cursor: text;
  transition: border-color 0.2s cubic-bezier(0.32, 0.72, 0, 1),
              box-shadow 0.2s cubic-bezier(0.32, 0.72, 0, 1),
              background-color 0.2s ease;
  box-sizing: border-box;
}

/* Sizing Scales */
.size-xs .tag-input-box {
  min-height: var(--size-xs, 28px);
  padding: 2px 7px;
  gap: 4px;
  border-radius: var(--radius-xs, 6px);
  font-size: 12px;
}

.size-sm .tag-input-box {
  min-height: var(--size-sm, 34px);
  padding: 3px 8px;
  gap: 5px;
  border-radius: var(--radius-sm, 8px);
  font-size: 13px;
}

.size-md .tag-input-box {
  min-height: var(--size-md, 42px);
  padding: 4px 10px;
  gap: 6px;
  border-radius: var(--radius-md, 10px);
  font-size: 14px;
}

.size-lg .tag-input-box {
  min-height: var(--size-lg, 48px);
  padding: 6px 12px;
  gap: 7px;
  border-radius: var(--radius-md, 12px);
  font-size: 15px;
}

.size-xl .tag-input-box {
  min-height: var(--size-xl, 56px);
  padding: 8px 14px;
  gap: 8px;
  border-radius: 14px;
  font-size: 16.5px;
}

/* Radius Variants */
.radius-none .tag-input-box { border-radius: var(--r-none) !important; }
.radius-sm .tag-input-box { border-radius: var(--r-chip) !important; }
.radius-md .tag-input-box { border-radius: var(--r-thumb) !important; }
.radius-lg .tag-input-box { border-radius: var(--r-card) !important; }
.radius-full .tag-input-box { border-radius: var(--r-pill) !important; }

/* Focus and State Ring */
.tag-input-box.is-focused,
.is-focused .tag-input-box {
  border-color: var(--accent);
  box-shadow: var(--focus-ring);
}

.has-error .tag-input-box {
  border-color: var(--danger);
}
.has-error .tag-input-box.is-focused {
  box-shadow: 0 0 0 3px var(--danger-bg);
}

.has-success .tag-input-box {
  border-color: var(--live);
}

.has-warning .tag-input-box {
  border-color: var(--warning);
}

/* Tags List */
.tags-list {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px 6px;
}

.size-xs .tags-list { gap: 3px 4px; }
.size-sm .tags-list { gap: 4px 5px; }
.size-lg .tags-list { gap: 6px 7px; }
.size-xl .tags-list { gap: 7px 8px; }

/* Tag Pill */
.tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2.5px 8px;
  border-radius: var(--r-pill);
  font-size: 12px;
  font-weight: 550;
  line-height: 1.35;
  background: var(--hover, #fbfbfd);
  color: var(--text);
  border: 1px solid var(--hairline);
  user-select: none;
  transition: all 0.15s cubic-bezier(0.32, 0.72, 0, 1);
  box-sizing: border-box;
}

.size-xs .tag-pill {
  font-size: 10.5px;
  padding: 1px 5.5px;
  gap: 3px;
}

.size-sm .tag-pill {
  font-size: 11.5px;
  padding: 2px 7px;
  gap: 3.5px;
}

.size-md .tag-pill {
  font-size: 12.5px;
  padding: 2.5px 8.5px;
  gap: 4px;
}

.size-lg .tag-pill {
  font-size: 13.5px;
  padding: 3.5px 10px;
  gap: 5px;
}

.size-xl .tag-pill {
  font-size: 15px;
  padding: 5px 12px;
  gap: 6px;
}

/* Tag Variants */
.variant-default,
.variant-gray,
.variant-plain {
  background: rgba(0, 0, 0, 0.04);
  color: var(--text);
  border-color: var(--hairline);
}

.variant-accent,
.color-accent {
  background: rgba(0, 113, 227, 0.09);
  color: var(--accent);
  border-color: rgba(0, 113, 227, 0.22);
}

.variant-heat,
.color-heat {
  background: rgba(255, 107, 0, 0.1);
  color: var(--heat);
  border-color: rgba(255, 107, 0, 0.22);
}

.variant-live,
.variant-success,
.color-success,
.color-live {
  background: rgba(48, 209, 88, 0.1);
  color: var(--live);
  border-color: rgba(48, 209, 88, 0.22);
}

.variant-warning,
.color-warning {
  background: rgba(255, 159, 10, 0.1);
  color: var(--warning);
  border-color: rgba(255, 159, 10, 0.22);
}

.variant-danger,
.color-danger {
  background: rgba(255, 59, 48, 0.1);
  color: var(--danger);
  border-color: rgba(255, 59, 48, 0.22);
}

.variant-mono {
  font-family: var(--mono);
  background: var(--text);
  color: #ffffff;
  border-color: var(--text);
}

/* Tag Label */
.tag-text {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Remove Button '×' */
.tag-remove-btn {
  background: transparent;
  border: none;
  color: currentColor;
  opacity: 0.55;
  cursor: pointer;
  padding: 0;
  margin-left: 1px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s ease, background-color 0.15s ease, transform 0.15s ease;
  line-height: 1;
}

.tag-remove-btn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.08);
}

:root.dark .tag-remove-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.tag-remove-btn:active {
  transform: scale(0.9);
}

.remove-icon {
  display: block;
}

/* Native Text Input inside the box */
.tag-native-input {
  flex: 1 1 70px;
  min-width: 60px;
  border: none;
  background: transparent;
  font-family: var(--font);
  font-size: 13.5px;
  color: var(--text);
  outline: none;
  padding: 3px 0;
  box-sizing: border-box;
}

.size-xs .tag-native-input { font-size: 11.5px; }
.size-sm .tag-native-input { font-size: 12.5px; }
.size-md .tag-native-input { font-size: 13.5px; }
.size-lg .tag-native-input { font-size: 15px; }
.size-xl .tag-native-input { font-size: 16.5px; }

.tag-native-input::placeholder {
  color: var(--text-4);
}

/* Icons & Actions */
.tag-input-icon {
  display: inline-flex;
  align-items: center;
  color: var(--text-3);
}

.clear-btn {
  border: none;
  background: rgba(0, 0, 0, 0.08);
  color: var(--text-2);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.clear-btn:hover {
  background: rgba(0, 0, 0, 0.16);
  color: var(--text);
}

:root.dark .clear-btn {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

:root.dark .clear-btn:hover {
  background: rgba(255, 255, 255, 0.22);
}

.input-spinner {
  animation: id-spin 0.8s linear infinite;
  color: var(--text-3);
}

@keyframes id-spin {
  to { transform: rotate(360deg); }
}

/* Hint & Error Text */
.tag-hint-text {
  font-size: 12px;
  color: var(--text-3);
  letter-spacing: var(--tracking-tight);
}

.error-msg {
  color: var(--danger);
  font-weight: 550;
}

.success-msg {
  color: var(--success);
  font-weight: 550;
}

.warning-msg {
  color: var(--warning);
  font-weight: 550;
}

/* States */
.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.is-readonly .tag-input-box {
  background: var(--bg);
  border-style: dashed;
  cursor: default;
}

/* Animations */
.tag-pill-anim-enter-active,
.tag-pill-anim-leave-active {
  transition: all 0.2s cubic-bezier(0.32, 0.72, 0, 1);
}

.tag-pill-anim-enter-from,
.tag-pill-anim-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Dark Mode explicit overrides */
:root.dark .variant-default,
:root.dark .variant-gray,
:root.dark .variant-plain {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
  color: var(--text);
}

:root.dark .variant-accent,
:root.dark .color-accent {
  background: rgba(41, 151, 255, 0.15);
  border-color: rgba(41, 151, 255, 0.3);
  color: #2997ff;
}

:root.dark .variant-live,
:root.dark .variant-success,
:root.dark .color-success,
:root.dark .color-live {
  background: rgba(52, 199, 89, 0.15);
  border-color: rgba(52, 199, 89, 0.3);
  color: #34c759;
}

:root.dark .variant-warning,
:root.dark .color-warning {
  background: rgba(255, 159, 10, 0.15);
  border-color: rgba(255, 159, 10, 0.3);
  color: #ff9500;
}

:root.dark .variant-danger,
:root.dark .color-danger {
  background: rgba(255, 69, 58, 0.15);
  border-color: rgba(255, 69, 58, 0.3);
  color: #ff453a;
}

:root.dark .variant-heat,
:root.dark .color-heat {
  background: rgba(255, 69, 58, 0.18);
  border-color: rgba(255, 69, 58, 0.3);
  color: #ff453a;
}

:root.dark .variant-mono {
  background: #ffffff;
  color: #000000;
  border-color: #ffffff;
}
</style>
