<template>
  <aside :class="['id-sidebar', `variant-${variant}`, { 'is-collapsed': collapsed }]">
    <!-- Sidebar Header / Brand -->
    <div class="sidebar-header">
      <slot name="header">
        <div class="sidebar-brand">
          <span v-if="logo" class="brand-logo">{{ logo }}</span>
          <span v-if="!collapsed" class="brand-title">{{ title }}</span>
        </div>
      </slot>
      <button
        v-if="collapsible"
        type="button"
        class="sidebar-collapse-btn"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleCollapse"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path v-if="collapsed" d="M9 18l6-6-6-6"/>
          <path v-else d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
    </div>

    <!-- Navigation Item Groups -->
    <nav class="sidebar-nav">
      <div v-for="(group, gIdx) in groups" :key="gIdx" class="sidebar-group">
        <div v-if="group.title && !collapsed" class="group-title">{{ group.title }}</div>
        
        <div class="group-items">
          <button
            v-for="item in group.items"
            :key="item.id || item.label"
            type="button"
            :class="['sidebar-item', { active: modelValue === (item.id || item.label), disabled: item.disabled }]"
            :disabled="item.disabled"
            @click="selectItem(item)"
          >
            <component :is="item.icon" v-if="item.icon && typeof item.icon !== 'string'" class="item-icon" />
            <span v-else-if="item.icon" class="item-icon-text">{{ item.icon }}</span>
            <span v-if="!collapsed" class="item-label">{{ item.label }}</span>
            <span v-if="item.badge && !collapsed" class="item-badge">{{ item.badge }}</span>
          </button>
        </div>
      </div>
      <slot />
    </nav>

    <!-- Sidebar Footer / User Drawer -->
    <div v-if="$slots.footer || user" class="sidebar-footer">
      <slot name="footer">
        <div v-if="user" class="sidebar-user">
          <div class="user-avatar">{{ user.avatar || user.name?.charAt(0) || 'U' }}</div>
          <div v-if="!collapsed" class="user-meta">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-sub">{{ user.role || user.email }}</div>
          </div>
        </div>
      </slot>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  title: {
    type: String,
    default: 'Idesign'
  },
  logo: {
    type: String,
    default: '⚡'
  },
  groups: {
    type: Array,
    default: () => []
  },
  user: {
    type: Object,
    default: null
  },
  collapsible: {
    type: Boolean,
    default: true
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'glass', 'bordered'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue', 'update:collapsed', 'select'])

const isLocalCollapsed = ref(props.collapsed)

const toggleCollapse = () => {
  isLocalCollapsed.value = !isLocalCollapsed.value
  emit('update:collapsed', isLocalCollapsed.value)
}

const selectItem = (item) => {
  const id = item.id || item.label
  emit('update:modelValue', id)
  emit('select', item)
}
</script>

<style scoped>
.id-sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
  min-height: 100%;
  background: var(--surface);
  border-right: 1px solid var(--hairline);
  font-family: var(--font);
  transition: width 0.25s var(--ease-spring);
  box-sizing: border-box;
  user-select: none;
}

.id-sidebar.is-collapsed {
  width: 72px;
}

.variant-glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.75);
}

.sidebar-header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--hairline);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo {
  font-size: 18px;
}

.brand-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
}

.sidebar-collapse-btn {
  background: transparent;
  border: none;
  color: var(--text-3);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: background 0.15s, color 0.15s;
}
.sidebar-collapse-btn:hover {
  background: var(--hover);
  color: var(--text);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.group-title {
  font-size: 11px;
  font-weight: 650;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0 10px 6px;
}

.group-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: transparent;
  border-radius: 10px;
  color: var(--text-2);
  font-family: var(--font);
  font-size: 13.5px;
  font-weight: 550;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  outline: none;
}

.sidebar-item:hover {
  background: var(--hover);
  color: var(--text);
}

.sidebar-item.active {
  background: rgba(0, 113, 227, 0.1);
  color: var(--accent);
  font-weight: 650;
}

:root.dark .sidebar-item.active {
  background: rgba(10, 132, 255, 0.18);
  color: #0a84ff;
}

.sidebar-item:focus-visible {
  box-shadow: var(--focus-ring);
}

.item-icon, .item-icon-text {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-badge {
  font-size: 11px;
  font-weight: 650;
  padding: 1px 6px;
  border-radius: var(--r-pill);
  background: var(--track);
  color: var(--text-2);
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid var(--hairline);
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-meta {
  flex: 1;
  overflow: hidden;
}

.user-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.user-sub {
  font-size: 11.5px;
  color: var(--text-3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
