<template>
  <aside
    :class="[
      'id-sidebar',
      `variant-${resolvedVariant}`,
      `size-${currentSize}`,
      {
        'is-collapsed': isEffectiveCollapsed,
        'is-collapsible': collapsible
      },
      config.mergedUi.value.base
    ]"
    role="navigation"
    aria-label="Sidebar navigation"
  >
    <!-- Sidebar Header / Brand -->
    <div :class="['sidebar-header', config.mergedUi.value.header]">
      <slot name="header">
        <div class="sidebar-brand" :title="title">
          <slot name="logo">
            <component :is="logo" v-if="logo && isComponent(logo)" class="brand-logo-icon" />
            <span v-else-if="logo" class="brand-logo">{{ logo }}</span>
          </slot>
          <span v-if="!isEffectiveCollapsed" class="brand-title">{{ title }}</span>
        </div>
      </slot>

      <button
        v-if="collapsible"
        type="button"
        class="sidebar-collapse-btn"
        :aria-label="isEffectiveCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        :title="isEffectiveCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleCollapse"
      >
        <ChevronRight v-if="isEffectiveCollapsed" :size="16" />
        <ChevronLeft v-else :size="16" />
      </button>
    </div>

    <!-- Navigation Body / Groups -->
    <nav :class="['sidebar-nav', config.mergedUi.value.content]">
      <slot name="nav-top" />

      <div
        v-for="(group, gIdx) in normalizedGroups"
        :key="group.id || gIdx"
        :class="[
          'sidebar-group',
          { 'is-group-collapsed': isGroupCollapsed(group, gIdx) },
          config.mergedUi.value.group,
          config.mergedUi.value.section
        ]"
      >
        <!-- Group Header / Collapsible Trigger -->
        <div
          v-if="group.title && !isEffectiveCollapsed"
          :class="[
            'group-header',
            { 'is-collapsible': group.collapsible },
            config.mergedUi.value.groupTrigger
          ]"
          :role="group.collapsible ? 'button' : undefined"
          :tabindex="group.collapsible ? 0 : undefined"
          @click="group.collapsible && toggleGroupCollapse(group, gIdx)"
          @keydown.enter="group.collapsible && toggleGroupCollapse(group, gIdx)"
          @keydown.space.prevent="group.collapsible && toggleGroupCollapse(group, gIdx)"
        >
          <span class="group-title">{{ group.title }}</span>
          <ChevronDown
            v-if="group.collapsible"
            :size="13"
            :class="['group-chevron', { 'is-rotated': isGroupCollapsed(group, gIdx) }]"
          />
        </div>

        <!-- Group Divider when collapsed -->
        <div v-else-if="isEffectiveCollapsed && gIdx > 0" class="collapsed-divider" />

        <!-- Group Items List -->
        <div v-show="!isGroupCollapsed(group, gIdx) || isEffectiveCollapsed" class="group-items">
          <template v-for="item in group.items" :key="item.id || item.label">
            <!-- Normal Item (No children) -->
            <button
              v-if="!item.children || item.children.length === 0"
              type="button"
              :class="[
                'sidebar-item',
                {
                  'is-active': isItemActive(item),
                  'is-disabled': item.disabled
                },
                config.mergedUi.value.item
              ]"
              :disabled="item.disabled"
              :title="isEffectiveCollapsed ? (item.label || item.id) : undefined"
              :aria-current="isItemActive(item) ? 'page' : undefined"
              @click="selectItem(item)"
            >
              <!-- Icon -->
              <div :class="['item-icon-wrap', config.mergedUi.value.icon]">
                <component :is="item.icon" v-if="item.icon && isComponent(item.icon)" :size="iconSize" />
                <span v-else-if="item.icon" class="item-icon-text">{{ item.icon }}</span>
              </div>

              <!-- Label -->
              <span v-if="!isEffectiveCollapsed" :class="['item-label', config.mergedUi.value.label]">
                {{ item.label || item.title || item.id }}
              </span>

              <!-- Badge -->
              <span
                v-if="item.badge !== undefined && item.badge !== null && !isEffectiveCollapsed"
                :class="['item-badge', config.mergedUi.value.badge]"
              >
                {{ item.badge }}
              </span>
            </button>

            <!-- Nested Item (With Children) -->
            <div v-else class="nested-item-group">
              <button
                type="button"
                :class="[
                  'sidebar-item',
                  'has-children',
                  {
                    'is-active': isItemActive(item) || isChildActive(item),
                    'is-expanded': isParentExpanded(item),
                    'is-disabled': item.disabled
                  },
                  config.mergedUi.value.item
                ]"
                :disabled="item.disabled"
                :title="isEffectiveCollapsed ? (item.label || item.id) : undefined"
                @click="handleParentClick(item)"
              >
                <div :class="['item-icon-wrap', config.mergedUi.value.icon]">
                  <component :is="item.icon" v-if="item.icon && isComponent(item.icon)" :size="iconSize" />
                  <span v-else-if="item.icon" class="item-icon-text">{{ item.icon }}</span>
                </div>

                <span v-if="!isEffectiveCollapsed" :class="['item-label', config.mergedUi.value.label]">
                  {{ item.label || item.title || item.id }}
                </span>

                <span
                  v-if="item.badge !== undefined && item.badge !== null && !isEffectiveCollapsed"
                  :class="['item-badge', config.mergedUi.value.badge]"
                >
                  {{ item.badge }}
                </span>

                <ChevronDown
                  v-if="!isEffectiveCollapsed"
                  :size="13"
                  :class="['nested-chevron', { 'is-expanded': isParentExpanded(item) }]"
                />
              </button>

              <!-- Child Items Submenu -->
              <div
                v-if="!isEffectiveCollapsed && isParentExpanded(item)"
                class="nested-children"
              >
                <button
                  v-for="child in item.children"
                  :key="child.id || child.label"
                  type="button"
                  :class="[
                    'sidebar-item',
                    'child-item',
                    {
                      'is-active': isItemActive(child),
                      'is-disabled': child.disabled
                    },
                    config.mergedUi.value.item
                  ]"
                  :disabled="child.disabled"
                  :aria-current="isItemActive(child) ? 'page' : undefined"
                  @click="selectItem(child)"
                >
                  <div v-if="child.icon" :class="['item-icon-wrap', config.mergedUi.value.icon]">
                    <component :is="child.icon" v-if="isComponent(child.icon)" :size="iconSize - 2" />
                    <span v-else class="item-icon-text">{{ child.icon }}</span>
                  </div>
                  <span v-else class="child-dot" />

                  <span :class="['item-label', config.mergedUi.value.label]">
                    {{ child.label || child.title || child.id }}
                  </span>

                  <span
                    v-if="child.badge !== undefined && child.badge !== null"
                    :class="['item-badge', config.mergedUi.value.badge]"
                  >
                    {{ child.badge }}
                  </span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>

      <slot />
    </nav>

    <!-- Sidebar Footer / User Profile -->
    <div v-if="$slots.footer || user" class="sidebar-footer">
      <slot name="footer">
        <div v-if="user" class="sidebar-user" :title="isEffectiveCollapsed ? user.name : undefined">
          <div class="user-avatar-wrap">
            <img v-if="user.avatar && user.avatar.startsWith('http')" :src="user.avatar" :alt="user.name" class="user-avatar-img" />
            <div v-else class="user-avatar">{{ user.avatar || user.name?.charAt(0) || 'U' }}</div>
          </div>
          <div v-if="!isEffectiveCollapsed" class="user-meta">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-sub">{{ user.role || user.email }}</div>
          </div>
        </div>
      </slot>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ChevronDown, ChevronRight, ChevronLeft } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'

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
    type: [String, Object, Function],
    default: '⚡'
  },
  groups: {
    type: Array,
    default: () => []
  },
  items: {
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
    default: undefined
  },
  variant: {
    type: String,
    default: undefined
  },
  size: {
    type: String,
    default: undefined
  },
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'update:collapsed', 'select'])

