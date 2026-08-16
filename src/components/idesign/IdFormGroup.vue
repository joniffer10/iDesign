<template>
  <div
    :class="[
      'id-form-group',
      `layout-${direction}`,
      { 'is-inline': inline }
    ]"
    :style="columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : {}"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  direction: {
    type: String,
    default: 'vertical',
    validator: v => ['vertical', 'horizontal', 'grid'].includes(v)
  },
  inline: Boolean,
  columns: [Number, String]
})
</script>

<style scoped>
.id-form-group {
  display: flex;
  gap: var(--space-md, 16px);
  width: 100%;
}

.layout-vertical {
  flex-direction: column;
}

.layout-horizontal,
.is-inline {
  flex-direction: row;
  align-items: flex-end;
  flex-wrap: wrap;
}

.layout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
