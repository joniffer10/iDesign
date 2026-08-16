<template>
  <div :class="['id-color-picker', `size-${size}`, { 'is-disabled': disabled }]">
    <label v-if="label" class="color-label">{{ label }}</label>

    <div class="color-picker-trigger">
      <!-- Native Color Input Trigger Wrapper -->
      <div class="swatch-wrapper" :style="{ background: modelValue }">
        <input
          type="color"
          :value="hexValue"
          :disabled="disabled"
          class="native-color-input"
          @input="onColorInput"
        />
      </div>

      <!-- Hex Text Input -->
      <input
        type="text"
        :value="modelValue"
        :disabled="disabled"
        maxlength="9"
        class="hex-text-input"
        placeholder="#0071E3"
        @input="onHexTextInput"
      />

      <!-- Eyedropper Button (if supported by browser) -->
      <button
        v-if="hasEyeDropper"
        type="button"
        class="eyedropper-btn"
        title="Sample color with EyeDropper"
        :disabled="disabled"
        @click="openEyeDropper"
      >
        💉
      </button>
    </div>

    <!-- Curated Preset Palette Swatches -->
    <div v-if="presets && presets.length > 0" class="presets-row">
      <button
        v-for="color in presets"
        :key="color"
        type="button"
        :class="['preset-swatch', { active: modelValue.toLowerCase() === color.toLowerCase() }]"
        :style="{ background: color }"
        :aria-label="`Select preset ${color}`"
        :disabled="disabled"
        @click="selectPreset(color)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '#0071E3'
  },
  label: String,
  disabled: Boolean,
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
      '#8e8e93', // Gray
      '#1c1c1e', // Dark Surface
      '#ffffff'  // White
    ]
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window

const hexValue = computed(() => {
  const val = props.modelValue || '#000000'
  return val.startsWith('#') ? val.slice(0, 7) : '#0071e3'
})

const onColorInput = (e) => {
  const val = e.target.value.toUpperCase()
  emit('update:modelValue', val)
  emit('change', val)
}

const onHexTextInput = (e) => {
  let val = e.target.value.trim()
  if (!val.startsWith('#') && val.length > 0) val = '#' + val
  emit('update:modelValue', val)
  emit('change', val)
}

const selectPreset = (color) => {
  emit('update:modelValue', color.toUpperCase())
  emit('change', color.toUpperCase())
}

const openEyeDropper = async () => {
  if (hasEyeDropper) {
    try {
      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()
      if (result && result.sRGBHex) {
        selectPreset(result.sRGBHex)
      }
    } catch {
      // User cancelled
    }
  }
}
</script>

<style scoped>
.id-color-picker {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--font);
}

.color-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}

.color-picker-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-sheet);
  padding: 4px 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.swatch-wrapper {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
}

.native-color-input {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 50px;
  height: 50px;
  opacity: 0;
  cursor: pointer;
}

.hex-text-input {
  width: 84px;
  border: none;
  background: transparent;
  font-family: var(--mono);
  font-weight: 700;
  font-size: 13px;
  color: var(--text);
  outline: none;
  text-transform: uppercase;
}

.eyedropper-btn {
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.eyedropper-btn:hover {
  background: var(--hover);
}

.presets-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  max-width: 240px;
}

.preset-swatch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  outline: none;
  transition: transform 0.15s, border-color 0.15s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.preset-swatch:hover {
  transform: scale(1.2);
}

.preset-swatch.active {
  border-color: var(--text);
  transform: scale(1.2);
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