const config = useIdesignConfig('Sidebar', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const resolvedVariant = computed(() => {
  const raw = config.resolvedVariant.value || 'default'
  return resolveVariant(raw, null, {
    'no-dividers': 'seamless',
    'no-divider': 'seamless'
  })
})

// Collapse handling
const localCollapsed = ref(false)
const isEffectiveCollapsed = computed(() => {
  if (props.collapsed !== undefined) return props.collapsed
  return localCollapsed.value
})

watch(() => props.collapsed, (val) => {
  if (val !== undefined) localCollapsed.value = val
})

const toggleCollapse = () => {
  const next = !isEffectiveCollapsed.value
  localCollapsed.value = next
  emit('update:collapsed', next)
}

// Normalized groups from either `groups` prop or flat `items` prop
const normalizedGroups = computed(() => {
  if (props.groups && props.groups.length > 0) {
    return props.groups
  }
  if (props.items && props.items.length > 0) {
    return [{ id: 'default-group', items: props.items }]
  }
  return []
})

// Collapsible Group states
const collapsedGroups = ref(new Set())
const isGroupCollapsed = (group, idx) => {
  const key = group.id || `group-${idx}`
  if (group.collapsed !== undefined) {
    return collapsedGroups.value.has(key) ? !group.collapsed : group.collapsed
  }
  return collapsedGroups.value.has(key)
}

const toggleGroupCollapse = (group, idx) => {
  const key = group.id || `group-${idx}`
  if (collapsedGroups.value.has(key)) {
    collapsedGroups.value.delete(key)
  } else {
    collapsedGroups.value.add(key)
  }
}

// Nested parent item expanded states
const expandedParents = ref(new Set())

const isParentExpanded = (item) => {
  const key = item.id || item.label
  return expandedParents.value.has(key) || isChildActive(item)
}

const handleParentClick = (item) => {
  const key = item.id || item.label
  if (expandedParents.value.has(key)) {
    expandedParents.value.delete(key)
  } else {
    expandedParents.value.add(key)
  }
  emit('select', item)
}

const isItemActive = (item) => {
  const id = item.id || item.label
  return props.modelValue === id
}

const isChildActive = (item) => {
  if (!item.children || !item.children.length) return false
  return item.children.some(c => isItemActive(c))
}

const selectItem = (item) => {
  const id = item.id || item.label
  emit('update:modelValue', id)
  emit('select', item)
}

const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'sm' ? 16 : sz === 'lg' ? 20 : 18
})

