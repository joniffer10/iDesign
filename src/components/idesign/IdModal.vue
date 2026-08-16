<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition name="modal-fade">
      <div v-if="modelValue" :class="['modal-backdrop', config.mergedUi.value.backdrop]" @click.self="closeOnBackdrop && $emit('update:modelValue', false)" @keydown.escape="$emit('update:modelValue', false)">
        <div :class="['modal-surface', `size-${currentSize}`, `variant-${currentVariant}`, config.mergedUi.value.surface]" :style="maxWidth ? { maxWidth } : {}" role="dialog" aria-modal="true" :aria-label="title">
          <div v-if="title || subtitle || $slots.header || $slots.title || $slots.subtitle" :class="['modal-header', config.mergedUi.value.header]">
            <slot name="header">
              <div class="modal-header-titles">
                <slot name="title">
                  <h3 v-if="title" :class="['modal-title', config.mergedUi.value.title]">{{ title }}</h3>
                </slot>
                <slot name="subtitle">
                  <p v-if="subtitle" :class="['modal-subtitle', config.mergedUi.value.subtitle]">{{ subtitle }}</p>
                </slot>
              </div>
            </slot>
            <button type="button" :class="['modal-close-btn', config.mergedUi.value.closeButton || config.mergedUi.value.close]" aria-label="Close modal" @click="$emit('update:modelValue', false)">
              <X :size="16" />
            </button>
          </div>

          <div :class="['modal-body', config.mergedUi.value.body]">
            <slot>
              <p v-if="content || body" class="modal-body-text">{{ content || body }}</p>
            </slot>
          </div>

          <div v-if="$slots.footer || $slots.actions" :class="['modal-footer', config.mergedUi.value.footer]">
            <slot name="actions">
              <slot name="footer" />
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch, onMounted, onUnmounted, computed } from 'vue'
import { X } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: String,
  content: String,
  body: String,
  maxWidth: String,
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  closeOnBackdrop: { type: Boolean, default: true },
  teleport: { type: Boolean, default: true },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

const config = useIdesignConfig('Modal', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.modelValue) {
    emit('update:modelValue', false)
  }
}

watch(() => props.modelValue, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  display: flex; align-items: center; justify-content: center; padding: 20px;
}
.modal-surface {
  width: 100%; background: var(--surface); border: 1px solid var(--hairline);
  border-radius: var(--r-panel); box-shadow: var(--sh-overlay); overflow: hidden;
  display: flex; flex-direction: column; max-height: 90vh; transition: transform .25s var(--ease-spring);
}
.size-sm { max-width: 400px; }
.size-md { max-width: 540px; }
.size-lg { max-width: 720px; }
.size-xl { max-width: 960px; }
.size-full { max-width: 96vw; height: 92vh; }

.variant-glass {
  background: rgba(255, 255, 255, 0.85); backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.88);
}

.variant-alert { max-width: 340px; text-align: center; border-radius: 20px; }
.variant-alert .modal-header { flex-direction: column; align-items: center; text-align: center; border-bottom: none; padding: 20px 20px 0; }
.variant-alert .modal-close-btn { display: none; }
.variant-alert .modal-body { padding: 12px 20px 20px; }
.variant-alert .modal-footer { border-top: 1px solid var(--hairline); padding: 0; display: flex; }
.variant-alert .modal-footer :deep(button) {
  flex: 1; height: 48px; border-radius: 0; border: none; background: transparent;
  color: var(--accent); font-size: 14.5px; font-weight: 650; cursor: pointer;
  transition: background 0.15s ease;
}
.variant-alert .modal-footer :deep(button:hover) { background: var(--hover); }
.variant-alert .modal-footer :deep(button.btn-danger) { color: #ff3b30; }
.variant-alert .modal-footer :deep(button.btn-secondary),
.variant-alert .modal-footer :deep(button.btn-ghost) { color: var(--text-2); font-weight: 500; }
.variant-alert .modal-footer :deep(button + button) { border-left: 1px solid var(--hairline); }

.modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid var(--hairline); }
.modal-header-titles { display: flex; flex-direction: column; }
.modal-title { font-size: 18px; font-weight: 650; letter-spacing: -0.015em; color: var(--text); margin: 0; }
.modal-subtitle { font-size: 13px; color: var(--text-2); margin-top: 2px; }
.modal-close-btn {
  width: 30px; height: 30px; border-radius: 50%; border: none; background: var(--hover);
  color: var(--text-2); display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
}
.modal-close-btn:hover { background: var(--track); color: var(--text); }
.modal-body { padding: 24px; overflow-y: auto; flex: 1; }
.modal-body-text { font-size: 14.5px; color: var(--text-2); line-height: 1.6; margin: 0; }
.modal-footer { padding: 16px 24px; border-top: 1px solid var(--hairline); display: flex; align-items: center; justify-content: flex-end; gap: 10px; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s var(--ease-out-quart); }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .modal-surface { animation: modal-pop 0.3s var(--ease-spring); }
@keyframes modal-pop { 0% { transform: scale(0.94) translateY(10px); } 100% { transform: scale(1) translateY(0); } }
</style>
