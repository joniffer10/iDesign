<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition :name="transitionName">
      <div
        v-if="modelValue || variant === 'persistent'"
        :class="[
          'sheet-backdrop',
          backdropClass,
          {
            'is-persistent': variant === 'persistent',
            'is-collapsed': variant === 'persistent' && !modelValue
          },
          config.mergedUi.value.backdrop
        ]"
        @click.self="closeOnBackdrop && variant !== 'persistent' && $emit('update:modelValue', false)"
      >
        <div
          ref="surfaceRef"
          :class="[
            'sheet-surface',
            `size-${currentSize}`,
            `variant-${currentVariant}`,
            `pos-${currentPosition}`,
            {
              'is-persistent': variant === 'persistent',
              'is-collapsed': variant === 'persistent' && !modelValue,
              'is-inset': variant === 'inset'
            },
            config.mergedUi.value.surface
          ]"
          :style="[
            height ? { height } : {},
            maxHeight && variant !== 'persistent' ? { maxHeight } : {}
          ]"
          role="dialog"
          aria-modal="true"
          :aria-label="title || 'Sheet'"
          tabindex="-1"
          @click="handleSurfaceClick"
        >
          <!-- Grabber Handle -->
          <div
            v-if="showGrabber"
            :class="['sheet-grabber', config.mergedUi.value.grabber || config.mergedUi.value.handle]"
          />

          <!-- Header -->
          <div
            v-if="title || description || $slots.header || $slots.title || $slots.description || $slots.desc || $slots.leading || $slots.trailing || dismissible"
            :class="['sheet-header', config.mergedUi.value.header]"
          >
            <slot name="header">
              <div class="sheet-header-grid">
                <!-- Left Action Slot / Close Icon -->
                <div :class="['header-action-left', config.mergedUi.value.leading]">
                  <slot name="leading">
                    <IdButton
                      v-if="dismissible"
                      variant="ghost"
                      size="md"
                      radius="full"
                      :ui="{ base: ['sheet-close-btn', config.mergedUi.value.close].filter(Boolean).join(' ') }"
                      aria-label="Close sheet"
                      @click.stop="$emit('update:modelValue', false)"
                    >
                      <X :size="16" />
                    </IdButton>
                  </slot>
                </div>

                <!-- Centered Title / Description -->
                <div class="sheet-header-titles">
                  <slot name="title">
                    <h3 v-if="title" :class="['sheet-title', config.mergedUi.value.title]">{{ title }}</h3>
                  </slot>
                  <slot name="description">
                    <slot name="desc">
                      <p v-if="description" :class="['sheet-desc', config.mergedUi.value.description || config.mergedUi.value.desc]">{{ description }}</p>
                    </slot>
                  </slot>
                </div>

                <!-- Right Action Slot -->
                <div :class="['header-action-right', config.mergedUi.value.trailing]">
                  <slot name="trailing" />
                </div>
              </div>
            </slot>
          </div>

          <!-- Body -->
          <div :class="['sheet-body', config.mergedUi.value.body]">
            <slot>{{ body }}</slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" :class="['sheet-footer', config.mergedUi.value.footer]">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { X } from '@lucide/vue'