const isComponent = (val) => typeof val === 'object' || typeof val === 'function'
</script>

<style scoped>
.id-sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
  min-height: 100%;
  background: var(--surface, #ffffff);
  border-right: 1px solid var(--hairline);
  font-family: var(--font);
  transition: width 0.25s var(--ease-spring), transform 0.25s var(--ease-spring);
  box-sizing: border-box;
  user-select: none;
  position: relative;
}

.id-sidebar.is-collapsed {
  width: 68px;
}

/* ──────────────────────────────────────────────────────────
   VARIANTS
   ────────────────────────────────────────────────────────── */
.variant-glass {
  background: var(--variant-glass-bg);
  backdrop-filter: var(--variant-glass-backdrop);
  -webkit-backdrop-filter: var(--variant-glass-backdrop);
  border-right: 1px solid var(--hairline);
}
:root.dark .variant-glass {
  border-right: 1px solid rgba(255, 255, 255, 0.12);
}

.variant-solid {
  background: var(--accent);
  border-right: none;
}
.variant-solid .brand-title,
.variant-solid .sidebar-item,
.variant-solid .group-title { color: rgba(255, 255, 255, 0.85); }
.variant-solid .sidebar-item.is-active { background: rgba(255, 255, 255, 0.2); color: #ffffff; }
.variant-solid .sidebar-item:hover:not(.is-disabled) { background: rgba(255, 255, 255, 0.12); color: #ffffff; }
.variant-solid .sidebar-header { border-bottom-color: rgba(255, 255, 255, 0.15); }
.variant-solid .sidebar-footer { border-top-color: rgba(255, 255, 255, 0.15); }

.variant-subtle {
  background: var(--variant-subtle-bg);
  border-right: 1px solid var(--hairline);
}

.variant-seamless .sidebar-header {
  border-bottom: none;
}
.variant-seamless .group-header {
  border-bottom: none;
}
.variant-seamless .collapsed-divider {
  display: none;
}

.variant-bordered {
  background: var(--surface, #ffffff);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
:root.dark .variant-bordered {
  background: #1c1c1e;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

.variant-floating {
  background: var(--surface, #ffffff);
  border: 1px solid var(--hairline);
  border-radius: var(--r-panel, 22px);
  box-shadow: var(--sh-panel);
  margin: 12px;
  height: calc(100% - 24px);
}
:root.dark .variant-floating {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.12);
}

/* ──────────────────────────────────────────────────────────
   HEADER & BRAND
   ────────────────────────────────────────────────────────── */
.sidebar-header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  border-bottom: 1px solid var(--hairline);
  gap: 8px;
  flex-shrink: 0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}

.brand-logo-icon,
.brand-logo {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--accent);
}

.brand-title {
  font-size: 14.5px;
  font-weight: 700;
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-collapse-btn {
  background: transparent;
  border: none;
  color: var(--text-3);
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: var(--r-pill, 999px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.sidebar-collapse-btn:hover {
  background: var(--hover);
  color: var(--text);
}

/* ──────────────────────────────────────────────────────────
   NAVIGATION CONTAINER & GROUPS
   ────────────────────────────────────────────────────────── */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  -webkit-overflow-scrolling: touch;
}

.is-collapsed .sidebar-nav {
  padding: 14px 6px;
  gap: 12px;
}

.sidebar-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  border-radius: 6px;
  outline: none;
}

.group-header.is-collapsible {
  cursor: pointer;
  transition: background 0.15s ease;
}

.group-header.is-collapsible:hover {
  background: var(--hover);
}

.group-title {
  font-size: 11px;
  font-weight: 650;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.group-chevron {
  color: var(--text-3);
  transition: transform 0.2s var(--ease-out-quart);
}

.group-chevron.is-rotated {
  transform: rotate(-90deg);
}

.collapsed-divider {
  height: 1px;
  background: var(--hairline);
  margin: 6px 8px;
}

.group-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* ──────────────────────────────────────────────────────────
   SIDEBAR ITEMS & LIQUID PILLS
   ────────────────────────────────────────────────────────── */
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 10px;
  color: var(--text-2);
  font-family: var(--font);
  font-size: 13.5px;
  font-weight: 550;
  cursor: pointer;
  transition: all 0.15s var(--ease-out-quart);
  text-align: left;
  outline: none;
  box-sizing: border-box;
  position: relative;
}

.is-collapsed .sidebar-item {
  justify-content: center;
  padding: 8px 0;
  gap: 0;
}

.size-sm .sidebar-item { padding: 6px 8px; font-size: 12.5px; }
.size-lg .sidebar-item { padding: 10px 12px; font-size: 14.5px; }

.sidebar-item:hover:not(.is-disabled) {
  background: var(--hover);
  color: var(--text);
}

/* Active State (Liquid Glass Restraint) */
.sidebar-item.is-active {
  background: rgba(0, 113, 227, 0.08);
  color: var(--accent, #0071e3);
  font-weight: 650;
  border-color: rgba(0, 113, 227, 0.12);
}

:root.dark .sidebar-item.is-active {
  background: rgba(10, 132, 255, 0.16);
  color: #0a84ff;
  border-color: rgba(10, 132, 255, 0.22);
}

.sidebar-item.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.sidebar-item:focus-visible {
  box-shadow: var(--focus-ring);
}

.item-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.item-icon-text {
  font-size: 16px;
  line-height: 1;
}

.item-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: var(--tracking-tight, -0.01em);
}

.item-badge {
  font-size: 11px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  padding: 1px 7px;
  border-radius: var(--r-pill, 999px);
  background: var(--track, #e8e8ed);
  color: var(--text-2);
  flex-shrink: 0;
}

.sidebar-item.is-active .item-badge {
  background: var(--accent);
  color: #ffffff;
}

/* ──────────────────────────────────────────────────────────
   NESTED SUBMENU ITEMS
   ────────────────────────────────────────────────────────── */
.nested-item-group {
  display: flex;
  flex-direction: column;
}

.nested-chevron {
  color: var(--text-3);
  transition: transform 0.2s var(--ease-out-quart);
  flex-shrink: 0;
}

.nested-chevron.is-expanded {
  transform: rotate(180deg);
}

.nested-children {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-left: 20px;
  padding-left: 8px;
  border-left: 1px solid var(--hairline);
  margin-top: 2px;
  margin-bottom: 4px;
}

.child-item {
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 8px;
}

.child-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-4);
  flex-shrink: 0;
  transition: background 0.15s ease;
}

.child-item.is-active .child-dot {
  background: var(--accent);
}

/* ──────────────────────────────────────────────────────────
   FOOTER & USER PROFILE
   ────────────────────────────────────────────────────────── */
.sidebar-footer {
  padding: 12px;
  border-top: 1px solid var(--hairline);
  flex-shrink: 0;
}

.is-collapsed .sidebar-footer {
  padding: 10px 6px;
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.is-collapsed .sidebar-user {
  justify-content: center;
}

.user-avatar-wrap {
  flex-shrink: 0;
}

.user-avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--hairline);
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
}

.user-meta {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 13px;
  font-weight: 650;
  color: var(--text);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  letter-spacing: var(--tracking-tight, -0.01em);
}

.user-sub {
  font-size: 11.5px;
  color: var(--text-3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
