<template>
  <Teleport to="body" :disabled="!teleport">
    <Transition name="tour-fade">
      <div v-if="modelValue" class="id-tour-overlay" @click.self="handleBackdropClick">
        <!-- Ambient Backdrop -->
        <div class="tour-backdrop"></div>

        <!-- Apple Liquid Glass Tour Card -->
        <div class="tour-card" role="dialog" aria-modal="true" :aria-label="currentStepData.title">
          <!-- Top Background Glow Orbs -->
          <div class="tour-glow-orb orb-top"></div>
          <div class="tour-glow-orb orb-bottom"></div>

          <!-- Header Control Bar -->
          <div class="tour-header">
            <div class="tour-step-pill">
              <span class="step-counter">{{ currentStepBadge }}</span>
            </div>

            <button type="button" class="tour-close-btn" aria-label="Close tour" @click="close">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Optional Step Image -->
          <div v-if="currentStepData.image" class="tour-step-media">
            <img :src="currentStepData.image" :alt="currentStepData.title" class="tour-step-img" />
          </div>

          <!-- Visual Graphic Stage / Icon Squircle Badge -->
          <div v-else class="tour-visual-stage">
            <div class="visual-squircle-icon">
              <slot name="step-icon" :step="currentStepData" :index="currentStep">
                <component :is="currentStepData.icon" v-if="currentStepData.icon && typeof currentStepData.icon !== 'string'" :size="32" class="step-icon-svg" />
                <span v-else-if="currentStepData.icon" class="step-icon-emoji">{{ currentStepData.icon }}</span>
                <Sparkles v-else :size="32" class="step-icon-svg" />
              </slot>
            </div>
          </div>

          <!-- Title & Description Content -->
          <div class="tour-body">
            <h3 class="tour-title">
              <slot name="step-title" :step="currentStepData">{{ currentStepData.title }}</slot>
            </h3>
            <p class="tour-desc">
              <slot name="step-description" :step="currentStepData">{{ currentStepData.description }}</slot>
            </p>
          </div>

          <!-- Bottom Footer Navigation & Page Pill Indicators -->
          <div class="tour-footer">
            <!-- Animated Page Pill Indicators -->
            <div class="tour-pills-nav" role="tablist" aria-label="Tour progress">
              <button
                v-for="(_, idx) in steps"
                :key="idx"
                type="button"
                :class="['page-pill', { active: idx === currentStep, completed: idx < currentStep }]"
                :aria-label="`Go to step ${idx + 1}`"
                @click="goToStep(idx)"
              />
            </div>

            <!-- Action Buttons -->
            <div class="tour-action-group">
              <button
                v-if="currentStep > 0"
                type="button"
                class="tour-btn btn-secondary"
                @click="prevStep"
              >
                {{ currentStepData.backLabel || currentStepData.secondaryLabel || backLabel }}
              </button>

              <button
                type="button"
                class="tour-btn btn-ghost"
                @click="close"
              >
                {{ currentStepData.skipLabel || skipLabel }}
              </button>

              <button
                v-if="currentStep < steps.length - 1"
                type="button"
                class="tour-btn btn-primary"
                @click="nextStep"
              >
                {{ currentStepData.nextLabel || currentStepData.primaryLabel || nextLabel }}
              </button>

              <button
                v-else
                type="button"
                class="tour-btn btn-primary"
                @click="finish"
              >
                {{ currentStepData.finishLabel || currentStepData.primaryLabel || finishLabel }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Sparkles } from '@lucide/vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  steps: {
    type: Array,
    default: () => [
      { title: 'Welcome to Idesign', description: 'Explore our Apple-grade Liquid Glass Vue 3 component system with real-time reactive sandbox.', icon: '⚡', badge: 'STEP 1 OF 3', nextLabel: 'Explore System →' },
      { title: 'Interactive Playground', description: 'Customize component properties, toggle dark mode, and inspect SFC code snippets.', icon: '🎛️', badge: 'STEP 2 OF 3', nextLabel: 'View Export Options →' },
      { title: 'Production Ready', description: 'Export clean ESM/UMD modules or auto-import with Nuxt 3 in your Vue projects.', icon: '🚀', badge: 'STEP 3 OF 3', finishLabel: 'Get Started ✨' }
    ]
  },
  activeStep: {
    type: Number,
    default: 0
  },
  teleport: {
    type: Boolean,
    default: true
  },
  dismissible: {
    type: Boolean,
    default: true
  },
  nextLabel: {
    type: String,
    default: 'Continue →'
  },
  finishLabel: {
    type: String,
    default: 'Get Started ✨'
  },
  backLabel: {
    type: String,
    default: 'Back'
  },
  skipLabel: {
    type: String,
    default: 'Skip'
  }
})

const emit = defineEmits(['update:modelValue', 'update:activeStep', 'change', 'finish', 'close'])

const currentStep = ref(props.activeStep)

watch(() => props.activeStep, (val) => {
  currentStep.value = val
})

const currentStepData = computed(() => {
  return props.steps[currentStep.value] || props.steps[0] || { title: 'Step', description: '' }
})

