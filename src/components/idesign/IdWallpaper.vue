<template>
  <component
    :is="as"
    :class="[
      'id-wallpaper-root',
      {
        'is-fixed': fixed,
        'is-wrapper': hasContent,
        'is-animated': resolvedAnimated,
        'is-dark': isDark,
        'dark': isDark
      },
      `mask-${mask}`,
      `intensity-${intensityPreset}`,
      config.mergedUi.value.base
    ]"
    :style="rootStyle"
    :aria-hidden="hasContent ? undefined : 'true'"
    :role="hasContent ? undefined : 'presentation'"
    :data-theme="isDark ? 'dark' : (theme === 'light' ? 'light' : undefined)"
  >
    <!-- Background Canvas & Graphic Layers (Purely Decorative) -->
    <div
      class="id-wallpaper-canvas"
      :class="[
        `variant-${currentVariant}`,
        { 'is-dark': isDark },
        config.mergedUi.value.canvas || config.mergedUi.value.gradient
      ]"
      :style="canvasStyle"
      aria-hidden="true"
    >
      <!-- Preset 1: Solid Color Ground -->
      <div
        v-if="currentVariant === 'solid'"
        class="wallpaper-layer layer-solid"
        :style="{ backgroundColor: solidColor }"
      />

      <!-- Preset 2: Linear / Angular Gradient -->
      <div
        v-else-if="currentVariant === 'gradient'"
        class="wallpaper-layer layer-gradient"
        :style="{ background: computedGradient }"
      />

      <!-- Preset 3: Ambient Liquid Mesh Gradient -->
      <div
        v-else-if="currentVariant === 'mesh'"
        :class="['wallpaper-layer layer-mesh', config.mergedUi.value.mesh]"
        :style="meshStyle"
      >
        <div class="mesh-orb mesh-orb-1" :style="meshOrb1Style" />
        <div class="mesh-orb mesh-orb-2" :style="meshOrb2Style" />
        <div class="mesh-orb mesh-orb-3" :style="meshOrb3Style" />
        <div class="mesh-orb mesh-orb-4" :style="meshOrb4Style" />
      </div>

      <!-- Preset 4: Spotlight / Radial Glow -->
      <div
        v-else-if="currentVariant === 'radial'"
        class="wallpaper-layer layer-radial"
        :style="radialStyle"
      />

      <!-- Preset 5: Flowing Liquid Aurora -->
      <div
        v-else-if="currentVariant === 'aurora'"
        :class="['wallpaper-layer layer-aurora', { 'is-drifting': resolvedAnimated }, config.mergedUi.value.aurora]"
        :style="auroraContainerStyle"
      >
        <div class="aurora-beam aurora-beam-blue" :style="auroraBeam1Style" />
        <div class="aurora-beam aurora-beam-indigo" :style="auroraBeam2Style" />
        <div class="aurora-beam aurora-beam-cyan" :style="auroraBeam3Style" />
        <div class="aurora-beam aurora-beam-warm" :style="auroraBeam4Style" />
      </div>

      <!-- Preset 6: Ambient Glow Orb -->
      <div
        v-else-if="currentVariant === 'glow'"
        :class="['wallpaper-layer layer-glow', config.mergedUi.value.glow]"
        :style="glowStyle"
      >
        <div class="glow-orb primary-glow" :style="primaryGlowStyle" />
        <div class="glow-orb secondary-glow" :style="secondaryGlowStyle" />
      </div>

      <!-- Preset 7: Fine Grain Noise -->
      <div
        v-else-if="currentVariant === 'noise'"
        :class="['wallpaper-layer layer-noise', config.mergedUi.value.noise]"
        :style="noiseStyle"
      >
        <div class="noise-svg-pattern" :style="noisePatternStyle" />
      </div>

      <!-- Preset 8: Decorative Image Backdrop -->
      <div
        v-else-if="currentVariant === 'image'"
        :class="['wallpaper-layer layer-image', config.mergedUi.value.image]"
        :style="imageLayerStyle"
      >
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="imageAlt || ''"
          class="wallpaper-img"
          :style="imageElementStyle"
          loading="lazy"
        />
      </div>

      <!-- Texture / Pattern Layer (Noise texture overlay when enabled) -->
      <div
        v-if="noise || currentVariant === 'noise'"
        class="wallpaper-grain-overlay"
        :style="{ opacity: noiseOpacity }"
      />

      <!-- Decorative Overlay Scrim / Vignette / Grid / Frosted Glass -->
      <div
        v-if="effectiveOverlay !== 'none'"
        :class="['wallpaper-overlay', `overlay-${effectiveOverlay}`, config.mergedUi.value.overlay]"
        :style="overlayStyle"
      />
    </div>

    <!-- Foreground Content Wrapper (When used as a container component) -->
    <div
      v-if="hasContent"
      :class="['id-wallpaper-content', config.mergedUi.value.content]"
    >
      <slot />
    </div>
  </component>
