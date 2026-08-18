<template>
  <div
    :class="[
      'id-rating',
      `size-${currentSize}`,
      `color-${colorPreset}`,
      {
        'is-readonly': readonly,
        'is-disabled': disabled,
        'is-interactive': !readonly && !disabled,
        'has-custom-color': isCustomColor
      },
      config.mergedUi.value.base
    ]"
    :style="customColorStyle"
    role="radiogroup"
    :aria-label="ariaGroupLabel"
    :aria-valuenow="modelValue"
    :aria-valuemin="0"
    :aria-valuemax="totalStars"
    :aria-disabled="disabled ? 'true' : undefined"
    :aria-readonly="readonly ? 'true' : undefined"
    @mouseleave="onMouseLeave"
  >
    <!-- Optional Label -->
    <div
      v-if="label || $slots.label || $slots.default"
      :class="['rating-label', config.mergedUi.value.label]"
    >
      <slot name="label">
        <slot>{{ label }}</slot>
      </slot>
    </div>

    <div class="rating-body">
      <!-- Stars Row -->
      <div
        :class="['stars-row', config.mergedUi.value.stars]"
        @focusout="onFocusOut"
      >
        <div
          v-for="index in totalStars"
          :key="index"
          :class="[
            'star-wrapper',
            getStarStateClass(index),
            config.mergedUi.value.star,
            {
              [config.mergedUi.value.active]: getStarFillRatio(index) > 0,
              [config.mergedUi.value.inactive]: getStarFillRatio(index) === 0,
              [config.mergedUi.value.hover]: hoverScore > 0 && getStarFillRatio(index, true) > 0
            }
          ]"
        >
          <button
            type="button"
            class="star-btn"
            :disabled="disabled || readonly"
            :tabindex="getTabIndex(index)"
            :aria-label="getStarAriaLabel(index)"
            :aria-checked="isStarChecked(index)"
            role="radio"
            @mousemove="onStarMouseMove($event, index)"
            @mouseenter="onStarMouseEnter($event, index)"
            @click="onStarClick($event, index)"
            @keydown="onKeyDown($event, index)"
            @focus="onStarFocus(index)"
          >
            <!-- Custom Slot or Default Star Icon -->
            <slot
              name="item"
              :index="index"
              :value="index"
              :filled="getStarFillRatio(index) === 1"
              :half="getStarFillRatio(index) > 0 && getStarFillRatio(index) < 1"
              :active="displayScore >= index"
              :hover="hoverScore > 0 && hoverScore >= index"
              :ratio="getStarFillRatio(index)"
            >
              <slot
                name="star"
                :index="index"
                :filled="getStarFillRatio(index) === 1"
                :half="getStarFillRatio(index) > 0 && getStarFillRatio(index) < 1"
                :ratio="getStarFillRatio(index)"
              >
                <div class="star-icon-container">
                  <!-- Inactive Empty Star Layer -->
                  <Star
                    class="star-icon star-icon-empty"
                    :size="iconPixelSize"
                    aria-hidden="true"
                  />

                  <!-- Active Filled / Clipped Star Layer -->
                  <div
                    class="star-icon-fill-wrapper"
                    :style="{ width: `${getStarFillRatio(index) * 100}%` }"
                    aria-hidden="true"
                  >
                    <Star
                      class="star-icon star-icon-filled"
                      :size="iconPixelSize"
                    />
                  </div>
                </div>
              </slot>
            </slot>
          </button>
        </div>
      </div>

      <!-- Optional Value / Score Display -->
      <span
        v-if="showScore || showValue || $slots.value || $slots.score"
        :class="['rating-score', config.mergedUi.value.score || config.mergedUi.value.value]"
        aria-live="polite"
      >
        <slot
          name="value"
          :value="displayScore"
          :display-value="formattedDisplayScore"
          :max="totalStars"
          :is-hovered="hoverScore > 0"
        >
          <slot
            name="score"
            :score="displayScore"
            :display-score="formattedDisplayScore"
            :max="totalStars"
          >
            {{ formattedDisplayScore }} <span class="score-max">/ {{ totalStars }}</span>
          </slot>
        </slot>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Star } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: undefined
  },
  count: {
    type: Number,
    default: undefined
  },
  allowHalf: {
    type: Boolean,
    default: false
  },
  half: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  showScore: {
    type: Boolean,
    default: false
  },
  showValue: {
    type: Boolean,
    default: false
  },
  scoreFormat: {
    type: [Function, String],
    default: undefined
  },
  label: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: undefined,
    validator: v => !v || ['xs', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  color: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'hover', 'clear'])

const config = useIdesignConfig('Rating', props)

const totalStars = computed(() => {
  const c = props.max !== undefined ? props.max : props.count
  const num = Number(c)
  return isNaN(num) || num <= 0 ? 5 : Math.floor(num)
})

const isHalfAllowed = computed(() => props.allowHalf || props.half)

const currentSize = computed(() => {
  const s = props.size || config.resolvedSize.value || 'md'
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(s) ? s : 'md'
})

