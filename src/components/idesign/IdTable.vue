<template>
  <div :class="['id-table-wrapper', `variant-${currentVariant}`, `radius-${currentRadius}`, { 'is-compact': isCompact, 'is-selectable': selectable }, config.mergedUi.value.base]">
    <!-- Header Control Bar (optional title, search, global actions, filters) -->
    <div
      v-if="title || $slots.header || searchable || $slots.headerActions || filterable || $slots.filter"
      :class="['table-header-bar', config.mergedUi.value.headerBar]"
    >
      <div :class="['table-title-group', config.mergedUi.value.titleGroup]">
        <slot name="header">
          <h3 v-if="title" :class="['table-title', config.mergedUi.value.title]">{{ title }}</h3>
          <span
            v-if="displayCount !== null && displayCount !== undefined"
            :class="['table-count-badge', config.mergedUi.value.countBadge]"
          >
            {{ displayCount }}
          </span>
        </slot>
      </div>

      <div :class="['table-header-actions', config.mergedUi.value.headerActions]">
        <!-- Live Table Search Input -->
        <div v-if="searchable" :class="['table-search-box', config.mergedUi.value.searchBox]">
          <Search :size="14" :class="['table-search-icon', config.mergedUi.value.searchIcon]" />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="searchPlaceholder || 'Filter table...'"
            :class="['table-search-input', config.mergedUi.value.searchInput]"
            aria-label="Filter table"
          />
        </div>

        <!-- Optional Filter Slot / Control -->
        <slot name="filter" :active-filters="activeFilters" :toggle-filter="toggleFilter" />

        <!-- Header Actions Slot -->
        <slot name="headerActions" />
      </div>
    </div>

    <!-- Main Table Surface -->
    <div :class="['table-scroll-container', config.mergedUi.value.tableScroll]">
      <table :class="['id-table', config.mergedUi.value.table]">
        <thead :class="config.mergedUi.value.thead">
          <tr :class="config.mergedUi.value.tr">
            <!-- Select All Checkbox -->
            <th v-if="selectable" :class="['col-checkbox', config.mergedUi.value.th]">
              <input
                type="checkbox"
                :checked="isAllSelected"
                :indeterminate="isPartiallySelected"
                :class="['id-table-checkbox', config.mergedUi.value.checkbox]"
                aria-label="Select all rows"
                @change="toggleSelectAll"
              />
            </th>

            <!-- Columns -->
            <th
              v-for="col in columns"
              :key="col.key"
              :style="{ width: col.width, textAlign: col.align || 'left' }"
              :class="[{ 'is-sortable': col.sortable, 'is-sorted': sortKey === col.key }, config.mergedUi.value.th]"
              @click="col.sortable && handleSort(col.key)"
            >
              <div
                class="th-content"
                :style="{ justifyContent: col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start' }"
              >
                <span class="th-label">{{ col.label }}</span>
                <template v-if="col.sortable">
                  <ChevronUp v-if="sortKey === col.key && sortOrder === 'asc'" :size="13" class="sort-icon sort-active" />
                  <ChevronDown v-else-if="sortKey === col.key && sortOrder === 'desc'" :size="13" class="sort-icon sort-active" />
                  <ChevronsUpDown v-else :size="13" class="sort-icon sort-neutral" />
                </template>
                <button
                  v-if="col.filterable"
                  type="button"
                  :class="['col-filter-btn', { 'is-active': activeFilters[col.key] }]"
                  :aria-label="`Filter ${col.label}`"
                  :title="`Filter ${col.label}`"
                  @click.stop="toggleFilter(col.key)"
                >
                  <Filter :size="12" class="col-filter-icon" />
                </button>
              </div>
            </th>

            <!-- Action Column Header -->
            <th
              v-if="$slots.actions || hasRowActions"
              :class="['col-actions', config.mergedUi.value.th]"
              style="text-align: right;"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody :class="config.mergedUi.value.tbody">
          <tr
            v-for="(row, rIdx) in filteredData"
            :key="rIdx"
            :class="[{ 'is-selected': isSelected(row), 'is-clickable': hoverable }, config.mergedUi.value.tr]"
            @click="onRowClick(row, $event)"
          >
            <!-- Checkbox Row Selection -->
            <td v-if="selectable" :class="['col-checkbox', config.mergedUi.value.td]" @click.stop>
              <input
                type="checkbox"
                :checked="isSelected(row)"
                :class="['id-table-checkbox', config.mergedUi.value.checkbox]"
                :aria-label="`Select row ${rIdx + 1}`"
                @change="toggleSelectRow(row)"
              />
            </td>

            <!-- Row Data Cells -->
            <td
              v-for="col in columns"
              :key="col.key"
              :style="{ textAlign: col.align || 'left' }"
              :class="config.mergedUi.value.td"
            >
              <slot :name="`col-${col.key}`" :row="row" :value="row[col.key]" :index="rIdx">
                {{ row[col.key] }}
              </slot>
            </td>

            <!-- Row Actions Column -->
            <td
              v-if="$slots.actions || hasRowActions"
              :class="['col-actions', config.mergedUi.value.td]"
              style="text-align: right;"
              @click.stop
            >
              <slot name="actions" :row="row" :index="rIdx">
                <button
                  type="button"
                  :class="['row-action-btn', config.mergedUi.value.actions]"
                  aria-label="Row actions"
                  title="Actions"
                  @click="onActionClick(row, $event)"
                >
                  <MoreHorizontal :size="16" />
                </button>
              </slot>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="!filteredData || filteredData.length === 0" :class="config.mergedUi.value.tr">
            <td :colspan="totalColspan" :class="['table-empty', config.mergedUi.value.td]">
              <slot name="empty">
                <div class="empty-wrap">
                  <Search :size="20" class="empty-icon" />
                  <span>{{ searchQuery ? `No rows match "${searchQuery}"` : emptyText }}</span>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, MoreHorizontal, ChevronUp, ChevronDown, ChevronsUpDown, Filter } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  columns: { type: Array, required: true },
  data: { type: Array, default: () => [] },
  title: String,
  count: [Number, String],
  variant: {
    type: String,
    default: undefined
  },
  compact: Boolean,
  selectable: Boolean,
  hoverable: { type: Boolean, default: true },
  searchable: Boolean,
  searchPlaceholder: { type: String, default: 'Filter table...' },
  filterable: Boolean,
  selectedRows: { type: Array, default: () => [] },
  hasRowActions: Boolean,
  emptyText: { type: String, default: 'No records found.' },
  size: { type: String, default: undefined },
  radius: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:selectedRows', 'row-click', 'sort', 'action-click', 'filter'])

