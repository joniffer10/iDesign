<template>
  <Teleport to="body">
    <Transition name="palette-fade">
      <div v-if="modelValue" class="command-backdrop" @click.self="close" @keydown.escape="close">
        <div class="command-card" role="dialog" aria-modal="true" aria-label="Command Palette">
          <!-- Search Header -->
          <div class="command-header">
            <Search :size="18" class="search-icon" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="Type a command or search..."
              class="command-input"
              @keydown="handleKeydown"
            />
            <kbd class="esc-kbd">ESC</kbd>
          </div>

          <!-- Command Groups & Items -->
          <div class="command-list" role="listbox">
            <div v-for="(group, gIdx) in filteredGroups" :key="gIdx" class="command-group">
              <div class="group-title">{{ group.title }}</div>
              <div
                v-for="item in group.items"
                :key="item.id"
                :class="['command-item', { 'is-focused': focusedId === item.id }]"
                role="option"
                :aria-selected="focusedId === item.id"
                @click="selectItem(item)"
                @mouseenter="focusedId = item.id"
              >
                <div class="item-left">
                  <span v-if="item.icon" class="item-icon" v-html="item.icon" />
                  <span class="item-label">{{ item.label }}</span>
                </div>
                <span v-if="item.shortcut" class="item-shortcut">{{ item.shortcut }}</span>
              </div>
            </div>

            <div v-if="filteredGroups.length === 0" class="command-empty">
              No results found for "{{ query }}"
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { Search } from '@lucide/vue'

const props = defineProps({
  modelValue: Boolean,
  groups: {
    type: Array,
    required: true
    // [{ title: 'Actions', items: [{ id: '1', label: 'Create File', shortcut: '⌘N', icon?: '' }] }]
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

const query = ref('')
const focusedId = ref(null)
const inputRef = ref(null)

const close = () => { emit('update:modelValue', false) }

const filteredGroups = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return props.groups

  return props.groups.map(g => ({
    title: g.title,
    items: g.items.filter(i => i.label.toLowerCase().includes(q) || (i.shortcut && i.shortcut.toLowerCase().includes(q)))
  })).filter(g => g.items.length > 0)
})

const allItems = computed(() => filteredGroups.value.flatMap(g => g.items))

watch(() => props.modelValue, (val) => {
  if (val) {
    query.value = ''
    nextTick(() => {
      if (inputRef.value) inputRef.value.focus()
      if (allItems.value.length > 0) focusedId.value = allItems.value[0].id
    })
  }
})

const selectItem = (item) => {
  emit('select', item)
  close()
}

const handleKeydown = (e) => {
  const items = allItems.value
  if (items.length === 0) return
  const currentIdx = items.findIndex(i => i.id === focusedId.value)

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const nextIdx = (currentIdx + 1) % items.length
    focusedId.value = items[nextIdx].id
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    const prevIdx = (currentIdx - 1 + items.length) % items.length
    focusedId.value = items[prevIdx].id
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (currentIdx >= 0) selectItem(items[currentIdx])
  } else if (e.key === 'Escape') {
    close()
  }
}

// Global ⌘K / Ctrl+K listener
const handleGlobalHotkey = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    emit('update:modelValue', !props.modelValue)
  }
}

onMounted(() => window.addEventListener('keydown', handleGlobalHotkey))
onBeforeUnmount(() => window.removeEventListener('keydown', handleGlobalHotkey))
</script>

<style scoped>
.command-backdrop {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  display: flex; align-items: flex-start; justify-content: center; padding-top: 14vh;
}
.command-card {
  width: 90vw; max-width: 580px; background: var(--surface); border: 1px solid var(--hairline);
  border-radius: var(--r-panel); box-shadow: var(--sh-overlay); overflow: hidden;
  display: flex; flex-direction: column;
}
.command-header {
  display: flex; align-items: center; gap: 12px; padding: 14px 18px;
  border-bottom: 1px solid var(--hairline); background: var(--surface);
}
.search-icon { color: var(--text-3); flex-shrink: 0; }
.command-input {
  flex: 1; border: none; background: transparent; font-family: var(--font); font-size: 16px;
  color: var(--text); outline: none;
}
.command-input::placeholder { color: var(--text-4); }
.esc-kbd {
  font-family: var(--mono); font-size: 11px; color: var(--text-3); background: rgba(0,0,0,0.05);
  border: 1px solid var(--hairline); border-radius: 4px; padding: 2px 6px;
}
.command-list { max-height: 340px; overflow-y: auto; padding: 8px; }
.command-group + .command-group { margin-top: 12px; }
.group-title { font-size: 11.5px; font-weight: 700; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.06em; padding: 6px 10px 4px; }
.command-item {
  display: flex; align-items: center; justify-content: space-between; padding: 10px 12px;
  border-radius: 10px; cursor: pointer; transition: background .1s; user-select: none;
}
.command-item.is-focused { background: var(--hover); }
.item-left { display: flex; align-items: center; gap: 10px; }
.item-icon { display: flex; align-items: center; color: var(--text-2); }
.item-label { font-size: 14px; font-weight: 550; color: var(--text); }
.item-shortcut { font-family: var(--mono); font-size: 12px; color: var(--text-3); }
.command-empty { text-align: center; color: var(--text-3); padding: 32px 16px; font-size: 14px; }

.palette-fade-enter-active, .palette-fade-leave-active { transition: opacity .2s var(--ease-out-quart), transform .2s var(--ease-spring); }
.palette-fade-enter-from, .palette-fade-leave-to { opacity: 0; transform: scale(0.97) translateY(-8px); }
</style>