</template>

<script setup>
import { ref, computed, useSlots } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

const props = defineProps({
  variant: {
    type: String,
    default: undefined,
    validator: v => ['solid', 'gradient', 'mesh', 'radial', 'aurora', 'glow', 'noise', 'image'].includes(v)
  },
  preset: {
    type: String,
    default: undefined
  },
  direction: {
    type: String,
    default: undefined
  },
  from: {
    type: String,
    default: undefined
  },
  to: {
    type: String,
    default: undefined
  },
  stops: {
    type: Array,
    default: undefined
  },
  intensity: {
    type: [String, Number],
    default: undefined
  },
  opacity: {
    type: [Number, String],
    default: undefined
  },
  position: {
    type: String,
    default: undefined
  },
  size: {
    type: String,
    default: undefined
  },
  blur: {
    type: [String, Number],
    default: undefined
  },
  mask: {
    type: String,
    default: 'none',
    validator: v => ['none', 'fade-bottom', 'fade-top', 'fade-edges', 'radial'].includes(v)
  },
  overlay: {
    type: String,
    default: 'none',
    validator: v => ['none', 'vignette', 'scrim', 'frosted', 'dots', 'grid'].includes(v)
  },
  imageSrc: {
    type: String,
    default: undefined
  },
  imageAlt: {
    type: String,
    default: ''
  },
  noise: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: undefined
  },
  fixed: {
    type: Boolean,
    default: false
  },
  as: {
    type: String,
    default: 'div'
  },
  theme: {
    type: String,
    default: undefined,
    validator: v => ['light', 'dark', 'auto'].includes(v)
  },
  color: {
    type: String,
    default: undefined
  },
  darkColor: {
    type: String,
    default: undefined
  },
  darkFrom: {
    type: String,
    default: undefined
  },
  darkTo: {
    type: String,
    default: undefined
  },
  darkStops: {
    type: Array,
    default: undefined
  },
  darkVariant: {
    type: String,
    default: undefined
  },
  darkIntensity: {
    type: [String, Number],
    default: undefined
  },
  darkOpacity: {
    type: [Number, String],
    default: undefined
  },
  darkOverlay: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const slots = useSlots()
const hasContent = computed(() => !!slots.default)

// iDesign config resolution
const config = useIdesignConfig('Wallpaper', props)

// Dark mode state resolution
const isDark = computed(() => {
  if (props.theme === 'dark') return true
  if (props.theme === 'light') return false
  const activeTheme = config.themeRef?.value || config.theme
  return activeTheme === 'dark'
})

const currentVariant = computed(() => {
  const v = (isDark.value && props.darkVariant) || props.preset || props.variant || config.resolvedVariant.value || 'gradient'
  return resolveVariant(v)
})

// Intensity factor
const currentIntensity = computed(() => {
  return (isDark.value && props.darkIntensity) || props.intensity
})

const intensityPreset = computed(() => {
  if (typeof currentIntensity.value === 'string') return currentIntensity.value
  return 'normal'
})

const intensityMultiplier = computed(() => {
  if (typeof currentIntensity.value === 'number') return currentIntensity.value
  switch (currentIntensity.value) {
    case 'subtle': return isDark.value ? 0.55 : 0.45
    case 'soft': return isDark.value ? 0.85 : 0.75
    case 'vibrant': return isDark.value ? 1.5 : 1.4
    case 'normal':
    default: return isDark.value ? 1.15 : 1.0
  }
})

// Color Resolution (with dark mode adaptation)
const colorFrom = computed(() => {
  if (isDark.value && props.darkFrom) return props.darkFrom
  if (props.from) return props.from
  if (isDark.value && props.darkColor) return props.darkColor
  if (props.color) return props.color
  return isDark.value ? 'rgba(10, 132, 255, 0.28)' : 'rgba(0, 113, 227, 0.12)'
})

const colorTo = computed(() => {
  if (isDark.value && props.darkTo) return props.darkTo
  if (props.to) return props.to
  return isDark.value ? 'rgba(94, 92, 230, 0.22)' : 'rgba(94, 92, 230, 0.08)'
})

const solidColor = computed(() => {
  if (isDark.value && props.darkColor) return props.darkColor
  if (props.color) return props.color
  if (isDark.value && props.darkFrom) return props.darkFrom
  if (props.from) return props.from
  return 'var(--bg)'
})

// Gradient Computation
const computedGradient = computed(() => {
  const dir = props.direction || '135deg'
  const activeStops = (isDark.value && props.darkStops) ? props.darkStops : props.stops
  if (activeStops && Array.isArray(activeStops) && activeStops.length > 0) {
    const formattedStops = activeStops.map(s => {
      if (typeof s === 'string') return s
      if (typeof s === 'object' && s.color) {
        return s.offset ? `${s.color} ${s.offset}` : s.color
      }
      return String(s)
    }).join(', ')
    return `linear-gradient(${dir}, ${formattedStops})`
  }
  return `linear-gradient(${dir}, ${colorFrom.value} 0%, ${colorTo.value} 100%)`
})

// Position helper
const resolvePosition = computed(() => {
  const p = props.position || 'center'
  switch (p) {
    case 'top': return '50% 0%'
    case 'top-left': return '0% 0%'
    case 'top-right': return '100% 0%'
    case 'bottom': return '50% 100%'
    case 'bottom-left': return '0% 100%'
    case 'bottom-right': return '100% 100%'
    case 'center': return '50% 50%'
    default: return p
  }
})

// Blur size resolution
const resolveBlur = computed(() => {
  if (typeof props.blur === 'number') return `${props.blur}px`
  if (typeof props.blur === 'string' && props.blur.endsWith('px')) return props.blur
  switch (props.blur) {
    case 'none': return '0px'
    case 'sm': return '24px'
    case 'md': return '48px'
    case 'xl': return '96px'
    case 'lg':
    default: return '64px'
  }
})

// Animation resolution
const resolvedAnimated = computed(() => {
  if (props.animated !== undefined) return props.animated
  return currentVariant.value === 'aurora'
})

// Opacity resolution
const resolvedOpacity = computed(() => {
  if (props.opacity !== undefined) return props.opacity
  return 1
})

// Styles
const rootStyle = computed(() => {
  return {
    '--wallpaper-opacity': String(resolvedOpacity.value),
    '--wallpaper-blur': resolveBlur.value,
    '--wallpaper-pos': resolvePosition.value,
    '--wallpaper-intensity': String(intensityMultiplier.value)
  }
})

const canvasStyle = computed(() => {
  return {
    opacity: resolvedOpacity.value
  }
})

// Radial Style
const radialStyle = computed(() => {
  const pos = resolvePosition.value
  const from = colorFrom.value
  const to = colorTo.value
  return {
    background: `radial-gradient(circle at ${pos}, ${from} 0%, ${to} 45%, transparent 70%)`
  }
})

// Mesh Styles
const meshStyle = computed(() => {
  return {
    filter: `blur(${resolveBlur.value})`
  }
})

const meshOrb1Style = computed(() => ({
  background: colorFrom.value || 'rgba(0, 113, 227, 0.28)',
  top: '-10%',
  left: '15%',
  width: '55vw',
  height: '55vw',
  maxWidth: '650px',
  maxHeight: '650px'
}))

const meshOrb2Style = computed(() => ({
  background: colorTo.value || 'rgba(94, 92, 230, 0.22)',
  top: '20%',
  right: '5%',
  width: '50vw',
  height: '50vw',
  maxWidth: '600px',
  maxHeight: '600px'
}))

const meshOrb3Style = computed(() => ({
  background: 'rgba(48, 209, 88, 0.12)',
  bottom: '-15%',
  left: '25%',
  width: '45vw',
  height: '45vw',
  maxWidth: '500px',
  maxHeight: '500px'
}))

const meshOrb4Style = computed(() => ({
  background: 'rgba(255, 159, 10, 0.08)',
  bottom: '10%',
  right: '20%',
  width: '40vw',
  height: '40vw',
  maxWidth: '450px',
  maxHeight: '450px'
}))

// Aurora Styles
const auroraContainerStyle = computed(() => ({
  filter: `blur(${resolveBlur.value})`
}))

const auroraBeam1Style = computed(() => ({
  background: `linear-gradient(180deg, ${colorFrom.value} 0%, rgba(0, 113, 227, 0) 100%)`
}))

const auroraBeam2Style = computed(() => ({
  background: `linear-gradient(180deg, ${colorTo.value} 0%, rgba(94, 92, 230, 0) 100%)`
}))

const auroraBeam3Style = computed(() => ({
  background: isDark.value
    ? 'linear-gradient(180deg, rgba(10, 132, 255, 0.32) 0%, rgba(10, 132, 255, 0.05) 100%)'
    : 'linear-gradient(180deg, rgba(10, 132, 255, 0.18) 0%, rgba(10, 132, 255, 0) 100%)'
}))

const auroraBeam4Style = computed(() => ({
  background: isDark.value
    ? 'linear-gradient(180deg, rgba(255, 107, 0, 0.22) 0%, rgba(255, 107, 0, 0.05) 100%)'
    : 'linear-gradient(180deg, rgba(255, 107, 0, 0.10) 0%, rgba(255, 107, 0, 0) 100%)'
}))

// Glow Styles
const glowStyle = computed(() => ({
  filter: `blur(${resolveBlur.value})`
}))

const primaryGlowStyle = computed(() => ({
  background: colorFrom.value || (isDark.value
    ? 'radial-gradient(circle, rgba(10, 132, 255, 0.45) 0%, rgba(10, 132, 255, 0) 70%)'
    : 'radial-gradient(circle, rgba(0, 113, 227, 0.3) 0%, rgba(0, 113, 227, 0) 70%)'),
  transform: `translate(-50%, -50%) scale(${intensityMultiplier.value})`
}))

const secondaryGlowStyle = computed(() => ({
  background: colorTo.value || (isDark.value
    ? 'radial-gradient(circle, rgba(94, 92, 230, 0.35) 0%, rgba(94, 92, 230, 0) 70%)'
    : 'radial-gradient(circle, rgba(94, 92, 230, 0.2) 0%, rgba(94, 92, 230, 0) 70%)'),
  transform: `translate(-50%, -50%) scale(${intensityMultiplier.value})`
}))

// Noise Style
const noiseStyle = computed(() => ({
  backgroundColor: solidColor.value
}))

const noisePatternStyle = computed(() => ({
  opacity: String((isDark.value ? 0.06 : 0.04) * intensityMultiplier.value)
}))

const noiseOpacity = computed(() => {
  return (isDark.value ? 0.04 : 0.03) * intensityMultiplier.value
})

// Image Styles
const imageLayerStyle = computed(() => ({
  backgroundPosition: resolvePosition.value,
  backgroundSize: props.size || 'cover'
}))

const imageElementStyle = computed(() => ({
  filter: props.blur && props.blur !== 'none' ? `blur(${resolveBlur.value})` : undefined,
  objectFit: props.size === 'contain' ? 'contain' : 'cover',
  objectPosition: resolvePosition.value,
  opacity: isDark.value ? 0.85 : 1
}))

// Overlay Style
const effectiveOverlay = computed(() => {
  return (isDark.value && props.darkOverlay) || props.overlay || 'none'
})

const overlayStyle = computed(() => ({
  opacity: String((isDark.value ? 0.92 : 0.85) * intensityMultiplier.value)
}))
</script>

<style scoped>
/* ── Root Container ── */
.id-wallpaper-root {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 0;
}

.id-wallpaper-root.is-fixed {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.id-wallpaper-root.is-wrapper {
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* ── Decorative Graphic Canvas Layer ── */
.id-wallpaper-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  transition: opacity var(--duration-normal, 300ms) var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
}

.wallpaper-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

/* ── 1. Solid Preset ── */
.layer-solid {
  transition: background-color var(--duration-normal, 300ms) var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
}

/* ── 2. Gradient Preset ── */
.layer-gradient {
  background-size: 100% 100%;
}

/* ── 3. Mesh Preset ── */
.layer-mesh {
  position: absolute;
  inset: -15%;
  width: 130%;
  height: 130%;
  overflow: hidden;
  will-change: transform;
}

.mesh-orb {
  position: absolute;
  border-radius: 50%;
  opacity: calc(0.75 * var(--wallpaper-intensity, 1));
  mix-blend-mode: normal;
  will-change: transform;
}

:root.dark .mesh-orb,
[data-theme="dark"] .mesh-orb,
.id-wallpaper-root.is-dark .mesh-orb,
.id-wallpaper-root.dark .mesh-orb {
  opacity: calc(0.65 * var(--wallpaper-intensity, 1));
  mix-blend-mode: screen;
}

.is-animated .mesh-orb-1 {
  animation: orbDrift1 18s ease-in-out infinite alternate;
}
.is-animated .mesh-orb-2 {
  animation: orbDrift2 22s ease-in-out infinite alternate;
}
.is-animated .mesh-orb-3 {
  animation: orbDrift3 20s ease-in-out infinite alternate;
}
.is-animated .mesh-orb-4 {
  animation: orbDrift4 24s ease-in-out infinite alternate;
}

@keyframes orbDrift1 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(6%, 8%) scale(1.08); }
  100% { transform: translate(-5%, -4%) scale(0.95); }
}

