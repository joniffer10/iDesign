<template>
  <div
    :class="[
      'id-alert',
      `alert-variant-${resolvedVariant}`,
      `alert-color-${resolvedTone}`,
      `size-${currentSize}`,
      `radius-${currentRadius}`,
      {
        'has-title': !!title || !!$slots.title,
        'is-dismissible': dismissible
      },
      config.mergedUi.value.base
    ]"
    role="alert"
  >
    <!-- Icon Container -->
    <div :class="['alert-icon', config.mergedUi.value.icon]">
      <slot name="icon" :color="resolvedTone">
        <component :is="icon" v-if="icon && typeof icon !== 'string'" :size="iconSize" />
        <span v-else-if="typeof icon === 'string' && icon.length <= 4" class="icon-emoji">{{ icon }}</span>
        <template v-else>
          <Info v-if="resolvedTone === 'info' || resolvedTone === 'primary'" :size="iconSize" />
          <CheckCircle2 v-else-if="resolvedTone === 'success'" :size="iconSize" />
          <AlertTriangle v-else-if="resolvedTone === 'warning'" :size="iconSize" />
          <AlertCircle v-else-if="resolvedTone === 'error' || resolvedTone === 'danger'" :size="iconSize" />
          <Info v-else :size="iconSize" />
        </template>
      </slot>
    </div>

    <!-- Alert Body -->
    <div :class="['alert-body', config.mergedUi.value.body]">
      <slot name="title">
        <div v-if="title" :class="['alert-title', config.mergedUi.value.title]">
          {{ title }}
        </div>
      </slot>
      <div v-if="description || $slots.default" :class="['alert-message', config.mergedUi.value.message || config.mergedUi.value.description]">
        <slot>{{ description }}</slot>
      </div>

      <!-- Actions Slot / Prop -->
      <div v-if="$slots.actions || action" :class="['alert-actions', config.mergedUi.value.actions]">
        <slot name="actions">
          <button
            v-if="action"
            type="button"
            :class="['alert-action-btn', config.mergedUi.value.actionButton]"
            @click="handleActionClick"
          >
            {{ action.label || action }}
          </button>
        </slot>
      </div>
    </div>

    <!-- Close / Dismiss Button -->
    <button
      v-if="dismissible"
      type="button"
      :class="['alert-close', config.mergedUi.value.closeButton || config.mergedUi.value.close]"
      aria-label="Dismiss alert"
      @click="$emit('dismiss')"
    >
      <slot name="close">
        <X :size="closeSize" />
      </slot>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  variant: {
    type: String,
    default: undefined,
    validator: v => !v || ['subtle', 'solid', 'glass', 'outline', 'info', 'success', 'warning', 'error', 'danger', 'primary'].includes(v)
  },
  color: {
    type: String,
    default: undefined,
    validator: v => !v || ['info', 'success', 'warning', 'error', 'danger', 'primary', 'default'].includes(v)
  },
  size: {
    type: String,
    default: undefined,
    validator: v => !v || ['sm', 'md', 'lg'].includes(v)
  },
  radius: {
    type: String,
    default: undefined
  },
  title: String,
  description: String,
  icon: [String, Object, Function],
  action: [Object, String],
  dismissible: Boolean,
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['dismiss', 'action'])

const config = useIdesignConfig('Alert', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'lg')

// Determine semantic tone (info, success, warning, error)
const resolvedTone = computed(() => {
  const c = props.color || config.resolvedColor.value
  const v = props.variant || config.resolvedVariant.value

  const semanticSet = ['info', 'success', 'warning', 'error', 'danger', 'primary']
  if (c && semanticSet.includes(c)) {
    return c === 'danger' ? 'error' : c === 'primary' ? 'info' : c
  }
  if (v && semanticSet.includes(v)) {
    return v === 'danger' ? 'error' : v === 'primary' ? 'info' : v
  }
  return 'info'
})

// Determine surface presentation style
const resolvedVariant = computed(() => {
  const v = props.variant || config.resolvedVariant.value
  if (v === 'glass') return 'glass'
  if (v === 'solid') return 'solid'
  if (v === 'outline') return 'outline'
  return 'subtle'
})

