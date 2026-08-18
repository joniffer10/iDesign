<template>
  <IdModal
    :model-value="isOpen"
    :variant="modalVariant"
    :teleport="teleport"
    :close-on-backdrop="closeOnBackdrop"
    :close-on-outside-click="closeOnOutsideClick"
    :close-on-escape="closeOnEscape"
    :show-close="false"
    :ui="modalUiOverrides"
    @update:model-value="handleUpdateModelValue"
    @open="$emit('open')"
    @close="$emit('close')"
  >
    <!-- Inset / Compact Variant (New) -->
    <div
      v-if="isInsetVariant"
      :class="['confirm-inset-container', config.mergedUi.value.base]"
    >
      <!-- Header -->
      <div :class="['confirm-inset-header', config.mergedUi.value.header]">
        <div class="confirm-inset-titles">
          <!-- Icon + Title row if icon provided -->
          <div class="confirm-inset-title-row">
            <div
              v-if="$slots.icon || icon"
              :class="['confirm-inset-icon', config.mergedUi.value.iconBox]"
            >
              <slot name="icon">
                <component :is="icon" v-if="icon && typeof icon !== 'string'" :size="20" />
                <span v-else-if="typeof icon === 'string' && icon.length <= 4" class="confirm-emoji-sm">{{ icon }}</span>
                <AlertTriangle v-else-if="danger" :size="20" class="danger-icon" />
                <Info v-else :size="20" class="info-icon" />
              </slot>
            </div>

            <slot name="title">
              <h3
                v-if="title"
                :class="['confirm-inset-title', config.mergedUi.value.title]"
              >
                {{ title }}
              </h3>
            </slot>
          </div>

          <slot name="description">
            <slot name="message">
              <p
                v-if="resolvedDescription"
                :class="['confirm-inset-description', config.mergedUi.value.description || config.mergedUi.value.message]"
              >
                {{ resolvedDescription }}
              </p>
            </slot>
          </slot>
        </div>
      </div>

      <!-- Inset Content / Input Area (Only if slot provided or content exists) -->
      <div
        v-if="$slots.default || $slots.content || content"
        :class="['confirm-inset-box', config.mergedUi.value.content || config.mergedUi.value.inset]"
      >
        <slot name="content">
          <slot>
            <p v-if="content" class="confirm-inset-content-text">{{ content }}</p>
          </slot>
        </slot>
      </div>

      <!-- Actions -->
      <div :class="['confirm-inset-actions', config.mergedUi.value.actions || config.mergedUi.value.footer]">
        <slot name="actions">
          <slot name="cancel">
            <IdButton
              variant="secondary"
              size="md"
              :disabled="cancelDisabled || isLoading"
              :class="['confirm-dialog-btn', config.mergedUi.value.cancel]"
              @click="handleCancel"
            >
              {{ cancelText }}
            </IdButton>
          </slot>
          <slot name="confirm">
            <IdButton
              :variant="danger ? 'danger' : 'primary'"
              size="md"
              :loading="isLoading"
              :disabled="isDisabled"
              :class="['confirm-dialog-btn', config.mergedUi.value.confirm]"
              @click="handleConfirm"
            >
              {{ confirmText }}
            </IdButton>
          </slot>
        </slot>
      </div>
    </div>

    <!-- Centered Empty Variant -->
    <div
      v-else-if="isCenteredVariant"
      :class="['centered-empty-confirm', config.mergedUi.value.base]"
    >
      <div :class="['confirm-icon-box', config.mergedUi.value.iconBox]">
        <slot name="icon">
          <component :is="icon" v-if="icon && typeof icon !== 'string'" :size="28" />
          <span v-else-if="typeof icon === 'string' && icon.length <= 4" class="confirm-emoji">{{ icon }}</span>
          <AlertTriangle v-else-if="danger" :size="28" class="danger-icon" />
          <Info v-else :size="28" class="info-icon" />
        </slot>
      </div>

      <slot name="title">
        <h3 v-if="title" :class="['centered-title', config.mergedUi.value.title]">{{ title }}</h3>
      </slot>

      <slot name="description">
        <slot name="message">
          <p v-if="resolvedDescription" :class="['centered-message', config.mergedUi.value.description || config.mergedUi.value.message]">
            {{ resolvedDescription }}
          </p>
        </slot>
      </slot>

      <div v-if="$slots.default || $slots.content || content" :class="['centered-content-slot', config.mergedUi.value.content]">
        <slot name="content">
          <slot>
            <p v-if="content">{{ content }}</p>
          </slot>
        </slot>
      </div>

      <div :class="['centered-actions', config.mergedUi.value.actions || config.mergedUi.value.footer]">
        <slot name="actions">
          <slot name="cancel">
            <IdButton
              variant="secondary"
              size="md"
              block
              :disabled="cancelDisabled || isLoading"
              :class="['confirm-dialog-btn', config.mergedUi.value.cancel]"
              @click="handleCancel"
            >
              {{ cancelText }}
            </IdButton>
          </slot>
          <slot name="confirm">
            <IdButton
              :variant="danger ? 'danger' : 'primary'"
              size="md"
              block
              :loading="isLoading"
              :disabled="isDisabled"
              :class="['confirm-dialog-btn', config.mergedUi.value.confirm]"
              @click="handleConfirm"
            >
              {{ confirmText }}
            </IdButton>
          </slot>
        </slot>
      </div>
    </div>

    <!-- Standard / Default Variant -->
    <div v-else :class="['confirm-body', config.mergedUi.value.base]">
      <div v-if="title" class="confirm-default-header">
        <div v-if="$slots.icon || icon" :class="['confirm-default-icon', config.mergedUi.value.iconBox]">
          <slot name="icon">
            <component :is="icon" v-if="icon && typeof icon !== 'string'" :size="20" />
            <span v-else-if="typeof icon === 'string' && icon.length <= 4" class="confirm-emoji-sm">{{ icon }}</span>
            <AlertTriangle v-else-if="danger" :size="20" class="danger-icon" />
            <Info v-else :size="20" class="info-icon" />
          </slot>
        </div>
        <slot name="title">
          <h3 :class="['confirm-default-title', config.mergedUi.value.title]">{{ title }}</h3>
        </slot>
      </div>

      <slot name="description">
        <slot name="message">
          <p v-if="resolvedDescription" :class="['confirm-message', config.mergedUi.value.description || config.mergedUi.value.message]">
            {{ resolvedDescription }}
          </p>
        </slot>
      </slot>

      <div v-if="$slots.default || $slots.content || content" :class="['confirm-default-content', config.mergedUi.value.content]">
        <slot name="content">
          <slot>
            <p v-if="content">{{ content }}</p>
          </slot>
        </slot>
      </div>

      <div :class="['confirm-actions', config.mergedUi.value.actions || config.mergedUi.value.footer]">
        <slot name="actions">
          <slot name="cancel">
            <IdButton
              variant="secondary"
              :disabled="cancelDisabled || isLoading"
              :class="config.mergedUi.value.cancel"
              @click="handleCancel"
            >
              {{ cancelText }}
            </IdButton>
          </slot>
          <slot name="confirm">
            <IdButton
              :variant="danger ? 'danger' : 'primary'"
              :loading="isLoading"
              :disabled="isDisabled"
              :class="config.mergedUi.value.confirm"
              @click="handleConfirm"
            >
              {{ confirmText }}
            </IdButton>
          </slot>
        </slot>
      </div>
    </div>
  </IdModal>
