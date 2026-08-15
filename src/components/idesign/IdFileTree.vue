<template>
  <div class="id-file-tree" role="tree">
    <div
      v-for="item in items"
      :key="item.id || item.name"
      class="tree-node-wrap"
    >
      <div
        :class="['tree-row', { 'is-selected': selectedId === item.id }]"
        role="treeitem"
        :aria-expanded="item.children ? expandedIds.includes(item.id) : undefined"
        @click="handleSelect(item)"
      >
        <button
          v-if="item.children"
          type="button"
          :class="['toggle-btn', { 'is-open': expandedIds.includes(item.id) }]"
          @click.stop="toggleExpand(item.id)"
        >
          ›
        </button>
        <span v-else class="toggle-placeholder" />

        <span class="node-icon">
          <slot name="icon" :item="item">
            <template v-if="item.children">📁</template>
            <template v-else-if="item.name.endsWith('.js') || item.name.endsWith('.ts')">⚡</template>
            <template v-else-if="item.name.endsWith('.vue')">💚</template>
            <template v-else-if="item.name.endsWith('.css')">🎨</template>
            <template v-else>📄</template>
          </slot>
        </span>

        <span class="node-name">{{ item.name }}</span>
      </div>

      <div v-if="item.children && expandedIds.includes(item.id)" class="tree-children">
        <IdFileTree
          :items="item.children"
          :selected-id="selectedId"
          :expanded-ids="expandedIds"
          @select="$emit('select', $event)"
          @toggle-expand="$emit('toggle-expand', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  selectedId: [String, Number],
  expandedIds: { type: Array, default: () => [] }
})

const emit = defineEmits(['select', 'toggle-expand'])

const handleSelect = (item) => {
  emit('select', item)
}

const toggleExpand = (id) => {
  emit('toggle-expand', id)
}
</script>

<style scoped>
.id-file-tree { display: flex; flex-direction: column; width: 100%; font-size: 13.5px; user-select: none; }
.tree-node-wrap { display: flex; flex-direction: column; }
.tree-row {
  display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 6px;
  cursor: pointer; color: var(--text); transition: background .12s;
}
.tree-row:hover { background: var(--hover); }
.tree-row.is-selected { background: var(--accent); color: #fff; font-weight: 550; }
.tree-row.is-selected .node-name { color: #fff; }
.toggle-btn {
  background: transparent; border: none; font-size: 15px; color: var(--text-3); cursor: pointer;
  width: 16px; height: 16px; display: flex; align-items: center; justify-content: center;
  transition: transform .15s ease;
}
.toggle-btn.is-open { transform: rotate(90deg); }
.toggle-placeholder { width: 16px; }
.node-icon { font-size: 13px; display: flex; align-items: center; }
.node-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tree-children { padding-left: 18px; border-left: 1px solid var(--hairline); margin-left: 17px; }
</style>
