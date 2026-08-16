<template>
  <div ref="menuRef" :class="['id-dropdown-menu-wrapper', config.mergedUi.value.base]">
    <div :class="config.mergedUi.value.trigger" @click="toggle">
      <slot name="trigger" />
    </div>
    <Transition name="menu-pop">
      <div v-if="isOpen" :class="['dropdown-menu', `align-${align}`, `size-${currentSize}`, `variant-${currentVariant}`, config.mergedUi.value.menu]" role="menu">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          :class="['menu-item', { 'is-danger': item.danger, 'is-separator': item.separator }, config.mergedUi.value.item]"
          :role="item.separator ? 'separator' : 'menuitem'"
          :tabindex="item.separator ? -1 : 0"
          @click="!item.separator && selectItem(item)"
          @keydown.enter="!item.separator && selectItem(item)"
        >
          <template v-if="!item.separator">
            <span :class="['menu-label', config.mergedUi.value.label]">{{ item.label }}</span>
            <span v-if="item.shortcut" :class="['menu-shortcut', config.mergedUi.value.shortcut]">{{ item.shortcut }}</span>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  items: { type: Array, required: true },
  align: { type: String, default: 'left' },
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['select'])

const config = useIdesignConfig('DropdownMenu', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')

const menuRef = ref(null)
const isOpen = ref(false)

const toggle = () => { isOpen.value = !isOpen.value }
const selectItem = (item) => { emit('select', item); isOpen.value = false }
const handleOutside = (e) => { if (menuRef.value && !menuRef.value.contains(e.target)) isOpen.value = false }

onMounted(() => document.addEventListener('click', handleOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleOutside))
</script>

<style scoped>
.id-dropdown-menu-wrapper { position: relative; display: inline-flex; font-family: var(--font); }

.dropdown-menu {
  position: absolute; top: calc(100% + 6px); z-index: 60; min-width: 180px;
  background: var(--surface); border: 1px solid var(--hairline); border-radius: 14px;
  box-shadow: var(--sh-overlay); overflow: hidden; padding: 4px;
}

.variant-glass {
  background: rgba(255, 255, 255, 0.78); backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}
:root.dark .variant-glass { background: rgba(28, 28, 30, 0.82); }

.align-left { left: 0; }
.align-right { right: 0; }

.size-xs .menu-item { padding: 5px 8px; font-size: 11px; }
.size-sm .menu-item { padding: 7px 11px; font-size: 12.5px; }
.size-md .menu-item { padding: 9px 14px; font-size: 13.5px; }
.size-lg .menu-item { padding: 12px 18px; font-size: 15px; }
.size-xl .menu-item { padding: 14px 22px; font-size: 16.5px; }

.menu-item {
  display: flex; align-items: center; justify-content: space-between;
  font-weight: 550; color: var(--text); cursor: pointer; border-radius: 10px;
  transition: background .1s;
}
.menu-item:hover { background: var(--hover); }
.menu-item.is-danger { color: #ff3b30; }
.menu-item.is-separator { height: 1px; padding: 0; margin: 4px 10px; background: var(--hairline); cursor: default; }
.menu-item.is-separator:hover { background: var(--hairline); }

.menu-shortcut { font-size: 12px; color: var(--text-3); font-family: var(--mono); }

.menu-pop-enter-active, .menu-pop-leave-active { transition: opacity .15s, transform .15s var(--ease-out-quart); }
.menu-pop-enter-from, .menu-pop-leave-to { opacity: 0; transform: translateY(-4px) scale(0.97); }
</style>
