<template>
  <div
    :class="[
      'id-stepper',
      `orientation-${currentOrientation}`,
      `size-${currentSize}`,
      `variant-${currentVariant}`,
      `color-${currentColor}`,
      config.mergedUi.value.base
    ]"
    role="navigation"
    aria-label="Progress steps"
  >
    <div
      v-for="(step, idx) in steps"
      :key="idx"
      :class="[
        'step-item',
        `step-status-${getStepStatus(step, idx)}`,
        {
          'is-active': getStepStatus(step, idx) === 'active',
          'is-completed': getStepStatus(step, idx) === 'completed',
          'is-error': getStepStatus(step, idx) === 'error',
          'is-disabled': isStepDisabled(step),
          'is-clickable': clickable && !isStepDisabled(step),
          'is-last': idx === steps.length - 1
        },
        config.mergedUi.value.item
      ]"
      :aria-current="getStepStatus(step, idx) === 'active' ? 'step' : undefined"
      :aria-disabled="isStepDisabled(step) ? 'true' : undefined"
      :tabindex="clickable && !isStepDisabled(step) ? 0 : undefined"
      @click="clickable && !isStepDisabled(step) && $emit('update:modelValue', idx)"
      @keydown.enter="clickable && !isStepDisabled(step) && $emit('update:modelValue', idx)"
      @keydown.space.prevent="clickable && !isStepDisabled(step) && $emit('update:modelValue', idx)"
    >
      <!-- Vertical Indicator + Spine Wrapper -->
      <div v-if="currentOrientation === 'vertical'" class="step-indicator-spine">
        <div :class="['step-indicator', config.mergedUi.value.indicator]">
          <slot
            name="indicator"
            :step="step"
            :index="idx"
            :status="getStepStatus(step, idx)"
            :active="getStepStatus(step, idx) === 'active'"
            :completed="getStepStatus(step, idx) === 'completed'"
            :error="getStepStatus(step, idx) === 'error'"
          >
            <AlertCircle v-if="getStepStatus(step, idx) === 'error'" :size="iconSize" :class="['error-icon', config.mergedUi.value.icon]" />
            <Check v-else-if="getStepStatus(step, idx) === 'completed'" :size="iconSize" :class="['check-icon', config.mergedUi.value.icon]" />
            <component
              :is="step.icon"
              v-else-if="step.icon && isComponent(step.icon)"
              :size="iconSize"
              :class="['step-custom-icon', config.mergedUi.value.icon]"
            />
            <span v-else-if="typeof step.icon === 'string'" :class="['step-str-icon', config.mergedUi.value.icon]">{{ step.icon }}</span>
            <span v-else class="step-num">{{ idx + 1 }}</span>
          </slot>
        </div>
        <div v-if="idx < steps.length - 1" :class="['step-connector', config.mergedUi.value.connector]" />
      </div>

      <!-- Horizontal Indicator -->
      <div v-else :class="['step-indicator', config.mergedUi.value.indicator]">
        <slot
          name="indicator"
          :step="step"
          :index="idx"
          :status="getStepStatus(step, idx)"
          :active="getStepStatus(step, idx) === 'active'"
          :completed="getStepStatus(step, idx) === 'completed'"
          :error="getStepStatus(step, idx) === 'error'"
        >
          <AlertCircle v-if="getStepStatus(step, idx) === 'error'" :size="iconSize" :class="['error-icon', config.mergedUi.value.icon]" />
          <Check v-else-if="getStepStatus(step, idx) === 'completed'" :size="iconSize" :class="['check-icon', config.mergedUi.value.icon]" />
          <component
            :is="step.icon"
            v-else-if="step.icon && isComponent(step.icon)"
            :size="iconSize"
            :class="['step-custom-icon', config.mergedUi.value.icon]"
          />
          <span v-else-if="typeof step.icon === 'string'" :class="['step-str-icon', config.mergedUi.value.icon]">{{ step.icon }}</span>
          <span v-else class="step-num">{{ idx + 1 }}</span>
        </slot>
      </div>

      <!-- Step Content (Title & Description) -->
      <div :class="['step-content', config.mergedUi.value.content]">
        <slot name="content" :step="step" :index="idx">
          <slot name="title" :step="step" :index="idx">
            <span :class="['step-label', config.mergedUi.value.title]">{{ stepTitle(step) }}</span>
          </slot>
          <slot name="description" :step="step" :index="idx">
            <span v-if="step.description" :class="['step-desc', config.mergedUi.value.description]">
              {{ step.description }}
            </span>
          </slot>
        </slot>
      </div>

      <!-- Horizontal Connector Line -->
      <div
        v-if="currentOrientation === 'horizontal' && idx < steps.length - 1"
        :class="['step-connector', config.mergedUi.value.connector]"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Check, AlertCircle } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  steps: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
  orientation: {
    type: String,
    default: undefined,
    validator: v => ['horizontal', 'vertical'].includes(v)
  },
  clickable: Boolean,
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  color: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

