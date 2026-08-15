<template>
  <Transition name="banner-slide">
    <div v-if="modelValue" class="macos-banner" role="alert" aria-live="polite">
      <div class="banner-header">
        <div class="banner-app">
          <div class="app-icon" :style="iconBg ? { background: iconBg, color: '#fff' } : {}">
            <slot name="icon">
              <component :is="icon" v-if="icon && typeof icon !== 'string'" :size="13" />
              <span v-else-if="typeof icon === 'string' && icon.length <= 4">{{ icon }}</span>
              <img v-else-if="typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/'))" :src="icon" alt="icon" class="app-icon-img" />
              <Bell v-else :size="13" />
            </slot>
          </div>
          <span class="app-name">{{ appName }}</span>
        </div>
        <span class="banner-time">{{ time }}</span>
      </div>

      <div class="banner-body">
        <h4 class="banner-title">{{ title }}</h4>
        <p v-if="message" class="banner-message">{{ message }}</p>
      </div>

      <div v-if="$slots.actions || actionLabel || secondaryActionLabel || dismissible" class="banner-actions">
        <slot name="actions">
          <button v-if="secondaryActionLabel" type="button" class="banner-btn" @click="$emit('secondary-action')">
            {{ secondaryActionLabel }}
          </button>
          <button v-if="actionLabel" type="button" class="banner-btn primary" @click="$emit('action')">
            {{ actionLabel }}
          </button>
          <button v-if="dismissible && !secondaryActionLabel" type="button" class="banner-btn" @click="$emit('dismiss'); $emit('update:modelValue', false)">
            Dismiss
          </button>
        </slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { Bell } from '@lucide/vue'

defineProps({
  modelValue: { type: Boolean, default: true },
  appName: { type: String, default: 'System Settings' },
  title: { type: String, default: 'Software Update Ready' },
  message: { type: String, default: '' },
  time: { type: String, default: 'now' },
  icon: [String, Object, Function],
  iconBg: String,
  actionLabel: String,
  secondaryActionLabel: String,
  dismissible: { type: Boolean, default: true }
})

defineEmits(['update:modelValue', 'dismiss', 'action', 'secondary-action'])
</script>

<style scoped>
.macos-banner {
  width: 100%; max-width: 360px; background: rgba(255, 255, 255, 0.88);
  backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--hairline); border-radius: 16px; box-shadow: var(--sh-overlay);
  padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; color: var(--text);
}
:root.dark .macos-banner {
  background: rgba(28, 28, 30, 0.88);
}
.banner-header { display: flex; align-items: center; justify-content: space-between; }
.banner-app { display: flex; align-items: center; gap: 7px; }
.app-icon {
  width: 22px; height: 22px; border-radius: 6px; background: var(--accent); color: #fff;
  font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: 700;
  flex-shrink: 0; overflow: hidden;
}
.app-icon-img { width: 100%; height: 100%; object-fit: cover; }
.app-name { font-size: 12px; font-weight: 650; color: var(--text-2); letter-spacing: -0.01em; }
.banner-time { font-size: 11.5px; color: var(--text-3); font-weight: 500; }
.banner-body { display: flex; flex-direction: column; gap: 3px; }
.banner-title { font-size: 13.5px; font-weight: 700; color: var(--text); margin: 0; line-height: 1.3; }
.banner-message { font-size: 12.5px; color: var(--text-2); margin: 0; line-height: 1.45; }
.banner-actions { display: flex; align-items: center; gap: 8px; justify-content: flex-end; margin-top: 4px; }
.banner-btn {
  background: var(--hover); border: 1px solid var(--hairline); border-radius: 8px;
  padding: 4px 12px; font-size: 12px; font-weight: 600; color: var(--text); cursor: pointer;
  transition: all 0.15s ease;
}
.banner-btn:hover { background: var(--track); }
.banner-btn.primary { background: var(--accent); color: #fff; border-color: transparent; }
.banner-btn.primary:hover { opacity: 0.9; }

.banner-slide-enter-active, .banner-slide-leave-active { transition: all 0.25s var(--ease-out-quart); }
.banner-slide-enter-from, .banner-slide-leave-to { opacity: 0; transform: translateY(-10px) scale(0.96); }
</style>
