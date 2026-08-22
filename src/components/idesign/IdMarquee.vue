<script setup>
import { ref, computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  /** Scrolling direction: 'left', 'right', 'up', 'down' */
  direction: {
    type: String,
    default: 'left',
    validator: (val) => ['left', 'right', 'up', 'down'].includes(val)
  },
  /** Convenience flag for vertical marquee */
  vertical: {
    type: Boolean,
    default: false
  },
  /** Reverse the scroll direction */
  reverse: {
    type: Boolean,
    default: false
  },
  /** Speed preset ('slow', 'normal', 'fast') or seconds as number/string */
  speed: {
    type: [String, Number],
    default: 'normal'
  },
  /** CSS animation duration override (e.g. '30s' or 30) */
  duration: {
    type: [String, Number],
    default: null
  },
  /** Gap between items ('xs', 'sm', 'md', 'lg', 'xl' or custom px/rem string/number) */
  gap: {
    type: [String, Number],
    default: 'md'
  },
  /** Smoothly pause animation on hover */
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  /** Pause animation when children receive focus or interaction */
  pauseOnInteraction: {
    type: Boolean,
    default: false
  },
  /** Manually pause scrolling animation */
  paused: {
    type: Boolean,
    default: false
  },
  /** Disable scrolling completely (static display) */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Number of cloned content sets to render for seamless looping (default 2) */
  repeat: {
    type: [Number, String],
    default: 2
  },
  /** Enable edge fade gradient mask (true, 'sm', 'md', 'lg') */
  fade: {
    type: [Boolean, String],
    default: false
  },
  /** Custom edge fade mask width (e.g. '48px', '12%') */
  fadeWidth: {
    type: [String, Number],
    default: null
  },
  /** Visual variant ('default', 'subtle', 'soft', 'glass', 'hero') */
  variant: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'subtle', 'soft', 'glass', 'hero'].includes(val)
  },
  /** Sizing tier ('sm', 'md', 'lg') */
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  },
  /** Accessibility region label */
  ariaLabel: {
    type: String,
    default: 'Scrolling content marquee'
  },
  /** UI slots & class overrides object */
  ui: {
    type: Object,
    default: () => ({})
  }
})

const config = useIdesignConfig('Marquee', props)
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))

const isHovered = ref(false)
const isFocused = ref(false)

const handleMouseEnter = () => {
  if (props.pauseOnHover && !props.disabled) {
    isHovered.value = true
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const handleFocusIn = () => {
  if (props.pauseOnInteraction && !props.disabled) {
    isFocused.value = true
  }
}

const handleFocusOut = () => {
  isFocused.value = false
}

// Compute repetition count (min 2 for infinite loop)
const repeatCount = computed(() => {
  const parsed = Number(props.repeat)
  return isNaN(parsed) || parsed < 2 ? 2 : parsed
})

// Resolve final scroll direction
const scrollDirection = computed(() => {
  if (props.vertical) {
    return props.reverse ? 'down' : 'up'
  }
  if (props.reverse) {
    return props.direction === 'up' || props.direction === 'down'
      ? (props.direction === 'up' ? 'down' : 'up')
      : 'right'
  }
  return props.direction
})

// Resolve CSS duration string
const computedDuration = computed(() => {
  if (props.duration !== null && props.duration !== undefined && props.duration !== '') {
    return typeof props.duration === 'number' ? `${props.duration}s` : String(props.duration)
  }
  if (typeof props.speed === 'number') {
    return `${props.speed}s`
  }
  switch (props.speed) {
    case 'slow':
      return '45s'
    case 'fast':
      return '12s'
    case 'normal':
    default:
      return typeof props.speed === 'string' && props.speed.endsWith('s')
        ? props.speed
        : !isNaN(Number(props.speed))
        ? `${props.speed}s`
        : '25s'
  }
})

// Resolve gap spacing string
const computedGap = computed(() => {
  if (typeof props.gap === 'number') {
    return `${props.gap}px`
  }
  switch (props.gap) {
    case 'xs':
      return '8px'
    case 'sm':
      return '12px'
    case 'md':
      return '20px'
    case 'lg':
      return '32px'
    case 'xl':
      return '48px'
    default:
      return String(props.gap)
  }
})

// Resolve edge fade width
const computedFadeWidth = computed(() => {
  if (props.fadeWidth !== null && props.fadeWidth !== undefined && props.fadeWidth !== '') {
    return typeof props.fadeWidth === 'number' ? `${props.fadeWidth}px` : String(props.fadeWidth)
  }
  if (typeof props.fade === 'string') {
    switch (props.fade) {
      case 'sm':
        return '24px'
      case 'lg':
        return '64px'
      case 'md':
      default:
        return '40px'
    }
  }
  return '40px'
})

// Resolved animation pause state
const isPaused = computed(() => {
  return props.disabled || props.paused || isHovered.value || isFocused.value
})

// Dynamic CSS custom properties
const marqueeStyle = computed(() => ({
  '--marquee-duration': computedDuration.value,
  '--marquee-gap': computedGap.value,
  '--marquee-repeat': repeatCount.value,
  '--marquee-fade-width': computedFadeWidth.value
}))
</script>

<template>
  <div
    :class="[
      'id-marquee',
      `variant-${currentVariant}`,
      `size-${size}`,
      `direction-${scrollDirection}`,
      {
        'is-vertical': vertical || scrollDirection === 'up' || scrollDirection === 'down',
        'is-paused': isPaused,
        'pause-on-hover': pauseOnHover && !disabled,
        'pause-on-interaction': pauseOnInteraction && !disabled,
        'has-fade': !!fade,
        'is-disabled': disabled
      },
      ui.base
    ]"
    :style="marqueeStyle"
    :aria-label="ariaLabel"
    role="region"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <!-- Optional edge fade gradient overlays for browser safety -->
    <div
      v-if="fade"
      :class="['marquee-fade-overlay marquee-fade-start', ui.fadeStart]"
      aria-hidden="true"
    />
    <div
      v-if="fade"
      :class="['marquee-fade-overlay marquee-fade-end', ui.fadeEnd]"
      aria-hidden="true"
    />

    <!-- Scrolling Track Container -->
    <div
      :class="[
        'marquee-track',
        { 'is-animating': !disabled && !isPaused },
        ui.track
      ]"
    >
      <!-- Repeated Sets for Imperceptible Looping -->
      <div
        v-for="i in repeatCount"
        :key="i"
        :class="['marquee-content', ui.content]"
        :aria-hidden="i > 1 ? 'true' : undefined"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Main Marquee Container ── */
