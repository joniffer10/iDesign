<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        :class="['modal-backdrop', config.mergedUi.value.backdrop]"
        @click="handleBackdropClick"
      >
        <div
          ref="modalSurfaceRef"
          :class="[
            'modal-surface',
            `size-${currentSize}`,
            `variant-${currentVariant}`,
            {
              'is-seamless': isSeamless,
              'is-clean': isClean,
              'no-dividers': hasNoDividers
            },
            config.mergedUi.value.surface,
            config.mergedUi.value.base
          ]"
          :style="maxWidth ? { maxWidth } : {}"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="hasHeaderTitle ? titleId : undefined"
          :aria-describedby="hasHeaderDesc ? descId : undefined"
          :aria-label="!hasHeaderTitle && title ? title : undefined"
          tabindex="-1"
          @click.stop
        >
          <!-- Header -->
          <div
            v-if="hasHeader"
            :class="['modal-header', config.mergedUi.value.header]"
          >
            <slot name="header">
              <div class="modal-header-titles">
                <slot name="title">
                  <h3
                    v-if="title"
                    :id="titleId"
                    :class="['modal-title', config.mergedUi.value.title]"
                  >
                    {{ title }}
                  </h3>
                </slot>
                <slot name="description">
                  <slot name="subtitle">
                    <p
                      v-if="resolvedDescription"
                      :id="descId"
                      :class="['modal-description', config.mergedUi.value.description || config.mergedUi.value.subtitle]"
                    >
                      {{ resolvedDescription }}
                    </p>
                  </slot>
                </slot>
              </div>
            </slot>

            <!-- Close Button -->
            <slot v-if="shouldShowClose" name="close">
              <button
                type="button"
                :class="['modal-close-btn', config.mergedUi.value.closeButton || config.mergedUi.value.close]"
                aria-label="Close modal"
                @click="closeModal"
              >
                <X :size="16" />
              </button>
            </slot>
          </div>

          <!-- Body / Content -->
          <div :class="['modal-body', config.mergedUi.value.body]">
            <slot name="body">
              <slot>
                <p v-if="content || body" class="modal-body-text">
                  {{ content || body }}
                </p>
              </slot>
            </slot>
          </div>

          <!-- Footer / Actions -->
          <div
            v-if="$slots.footer || $slots.actions"
            :class="['modal-footer', config.mergedUi.value.footer || config.mergedUi.value.actions]"
          >
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
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { X } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

let idCounter = 0

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  body: { type: String, default: '' },
  maxWidth: String,
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  closeOnBackdrop: { type: Boolean, default: true },
  closeOnOutsideClick: { type: Boolean, default: undefined },
  closeOnEscape: { type: Boolean, default: true },
  showClose: { type: Boolean, default: true },
  showCloseButton: { type: Boolean, default: undefined },
  teleport: { type: Boolean, default: true },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'close', 'open'])

const config = useIdesignConfig('Modal', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')

const isSeamless = computed(() => currentVariant.value === 'glass' || currentVariant.value === 'seamless')
const isClean = computed(() => {
  const v = currentVariant.value
  return v === 'clean' || v === 'plain' || v === 'no-divider' || v === 'nodivider' || v === 'solid-seamless'
})
const hasNoDividers = computed(() => isSeamless.value || isClean.value)

const resolvedDescription = computed(() => props.description || props.subtitle || '')

const shouldCloseOnOutside = computed(() => {
  if (props.closeOnOutsideClick !== undefined) return props.closeOnOutsideClick
  return props.closeOnBackdrop
})

const shouldCloseOnEsc = computed(() => props.closeOnEscape)

const shouldShowClose = computed(() => {
  if (props.showCloseButton !== undefined) return props.showCloseButton
  return props.showClose
})

const modalSurfaceRef = ref(null)
let lastActiveElement = null

const instanceId = ++idCounter
const titleId = `modal-title-${instanceId}`
const descId = `modal-desc-${instanceId}`

const hasHeaderTitle = computed(() => !!props.title)
const hasHeaderDesc = computed(() => !!resolvedDescription.value)

const hasHeader = computed(() => {
  return hasHeaderTitle.value ||
    hasHeaderDesc.value ||
    shouldShowClose.value
})

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget && shouldCloseOnOutside.value) {
    closeModal()
  }
}