const iconPixelSize = computed(() => {
  switch (currentSize.value) {
    case 'xs': return 14
    case 'sm': return 18
    case 'lg': return 28
    case 'xl': return 34
    case 'md':
    default: return 22
  }
})

const resolvedColorProp = computed(() => props.color || config.resolvedColor.value || 'amber')

const colorPreset = computed(() => {
  const c = resolvedColorProp.value
  if (!c || c === 'amber' || c === 'gold' || c === 'warning') return 'amber'
  if (c === 'blue' || c === 'primary' || c === 'accent') return 'blue'
  if (c === 'green' || c === 'success') return 'green'
  if (c === 'red' || c === 'danger' || c === 'error') return 'red'
  if (c === 'orange' || c === 'heat') return 'orange'
  if (c === 'purple' || c === 'indigo') return 'purple'
  return 'custom'
})

const isCustomColor = computed(() => colorPreset.value === 'custom')

const customColorStyle = computed(() => {
  if (isCustomColor.value && resolvedColorProp.value) {
    return {
      '--id-rating-active-color': resolvedColorProp.value
    }
  }
  return {}
})

const hoverScore = ref(0)
const focusedIndex = ref(null)

const displayScore = computed(() => {
  if (hoverScore.value > 0) return hoverScore.value
  return typeof props.modelValue === 'number' ? props.modelValue : 0
})

const formattedDisplayScore = computed(() => {
  const score = displayScore.value
  if (typeof props.scoreFormat === 'function') {
    return props.scoreFormat(score)
  }
  return score.toFixed(isHalfAllowed.value ? (Number.isInteger(score) ? 0 : 1) : 0)
})

const ariaGroupLabel = computed(() => {
  if (props.label) return props.label
  return `Rating: ${props.modelValue || 0} of ${totalStars.value} stars`
})

function calculateHoverScore(event, starIndex) {
  if (!isHalfAllowed.value) return starIndex
  const target = event.currentTarget
  if (!target) return starIndex
  const rect = target.getBoundingClientRect()
  const offsetX = event.clientX - rect.left
  const isLeftHalf = offsetX <= rect.width / 2
  return isLeftHalf ? starIndex - 0.5 : starIndex
}

function getStarFillRatio(starIndex, useHover = false) {
  const score = useHover ? (hoverScore.value || 0) : displayScore.value
  if (score >= starIndex) return 1
  if (score >= starIndex - 0.5 && score < starIndex) return 0.5
  return 0
}

function getStarStateClass(starIndex) {
  const ratio = getStarFillRatio(starIndex)
  if (ratio === 1) return 'is-filled'
  if (ratio === 0.5) return 'is-half'
  return 'is-empty'
}

function getTabIndex(starIndex) {
  if (props.disabled) return -1
  if (props.readonly) return -1

  const currentVal = Math.ceil(props.modelValue || 0)
  if (currentVal === 0 && starIndex === 1) return 0
  if (currentVal === starIndex) return 0
  if (currentVal > totalStars.value && starIndex === totalStars.value) return 0
  return -1
}

function isStarChecked(starIndex) {
  const val = props.modelValue || 0
  return val >= starIndex - 0.5 && val <= starIndex
}

function getStarAriaLabel(starIndex) {
  if (isHalfAllowed.value) {
    return `${starIndex} stars`
  }
  return `Rate ${starIndex} out of ${totalStars.value} stars`
}

function onStarMouseEnter(event, starIndex) {
  if (props.disabled || props.readonly) return
  const score = calculateHoverScore(event, starIndex)
  hoverScore.value = score
  emit('hover', score)
}

function onStarMouseMove(event, starIndex) {
  if (props.disabled || props.readonly) return
  const score = calculateHoverScore(event, starIndex)
  if (hoverScore.value !== score) {
    hoverScore.value = score
    emit('hover', score)
  }
}

function onMouseLeave() {
  if (props.disabled || props.readonly) return
  if (hoverScore.value !== 0) {
    hoverScore.value = 0
    emit('hover', 0)
  }
}

function onStarClick(event, starIndex) {
  if (props.disabled || props.readonly) return
  const targetScore = calculateHoverScore(event, starIndex)
  const currentVal = props.modelValue || 0

  if (props.clearable && currentVal === targetScore) {
    emit('update:modelValue', 0)
    emit('change', 0)
    emit('clear')
  } else {
    emit('update:modelValue', targetScore)
    emit('change', targetScore)
  }
}

function onStarFocus(starIndex) {
  focusedIndex.value = starIndex
}

function onFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    focusedIndex.value = null
  }
}