.id-marquee {
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  user-select: none;
}

.id-marquee.is-vertical {
  height: 100%;
  min-height: 220px;
  flex-direction: column;
}

/* ── Variants (Liquid Glass Design System) ── */
.id-marquee.variant-default {
  background: transparent;
}

.id-marquee.variant-subtle {
  background: var(--hover, #fbfbfd);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  border-radius: var(--r-panel, 22px);
}

.id-marquee.variant-soft {
  background: var(--surface, #ffffff);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  border-radius: var(--r-panel, 22px);
  box-shadow: var(--sh-card, 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05));
}

.id-marquee.variant-glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  border-radius: var(--r-panel, 22px);
  box-shadow: var(--sh-panel, 0 1px 3px rgba(0,0,0,0.05), 0 14px 40px rgba(0,0,0,0.05));
}

.id-marquee.variant-hero {
  background: var(--surface, #ffffff);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  border-radius: var(--r-hero, 26px);
  box-shadow: var(--sh-panel, 0 1px 3px rgba(0,0,0,0.05), 0 14px 40px rgba(0,0,0,0.05));
}

/* Dark Mode Variant Overrides */
:root.dark .id-marquee.variant-subtle,
html[data-theme="dark"] .id-marquee.variant-subtle {
  background: rgba(255, 255, 255, 0.03);
  border-color: var(--hairline, rgba(255, 255, 255, 0.12));
}

:root.dark .id-marquee.variant-soft,
html[data-theme="dark"] .id-marquee.variant-soft {
  background: var(--surface, #1c1c1e);
  border-color: var(--hairline, rgba(255, 255, 255, 0.12));
}

:root.dark .id-marquee.variant-glass,
html[data-theme="dark"] .id-marquee.variant-glass {
  background: rgba(28, 28, 30, 0.72);
  border-color: var(--hairline, rgba(255, 255, 255, 0.12));
}

:root.dark .id-marquee.variant-hero,
html[data-theme="dark"] .id-marquee.variant-hero {
  background: var(--surface, #1c1c1e);
  border-color: var(--hairline, rgba(255, 255, 255, 0.12));
}

/* ── Sizes ── */
.id-marquee.size-sm {
  padding: 6px 10px;
}

.id-marquee.size-md {
  padding: 12px 16px;
}

.id-marquee.size-lg {
  padding: 18px 24px;
}

/* ── Edge Fade Mask Effect ── */
.id-marquee.has-fade:not(.is-vertical) {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black var(--marquee-fade-width, 40px),
    black calc(100% - var(--marquee-fade-width, 40px)),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black var(--marquee-fade-width, 40px),
    black calc(100% - var(--marquee-fade-width, 40px)),
    transparent 100%
  );
}

.id-marquee.has-fade.is-vertical {
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black var(--marquee-fade-width, 40px),
    black calc(100% - var(--marquee-fade-width, 40px)),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black var(--marquee-fade-width, 40px),
    black calc(100% - var(--marquee-fade-width, 40px)),
    transparent 100%
  );
}

/* ── Track & Content Layout ── */
.marquee-track {
  display: flex;
  flex-direction: row;
  width: max-content;
  gap: var(--marquee-gap, 20px);
  will-change: transform;
}

.id-marquee.is-vertical .marquee-track {
  flex-direction: column;
  height: max-content;
  width: 100%;
}

.marquee-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  gap: var(--marquee-gap, 20px);
}

.id-marquee.is-vertical .marquee-content {
  flex-direction: column;
}

/* ── Keyframe Animations ── */
.id-marquee.direction-left .marquee-track.is-animating {
  animation: id-marquee-left var(--marquee-duration, 25s) linear infinite;
}

.id-marquee.direction-right .marquee-track.is-animating {
  animation: id-marquee-right var(--marquee-duration, 25s) linear infinite;
}

.id-marquee.direction-up .marquee-track.is-animating {
  animation: id-marquee-up var(--marquee-duration, 25s) linear infinite;
}

.id-marquee.direction-down .marquee-track.is-animating {
  animation: id-marquee-down var(--marquee-duration, 25s) linear infinite;
}

@keyframes id-marquee-left {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(calc(-100% / var(--marquee-repeat, 2)), 0, 0);
  }
}

@keyframes id-marquee-right {
  0% {
    transform: translate3d(calc(-100% / var(--marquee-repeat, 2)), 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes id-marquee-up {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, calc(-100% / var(--marquee-repeat, 2)), 0);
  }
}

@keyframes id-marquee-down {
  0% {
    transform: translate3d(0, calc(-100% / var(--marquee-repeat, 2)), 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

/* ── Pause State ── */
.id-marquee.is-paused .marquee-track {
  animation-play-state: paused !important;
}

/* ── Accessibility: Reduced Motion ── */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none !important;
    transform: none !important;
  }
}
</style>