const config = useIdesignConfig('Table', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'xl')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')
const isCompact = computed(() => props.compact || currentSize.value === 'sm')

const searchQuery = ref('')
const sortKey = ref(null)
const sortOrder = ref('asc')
const activeFilters = ref({})

const displayCount = computed(() => {
  if (props.count !== undefined && props.count !== null && props.count !== '') {
    return props.count
  }
  return props.data ? props.data.length : 0
})

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', { key: sortKey.value, order: sortOrder.value })
}

const toggleFilter = (key) => {
  activeFilters.value = {
    ...activeFilters.value,
    [key]: !activeFilters.value[key]
  }
  emit('filter', { key, active: activeFilters.value[key], activeFilters: activeFilters.value })
}

const filteredData = computed(() => {
  let list = [...props.data]

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(row => {
      return Object.values(row).some(val => String(val).toLowerCase().includes(q))
    })
  }

  if (sortKey.value) {
    list.sort((a, b) => {
      const valA = a[sortKey.value]
      const valB = b[sortKey.value]
      if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return list
})

const totalColspan = computed(() => {
  let count = props.columns.length
  if (props.selectable) count++
  if (props.hasRowActions || (props.$slots && props.$slots.actions)) count++
  return count
})

const isSelected = (row) => props.selectedRows.includes(row)

const isAllSelected = computed(() => {
  if (!filteredData.value.length) return false
  return filteredData.value.every(r => isSelected(r))
})

const isPartiallySelected = computed(() => {
  const selectedCount = filteredData.value.filter(r => isSelected(r)).length
  return selectedCount > 0 && selectedCount < filteredData.value.length
})

const toggleSelectRow = (row) => {
  const next = [...props.selectedRows]
  const idx = next.indexOf(row)
  if (idx >= 0) next.splice(idx, 1)
  else next.push(row)
  emit('update:selectedRows', next)
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    emit('update:selectedRows', [])
  } else {
    emit('update:selectedRows', [...filteredData.value])
  }
}

const onRowClick = (row, evt) => {
  emit('row-click', row, evt)
}

const onActionClick = (row, evt) => {
  emit('action-click', row, evt)
}
</script>

<style scoped>
.id-table-wrapper {
  width: 100%;
  border-radius: var(--r-panel);
  border: 1px solid var(--hairline);
  background: var(--surface);
  box-shadow: var(--sh-card);
  overflow: hidden;
  transition: all 0.2s var(--ease-out-quart);
}

/* Radius Classes */
.radius-none { border-radius: var(--r-none) !important; }
.radius-sm { border-radius: var(--r-chip) !important; }
.radius-md { border-radius: var(--r-thumb) !important; }
.radius-lg { border-radius: var(--r-card) !important; }
.radius-full { border-radius: var(--r-pill) !important; }

/* Glass Variant */
.variant-glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
}
:root.dark .variant-glass {
  background: rgba(28, 28, 30, 0.75);
}