@keyframes orbDrift2 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-8%, 6%) scale(1.05); }
  100% { transform: translate(4%, -7%) scale(0.92); }
}

@keyframes orbDrift3 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(5%, -9%) scale(1.1); }
  100% { transform: translate(-6%, 5%) scale(0.96); }
}

@keyframes orbDrift4 {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-7%, -6%) scale(1.04); }
  100% { transform: translate(8%, 7%) scale(0.98); }
}

/* ── 4. Radial Preset ── */
.layer-radial {
  background-repeat: no-repeat;
}

/* ── 5. Aurora Preset ── */
.layer-aurora {
  position: absolute;
  inset: -20%;
  width: 140%;
  height: 140%;
  overflow: hidden;
}

.aurora-beam {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: calc(0.65 * var(--wallpaper-intensity, 1));
  mix-blend-mode: normal;
  will-change: transform;
}

:root.dark .aurora-beam,
[data-theme="dark"] .aurora-beam,
.id-wallpaper-root.is-dark .aurora-beam,
.id-wallpaper-root.dark .aurora-beam {
  opacity: calc(0.55 * var(--wallpaper-intensity, 1));
  mix-blend-mode: screen;
}

.aurora-beam-blue {
  top: -20%;
  left: 10%;
  width: 70%;
  height: 80%;
  transform: rotate(-12deg);
}

