<template>
  <div
    ref="containerRef"
    :class="[
      'id-color-picker-root',
      `size-${currentSize}`,
      `radius-${currentRadius}`,
      `variant-${currentVariant}`,
      {
        'is-inline': inline,
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-open': isOpen
      },
      config.mergedUi.value.base
    ]"
    :data-size="currentSize"
    :data-disabled="disabled || undefined"
    :data-readonly="readonly || undefined"
  >
    <!-- Optional Top Label -->
    <label
      v-if="label || $slots.label"
      class="picker-label"
      :class="config.mergedUi.value.label"
      @click="handleLabelClick"
    >
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="required-star" aria-hidden="true">*</span>
    </label>

    <!-- Trigger (when inline === false) -->
    <div
      v-if="!inline"
      ref="triggerRef"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-haspopup="'dialog'"
      :aria-expanded="isOpen"
      :aria-disabled="disabled"
      :class="[
        'picker-trigger',
        {
          'is-active': isOpen,
          'is-disabled': disabled,
          'is-readonly': readonly
        },
        config.mergedUi.value.trigger
      ]"
      @click="togglePopover"
      @keydown.enter.prevent="togglePopover"
      @keydown.space.prevent="togglePopover"
      @keydown.esc="closePopover"
    >
      <slot
        name="trigger"
        :color="currentFormattedColor"
        :hex="hexString"
        :rgba="rgbaObject"
        :hsva="hsva"
        :is-open="isOpen"
        :disabled="disabled"
      >
        <!-- Swatch Circle/Pill Preview -->
        <div class="trigger-swatch-wrapper" :class="config.mergedUi.value.triggerSwatch">
          <div class="checkerboard-bg" />
          <div class="swatch-fill" :style="{ backgroundColor: cssColorString }" />
        </div>

        <!-- Color Value Display Text -->
        <span class="trigger-value-text" :class="config.mergedUi.value.triggerValue">
          {{ displayColorText }}
        </span>

        <!-- Opacity Badge if < 100% and opacity enabled -->
        <span
          v-if="hasAlpha && hsva.a < 1"
          class="trigger-alpha-badge"
          :class="config.mergedUi.value.triggerAlpha"
        >
          {{ Math.round(hsva.a * 100) }}%
        </span>

        <!-- Eyedropper button (if supported and enabled) -->
        <button
          v-if="showEyeDropper && hasEyeDropper"
          type="button"
          class="trigger-action-btn"
          title="Sample color with EyeDropper"
          :disabled="disabled || readonly"
          tabindex="-1"
          @click.stop="openEyeDropper"
        >
          <Pipette :size="iconSize" />
        </button>

        <!-- Dropdown Chevron Arrow -->
        <ChevronDown
          class="trigger-chevron"
          :class="{ 'is-open': isOpen }"
          :size="iconSize"
        />
      </slot>
    </div>

    <!-- Popover / Inline Picker Panel -->
    <Transition name="id-color-popover">
      <div
        v-if="inline || isOpen"
        ref="popoverRef"
        :class="[
          'picker-panel',
          {
            'is-popover': !inline,
            'is-inline-panel': inline
          },
          config.mergedUi.value.popover,
          config.mergedUi.value.panel
        ]"
        role="dialog"
        :aria-label="label || 'Color selection dialog'"
        @keydown.esc="closePopover"
      >
        <!-- Header / Mode Switcher -->
        <div
          v-if="showModeSwitch"
          class="panel-mode-bar"
          :class="config.mergedUi.value.modes"
        >
          <div class="mode-segmented-control">
            <button
              v-for="m in availableModes"
              :key="m.id"
              type="button"
              :class="['mode-tab', { active: currentMode === m.id }]"
              :disabled="disabled"
              @click="setMode(m.id)"
            >
              <component :is="m.icon" v-if="m.icon" :size="13" class="mode-icon" />
              <span>{{ m.label }}</span>
            </button>
          </div>
        </div>

        <!-- ──────────────── 1. SPECTRUM MODE ──────────────── -->
        <div v-if="currentMode === 'spectrum'" class="mode-spectrum-content">
          <!-- 2D Saturation / Value Canvas -->
          <div
            ref="spectrumRef"
            class="spectrum-area"
            :class="config.mergedUi.value.spectrumArea"
            :style="{ backgroundColor: `hsl(${hsva.h}, 100%, 50%)` }"
            tabindex="0"
            role="slider"
            aria-label="Color saturation and brightness"
            :aria-valuetext="`Saturation ${Math.round(hsva.s)}%, Brightness ${Math.round(hsva.v)}%`"
            @mousedown="onSpectrumMouseDown"
            @touchstart="onSpectrumTouchStart"
            @keydown="onSpectrumKeyDown"
          >
            <div class="spectrum-gradient-white" />
            <div class="spectrum-gradient-black" />
            
            <!-- Draggable Cursor / Indicator -->
            <div
              class="spectrum-handle"
              :class="config.mergedUi.value.spectrumHandle"
              :style="{
                left: `${hsva.s}%`,
                top: `${100 - hsva.v}%`,
                backgroundColor: cssColorStringNoAlpha
              }"
            />
          </div>

          <!-- Controls Section: Hue & Alpha Sliders + Dual Preview -->
          <div class="sliders-and-preview-row">
            <!-- Left Preview Swatch -->
            <div
              v-if="showPreview"
              class="current-preview-box"
              :class="config.mergedUi.value.preview"
              title="Current color preview (Click to copy)"
              role="button"
              tabindex="0"
              @click="copyColorValue"
            >
              <div class="checkerboard-bg" />
              <div class="preview-fill" :style="{ backgroundColor: cssColorString }" />
              <Check v-if="isCopied" class="preview-copy-icon" :size="14" />
              <Copy v-else class="preview-copy-icon hover-only" :size="12" />
            </div>

            <!-- Right Sliders Column (Hue + Alpha) -->
            <div class="sliders-column">
              <!-- Hue Slider -->
              <div
                ref="hueTrackRef"
                class="slider-track hue-slider-track"
                :class="config.mergedUi.value.hueSlider"
                role="slider"
                tabindex="0"
                aria-label="Hue"
                aria-valuemin="0"
                aria-valuemax="360"
                :aria-valuenow="Math.round(hsva.h)"
                @mousedown="onHueMouseDown"
                @touchstart="onHueTouchStart"
                @keydown="onHueKeyDown"
              >
                <div
                  class="slider-thumb"
                  :class="config.mergedUi.value.sliderThumb"
                  :style="{ left: `${(hsva.h / 360) * 100}%` }"
                />
              </div>

              <!-- Alpha Slider (if enabled) -->
              <div
                v-if="hasAlpha"
                ref="alphaTrackRef"
                class="slider-track alpha-slider-track"
                :class="config.mergedUi.value.alphaSlider"
                role="slider"
                tabindex="0"
                aria-label="Opacity"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-valuenow="Math.round(hsva.a * 100)"
                @mousedown="onAlphaMouseDown"
                @touchstart="onAlphaTouchStart"
                @keydown="onAlphaKeyDown"
              >
                <div class="checkerboard-bg" />
                <div
                  class="alpha-gradient-overlay"
                  :style="{
                    background: `linear-gradient(to right, transparent, ${cssColorStringNoAlpha})`
                  }"
                />
                <div
                  class="slider-thumb"
                  :class="config.mergedUi.value.sliderThumb"
                  :style="{ left: `${hsva.a * 100}%` }"
                />
              </div>
            </div>

            <!-- Eyedropper Tool Button -->
            <button
              v-if="showEyeDropper && hasEyeDropper"
              type="button"
              class="panel-eyedropper-btn"
              title="Sample color from screen"
              :disabled="disabled || readonly"
              @click="openEyeDropper"
            >
              <Pipette :size="15" />
            </button>
          </div>
        </div>

        <!-- ──────────────── 2. GRID / PALETTE MODE ──────────────── -->
        <div v-else-if="currentMode === 'grid'" class="mode-grid-content">
          <!-- Curated System Palettes -->
          <div class="grid-section">
            <div class="grid-section-title">System Palette</div>
            <div class="palette-swatches-grid">
              <button
                v-for="color in defaultPalette"
                :key="color"
                type="button"
                :class="[
                  'grid-swatch-item',
                  { active: isColorActive(color) }
                ]"
                :style="{ backgroundColor: color }"
                :aria-label="`Color ${color}`"
                :disabled="disabled || readonly"
                @click="selectColor(color)"
              >
                <Check v-if="isColorActive(color)" :size="12" class="swatch-check" />
              </button>
            </div>
          </div>

          <!-- Extended Shades Palette -->
          <div class="grid-section">
            <div class="grid-section-title">Shades & Grayscale</div>
            <div class="palette-swatches-grid mono-grid">
              <button
                v-for="color in grayscalePalette"
                :key="color"
                type="button"
                :class="[
                  'grid-swatch-item',
                  { active: isColorActive(color) }
                ]"
                :style="{ backgroundColor: color }"
                :aria-label="`Color ${color}`"
                :disabled="disabled || readonly"
                @click="selectColor(color)"
              >
                <Check v-if="isColorActive(color)" :size="12" class="swatch-check" />
              </button>
            </div>
          </div>

          <!-- Custom Saved Colors in Grid Mode -->
          <div v-if="customColors.length > 0" class="grid-section">
            <div class="grid-section-title">Custom Swatches</div>
            <div class="palette-swatches-grid">
              <button
                v-for="(color, idx) in customColors"
                :key="`custom-${idx}-${color}`"
                type="button"
                :class="[
                  'grid-swatch-item',
                  { active: isColorActive(color) }
                ]"
                :style="{ backgroundColor: color }"
                :aria-label="`Custom color ${color}`"
                :disabled="disabled || readonly"
                @click="selectColor(color)"
              >
                <Check v-if="isColorActive(color)" :size="12" class="swatch-check" />
              </button>
            </div>
          </div>
        </div>

        <!-- ──────────────── 3. SLIDERS MODE ──────────────── -->
        <div v-else-if="currentMode === 'sliders'" class="mode-sliders-content">
          <!-- Sliders Sub-switch (RGB vs HSL) -->
          <div class="sliders-type-toggle">
            <button
              type="button"
              :class="['sub-toggle-btn', { active: slidersType === 'rgb' }]"
              @click="slidersType = 'rgb'"
            >
              RGB
            </button>
            <button
              type="button"
              :class="['sub-toggle-btn', { active: slidersType === 'hsl' }]"
              @click="slidersType = 'hsl'"
            >
              HSL
            </button>
          </div>

          <!-- RGB Sliders -->
          <div v-if="slidersType === 'rgb'" class="slider-channel-list">
            <!-- Red -->
            <div class="channel-slider-row">
              <span class="channel-name">R</span>
              <div class="channel-track-wrapper">
                <input
                  type="range"
                  min="0"
                  max="255"
                  :value="rgbaObject.r"
                  :disabled="disabled || readonly"
                  class="channel-range-input range-red"
                  :style="{
                    '--thumb-color': `rgb(${rgbaObject.r}, 0, 0)`
                  }"
                  @input="onRgbChannelChange('r', $event.target.value)"
                />
              </div>
              <input
                type="number"
                min="0"
                max="255"
                :value="rgbaObject.r"
                :disabled="disabled || readonly"
                class="channel-num-input"
                @input="onRgbChannelChange('r', $event.target.value)"
              />
            </div>

            <!-- Green -->
            <div class="channel-slider-row">
              <span class="channel-name">G</span>
              <div class="channel-track-wrapper">
                <input
                  type="range"
                  min="0"
                  max="255"
                  :value="rgbaObject.g"
                  :disabled="disabled || readonly"
                  class="channel-range-input range-green"
                  :style="{
                    '--thumb-color': `rgb(0, ${rgbaObject.g}, 0)`
                  }"
                  @input="onRgbChannelChange('g', $event.target.value)"
                />
              </div>
              <input
                type="number"
                min="0"
                max="255"
                :value="rgbaObject.g"
                :disabled="disabled || readonly"
                class="channel-num-input"
                @input="onRgbChannelChange('g', $event.target.value)"
              />
            </div>

            <!-- Blue -->
            <div class="channel-slider-row">
              <span class="channel-name">B</span>
              <div class="channel-track-wrapper">
                <input
                  type="range"
                  min="0"
                  max="255"
                  :value="rgbaObject.b"
                  :disabled="disabled || readonly"
                  class="channel-range-input range-blue"
                  :style="{
                    '--thumb-color': `rgb(0, 0, ${rgbaObject.b})`
                  }"
                  @input="onRgbChannelChange('b', $event.target.value)"
                />
              </div>
              <input
                type="number"
                min="0"
                max="255"
                :value="rgbaObject.b"
                :disabled="disabled || readonly"
                class="channel-num-input"
                @input="onRgbChannelChange('b', $event.target.value)"
              />
            </div>

            <!-- Alpha (if enabled) -->
            <div v-if="hasAlpha" class="channel-slider-row">
              <span class="channel-name">A</span>
              <div class="channel-track-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100"
                  :value="Math.round(hsva.a * 100)"
                  :disabled="disabled || readonly"
                  class="channel-range-input range-alpha"
                  @input="onAlphaChange($event.target.value / 100)"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hsva.a * 100)"
                :disabled="disabled || readonly"
                class="channel-num-input"
                @input="onAlphaChange($event.target.value / 100)"
              />
            </div>
          </div>

          <!-- HSL Sliders -->
          <div v-else class="slider-channel-list">
            <!-- Hue -->
            <div class="channel-slider-row">
              <span class="channel-name">H</span>
              <div class="channel-track-wrapper">
                <input
                  type="range"
                  min="0"
                  max="360"
                  :value="Math.round(hsva.h)"
                  :disabled="disabled || readonly"
                  class="channel-range-input range-hue"
                  @input="onHslChannelChange('h', $event.target.value)"
                />
              </div>
              <input
                type="number"
                min="0"
                max="360"
                :value="Math.round(hsva.h)"
                :disabled="disabled || readonly"
                class="channel-num-input"
                @input="onHslChannelChange('h', $event.target.value)"
              />
            </div>

            <!-- Saturation -->
            <div class="channel-slider-row">
              <span class="channel-name">S</span>
              <div class="channel-track-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100"
                  :value="Math.round(hslObject.s)"
                  :disabled="disabled || readonly"
                  class="channel-range-input range-sat"
                  @input="onHslChannelChange('s', $event.target.value)"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hslObject.s)"
                :disabled="disabled || readonly"
                class="channel-num-input"
                @input="onHslChannelChange('s', $event.target.value)"
              />
            </div>

            <!-- Lightness -->
            <div class="channel-slider-row">
              <span class="channel-name">L</span>
              <div class="channel-track-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100"
                  :value="Math.round(hslObject.l)"
                  :disabled="disabled || readonly"
                  class="channel-range-input range-light"
                  @input="onHslChannelChange('l', $event.target.value)"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hslObject.l)"
                :disabled="disabled || readonly"
                class="channel-num-input"
                @input="onHslChannelChange('l', $event.target.value)"
              />
            </div>

            <!-- Alpha -->
            <div v-if="hasAlpha" class="channel-slider-row">
              <span class="channel-name">A</span>
              <div class="channel-track-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100"
                  :value="Math.round(hsva.a * 100)"
                  :disabled="disabled || readonly"
                  class="channel-range-input range-alpha"
                  @input="onAlphaChange($event.target.value / 100)"
                />
              </div>
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hsva.a * 100)"
                :disabled="disabled || readonly"
                class="channel-num-input"
                @input="onAlphaChange($event.target.value / 100)"
              />
            </div>
          </div>
        </div>

        <!-- ──────────────── 4. INPUTS SECTION ──────────────── -->
        <div
          v-if="showInputs"
          class="panel-inputs-section"
          :class="config.mergedUi.value.inputs"
        >
          <!-- Format Switch Pill -->
          <button
            type="button"
            class="format-switch-btn"
            title="Toggle input format"
            :disabled="disabled || readonly"
            @click="cycleInputFormat"
          >
            <span>{{ activeInputFormat.toUpperCase() }}</span>
            <ChevronDown :size="11" />
          </button>

          <!-- HEX Input -->
          <div v-if="activeInputFormat === 'hex'" class="hex-input-group">
            <div class="input-field-wrapper hex-wrapper">
              <input
                type="text"
                :value="hexInputValue"
                :disabled="disabled || readonly"
                placeholder="#0071E3"
                maxlength="9"
                class="channel-text-input hex-input"
                spellcheck="false"
                autocomplete="off"
                @input="onHexInput"
                @blur="syncHexInput"
              />
            </div>
            <div v-if="hasAlpha" class="input-field-wrapper alpha-input-wrapper">
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hsva.a * 100)"
                :disabled="disabled || readonly"
                class="channel-text-input alpha-input"
                @input="onAlphaChange($event.target.value / 100)"
              />
              <span class="unit-symbol">%</span>
            </div>
          </div>

          <!-- RGB Multi-Input -->
          <div v-else-if="activeInputFormat === 'rgb'" class="multi-channel-inputs">
            <div class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="255"
                :value="rgbaObject.r"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onRgbChannelChange('r', $event.target.value)"
              />
              <span class="channel-label">R</span>
            </div>
            <div class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="255"
                :value="rgbaObject.g"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onRgbChannelChange('g', $event.target.value)"
              />
              <span class="channel-label">G</span>
            </div>
            <div class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="255"
                :value="rgbaObject.b"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onRgbChannelChange('b', $event.target.value)"
              />
              <span class="channel-label">B</span>
            </div>
            <div v-if="hasAlpha" class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hsva.a * 100)"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onAlphaChange($event.target.value / 100)"
              />
              <span class="channel-label">A%</span>
            </div>
          </div>

          <!-- HSL Multi-Input -->
          <div v-else-if="activeInputFormat === 'hsl'" class="multi-channel-inputs">
            <div class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="360"
                :value="Math.round(hslObject.h)"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onHslChannelChange('h', $event.target.value)"
              />
              <span class="channel-label">H°</span>
            </div>
            <div class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hslObject.s)"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onHslChannelChange('s', $event.target.value)"
              />
              <span class="channel-label">S%</span>
            </div>
            <div class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hslObject.l)"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onHslChannelChange('l', $event.target.value)"
              />
              <span class="channel-label">L%</span>
            </div>
            <div v-if="hasAlpha" class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hsva.a * 100)"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onAlphaChange($event.target.value / 100)"
              />
              <span class="channel-label">A%</span>
            </div>
          </div>

          <!-- HSV Multi-Input -->
          <div v-else-if="activeInputFormat === 'hsv'" class="multi-channel-inputs">
            <div class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="360"
                :value="Math.round(hsva.h)"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onHsvChannelChange('h', $event.target.value)"
              />
              <span class="channel-label">H°</span>
            </div>
            <div class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hsva.s)"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onHsvChannelChange('s', $event.target.value)"
              />
              <span class="channel-label">S%</span>
            </div>
            <div class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hsva.v)"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onHsvChannelChange('v', $event.target.value)"
              />
              <span class="channel-label">V%</span>
            </div>
            <div v-if="hasAlpha" class="channel-unit-box">
              <input
                type="number"
                min="0"
                max="100"
                :value="Math.round(hsva.a * 100)"
                :disabled="disabled || readonly"
                class="channel-text-input"
                @input="onAlphaChange($event.target.value / 100)"
              />
              <span class="channel-label">A%</span>
            </div>
          </div>

          <!-- Copy Button -->
          <button
            type="button"
            class="input-copy-btn"
            :title="isCopied ? 'Copied to clipboard' : 'Copy color string'"
            @click="copyColorValue"
          >
            <Check v-if="isCopied" :size="13" class="copy-success-icon" />
            <Copy v-else :size="13" />
          </button>
        </div>

        <!-- ──────────────── 5. PRESETS / SWATCHES ROW ──────────────── -->
        <div
          v-if="showPresets && effectivePresets.length > 0"
          class="panel-presets-section"
          :class="config.mergedUi.value.presets"
        >
          <div class="presets-header">
            <span class="presets-title">Swatches</span>
            <button
              type="button"
              class="add-swatch-btn"
              title="Save current color as swatch"
              :disabled="disabled || readonly"
              @click="addCurrentColorToCustom"
            >
              <Plus :size="12" />
              <span>Save</span>
            </button>
          </div>

          <div class="presets-swatches-row">
            <button
              v-for="(preset, idx) in effectivePresets"
              :key="`preset-${idx}-${preset}`"
              type="button"
              :class="[
                'preset-swatch',
                { active: isColorActive(preset) },
                config.mergedUi.value.presetSwatch
              ]"
              :style="{ backgroundColor: preset }"
              :aria-label="`Select preset color ${preset}`"
              :disabled="disabled || readonly"
              @click="selectPreset(preset)"
            >
              <Check v-if="isColorActive(preset)" :size="10" class="preset-check" />
            </button>
          </div>
        </div>

        <!-- Extra / Footer Slot -->
        <div v-if="$slots.footer" class="panel-footer" :class="config.mergedUi.value.footer">
          <slot
            name="footer"
            :color="currentFormattedColor"
            :hex="hexString"
            :rgba="rgbaObject"
            :close="closePopover"
          />
        </div>
      </div>
    </Transition>

    <!-- Optional Bottom Description / Hint -->
    <span
      v-if="displayHint"
      class="picker-hint"
      :class="config.mergedUi.value.hint"
    >
      {{ displayHint }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import {
  Pipette,
  ChevronDown,
  Check,
  Copy,
  Plus,
  LayoutGrid,
  Sliders,
  Palette
} from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

// ─────────────────────────────────────────────────────────────
// PROPS DEFINITION
// ─────────────────────────────────────────────────────────────
const props = defineProps({
  modelValue: {
    type: String,
    default: undefined
  },
  value: {
    type: String,
    default: undefined
  },
  label: {
    type: String,
    default: undefined
  },
  hint: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: undefined
  },
  format: {
    type: String,
    default: 'auto',
    validator: v => ['auto', 'hex', 'rgb', 'hsl', 'hsv'].includes(v)
  },
  opacity: {
    type: Boolean,
    default: true
  },
  showAlpha: {
    type: Boolean,
    default: undefined
  },
  alpha: {
    type: Boolean,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: undefined,
    validator: v => !v || ['sm', 'md', 'lg'].includes(v)
  },
  radius: {
    type: String,
    default: undefined,
    validator: v => !v || ['sm', 'md', 'lg', 'xl', 'full'].includes(v)
  },
  variant: {
    type: String,
    default: undefined,
    validator: v => !v || ['default', 'outline', 'solid', 'glass'].includes(v)
  },
  mode: {
    type: String,
    default: 'spectrum',
    validator: v => ['spectrum', 'grid', 'sliders'].includes(v)
  },
  showModeSwitch: {
    type: Boolean,
    default: true
  },
  showInputs: {
    type: Boolean,
    default: true
  },
  showPresets: {
    type: Boolean,
    default: true
  },
  showPreview: {
    type: Boolean,
    default: true
  },
  showEyeDropper: {
    type: Boolean,
    default: true
  },
  inline: {
    type: Boolean,
    default: false
  },
  presets: {
    type: Array,
    default: () => [
      '#0071e3', // System Blue
      '#5e5ce6', // Indigo
      '#af52de', // Purple
      '#ff2d55', // Pink
      '#ff3b30', // Red
      '#ff9500', // Orange
      '#ffcc00', // Yellow
      '#34c759', // Green
      '#00c7be', // Teal
      '#30b0c7', // Cyan
      '#8e8e93', // Gray
      '#1c1c1e', // Dark Surface
      '#ffffff'  // White
    ]
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

// ─────────────────────────────────────────────────────────────
// EMITS
// ─────────────────────────────────────────────────────────────
const emit = defineEmits([
  'update:modelValue',
  'update:value',
  'change',
  'input',
  'active-change',
  'mode-change',
  'open',
  'close'
])

// ─────────────────────────────────────────────────────────────
// GLOBAL CONFIG RESOLVER
// ─────────────────────────────────────────────────────────────
const config = useIdesignConfig('ColorPicker', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')

const displayHint = computed(() => props.hint || props.description || '')

// Alpha channel active status
const hasAlpha = computed(() => {
  if (props.showAlpha !== undefined) return props.showAlpha
  if (props.alpha !== undefined) return props.alpha
  return props.opacity
})

// ─────────────────────────────────────────────────────────────
// PALETTES & CONSTANTS
// ─────────────────────────────────────────────────────────────
const defaultPalette = [
  '#0071e3', '#0a84ff', '#5e5ce6', '#af52de',
  '#ff2d55', '#ff3b30', '#ff9500', '#ffcc00',
  '#34c759', '#30d158', '#00c7be', '#30b0c7'
]

const grayscalePalette = [
  '#ffffff', '#f5f5f7', '#e5e5ea', '#d1d1d6',
  '#aeaeb2', '#8e8e93', '#636366', '#48484a',
  '#3a3a3c', '#2c2c2e', '#1c1c1e', '#000000'
]

const availableModes = [
  { id: 'spectrum', label: 'Spectrum', icon: Palette },
  { id: 'grid', label: 'Grid', icon: LayoutGrid },
  { id: 'sliders', label: 'Sliders', icon: Sliders }
]

const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window

// ─────────────────────────────────────────────────────────────
// COLOR MATH & CONVERSION UTILITIES
// ─────────────────────────────────────────────────────────────
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

function hexToRgba(hex) {
  let clean = hex.replace(/^#/, '').trim()
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('') + 'ff'
  } else if (clean.length === 4) {
    clean = clean.split('').map(c => c + c).join('')
  } else if (clean.length === 6) {
    clean += 'ff'
  } else if (clean.length < 6) {
    clean = clean.padEnd(6, '0') + 'ff'
  }
  const r = parseInt(clean.slice(0, 2), 16) || 0
  const g = parseInt(clean.slice(2, 4), 16) || 0
  const b = parseInt(clean.slice(4, 6), 16) || 0
  const a = parseInt(clean.slice(6, 8), 16) / 255
  return { r, g, b, a: isNaN(a) ? 1 : a }
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, v: v * 100 }
}

function hsvToRgb(h, s, v) {
  h = (h % 360 + 360) % 360 / 360
  s = clamp(s, 0, 100) / 100
  v = clamp(v, 0, 100) / 100

  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  let r = 0, g = 0, b = 0
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToRgb(h, s, l) {
  h = (h % 360 + 360) % 360 / 360
  s = clamp(s, 0, 100) / 100
  l = clamp(l, 0, 100) / 100

  if (s === 0) {
    const val = Math.round(l * 255)
    return { r: val, g: val, b: val }
  }

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return {
    r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1/3) * 255)
  }
}

function parseAnyColor(input) {
  if (!input || typeof input !== 'string') {
    return { h: 210, s: 100, v: 89, a: 1 } // Default System Blue
  }
  const str = input.trim()

  // HEX
  if (str.startsWith('#')) {
    const rgba = hexToRgba(str)
    const hsv = rgbToHsv(rgba.r, rgba.g, rgba.b)
    return { ...hsv, a: rgba.a }
  }

  // RGB / RGBA
  const rgbMatch = str.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/i)
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10)
    const g = parseInt(rgbMatch[2], 10)
    const b = parseInt(rgbMatch[3], 10)
    const a = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1
    const hsv = rgbToHsv(r, g, b)
    return { ...hsv, a: clamp(a, 0, 1) }
  }

  // HSL / HSLA
  const hslMatch = str.match(/hsla?\s*\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+))?\s*\)/i)
  if (hslMatch) {
    const h = parseFloat(hslMatch[1])
    const s = parseFloat(hslMatch[2])
    const l = parseFloat(hslMatch[3])
    const a = hslMatch[4] !== undefined ? parseFloat(hslMatch[4]) : 1
    const rgb = hslToRgb(h, s, l)
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
    return { ...hsv, a: clamp(a, 0, 1) }
  }

  // HSV / HSVA
  const hsvMatch = str.match(/hsva?\s*\(\s*(\d+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*([\d.]+))?\s*\)/i)
  if (hsvMatch) {
    return {
      h: parseFloat(hsvMatch[1]),
      s: parseFloat(hsvMatch[2]),
      v: parseFloat(hsvMatch[3]),
      a: hsvMatch[4] !== undefined ? clamp(parseFloat(hsvMatch[4]), 0, 1) : 1
    }
  }

  // Try parsing hex without #
  if (/^[0-9a-fA-F]{3,8}$/.test(str)) {
    const rgba = hexToRgba('#' + str)
    const hsv = rgbToHsv(rgba.r, rgba.g, rgba.b)
    return { ...hsv, a: rgba.a }
  }

  return { h: 210, s: 100, v: 89, a: 1 }
}

