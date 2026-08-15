<template>
  <div class="id-timeline">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      :class="['timeline-item', `variant-${item.variant || 'default'}`]"
    >
      <div class="timeline-left">
        <div class="timeline-dot-wrap">
          <component :is="item.icon" v-if="item.icon && typeof item.icon !== 'string'" :size="14" class="timeline-icon" />
          <span v-else-if="typeof item.icon === 'string'" class="timeline-str">{{ item.icon }}</span>
          <span v-else class="timeline-dot" />
        </div>
        <div v-if="idx < items.length - 1" class="timeline-line" />
      </div>

      <div class="timeline-content">
        <div class="timeline-header">
          <h4 class="timeline-title">{{ item.title }}</h4>
          <span v-if="item.time" class="timeline-time">{{ item.time }}</span>
        </div>
        <p v-if="item.description" class="timeline-desc">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.id-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.timeline-item {
  display: flex;
  gap: 16px;
  position: relative;
}

.timeline-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot-wrap {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--hover);
  border: 1px solid var(--hairline);
  color: var(--text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 2;
}

.variant-primary .timeline-dot-wrap { background: var(--accent); color: #fff; border-color: transparent; }
.variant-success .timeline-dot-wrap { background: #30d158; color: #fff; border-color: transparent; }
.variant-warning .timeline-dot-wrap { background: #ff9f0a; color: #fff; border-color: transparent; }
.variant-danger .timeline-dot-wrap { background: #ff3b30; color: #fff; border-color: transparent; }

.timeline-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
.timeline-icon { flex-shrink: 0; }
.timeline-str { font-size: 13px; line-height: 1; }

.timeline-line {
  flex: 1;
  width: 2px;
  background: var(--hairline);
  margin-top: 4px;
}

.timeline-content {
  flex: 1;
  padding-bottom: 8px;
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.timeline-title {
  font-size: 14px;
  font-weight: 650;
  color: var(--text);
  margin: 0;
}

.timeline-time {
  font-size: 12px;
  color: var(--text-3);
  font-weight: 500;
}

.timeline-desc {
  font-size: 13px;
  color: var(--text-2);
  margin: 4px 0 0 0;
  line-height: 1.45;
}
</style>