import IdButton from './IdButton.vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

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
  height: String,
  maxHeight: {
    type: String,
    default: '85vh'
  },
  dismissible: {
    type: Boolean,
    default: true
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const config = useIdesignConfig('BottomSheet', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')
const currentPosition = computed(() => props.position || 'bottom')

const surfaceRef = ref(null)

const backdropClass = computed(() => {
  return `pos-backdrop-${currentPosition.value}`
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

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.modelValue && props.closeOnEsc && props.variant !== 'persistent') {
    emit('update:modelValue', false)
  }
}

const handleSurfaceClick = () => {
  if (props.variant === 'persistent' && !props.modelValue) {
    emit('update:modelValue', true)
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (typeof window === 'undefined') return
  if (isOpen) {
    if (props.variant !== 'persistent') {
      window.addEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'hidden'
    }
    setTimeout(() => {
      surfaceRef.value?.focus()
    }, 50)
  } else {
    window.removeEventListener('keydown', handleKeydown)
    if (props.variant !== 'persistent') {
      document.body.style.overflow = ''
    }
  }
}, { immediate: true })

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.sheet-backdrop {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  display: flex; transition: all 0.3s ease;
}
.sheet-backdrop.is-persistent {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  pointer-events: none;
}
.sheet-surface {
  background: var(--surface); border: 1px solid var(--hairline);
  box-shadow: var(--sh-overlay); color: var(--text); font-family: var(--font);
  display: flex; flex-direction: column; outline: none; box-sizing: border-box;
  transition: transform 0.32s var(--ease-spring), opacity 0.25s ease;
  pointer-events: auto;
}

/* Horizontal / Vertical layout defaults */
.pos-bottom, .pos-bottom-start, .pos-bottom-end,
.pos-top, .pos-top-start, .pos-top-end,
.pos-center {
  width: 100%; max-height: 85vh;
}
.pos-left, .pos-right {
  height: 100vh; max-height: 100vh;
}

/* Positional Surface Alignments */
.pos-bottom {
  border-top-left-radius: 28px; border-top-right-radius: 28px;
  border-bottom-left-radius: 0; border-bottom-right-radius: 0;
  padding: 12px 24px calc(32px + env(safe-area-inset-bottom)) 24px;
}
.pos-bottom-start {
  border-top-left-radius: 28px; border-top-right-radius: 28px;
  padding: 12px 24px calc(32px + env(safe-area-inset-bottom)) 24px;
}
.pos-bottom-end {
  border-top-left-radius: 28px; border-top-right-radius: 28px;
  padding: 12px 24px calc(32px + env(safe-area-inset-bottom)) 24px;
}
.pos-top {
  border-bottom-left-radius: 28px; border-bottom-right-radius: 28px;
  border-top-left-radius: 0; border-top-right-radius: 0;
  padding: calc(12px + env(safe-area-inset-top)) 24px 32px 24px;
}
.pos-top-start {
  border-bottom-left-radius: 28px; border-bottom-right-radius: 28px;
  padding: calc(12px + env(safe-area-inset-top)) 24px 32px 24px;
}
.pos-top-end {
  border-bottom-left-radius: 28px; border-bottom-right-radius: 28px;
  padding: calc(12px + env(safe-area-inset-top)) 24px 32px 24px;
}
.pos-left {
  border-top-right-radius: 28px; border-bottom-right-radius: 28px;
  border-top-left-radius: 0; border-bottom-left-radius: 0;
  padding: calc(12px + env(safe-area-inset-top)) 24px calc(32px + env(safe-area-inset-bottom)) 24px;
}
.pos-right {
  border-top-left-radius: 28px; border-bottom-left-radius: 28px;
  border-top-right-radius: 0; border-bottom-right-radius: 0;
  padding: calc(12px + env(safe-area-inset-top)) 24px calc(32px + env(safe-area-inset-bottom)) 24px;
}
.pos-center {
  border-radius: var(--r-sheet, 16px);
  padding: 24px;
  align-self: center;
}

/* Backdrop Alignment Classes */
.pos-backdrop-bottom { align-items: flex-end; justify-content: center; }
.pos-backdrop-bottom-start { align-items: flex-end; justify-content: flex-start; }
.pos-backdrop-bottom-end { align-items: flex-end; justify-content: flex-end; }
.pos-backdrop-top { align-items: flex-start; justify-content: center; }
.pos-backdrop-top-start { align-items: flex-start; justify-content: flex-start; }
.pos-backdrop-top-end { align-items: flex-start; justify-content: flex-end; }
.pos-backdrop-left { align-items: center; justify-content: flex-start; }
.pos-backdrop-right { align-items: center; justify-content: flex-end; }
.pos-backdrop-center { align-items: center; justify-content: center; }

/* Width/Max-width Size tiers */
.size-xs { max-width: 320px; }
.size-sm { max-width: 440px; }
.size-md { max-width: 540px; }
.size-lg { max-width: 720px; }
.size-xl { max-width: 900px; }

/* Left/Right Sheet widths overrides */
.pos-left.size-xs, .pos-right.size-xs { width: 280px; }
.pos-left.size-sm, .pos-right.size-sm { width: 360px; }
.pos-left.size-md, .pos-right.size-md { width: 440px; }
.pos-left.size-lg, .pos-right.size-lg { width: 640px; }
.pos-left.size-xl, .pos-right.size-xl { width: 800px; }

/* Variant: Inset Sizing & Margins */
.sheet-surface.is-inset {
  border-radius: var(--r-sheet, 16px) !important;
  margin: 16px;
}
.sheet-surface.is-inset.pos-left,
.sheet-surface.is-inset.pos-right {
  height: calc(100% - 32px) !important;
}

/* Variant: Persistent Collapsing Translations */
.sheet-surface.is-persistent.is-collapsed {
  cursor: pointer;
}
.sheet-surface.is-persistent.is-collapsed.pos-bottom,
.sheet-surface.is-persistent.is-collapsed.pos-bottom-start,
.sheet-surface.is-persistent.is-collapsed.pos-bottom-end {
  transform: translateY(calc(100% - 48px)) !important;
}
.sheet-surface.is-persistent.is-collapsed.pos-top,
.sheet-surface.is-persistent.is-collapsed.pos-top-start,
.sheet-surface.is-persistent.is-collapsed.pos-top-end {
  transform: translateY(calc(-100% + 48px)) !important;
}
.sheet-surface.is-persistent.is-collapsed.pos-left {
  transform: translateX(calc(-100% + 48px)) !important;
}
.sheet-surface.is-persistent.is-collapsed.pos-right {
  transform: translateX(calc(100% - 48px)) !important;
}

/* Glass Variant stops */
.variant-glass {
  background: rgba(255, 255, 255, 0.78) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
  -webkit-backdrop-filter: saturate(180%) blur(20px) !important;
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.82) !important;
}

.sheet-grabber {
  width: 36px; height: 5px; border-radius: 999px; background: var(--text-3); opacity: 0.4;
  margin: 0 auto 16px auto; flex-shrink: 0;
}
.sheet-header { margin-bottom: 16px; width: 100%; position: relative; }

.sheet-header-grid {
  width: 100%; display: flex; align-items: center; justify-content: center;
  position: relative; min-height: 44px;
}
.header-action-left {
  position: absolute; left: 0; top: 50%; transform: translateY(-50%);
  z-index: 2; display: flex; align-items: center;
}
.header-action-right {
  position: absolute; right: 0; top: 50%; transform: translateY(-50%);
  z-index: 2; display: flex; align-items: center;
}
.sheet-header-titles {
  text-align: center; width: 100%; padding: 0 48px; box-sizing: border-box;
}

.sheet-close-btn {
  width: 44px; height: 44px; min-width: 44px; padding: 0;
  display: flex; align-items: center; justify-content: center;
}

.sheet-title { font-size: 18px; font-weight: 650; letter-spacing: -0.015em; color: var(--text); margin: 0; }
.sheet-desc { font-size: 13.5px; color: var(--text-2); margin-top: 4px; line-height: 1.45; }
.sheet-body { flex: 1; overflow-y: auto; }
.sheet-footer { margin-top: 20px; display: flex; align-items: center; justify-content: flex-end; gap: 12px; }

/* Slide animations depending on anchors */
.sheet-slide-bottom-enter-active, .sheet-slide-bottom-leave-active,
.sheet-slide-top-enter-active, .sheet-slide-top-leave-active,
.sheet-slide-left-enter-active, .sheet-slide-left-leave-active,
.sheet-slide-right-enter-active, .sheet-slide-right-leave-active {
  transition: transform 0.32s var(--ease-spring), opacity 0.25s ease;
}
.sheet-slide-bottom-enter-from, .sheet-slide-bottom-leave-to { opacity: 0; transform: translateY(100%); }
.sheet-slide-top-enter-from, .sheet-slide-top-leave-to { opacity: 0; transform: translateY(-100%); }
.sheet-slide-left-enter-from, .sheet-slide-left-leave-to { opacity: 0; transform: translateX(-100%); }
.sheet-slide-right-enter-from, .sheet-slide-right-leave-to { opacity: 0; transform: translateX(100%); }

.sheet-slide-center-enter-active, .sheet-slide-center-leave-active { transition: transform 0.3s var(--ease-out-quart), opacity 0.25s ease; }
.sheet-slide-center-enter-from, .sheet-slide-center-leave-to { opacity: 0; transform: scale(0.95); }

@media (max-width: 640px) {
  .sheet-surface {
    max-width: 100% !important;
    width: 100% !important;
    border-radius: 0 !important;
    margin: 0 !important;
  }
  .sheet-surface.pos-bottom,
  .sheet-surface.pos-bottom-start,
  .sheet-surface.pos-bottom-end {
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    padding: 12px 16px calc(24px + env(safe-area-inset-bottom)) 16px;
  }
  .sheet-surface.pos-top,
  .sheet-surface.pos-top-start,
  .sheet-surface.pos-top-end {
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    padding: calc(12px + env(safe-area-inset-top)) 16px 24px 16px;
  }
  .sheet-surface.pos-left,
  .sheet-surface.pos-right {
    height: 100vh !important;
    width: 100% !important;
  }
  .sheet-surface.is-inset {
    border-radius: 16px !important;
    margin: 12px !important;
    width: calc(100% - 24px) !important;
    height: auto !important;
  }
  .sheet-surface.is-inset.pos-left,
  .sheet-surface.is-inset.pos-right {
    height: calc(100% - 24px) !important;
  }
}
</style>