function formatOutput(hsvaObj, desiredFormat, allowAlpha) {
  const rgb = hsvToRgb(hsvaObj.h, hsvaObj.s, hsvaObj.v)
  const a = hsvaObj.a !== undefined ? hsvaObj.a : 1
  const alphaActive = allowAlpha && a < 1

  const toHex = (n) => n.toString(16).padStart(2, '0').toUpperCase()

  if (desiredFormat === 'rgb') {
    return alphaActive || allowAlpha && a !== 1
      ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.round(a * 100) / 100})`
      : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }

  if (desiredFormat === 'hsl') {
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    return alphaActive || allowAlpha && a !== 1
      ? `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${Math.round(a * 100) / 100})`
      : `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
  }

  if (desiredFormat === 'hsv') {
    return alphaActive || allowAlpha && a !== 1
      ? `hsva(${Math.round(hsvaObj.h)}, ${Math.round(hsvaObj.s)}%, ${Math.round(hsvaObj.v)}%, ${Math.round(a * 100) / 100})`
      : `hsv(${Math.round(hsvaObj.h)}, ${Math.round(hsvaObj.s)}%, ${Math.round(hsvaObj.v)}%)`
  }

  // Default HEX
  if (alphaActive) {
    const alphaHex = toHex(Math.round(a * 255))
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}${alphaHex}`
  }
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`
}

