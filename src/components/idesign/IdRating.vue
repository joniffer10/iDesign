<template>
  <div
    :class="['id-rating', `size-${size}`, { 'is-readonly': readonly, 'is-disabled': disabled }]"
    role="radiogroup"
    :aria-label="label || 'Rating'"
  >
    <label v-if="label" class="rating-label">{{ label }}</label>

    <div
      class="stars-row"
      @mouseleave="hoverScore = 0"
    >
      <button
        v-for="index in count"
        :key="index"
        type="button"
        :class="[
          'star-btn',
          {
            filled: currentScore >= index,
            half: allowHalf && currentScore >= index - 0.5 && currentScore < index,
            hovered: hoverScore >= index
          }
        ]"
        :disabled="disabled || readonly"
        :aria-label="`Rate ${index} out of ${count}`"
        :aria-checked="modelValue === index"
        role="radio"
        @mouseenter="onHover(index)"
        @click="selectScore(index)"
        @keydown.right.prevent="stepScore(1)"
        @keydown.left.prevent="stepScore(-1)"
      >
        <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </button>

      <span v-if="showScore" class="score-display">
        {{ (hoverScore || modelValue || 0).toFixed(allowHalf ? 1 : 0) }} / {{ count }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 5
  },
  allowHalf: {
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
  label: String,
  readonly: Boolean,
  disabled: Boolean,
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'hover'])

const hoverScore = ref(0)

const currentScore = computed(() => {
  return hoverScore.value || props.modelValue || 0
})

const onHover = (idx) => {
  if (props.disabled || props.readonly) return
  hoverScore.value = idx
  emit('hover', idx)
}

const selectScore = (idx) => {
  if (props.disabled || props.readonly) return
  const newVal = (props.clearable && props.modelValue === idx) ? 0 : idx
  emit('update:modelValue', newVal)
  emit('change', newVal)
}

const stepScore = (delta) => {
  if (props.disabled || props.readonly) return
  const step = props.allowHalf ? 0.5 : 1
  let next = Math.max(0, Math.min(props.count, (props.modelValue || 0) + delta * step))
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style scoped>
.id-rating {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font);
}

.rating-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}

.stars-row {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.star-btn {
  background: transparent;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: var(--faint);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s cubic-bezier(0.32, 0.72, 0, 1), color 0.15s ease;
  outline: none;
}

.star-btn:hover {
  transform: scale(1.2);
}

.star-btn:focus-visible {
  box-shadow: var(--focus-ring);
  border-radius: 4px;
}

.star-icon {
  width: 22px;
  height: 22px;
}

/* Sizes */
.size-sm .star-icon { width: 16px; height: 16px; }
.size-md .star-icon { width: 22px; height: 22px; }
.size-lg .star-icon { width: 28px; height: 28px; }

.star-btn.filled,
.star-btn.hovered {
  color: #ff9f0a; /* Apple gold/amber star */
}

.score-display {
  font-size: 13px;
  font-weight: 650;
  font-family: var(--mono);
  color: var(--text);
  margin-left: 8px;
}

.is-readonly .star-btn {
  cursor: default;
  pointer-events: none;
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
