<template>
  <div
    :class="[
      'id-avatar-group',
      `variant-${currentVariant}`,
      `dir-${currentDirection}`,
      `size-${currentSize}`,
      {
        'is-interactive': interactive,
        'is-framed-group': framed
      },
      config.mergedUi.value.base,
      currentVariant === 'stacked' ? config.mergedUi.value.stacked : ''
    ]"
    role="group"
    aria-label="Avatar group"
  >
    <div
      :class="[
        'avatars-container',
        { 'is-stacked': currentVariant === 'stacked' },
        config.mergedUi.value.container
      ]"
    >
      <!-- Visible Avatars -->
      <div
        v-for="(user, idx) in visibleUsers"
        :key="user.id || idx"
        :class="[
          'avatar-item',
          { 'is-stacked-item': currentVariant === 'stacked' },
          config.mergedUi.value.item
        ]"
        :style="currentVariant === 'stacked' ? { zIndex: visibleUsers.length - idx } : {}"
        @click="interactive && $emit('click-avatar', user, idx)"
      >
        <IdAvatar
          :src="user.src"
          :name="user.name"
          :icon="user.icon"
          :size="currentSize"
          :shape="shape"
          :framed="framed"
          :status="user.status"
          :ui="avatarUiProp"
        />
      </div>

      <!-- Overflow / +More Avatar Indicator -->
      <div
        v-if="overflowCount > 0"
        :class="[
          'avatar-overflow',
          'avatar-more',
          `size-${currentSize}`,
          `shape-${shape}`,
          {
            'is-stacked-item': currentVariant === 'stacked',
            'is-framed': framed
          },
          config.mergedUi.value.more,
          config.mergedUi.value.overflow
        ]"
        :style="currentVariant === 'stacked' ? { zIndex: 0 } : {}"
        role="button"
        :tabindex="interactive ? 0 : undefined"
        :aria-label="`+${overflowCount} more members`"
        @click="interactive && $emit('click-overflow', overflowCount)"
        @keydown.enter="interactive && $emit('click-overflow', overflowCount)"
      >
        <slot name="overflow" :count="overflowCount">
          <span class="overflow-text">+{{ overflowCount }}</span>
        </slot>
      </div>
    </div>

    <!-- Optional Inline Label / Meta info (for hero/expanded variants) -->
    <div v-if="label || $slots.label" :class="['group-label', config.mergedUi.value.label]">
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IdAvatar from './IdAvatar.vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  users: { type: Array, required: true },
  max: { type: Number, default: 4 },
  size: { type: String, default: undefined },
  shape: { type: String, default: 'circle' },
  variant: { type: String, default: undefined },
  direction: { type: String, default: undefined },
  framed: { type: Boolean, default: false },
  interactive: { type: Boolean, default: true },
  label: String,
  ui: { type: Object, default: () => ({}) }
})

defineEmits(['click-avatar', 'click-overflow'])

const config = useIdesignConfig('AvatarGroup', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'stacked'))
const currentDirection = computed(() => config.resolvedDirection.value || 'row')

const visibleUsers = computed(() => (props.users || []).slice(0, props.max))
const overflowCount = computed(() => Math.max(0, (props.users?.length || 0) - props.max))

const avatarUiProp = computed(() => {
  const customAvatar = config.mergedUi.value.avatar
  if (!customAvatar) return {}
  if (typeof customAvatar === 'string') {
    return { avatar: customAvatar }
  }
  return customAvatar
})
</script>

<style scoped>
.id-avatar-group {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font);
}

.avatars-container {
  display: inline-flex;
  align-items: center;
}

.dir-column .avatars-container {
  flex-direction: column;
  align-items: flex-start;
}

/* ──────────────────────────────────────────────────────────
   STACKED VARIANT (Overlapping avatars with smooth hover lift)
   ────────────────────────────────────────────────────────── */
.variant-stacked .avatar-item,
.variant-stacked .avatar-overflow {
  margin-left: -10px;
  transition: transform 0.2s var(--ease-out-quart), z-index 0.2s;
}

.size-xs.variant-stacked .avatar-item,
.size-xs.variant-stacked .avatar-overflow { margin-left: -6px; }
.size-sm.variant-stacked .avatar-item,
.size-sm.variant-stacked .avatar-overflow { margin-left: -8px; }
.size-md.variant-stacked .avatar-item,
.size-md.variant-stacked .avatar-overflow { margin-left: -10px; }
.size-lg.variant-stacked .avatar-item,
.size-lg.variant-stacked .avatar-overflow { margin-left: -14px; }
.size-xl.variant-stacked .avatar-item,
.size-xl.variant-stacked .avatar-overflow { margin-left: -18px; }

.dir-column.variant-stacked .avatar-item,
.dir-column.variant-stacked .avatar-overflow {
  margin-left: 0;
  margin-top: -10px;
}
.size-xs.dir-column.variant-stacked .avatar-item,
.size-xs.dir-column.variant-stacked .avatar-overflow { margin-top: -6px; }
.size-sm.dir-column.variant-stacked .avatar-item,
.size-sm.dir-column.variant-stacked .avatar-overflow { margin-top: -8px; }
.size-md.dir-column.variant-stacked .avatar-item,
.size-md.dir-column.variant-stacked .avatar-overflow { margin-top: -10px; }
.size-lg.dir-column.variant-stacked .avatar-item,
.size-lg.dir-column.variant-stacked .avatar-overflow { margin-top: -14px; }
.size-xl.dir-column.variant-stacked .avatar-item,
.size-xl.dir-column.variant-stacked .avatar-overflow { margin-top: -18px; }

