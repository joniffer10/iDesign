<template>
  <div :class="['id-alert', `alert-${variant}`, `size-${size}`]" role="alert">
    <div class="alert-icon">
      <slot name="icon">
        <component :is="icon" v-if="icon && typeof icon !== 'string'" :size="iconSize" />
        <span v-else-if="typeof icon === 'string' && icon.length <= 4" class="icon-emoji">{{ icon }}</span>
        <template v-else>
          <Info v-if="variant === 'info' || variant === 'glass'" :size="iconSize" />
          <CheckCircle2 v-else-if="variant === 'success'" :size="iconSize" />
          <AlertTriangle v-else-if="variant === 'warning'" :size="iconSize" />
          <XCircle v-else :size="iconSize" />
        </template>
      </slot>
    </div>
    <div class="alert-body">
      <div v-if="title" class="alert-title">{{ title }}</div>
      <div v-if="description || $slots.default" class="alert-message">
        <slot>{{ description }}</slot>
      </div>
    </div>
    <button v-if="dismissible" type="button" class="alert-close" aria-label="Dismiss" @click="$emit('dismiss')">
      <X :size="closeSize" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from '@lucide/vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: v => ['info', 'success', 'warning', 'error', 'glass'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  title: String,
  description: String,
  icon: [String, Object, Function],
  dismissible: Boolean
})

defineEmits(['dismiss'])

const iconSize = computed(() => props.size === 'sm' ? 16 : props.size === 'lg' ? 24 : 20)
const closeSize = computed(() => props.size === 'sm' ? 14 : props.size === 'lg' ? 18 : 16)
</script>

<style scoped>
.id-alert {
  display: flex; align-items: flex-start; gap: 12px; border-radius: 14px;
  border: 1px solid var(--hairline); transition: all 0.2s ease; width: 100%; font-family: var(--font);
}

.size-sm { padding: 10px 14px; gap: 8px; }
.size-md { padding: 14px 18px; gap: 12px; }
.size-lg { padding: 18px 24px; gap: 16px; }

.alert-info { background: rgba(0, 113, 227, 0.06); color: var(--accent); }
.alert-success { background: rgba(52, 199, 89, 0.08); color: #248a3d; }
.alert-warning { background: rgba(255, 159, 10, 0.08); color: #b25000; }
.alert-error { background: rgba(255, 59, 48, 0.08); color: #d70015; }
.alert-glass {
  background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px); color: var(--text); box-shadow: var(--sh-card);
}
:root.dark .alert-glass { background: rgba(28, 28, 30, 0.65); }

:root.dark .alert-info { background: rgba(41, 151, 255, 0.12); color: #2997ff; }
:root.dark .alert-success { background: rgba(52, 199, 89, 0.14); color: #34c759; }
:root.dark .alert-warning { background: rgba(255, 159, 10, 0.14); color: #ff9500; }
:root.dark .alert-error { background: rgba(255, 69, 58, 0.14); color: #ff453a; }

.alert-icon { flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center; }
.icon-emoji { font-size: 18px; line-height: 1; }
.alert-body { flex: 1; min-width: 0; }

.size-sm .alert-title { font-size: 13px; }
.size-md .alert-title { font-size: 14px; }
.size-lg .alert-title { font-size: 16px; }

.alert-title { font-weight: 650; color: inherit; margin-bottom: 2px; }

.size-sm .alert-message { font-size: 12px; }
.size-md .alert-message { font-size: 13.5px; }
.size-lg .alert-message { font-size: 15px; }

.alert-message { color: var(--text-body); line-height: 1.5; }
.alert-close { background: transparent; border: none; color: var(--text-3); cursor: pointer; flex-shrink: 0; padding: 2px; transition: color 0.15s; }
.alert-close:hover { color: var(--text); }
</style>