// ─────────────────────────────────────────────────────────────
// STATE & REACTIVITY
// ─────────────────────────────────────────────────────────────
const containerRef = ref(null)
const triggerRef = ref(null)
const popoverRef = ref(null)
const spectrumRef = ref(null)
const hueTrackRef = ref(null)
const alphaTrackRef = ref(null)

const isOpen = ref(false)
const currentMode = ref(props.mode || 'spectrum')
const activeInputFormat = ref(props.format !== 'auto' ? props.format : 'hex')
const slidersType = ref('rgb')
const isCopied = ref(false)
const customColors = ref([])

// Internal HSVA state
const initialVal = props.modelValue !== undefined ? props.modelValue : (props.value !== undefined ? props.value : '#0071E3')
const hsva = ref(parseAnyColor(initialVal))
const hexInputValue = ref(formatOutput(hsva.value, 'hex', hasAlpha.value))

// Sync incoming modelValue changes
watch(
  () => [props.modelValue, props.value],
  ([newModelVal, newVal]) => {
    const val = newModelVal !== undefined ? newModelVal : newVal
    if (val !== undefined) {
      const parsed = parseAnyColor(val)
      hsva.value = parsed
      hexInputValue.value = formatOutput(parsed, 'hex', hasAlpha.value)
    }
  }
)