.aurora-beam-indigo {
  top: -10%;
  right: 5%;
  width: 65%;
  height: 85%;
  transform: rotate(15deg);
}

.aurora-beam-cyan {
  top: 15%;
  left: 20%;
  width: 60%;
  height: 70%;
  transform: rotate(-5deg);
}

.aurora-beam-warm {
  top: 30%;
  right: 25%;
  width: 50%;
  height: 60%;
  transform: rotate(20deg);
}

.layer-aurora.is-drifting .aurora-beam-blue {
  animation: auroraSway1 16s ease-in-out infinite alternate;
}
.layer-aurora.is-drifting .aurora-beam-indigo {
  animation: auroraSway2 20s ease-in-out infinite alternate;
}
.layer-aurora.is-drifting .aurora-beam-cyan {
  animation: auroraSway3 18s ease-in-out infinite alternate;
}
.layer-aurora.is-drifting .aurora-beam-warm {
  animation: auroraSway4 22s ease-in-out infinite alternate;
}

@keyframes auroraSway1 {
  0%   { transform: rotate(-12deg) scale(1) translate(0, 0); }
  50%  { transform: rotate(-6deg) scale(1.08) translate(4%, 3%); }
  100% { transform: rotate(-16deg) scale(0.96) translate(-3%, -2%); }
}

