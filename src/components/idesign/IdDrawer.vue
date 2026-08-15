<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition name="drawer-slide">
      <div v-if="modelValue" class="drawer-backdrop" @click.self="$emit('update:modelValue', false)">
        <div :class="['drawer-surface', `pos-${position}`, `variant-${variant}`]" role="dialog" aria-modal="true" :aria-label="title || 'Drawer'">
          <div v-if="title || description || $slots.header" class="drawer-header">
            <slot name="header">
              <div class="drawer-header-content">
                <h3 v-if="title" class="drawer-title">{{ title }}</h3>
                <p v-if="description" class="drawer-desc">{{ description }}</p>
              </div>
            </slot>
            <button type="button" class="drawer-close" aria-label="Close drawer" @click="$emit('update:modelValue', false)">
              <X :size="16" />
            </button>
          </div>

          <div class="drawer-body">
            <slot>{{ body }}</slot>
          </div>

          <div v-if="$slots.footer" class="drawer-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  description: String,
  body: String,
  position: { type: String, default: 'right', validator: v => ['right', 'left'].includes(v) },
  variant: { type: String, default: 'default', validator: v => ['default', 'floating-sheet'].includes(v) },
  teleport: { type: Boolean, default: true }
})

defineEmits(['update:modelValue'])

watch(() => props.modelValue, (v) => {
  if (props.teleport) document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<style scoped>
.drawer-backdrop {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  display: flex;
}
.drawer-surface {
  position: absolute; background: var(--surface); border: 1px solid var(--hairline);
  box-shadow: var(--sh-overlay); display: flex; flex-direction: column;
  max-width: 420px; width: 90vw; color: var(--text); font-family: var(--font);
}

.pos-right { top: 0; right: 0; bottom: 0; border-right: none; }
.pos-left { top: 0; left: 0; bottom: 0; border-left: none; }

.variant-floating-sheet {
  top: 16px; bottom: 16px; height: calc(100vh - 32px); border-radius: 24px;
}
.pos-right.variant-floating-sheet { right: 16px; }
.pos-left.variant-floating-sheet { left: 16px; }

.drawer-header {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  padding: 20px 24px; border-bottom: 1px solid var(--hairline);
}
.drawer-header-content { display: flex; flex-direction: column; }
.drawer-title { font-size: 18px; font-weight: 650; letter-spacing: -0.015em; color: var(--text); margin: 0; }
.drawer-desc { font-size: 13px; color: var(--text-2); margin-top: 3px; line-height: 1.45; }
.drawer-close {
  width: 30px; height: 30px; border-radius: 50%; border: none; background: var(--hover);
  color: var(--text-2); display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
}
.drawer-close:hover { background: var(--track); color: var(--text); }
.drawer-body { flex: 1; overflow-y: auto; padding: 24px; }
.drawer-footer { padding: 16px 24px; border-top: 1px solid var(--hairline); display: flex; align-items: center; justify-content: flex-end; gap: 10px; }

.drawer-slide-enter-active, .drawer-slide-leave-active { transition: opacity .3s var(--ease-spring); }
.drawer-slide-enter-active .drawer-surface, .drawer-slide-leave-active .drawer-surface { transition: transform .3s var(--ease-spring); }
.drawer-slide-enter-from, .drawer-slide-leave-to { opacity: 0; }
.drawer-slide-enter-from .pos-right, .drawer-slide-leave-to .pos-right { transform: translateX(100%); }
.drawer-slide-enter-from .pos-left, .drawer-slide-leave-to .pos-left { transform: translateX(-100%); }
</style>
