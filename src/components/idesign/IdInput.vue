<template>
  <div
    :class="[
      'id-input-group',
      `size-${currentSize}`,
      `radius-${currentRadius}`,
      `variant-${currentVariant}`,
      {
        'has-error': currentVariant === 'error' || hasError,
        'has-success': currentVariant === 'success' || hasSuccess,
        'has-warning': currentVariant === 'warning' || hasWarning,
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-loading': loading
      },
      config.mergedUi.value.base
    ]"
    :data-size="currentSize"
    :data-disabled="disabled || undefined"
    :data-readonly="readonly || undefined"
  >
    <label v-if="label || $slots.label" :for="inputId" :class="['input-label', config.mergedUi.value.label]">
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="required-star" aria-hidden="true">*</span>
    </label>

    <div
      :class="[
        'input-wrapper',
        {
          'is-focused': isFocused,
          'is-search': currentVariant === 'search'
        },
        config.mergedUi.value.wrapper
      ]"
    >
      <!-- Prefix / Left Icon -->
      <span v-if="currentVariant === 'search' || $slots.prefix || $slots.iconLeft || iconLeft" :class="['input-icon left', config.mergedUi.value.icon]">
        <slot name="prefix">
          <slot name="iconLeft">
            <Search v-if="currentVariant === 'search'" :size="iconSize" />
            <component :is="iconLeft" v-else-if="isComponent(iconLeft)" :size="iconSize" />
            <span v-else>{{ iconLeft }}</span>
          </slot>
        </slot>
      </span>

      <input
        :id="inputId"
        ref="inputRef"
        :type="resolvedType"
        :name="name || (formFieldContext?.name?.value)"
        :value="modelValue"
        :placeholder="placeholder || (currentVariant === 'search' ? 'Search...' : '')"
        :disabled="isDisabled || loading"
        :readonly="readonly"
        :required="isRequired"
        :aria-invalid="currentVariant === 'error' || hasError"
        :aria-describedby="hint || errorText || description ? `${inputId}-hint` : undefined"
        :class="['id-input', config.mergedUi.value.input]"
        @input="handleInput"
        @change="$emit('change', $event)"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Masked / Password Visibility Toggle -->
      <button
        v-if="(masked || type === 'password') && !disabled && !readonly"
        type="button"
        :class="['mask-toggle-btn', config.mergedUi.value.maskButton]"
        :aria-label="isMaskedVisible ? 'Hide password' : 'Show password'"
        :title="isMaskedVisible ? 'Hide password' : 'Show password'"
        tabindex="-1"
        @click="isMaskedVisible = !isMaskedVisible"
      >
        <EyeOff v-if="isMaskedVisible" :size="iconSize" />
        <Eye v-else :size="iconSize" />
      </button>

      <!-- Loading Spinner -->
      <span v-if="loading" :class="['input-icon loading-icon', config.mergedUi.value.spinner]">
        <Loader2 class="input-spinner" :size="iconSize" />
      </span>

      <!-- Clear button when clearable -->
      <button
        v-else-if="clearable && modelValue && !disabled && !readonly && !(masked || type === 'password')"
        type="button"
        :class="['clear-btn', config.mergedUi.value.clearButton]"
        aria-label="Clear text"
        tabindex="-1"
        @click="handleClear"
      >
        <X :size="12" />
      </button>

      <!-- Suffix / Right Icon -->
      <span v-if="$slots.suffix || $slots.iconRight || trailingText || iconRight" :class="['input-icon right', config.mergedUi.value.icon]">
        <slot name="suffix">
          <slot name="iconRight">
            <span v-if="trailingText" class="trailing-text">{{ trailingText }}</span>
            <component :is="iconRight" v-else-if="isComponent(iconRight)" :size="iconSize" />
            <span v-else>{{ iconRight }}</span>
          </slot>
        </slot>
      </span>
    </div>

    <!-- Description / Error / Warning Message -->
    <span
      v-if="displayHint"
      :id="`${inputId}-hint`"
      :class="['input-hint', { 'error-msg': currentVariant === 'error' || hasError, 'success-msg': currentVariant === 'success' || hasSuccess, 'warning-msg': currentVariant === 'warning' || hasWarning }, config.mergedUi.value.hint]"
    >
      {{ displayHint }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { Search, X, Loader2, Eye, EyeOff } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  name: String,
  label: String,
  placeholder: String,
  hint: String,
  description: String,
  errorText: String,
  error: [Boolean, String],
  success: [Boolean, String],
  warning: [Boolean, String],
  trailingText: String,
  type: { type: String, default: 'text' },
  masked: Boolean,
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  iconLeft: [Object, Function, String],
  iconRight: [Object, Function, String],
  clearable: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  loading: Boolean,
  id: String,
  radius: { type: String, default: undefined },
  color: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'update:value', 'change', 'focus', 'blur', 'clear', 'input'])