const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'sm' ? 16 : sz === 'lg' ? 22 : 18
})

const closeSize = computed(() => {
  const sz = currentSize.value
  return sz === 'sm' ? 14 : sz === 'lg' ? 18 : 15
})

const handleActionClick = (e) => {
  if (props.action && typeof props.action.onClick === 'function') {
    props.action.onClick(e)
  }
  emit('action', props.action)
}
</script>

<style scoped>
.id-alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  font-family: var(--font);
  border: 1px solid var(--hairline);
  box-shadow: var(--sh-card);
  transition: all 0.2s var(--ease-out-quart);
  position: relative;
}

/* ──────────────────────────────────────────────────────────
   RADIUS SEMANTIC TIERS
   ────────────────────────────────────────────────────────── */
.radius-none { border-radius: var(--r-none) !important; }
.radius-sm { border-radius: var(--r-chip, 6px) !important; }
.radius-md { border-radius: var(--r-thumb, 12px) !important; }
.radius-lg { border-radius: var(--r-card, 18px) !important; }
.radius-full { border-radius: var(--r-pill, 999px) !important; }

/* ──────────────────────────────────────────────────────────
   SIZING SCALE
   ────────────────────────────────────────────────────────── */
.size-sm { padding: 10px 14px; gap: 10px; }
.size-md { padding: 14px 18px; gap: 12px; }
.size-lg { padding: 18px 22px; gap: 16px; }

/* ──────────────────────────────────────────────────────────
   SURFACE VARIANTS (Liquid Glass Restraint)
   ────────────────────────────────────────────────────────── */

