<template>
  <section :class="['id-hero-cta', `variant-${variant}`]">
    <div class="blur-orb orb-top"></div>
    <div class="blur-orb orb-bottom"></div>

    <div class="cta-content">
      <div v-if="eyebrow || $slots.eyebrow" class="cta-eyebrow">
        <slot name="eyebrow">{{ eyebrow }}</slot>
      </div>

      <h2 class="cta-title">
        <slot name="title">{{ title }}</slot>
      </h2>

      <p v-if="description || subtitle || $slots.description || $slots.subtitle" class="cta-subtitle">
        <slot name="description">
          <slot name="subtitle">{{ description || subtitle }}</slot>
        </slot>
      </p>

      <div class="cta-actions">
        <slot name="actions">
          <button v-if="actionLabel" type="button" class="cta-btn primary" @click="$emit('action')">
            {{ actionLabel }}
          </button>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Build Apple-Grade Apps'
  },
  description: String,
  subtitle: {
    type: String,
    default: 'Clean, unified surfaces with frosted glass used only where layers overlap.'
  },
  eyebrow: {
    type: String,
    default: 'DESIGN SYSTEM V2.0'
  },
  actionLabel: String,
  variant: {
    type: String,
    default: 'glass', // 'glass' or 'gradient'
    validator: v => ['glass', 'gradient'].includes(v)
  }
})

defineEmits(['action'])
</script>

<style scoped>
.id-hero-cta {
  position: relative;
  overflow: hidden;
  border-radius: var(--r-hero);
  padding: clamp(32px, 5vw, 48px);
  width: 100%;
  box-shadow: var(--sh-panel);
  transition: all 0.25s var(--ease-out-quart);
}

/* Glass Variant (Light & Crisp Apple Frosted Card) */
.variant-glass {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--hairline);
  color: #1d1d1f;
}

:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.82);
  border-color: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.variant-glass .cta-eyebrow {
  color: #0071e3;
}

:root.dark .variant-glass .cta-eyebrow {
  color: #2997ff;
}

.variant-glass .cta-title {
  color: #1d1d1f;
}

:root.dark .variant-glass .cta-title {
  color: #ffffff;
}

.variant-glass .cta-subtitle {
  color: #515154;
}

:root.dark .variant-glass .cta-subtitle {
  color: #86868b;
}

/* Gradient Variant (Signature Blue Gradient with Crisp White Text) */
.variant-gradient {
  background: linear-gradient(135deg, #0071e3 0%, #5e5ce6 100%);
  color: #ffffff;
  box-shadow: var(--sh-cta);
}

.variant-gradient .cta-eyebrow {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 4px 10px;
  border-radius: var(--r-pill);
  display: inline-block;
}

.variant-gradient .cta-title {
  color: #ffffff;
}

.variant-gradient .cta-subtitle {
  color: rgba(255, 255, 255, 0.88);
}

/* Ambient Blur Orbs */
.blur-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.orb-top {
  width: 280px;
  height: 280px;
  background: rgba(0, 113, 227, 0.15);
  top: -100px;
  right: -50px;
  filter: blur(50px);
}
.orb-bottom {
  width: 220px;
  height: 220px;
  background: rgba(175, 82, 222, 0.15);
  bottom: -80px;
  left: -40px;
  filter: blur(40px);
}

.cta-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  max-width: 620px;
  margin: 0;
}
.cta-eyebrow {
  font-size: 11.5px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.cta-title {
  font-size: clamp(24px, 4vw, 34px);
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0 0 12px 0;
  line-height: 1.18;
}
.cta-subtitle {
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 24px 0;
}
.cta-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.cta-btn {
  border: none;
  height: 40px;
  padding: 0 20px;
  border-radius: var(--r-pill);
  font-family: var(--font);
  font-size: 13.5px;
  font-weight: 650;
  cursor: pointer;
  transition: all 0.2s var(--ease-out-quart);
}

.cta-btn.primary {
  background: #0071e3;
  color: #ffffff;
}

.cta-btn.primary:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}
</style>