</template>

<script setup>
import { computed } from 'vue'
import { AlertTriangle, Info } from '@lucide/vue'
import IdModal from './IdModal.vue'
import IdButton from './IdButton.vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  open: { type: Boolean, default: undefined },
  title: { type: String, default: 'Confirm Action' },
  message: { type: String, default: '' },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
  icon: [String, Object, Function],
  variant: {
    type: String,
    default: undefined
  },
  danger: Boolean,
  loading: Boolean,
  confirmLoading: Boolean,
  disabled: Boolean,
  confirmDisabled: Boolean,
  cancelDisabled: Boolean,
  closeOnBackdrop: { type: Boolean, default: true },
  closeOnOutsideClick: { type: Boolean, default: undefined },
  closeOnEscape: { type: Boolean, default: true },
  teleport: { type: Boolean, default: true },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'update:open', 'confirm', 'cancel', 'close', 'open'])

const config = useIdesignConfig('ConfirmDialog', props)
const currentVariant = computed(() => (config.resolvedVariant.value || 'default').toLowerCase())

const isInsetVariant = computed(() => currentVariant.value === 'inset' || currentVariant.value === 'compact')
const isCenteredVariant = computed(() => currentVariant.value === 'centered-empty' || currentVariant.value === 'centered')

const isOpen = computed(() => {
  if (props.open !== undefined) return props.open
  return props.modelValue
})

const resolvedDescription = computed(() => {
  return props.description || props.message || (isInsetVariant.value || isCenteredVariant.value ? '' : 'Are you sure you want to proceed?')
})

const isLoading = computed(() => props.loading || props.confirmLoading || false)
const isDisabled = computed(() => props.disabled || props.confirmDisabled || false)

const modalVariant = computed(() => {
  if (isInsetVariant.value) return 'seamless'
  if (isCenteredVariant.value) return 'alert'
  return 'default'
})

const modalUiOverrides = computed(() => {
  const customSurface = config.mergedUi.value.surface
  const customBase = config.mergedUi.value.base
  return {
    surface: isInsetVariant.value
      ? ['confirm-dialog-surface-inset', customSurface, customBase].filter(Boolean).join(' ')
      : [customSurface, customBase].filter(Boolean).join(' ')
  }
})

