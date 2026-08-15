<template>
  <div :class="['id-dock-wrap', `position-${position}`]" role="toolbar" aria-label="macOS Dock">
    <div class="dock-container">
      <div
        v-for="(item, index) in items"
        :key="item.id || index"
        class="dock-item-wrapper"
      >
        <!-- Divider / Separator -->
        <div v-if="item.separator" class="dock-separator" />

        <!-- Icon Item -->
        <button
          v-else
          type="button"
          :class="['dock-item', { 'is-active': activeId === item.id }]"
          :aria-label="item.label"
          @click="$emit('select', item)"
        >
          <span class="dock-tooltip">{{ item.label }}</span>
          <div class="icon-squircle" :style="item.iconBg ? { background: item.iconBg, color: '#fff' } : {}">
            <slot name="icon" :item="item">
              <component :is="item.icon" v-if="item.icon && typeof item.icon !== 'string'" :size="20" />
              <span v-else-if="typeof item.icon === 'string' && item.icon.length <= 4" class="item-emoji">{{ item.icon }}</span>
              <span v-else class="item-letter">{{ item.label ? item.label[0].toUpperCase() : 'A' }}</span>
            </slot>
          </div>
          <span v-if="item.active || activeId === item.id" class="dock-dot" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  activeId: [String, Number],
  position: {
    type: String,
    default: 'bottom',
    validator: v => ['bottom', 'top'].includes(v)
  }
})

defineEmits(['select'])
</script>

<style scoped>
.id-dock-wrap {
  display: flex; justify-content: center; width: 100%; pointer-events: none; z-index: 60;
}
.position-bottom { position: fixed; bottom: 18px; left: 0; right: 0; }
.position-top { position: fixed; top: 18px; left: 0; right: 0; }

.dock-container {
  pointer-events: auto; display: flex; align-items: center; gap: 8px; padding: 8px 12px;
  background: rgba(255, 255, 255, 0.75); backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px); border: 1px solid var(--hairline);
  border-radius: 24px; box-shadow: var(--sh-overlay); transition: transform 0.2s var(--ease-spring);
}
:root.dark .dock-container {
  background: rgba(28, 28, 30, 0.82);
}

.dock-item-wrapper { display: flex; align-items: center; position: relative; }

.dock-separator {
  width: 1px; height: 32px; background: var(--hairline); margin: 0 4px;
}

.dock-item {
  position: relative; display: flex; flex-direction: column; align-items: center;
  justify-content: center; background: transparent; border: none; padding: 4px;
  cursor: pointer; outline: none; transition: transform 0.2s var(--ease-spring);
}
.dock-item:hover {
  transform: translateY(-8px) scale(1.15);
}
.dock-item:active {
  transform: translateY(-4px) scale(1.05);
}

.icon-squircle {
  width: 44px; height: 44px; border-radius: 12px; background: var(--surface);
  border: 1px solid var(--hairline); display: flex; align-items: center; justify-content: center;
  font-size: 20px; color: var(--text); box-shadow: var(--sh-card); transition: all 0.2s;
}
.dock-item:hover .icon-squircle {
  box-shadow: var(--sh-lift); border-color: var(--accent);
}

.item-emoji { font-size: 22px; }
.item-letter { font-weight: 700; font-size: 17px; }

.dock-dot {
  width: 4px; height: 4px; border-radius: 50%; background: var(--text);
  margin-top: 4px; opacity: 0.85;
}

.dock-tooltip {
  position: absolute; bottom: 100%; margin-bottom: 10px; padding: 4px 10px;
  background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); color: #ffffff;
  font-family: var(--font); font-size: 11.5px; font-weight: 550; border-radius: 6px;
  white-space: nowrap; opacity: 0; pointer-events: none; transform: translateY(4px);
  transition: opacity 0.15s ease, transform 0.15s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.dock-item:hover .dock-tooltip {
  opacity: 1; transform: translateY(0);
}

@media (max-width: 600px) {
  .icon-squircle { width: 36px; height: 36px; font-size: 16px; border-radius: 10px; }
  .item-emoji { font-size: 18px; }
  .dock-container { gap: 4px; padding: 6px 8px; border-radius: 18px; }
}
</style>
