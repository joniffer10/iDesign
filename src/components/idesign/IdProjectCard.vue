<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :class="[
      'id-project-card',
      { 'is-interactive': interactive || href }
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Left Logo Avatar -->
    <div class="project-logo-wrap" :style="logoBg ? { background: logoBg } : {}">
      <slot name="logo">
        <img v-if="logo && (logo.startsWith('http') || logo.startsWith('/'))" :src="logo" :alt="title" class="project-logo-img" />
        <span v-else-if="logo" class="project-logo-emoji">{{ logo }}</span>
        <span v-else class="project-logo-fallback">{{ title ? title[0].toUpperCase() : 'P' }}</span>
      </slot>
    </div>

    <!-- Main Content -->
    <div class="project-content">
      <!-- Title & Badge Row -->
      <div class="project-title-row">
        <h4 class="project-title">{{ title }}</h4>
        
        <slot name="badge">
          <span v-if="badge" :class="['project-badge', `badge-${badgeVariant}`]">
            <span class="badge-dot" />
            {{ badge }}
          </span>
        </slot>
      </div>

      <!-- Description -->
      <p v-if="description || $slots.default" class="project-description">
        <slot>{{ description }}</slot>
      </p>

      <!-- Tech Stack Icons Row -->
      <div v-if="(techStack && techStack.length > 0) || $slots.tech" class="project-tech-row">
        <slot name="tech">
          <div v-for="(item, idx) in techStack" :key="idx" class="tech-icon-pill" :title="typeof item === 'object' ? item.name : item">
            <img v-if="typeof item === 'object' && item.icon" :src="item.icon" :alt="item.name || 'tech'" />
            <span v-else-if="typeof item === 'string' && (item.startsWith('http') || item.startsWith('/'))">
              <img :src="item" alt="tech" />
            </span>
            <span v-else class="tech-text">{{ typeof item === 'object' ? item.name : item }}</span>
          </div>
        </slot>
      </div>
    </div>

    <!-- Right Chevron Action -->
    <div class="project-action">
      <slot name="action">
        <ChevronRight :size="20" class="chevron-icon" />
      </slot>
    </div>
  </component>
</template>

<script setup>
import { ChevronRight } from '@lucide/vue'

defineProps({
  title: { type: String, required: true },
  description: String,
  badge: String,
  badgeVariant: {
    type: String,
    default: 'success',
    validator: v => ['success', 'warning', 'info', 'accent', 'purple', 'neutral'].includes(v)
  },
  logo: String,
  logoBg: String,
  techStack: {
    type: Array,
    default: () => []
  },
  href: String,
  interactive: {
    type: Boolean,
    default: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.id-project-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 20px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  color: var(--text);
  text-decoration: none;
  transition: transform 0.25s var(--ease-out-quart), box-shadow 0.25s var(--ease-out-quart), border-color 0.25s;
  position: relative;
}

:root.dark .id-project-card {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
}

.id-project-card.is-interactive:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: var(--sh-card);
  cursor: pointer;
}

.id-project-card.is-interactive:hover .chevron-icon {
  transform: translateX(3px);
  color: var(--accent);
}

/* Logo Badge */
.project-logo-wrap {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: var(--hover);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  transition: all 0.25s var(--ease-out-quart);
}

.project-logo-wrap.shape-squircle {
  border-radius: 18px;
}

.project-logo-wrap.shape-circle {
  border-radius: 50%;
}

.project-logo-wrap.is-framed {
  box-shadow: 0 0 0 6px var(--hover), 0 0 0 7px var(--hairline);
}

:root.dark .project-logo-wrap {
  background: rgba(255, 255, 255, 0.1);
}

:root.dark .project-logo-wrap.is-framed {
  box-shadow: 0 0 0 7px #2c2c2e, 0 0 0 8px rgba(255, 255, 255, 0.12);
}

.project-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-logo-emoji {
  font-size: 26px;
  line-height: 1;
}

.project-logo-fallback {
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
}

/* Content */
.project-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.project-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.project-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--text);
  margin: 0;
}

/* Pill Badge */
.project-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: var(--r-pill);
  font-size: 11.5px;
  font-weight: 750;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.badge-success {
  background: rgba(48, 209, 88, 0.15);
  color: #30d158;
}
.badge-success .badge-dot { background: #30d158; }

.badge-warning {
  background: rgba(255, 159, 10, 0.15);
  color: #ff9f0a;
}
.badge-warning .badge-dot { background: #ff9f0a; }

.badge-info {
  background: rgba(10, 132, 255, 0.15);
  color: #0a84ff;
}
.badge-info .badge-dot { background: #0a84ff; }

.badge-purple {
  background: rgba(191, 90, 242, 0.15);
  color: #bf5af2;
}
.badge-purple .badge-dot { background: #bf5af2; }

.badge-accent {
  background: var(--accent-light, rgba(10, 132, 255, 0.15));
  color: var(--accent);
}
.badge-accent .badge-dot { background: var(--accent); }

.badge-neutral {
  background: var(--hover);
  color: var(--text-2);
}
.badge-neutral .badge-dot { background: var(--text-3); }

/* Description */
.project-description {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--text-2);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tech Stack Row */
.project-tech-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.tech-icon-pill {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--hover);
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-2);
  overflow: hidden;
}

:root.dark .tech-icon-pill {
  background: rgba(255, 255, 255, 0.08);
}

.tech-icon-pill img {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.tech-text {
  font-size: 10px;
}

/* Right Chevron Action */
.project-action {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-3);
  flex-shrink: 0;
  padding-left: 4px;
}

.chevron-icon {
  transition: transform 0.25s var(--ease-out-quart), color 0.25s;
}
</style>
