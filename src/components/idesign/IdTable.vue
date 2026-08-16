<template>
  <div :class="['id-table-wrapper', `variant-${currentVariant}`, `radius-${currentRadius}`, { 'is-compact': isCompact, 'is-selectable': selectable }, config.mergedUi.value.base]">
    <!-- Header Control Bar (optional title, search, global actions) -->
    <div v-if="title || $slots.header || searchable || $slots.headerActions" :class="['table-header-bar', config.mergedUi.value.headerBar]">
      <div class="table-title-group">
        <slot name="header">
          <h3 v-if="title" :class="['table-title', config.mergedUi.value.title]">{{ title }}</h3>
          <span v-if="displayCount !== null && displayCount !== undefined" class="table-count-badge">{{ displayCount }}</span>
        </slot>
      </div>

      <div class="table-header-actions">
        <!-- Live Table Search Input -->
        <div v-if="searchable" :class="['table-search-box', config.mergedUi.value.searchBox]">
          <Search :size="14" class="table-search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Filter table..."
            :class="['table-search-input', config.mergedUi.value.searchInput]"
          />
        </div>
        <slot name="headerActions" />
      </div>
    </div>

    <!-- Main Table Surface -->
    <div class="table-scroll-container">
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
                @change="toggleSelectAll"
              />
            </th>

            <!-- Columns -->
            <th
              v-for="col in columns"
              :key="col.key"
              :style="{ width: col.width, textAlign: col.align || 'left' }"
              :class="[{ 'is-sortable': col.sortable }, config.mergedUi.value.th]"
              @click="col.sortable && handleSort(col.key)"
            >
              <div class="th-content" :style="{ justifyContent: col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start' }">
                <span>{{ col.label }}</span>
                <template v-if="col.sortable">
                  <ChevronUp v-if="sortKey === col.key && sortOrder === 'asc'" :size="13" />
                  <ChevronDown v-else-if="sortKey === col.key && sortOrder === 'desc'" :size="13" />
                  <span v-else class="sort-neutral">↕</span>
                </template>
              </div>
            </th>

            <!-- Action Column Header -->
            <th v-if="$slots.actions || hasRowActions" :class="['col-actions', config.mergedUi.value.th]" style="text-align: right;">
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
            <td v-if="$slots.actions || hasRowActions" :class="['col-actions', config.mergedUi.value.td]" style="text-align: right;" @click.stop>
              <slot name="actions" :row="row" :index="rIdx">
                <button type="button" :class="['row-action-btn', config.mergedUi.value.actions]" aria-label="Row actions">
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
import { Search, MoreHorizontal, ChevronUp, ChevronDown } from '@lucide/vue'
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
  selectedRows: { type: Array, default: () => [] },
  hasRowActions: Boolean,
  emptyText: { type: String, default: 'No records found.' },
  size: { type: String, default: undefined },
  radius: { type: String, default: undefined },
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:selectedRows', 'row-click', 'sort'])

const config = useIdesignConfig('Table', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentRadius = computed(() => config.resolvedRadius.value || 'xl')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')
const isCompact = computed(() => props.compact || currentSize.value === 'sm')

const searchQuery = ref('')
const sortKey = ref(null)
const sortOrder = ref('asc')

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
  if (props.hasRowActions) count++
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
</script>

<style scoped>
.id-table-wrapper {
  width: 100%; border-radius: var(--r-panel); border: 1px solid var(--hairline);
  background: var(--surface); box-shadow: var(--sh-card); overflow: hidden;
  transition: all 0.2s var(--ease-out-quart);
}

/* Radius Classes */
.radius-none { border-radius: var(--r-none) !important; }
.radius-sm { border-radius: var(--r-chip) !important; }
.radius-md { border-radius: var(--r-thumb) !important; }
.radius-lg { border-radius: var(--r-card) !important; }
.radius-full { border-radius: var(--r-pill) !important; }

.variant-glass {
  background: rgba(255, 255, 255, 0.75); backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
}
:root.dark .variant-glass { background: rgba(28, 28, 30, 0.75); }

.variant-borderless {
  border: none; box-shadow: none; background: transparent;
}

/* Header Control Bar */
.table-header-bar {
  padding: 14px 18px; border-bottom: 1px solid var(--hairline);
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  background: var(--surface);
}
.table-title-group { display: flex; align-items: center; gap: 8px; }
.table-title { font-size: 16px; font-weight: 650; color: var(--text); margin: 0; }
.table-count-badge {
  font-size: 11px; font-weight: 700; color: var(--accent); background: rgba(0,113,227,0.08);
  padding: 2px 8px; border-radius: var(--r-pill); font-variant-numeric: tabular-nums;
}

.table-header-actions { display: flex; align-items: center; gap: 10px; }
.table-search-box {
  position: relative; display: flex; align-items: center;
}
.table-search-icon { position: absolute; left: 10px; color: var(--text-3); pointer-events: none; }
.table-search-input {
  height: 32px; padding: 0 12px 0 30px; font-size: 12.5px; border-radius: var(--r-pill);
  border: 1px solid var(--hairline); background: var(--hover); color: var(--text);
  outline: none; transition: border-color 0.15s;
}
.table-search-input:focus { border-color: var(--accent); background: var(--surface); }

/* Table Table Element */
.table-scroll-container { width: 100%; overflow-x: auto; }
.id-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px; }

.id-table th {
  padding: 12px 16px; background: var(--hover); color: var(--text-2);
  font-weight: 650; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;
  border-bottom: 1px solid var(--hairline); user-select: none;
}
.id-table th.is-sortable { cursor: pointer; }
.id-table th.is-sortable:hover { color: var(--text); }

.th-content { display: inline-flex; align-items: center; gap: 4px; }
.sort-neutral { opacity: 0.4; font-size: 11px; }

.id-table td {
  padding: 14px 16px; color: var(--text); border-bottom: 1px solid var(--hairline);
  vertical-align: middle; transition: background 0.15s;
}
.is-compact .id-table td { padding: 9px 12px; font-size: 12.5px; }
.is-compact .id-table th { padding: 8px 12px; font-size: 11.5px; }

.id-table tr:last-child td { border-bottom: none; }

/* Row Hover & Striped Styles */
.id-table tbody tr.is-clickable:hover { background: var(--hover); cursor: pointer; }
.id-table tbody tr.is-selected { background: rgba(0, 113, 227, 0.06); }

.variant-striped tbody tr:nth-child(even) { background: rgba(0, 0, 0, 0.02); }
:root.dark .variant-striped tbody tr:nth-child(even) { background: rgba(255, 255, 255, 0.03); }

/* Checkboxes & Action Buttons */
.col-checkbox { width: 40px; text-align: center; }
.id-table-checkbox { cursor: pointer; accent-color: var(--accent); width: 15px; height: 15px; }

.col-actions { width: 90px; }
.row-action-btn {
  background: transparent; border: none; color: var(--text-3); cursor: pointer;
  padding: 4px 8px; border-radius: var(--r-chip); transition: all 0.15s;
  display: inline-flex; align-items: center; justify-content: center;
}
.row-action-btn:hover { background: var(--hover); color: var(--text); }

.table-empty { text-align: center; color: var(--text-3); padding: 36px 16px !important; }
.empty-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 13.5px; }
.empty-icon { color: var(--text-4); }
</style>