/* ──────────────────────────────────────────────────────────
   BORDERLESS / NO DIVIDERS VARIANT
   Seamless table with NO visible row or column dividers.
   Row separation maintained purely via spacing, row hover,
   clean typography, and subtle surface contrast.
   ────────────────────────────────────────────────────────── */
.variant-borderless {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
}

.variant-borderless .table-header-bar {
  border-bottom: none !important;
  background: transparent !important;
  padding-left: 4px;
  padding-right: 4px;
}

.variant-borderless .id-table {
  border-collapse: separate;
  border-spacing: 0 4px;
}

.variant-borderless .id-table th {
  border-bottom: none !important;
  background: transparent !important;
  padding: 10px 14px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-3);
  letter-spacing: 0.05em;
}

.variant-borderless .id-table td {
  border-bottom: none !important;
  padding: 13px 14px;
  background: transparent;
  transition: background 0.15s var(--ease-out-quart);
}

.variant-borderless .id-table tbody tr td:first-child {
  border-top-left-radius: var(--r-thumb);
  border-bottom-left-radius: var(--r-thumb);
}
.variant-borderless .id-table tbody tr td:last-child {
  border-top-right-radius: var(--r-thumb);
  border-bottom-right-radius: var(--r-thumb);
}

.variant-borderless .id-table tbody tr.is-clickable:hover td,
.variant-borderless .id-table tbody tr:hover td {
  background: var(--hover);
}

.variant-borderless .id-table tbody tr.is-selected td {
  background: rgba(0, 113, 227, 0.06);
}
:root.dark .variant-borderless .id-table tbody tr.is-selected td {
  background: rgba(10, 132, 255, 0.12);
}

/* ──────────────────────────────────────────────────────────
   HEADER CONTROL BAR (Responsive)
   ────────────────────────────────────────────────────────── */
.table-header-bar {
  padding: 14px 18px;
  border-bottom: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: var(--surface);
  flex-wrap: wrap;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.table-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  min-width: 0;
}

.table-title {
  font-size: 15.5px;
  font-weight: 650;
  letter-spacing: var(--tracking-tight, -0.02em);
  color: var(--text);
  margin: 0;
  line-height: 1.25;
}

.table-count-badge {
  font-size: 11px;
  font-weight: 650;
  color: var(--accent);
  background: rgba(0, 113, 227, 0.08);
  padding: 2px 8px;
  border-radius: var(--r-pill);
  font-variant-numeric: tabular-nums;
}
:root.dark .table-count-badge {
  background: rgba(10, 132, 255, 0.15);
}

.table-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  max-width: 100%;
}

.table-search-box {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 180px;
}

.table-search-icon {
  position: absolute;
  left: 10px;
  color: var(--text-3);
  pointer-events: none;
}

.table-search-input {
  height: 32px;
  padding: 0 12px 0 30px;
  font-size: 12.5px;
  border-radius: var(--r-pill);
  border: 1px solid var(--hairline);
  background: var(--hover);
  color: var(--text);
  outline: none;
  width: 100%;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}