function onKeyDown(event, starIndex) {
  if (props.disabled || props.readonly) return

  const step = isHalfAllowed.value ? 0.5 : 1
  let currentVal = typeof props.modelValue === 'number' ? props.modelValue : 0

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp': {
      event.preventDefault()
      const next = Math.min(totalStars.value, currentVal + step)
      emit('update:modelValue', next)
      emit('change', next)
      break
    }
    case 'ArrowLeft':
    case 'ArrowDown': {
      event.preventDefault()
      const next = Math.max(0, currentVal - step)
      emit('update:modelValue', next)
      emit('change', next)
      break
    }
    case 'Home': {
      event.preventDefault()
      emit('update:modelValue', 0)
      emit('change', 0)
      break
    }
    case 'End': {
      event.preventDefault()
      emit('update:modelValue', totalStars.value)
      emit('change', totalStars.value)
      break
    }
    case 'Enter':
    case ' ': {
      event.preventDefault()
      if (props.clearable && currentVal === starIndex) {
        emit('update:modelValue', 0)
        emit('change', 0)
        emit('clear')
      } else {
        emit('update:modelValue', starIndex)
        emit('change', starIndex)
      }
      break
    }
  }
}
</script>

<style scoped>
.id-rating {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif);
  user-select: none;
  vertical-align: middle;
}

.rating-label {
  font-size: 13px;
  font-weight: 590;
  letter-spacing: -0.01em;
  color: var(--text-2, #6e6e73);
  line-height: 1.3;
}

.rating-body {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.stars-row {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Star wrapper */
.star-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Star Button & Apple HIG 44px Touch Target */
.star-btn {
  position: relative;
  background: transparent;
  border: none;
  padding: 2px;
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--r-chip, 6px);
  outline: none;
  transition: transform 0.2s cubic-bezier(0.32, 0.72, 0, 1), color 0.15s ease;
  color: var(--faint, #d2d2d7);
  -webkit-tap-highlight-color: transparent;
}

/* Ensure 44x44px minimum touch hit target for Apple HIG */
.star-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 44px;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

.is-interactive .star-btn:hover {
  transform: scale(1.15);
}

.is-interactive .star-btn:active {
  transform: scale(0.95);
}

.star-btn:focus-visible {
  box-shadow: var(--focus-ring, 0 0 0 3px rgba(0, 113, 227, 0.35));
}

/* Icon layers */
.star-icon-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.star-icon {
  display: block;
  flex-shrink: 0;
  transition: fill 0.15s ease, stroke 0.15s ease, color 0.15s ease;
}

/* Empty Star Styling */
.star-icon-empty {
  color: var(--faint, #d2d2d7);
  fill: var(--track, #e8e8ed);
  stroke: var(--hairline, rgba(0, 0, 0, 0.12));
  stroke-width: 1.5;
}

/* Filled Star Clipping Layer */
.star-icon-fill-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  transition: width 0.18s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  align-items: center;
}

.star-icon-filled {
  color: var(--rating-active-color, #ff9f0a);
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 1;
}

/* ── Color Variants ── */
.color-amber {
  --rating-active-color: var(--warning, #ff9f0a);
}

.color-blue {
  --rating-active-color: var(--accent, #0071e3);
}

.color-green {
  --rating-active-color: var(--success, #30d158);
}

.color-red {
  --rating-active-color: var(--danger, #ff3b30);
}

.color-orange {
  --rating-active-color: var(--heat, #ff6b00);
}

.color-purple {
  --rating-active-color: var(--indigo, #5e5ce6);
}

.color-custom,
.has-custom-color {
  --rating-active-color: var(--id-rating-active-color, #ff9f0a);
}

/* ── Sizing Scale ── */
.size-xs .stars-row { gap: 3px; }
.size-xs .rating-label { font-size: 11.5px; }
.size-xs .rating-score { font-size: 11.5px; }

.size-sm .stars-row { gap: 4px; }
.size-sm .rating-label { font-size: 12.5px; }
.size-sm .rating-score { font-size: 12.5px; }

.size-md .stars-row { gap: 5px; }
.size-md .rating-label { font-size: 13px; }
.size-md .rating-score { font-size: 13.5px; }

.size-lg .stars-row { gap: 6px; }
.size-lg .rating-label { font-size: 14.5px; }
.size-lg .rating-score { font-size: 15px; }

.size-xl .stars-row { gap: 8px; }
.size-xl .rating-label { font-size: 16px; }
.size-xl .rating-score { font-size: 17px; }

/* ── Score / Value Display ── */
.rating-score {
  font-weight: 600;
  font-family: var(--mono, 'JetBrains Mono', ui-monospace, monospace);
  font-variant-numeric: tabular-nums;
  color: var(--text, #1d1d1f);
  letter-spacing: -0.02em;
  margin-left: 4px;
}

.score-max {
  font-weight: 500;
  color: var(--text-3, #86868b);
}

/* ── Disabled & Readonly States ── */
.is-readonly .star-btn {
  cursor: default;
  pointer-events: none;
}

.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.is-disabled .star-btn {
  cursor: not-allowed;
}

/* Dark Mode Fine-Tuning */
:root.dark .star-icon-empty,
[data-theme="dark"] .star-icon-empty {
  color: var(--faint, #3a3a3c);
  fill: #2c2c2e;
  stroke: rgba(255, 255, 255, 0.12);
}
</style>
