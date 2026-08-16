<template>
  <header :class="['id-header', `variant-${variant}`, { 'is-sticky': sticky, 'has-border': border }]">
    <div class="header-inner">
      <!-- Left: Title / Breadcrumbs / Brand -->
      <div class="header-start">
        <slot name="start">
          <div class="header-title-group">
            <span v-if="eyebrow" class="header-eyebrow">{{ eyebrow }}</span>
            <div class="title-row">
              <h1 v-if="title" class="header-title">{{ title }}</h1>
              <slot name="title-extra" />
            </div>
            <p v-if="subtitle" class="header-subtitle">{{ subtitle }}</p>
          </div>
        </slot>
      </div>

      <!-- Center: Navigation or Search Slot -->
      <div v-if="$slots.center" class="header-center">
        <slot name="center" />
      </div>

      <!-- Right: Action Buttons / User Slot -->
      <div v-if="$slots.actions || $slots.end" class="header-end">
        <slot name="actions" />
        <slot name="end" />
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
  eyebrow: String,
  sticky: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'glass', 'transparent'].includes(v)
  }
})
</script>

<style scoped>
.id-header {
  width: 100%;
  background: var(--surface);
  font-family: var(--font);
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.id-header.has-border {
  border-bottom: 1px solid var(--hairline);
}

.id-header.is-sticky {
  position: sticky;
  top: 0;
  z-index: 40;
}

.variant-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.8);
}

.variant-transparent {
  background: transparent;
  border-bottom: none !important;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  max-width: 1280px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.header-start {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
}

.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin: 0;
  color: var(--text);
  line-height: 1.25;
}

.header-subtitle {
  font-size: 13px;
  color: var(--text-2);
  margin: 2px 0 0;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 200px;
}

.header-end {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
