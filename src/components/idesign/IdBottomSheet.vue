<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition :name="transitionName">
      <div
        v-if="modelValue || variant === 'persistent'"
        :class="[
          'id-sheet-backdrop',
          'sheet-backdrop',
          backdropClass,
          `pos-backdrop-${currentPosition}`,
          `variant-${currentVariant}`,
          `backdrop-${backdropMode}`,
          {
            'has-backdrop-bg': backdropMode !== 'none' && variant !== 'persistent',
            'no-backdrop-bg': backdropMode === 'none' || variant === 'persistent',
            'is-persistent': variant === 'persistent',
            'is-collapsed': variant === 'persistent' && !modelValue,
            'is-open': modelValue
          },
          config.mergedUi.value.base,
          config.mergedUi.value.backdrop
        ]"
        @click.self="handleBackdropClick"
      >
        <div
          ref="surfaceRef"
          :class="[
            'id-sheet-surface',
            'sheet-surface',
            `size-${currentSize}`,
            `variant-${currentVariant}`,
            `pos-${currentPosition}`,
            currentRadius ? `radius-${currentRadius}` : '',
            currentColor ? `color-${currentColor}` : '',
            {
              'is-persistent': variant === 'persistent',
              'is-collapsed': variant === 'persistent' && !modelValue,
              'is-inset': variant === 'inset',
              'is-disabled': disabled,
              'is-loading': loading
            },
            config.mergedUi.value.surface
          ]"
          :style="surfaceStyles"
          role="dialog"
          :aria-modal="variant !== 'persistent' ? 'true' : (modelValue ? 'true' : 'false')"
          :aria-label="title || 'Sheet'"
          tabindex="-1"
          @click="handleSurfaceClick"
        >
          <!-- Grabber Handle (Subtle pill, centered, above header) -->
          <div
            v-if="shouldShowGrabber"
            :class="['sheet-grabber', config.mergedUi.value.grabber || config.mergedUi.value.handle]"
            aria-hidden="true"
            @click="handleGrabberClick"
          />

          <!-- Header Hierarchy -->
          <div
            v-if="hasHeaderContent"
            :class="['sheet-header', config.mergedUi.value.header]"
          >
            <slot name="header">
              <div :class="['sheet-header-inner', config.mergedUi.value.headerInner || config.mergedUi.value.headerGrid]">
                <!-- Leading Action Slot / Close Icon -->
                <div
                  v-if="hasLeadingContent"
                  :class="['header-action-leading', config.mergedUi.value.leading]"
                >
                  <slot name="leading">
                    <slot name="close">
                      <IdButton
                        v-if="dismissible && variant !== 'persistent'"
                        variant="ghost"
                        size="md"
                        radius="full"
                        :ui="{ base: ['sheet-close-btn', config.mergedUi.value.close || config.mergedUi.value.closeButton].filter(Boolean).join(' ') }"
                        aria-label="Close sheet"
                        @click.stop="closeSheet"
                      >
                        <X :size="17" />
                      </IdButton>
                    </slot>
                  </slot>
                </div>

                <!-- Genuinely Centered Title & Description -->
                <div :class="['sheet-header-titles', { 'has-side-actions': hasLeadingContent || hasTrailingContent }]">
                  <slot name="title">
                    <h3 v-if="title" :class="['sheet-title', config.mergedUi.value.title]">{{ title }}</h3>
                  </slot>
                  <slot name="description">
                    <slot name="desc">
                      <p v-if="description" :class="['sheet-desc', config.mergedUi.value.description || config.mergedUi.value.desc]">{{ description }}</p>
                    </slot>
                  </slot>
                </div>

                <!-- Trailing Action Slot -->
                <div
                  v-if="hasTrailingContent"
                  :class="['header-action-trailing', config.mergedUi.value.trailing]"
                >
                  <slot name="trailing" />
                </div>
              </div>
            </slot>
          </div>

          <!-- Body (Independently Scrollable Container) -->
          <div :class="['sheet-body', config.mergedUi.value.body]">
            <slot>{{ body }}</slot>
          </div>

          <!-- Footer (Pinned Actions) -->
          <div v-if="$slots.footer" :class="['sheet-footer', config.mergedUi.value.footer]">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount, useSlots } from 'vue'
