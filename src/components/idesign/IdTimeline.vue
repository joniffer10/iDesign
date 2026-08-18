<template>
  <div
    :class="[
      'id-timeline',
      `variant-${currentVariant}`,
      `size-${currentSize}`,
      { 'has-connector': connector !== false },
      config.mergedUi.value.base
    ]"
    role="list"
    aria-label="Activity timeline"
  >
    <div
      v-for="(item, idx) in items"
      :key="item.id || idx"
      :class="[
        'timeline-item',
        `item-variant-${item.variant || 'default'}`,
        `status-${item.status || item.variant || 'default'}`,
        { 'is-last': idx === items.length - 1 },
        config.mergedUi.value.item
      ]"
      role="listitem"
      @click="$emit('click-item', item, idx)"
    >
      <!-- Indicator & Spine Column -->
      <div :class="['timeline-spine', config.mergedUi.value.connector]">
        <div
          :class="[
            'timeline-indicator',
            `status-${item.status || item.variant || 'default'}`,
            config.mergedUi.value.indicator
          ]"
        >
          <slot name="icon" :item="item" :index="idx">
            <component
              :is="item.icon"
              v-if="item.icon && isComponent(item.icon)"
              :size="indicatorIconSize"
              :class="['timeline-icon', config.mergedUi.value.icon]"
            />
            <span v-else-if="typeof item.icon === 'string'" :class="['timeline-str', config.mergedUi.value.icon]">{{ item.icon }}</span>
            <span v-else class="timeline-dot" />
          </slot>
        </div>

        <div
          v-if="idx < items.length - 1 && connector !== false"
          class="timeline-line"
        />
      </div>

      <!-- Main Content / Card Surface -->
      <div
        :class="[
          'timeline-content',
          { 'timeline-card': currentVariant === 'cards' },
          currentVariant === 'cards' ? config.mergedUi.value.card : '',
          config.mergedUi.value.content
        ]"
      >
        <slot :item="item" :index="idx">
          <div class="timeline-header">
            <div class="timeline-title-wrap">
              <slot name="title" :item="item" :index="idx">
                <h4 :class="['timeline-title', config.mergedUi.value.title]">{{ item.title }}</h4>
              </slot>
            </div>

            <div class="timeline-meta-wrap">
              <slot name="timestamp" :item="item" :index="idx" :time="item.time || item.timestamp">
                <span
                  v-if="item.time || item.timestamp"
                  :class="['timeline-time', config.mergedUi.value.timestamp]"
                >
                  {{ item.time || item.timestamp }}
                </span>
              </slot>
            </div>
          </div>

          <slot name="description" :item="item" :index="idx" :description="item.description">
            <p v-if="item.description" :class="['timeline-desc', config.mergedUi.value.description]">
              {{ item.description }}
            </p>
          </slot>

          <!-- Optional Actions -->
          <div
            v-if="$slots.actions || (item.actions && item.actions.length)"
            :class="['timeline-actions', config.mergedUi.value.actions]"
          >
            <slot name="actions" :item="item" :index="idx" :actions="item.actions">
              <button
                v-for="(action, aIdx) in item.actions"
                :key="aIdx"
                type="button"
                :class="['timeline-action-btn', action.variant ? `btn-${action.variant}` : '']"
                @click.stop="action.onClick ? action.onClick(item, $event) : $emit('action', { action, item, index: idx })"
              >
                {{ action.label || action }}
              </button>
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  variant: {
    type: String,
    default: undefined
  },
  size: {
    type: String,
    default: undefined
  },
  connector: {
    type: Boolean,
    default: true
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

defineEmits(['action', 'click-item'])

const config = useIdesignConfig('Timeline', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')

const indicatorIconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'xs' ? 11 : sz === 'sm' ? 12 : sz === 'lg' ? 16 : sz === 'xl' ? 18 : 14
})

const isComponent = (val) => typeof val === 'object' || typeof val === 'function'
</script>

<style scoped>
.id-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  font-family: var(--font);
}

.timeline-item {
  display: flex;
  gap: 16px;
  position: relative;
}

/* ──────────────────────────────────────────────────────────
   SPINE & CONNECTOR INDICATOR
   ────────────────────────────────────────────────────────── */