const handleUpdateModelValue = (val) => {
  emit('update:modelValue', val)
  emit('update:open', val)
  if (!val) emit('close')
}

const handleConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
  emit('update:open', false)
  emit('close')
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
  emit('update:open', false)
  emit('close')
}
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════
   1. Inset / Compact Variant (Flagship Apple Liquid Glass Dialog)
   ═══════════════════════════════════════════════════════════════════ */
:deep(.confirm-dialog-surface-inset) {
  max-width: 420px !important;
  border-radius: var(--r-panel, 22px) !important;
  box-shadow: var(--sh-overlay) !important;
  background: var(--surface, #ffffff) !important;
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07)) !important;
  overflow: hidden;
}

:root.dark :deep(.confirm-dialog-surface-inset),
html[data-theme="dark"] :deep(.confirm-dialog-surface-inset) {
  background: var(--surface, #1c1c1e) !important;
  border-color: var(--hairline, rgba(255, 255, 255, 0.12)) !important;
}

.confirm-inset-container {
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
}

.confirm-inset-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.confirm-inset-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.confirm-inset-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--r-thumb, 12px);
  background: var(--hover, #fbfbfd);
  color: var(--accent, #0071e3);
  flex-shrink: 0;
}

:root.dark .confirm-inset-icon,
html[data-theme="dark"] .confirm-inset-icon {
  background: rgba(255, 255, 255, 0.08);
}

.confirm-inset-title {
  font-size: 17.5px;
  font-weight: 650;
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text, #1d1d1f);
  margin: 0;
  line-height: 1.3;
}

.confirm-inset-description {
  font-size: 13.5px;
  color: var(--text-2, #6e6e73);
  line-height: 1.5;
  margin: 0;
}

/* Inset Content / Input Area */
.confirm-inset-box {
  background: var(--bg, #f5f5f7);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  border-radius: var(--r-thumb, 12px);
  padding: 14px 16px;
  font-size: 13.5px;
  color: var(--text, #1d1d1f);
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
}

:root.dark .confirm-inset-box,
html[data-theme="dark"] .confirm-inset-box {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.08);
  color: var(--text, #f5f5f7);
}

.confirm-inset-content-text {
  margin: 0;
  font-size: 13.5px;
  color: var(--text-body, #424245);
}

/* Inset Actions (Side-by-side Cancel & Confirm) */
.confirm-inset-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: 4px;
}

.confirm-inset-actions .confirm-dialog-btn,
.confirm-inset-actions :deep(.id-btn) {
  flex: 1;
  display: inline-flex;
  justify-content: center;
}

/* ═══════════════════════════════════════════════════════════════════
   2. Centered Empty Dialog Variant
   ═══════════════════════════════════════════════════════════════════ */
.centered-empty-confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 0;
  color: var(--text, #1d1d1f);
}

.confirm-icon-box {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--hover, #fbfbfd);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--accent, #0071e3);
  flex-shrink: 0;
}

:root.dark .confirm-icon-box,
html[data-theme="dark"] .confirm-icon-box {
  background: rgba(255, 255, 255, 0.08);
}

.danger-icon { color: var(--danger, #ff3b30); }
.info-icon { color: var(--accent, #0071e3); }
.confirm-emoji { font-size: 28px; line-height: 1; }
.confirm-emoji-sm { font-size: 18px; line-height: 1; }

.centered-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text, #1d1d1f);
  margin: 0 0 6px 0;
}

.centered-message {
  font-size: 13.5px;
  color: var(--text-2, #6e6e73);
  line-height: 1.5;
  margin: 0 0 20px 0;
  max-width: 320px;
}

.centered-content-slot {
  width: 100%;
  margin-bottom: 16px;
}

.centered-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

/* ═══════════════════════════════════════════════════════════════════
   3. Standard / Default Variant
   ═══════════════════════════════════════════════════════════════════ */
.confirm-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 4px 0;
}

.confirm-default-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.confirm-default-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent, #0071e3);
}

.confirm-default-title {
  font-size: 17px;
  font-weight: 650;
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text, #1d1d1f);
  margin: 0;
}

.confirm-message {
  font-size: 14.5px;
  color: var(--text-2, #6e6e73);
  line-height: 1.6;
  margin: 0;
}

.confirm-default-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* ═══════════════════════════════════════════════════════════════════
   Responsive & Accessibility
   ═══════════════════════════════════════════════════════════════════ */
@media (max-width: 480px) {
  .confirm-inset-container {
    padding: 20px 16px;
    gap: 14px;
  }
  .confirm-inset-actions {
    flex-direction: column-reverse;
    gap: 8px;
  }
  .confirm-inset-actions .confirm-dialog-btn,
  .confirm-inset-actions :deep(.id-btn) {
    width: 100%;
  }
}
</style>
