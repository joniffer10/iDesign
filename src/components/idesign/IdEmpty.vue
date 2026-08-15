<template>
  <div class="id-empty-state">
    <div class="empty-icon-box">
      <slot name="icon">
        <span v-if="typeof icon === 'string' && icon.length <= 4" class="default-icon">{{ icon }}</span>
        <img v-else-if="typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/'))" :src="icon" alt="icon" class="empty-icon-img" />
        <component :is="icon" v-else :size="28" class="empty-icon-svg" />
      </slot>
    </div>

    <h3 class="empty-title">{{ title }}</h3>
    <p v-if="description" class="empty-desc">{{ description }}</p>

    <div v-if="$slots.action || actionLabel" class="empty-action">
      <slot name="action">
        <IdButton variant="primary" size="md" @click="$emit('action', $event); $emit('click', $event)">
          {{ actionLabel }}
        </IdButton>
      </slot>
    </div>
  </div>
</template>

<script setup>
import IdButton from './IdButton.vue'

defineProps({
  title: { type: String, default: 'No Results Found' },
  description: { type: String, default: 'Try adjusting your search filters or create a new item.' },
  icon: { type: [String, Object, Function], default: '🔍' },
  actionLabel: String
})

defineEmits(['action', 'click'])
</script>

<style scoped>
.id-empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 48px 24px; border: 1px dashed var(--hairline);
  border-radius: var(--r-card); background: var(--surface); color: var(--text);
  width: 100%; max-width: 520px; margin: 0 auto;
}
.empty-icon-box {
  width: 64px; height: 64px; border-radius: 50%; background: var(--hover);
  display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
  color: var(--accent); flex-shrink: 0;
}
.default-icon { font-size: 28px; line-height: 1; }
.empty-icon-img { width: 32px; height: 32px; object-fit: contain; }
.empty-icon-svg { stroke-width: 1.75; }
.empty-title { font-size: 17px; font-weight: 650; letter-spacing: -0.015em; color: var(--text); margin: 0; }
.empty-desc { font-size: 13.5px; color: var(--text-2); max-width: 360px; line-height: 1.5; margin: 6px 0 0 0; }
.empty-action { margin-top: 20px; }
</style>