// Focus Trap & Keyboard Navigation
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

const trapFocus = (e) => {
  if (!modalSurfaceRef.value) return
  const focusables = modalSurfaceRef.value.querySelectorAll(FOCUSABLE_SELECTOR)
  if (!focusables.length) {
    e.preventDefault()
    return
  }

  const firstFocusable = focusables[0]
  const lastFocusable = focusables[focusables.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === firstFocusable || document.activeElement === modalSurfaceRef.value) {
      e.preventDefault()
      lastFocusable.focus()
    }
  } else {
    if (document.activeElement === lastFocusable) {
      e.preventDefault()
      firstFocusable.focus()
    }
  }
}

const handleKeydown = (e) => {
  if (!props.modelValue) return

  if (e.key === 'Escape' && shouldCloseOnEsc.value) {
    e.stopPropagation()
    closeModal()
  } else if (e.key === 'Tab') {
    trapFocus(e)
  }
}

watch(() => props.modelValue, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = val ? 'hidden' : ''
  }

  if (val) {
    if (typeof document !== 'undefined') {
      lastActiveElement = document.activeElement
    }
    emit('open')
    nextTick(() => {
      if (modalSurfaceRef.value) {
        const firstFocusable = modalSurfaceRef.value.querySelector(FOCUSABLE_SELECTOR)
        if (firstFocusable) {
          firstFocusable.focus()
        } else {
          modalSurfaceRef.value.focus()
        }
      }
    })
  } else {
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus()
      lastActiveElement = null
    }
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
  if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
    lastActiveElement.focus()
  }
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════
   Backdrop & Positioning
   ═══════════════════════════════════════════════════════════════════ */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--overlay-bg, rgba(0, 0, 0, 0.42));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

/* ═══════════════════════════════════════════════════════════════════
   Modal Surface (Unified Container)
   ═══════════════════════════════════════════════════════════════════ */
