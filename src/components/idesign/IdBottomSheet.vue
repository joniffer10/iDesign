<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition name="sheet-slide">
      <div v-if="modelValue" class="sheet-backdrop" @click.self="$emit('update:modelValue', false)">
        <div class="sheet-surface">
          <div class="sheet-grabber"></div>
          <div v-if="title || description || $slots.header" class="sheet-header">
            <slot name="header">
              <h3 v-if="title" class="sheet-title">{{ title }}</h3>
              <p v-if="description" class="sheet-desc">{{ description }}</p>
            </slot>
          </div>
          <div class="sheet-body">
            <slot>{{ body }}</slot>
          </div>
          <div v-if="$slots.footer" class="sheet-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
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
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.sheet-backdrop {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  display: flex; align-items: flex-end; justify-content: center;
}
.sheet-surface {
  width: 100%; max-width: 540px; background: var(--surface); border: 1px solid var(--hairline);
  border-top-left-radius: 28px; border-top-right-radius: 28px; box-shadow: var(--sh-overlay);
  padding: 12px 24px 32px 24px; color: var(--text); font-family: var(--font);
  display: flex; flex-direction: column; max-height: 85vh;
}
.sheet-grabber {
  width: 36px; height: 5px; border-radius: 999px; background: var(--text-3); opacity: 0.4;
  margin: 0 auto 16px auto; flex-shrink: 0;
}
.sheet-header { margin-bottom: 16px; text-align: center; }
.sheet-title { font-size: 18px; font-weight: 650; letter-spacing: -0.015em; color: var(--text); margin: 0; }
.sheet-desc { font-size: 13.5px; color: var(--text-2); margin-top: 4px; line-height: 1.45; }
.sheet-body { flex: 1; overflow-y: auto; }
.sheet-footer { margin-top: 20px; display: flex; align-items: center; justify-content: flex-end; gap: 12px; }

.sheet-slide-enter-active, .sheet-slide-leave-active { transition: transform 0.32s var(--ease-spring), opacity 0.25s ease; }
.sheet-slide-enter-from, .sheet-slide-leave-to { opacity: 0; transform: translateY(100%); }
</style>
