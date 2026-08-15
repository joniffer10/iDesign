<template>
  <div
    class="id-stack"
    :style="{
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      gap: typeof gap === 'number' ? `${gap}px` : gap,
      alignItems: align,
      justify: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap'
    }"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  direction: { type: String, default: 'vertical' }, // 'vertical' | 'horizontal'
  gap: { type: [Number, String], default: 12 },
  align: { type: String, default: 'stretch' },
  justify: { type: String, default: 'flex-start' },
  wrap: Boolean
})
</script>

<style scoped>
.id-stack {
  display: flex;
  width: 100%;
}
</style>