.variant-stacked .avatar-item:first-child {
  margin-left: 0;
  margin-top: 0;
}

/* Framed Stacking Adjustments so outer frame rings have breathing room */
.is-framed-group.variant-stacked .avatar-item,
.is-framed-group.variant-stacked .avatar-overflow {
  margin-left: -6px;
}
.size-xs.is-framed-group.variant-stacked .avatar-item,
.size-xs.is-framed-group.variant-stacked .avatar-overflow { margin-left: -3px; }
.size-sm.is-framed-group.variant-stacked .avatar-item,
.size-sm.is-framed-group.variant-stacked .avatar-overflow { margin-left: -5px; }
.size-md.is-framed-group.variant-stacked .avatar-item,
.size-md.is-framed-group.variant-stacked .avatar-overflow { margin-left: -6px; }
.size-lg.is-framed-group.variant-stacked .avatar-item,
.size-lg.is-framed-group.variant-stacked .avatar-overflow { margin-left: -8px; }
.size-xl.is-framed-group.variant-stacked .avatar-item,
.size-xl.is-framed-group.variant-stacked .avatar-overflow { margin-left: -10px; }

.is-framed-group .avatar-item:first-child {
  margin-left: 0 !important;
}

.is-interactive .variant-stacked .avatar-item:hover,
.is-interactive .variant-stacked .avatar-overflow:hover {
  transform: translateY(-3px) scale(1.08);
  z-index: 50 !important;
  cursor: pointer;
}

/* ──────────────────────────────────────────────────────────
   GRID VARIANT (Spaced apart)
   ────────────────────────────────────────────────────────── */
.variant-grid .avatars-container {
  gap: 8px;
}
.variant-grid .avatar-item,
.variant-grid .avatar-overflow {
  margin: 0;
}

/* ──────────────────────────────────────────────────────────
   HERO LIQUID GLASS VARIANT
   ────────────────────────────────────────────────────────── */
.variant-hero {
  padding: 6px 14px;
  border-radius: var(--r-pill);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  border: 1px solid var(--hairline);
  box-shadow: var(--sh-card);
  transition: all 0.25s var(--ease-out-quart);
}
:root.dark .variant-hero {
  background: rgba(28, 28, 30, 0.65);
}

/* Hero variant when framed is active: expands padding so outer rings fit cleanly */
.variant-hero.is-framed-group {
  padding: 10px 18px;
  gap: 16px;
}

.variant-hero.is-framed-group .avatars-container {
  padding: 4px 6px;
}

/* ──────────────────────────────────────────────────────────
   EXPANDED VARIANT
   ────────────────────────────────────────────────────────── */
.variant-expanded .group-label {
  font-size: 13px;
  font-weight: 550;
  color: var(--text-2);
}

/* ──────────────────────────────────────────────────────────
   OVERFLOW / +MORE AVATAR INDICATOR
   Behaves visually like another avatar in the group:
   - Same dimensions per size tier
   - Circular / matching shape
   - Clean surface background token (var(--surface-2))
   - High-contrast tabular numbers
   - Framed ring support when framed is enabled
   ────────────────────────────────────────────────────────── */
.avatar-overflow {
  box-sizing: border-box;
  background: var(--surface-2, rgba(0, 0, 0, 0.06));
  color: var(--text);
  font-family: var(--font);
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  letter-spacing: var(--tracking-tight, -0.02em);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  flex-shrink: 0;
  line-height: 1;
  text-align: center;
  border: none;
  box-shadow: none;
  transition: transform 0.2s var(--ease-out-quart), background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  user-select: none;
}

:root.dark .avatar-overflow {
  background: rgba(255, 255, 255, 0.12);
  color: var(--text, #f5f5f7);
}

.shape-circle {
  border-radius: 50% !important;
}

.shape-squircle {
  border-radius: 24% !important;
}

.overflow-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* Framed Ring for +more avatar indicator */
.avatar-overflow.is-framed {
  box-shadow: 0 0 0 6px var(--hover), 0 0 0 7px var(--hairline);
}
:root.dark .avatar-overflow.is-framed {
  box-shadow: 0 0 0 7px #2c2c2e, 0 0 0 8px rgba(255, 255, 255, 0.12);
}

.is-interactive .avatar-overflow:hover {
  background: var(--hover, rgba(0, 0, 0, 0.09));
  cursor: pointer;
}
:root.dark .is-interactive .avatar-overflow:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Precise Avatar Sizes Matching IdAvatar */
.size-xs.avatar-overflow,
.id-avatar-group.size-xs .avatar-overflow {
  width: 28px; height: 28px;
  min-width: 28px; min-height: 28px;
  font-size: 11px;
}

.size-sm.avatar-overflow,
.id-avatar-group.size-sm .avatar-overflow {
  width: 36px; height: 36px;
  min-width: 36px; min-height: 36px;
  font-size: 13px;
}

.size-md.avatar-overflow,
.id-avatar-group.size-md .avatar-overflow {
  width: 44px; height: 44px;
  min-width: 44px; min-height: 44px;
  font-size: 14.5px;
}

.size-lg.avatar-overflow,
.id-avatar-group.size-lg .avatar-overflow {
  width: 56px; height: 56px;
  min-width: 56px; min-height: 56px;
  font-size: 17px;
}

.size-xl.avatar-overflow,
.id-avatar-group.size-xl .avatar-overflow {
  width: 72px; height: 72px;
  min-width: 72px; min-height: 72px;
  font-size: 21px;
}
</style>
