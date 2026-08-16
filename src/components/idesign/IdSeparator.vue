<template>
  <div
    :class="[
      'id-separator',
      `orientation-${orientation}`,
      `variant-${variant}`,
      `spacing-${spacing}`,
      { 'has-content': $slots.default || label }
    ]"
    role="separator"
    :aria-orientation="orientation"
  >
    <div v-if="orientation === 'horizontal' && ($slots.default || label)" class="separator-line before" />
    <span v-if="orientation === 'horizontal' && ($slots.default || label)" class="separator-content">
      <slot>{{ label }}</slot>
    </span>
    <div v-if="orientation === 'horizontal' && ($slots.default || label)" class="separator-line after" />
  </div>
</template>

<script setup>
defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: v => ['horizontal', 'vertical'].includes(v)
  },
  label: String,
  spacing: {
    type: String,
    default: 'md',
    validator: v => ['none', 'sm', 'md', 'lg', 'xl'].includes(v)
  },
  variant: {
    type: String,
    default: 'hairline',
    validator: v => ['hairline', 'faint', 'gradient', 'dashed'].includes(v)
  }
})
</script>

<style scoped>
.id-separator {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  font-family: var(--font);
}

/* Horizontal */
.orientation-horizontal {
  width: 100%;
  height: 1px;
  background: var(--hairline);
}

.orientation-horizontal.has-content {
  height: auto;
  background: transparent;
  gap: 12px;
}

.separator-line {
  flex: 1;
  height: 1px;
  background: var(--hairline);
}

.separator-content {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

/* Vertical */
.orientation-vertical {
  width: 1px;
  height: 100%;
  min-height: 20px;
  background: var(--hairline);
  align-self: stretch;
}

/* Spacing */
.spacing-none { margin: 0; }
.spacing-sm.orientation-horizontal { margin: 8px 0; }
.spacing-md.orientation-horizontal { margin: 16px 0; }
.spacing-lg.orientation-horizontal { margin: 24px 0; }
.spacing-xl.orientation-horizontal { margin: 32px 0; }

.spacing-sm.orientation-vertical { margin: 0 8px; }
.spacing-md.orientation-vertical { margin: 0 16px; }
.spacing-lg.orientation-vertical { margin: 0 24px; }
.spacing-xl.orientation-vertical { margin: 0 32px; }

/* Variants */
.variant-faint, .variant-faint .separator-line {
  background: var(--faint);
}

.variant-gradient, .variant-gradient .separator-line {
  background: linear-gradient(90deg, transparent 0%, var(--hairline) 50%, transparent 100%);
}

.variant-dashed, .variant-dashed .separator-line {
  background: none;
  border-top: 1px dashed var(--hairline);
}
</style>