import { X } from '@lucide/vue'
import IdButton from './IdButton.vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: String,
  description: String,
  body: String,
  teleport: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: undefined
  },
  variant: {
    type: String,
    default: undefined
  },
  position: {
    type: String,
    default: 'bottom'
  },
  showGrabber: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  backdrop: {
    type: [Boolean, String],
    default: true
  },
  showBackdrop: {
    type: Boolean,
    default: undefined
  },
  height: String,
  maxHeight: {
    type: String,
    default: '85vh'
  },
  peekHeight: {
    type: [String, Number],
    default: '72px'
  },
  collapsedHeight: {
    type: [String, Number],
    default: undefined
  },
  dismissible: {
    type: Boolean,
    default: true
  },
  radius: {
    type: String,
    default: undefined
  },
  color: {
    type: String,
    default: undefined
  },
  direction: {
    type: String,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'open'])

const slots = useSlots()
const config = useIdesignConfig('BottomSheet', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw, null, {
    'no-dividers': 'seamless',
    'no-divider': 'seamless'
  })
})
const currentPosition = computed(() => props.position || 'bottom')
const currentRadius = computed(() => config.resolvedRadius.value || props.radius)
const currentColor = computed(() => config.resolvedColor.value || props.color)

const surfaceRef = ref(null)

const backdropMode = computed(() => {
  if (props.backdrop === false || props.showBackdrop === false || props.backdrop === 'none' || props.backdrop === 'transparent') {
    return 'none'
  }
  if (typeof props.backdrop === 'string' && ['dim', 'glass', 'blur'].includes(props.backdrop)) {
    return props.backdrop
  }
  return 'blur'
})

// Grabber visibility rule: default true for bottom, top, inset, center, or when explicitly requested
const shouldShowGrabber = computed(() => {
  if (props.showGrabber === false) return false
  const pos = currentPosition.value
  return props.showGrabber && (pos.startsWith('bottom') || pos.startsWith('top') || pos === 'center' || props.variant === 'inset' || props.variant === 'persistent')
})

const hasLeadingContent = computed(() => {
  return Boolean(slots.leading || slots.close || (props.dismissible && props.variant !== 'persistent'))
})

const hasTrailingContent = computed(() => {
  return Boolean(slots.trailing)
})

const hasHeaderContent = computed(() => {
  return Boolean(
    props.title ||
    props.description ||
    slots.header ||
    slots.title ||
    slots.description ||
    slots.desc ||
    hasLeadingContent.value ||
    hasTrailingContent.value
  )
})

const backdropClass = computed(() => {
  return `pos-backdrop-${currentPosition.value}`
})

const surfaceStyles = computed(() => {
  const styles = {}
  if (props.height) {
    styles.height = props.height
  }
  if (props.maxHeight && props.variant !== 'persistent') {
    styles.maxHeight = props.maxHeight
  }
  const peek = props.peekHeight || props.collapsedHeight || '72px'
  styles['--sheet-peek-height'] = typeof peek === 'number' ? `${peek}px` : peek
  return styles
})

const transitionName = computed(() => {
  if (props.variant === 'persistent') return 'none'
  const pos = currentPosition.value
  if (pos.startsWith('bottom')) return 'sheet-slide-bottom'
  if (pos.startsWith('top')) return 'sheet-slide-top'
  if (pos === 'left') return 'sheet-slide-left'
  if (pos === 'right') return 'sheet-slide-right'
  return 'sheet-slide-center'
})

const closeSheet = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop && props.variant !== 'persistent') {
    closeSheet()
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.modelValue && props.closeOnEsc && props.variant !== 'persistent') {
    closeSheet()
  }
}

const handleSurfaceClick = () => {
  if (props.variant === 'persistent' && !props.modelValue) {
    emit('update:modelValue', true)
    emit('open')
  }
}

const handleGrabberClick = (e) => {
  if (props.variant === 'persistent') {
    e.stopPropagation()
    const nextState = !props.modelValue
    emit('update:modelValue', nextState)
    if (nextState) emit('open')
    else emit('close')
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (typeof window === 'undefined') return
  if (isOpen) {
    if (props.variant !== 'persistent') {
      window.addEventListener('keydown', handleKeydown)
      if (props.teleport) {
        document.body.style.overflow = 'hidden'
      }
    }
    setTimeout(() => {
      surfaceRef.value?.focus()
    }, 50)
  } else {
    window.removeEventListener('keydown', handleKeydown)
    if (props.variant !== 'persistent' && props.teleport) {
      document.body.style.overflow = ''
    }
  }
}, { immediate: true })

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
  if (typeof document !== 'undefined' && props.teleport) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* ═══════════════════════════════════════════
   1. Backdrop & Container
   ═══════════════════════════════════════════ */
.id-sheet-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--overlay-bg, rgba(0, 0, 0, 0.42));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  transition: opacity 0.3s var(--ease-spring, cubic-bezier(0.32, 0.72, 0, 1)),
              background-color 0.25s ease;
}