.timeline-spine {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.timeline-indicator {
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
  transition: all 0.2s var(--ease-out-quart);
}

/* Semantic Status Colors */
.status-primary .timeline-indicator,
.status-accent .timeline-indicator,
.item-variant-primary .timeline-indicator {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
}

.status-success .timeline-indicator,
.status-live .timeline-indicator,
.item-variant-success .timeline-indicator {
  background: var(--live, #30d158);
  color: #ffffff;
  border-color: transparent;
}

.status-warning .timeline-indicator,
.status-heat .timeline-indicator,
.item-variant-warning .timeline-indicator {
  background: var(--warning, #ff9f0a);
  color: #ffffff;
  border-color: transparent;
}

.status-danger .timeline-indicator,
.status-error .timeline-indicator,
.item-variant-danger .timeline-indicator {
  background: var(--danger, #ff3b30);
  color: #ffffff;
  border-color: transparent;
}

.status-info .timeline-indicator {
  background: var(--info, #0a84ff);
  color: #ffffff;
  border-color: transparent;
}

.timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

.timeline-icon {
  flex-shrink: 0;
}

.timeline-str {
  font-size: 13px;
  line-height: 1;
}

.timeline-line {
  flex: 1;
  width: 2px;
  background: var(--hairline);
  margin-top: 4px;
}

/* ──────────────────────────────────────────────────────────
   CONTENT & TYPOGRAPHY
   ────────────────────────────────────────────────────────── */
.timeline-content {
  flex: 1;
  padding-bottom: 8px;
  min-width: 0;
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.timeline-title-wrap {
  min-width: 0;
}

.timeline-title {
  font-size: 14.5px;
  font-weight: 650;
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text);
  margin: 0;
  line-height: 1.35;
}

.timeline-meta-wrap {
  flex-shrink: 0;
}

.timeline-time {
  font-size: 12px;
  color: var(--text-3);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.timeline-desc {
  font-size: 13px;
  color: var(--text-2);
  margin: 5px 0 0 0;
  line-height: 1.5;
}

.timeline-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.timeline-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  border-radius: var(--r-pill);
  font-size: 12px;
  font-weight: 550;
  font-family: var(--font);
  cursor: pointer;
  border: 1px solid var(--hairline);
  background: var(--hover);
  color: var(--text);
  transition: all 0.15s ease;
  user-select: none;
}

.timeline-action-btn:hover {
  background: var(--surface);
  border-color: var(--faint);
  box-shadow: var(--sh-card);
}

.timeline-action-btn.btn-primary {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
}
.timeline-action-btn.btn-primary:hover {
  background: var(--accent-hover, #0062c4);
}

/* ──────────────────────────────────────────────────────────
   CARDS VARIANT
   Individual cards for each event in the timeline,
   grounded by subtle connection and clear card surfaces.
   ────────────────────────────────────────────────────────── */
.id-timeline.variant-cards {
  gap: 14px;
}

.variant-cards .timeline-item {
  align-items: stretch;
}

.variant-cards .timeline-spine {
  padding-top: 14px;
}

.variant-cards .timeline-indicator {
  width: 32px;
  height: 32px;
}

.variant-cards .timeline-line {
  margin-top: 6px;
  margin-bottom: -10px;
}

.variant-cards .timeline-card {
  background: var(--surface);
  border-radius: var(--r-card);
  border: 1px solid var(--hairline);
  box-shadow: var(--sh-card);
  padding: 16px 18px;
  transition: transform 0.2s var(--ease-out-quart), box-shadow 0.2s var(--ease-out-quart);
}

.variant-cards .timeline-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--sh-lift);
}

/* Size Variants */
.size-sm .timeline-title { font-size: 13.5px; }
.size-sm .timeline-desc { font-size: 12px; }
.size-sm.variant-cards .timeline-card { padding: 12px 14px; }
.size-sm .timeline-indicator { width: 24px; height: 24px; }
.size-sm.variant-cards .timeline-indicator { width: 26px; height: 26px; }

.size-lg .timeline-title { font-size: 16px; }
.size-lg .timeline-desc { font-size: 14px; }
.size-lg.variant-cards .timeline-card { padding: 20px 22px; }
.size-lg .timeline-indicator { width: 34px; height: 34px; }
.size-lg.variant-cards .timeline-indicator { width: 38px; height: 38px; }

/* ──────────────────────────────────────────────────────────
   RESPONSIVE LAYOUT
   ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .id-timeline {
    gap: 14px;
  }

  .timeline-item {
    gap: 12px;
  }

  .variant-cards .timeline-card {
    padding: 12px 14px;
  }

  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .timeline-time {
    font-size: 11.5px;
  }
}
</style>
