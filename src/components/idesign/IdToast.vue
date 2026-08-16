<template>
  <Teleport to="body">
    <div :class="['id-toast-container', `pos-${position}`]">
      <TransitionGroup name="toast-list">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['id-toast-item', `toast-${toast.type || 'info'}`]"
          role="status"
          aria-live="polite"
        >
          <!-- Toast Icon -->
          <div class="toast-icon">
            <CheckCircle2 v-if="toast.type === 'success'" :size="18" />
            <Info v-else-if="toast.type === 'info'" :size="18" />
            <AlertTriangle v-else-if="toast.type === 'warning'" :size="18" />
            <XCircle v-else-if="toast.type === 'error' || toast.type === 'danger'" :size="18" />
            <component :is="toast.icon" v-else-if="toast.icon" :size="18" />
          </div>

          <!-- Toast Text -->
          <div class="toast-body">
            <div class="toast-title">{{ toast.title || toast.message }}</div>
            <div v-if="toast.description" class="toast-desc">{{ toast.description }}</div>
          </div>

          <!-- Toast Action Button -->
          <button
            v-if="toast.actionLabel"
            type="button"
            class="toast-action-btn"
            @click="toast.onAction ? toast.onAction(toast) : remove(toast.id)"
          >
            {{ toast.actionLabel }}
          </button>

          <!-- Dismiss Close Button -->
          <button
            v-if="toast.dismissible !== false"
            type="button"
            class="toast-close-btn"
            aria-label="Close notification"
            @click="remove(toast.id)"
          >
            <X :size="14" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from '@lucide/vue'
import { useToast } from '../../composables/useToast'

defineProps({
  position: {
    type: String,
    default: 'bottom-center',
    validator: v => ['bottom-center', 'bottom-right', 'top-center', 'top-right'].includes(v)
  }
})

const { toasts, remove } = useToast()
</script>

<style scoped>
.id-toast-container {
  position: fixed; z-index: 9999; display: flex; flex-direction: column; gap: 10px;
  pointer-events: none; padding: 20px;
}
.pos-bottom-center { bottom: 0; left: 50%; transform: translateX(-50%); align-items: center; }
.pos-bottom-right { bottom: 0; right: 0; align-items: flex-end; }
.pos-top-center { top: 0; left: 50%; transform: translateX(-50%); align-items: center; }
.pos-top-right { top: 0; right: 0; align-items: flex-end; }

.id-toast-item {
  pointer-events: auto; display: flex; align-items: center; gap: 12px;
  padding: 12px 18px; border-radius: var(--r-pill); font-family: var(--font);
  background: rgba(29, 29, 31, 0.92); color: #ffffff;
  backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  max-width: 420px; min-width: 240px; transition: all 0.3s var(--ease-out-quart);
}

:root:not(.dark) .id-toast-item {
  background: rgba(255, 255, 255, 0.92); color: var(--text);
  border-color: rgba(0, 0, 0, 0.12); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.toast-icon { display: flex; align-items: center; flex-shrink: 0; }
.toast-success .toast-icon { color: #34c759; }
.toast-info .toast-icon { color: #2997ff; }
.toast-warning .toast-icon { color: #ff9500; }
.toast-error .toast-icon,
.toast-danger .toast-icon { color: #ff453a; }

.toast-body { flex: 1; min-width: 0; }
.toast-title { font-size: 13.5px; font-weight: 650; line-height: 1.3; }
.toast-desc { font-size: 12px; opacity: 0.78; margin-top: 2px; line-height: 1.35; }

.toast-action-btn {
  background: var(--accent); color: #ffffff; border: none; padding: 4px 12px;
  border-radius: var(--r-pill); font-size: 12px; font-weight: 650; cursor: pointer;
  flex-shrink: 0; transition: transform 0.15s;
}
.toast-action-btn:hover { transform: scale(1.04); }

.toast-close-btn {
  background: transparent; border: none; color: currentColor; opacity: 0.6;
  cursor: pointer; padding: 2px; flex-shrink: 0; display: flex; align-items: center;
  transition: opacity 0.15s;
}
.toast-close-btn:hover { opacity: 1; }

/* Transition animations */
.toast-list-enter-from { opacity: 0; transform: translateY(16px) scale(0.95); }
.toast-list-leave-to { opacity: 0; transform: translateY(-12px) scale(0.95); }

@media (max-width: 640px) {
  .id-toast-container {
    width: 100%;
    max-width: 100%;
    left: 0 !important;
    right: 0 !important;
    transform: none !important;
    padding: 16px;
    box-sizing: border-box;
  }
  .pos-bottom-center, .pos-bottom-right {
    bottom: 0;
    align-items: center;
  }
  .pos-top-center, .pos-top-right {
    top: 0;
    align-items: center;
  }
  .id-toast-item {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
}
</style>