@keyframes auroraSway2 {
  0%   { transform: rotate(15deg) scale(1) translate(0, 0); }
  50%  { transform: rotate(22deg) scale(1.05) translate(-3%, 4%); }
  100% { transform: rotate(8deg) scale(0.94) translate(2%, -3%); }
}

@keyframes auroraSway3 {
  0%   { transform: rotate(-5deg) scale(1) translate(0, 0); }
  50%  { transform: rotate(2deg) scale(1.1) translate(3%, -4%); }
  100% { transform: rotate(-10deg) scale(0.92) translate(-2%, 3%); }
}

@keyframes auroraSway4 {
  0%   { transform: rotate(20deg) scale(1) translate(0, 0); }
  50%  { transform: rotate(12deg) scale(1.06) translate(-4%, -2%); }
  100% { transform: rotate(26deg) scale(0.95) translate(3%, 4%); }
}

/* ── 6. Glow Preset ── */
.layer-glow {
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  opacity: calc(0.8 * var(--wallpaper-intensity, 1));
}

.primary-glow {
  top: 25%;
  left: 50%;
  width: 600px;
  height: 600px;
}

.secondary-glow {
  top: 45%;
  left: 55%;
  width: 450px;
  height: 450px;
}

/* ── 7. Noise Preset ── */
.layer-noise {
  background-color: var(--bg);
}

