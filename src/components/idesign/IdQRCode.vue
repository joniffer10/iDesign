<template>
  <div
    :class="[
      'id-qr-code',
      `variant-${currentVariant}`,
      `size-${isPresetSize ? currentSize : 'custom'}`,
      {
        'is-disabled': disabled,
        'is-responsive': responsive,
        'has-label': !!label || $slots.label,
        'has-caption': !!caption || $slots.caption
      },
      config.mergedUi.value.base
    ]"
    :style="containerStyle"
    role="img"
    :aria-label="accessibleLabel"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    <!-- Optional Top Label -->
    <div
      v-if="(label || $slots.label) && labelPosition === 'top'"
      :class="['qr-label-box', 'position-top', config.mergedUi.value.label]"
    >
      <slot name="label">
        <span class="qr-label-text">{{ label }}</span>
      </slot>
    </div>

    <!-- QR Code Graphic Frame -->
    <div
      :class="['qr-frame', config.mergedUi.value.background]"
      :style="frameStyle"
    >
      <svg
        :class="['qr-svg', config.mergedUi.value.code]"
        :viewBox="`0 0 ${svgData.totalViewBox} ${svgData.totalViewBox}`"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shape-rendering="crispEdges"
        :aria-hidden="true"
      >
        <!-- Background Rect inside SVG for clean exports/high contrast -->
        <rect
          v-if="effectiveBackground && effectiveBackground !== 'transparent'"
          width="100%"
          height="100%"
          :fill="effectiveBackground"
        />

        <!-- Finder Patterns -->
        <path
          v-if="svgData.finderPath"
          :d="svgData.finderPath"
          :fill="effectiveColor"
          class="qr-finder-module"
        />

        <!-- Body Data Modules -->
        <path
          v-if="svgData.bodyPath"
          :d="svgData.bodyPath"
          :fill="effectiveColor"
          class="qr-body-module"
        />
      </svg>

      <!-- Center Logo / Icon Badge -->
      <div
        v-if="hasLogo || $slots.logo"
        :class="['qr-center-logo', config.mergedUi.value.logo]"
        :style="logoContainerStyle"
      >
        <slot name="logo">
          <img
            v-if="effectiveLogoSrc"
            :src="effectiveLogoSrc"
            alt="QR Code Logo"
            class="qr-logo-image"
          />
          <component
            :is="effectiveLogoIcon"
            v-else-if="effectiveLogoIcon"
            class="qr-logo-icon"
            :size="logoIconPixelSize"
          />
        </slot>
      </div>

      <!-- Disabled State Overlay -->
      <div v-if="disabled" class="qr-disabled-scrim" aria-hidden="true" />
    </div>

    <!-- Optional Bottom Label & Caption -->
    <div
      v-if="(label || $slots.label) && labelPosition === 'bottom' || caption || $slots.caption"
      :class="['qr-meta-box', 'position-bottom']"
    >
      <div
        v-if="(label || $slots.label) && labelPosition === 'bottom'"
        :class="['qr-label-box', config.mergedUi.value.label]"
      >
        <slot name="label">
          <span class="qr-label-text">{{ label }}</span>
        </slot>
      </div>

      <div
        v-if="caption || $slots.caption"
        :class="['qr-caption-box', config.mergedUi.value.caption]"
      >
        <slot name="caption">
          <span class="qr-caption-text">{{ caption }}</span>
        </slot>
      </div>
    </div>

    <!-- Actions Slot (e.g. Download, Copy) -->
    <div v-if="$slots.actions || downloadable" :class="['qr-actions-box', config.mergedUi.value.actions]">
      <slot name="actions">
        <button
          v-if="downloadable"
          type="button"
          class="qr-action-btn"
          :disabled="disabled"
          @click="downloadSvg"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Save SVG</span>
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { generateQRCodeMatrix, generateSVGPaths } from '../../utils/qrCode'