const formFieldContext = inject('id-form-field-context', null)

const config = useIdesignConfig('Input', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')

const currentRadius = computed(() => {
  const v = resolvedVariantRaw.value
  if (v === 'pill') return 'full'
  return config.resolvedRadius.value || 'md'
})

const resolvedVariantRaw = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw, null, {
    'no-outline': 'borderless',
    'no-border': 'borderless'
  })
})

const currentVariant = computed(() => resolvedVariantRaw.value)

const isFocused = ref(false)
const inputRef = ref(null)
const isMaskedVisible = ref(false)

const resolvedType = computed(() => {
  if (props.masked || props.type === 'password') {
    return isMaskedVisible.value ? 'text' : 'password'
  }
  return props.type || 'text'
})

const inputId = computed(() => props.id || `id-input-${Math.random().toString(36).substring(2, 9)}`)
const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'xs' ? 12 : sz === 'sm' ? 14 : sz === 'lg' ? 18 : sz === 'xl' ? 20 : 16
})

const isComponent = (val) => typeof val === 'object' || typeof val === 'function'

const hasError = computed(() => {
  if (Boolean(props.error) || Boolean(props.errorText)) return true
  if (formFieldContext && formFieldContext.error.value) return true
  return false
})
const hasSuccess = computed(() => Boolean(props.success))
const hasWarning = computed(() => Boolean(props.warning))
const isRequired = computed(() => {
  if (props.required) return true
  if (formFieldContext && formFieldContext.required.value) return true
  return false
})
const isDisabled = computed(() => {
  if (props.disabled) return true
  if (formFieldContext && formFieldContext.disabled.value) return true
  return false
})

const displayHint = computed(() => {
  if (typeof props.error === 'string') return props.error
  if (props.errorText) return props.errorText
  if (typeof props.success === 'string') return props.success
  if (typeof props.warning === 'string') return props.warning
  return props.description || props.hint || ''
})

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
  emit('update:value', e.target.value)
  emit('input', e)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('update:value', '')
  emit('clear')
  if (inputRef.value) inputRef.value.focus()
}

const handleFocus = (e) => {
  isFocused.value = true
  emit('focus', e)
}

const handleBlur = (e) => {
  isFocused.value = false
  emit('blur', e)
}

const focus = () => {
  if (inputRef.value) inputRef.value.focus()
}

const blur = () => {
  if (inputRef.value) inputRef.value.blur()
}

const select = () => {
  if (inputRef.value) inputRef.value.select()
}

const clear = () => {
  handleClear()
}

defineExpose({
  inputRef,
  focus,
  blur,
  select,
  clear
})
</script>

<style scoped>
.id-input-group { display: flex; flex-direction: column; gap: 6px; width: 100%; font-family: var(--font); }
.input-label { font-size: 13px; font-weight: 600; color: var(--text-2); display: inline-flex; align-items: center; gap: 4px; }
.required-star { color: var(--danger); font-size: 12px; line-height: 1; }