.modal-surface {
  width: 100%;
  background: var(--surface, #ffffff);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  border-radius: var(--r-panel, 22px);
  box-shadow: var(--sh-overlay);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  max-height: min(90vh, 860px);
  outline: none;
  position: relative;
  transition: transform 0.35s var(--ease-spring, cubic-bezier(0.32, 0.72, 0, 1)),
              opacity 0.25s var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
}

/* Sizing Tiers */
.size-sm { max-width: 400px; }
.size-md { max-width: 540px; }
.size-lg { max-width: 720px; }
.size-xl { max-width: 960px; }
.size-full { max-width: 96vw; height: 92vh; }

/* ═══════════════════════════════════════════════════════════════════
   Liquid Glass / Seamless Variant (Flagship Unified Surface)
   ═══════════════════════════════════════════════════════════════════ */
.variant-glass,
.variant-seamless,
.is-seamless {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: var(--sh-overlay), inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

:root.dark .variant-glass,
:root.dark .variant-seamless,
:root.dark .is-seamless,
html[data-theme="dark"] .variant-glass,
html[data-theme="dark"] .variant-seamless,
html[data-theme="dark"] .is-seamless {
  background: rgba(28, 28, 30, 0.82);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: var(--sh-overlay), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* Seamless Header / Body / Footer Hierarchy (No dividing lines) */
.is-seamless .modal-header {
  border-bottom: none;
  padding: 28px 28px 12px 28px;
}

.is-seamless .modal-body {
  padding: 0 28px 20px 28px;
}

.is-seamless .modal-footer {
  border-top: none;
  padding: 8px 28px 28px 28px;
}

.is-seamless .modal-close-btn {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-2, #6e6e73);
}

.is-seamless .modal-close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: var(--text, #1d1d1f);
}

:root.dark .is-seamless .modal-close-btn,
html[data-theme="dark"] .is-seamless .modal-close-btn {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-2, #98989d);
}

:root.dark .is-seamless .modal-close-btn:hover,
html[data-theme="dark"] .is-seamless .modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  color: var(--text, #f5f5f7);
}

/* ═══════════════════════════════════════════════════════════════════
   Clean / Plain / No-Dividers Variant (Solid Surface, Zero Dividers)
   ═══════════════════════════════════════════════════════════════════ */
.variant-clean,
.variant-plain,
.variant-no-divider,
.variant-nodivider,
.variant-solid-seamless,
.is-clean {
  background: var(--surface, #ffffff);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  box-shadow: var(--sh-overlay);
}

:root.dark .variant-clean,
:root.dark .variant-plain,
:root.dark .variant-no-divider,
:root.dark .variant-nodivider,
:root.dark .variant-solid-seamless,
:root.dark .is-clean,
html[data-theme="dark"] .variant-clean,
html[data-theme="dark"] .variant-plain,
html[data-theme="dark"] .variant-no-divider,
html[data-theme="dark"] .variant-nodivider,
html[data-theme="dark"] .variant-solid-seamless,
html[data-theme="dark"] .is-clean {
  background: var(--surface, #1c1c1e);
  border-color: var(--hairline, rgba(255, 255, 255, 0.12));
}

/* No Dividers Structure (Clean Solid Hierarchy) */
.is-clean .modal-header,
.no-dividers:not(.is-seamless) .modal-header {
  border-bottom: none;
  padding: 24px 24px 8px 24px;
}

.is-clean .modal-body,
.no-dividers:not(.is-seamless) .modal-body {
  padding: 8px 24px 16px 24px;
}

.is-clean .modal-footer,
.no-dividers:not(.is-seamless) .modal-footer {
  border-top: none;
  padding: 8px 24px 24px 24px;
}

.is-clean .modal-close-btn {
  background: var(--hover, #fbfbfd);
  color: var(--text-2, #6e6e73);
}

.is-clean .modal-close-btn:hover {
  background: var(--track, #e8e8ed);
  color: var(--text, #1d1d1f);
}

:root.dark .is-clean .modal-close-btn,
html[data-theme="dark"] .is-clean .modal-close-btn {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-2, #98989d);
}

:root.dark .is-clean .modal-close-btn:hover,
html[data-theme="dark"] .is-clean .modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  color: var(--text, #f5f5f7);
}

/* ═══════════════════════════════════════════════════════════════════
   Alert Variant (Centered Confirmation Style)
   ═══════════════════════════════════════════════════════════════════ */
.variant-alert {
  max-width: 340px;
  text-align: center;
  border-radius: 20px;
}
.variant-alert .modal-header {
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-bottom: none;
  padding: 20px 20px 0;
}
.variant-alert .modal-close-btn { display: none; }
.variant-alert .modal-body { padding: 12px 20px 20px; }
.variant-alert .modal-footer {
  border-top: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  padding: 0;
  display: flex;
  align-items: stretch;
  background: transparent;
}
.variant-alert .modal-footer :deep(button),
.variant-alert .modal-footer :deep(.id-btn) {
  flex: 1 1 0% !important;
  width: auto !important;
  height: 48px !important;
  min-height: 48px !important;
  max-height: 48px !important;
  padding: 0 12px !important;
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
  color: var(--accent, #0071e3) !important;
  font-size: 14.5px !important;
  font-weight: 650 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: background 0.15s ease, opacity 0.15s ease !important;
  margin: 0 !important;
}
.variant-alert .modal-footer :deep(button:hover),
.variant-alert .modal-footer :deep(.id-btn:hover) {
  background: var(--hover, #fbfbfd) !important;
}
.variant-alert .modal-footer :deep(button:active),
.variant-alert .modal-footer :deep(.id-btn:active) {
  background: var(--track, #e8e8ed) !important;
  transform: none !important;
}
.variant-alert .modal-footer :deep(button:first-child),
.variant-alert .modal-footer :deep(.id-btn:first-child) {
  border-bottom-left-radius: 20px !important;
}
.variant-alert .modal-footer :deep(button:last-child),
.variant-alert .modal-footer :deep(.id-btn:last-child) {
  border-bottom-right-radius: 20px !important;
}
.variant-alert .modal-footer :deep(button.btn-danger),
.variant-alert .modal-footer :deep(.id-btn.btn-danger),
.variant-alert .modal-footer :deep(.id-btn.color-red) {
  color: var(--danger, #ff3b30) !important;
}
.variant-alert .modal-footer :deep(button.btn-secondary),
.variant-alert .modal-footer :deep(.id-btn.btn-secondary),
.variant-alert .modal-footer :deep(button.btn-ghost),
.variant-alert .modal-footer :deep(.id-btn.btn-ghost) {
  color: var(--text-2, #6e6e73) !important;
  font-weight: 500 !important;
}
.variant-alert .modal-footer :deep(button + button),
.variant-alert .modal-footer :deep(.id-btn + .id-btn),
.variant-alert .modal-footer :deep(button + .id-btn),
.variant-alert .modal-footer :deep(.id-btn + button) {
  border-left: 1px solid var(--hairline, rgba(0, 0, 0, 0.07)) !important;
}

/* Dark Mode Alert Footer */
:root.dark .variant-alert .modal-footer,
html[data-theme="dark"] .variant-alert .modal-footer {
  border-top-color: var(--hairline, rgba(255, 255, 255, 0.12));
}
:root.dark .variant-alert .modal-footer :deep(button),
:root.dark .variant-alert .modal-footer :deep(.id-btn),
html[data-theme="dark"] .variant-alert .modal-footer :deep(button),
html[data-theme="dark"] .variant-alert .modal-footer :deep(.id-btn) {
  color: var(--accent, #0a84ff) !important;
}
:root.dark .variant-alert .modal-footer :deep(button:hover),
:root.dark .variant-alert .modal-footer :deep(.id-btn:hover),
html[data-theme="dark"] .variant-alert .modal-footer :deep(button:hover),
html[data-theme="dark"] .variant-alert .modal-footer :deep(.id-btn:hover) {
  background: rgba(255, 255, 255, 0.08) !important;
}
:root.dark .variant-alert .modal-footer :deep(button:active),
:root.dark .variant-alert .modal-footer :deep(.id-btn:active),
html[data-theme="dark"] .variant-alert .modal-footer :deep(button:active),
html[data-theme="dark"] .variant-alert .modal-footer :deep(.id-btn:active) {
  background: rgba(255, 255, 255, 0.14) !important;
}
:root.dark .variant-alert .modal-footer :deep(button.btn-secondary),
:root.dark .variant-alert .modal-footer :deep(.id-btn.btn-secondary),
:root.dark .variant-alert .modal-footer :deep(button.btn-ghost),
:root.dark .variant-alert .modal-footer :deep(.id-btn.btn-ghost),
html[data-theme="dark"] .variant-alert .modal-footer :deep(button.btn-secondary),
html[data-theme="dark"] .variant-alert .modal-footer :deep(.id-btn.btn-secondary),
html[data-theme="dark"] .variant-alert .modal-footer :deep(button.btn-ghost),
html[data-theme="dark"] .variant-alert .modal-footer :deep(.id-btn.btn-ghost) {
  color: var(--text-2, #98989d) !important;
}
:root.dark .variant-alert .modal-footer :deep(button.btn-danger),
:root.dark .variant-alert .modal-footer :deep(.id-btn.btn-danger),
:root.dark .variant-alert .modal-footer :deep(.id-btn.color-red),
html[data-theme="dark"] .variant-alert .modal-footer :deep(button.btn-danger),
html[data-theme="dark"] .variant-alert .modal-footer :deep(.id-btn.btn-danger),
html[data-theme="dark"] .variant-alert .modal-footer :deep(.id-btn.color-red) {
  color: var(--danger, #ff453a) !important;
}
:root.dark .variant-alert .modal-footer :deep(button + button),
:root.dark .variant-alert .modal-footer :deep(.id-btn + .id-btn),
:root.dark .variant-alert .modal-footer :deep(button + .id-btn),
:root.dark .variant-alert .modal-footer :deep(.id-btn + button),
html[data-theme="dark"] .variant-alert .modal-footer :deep(button + button),
html[data-theme="dark"] .variant-alert .modal-footer :deep(.id-btn + .id-btn),
html[data-theme="dark"] .variant-alert .modal-footer :deep(button + .id-btn),
html[data-theme="dark"] .variant-alert .modal-footer :deep(.id-btn + button) {
  border-left-color: var(--hairline, rgba(255, 255, 255, 0.12)) !important;
}

/* ═══════════════════════════════════════════════════════════════════
   Default Header, Body, Footer Structure
   ═══════════════════════════════════════════════════════════════════ */
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  flex-shrink: 0;
}

.modal-header-titles {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.modal-title {
  font-size: 18px;
  font-weight: 650;
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text, #1d1d1f);
  margin: 0;
  line-height: var(--leading-snug, 1.25);
}

.modal-description,
.modal-subtitle {
  font-size: 13.5px;
  color: var(--text-2, #6e6e73);
  line-height: var(--leading-normal, 1.5);
  margin: 4px 0 0 0;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: var(--r-pill, 999px);
  border: none;
  background: var(--hover, #fbfbfd);
  color: var(--text-2, #6e6e73);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  outline: none;
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
  user-select: none;
  margin-top: -2px;
  margin-right: -2px;
}

.modal-close-btn:hover {
  background: var(--track, #e8e8ed);
  color: var(--text, #1d1d1f);
}

.modal-close-btn:active {
  transform: scale(0.94);
}

.modal-close-btn:focus-visible {
  box-shadow: var(--focus-ring, 0 0 0 3px rgba(0, 113, 227, 0.35));
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  flex: 1;
}

.modal-body-text {
  font-size: 14.5px;
  color: var(--text-body, #424245);
  line-height: var(--leading-relaxed, 1.85);
  margin: 0;
}

:root.dark .modal-body-text,
html[data-theme="dark"] .modal-body-text {
  color: var(--text-body, #d1d1d6);
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════════════════════════════
   Fluid Motion Materialization (Apple Spring & Ease)
   ═══════════════════════════════════════════════════════════════════ */
.modal-fade-enter-active {
  transition: opacity 0.25s var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
}
.modal-fade-leave-active {
  transition: opacity 0.2s var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-surface {
  animation: modal-materialize 0.35s var(--ease-spring, cubic-bezier(0.32, 0.72, 0, 1));
}

.modal-fade-leave-active .modal-surface {
  animation: modal-dematerialize 0.2s var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
}

@keyframes modal-materialize {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modal-dematerialize {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.96) translateY(6px);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   Accessibility & Responsive Media Queries
   ═══════════════════════════════════════════════════════════════════ */
@media (max-width: 640px) {
  .modal-backdrop {
    padding: 12px;
    align-items: flex-end;
  }
  .modal-surface {
    max-height: 85vh;
    border-radius: var(--r-panel, 22px);
  }
  .modal-header {
    padding: 18px 20px;
  }
  .is-seamless .modal-header {
    padding: 22px 20px 10px 20px;
  }
  .modal-body {
    padding: 20px;
  }
  .is-seamless .modal-body {
    padding: 0 20px 16px 20px;
  }
  .modal-footer {
    padding: 14px 20px;
  }
  .is-seamless .modal-footer {
    padding: 6px 20px 22px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-backdrop,
  .modal-surface,
  .modal-fade-enter-active,
  .modal-fade-leave-active,
  .modal-fade-enter-active .modal-surface,
  .modal-fade-leave-active .modal-surface {
    animation: none !important;
    transition: opacity 150ms ease !important;
    transform: none !important;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .variant-glass,
  .variant-seamless,
  .is-seamless {
    background: var(--surface, #ffffff) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
  :root.dark .variant-glass,
  :root.dark .variant-seamless,
  :root.dark .is-seamless,
  html[data-theme="dark"] .variant-glass,
  html[data-theme="dark"] .variant-seamless,
  html[data-theme="dark"] .is-seamless {
    background: var(--surface, #1c1c1e) !important;
  }
  .modal-backdrop {
    background: rgba(0, 0, 0, 0.72) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}

@media (prefers-contrast: more) {
  .modal-surface {
    border: 2px solid var(--text, #000000) !important;
  }
  :root.dark .modal-surface,
  html[data-theme="dark"] .modal-surface {
    border: 2px solid #ffffff !important;
  }
}
</style>