const currentStepBadge = computed(() => {
  return currentStepData.value.badge || `STEP ${currentStep.value + 1} OF ${props.steps.length}`
})

const goToStep = (idx) => {
  if (idx >= 0 && idx < props.steps.length) {
    currentStep.value = idx
    emit('update:activeStep', idx)
    emit('change', idx)
  }
}

const nextStep = () => {
  if (currentStep.value < props.steps.length - 1) {
    goToStep(currentStep.value + 1)
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    goToStep(currentStep.value - 1)
  }
}

const finish = () => {
  emit('finish')
  close()
}

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = () => {
  if (props.dismissible) close()
}
</script>

<style scoped>
.id-tour-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: var(--font);
}

.tour-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.tour-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 440px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 28px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16), 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: #1d1d1f;
  overflow: hidden;
  animation: apple-tour-bounce 0.4s var(--ease-spring);
}

:root.dark .tour-card {
  background: rgba(28, 28, 30, 0.88);
  border-color: rgba(255, 255, 255, 0.12);
  color: #f5f5f7;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3);
}

@keyframes apple-tour-bounce {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(16px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Ambient Glow Orbs */
.tour-glow-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.orb-top {
  width: 200px;
  height: 200px;
  background: rgba(0, 113, 227, 0.15);
  top: -80px;
  right: -50px;
  filter: blur(40px);
}

.orb-bottom {
  width: 160px;
  height: 160px;
  background: rgba(175, 82, 222, 0.12);
  bottom: -60px;
  left: -40px;
  filter: blur(35px);
}

/* Header */
.tour-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tour-step-pill {
  display: inline-flex;
  align-items: center;
  background: rgba(0, 113, 227, 0.08);
  border: 1px solid rgba(0, 113, 227, 0.15);
  padding: 4px 12px;
  border-radius: 100px;
}

.step-counter {
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.06em;
  color: #0071e3;
  text-transform: uppercase;
}

:root.dark .tour-step-pill {
  background: rgba(41, 151, 255, 0.15);
  border-color: rgba(41, 151, 255, 0.25);
}

:root.dark .step-counter {
  color: #2997ff;
}

.tour-close-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  color: #86868b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

:root.dark .tour-close-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #a1a1a6;
}

.tour-close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #1d1d1f;
  transform: scale(1.05);
}

:root.dark .tour-close-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

/* Step Image Media */
.tour-step-media {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 140px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--hairline);
}

.tour-step-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Visual Stage */
.tour-visual-stage {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 8px 0;
}

.visual-squircle-icon {
  width: 68px;
  height: 68px;
  border-radius: 20px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s var(--ease-spring);
}

.visual-squircle-icon:hover {
  transform: translateY(-2px) scale(1.04);
}

.step-icon-svg {
  color: #0071e3;
}

:root.dark .step-icon-svg {
  color: #2997ff;
}

.step-icon-emoji {
  font-size: 32px;
  line-height: 1;
}

/* Body */
.tour-body {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

.tour-title {
  font-size: 19px;
  font-weight: 750;
  letter-spacing: -0.02em;
  color: #1d1d1f;
  margin: 0;
  line-height: 1.25;
}

:root.dark .tour-title {
  color: #ffffff;
}

.tour-desc {
  font-size: 14.5px;
  color: #515154;
  line-height: 1.5;
  margin: 0;
}

:root.dark .tour-desc {
  color: #86868b;
}

/* Footer */
.tour-footer {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 4px;
}

.tour-pills-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.page-pill {
  height: 6px;
  width: 6px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.15);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s var(--ease-spring);
}

:root.dark .page-pill {
  background: rgba(255, 255, 255, 0.2);
}

.page-pill.active {
  width: 20px;
  background: #0071e3;
}

:root.dark .page-pill.active {
  background: #2997ff;
}

.tour-action-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.tour-btn {
  border: none;
  height: 38px;
  padding: 0 18px;
  border-radius: 100px;
  font-family: var(--font);
  font-size: 13.5px;
  font-weight: 650;
  cursor: pointer;
  transition: all 0.2s var(--ease-out-quart);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: #0071e3;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.25);
  margin-left: auto;
}

:root.dark .btn-primary {
  background: #0071e3;
  color: #ffffff;
}

.btn-primary:hover {
  opacity: 0.92;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 113, 227, 0.35);
}

.btn-secondary {
  background: rgba(0, 0, 0, 0.05);
  color: #1d1d1f;
}

:root.dark .btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #f5f5f7;
}

.btn-secondary:hover {
  background: rgba(0, 0, 0, 0.09);
}

:root.dark .btn-secondary:hover {
  background: rgba(255, 255, 255, 0.16);
}

.btn-ghost {
  background: transparent;
  color: #86868b;
  margin-left: auto;
}

.btn-ghost:hover {
  color: #1d1d1f;
}

:root.dark .btn-ghost:hover {
  color: #ffffff;
}

.tour-fade-enter-active,
.tour-fade-leave-active {
  transition: opacity 0.25s ease;
}

.tour-fade-enter-from,
.tour-fade-leave-to {
  opacity: 0;
}
</style>