const props = defineProps({
  value: {
    type: [String, Number],
    default: 'https://idesign-ui.vercel.app'
  },
  size: {
    type: [String, Number],
    default: undefined
  },
  variant: {
    type: String,
    default: undefined,
    validator: v => ['default', 'rounded', 'minimal', 'glass'].includes(v)
  },
  color: {
    type: String,
    default: undefined
  },
  background: {
    type: String,
    default: undefined
  },
  errorCorrection: {
    type: String,
    default: 'M',
    validator: v => ['L', 'M', 'Q', 'H', 'l', 'm', 'q', 'h'].includes(v)
  },
  margin: {
    type: Number,
    default: 2
  },
  radius: {
    type: [String, Number],
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  logo: {
    type: [String, Object, Function],
    default: undefined
  },
  logoSrc: {
    type: String,
    default: undefined
  },
  logoIcon: {
    type: [Object, Function],
    default: undefined
  },
  logoSize: {
    type: [Number, String],
    default: undefined
  },
  logoRadius: {
    type: [String, Number],
    default: undefined
  },
  logoBackground: {
    type: String,
    default: undefined
  },
  logoMargin: {
    type: Number,
    default: 4
  },
  label: {
    type: String,
    default: undefined
  },
  caption: {
    type: String,
    default: undefined
  },
  labelPosition: {
    type: String,
    default: 'bottom',
    validator: v => ['top', 'bottom'].includes(v)
  },
  responsive: {
    type: Boolean,
    default: false
  },
  downloadable: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['download'])

const config = useIdesignConfig('QRCode', props)

// Size resolution: supports tokens, named tiers (xs, sm, md, lg, xl), numbers, and strings
const SIZE_PRESETS = {
  xs: 120,
  sm: 160,
  md: 200,
  lg: 260,
  xl: 320
}

const currentSize = computed(() => {
  return props.size || config.resolvedSize.value || 'md'
})

const isPresetSize = computed(() => {
  return typeof currentSize.value === 'string' && ['xs', 'sm', 'md', 'lg', 'xl'].includes(currentSize.value)
})

const pixelSize = computed(() => {
  if (typeof currentSize.value === 'number') return currentSize.value
  if (isPresetSize.value) return SIZE_PRESETS[currentSize.value] || 200
  const parsed = parseInt(currentSize.value, 10)
  return isNaN(parsed) ? 200 : parsed
})

const currentVariant = computed(() => {
  return props.variant || config.resolvedVariant.value || 'default'
})

// Logo Detection
const effectiveLogoSrc = computed(() => {
  if (props.logoSrc) return props.logoSrc
  if (typeof props.logo === 'string') return props.logo
  return null
})

const effectiveLogoIcon = computed(() => {
  if (props.logoIcon) return props.logoIcon
  if (typeof props.logo === 'object' || typeof props.logo === 'function') return props.logo
  return null
})

const hasLogo = computed(() => {
  return !!effectiveLogoSrc.value || !!effectiveLogoIcon.value
})

// Colors
const effectiveColor = computed(() => {
  if (props.color) return props.color
  if (config.resolvedColor.value && config.resolvedColor.value !== 'default') {
    if (config.resolvedColor.value === 'accent' || config.resolvedColor.value === 'primary') return 'var(--accent)'
    if (config.resolvedColor.value === 'success') return 'var(--success)'
    if (config.resolvedColor.value === 'warning') return 'var(--warning)'
    if (config.resolvedColor.value === 'danger' || config.resolvedColor.value === 'error') return 'var(--danger)'
    return config.resolvedColor.value
  }
  return 'var(--text)'
})

const effectiveBackground = computed(() => {
  if (props.background) return props.background
  if (currentVariant.value === 'minimal') return 'transparent'
  if (currentVariant.value === 'glass') return 'rgba(255, 255, 255, 0.72)'
  return 'var(--surface)'
})

// Effective Radius Token
const effectiveRadius = computed(() => {
  if (props.radius !== undefined) {
    if (typeof props.radius === 'number') return `${props.radius}px`
    if (props.radius === 'none') return '0px'
    if (props.radius === 'sm') return 'var(--r-thumb)'
    if (props.radius === 'md') return 'var(--r-card)'
    if (props.radius === 'lg') return 'var(--r-panel)'
    if (props.radius === 'full') return 'var(--r-pill)'
    return props.radius
  }
  if (currentVariant.value === 'minimal') return '0px'
  if (currentVariant.value === 'rounded') return 'var(--r-hero)'
  return 'var(--r-panel)'
})

// QR Generation
const qrMatrix = computed(() => {
  const strVal = props.value !== undefined && props.value !== null ? String(props.value) : 'https://idesign.io'
  return generateQRCodeMatrix(strVal, {
    errorCorrection: props.errorCorrection,
    hasLogo: hasLogo.value
  })
})

const svgData = computed(() => {
  return generateSVGPaths({
    matrix: qrMatrix.value.matrix,
    moduleCount: qrMatrix.value.moduleCount,
    margin: props.margin,
    variant: currentVariant.value,
    hasLogo: hasLogo.value,
    logoRatio: 0.26
  })
})

// Logo Sizing
const logoPixelSize = computed(() => {
  if (props.logoSize !== undefined) {
    if (typeof props.logoSize === 'number') return props.logoSize
    const parsed = parseInt(props.logoSize, 10)
    return isNaN(parsed) ? Math.round(pixelSize.value * 0.24) : parsed
  }
  return Math.max(28, Math.round(pixelSize.value * 0.24))
})

const logoIconPixelSize = computed(() => {
  return Math.max(16, Math.round(logoPixelSize.value * 0.6))
})

const logoContainerStyle = computed(() => {
  const sizePx = `${logoPixelSize.value}px`
  const rad = props.logoRadius !== undefined
    ? (typeof props.logoRadius === 'number' ? `${props.logoRadius}px` : props.logoRadius)
    : 'var(--r-thumb)'
  const bg = props.logoBackground || 'var(--surface)'
  const pad = `${props.logoMargin}px`

  return {
    width: sizePx,
    height: sizePx,
    borderRadius: rad,
    backgroundColor: bg,
    padding: pad
  }
})

// Styles
const containerStyle = computed(() => {
  const styles = {}
  if (!props.responsive) {
    styles.width = `${pixelSize.value}px`
  } else {
    styles.maxWidth = `${pixelSize.value}px`
    styles.width = '100%'
  }
  return styles
})

const frameStyle = computed(() => {
  return {
    borderRadius: effectiveRadius.value,
    backgroundColor: effectiveBackground.value
  }
})

// Accessibility
const accessibleLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  if (props.label) return `${props.label} - QR Code`
  const valStr = String(props.value || '')
  return valStr ? `QR Code for ${valStr}` : 'QR Code'
})