watch(
  () => props.mode,
  (newMode) => {
    if (newMode) currentMode.value = newMode
  }
)

// Computed representations
const rgbaObject = computed(() => {
  const rgb = hsvToRgb(hsva.value.h, hsva.value.s, hsva.value.v)
  return { ...rgb, a: hsva.value.a }
})

const hslObject = computed(() => {
  const rgb = rgbaObject.value
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return { ...hsl, a: hsva.value.a }
})

const hexString = computed(() => {
  return formatOutput(hsva.value, 'hex', false)
})

const cssColorString = computed(() => {
  const rgb = rgbaObject.value
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
})

const cssColorStringNoAlpha = computed(() => {
  const rgb = rgbaObject.value
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
})

const currentFormattedColor = computed(() => {
  const targetFormat = props.format === 'auto' ? activeInputFormat.value : props.format
  return formatOutput(hsva.value, targetFormat, hasAlpha.value)
})

const displayColorText = computed(() => {
  return formatOutput(hsva.value, 'hex', hasAlpha.value)
})

const effectivePresets = computed(() => {
  const combined = [...props.presets]
  for (const c of customColors.value) {
    if (!combined.includes(c)) combined.push(c)
  }
  return combined
})

const iconSize = computed(() => {
  if (currentSize.value === 'sm') return 12
  if (currentSize.value === 'lg') return 16
  return 14
})