defineEmits(['update:modelValue'])

const config = useIdesignConfig('Stepper', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')
const currentColor = computed(() => config.resolvedColor.value || 'blue')
const currentOrientation = computed(() => props.orientation || config.resolvedDirection.value || 'horizontal')

const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'sm' ? 13 : sz === 'lg' ? 18 : 15
})

const getStepStatus = (step, idx) => {
  if (typeof step === 'object' && step !== null) {
    if (step.status) return step.status
    if (step.error) return 'error'
  }
  if (idx < props.modelValue) return 'completed'
  if (idx === props.modelValue) return 'active'
  return 'pending'
}

const isStepDisabled = (step) => {
  return typeof step === 'object' && step !== null && !!step.disabled
}

const stepTitle = (step) => {
  if (typeof step === 'object' && step !== null) {
    return step.label || step.title || ''
  }
  return String(step || '')
}

const isComponent = (val) => typeof val === 'object' || typeof val === 'function'
</script>

<style scoped>
.id-stepper {
  display: flex;
  width: 100%;
  font-family: var(--font);
  box-sizing: border-box;
}

/* ──────────────────────────────────────────────────────────
   HORIZONTAL ORIENTATION (Default)
   ────────────────────────────────────────────────────────── */
.orientation-horizontal {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.orientation-horizontal .step-item {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  position: relative;
  min-width: 0;
}

.orientation-horizontal .step-item.is-last {
  flex: 0 0 auto;
}

.orientation-horizontal .step-connector {
  flex: 1;
  height: 2px;
  background: var(--hairline);
  margin: 0 10px;
  border-radius: 999px;
  transition: background 0.25s ease;
  min-width: 20px;
}

.orientation-horizontal .step-item.is-completed .step-connector {
  background: var(--live, #30d158);
}

/* ──────────────────────────────────────────────────────────
   VERTICAL ORIENTATION
   ────────────────────────────────────────────────────────── */
.orientation-vertical {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
}

.orientation-vertical .step-item {
  display: flex;
  align-items: stretch;
  gap: 14px;
  position: relative;
  min-height: 52px;
}

.orientation-vertical .step-indicator-spine {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.orientation-vertical .step-connector {
  width: 2px;
  flex: 1;
  background: var(--hairline);
  margin: 4px 0;
  border-radius: 999px;
  min-height: 22px;
  transition: background 0.25s ease;
}

.orientation-vertical .step-item.is-completed .step-connector {
  background: var(--live, #30d158);
}

.orientation-vertical .step-content {
  padding-bottom: 22px;
  justify-content: flex-start;
}

.orientation-vertical .step-item.is-last .step-content {
  padding-bottom: 0;
}

.orientation-vertical .step-label {
  white-space: normal;
  line-height: 1.35;
}

/* ──────────────────────────────────────────────────────────
   VARIANTS — 1:1 aligned with Liquid Glass design system
   ────────────────────────────────────────────────────────── */
.variant-glass {
  padding: 16px 20px;
  border-radius: var(--r-panel);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  border: 1px solid var(--hairline);
  box-shadow: var(--sh-card);
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.65);
}

.variant-subtle {
  padding: 14px 18px;
  border-radius: var(--r-panel);
  background: var(--track);
}

.variant-card {
  padding: 16px 20px;
  border-radius: var(--r-card);
  background: var(--surface);
  border: 1px solid var(--hairline);
  box-shadow: var(--sh-card);
}

.variant-pill {
  padding: 10px 20px;
  border-radius: var(--r-pill);
  background: var(--surface);
  border: 1px solid var(--hairline);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

/* ──────────────────────────────────────────────────────────
   STEP INDICATOR & STATUSES
   ────────────────────────────────────────────────────────── */
.step-item {
  position: relative;
  outline: none;
}

.step-item.is-clickable {
  cursor: pointer;
}

.step-indicator {
  border-radius: 50%;
  background: var(--hover);
  border: 1px solid var(--hairline);
  color: var(--text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
  transition: all 0.2s var(--ease-out-quart);
  user-select: none;
}

/* Size Variants (xs, sm, md, lg, xl) */
.size-xs .step-indicator { width: 22px; height: 22px; font-size: 10px; }
.size-sm .step-indicator { width: 26px; height: 26px; font-size: 11.5px; }
.size-md .step-indicator { width: 32px; height: 32px; font-size: 13.5px; }
.size-lg .step-indicator { width: 40px; height: 40px; font-size: 16px; }
.size-xl .step-indicator { width: 48px; height: 48px; font-size: 18px; }

/* Active Step */
.step-item.is-active .step-indicator {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.16);
}

.color-primary .step-item.is-active .step-indicator,
.color-blue .step-item.is-active .step-indicator {
  background: var(--accent);
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.16);
}
.color-green .step-item.is-active .step-indicator,
.color-success .step-item.is-active .step-indicator {
  background: #34c759;
  box-shadow: 0 0 0 4px rgba(52, 199, 89, 0.18);
}
.color-purple .step-item.is-active .step-indicator {
  background: #af52de;
  box-shadow: 0 0 0 4px rgba(175, 82, 222, 0.18);
}
.color-orange .step-item.is-active .step-indicator,
.color-warning .step-item.is-active .step-indicator {
  background: #ff9500;
  box-shadow: 0 0 0 4px rgba(255, 149, 0, 0.18);
}
.color-red .step-item.is-active .step-indicator,
.color-danger .step-item.is-active .step-indicator {
  background: #ff3b30;
  box-shadow: 0 0 0 4px rgba(255, 59, 48, 0.18);
}

/* Completed Step */
.step-item.is-completed .step-indicator {
  background: var(--live, #30d158);
  color: #ffffff;
  border-color: transparent;
}

/* Error Step */
.step-item.is-error .step-indicator {
  background: var(--danger, #ff3b30);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 0 0 4px rgba(255, 59, 48, 0.18);
}

/* Disabled Step */
.step-item.is-disabled {
  opacity: 0.45;
  cursor: not-allowed !important;
  pointer-events: none;
}

/* Focus Visibility */
.step-item:focus-visible .step-indicator {
  box-shadow: var(--focus-ring);
}

/* ──────────────────────────────────────────────────────────
   STEP CONTENT & TYPOGRAPHY
   ────────────────────────────────────────────────────────── */
.step-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.size-xs .step-label { font-size: 11.5px; }
.size-sm .step-label { font-size: 12.5px; }
.size-md .step-label { font-size: 14px; }
.size-lg .step-label { font-size: 15.5px; }
.size-xl .step-label { font-size: 17px; }

.step-label {
  font-weight: 650;
  color: var(--text-2);
  white-space: nowrap;
  letter-spacing: var(--tracking-tight, -0.02em);
  transition: color 0.15s ease;
}

.step-item.is-active .step-label,
.step-item.is-completed .step-label {
  color: var(--text);
}

.step-item.is-error .step-label {
  color: var(--danger, #ff3b30);
}

.step-desc {
  font-size: 12px;
  color: var(--text-3);
  margin-top: 2px;
  line-height: 1.4;
}

.size-xs .step-desc { font-size: 10px; }
.size-sm .step-desc { font-size: 11px; }
.size-lg .step-desc { font-size: 13px; }
.size-xl .step-desc { font-size: 14.5px; }

.check-icon,
.error-icon,
.step-custom-icon {
  flex-shrink: 0;
}

/* ──────────────────────────────────────────────────────────
   RESPONSIVE BEHAVIOR
   ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .orientation-horizontal {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
}
</style>
