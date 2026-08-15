<template>
  <IdModal
    :model-value="modelValue"
    :title="variant === 'centered-empty' ? '' : title"
    :variant="variant === 'centered-empty' ? 'alert' : 'default'"
    :teleport="teleport"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <!-- Centered Empty Variant -->
    <div v-if="variant === 'centered-empty'" class="centered-empty-confirm">
      <div class="confirm-icon-box">
        <slot name="icon">
          <component :is="icon" v-if="icon && typeof icon !== 'string'" :size="28" />
          <span v-else-if="typeof icon === 'string' && icon.length <= 4" class="confirm-emoji">{{ icon }}</span>
          <AlertTriangle v-else-if="danger" :size="28" class="danger-icon" />
          <Info v-else :size="28" class="info-icon" />
        </slot>
      </div>

      <h3 v-if="title" class="centered-title">{{ title }}</h3>
      <p class="centered-message">{{ message }}</p>

      <div class="centered-actions">
        <IdButton variant="secondary" size="md" block @click="handleCancel">
          {{ cancelText }}
        </IdButton>
        <IdButton :variant="danger ? 'danger' : 'primary'" size="md" block @click="handleConfirm">
          {{ confirmText }}
        </IdButton>
      </div>
    </div>

    <!-- Standard Variant -->
    <div v-else class="confirm-body">
      <p class="confirm-message">{{ message }}</p>
      <div class="confirm-actions">
        <IdButton variant="secondary" @click="handleCancel">{{ cancelText }}</IdButton>
        <IdButton :variant="danger ? 'danger' : 'primary'" @click="handleConfirm">
          {{ confirmText }}
        </IdButton>
      </div>
    </div>
  </IdModal>
</template>

<script setup>
import { AlertTriangle, Info } from '@lucide/vue'
import IdModal from './IdModal.vue'
import IdButton from './IdButton.vue'

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: 'Confirm Action' },
  message: { type: String, default: 'Are you sure you want to proceed?' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
  icon: [String, Object, Function],
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'centered-empty'].includes(v)
  },
  danger: Boolean,
  teleport: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<style scoped>
.confirm-body { display: flex; flex-direction: column; gap: 20px; }
.confirm-message { font-size: 14.5px; color: var(--text-2); line-height: 1.6; }
.confirm-actions { display: flex; justify-content: flex-end; gap: 10px; }

/* Centered Empty Dialog Variant */
.centered-empty-confirm {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 8px 0; color: var(--text);
}
.confirm-icon-box {
  width: 64px; height: 64px; border-radius: 50%; background: var(--hover);
  display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
  color: var(--accent); flex-shrink: 0;
}
.danger-icon { color: #ff3b30; }
.info-icon { color: var(--accent); }
.confirm-emoji { font-size: 28px; line-height: 1; }
.centered-title { font-size: 18px; font-weight: 700; letter-spacing: -0.015em; color: var(--text); margin: 0 0 6px 0; }
.centered-message { font-size: 13.5px; color: var(--text-2); line-height: 1.5; margin: 0 0 24px 0; max-width: 320px; }
.centered-actions { display: flex; flex-direction: column; gap: 10px; width: 100%; }
</style>