// ─────────────────────────────────────────────────────────────
// VALUE EMIT & SYNC
// ─────────────────────────────────────────────────────────────
function emitColorChange(isDragging = false) {
  const targetFormat = props.format === 'auto' ? activeInputFormat.value : props.format
  const formatted = formatOutput(hsva.value, targetFormat, hasAlpha.value)
  
  emit('update:modelValue', formatted)
  emit('update:value', formatted)
  emit('input', formatted)

  if (isDragging) {
    emit('active-change', formatted)
  } else {
    emit('change', formatted)
  }

  hexInputValue.value = formatOutput(hsva.value, 'hex', hasAlpha.value)
}

function setMode(modeId) {
  currentMode.value = modeId
  emit('mode-change', modeId)
}

function isColorActive(color) {
  if (!color) return false
  const p = parseAnyColor(color)
  const r1 = hsvToRgb(hsva.value.h, hsva.value.s, hsva.value.v)
  const r2 = hsvToRgb(p.h, p.s, p.v)
  return r1.r === r2.r && r1.g === r2.g && r1.b === r2.b && Math.abs(hsva.value.a - p.a) < 0.05
}

function selectColor(colorStr) {
  if (props.disabled || props.readonly) return
  hsva.value = parseAnyColor(colorStr)
  emitColorChange(false)
}

function selectPreset(presetColor) {
  selectColor(presetColor)
}

function addCurrentColorToCustom() {
  const formatted = formatOutput(hsva.value, 'hex', hasAlpha.value)
  if (!customColors.value.includes(formatted)) {
    customColors.value.push(formatted)
  }
}

// ─────────────────────────────────────────────────────────────
// POPOVER CONTROLS & OUTSIDE CLICK
// ─────────────────────────────────────────────────────────────
function togglePopover() {
  if (props.disabled || props.readonly) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('open')
  } else {
    emit('close')
  }
}

function closePopover() {
  if (isOpen.value) {
    isOpen.value = false
    emit('close')
  }
}

function handleLabelClick() {
  if (!props.inline) {
    togglePopover()
  }
}

function handleDocumentClick(e) {
  if (props.inline || !isOpen.value) return
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    closePopover()
  }
}

// ─────────────────────────────────────────────────────────────
// 2D SPECTRUM INTERACTION
// ─────────────────────────────────────────────────────────────
let isDraggingSpectrum = false

