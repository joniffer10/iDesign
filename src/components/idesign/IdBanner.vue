<template>
  <Transition name="banner-slide">
    <div
      v-if="isVisible"
      :class="['id-banner', `variant-${currentVariant}`, `align-${align}`, `size-${currentSize}`, `radius-${currentRadius}`, { 'is-sticky': sticky }, config.mergedUi.value.base]"
      role="banner"
    >
      <div :class="['banner-inner', config.mergedUi.value.inner]">
        <!-- Icon / Leading Slot -->
        <div v-if="$slots.icon || icon" class="banner-icon">
          <slot name="icon">
            <span>{{ icon }}</span>
          </slot>
        </div>

        <!-- Banner Content -->
        <div :class="['banner-message', config.mergedUi.value.message]">
          <slot>{{ message }}</slot>
        </div>

        <!-- Action Button Slot -->
        <div v-if="$slots.action || actionLabel" :class="['banner-action', config.mergedUi.value.action]">
          <slot name="action">
            <button type="button" class="banner-action-btn" @click="$emit('action')">
              {{ actionLabel }}
            </button>
          </slot>
        </div>

        <!-- Dismiss Close Button -->
        <button
          v-if="dismissible"
          type="button"
          :class="['banner-close-btn', config.mergedUi.value.closeButton]"
          aria-label="Dismiss banner"
          @click="dismiss"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  message: String,
  icon: String,
  actionLabel: String,
  dismissible: {
    type: Boolean,
    default: true
  },
  sticky: {
    type: Boolean,
    default: false
  },
  align: {
    type: String,
    default: 'center'
  },
  variant: {
    type: String,
    default: undefined
  },
  size: {
    type: String,
    default: undefined
  },
  radius: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'dismiss', 'action'])

const config = useIdesignConfig('Banner', props)
const currentVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'accent'
  return resolveVariant(raw, null, {
    'primary': 'solid',
    'default': 'solid'
  })
})
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'none')

const isVisible = ref(props.modelValue)

const dismiss = () => {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('dismiss')
}
</script>

<style scoped>
.id-banner {
  width: 100%;
  padding: 10px 16px;
  font-family: var(--font);
  font-size: 13px;
  box-sizing: border-box;
  z-index: 50;
  transition: all 0.25s ease;
}

.id-banner.is-sticky {
  position: sticky;
  top: 0;
}

.banner-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
}

.align-center .banner-inner {
  justify-content: center;
}

.align-between .banner-inner {
  justify-content: space-between;
}

.align-left .banner-inner {
  justify-content: flex-start;
}

/* Variant Accent & Solid */
.variant-accent,
.variant-solid {
  background: var(--variant-solid-bg);
  color: var(--variant-solid-color);
}
.variant-accent .banner-action-btn,
.variant-solid .banner-action-btn {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

/* Variant Subtle */
.variant-subtle {
  background: var(--variant-subtle-bg);
  color: var(--variant-subtle-color);
  border-bottom: var(--variant-subtle-border);
}

/* Variant Outline */
.variant-outline {
  background: transparent;
  color: var(--text);
  border-bottom: var(--variant-outline-border);
}

/* Variant Glass */
.variant-glass {
  background: var(--variant-glass-bg);
  backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop);
  border-bottom: var(--variant-glass-border);
  color: var(--text);
}

/* Variant Glass */
.variant-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--hairline);
  color: var(--text);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.85);
  color: #ffffff;
}

/* Variant Rainbow Glow */
.variant-rainbow-glow {
  background: linear-gradient(135deg, #0071e3 0%, #5e5ce6 50%, #af52de 100%);
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 113, 227, 0.25);
}

/* Variant Warning */
.variant-warning {
  background: #ff9f0a;
  color: #000000;
}

/* Variant Success */
.variant-success {
  background: #30d158;
  color: #000000;
}

.banner-icon {
  display: flex;
  align-items: center;
  font-size: 15px;
  flex-shrink: 0;
}

.banner-message {
  font-weight: 550;
  line-height: 1.4;
}

.banner-action-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: currentColor;
  padding: 3px 10px;
  border-radius: var(--r-pill);
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.variant-glass .banner-action-btn {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

.banner-action-btn:hover {
  transform: scale(1.04);
}

.banner-close-btn {
  background: transparent;
  border: none;
  color: currentColor;
  opacity: 0.7;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: opacity 0.15s;
  flex-shrink: 0;
}

.banner-close-btn:hover {
  opacity: 1;
}

.banner-slide-enter-active,
.banner-slide-leave-active {
  transition: transform 0.25s var(--ease-out-quart), opacity 0.25s ease;
}

.banner-slide-enter-from,
.banner-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
