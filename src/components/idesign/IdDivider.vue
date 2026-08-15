<template>
  <div :class="['id-divider', direction, `variant-${variant}`]" role="separator" />
</template>
<script setup>
defineProps({ direction: { type: String, default: 'horizontal' }, variant: { type: String, default: 'hairline' } })
</script>
<style scoped>
.id-divider.horizontal { width: 100%; height: 1px; }
.id-divider.vertical { width: 1px; align-self: stretch; }
.variant-hairline { background: var(--hairline); }
.variant-faint { background: var(--faint); }
.variant-spaced { background: var(--hairline); margin: clamp(16px, 3vw, 28px) 0; }
</style>