function updateSpectrumFromEvent(e) {
  if (!spectrumRef.value) return
  const rect = spectrumRef.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY

  const x = clamp(clientX - rect.left, 0, rect.width)
  const y = clamp(clientY - rect.top, 0, rect.height)

  const s = (x / rect.width) * 100
  const v = (1 - y / rect.height) * 100

  hsva.value = {
    ...hsva.value,
    s: clamp(s, 0, 100),
    v: clamp(v, 0, 100)
  }
  emitColorChange(true)
}

function onSpectrumMouseDown(e) {
  if (props.disabled || props.readonly) return
  e.preventDefault()
  isDraggingSpectrum = true
  updateSpectrumFromEvent(e)

  const onMouseMove = (ev) => {
    if (!isDraggingSpectrum) return
    ev.preventDefault()
    updateSpectrumFromEvent(ev)
  }

  const onMouseUp = () => {
    if (isDraggingSpectrum) {
      isDraggingSpectrum = false
      emitColorChange(false)
    }
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onSpectrumTouchStart(e) {
  if (props.disabled || props.readonly) return
  isDraggingSpectrum = true
  updateSpectrumFromEvent(e)

  const onTouchMove = (ev) => {
    if (!isDraggingSpectrum) return
    updateSpectrumFromEvent(ev)
  }

  const onTouchEnd = () => {
    if (isDraggingSpectrum) {
      isDraggingSpectrum = false
      emitColorChange(false)
    }
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }

  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('touchend', onTouchEnd)
}

function onSpectrumKeyDown(e) {
  if (props.disabled || props.readonly) return
  const step = e.shiftKey ? 10 : 1
  let handled = true

  switch (e.key) {
    case 'ArrowLeft':
      hsva.value.s = clamp(hsva.value.s - step, 0, 100)
      break
    case 'ArrowRight':
      hsva.value.s = clamp(hsva.value.s + step, 0, 100)
      break
    case 'ArrowUp':
      hsva.value.v = clamp(hsva.value.v + step, 0, 100)
      break
    case 'ArrowDown':
      hsva.value.v = clamp(hsva.value.v - step, 0, 100)
      break
    default:
      handled = false
  }

  if (handled) {
    e.preventDefault()
    emitColorChange(false)
  }
}

// ─────────────────────────────────────────────────────────────
// HUE SLIDER INTERACTION
// ─────────────────────────────────────────────────────────────
let isDraggingHue = false

function updateHueFromEvent(e) {
  if (!hueTrackRef.value) return
  const rect = hueTrackRef.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const x = clamp(clientX - rect.left, 0, rect.width)
  const h = (x / rect.width) * 360

  hsva.value = {
    ...hsva.value,
    h: clamp(h, 0, 360)
  }
  emitColorChange(true)
}

function onHueMouseDown(e) {
  if (props.disabled || props.readonly) return
  e.preventDefault()
  isDraggingHue = true
  updateHueFromEvent(e)

  const onMouseMove = (ev) => {
    if (!isDraggingHue) return
    ev.preventDefault()
    updateHueFromEvent(ev)
  }

  const onMouseUp = () => {
    if (isDraggingHue) {
      isDraggingHue = false
      emitColorChange(false)
    }
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onHueTouchStart(e) {
  if (props.disabled || props.readonly) return
  isDraggingHue = true
  updateHueFromEvent(e)

  const onTouchMove = (ev) => {
    if (!isDraggingHue) return
    updateHueFromEvent(ev)
  }

  const onTouchEnd = () => {
    if (isDraggingHue) {
      isDraggingHue = false
      emitColorChange(false)
    }
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }

  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('touchend', onTouchEnd)
}

function onHueKeyDown(e) {
  if (props.disabled || props.readonly) return
  const step = e.shiftKey ? 10 : 1
  let handled = true

  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      hsva.value.h = clamp(hsva.value.h - step, 0, 360)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      hsva.value.h = clamp(hsva.value.h + step, 0, 360)
      break
    default:
      handled = false
  }

  if (handled) {
    e.preventDefault()
    emitColorChange(false)
  }
}

// ─────────────────────────────────────────────────────────────
// ALPHA SLIDER INTERACTION
// ─────────────────────────────────────────────────────────────
let isDraggingAlpha = false

function updateAlphaFromEvent(e) {
  if (!alphaTrackRef.value) return
  const rect = alphaTrackRef.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const x = clamp(clientX - rect.left, 0, rect.width)
  const a = x / rect.width

  hsva.value = {
    ...hsva.value,
    a: clamp(a, 0, 1)
  }
  emitColorChange(true)
}

function onAlphaMouseDown(e) {
  if (props.disabled || props.readonly) return
  e.preventDefault()
  isDraggingAlpha = true
  updateAlphaFromEvent(e)

  const onMouseMove = (ev) => {
    if (!isDraggingAlpha) return
    ev.preventDefault()
    updateAlphaFromEvent(ev)
  }

  const onMouseUp = () => {
    if (isDraggingAlpha) {
      isDraggingAlpha = false
      emitColorChange(false)
    }
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onAlphaTouchStart(e) {
  if (props.disabled || props.readonly) return
  isDraggingAlpha = true
  updateAlphaFromEvent(e)

  const onTouchMove = (ev) => {
    if (!isDraggingAlpha) return
    updateAlphaFromEvent(ev)
  }

  const onTouchEnd = () => {
    if (isDraggingAlpha) {
      isDraggingAlpha = false
      emitColorChange(false)
    }
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }

  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('touchend', onTouchEnd)
}

function onAlphaKeyDown(e) {
  if (props.disabled || props.readonly) return
  const step = e.shiftKey ? 0.1 : 0.01
  let handled = true

  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      hsva.value.a = clamp(hsva.value.a - step, 0, 1)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      hsva.value.a = clamp(hsva.value.a + step, 0, 1)
      break
    default:
      handled = false
  }

  if (handled) {
    e.preventDefault()
    emitColorChange(false)
  }
}

function onAlphaChange(val) {
  const num = parseFloat(val)
  if (!isNaN(num)) {
    hsva.value.a = clamp(num, 0, 1)
    emitColorChange(false)
  }
}

// ─────────────────────────────────────────────────────────────
// MANUAL CHANNEL INPUT HANDLERS
// ─────────────────────────────────────────────────────────────
function cycleInputFormat() {
  const formats = ['hex', 'rgb', 'hsl', 'hsv']
  const idx = formats.indexOf(activeInputFormat.value)
  activeInputFormat.value = formats[(idx + 1) % formats.length]
}

function onHexInput(e) {
  let val = e.target.value.trim()
  hexInputValue.value = val
  if (!val.startsWith('#') && val.length > 0) val = '#' + val
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(val)) {
    hsva.value = parseAnyColor(val)
    emitColorChange(false)
  }
}

function syncHexInput() {
  hexInputValue.value = formatOutput(hsva.value, 'hex', hasAlpha.value)
}

function onRgbChannelChange(channel, val) {
  const num = clamp(parseInt(val, 10) || 0, 0, 255)
  const current = rgbaObject.value
  const updated = { ...current, [channel]: num }
  const newHsv = rgbToHsv(updated.r, updated.g, updated.b)
  hsva.value = { ...newHsv, a: hsva.value.a }
  emitColorChange(false)
}

function onHslChannelChange(channel, val) {
  const current = hslObject.value
  const num = parseFloat(val) || 0
  const max = channel === 'h' ? 360 : 100
  const updated = { ...current, [channel]: clamp(num, 0, max) }
  const rgb = hslToRgb(updated.h, updated.s, updated.l)
  const newHsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
  hsva.value = { ...newHsv, a: hsva.value.a }
  emitColorChange(false)
}

function onHsvChannelChange(channel, val) {
  const num = parseFloat(val) || 0
  const max = channel === 'h' ? 360 : 100
  hsva.value = { ...hsva.value, [channel]: clamp(num, 0, max) }
  emitColorChange(false)
}

// ─────────────────────────────────────────────────────────────
// EYEDROPPER & CLIPBOARD UTILITIES
// ─────────────────────────────────────────────────────────────
async function openEyeDropper() {
  if (hasEyeDropper && !props.disabled && !props.readonly) {
    try {
      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()
      if (result && result.sRGBHex) {
        selectColor(result.sRGBHex)
      }
    } catch {
      // User cancelled sampling
    }
  }
}

async function copyColorValue() {
  const val = currentFormattedColor.value
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(val)
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 1500)
    }
  } catch {
    // Clipboard failed or permission denied
  }
}

