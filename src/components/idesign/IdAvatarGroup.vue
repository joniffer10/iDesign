<template>
  <div
    :class="[
      'id-avatar-group',
      `variant-${variant}`,
      `dir-${direction}`,
      `size-${size}`,
      { 'is-interactive': interactive }
    ]"
    role="group"
    aria-label="Avatar group"
  >
    <div class="avatars-container">
      <div
        v-for="(user, idx) in visibleUsers"
        :key="user.id || idx"
        class="avatar-item"
        :style="variant === 'stacked' ? { zIndex: visibleUsers.length - idx } : {}"
        @click="interactive && $emit('click-avatar', user, idx)"
      >
        <IdAvatar
          :src="user.src"
          :name="user.name"
          :size="size"
          :shape="shape"
          :framed="framed"
          :status="user.status"
        />
      </div>

      <!-- Overflow Count Badge -->
      <div
        v-if="overflowCount > 0"
        :class="['avatar-overflow', `size-${size}`, `shape-${shape}`, { 'is-framed': framed }]"
        @click="interactive && $emit('click-overflow', overflowCount)"
      >
        <slot name="overflow" :count="overflowCount">
          +{{ overflowCount }}
        </slot>
      </div>
    </div>

    <!-- Optional Inline Label / Meta info (for hero/expanded variants) -->
    <div v-if="label || $slots.label" class="group-label">
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IdAvatar from './IdAvatar.vue'

const props = defineProps({
  users: { type: Array, required: true },
  max: { type: Number, default: 4 },
  size: { type: String, default: 'md', validator: v => ['xs', 'sm', 'md', 'lg', 'xl'].includes(v) },
  shape: { type: String, default: 'circle', validator: v => ['circle', 'squircle'].includes(v) },
  variant: {
    type: String,
    default: 'stacked',
    validator: v => ['stacked', 'grid', 'hero', 'expanded'].includes(v)
  },
  direction: {
    type: String,
    default: 'row',
    validator: v => ['row', 'column'].includes(v)
  },
  framed: { type: Boolean, default: false },
  interactive: { type: Boolean, default: true },
  label: String
})

defineEmits(['click-avatar', 'click-overflow'])

const visibleUsers = computed(() => props.users.slice(0, props.max))
const overflowCount = computed(() => Math.max(0, props.users.length - props.max))
</script>

<style scoped>
.id-avatar-group {
  display: inline-flex; align-items: center; gap: 10px; font-family: var(--font);
}

.avatars-container {
  display: inline-flex; align-items: center;
}

.dir-column .avatars-container {
  flex-direction: column; align-items: flex-start;
}

/* Stacked Variant (Overlapping with hover z-index elevation) */
.variant-stacked .avatar-item {
  margin-left: -10px; transition: transform 0.2s var(--ease-out-quart), z-index 0.2s;
}
.size-xs.variant-stacked .avatar-item { margin-left: -6px; }
.size-sm.variant-stacked .avatar-item { margin-left: -8px; }
.size-md.variant-stacked .avatar-item { margin-left: -10px; }
.size-lg.variant-stacked .avatar-item { margin-left: -14px; }
.size-xl.variant-stacked .avatar-item { margin-left: -18px; }

.dir-column.variant-stacked .avatar-item {
  margin-left: 0; margin-top: -10px;
}
.size-xs.dir-column.variant-stacked .avatar-item { margin-top: -6px; }
.size-sm.dir-column.variant-stacked .avatar-item { margin-top: -8px; }
.size-md.dir-column.variant-stacked .avatar-item { margin-top: -10px; }
.size-lg.dir-column.variant-stacked .avatar-item { margin-top: -14px; }
.size-xl.dir-column.variant-stacked .avatar-item { margin-top: -18px; }

.variant-stacked .avatar-item:first-child { margin: 0; }

.is-interactive .variant-stacked .avatar-item:hover {
  transform: translateY(-3px) scale(1.08); z-index: 50 !important; cursor: pointer;
}

/* Grid Variant (Spaced apart) */
.variant-grid .avatars-container {
  gap: 8px;
}
.variant-grid .avatar-item { margin: 0; }

/* Hero Liquid Glass Variant */
.variant-hero {
  padding: 6px 14px; border-radius: var(--r-pill); background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--hairline); box-shadow: var(--sh-card);
}
:root.dark .variant-hero { background: rgba(28, 28, 30, 0.65); }

/* Expanded Variant */
.variant-expanded .group-label {
  font-size: 13px; font-weight: 550; color: var(--text-2);
}

/* Overflow Badge styling */
.avatar-overflow {
  box-sizing: border-box !important;
  background: var(--hover); color: var(--text); font-weight: 700;
  border: 2px solid var(--surface); display: inline-flex;
  align-items: center; justify-content: center; z-index: 0; flex-shrink: 0;
  line-height: 1; text-align: center;
  transition: all 0.2s ease;
}
:root.dark .avatar-overflow {
  background: rgba(255, 255, 255, 0.12); color: #ffffff; border-color: #1c1c1e;
}

.variant-stacked .avatar-overflow { margin-left: -10px; }
.size-xs.variant-stacked .avatar-overflow { margin-left: -6px; }
.size-sm.variant-stacked .avatar-overflow { margin-left: -8px; }
.size-md.variant-stacked .avatar-overflow { margin-left: -10px; }
.size-lg.variant-stacked .avatar-overflow { margin-left: -14px; }
.size-xl.variant-stacked .avatar-overflow { margin-left: -18px; }

.dir-column.variant-stacked .avatar-overflow { margin-left: 0; margin-top: -10px; }

.shape-circle { border-radius: 50% !important; }
.shape-squircle { border-radius: 24% !important; }

.is-framed {
  box-shadow: 0 0 0 6px var(--hover), 0 0 0 7px var(--hairline);
}
:root.dark .is-framed {
  box-shadow: 0 0 0 7px #2c2c2e, 0 0 0 8px rgba(255, 255, 255, 0.12);
}

.is-interactive .avatar-overflow:hover {
  background: var(--accent); color: #ffffff; cursor: pointer; transform: scale(1.05);
}

.id-avatar-group.size-xs .avatar-overflow,
.avatar-overflow.size-xs {
  width: 28px !important; height: 28px !important;
  min-width: 28px !important; min-height: 28px !important;
  font-size: 11px !important; border-width: 2px;
}

.id-avatar-group.size-sm .avatar-overflow,
.avatar-overflow.size-sm {
  width: 36px !important; height: 36px !important;
  min-width: 36px !important; min-height: 36px !important;
  font-size: 13px !important; border-width: 2px;
}

.id-avatar-group.size-md .avatar-overflow,
.avatar-overflow.size-md {
  width: 44px !important; height: 44px !important;
  min-width: 44px !important; min-height: 44px !important;
  font-size: 15px !important; border-width: 2px;
}

.id-avatar-group.size-lg .avatar-overflow,
.avatar-overflow.size-lg {
  width: 56px !important; height: 56px !important;
  min-width: 56px !important; min-height: 56px !important;
  font-size: 19px !important; border-width: 3px;
}

.id-avatar-group.size-xl .avatar-overflow,
.avatar-overflow.size-xl {
  width: 72px !important; height: 72px !important;
  min-width: 72px !important; min-height: 72px !important;
  font-size: 24px !important; border-width: 4px;
}
</style>