.noise-svg-pattern {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 140px 140px;
}

.wallpaper-grain-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 140px 140px;
}

/* ── 8. Image Preset ── */
.layer-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.wallpaper-img {
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  user-select: none;
}

/* ── Overlays ── */
.wallpaper-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.overlay-vignette {
  background: radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.22) 100%);
}

.overlay-scrim {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 40%, rgba(0, 0, 0, 0.2) 100%);
}

:root.dark .overlay-scrim,
[data-theme="dark"] .overlay-scrim,
.id-wallpaper-root.is-dark .overlay-scrim,
.id-wallpaper-root.dark .overlay-scrim {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, transparent 40%, rgba(0, 0, 0, 0.75) 100%);
}

.overlay-frosted {
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  background: rgba(255, 255, 255, 0.2);
}

:root.dark .overlay-frosted,
[data-theme="dark"] .overlay-frosted,
.id-wallpaper-root.is-dark .overlay-frosted,
.id-wallpaper-root.dark .overlay-frosted {
  background: rgba(0, 0, 0, 0.45);
}

.overlay-dots {
  background-image: radial-gradient(var(--hairline, rgba(0, 0, 0, 0.1)) 1px, transparent 1px);
  background-size: 20px 20px;
}

:root.dark .overlay-dots,
[data-theme="dark"] .overlay-dots,
.id-wallpaper-root.is-dark .overlay-dots,
.id-wallpaper-root.dark .overlay-dots {
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
}

.overlay-grid {
  background-image:
    linear-gradient(to right, var(--hairline, rgba(0, 0, 0, 0.06)) 1px, transparent 1px),
    linear-gradient(to bottom, var(--hairline, rgba(0, 0, 0, 0.06)) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* ── Alpha Masks (Smooth page integration) ── */
.mask-fade-bottom {
  mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
}

.mask-fade-top {
  mask-image: linear-gradient(to top, black 65%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 65%, transparent 100%);
}

.mask-fade-edges {
  mask-image: radial-gradient(ellipse at center, black 60%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 60%, transparent 100%);
}

.mask-radial {
  mask-image: radial-gradient(circle at center, black 40%, transparent 95%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 95%);
}

/* ── Foreground Content Slot Wrapper ── */
.id-wallpaper-content {
  position: relative;
  z-index: 1;
  width: 100%;
  flex: 1 1 auto;
}

/* ── Accessibility & Reduced Motion ── */
@media (prefers-reduced-motion: reduce) {
  .mesh-orb,
  .aurora-beam,
  .glow-orb {
    animation: none !important;
    transition: none !important;
  }
}
</style>