.input-wrapper {
  display: flex; align-items: center; background: var(--color-input, var(--surface));
  border: 1px solid var(--color-input-border, var(--hairline)); border-radius: 10px; padding: 0 12px; gap: 8px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.size-xs .input-wrapper { height: var(--size-xs, 28px); border-radius: var(--radius-xs, 6px); font-size: 12px; }
.size-sm .input-wrapper { height: var(--size-sm, 34px); border-radius: var(--radius-sm, 8px); font-size: 13px; }
.size-md .input-wrapper { height: var(--size-md, 42px); border-radius: 10px; font-size: 14.5px; }
.size-lg .input-wrapper { height: var(--size-lg, 48px); border-radius: var(--radius-md, 12px); font-size: 16px; }
.size-xl .input-wrapper { height: var(--size-xl, 54px); border-radius: 14px; font-size: 17.5px; }

/* Radius Classes */
.radius-none .input-wrapper { border-radius: var(--r-none) !important; }
.radius-sm .input-wrapper { border-radius: var(--r-chip) !important; }
.radius-md .input-wrapper { border-radius: var(--r-thumb) !important; }
.radius-lg .input-wrapper { border-radius: var(--r-card) !important; }
.radius-full .input-wrapper { border-radius: var(--r-pill) !important; }

.input-wrapper.is-search { border-radius: var(--r-pill); }
.input-wrapper.is-focused { border-color: var(--accent); box-shadow: 0 0 0 3px var(--color-ring); }
.has-error .input-wrapper { border-color: var(--danger); }
.has-error .input-wrapper.is-focused { box-shadow: 0 0 0 3px var(--danger-bg); }
.has-success .input-wrapper { border-color: var(--live); }
.has-warning .input-wrapper { border-color: var(--warning); }

.id-input { flex: 1; border: none; background: transparent; outline: none; font-family: var(--font); color: var(--text); min-width: 0; }
.id-input::placeholder { color: var(--text-4); }

.input-icon { display: flex; align-items: center; color: var(--text-3); }
.trailing-text { font-size: 12.5px; font-weight: 600; color: var(--text-3); font-family: var(--mono); }
.clear-btn { border: none; background: rgba(0,0,0,0.1); color: var(--text-2); border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer; }
.clear-btn:hover { background: rgba(0,0,0,0.2); color: var(--text); }
:root.dark .clear-btn { background: rgba(255,255,255,0.15); color: #fff; }

.mask-toggle-btn {
  border: none;
  background: transparent;
  color: var(--text-3);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
}
.mask-toggle-btn:hover {
  color: var(--text);
  background: var(--hover);
}

.input-spinner { animation: id-spin 0.8s linear infinite; }
@keyframes id-spin { to { transform: rotate(360deg); } }

.input-hint { font-size: 12px; color: var(--text-3); }
.error-msg { color: var(--danger); font-weight: 550; }
.success-msg { color: var(--success); font-weight: 550; }
.warning-msg { color: var(--warning); font-weight: 550; }

.is-disabled { opacity: .5; pointer-events: none; }
.is-readonly .input-wrapper { background: var(--bg); border-style: dashed; }

/* ── Variant: outline (explicit border emphasis) ── */
.id-input-group[data-variant="outline"] .input-wrapper,
.id-input-group.variant-outline .input-wrapper {
  border: var(--variant-outline-border);
  background: transparent;
}

/* ── Variant: soft (accent tinted background) ── */
.id-input-group[data-variant="soft"] .input-wrapper,
.id-input-group.variant-soft .input-wrapper {
  background: var(--variant-soft-bg);
  border: none;
}
.id-input-group[data-variant="soft"] .input-wrapper.is-focused,
.id-input-group.variant-soft .input-wrapper.is-focused {
  border: 1.5px solid var(--accent);
  box-shadow: 0 0 0 3px var(--color-ring);
}

/* ── Variant: subtle (neutral low-emphasis) ── */
.id-input-group[data-variant="subtle"] .input-wrapper,
.id-input-group.variant-subtle .input-wrapper {
  background: var(--variant-subtle-bg);
  border: var(--variant-subtle-border);
}

/* ── Variant: ghost (transparent until focus) ── */
.id-input-group[data-variant="ghost"] .input-wrapper,
.id-input-group.variant-ghost .input-wrapper {
  background: var(--variant-ghost-bg);
  border: none;
}
.id-input-group[data-variant="ghost"] .input-wrapper:hover,
.id-input-group.variant-ghost .input-wrapper:hover {
  background: var(--variant-ghost-bg-hover);
}
.id-input-group[data-variant="ghost"] .input-wrapper.is-focused,
.id-input-group.variant-ghost .input-wrapper.is-focused {
  background: var(--color-input, var(--surface));
  border: 1px solid var(--accent);
  box-shadow: 0 0 0 3px var(--color-ring);
}

/* ── Variant: borderless (no visible border or shadow) ── */
.id-input-group[data-variant="borderless"] .input-wrapper,
.id-input-group.variant-borderless .input-wrapper {
  border: none;
  box-shadow: none;
  background: transparent;
}
.id-input-group[data-variant="borderless"] .input-wrapper.is-focused,
.id-input-group.variant-borderless .input-wrapper.is-focused {
  box-shadow: none;
  border: none;
}
</style>
