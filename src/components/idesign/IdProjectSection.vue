<template>
  <div class="id-project-section">
    <!-- Section Header -->
    <div v-if="title || $slots.header" class="section-header">
      <slot name="header">
        <div class="header-left">
          <div v-if="icon || $slots.icon" class="header-icon-badge">
            <slot name="icon">
              <span v-if="typeof icon === 'string' && icon.length <= 4">{{ icon }}</span>
              <component :is="icon" v-else :size="18" />
            </slot>
          </div>
          <h3 class="section-title">{{ title }}</h3>
        </div>

        <slot name="action">
          <a v-if="actionHref || actionLabel" :href="actionHref || '#'" class="section-action-btn" aria-label="View all projects">
            <span>{{ actionLabel }}</span>
            <ArrowRight :size="16" />
          </a>
          <button v-else type="button" class="section-action-btn" aria-label="Action" @click="$emit('action-click')">
            <ArrowRight :size="16" />
          </button>
        </slot>
      </slot>
    </div>

    <!-- Section Body (Card Items List) -->
    <div class="section-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from '@lucide/vue'

defineProps({
  title: { type: String, default: 'Featured Projects' },
  icon: { type: [String, Object, Function], default: '📁' },
  actionLabel: String,
  actionHref: String
})

defineEmits(['action-click'])
</script>

<style scoped>
.id-project-section {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 28px;
  padding: 24px;
  box-shadow: var(--sh-panel);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

:root.dark .id-project-section {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon-badge {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--hover);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--accent);
  flex-shrink: 0;
}

:root.dark .header-icon-badge {
  background: rgba(255, 255, 255, 0.08);
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0;
}

.section-action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--hover);
  border: 1px solid var(--hairline);
  color: var(--text-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s var(--ease-out-quart);
}

:root.dark .section-action-btn {
  background: rgba(255, 255, 255, 0.08);
}

.section-action-btn:hover {
  background: var(--track);
  color: var(--text);
  transform: translateX(2px);
}

.section-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