// Download Helper
function downloadSvg() {
  if (typeof document === 'undefined') return
  const total = svgData.value.totalViewBox
  const bgFill = effectiveBackground.value !== 'transparent' ? `<rect width="100%" height="100%" fill="${effectiveBackground.value}"/>` : ''
  const finderFill = svgData.value.finderPath ? `<path d="${svgData.value.finderPath}" fill="${effectiveColor.value}"/>` : ''
  const bodyFill = svgData.value.bodyPath ? `<path d="${svgData.value.bodyPath}" fill="${effectiveColor.value}"/>` : ''

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${pixelSize.value}" height="${pixelSize.value}">${bgFill}${finderFill}${bodyFill}</svg>`
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `qrcode-${Date.now()}.svg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  emit('download', { svgContent, url })
}
</script>

<style scoped>
.id-qr-code {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  font-family: var(--font, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif);
  box-sizing: border-box;
  text-align: center;
  transition: opacity 0.2s var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
}

.id-qr-code.is-responsive {
  width: 100%;
}

/* ── QR Graphic Frame ── */
.qr-frame {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 12px;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.25s var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
}

.qr-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* ── Variants ── */
/* Default: Solid unified surface + hairline divider + calm 2-layer shadow */
.variant-default .qr-frame {
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  box-shadow: var(--sh-card, 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.05));
}

/* Rounded: Soft organic corners, modern pill-like frame */
.variant-rounded .qr-frame {
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  box-shadow: var(--sh-panel, 0 1px 3px rgba(0, 0, 0, 0.05), 0 14px 40px rgba(0, 0, 0, 0.05));
}

/* Minimal: Frameless, borderless, clean code */
.variant-minimal .qr-frame {
  border: none;
  box-shadow: none;
  padding: 0;
}

/* Glass: Frosted translucent surface */
.variant-glass .qr-frame {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--hairline, rgba(255, 255, 255, 0.4));
  box-shadow: var(--sh-panel, 0 1px 3px rgba(0, 0, 0, 0.05), 0 14px 40px rgba(0, 0, 0, 0.05));
}

:root.dark .variant-glass .qr-frame {
  background: rgba(28, 28, 30, 0.65);
  border: 1px solid var(--hairline, rgba(255, 255, 255, 0.12));
}

/* ── Center Logo / Icon Badge ── */
.qr-center-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  box-shadow: var(--sh-card, 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.05));
  overflow: hidden;
  z-index: 2;
  box-sizing: border-box;
}

.qr-logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.qr-logo-icon {
  color: var(--accent, #0071e3);
  display: block;
}

/* ── Labels & Captions ── */
.qr-label-box {
  margin-bottom: 8px;
}

.qr-label-box.position-top {
  margin-bottom: 12px;
  width: 100%;
}

.qr-label-text {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text, #1d1d1f);
  display: block;
}

.qr-meta-box {
  margin-top: 12px;
  width: 100%;
}

.qr-meta-box .qr-label-box {
  margin-bottom: 2px;
}

.qr-caption-text {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--text-2, #6e6e73);
  display: block;
}

/* ── Actions / Download ── */
.qr-actions-box {
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.qr-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--r-pill, 999px);
  border: 1px solid var(--hairline, rgba(0, 0, 0, 0.07));
  background: var(--surface, #ffffff);
  color: var(--text, #1d1d1f);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.18s var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
}

.qr-action-btn:hover:not(:disabled) {
  background: var(--hover, #fbfbfd);
  border-color: var(--faint, #d2d2d7);
  transform: translateY(-1px);
}

.qr-action-btn:active:not(:disabled) {
  transform: translateY(0);
}

/* ── Disabled State ── */
.id-qr-code.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.2);
}

.qr-disabled-scrim {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(1px);
  z-index: 3;
}

:root.dark .qr-disabled-scrim {
  background: rgba(0, 0, 0, 0.4);
}
</style>