/* Backdrop Background Styles */
.id-sheet-backdrop.no-backdrop-bg,
.id-sheet-backdrop.backdrop-none,
.id-sheet-backdrop.backdrop-transparent {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.id-sheet-backdrop.backdrop-dim {
  background: var(--overlay-bg, rgba(0, 0, 0, 0.42)) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.id-sheet-backdrop.backdrop-glass {
  background: rgba(0, 0, 0, 0.28) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
  -webkit-backdrop-filter: saturate(180%) blur(20px) !important;
}

/* Persistent variant disables modal overlay */
.id-sheet-backdrop.is-persistent {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  pointer-events: none;
}

/* ═══════════════════════════════════════════
   2. Sheet Surface Foundation
   ═══════════════════════════════════════════ */
.id-sheet-surface {
  background: var(--surface, #ffffff);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  box-shadow: var(--sh-overlay, 0 2px 8px rgba(0, 0, 0, 0.10), 0 30px 80px rgba(0, 0, 0, 0.24));
  color: var(--text, #1d1d1f);
  font-family: var(--font, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif);
  display: flex;
  flex-direction: column;
  outline: none;
  box-sizing: border-box;
  transition: transform 0.36s var(--ease-spring, cubic-bezier(0.32, 0.72, 0, 1)),
              opacity 0.25s ease,
              box-shadow 0.25s ease;
  pointer-events: auto;
  position: relative;
}

:root.dark .id-sheet-surface,
html[data-theme="dark"] .id-sheet-surface {
  background: var(--surface, #1c1c1e);
  border-color: var(--hairline, rgba(255, 255, 255, 0.12));
}

/* ═══════════════════════════════════════════
   3. Positional Alignments & Radii
   ═══════════════════════════════════════════ */

/* Vertical / Centered sheet sizes */
.pos-bottom, .pos-bottom-start, .pos-bottom-end,
.pos-top, .pos-top-start, .pos-top-end,
.pos-center {
  width: 100%;
}

/* Bottom Sheet Positions (Edge Anchored) */
.pos-bottom,
.pos-bottom-start,
.pos-bottom-end {
  border-top-left-radius: var(--r-hero, 26px);
  border-top-right-radius: var(--r-hero, 26px);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: none;
  padding: 10px 20px max(24px, env(safe-area-inset-bottom));
}

/* Top Sheet Positions */
.pos-top,
.pos-top-start,
.pos-top-end {
  border-bottom-left-radius: var(--r-hero, 26px);
  border-bottom-right-radius: var(--r-hero, 26px);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: none;
  padding: max(16px, env(safe-area-inset-top)) 20px 24px 20px;
}

/* Side Drawer Positions */
.pos-left,
.pos-right {
  height: 100vh;
  max-height: 100vh;
  padding: max(16px, env(safe-area-inset-top)) 20px max(24px, env(safe-area-inset-bottom)) 20px;
}
.pos-left {
  border-top-right-radius: var(--r-hero, 26px);
  border-bottom-right-radius: var(--r-hero, 26px);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}
.pos-right {
  border-top-left-radius: var(--r-hero, 26px);
  border-bottom-left-radius: var(--r-hero, 26px);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}

/* Center Floating Panel */
.pos-center {
  border-radius: var(--r-panel, 22px);
  padding: 24px;
  align-self: center;
  margin: auto;
}

/* Backdrop Alignments */
.pos-backdrop-bottom { align-items: flex-end; justify-content: center; }
.pos-backdrop-bottom-start { align-items: flex-end; justify-content: flex-start; padding-left: 24px; }
.pos-backdrop-bottom-end { align-items: flex-end; justify-content: flex-end; padding-right: 24px; }
.pos-backdrop-top { align-items: flex-start; justify-content: center; }
.pos-backdrop-top-start { align-items: flex-start; justify-content: flex-start; padding-left: 24px; }
.pos-backdrop-top-end { align-items: flex-start; justify-content: flex-end; padding-right: 24px; }
.pos-backdrop-left { align-items: center; justify-content: flex-start; }
.pos-backdrop-right { align-items: center; justify-content: flex-end; }
.pos-backdrop-center { align-items: center; justify-content: center; padding: 24px; }

/* ═══════════════════════════════════════════
   4. Size Tiers Scale
   ═══════════════════════════════════════════ */
.size-xs { max-width: 340px; }
.size-sm { max-width: 440px; }
.size-md { max-width: 580px; }
.size-lg { max-width: 760px; }
.size-xl { max-width: 960px; }
.size-full { max-width: 100% !important; }

/* Side Drawers Width scale */
.pos-left.size-xs, .pos-right.size-xs { width: 300px; max-width: 90vw; }
.pos-left.size-sm, .pos-right.size-sm { width: 380px; max-width: 90vw; }
.pos-left.size-md, .pos-right.size-md { width: 480px; max-width: 90vw; }
.pos-left.size-lg, .pos-right.size-lg { width: 640px; max-width: 90vw; }
.pos-left.size-xl, .pos-right.size-xl { width: 840px; max-width: 90vw; }

/* ═══════════════════════════════════════════
   5. Variant: Inset (Floating Sheet)
   ═══════════════════════════════════════════ */
.id-sheet-surface.is-inset {
  border-radius: var(--r-panel, 22px) !important;
  margin: 16px;
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  box-shadow: var(--sh-overlay);
}
.id-sheet-surface.is-inset.pos-left,
.id-sheet-surface.is-inset.pos-right {
  height: calc(100vh - 32px) !important;
}

/* Glass Variant Surface */
.id-sheet-surface.variant-glass {
  background: var(--variant-glass-bg);
  backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop);
  border-color: var(--variant-glass-border);
}

/* Solid Variant Surface */
.id-sheet-surface.variant-solid {
  background: var(--variant-solid-bg);
  color: var(--variant-solid-color);
  border: none;
}
.id-sheet-surface.variant-solid .sheet-title { color: #ffffff; }
.id-sheet-surface.variant-solid .sheet-desc { color: rgba(255, 255, 255, 0.8); }

/* Seamless Variant Surface */
.id-sheet-surface.variant-seamless .sheet-header {
  border-bottom: none;
}
.id-sheet-surface.variant-seamless .sheet-footer {
  border-top: none;
}

/* ═══════════════════════════════════════════
   6. Variant: Persistent (Collapsible Drawer)
   ═══════════════════════════════════════════ */
.id-sheet-surface.is-persistent.is-collapsed {
  cursor: pointer;
}
.id-sheet-surface.is-persistent.is-collapsed.pos-bottom,
.id-sheet-surface.is-persistent.is-collapsed.pos-bottom-start,
.id-sheet-surface.is-persistent.is-collapsed.pos-bottom-end {
  transform: translateY(calc(100% - var(--sheet-peek-height, 72px))) !important;
}
.id-sheet-surface.is-persistent.is-collapsed.pos-top,
.id-sheet-surface.is-persistent.is-collapsed.pos-top-start,
.id-sheet-surface.is-persistent.is-collapsed.pos-top-end {
  transform: translateY(calc(-100% + var(--sheet-peek-height, 72px))) !important;
}
.id-sheet-surface.is-persistent.is-collapsed.pos-left {
  transform: translateX(calc(-100% + var(--sheet-peek-height, 72px))) !important;
}
.id-sheet-surface.is-persistent.is-collapsed.pos-right {
  transform: translateX(calc(100% - var(--sheet-peek-height, 72px))) !important;
}

/* In persistent collapsed state, header/title remains cleanly visible while body/footer stay tucked */
.id-sheet-surface.is-persistent.is-collapsed .sheet-header {
  margin-bottom: 0;
}
.id-sheet-surface.is-persistent.is-collapsed .sheet-body,
.id-sheet-surface.is-persistent.is-collapsed .sheet-footer {
  opacity: 0;
  pointer-events: none;
  max-height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.id-sheet-surface.is-persistent .sheet-body,
.id-sheet-surface.is-persistent .sheet-footer {
  transition: opacity 0.25s ease, max-height 0.3s ease;
}

/* ═══════════════════════════════════════════
   7. Variant: Glass (Liquid Glass)
   ═══════════════════════════════════════════ */
.variant-glass,
.id-sheet-surface.variant-glass {
  background: rgba(255, 255, 255, 0.78) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
  -webkit-backdrop-filter: saturate(180%) blur(20px) !important;
}
:root.dark .variant-glass,
:root.dark .id-sheet-surface.variant-glass,
html[data-theme="dark"] .id-sheet-surface.variant-glass {
  background: rgba(28, 28, 30, 0.82) !important;
}

/* ═══════════════════════════════════════════
   8. Grabber Handle
   ═══════════════════════════════════════════ */
.sheet-grabber {
  width: 36px;
  height: 5px;
  border-radius: var(--r-pill, 999px);
  background: var(--text-3, #86868b);
  opacity: 0.35;
  margin: 2px auto 14px auto;
  flex-shrink: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.id-sheet-surface.is-persistent.is-collapsed:hover .sheet-grabber,
.sheet-grabber:hover {
  opacity: 0.65;
  transform: scaleY(1.15);
}

/* ═══════════════════════════════════════════
   9. Header Architecture & Centered Title
   ═══════════════════════════════════════════ */
.sheet-header {
  margin-bottom: 14px;
  width: 100%;
  position: relative;
}

.sheet-header-inner {
  position: relative;
  width: 100%;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Leading (Close) Action */
.header-action-leading {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  display: flex;
  align-items: center;
}

/* Trailing Action */
.header-action-trailing {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  display: flex;
  align-items: center;
}

/* Centered Title & Description Container */
.sheet-header-titles {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sheet-header-titles.has-side-actions {
  padding: 0 52px; /* Generous clearance for 44px buttons */
}

/* Close button - 44px touch target */
.sheet-close-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-2, #6e6e73);
}
.sheet-close-btn:hover {
  color: var(--text, #1d1d1f);
}

.sheet-title {
  font-size: var(--text-lg, 17px);
  font-weight: var(--font-semibold, 600);
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text, #1d1d1f);
  margin: 0;
  line-height: var(--leading-snug, 1.25);
}

.sheet-desc {
  font-size: var(--text-sm, 13px);
  color: var(--text-2, #6e6e73);
  margin: 4px 0 0 0;
  line-height: var(--leading-normal, 1.45);
}

/* ═══════════════════════════════════════════
   10. Body & Footer
   ═══════════════════════════════════════════ */
.sheet-body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin: 4px 0;
}

.sheet-footer {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
}

/* ═══════════════════════════════════════════
   11. Transitions & Motion Physics
   ═══════════════════════════════════════════ */
.sheet-slide-bottom-enter-active, .sheet-slide-bottom-leave-active,
.sheet-slide-top-enter-active, .sheet-slide-top-leave-active,
.sheet-slide-left-enter-active, .sheet-slide-left-leave-active,
.sheet-slide-right-enter-active, .sheet-slide-right-leave-active {
  transition: transform 0.36s var(--ease-spring, cubic-bezier(0.32, 0.72, 0, 1)),
              opacity 0.25s ease;
}

.sheet-slide-bottom-enter-from, .sheet-slide-bottom-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.sheet-slide-top-enter-from, .sheet-slide-top-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.sheet-slide-left-enter-from, .sheet-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.sheet-slide-right-enter-from, .sheet-slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.sheet-slide-center-enter-active, .sheet-slide-center-leave-active {
  transition: transform 0.3s var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1)),
              opacity 0.25s ease;
}
.sheet-slide-center-enter-from, .sheet-slide-center-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

/* ═══════════════════════════════════════════
   12. Responsive Mobile Optimizations
   ═══════════════════════════════════════════ */
@media (max-width: 640px) {
  .id-sheet-surface {
    max-width: 100% !important;
    width: 100% !important;
  }
  .pos-backdrop-bottom-start,
  .pos-backdrop-bottom-end,
  .pos-backdrop-top-start,
  .pos-backdrop-top-end {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .id-sheet-surface.pos-bottom,
  .id-sheet-surface.pos-bottom-start,
  .id-sheet-surface.pos-bottom-end {
    border-top-left-radius: 22px !important;
    border-top-right-radius: 22px !important;
    padding: 10px 16px max(24px, env(safe-area-inset-bottom)) 16px;
  }
  .id-sheet-surface.pos-top,
  .id-sheet-surface.pos-top-start,
  .id-sheet-surface.pos-top-end {
    border-bottom-left-radius: 22px !important;
    border-bottom-right-radius: 22px !important;
    padding: max(16px, env(safe-area-inset-top)) 16px 20px 16px;
  }
  .id-sheet-surface.pos-left,
  .id-sheet-surface.pos-right {
    height: 100vh !important;
    width: 100% !important;
  }
  .id-sheet-surface.is-inset {
    border-radius: var(--r-sheet, 16px) !important;
    margin: 10px !important;
    width: calc(100% - 20px) !important;
  }
}

/* ═══════════════════════════════════════════
   13. Reduced Motion
   ═══════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .id-sheet-backdrop,
  .id-sheet-surface,
  .sheet-grabber,
  .sheet-slide-bottom-enter-active, .sheet-slide-bottom-leave-active,
  .sheet-slide-top-enter-active, .sheet-slide-top-leave-active,
  .sheet-slide-left-enter-active, .sheet-slide-left-leave-active,
  .sheet-slide-right-enter-active, .sheet-slide-right-leave-active,
  .sheet-slide-center-enter-active, .sheet-slide-center-leave-active {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
