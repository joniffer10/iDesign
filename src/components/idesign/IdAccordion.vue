<template>
  <div :class="['id-accordion', `size-${size}`, `variant-${variant}`]">
    <div v-for="(item, idx) in items" :key="idx" class="accordion-item">
      <button
        type="button"
        class="accordion-trigger"
        :aria-expanded="openItems.includes(idx)"
        @click="toggleItem(idx)"
      >
        <span class="accordion-title">{{ item.title }}</span>
        <svg :class="['accordion-chevron', { rotated: openItems.includes(idx) }]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <Transition name="accordion-expand">
        <div v-if="openItems.includes(idx)" class="accordion-content">
          <div class="accordion-body">
            <slot :name="`item-${idx}`">{{ item.content }}</slot>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  multiple: { type: Boolean, default: false },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'separated', 'glass'].includes(v)
  }
})

const openItems = ref([0])

const toggleItem = (idx) => {
  if (openItems.value.includes(idx)) { openItems.value = openItems.value.filter(i => i !== idx) }
  else { openItems.value = props.multiple ? [...openItems.value, idx] : [idx] }
}
</script>

<style scoped>
.id-accordion { background: var(--surface); border-radius: var(--r-panel); box-shadow: var(--sh-panel); overflow: hidden; font-family: var(--font); }

.variant-glass {
  background: rgba(255, 255, 255, 0.75); backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px); border: 1px solid var(--hairline);
}
:root.dark .variant-glass { background: rgba(28, 28, 30, 0.78); }

.id-accordion.variant-separated { background: transparent; box-shadow: none; overflow: visible; display: flex; flex-direction: column; gap: 10px; }
.id-accordion.variant-separated .accordion-item {
  background: var(--surface);
  border-radius: var(--r-card);
  box-shadow: var(--sh-card);
  border: 1px solid var(--hairline);
  overflow: hidden;
}
.id-accordion:not(.variant-separated) .accordion-item + .accordion-item { border-top: 1px solid var(--hairline); }

.size-sm .accordion-trigger { padding: 10px 14px; font-size: 13.5px; }
.size-sm .accordion-body { padding: 0 14px 12px; font-size: 12.5px; }

.size-md .accordion-trigger { padding: 16px clamp(17px,3vw,24px); font-size: 15.5px; }
.size-md .accordion-body { padding: 0 clamp(17px,3vw,24px) 16px; font-size: 14px; }

.size-lg .accordion-trigger { padding: 20px 28px; font-size: 17.5px; }
.size-lg .accordion-body { padding: 0 28px 20px; font-size: 15.5px; }

.accordion-trigger {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  background: transparent; border: none; cursor: pointer; font-family: var(--font);
  font-weight: 600; color: var(--text); text-align: left; transition: background .15s;
}
.accordion-trigger:hover { background: var(--hover); }
.accordion-chevron { color: var(--faint); transition: transform .25s var(--ease-out-quart); flex-shrink: 0; }
.accordion-chevron.rotated { transform: rotate(180deg); }
.accordion-body { color: var(--text-2); line-height: 1.6; }
.accordion-expand-enter-active, .accordion-expand-leave-active { transition: all .25s var(--ease-out-quart); overflow: hidden; }
.accordion-expand-enter-from, .accordion-expand-leave-to { opacity: 0; max-height: 0; }
.accordion-expand-enter-to, .accordion-expand-leave-from { opacity: 1; max-height: 500px; }
</style>