// ─────────────────────────────────────────────────────────────
// LIFECYCLE
// ─────────────────────────────────────────────────────────────
onMounted(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleDocumentClick)
  }
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleDocumentClick)
  }
})
</script>

<style scoped>
/* ─────────────────────────────────────────────────────────────
   ROOT CONTAINER & DENSITY TIERS
   ───────────────────────────────────────────────────────────── */
.id-color-picker-root {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  font-family: var(--font);
  color: var(--text);
  user-select: none;
  position: relative;
  box-sizing: border-box;
}

.id-color-picker-root * {
  box-sizing: border-box;
}

.picker-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
  cursor: pointer;
  letter-spacing: var(--tracking-tight, -0.01em);
}

.required-star {
  color: var(--danger, #ff3b30);
}

/* ─────────────────────────────────────────────────────────────
   TRIGGER BUTTON (LIQUID GLASS ELEVATION)
   ───────────────────────────────────────────────────────────── */
.picker-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-sheet, 16px);
  padding: 4px 10px 4px 5px;
  box-shadow: var(--sh-card);
  cursor: pointer;
  transition: all 0.2s var(--ease-spring, cubic-bezier(0.32, 0.72, 0, 1));
  outline: none;
}

.picker-trigger:hover:not(.is-disabled):not(.is-readonly) {
  background: var(--hover);
  border-color: rgba(0, 0, 0, 0.12);
  transform: translateY(-0.5px);
}

.picker-trigger:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.22);
}

.picker-trigger.is-active {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.18);
}

/* Swatch wrapper inside trigger */
.trigger-swatch-wrapper {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.swatch-fill {
  position: absolute;
  inset: 0;
}

.trigger-value-text {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  text-transform: uppercase;
}

.trigger-alpha-badge {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-2);
  background: var(--track, #e8e8ed);
  padding: 1px 5px;
  border-radius: var(--r-chip, 6px);
  font-variant-numeric: tabular-nums;
}

.trigger-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-2);
  padding: 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.trigger-action-btn:hover {
  background: var(--track);
  color: var(--text);
}

.trigger-chevron {
  color: var(--text-3);
  transition: transform 0.2s var(--ease-spring);
  margin-left: auto;
}

.trigger-chevron.is-open {
  transform: rotate(180deg);
}

/* ─────────────────────────────────────────────────────────────
   SIZE VARIANTS
   ───────────────────────────────────────────────────────────── */
.size-sm .picker-trigger {
  padding: 3px 8px 3px 4px;
  border-radius: 12px;
}
.size-sm .trigger-swatch-wrapper {
  width: 20px;
  height: 20px;
  border-radius: 6px;
}
.size-sm .trigger-value-text {
  font-size: 12px;
}

.size-lg .picker-trigger {
  padding: 6px 14px 6px 6px;
  border-radius: 20px;
}
.size-lg .trigger-swatch-wrapper {
  width: 28px;
  height: 28px;
  border-radius: 10px;
}
.size-lg .trigger-value-text {
  font-size: 14px;
}

/* Radius Tiers */
.radius-sm .picker-trigger, .radius-sm .picker-panel { border-radius: var(--r-sheet, 8px); }
.radius-lg .picker-trigger, .radius-lg .picker-panel { border-radius: var(--r-hero, 24px); }
.radius-full .picker-trigger { border-radius: var(--r-pill, 999px); }

/* ─────────────────────────────────────────────────────────────
   MAIN COLOR PICKER PANEL (LIQUID GLASS POPUP / INLINE)
   ───────────────────────────────────────────────────────────── */
.picker-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 272px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-panel, 22px);
  padding: 14px;
  box-shadow: var(--sh-panel);
  z-index: 1000;
}

.picker-panel.is-popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--sh-overlay);
}

:root.dark .picker-panel.is-popover {
  background: rgba(28, 28, 30, 0.92);
}

.picker-panel.is-inline-panel {
  position: relative;
  box-shadow: var(--sh-card);
}

/* ─────────────────────────────────────────────────────────────
   MODE BAR / SEGMENTED CONTROL
   ───────────────────────────────────────────────────────────── */
.panel-mode-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
}

.mode-segmented-control {
  display: flex;
  background: var(--track, #e8e8ed);
  border-radius: var(--r-pill, 999px);
  padding: 2px;
  width: 100%;
  gap: 2px;
}

.mode-tab {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: none;
  background: transparent;
  color: var(--text-2);
  font-size: 11.5px;
  font-weight: 500;
  padding: 4px 6px;
  border-radius: var(--r-pill, 999px);
  cursor: pointer;
  transition: all 0.18s var(--ease-spring);
}

.mode-tab:hover:not(.active) {
  color: var(--text);
}

.mode-tab.active {
  background: var(--surface);
  color: var(--text);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* ─────────────────────────────────────────────────────────────
   1. SPECTRUM 2D CANVAS & SLIDERS
   ───────────────────────────────────────────────────────────── */
.mode-spectrum-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.spectrum-area {
  position: relative;
  width: 100%;
  height: 148px;
  border-radius: var(--r-thumb, 12px);
  overflow: hidden;
  cursor: crosshair;
  touch-action: none;
  outline: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.spectrum-area:focus-visible {
  box-shadow: inset 0 0 0 2px var(--accent);
}

.spectrum-gradient-white {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0));
}

.spectrum-gradient-black {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #000000, rgba(0, 0, 0, 0));
}

.spectrum-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2.5px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: transform 0.05s ease;
}

/* Sliders + Dual Preview Row */
.sliders-and-preview-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.current-preview-box {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.15s;
}

.current-preview-box:hover {
  transform: scale(1.06);
}

.preview-fill {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-copy-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.7));
  opacity: 1;
}

.preview-copy-icon.hover-only {
  opacity: 0;
  transition: opacity 0.15s;
}

.current-preview-box:hover .preview-copy-icon.hover-only {
  opacity: 1;
}