.table-search-input:focus {
  border-color: var(--accent);
  background: var(--surface);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.12);
}
:root.dark .table-search-input:focus {
  box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.2);
}

/* ──────────────────────────────────────────────────────────
   MAIN TABLE SURFACE
   ────────────────────────────────────────────────────────── */
.table-scroll-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.id-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13.5px;
}

.id-table th {
  padding: 12px 16px;
  background: var(--hover);
  color: var(--text-2);
  font-weight: 650;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--hairline);
  user-select: none;
  transition: color 0.15s ease, background 0.15s ease;
}

.id-table th.is-sortable {
  cursor: pointer;
}

.id-table th.is-sortable:hover {
  color: var(--text);
}

.id-table th.is-sorted {
  color: var(--accent);
}

.th-content {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.th-label {
  white-space: nowrap;
}

.sort-icon {
  flex-shrink: 0;
  color: var(--text-3);
  transition: color 0.15s ease;
}

.sort-icon.sort-neutral {
  opacity: 0.5;
}

.sort-icon.sort-active {
  color: var(--accent);
  opacity: 1;
}

.col-filter-btn {
  background: transparent;
  border: none;
  padding: 2px 4px;
  margin-left: 2px;
  color: var(--text-3);
  cursor: pointer;
  border-radius: var(--r-chip);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.col-filter-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--text);
}

.col-filter-btn.is-active {
  color: var(--accent);
  background: rgba(0, 113, 227, 0.1);
}

.id-table td {
  padding: 14px 16px;
  color: var(--text);
  border-bottom: 1px solid var(--hairline);
  vertical-align: middle;
  transition: background 0.15s var(--ease-out-quart);
}

.is-compact .id-table td {
  padding: 9px 12px;
  font-size: 12.5px;
}

.is-compact .id-table th {
  padding: 8px 12px;
  font-size: 11.5px;
}

.id-table tr:last-child td {
  border-bottom: none;
}

/* Row Hover & Selection */
.id-table tbody tr.is-clickable:hover td {
  background: var(--hover);
  cursor: pointer;
}

.id-table tbody tr.is-selected td {
  background: rgba(0, 113, 227, 0.06);
}

.variant-striped tbody tr:nth-child(even) td {
  background: rgba(0, 0, 0, 0.02);
}
:root.dark .variant-striped tbody tr:nth-child(even) td {
  background: rgba(255, 255, 255, 0.03);
}

/* ──────────────────────────────────────────────────────────
   CHECKBOXES & ROW ACTIONS
   ────────────────────────────────────────────────────────── */
.col-checkbox {
  width: 40px;
  text-align: center;
}

.id-table-checkbox {
  cursor: pointer;
  accent-color: var(--accent);
  width: 15px;
  height: 15px;
  vertical-align: middle;
}

.col-actions {
  width: 1%;
  white-space: nowrap;
  text-align: right;
}

.row-action-btn {
  background: transparent;
  border: none;
  color: var(--text-3);
  cursor: pointer;
  min-width: 32px;
  min-height: 32px;
  padding: 6px;
  border-radius: var(--r-thumb, 12px);
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.row-action-btn:hover {
  background: var(--hover);
  color: var(--text);
}

.row-action-btn:active {
  transform: scale(0.96);
}

.row-action-btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* ──────────────────────────────────────────────────────────
   EMPTY STATE
   ────────────────────────────────────────────────────────── */
.table-empty {
  text-align: center;
  color: var(--text-3);
  padding: 36px 16px !important;
}

.empty-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
}

.empty-icon {
  color: var(--text-4);
}

/* ──────────────────────────────────────────────────────────
   MOBILE & RESPONSIVE REFLOW
   ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .table-header-bar {
    padding: 12px 14px;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .table-title-group {
    width: 100%;
    justify-content: space-between;
  }

  .table-header-actions {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .table-search-box {
    flex: 1 1 100%;
    width: 100%;
    min-width: 0;
  }

  .table-search-input {
    width: 100%;
    height: 36px;
  }

  .col-actions {
    padding-right: 12px;
  }
}
</style>