/* 1. Subtle Variant (Calm unified surface + gentle tint) */
.alert-variant-subtle.alert-color-info {
  background: rgba(0, 113, 227, 0.05);
  border-color: rgba(0, 113, 227, 0.18);
}
.alert-variant-subtle.alert-color-info .alert-icon {
  color: var(--accent, #0071e3);
}

.alert-variant-subtle.alert-color-success {
  background: rgba(48, 209, 88, 0.06);
  border-color: rgba(48, 209, 88, 0.2);
}
.alert-variant-subtle.alert-color-success .alert-icon {
  color: var(--live, #30d158);
}

.alert-variant-subtle.alert-color-warning {
  background: rgba(255, 159, 10, 0.07);
  border-color: rgba(255, 159, 10, 0.22);
}
.alert-variant-subtle.alert-color-warning .alert-icon {
  color: var(--warning, #ff9f0a);
}

.alert-variant-subtle.alert-color-error {
  background: rgba(255, 59, 48, 0.06);
  border-color: rgba(255, 59, 48, 0.2);
}
.alert-variant-subtle.alert-color-error .alert-icon {
  color: var(--danger, #ff3b30);
}

/* 2. Glass Variant (Frost overlay) */
.alert-variant-glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-color: var(--hairline);
}
.alert-variant-glass.alert-color-info .alert-icon { color: var(--accent, #0071e3); }
.alert-variant-glass.alert-color-success .alert-icon { color: var(--live, #30d158); }
.alert-variant-glass.alert-color-warning .alert-icon { color: var(--warning, #ff9f0a); }
.alert-variant-glass.alert-color-error .alert-icon { color: var(--danger, #ff3b30); }

/* 3. Solid / Panel Variant (Crisp white surface with semantic icon) */
.alert-variant-solid {
  background: var(--surface, #ffffff);
  border-color: var(--hairline);
  box-shadow: var(--sh-panel);
}
.alert-variant-solid.alert-color-info .alert-icon { color: var(--accent, #0071e3); }
.alert-variant-solid.alert-color-success .alert-icon { color: var(--live, #30d158); }
.alert-variant-solid.alert-color-warning .alert-icon { color: var(--warning, #ff9f0a); }
.alert-variant-solid.alert-color-error .alert-icon { color: var(--danger, #ff3b30); }

/* 4. Outline Variant (Transparent base + hairline border) */
.alert-variant-outline {
  background: transparent;
  border-color: var(--hairline);
  box-shadow: none;
}
.alert-variant-outline.alert-color-info { border-color: rgba(0, 113, 227, 0.35); }
.alert-variant-outline.alert-color-info .alert-icon { color: var(--accent, #0071e3); }
.alert-variant-outline.alert-color-success { border-color: rgba(48, 209, 88, 0.35); }
.alert-variant-outline.alert-color-success .alert-icon { color: var(--live, #30d158); }
.alert-variant-outline.alert-color-warning { border-color: rgba(255, 159, 10, 0.35); }
.alert-variant-outline.alert-color-warning .alert-icon { color: var(--warning, #ff9f0a); }
.alert-variant-outline.alert-color-error { border-color: rgba(255, 59, 48, 0.35); }
.alert-variant-outline.alert-color-error .alert-icon { color: var(--danger, #ff3b30); }

/* ──────────────────────────────────────────────────────────
   DARK MODE
   ────────────────────────────────────────────────────────── */
:root.dark .alert-variant-subtle.alert-color-info {
  background: rgba(10, 132, 255, 0.12);
  border-color: rgba(10, 132, 255, 0.25);
}
:root.dark .alert-variant-subtle.alert-color-info .alert-icon { color: #2997ff; }

:root.dark .alert-variant-subtle.alert-color-success {
  background: rgba(48, 209, 88, 0.12);
  border-color: rgba(48, 209, 88, 0.25);
}
:root.dark .alert-variant-subtle.alert-color-success .alert-icon { color: #30d158; }

:root.dark .alert-variant-subtle.alert-color-warning {
  background: rgba(255, 159, 10, 0.12);
  border-color: rgba(255, 159, 10, 0.25);
}
:root.dark .alert-variant-subtle.alert-color-warning .alert-icon { color: #ff9f0a; }

:root.dark .alert-variant-subtle.alert-color-error {
  background: rgba(255, 69, 58, 0.12);
  border-color: rgba(255, 69, 58, 0.25);
}
:root.dark .alert-variant-subtle.alert-color-error .alert-icon { color: #ff453a; }

:root.dark .alert-variant-glass {
  background: rgba(28, 28, 30, 0.75);
  border-color: rgba(255, 255, 255, 0.12);
}
:root.dark .alert-variant-solid {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.12);
}

/* ──────────────────────────────────────────────────────────
   ELEMENTS & TYPOGRAPHY
   ────────────────────────────────────────────────────────── */
.alert-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

.icon-emoji {
  font-size: 1.15em;
  line-height: 1;
}

.alert-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.alert-title {
  font-weight: 650;
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text, #1d1d1f);
  margin-bottom: 2px;
  line-height: 1.35;
}

:root.dark .alert-title {
  color: var(--text, #f5f5f7);
}

.size-sm .alert-title { font-size: 13px; }
.size-md .alert-title { font-size: 14px; }
.size-lg .alert-title { font-size: 15.5px; }

.alert-message {
  color: var(--text-body, #424245);
  line-height: 1.55;
  font-size: 13.5px;
}

:root.dark .alert-message {
  color: var(--text-body, #d1d1d6);
}

.size-sm .alert-message { font-size: 12px; }
.size-md .alert-message { font-size: 13.5px; }
.size-lg .alert-message { font-size: 14.5px; }

/* Action Button */
.alert-actions {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.alert-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: var(--r-pill, 999px);
  background: var(--surface);
  border: 1px solid var(--hairline);
  color: var(--text);
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.15s var(--ease-out-quart);
}

.alert-action-btn:hover {
  background: var(--hover);
  transform: translateY(-1px);
  box-shadow: var(--sh-card);
}

:root.dark .alert-action-btn {
  background: #2c2c2e;
  color: #f5f5f7;
  border-color: rgba(255, 255, 255, 0.15);
}

/* Close / Dismiss Button */
.alert-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: var(--text-3);
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: all 0.15s ease;
  margin-top: -2px;
}

.alert-close:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--text);
}

:root.dark .alert-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}
</style>