.sliders-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slider-track {
  position: relative;
  height: 12px;
  border-radius: var(--r-pill, 999px);
  cursor: pointer;
  touch-action: none;
  outline: none;
}

.slider-track:focus-visible .slider-thumb {
  box-shadow: 0 0 0 2px var(--accent), 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hue-slider-track {
  background: linear-gradient(
    to right,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.alpha-slider-track {
  overflow: hidden;
  border-radius: var(--r-pill, 999px);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.alpha-gradient-overlay {
  position: absolute;
  inset: 0;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.panel-eyedropper-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--track, #e8e8ed);
  border: none;
  color: var(--text);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
}

.panel-eyedropper-btn:hover:not(:disabled) {
  background: var(--hover);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: scale(1.08);
}

/* ─────────────────────────────────────────────────────────────
   2. GRID / PALETTE MODE
   ───────────────────────────────────────────────────────────── */
.mode-grid-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.grid-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.grid-section-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.palette-swatches-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
}

.grid-swatch-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  outline: none;
  transition: transform 0.15s, box-shadow 0.15s;
}

.grid-swatch-item:hover {
  transform: scale(1.15);
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.grid-swatch-item.active {
  border: 2px solid var(--text);
  transform: scale(1.1);
  z-index: 1;
}

.swatch-check {
  color: #ffffff;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.8));
}

/* ─────────────────────────────────────────────────────────────
   3. SLIDERS MODE
   ───────────────────────────────────────────────────────────── */
.mode-sliders-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sliders-type-toggle {
  display: flex;
  gap: 4px;
  background: var(--track, #e8e8ed);
  border-radius: var(--r-pill, 999px);
  padding: 2px;
}

.sub-toggle-btn {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--text-2);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 0;
  border-radius: var(--r-pill, 999px);
  cursor: pointer;
}

.sub-toggle-btn.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.slider-channel-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.channel-slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.channel-name {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-2);
  width: 14px;
}

.channel-track-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
}

.channel-range-input {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  background: var(--track, #e8e8ed);
}

.channel-range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid rgba(0,0,0,0.15);
  box-shadow: 0 1px 3px rgba(0,0,0,0.25);
  cursor: pointer;
}

.range-red { background: linear-gradient(to right, #000000, #ff3b30); }
.range-green { background: linear-gradient(to right, #000000, #34c759); }
.range-blue { background: linear-gradient(to right, #000000, #0071e3); }
.range-hue {
  background: linear-gradient(
    to right,
    #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%
  );
}
.range-sat { background: linear-gradient(to right, #8e8e93, #0071e3); }
.range-light { background: linear-gradient(to right, #000000, #0071e3, #ffffff); }
.range-alpha { background: linear-gradient(to right, transparent, #0071e3); }

.channel-num-input {
  width: 44px;
  height: 24px;
  border: 1px solid var(--hairline);
  background: var(--surface);
  border-radius: var(--r-chip, 6px);
  text-align: center;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--text);
  outline: none;
  padding: 0 2px;
}

.channel-num-input:focus {
  border-color: var(--accent);
}

/* ─────────────────────────────────────────────────────────────
   4. MANUAL INPUTS BAR
   ───────────────────────────────────────────────────────────── */
.panel-inputs-section {
  display: flex;
  align-items: center;
  gap: 6px;
  border-top: 1px solid var(--hairline);
  padding-top: 10px;
}

.format-switch-btn {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: var(--track, #e8e8ed);
  border: none;
  border-radius: var(--r-chip, 6px);
  padding: 4px 6px;
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  color: var(--text);
  cursor: pointer;
  transition: background 0.15s;
  flex-shrink: 0;
}

.format-switch-btn:hover {
  background: var(--hover);
}

.hex-input-group {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
}

.input-field-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--track, #e8e8ed);
  border-radius: var(--r-chip, 6px);
  padding: 2px 6px;
}

.hex-wrapper {
  flex: 1;
}

.alpha-input-wrapper {
  width: 50px;
}

.channel-text-input {
  width: 100%;
  border: none;
  background: transparent;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  outline: none;
  padding: 2px 0;
  font-variant-numeric: tabular-nums;
}

.hex-input {
  text-transform: uppercase;
}

.unit-symbol {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 600;
  color: var(--text-3);
  margin-left: 2px;
}

.multi-channel-inputs {
  flex: 1;
  display: flex;
  gap: 4px;
}

.channel-unit-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--track, #e8e8ed);
  border-radius: var(--r-chip, 6px);
  padding: 2px 4px;
}

.channel-unit-box .channel-text-input {
  text-align: center;
  font-size: 11px;
}

.channel-label {
  font-size: 8.5px;
  font-weight: 700;
  color: var(--text-3);
  margin-top: -2px;
}

.input-copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--track, #e8e8ed);
  border: none;
  border-radius: var(--r-chip, 6px);
  padding: 5px;
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}

.input-copy-btn:hover {
  background: var(--hover);
  color: var(--text);
}

.copy-success-icon {
  color: var(--live, #30d158);
}

/* ─────────────────────────────────────────────────────────────
   5. PRESETS / SWATCHES ROW
   ───────────────────────────────────────────────────────────── */
.panel-presets-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px solid var(--hairline);
  padding-top: 10px;
}

.presets-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.presets-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.add-swatch-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: transparent;
  border: none;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  padding: 1px 4px;
  border-radius: 4px;
  transition: background 0.15s;
}

.add-swatch-btn:hover {
  background: var(--hover);
}

.presets-swatches-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.preset-swatch {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 0;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s, box-shadow 0.15s;
}

.preset-swatch:hover {
  transform: scale(1.22);
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.preset-swatch.active {
  border: 2px solid var(--text);
  transform: scale(1.15);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.preset-check {
  color: #ffffff;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.8));
}

.panel-footer {
  border-top: 1px solid var(--hairline);
  padding-top: 8px;
}

.picker-hint {
  font-size: 12px;
  color: var(--text-2);
}

/* ─────────────────────────────────────────────────────────────
   CHECKERBOARD PATTERN (FOR TRANSPARENCY)
   ───────────────────────────────────────────────────────────── */
.checkerboard-bg {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(45deg, #d1d1d6 25%, transparent 25%),
    linear-gradient(-45deg, #d1d1d6 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #d1d1d6 75%),
    linear-gradient(-45deg, transparent 75%, #d1d1d6 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
  background-color: #ffffff;
}

:root.dark .checkerboard-bg {
  background-image: linear-gradient(45deg, #3a3a3c 25%, transparent 25%),
    linear-gradient(-45deg, #3a3a3c 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #3a3a3c 75%),
    linear-gradient(-45deg, transparent 75%, #3a3a3c 75%);
  background-color: #1c1c1e;
}

/* ─────────────────────────────────────────────────────────────
   TRANSITIONS & DISABLED STATES
   ───────────────────────────────────────────────────────────── */
.id-color-popover-enter-active,
.id-color-popover-leave-active {
  transition: opacity 0.2s var(--ease-spring), transform 0.2s var(--ease-spring);
}

.id-color-popover-enter-from,
.id-color-popover-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.is-readonly .picker-trigger {
  cursor: default;
}
</style>
