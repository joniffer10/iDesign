<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, X as ClearIcon } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'
import { resolveVariant } from '../../composables/useVariant'
import {
  parseDateString,
  formatDateString,
  formatDateDisplay,
  formatRangeDisplay,
  getDaysInMonthGrid,
  isDateInRange,
  isSameDay
} from '../../utils/dateUtils'

const props = defineProps({
  /** Controlled modelValue as object { start, end } or array [start, end] */
  modelValue: {
    type: [Object, Array],
    default: () => ({ start: '', end: '' })
  },
  /** Direct Start Date YYYY-MM-DD */
  startDate: {
    type: String,
    default: ''
  },
  /** Direct End Date YYYY-MM-DD */
  endDate: {
    type: String,
    default: ''
  },
  /** Form field label */
  label: {
    type: String,
    default: ''
  },
  /** Input placeholder string */
  placeholder: {
    type: String,
    default: 'Select date range...'
  },
  /** Range separator symbol/string */
  separator: {
    type: String,
    default: ' – '
  },
  /** Minimum selectable date YYYY-MM-DD */
  min: {
    type: String,
    default: ''
  },
  /** Maximum selectable date YYYY-MM-DD */
  max: {
    type: String,
    default: ''
  },
  /** Array of disabled dates YYYY-MM-DD or predicate function */
  disabledDates: {
    type: [Array, Function],
    default: null
  },
  /** Disable interaction */
  disabled: {
    type: Boolean,
    default: false
  },
  /** Readonly state */
  readonly: {
    type: Boolean,
    default: false
  },
  /** Size tier ('sm', 'md', 'lg') */
  size: {
    type: String,
    default: undefined
  },
  /** Visual surface variant ('default', 'subtle', 'soft', 'glass', 'hero') */
  variant: {
    type: String,
    default: undefined
  },
  /** Theme color hue */
  color: {
    type: String,
    default: 'primary'
  },
  /** Enable dual adjacent month calendars side-by-side */
  doubleMonth: {
    type: Boolean,
    default: false
  },
  /** UI slot class overrides */
  ui: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'update:modelValue',
  'update:startDate',
  'update:endDate',
  'change',
  'select-start',
  'select-end',
  'clear'
])

const config = useIdesignConfig('DateRangePicker', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => resolveVariant(props.variant || config.resolvedVariant.value || 'default'))

const wrapperRef = ref(null)
const isOpen = ref(false)
const viewMode = ref('days') // 'days' | 'months' | 'years'

// Active range values resolution
const resolvedStart = computed(() => {
  if (props.startDate) return props.startDate
  if (Array.isArray(props.modelValue)) return props.modelValue[0] || ''
  if (props.modelValue && typeof props.modelValue === 'object') return props.modelValue.start || ''
  return ''
})

const resolvedEnd = computed(() => {
  if (props.endDate) return props.endDate
  if (Array.isArray(props.modelValue)) return props.modelValue[1] || ''
  if (props.modelValue && typeof props.modelValue === 'object') return props.modelValue.end || ''
  return ''
})

// Range selection in-progress state
const selectingStart = ref(null)
const hoverDate = ref('')

const viewDate = ref(parseDateString(resolvedStart.value || new Date()))

watch([resolvedStart, resolvedEnd], ([newStart]) => {
  if (newStart && !selectingStart.value) {
    viewDate.value = parseDateString(newStart)
  }
})

const currentYear = computed(() => viewDate.value.getFullYear())
const currentMonth = computed(() => viewDate.value.getMonth())

const decadeStart = computed(() => Math.floor(currentYear.value / 12) * 12)

const monthsList = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const yearsList = computed(() => {
  const start = decadeStart.value
  const result = []
  for (let i = 0; i < 12; i++) {
    result.push(start + i)
  }
  return result
})

const monthName = computed(() => {
  return viewDate.value.toLocaleString('default', { month: 'short' })
})

// Next month for double-month view
const nextMonthViewDate = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 1)
})

const nextMonthName = computed(() => {
  return nextMonthViewDate.value.toLocaleString('default', { month: 'short' })
})

const nextMonthYear = computed(() => {
  return nextMonthViewDate.value.getFullYear()
})

const formattedDisplay = computed(() => {
  return formatRangeDisplay(
    resolvedStart.value,
    resolvedEnd.value,
    props.placeholder,
    props.separator
  )
})

const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'sm' ? 14 : sz === 'lg' ? 18 : 16
})

// Days grid for Month 1
const month1Days = computed(() => {
  return getDaysInMonthGrid(currentYear.value, currentMonth.value)
})

// Days grid for Month 2 (double month mode)
const month2Days = computed(() => {
  return getDaysInMonthGrid(nextMonthYear.value, nextMonthViewDate.value.getMonth())
})

// Check if day is disabled
const isDayDisabled = (dateStr) => {
  if (props.disabled || props.readonly) return true
  if (props.min && dateStr < props.min) return true
  if (props.max && dateStr > props.max) return true
  if (props.disabledDates) {
    if (typeof props.disabledDates === 'function') {
      return props.disabledDates(dateStr)
    }
    if (Array.isArray(props.disabledDates)) {
      return props.disabledDates.includes(dateStr)
    }
  }
  return false
}

// Compute active range limits
const effectiveRange = computed(() => {
  let s = resolvedStart.value
  let e = resolvedEnd.value

  if (selectingStart.value) {
    s = selectingStart.value
    e = hoverDate.value || selectingStart.value
  }

  if (s && e && s > e) {
    return { start: e, end: s, isPreview: !!selectingStart.value }
  }
  return { start: s, end: e, isPreview: !!selectingStart.value }
})

// Calculate cell range states
const getCellState = (dateStr) => {
  const { start, end, isPreview } = effectiveRange.value

  const isStart = isSameDay(dateStr, start)
  const isEnd = isSameDay(dateStr, end)
  const isSingle = isStart && isEnd
  const isInRange = isDateInRange(dateStr, start, end)

  return {
    isStart,
    isEnd,
    isSingle,
    isInRange: isInRange && !isStart && !isEnd,
    isRangePreview: isPreview && isInRange,
    isBoundary: isStart || isEnd
  }
}

const togglePopover = () => {
  if (props.disabled || props.readonly) return
  if (!isOpen.value) {
    viewMode.value = 'days'
    selectingStart.value = null
    hoverDate.value = ''
    if (resolvedStart.value) {
      viewDate.value = parseDateString(resolvedStart.value)
    }
  }
  isOpen.value = !isOpen.value
}

const toggleViewMode = (mode) => {
  viewMode.value = viewMode.value === mode ? 'days' : mode
}

const prev = () => {
  if (viewMode.value === 'days') {
    viewDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
  } else if (viewMode.value === 'months') {
    viewDate.value = new Date(currentYear.value - 1, currentMonth.value, 1)
  } else if (viewMode.value === 'years') {
    viewDate.value = new Date(currentYear.value - 12, currentMonth.value, 1)
  }
}

const next = () => {
  if (viewMode.value === 'days') {
    viewDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
  } else if (viewMode.value === 'months') {
    viewDate.value = new Date(currentYear.value + 1, currentMonth.value, 1)
  } else if (viewMode.value === 'years') {
    viewDate.value = new Date(currentYear.value + 12, currentMonth.value, 1)
  }
}

const selectMonth = (monthIdx) => {
  viewDate.value = new Date(currentYear.value, monthIdx, 1)
  viewMode.value = 'days'
}

const selectYear = (year) => {
  viewDate.value = new Date(year, currentMonth.value, 1)
  viewMode.value = 'months'
}

const handleDayHover = (dateStr) => {
  if (selectingStart.value) {
    hoverDate.value = dateStr
  }
}

const emitRange = (startStr, endStr) => {
  let finalStart = startStr
  let finalEnd = endStr

  if (finalStart && finalEnd && finalStart > finalEnd) {
    const temp = finalStart
    finalStart = finalEnd
    finalEnd = temp
  }

  emit('update:startDate', finalStart)
  emit('update:endDate', finalEnd)

  if (Array.isArray(props.modelValue)) {
    emit('update:modelValue', [finalStart, finalEnd])
  } else {
    emit('update:modelValue', { start: finalStart, end: finalEnd })
  }

  emit('change', { start: finalStart, end: finalEnd })
}

const selectDate = (dateStr) => {
  if (isDayDisabled(dateStr)) return

  // Selection Step 1: Start date selected
  if (!selectingStart.value) {
    selectingStart.value = dateStr
    hoverDate.value = dateStr
    emit('select-start', dateStr)
    emitRange(dateStr, '')
    return
  }

  // Selection Step 2: End date selected
  const startStr = selectingStart.value
  selectingStart.value = null
  hoverDate.value = ''

  emit('select-end', dateStr)
  emitRange(startStr, dateStr)
  isOpen.value = false
}

const selectPreset = (preset) => {
  const now = new Date()
  const todayStr = formatDateString(now)
  let start = ''
  let end = ''

  if (preset === 'today') {
    start = todayStr
    end = todayStr
  } else if (preset === 'week') {
    const first = new Date(now.setDate(now.getDate() - now.getDay()))
    const last = new Date(now.setDate(now.getDate() - now.getDay() + 6))
    start = formatDateString(first)
    end = formatDateString(last)
  } else if (preset === 'month') {
    const first = new Date(now.getFullYear(), now.getMonth(), 1)
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    start = formatDateString(first)
    end = formatDateString(last)
  }

  if (start && end) {
    viewDate.value = parseDateString(start)
    emitRange(start, end)
    isOpen.value = false
  }
}

const clearRange = () => {
  selectingStart.value = null
  hoverDate.value = ''
  emitRange('', '')
  emit('clear')
  isOpen.value = false
}

const handleOutside = (e) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target)) {
    isOpen.value = false
    selectingStart.value = null
    hoverDate.value = ''
  }
}

const handleKeydown = (e) => {
  if (props.disabled || props.readonly) return
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
    selectingStart.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutside)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    ref="wrapperRef"
    :class="[
      'id-date-range-picker',
      `size-${currentSize}`,
      `variant-${currentVariant}`,
      {
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-double-month': doubleMonth
      },
      config.mergedUi.value.base
    ]"
  >
    <label v-if="label" :class="['picker-label', config.mergedUi.value.label]">{{ label }}</label>

    <!-- Trigger Bar -->
    <div
      :class="[
        'picker-input',
        {
          'is-open': isOpen,
          'is-disabled': disabled,
          'has-value': !!resolvedStart || !!resolvedEnd
        },
        config.mergedUi.value.input
      ]"
      :tabindex="disabled ? undefined : 0"
      :aria-expanded="isOpen"
      role="combobox"
      aria-haspopup="dialog"
      aria-label="Date Range Picker"
      @click="togglePopover"
      @keydown.space.prevent="togglePopover"
      @keydown.enter.prevent="togglePopover"
    >
      <CalendarIcon :size="iconSize" :class="['calendar-icon', config.mergedUi.value.icon]" />
      
      <span :class="['picker-value', { 'is-placeholder': !resolvedStart && !resolvedEnd }, config.mergedUi.value.value]">
        {{ formattedDisplay || placeholder }}
      </span>

      <button
        v-if="(resolvedStart || resolvedEnd) && !disabled && !readonly"
        type="button"
        class="clear-input-btn"
        aria-label="Clear date range"
        @click.stop="clearRange"
      >
        <ClearIcon :size="14" />
      </button>
    </div>

    <!-- Popover Container -->
    <Transition name="popover">
      <div
        v-if="isOpen"
        :class="[
          'picker-popover',
          `view-${viewMode}`,
          { 'is-double': doubleMonth },
          config.mergedUi.value.popover
        ]"
        role="dialog"
        aria-modal="true"
        aria-label="Date Range Calendar"
      >
        <!-- Single Month Header Controls -->
        <div v-if="!doubleMonth" :class="['month-header', config.mergedUi.value.header]">
          <button
            type="button"
            class="nav-arrow"
            aria-label="Previous month"
            @click="prev"
          >
            <ChevronLeft :size="16" />
          </button>

          <div class="header-selectors">
            <button
              type="button"
              :class="['header-btn', 'month-select-btn', { 'is-active': viewMode === 'months' }]"
              @click="toggleViewMode('months')"
            >
              <span>{{ monthName }}</span>
              <ChevronDown :size="12" class="header-chevron" />
            </button>
            <button
              type="button"
              :class="['header-btn', 'year-select-btn', { 'is-active': viewMode === 'years' }]"
              @click="toggleViewMode('years')"
            >
              <span>{{ viewMode === 'years' ? `${decadeStart} – ${decadeStart + 11}` : currentYear }}</span>
              <ChevronDown :size="12" class="header-chevron" />
            </button>
          </div>

          <button
            type="button"
            class="nav-arrow"
            aria-label="Next month"
            @click="next"
          >
            <ChevronRight :size="16" />
          </button>
        </div>

        <!-- Dual Month Double Navigation Header -->
        <div v-else :class="['double-header', config.mergedUi.value.header]">
          <button type="button" class="nav-arrow" aria-label="Previous month" @click="prev">
            <ChevronLeft :size="16" />
          </button>

          <div class="double-titles">
            <span class="month-title">{{ monthName }} {{ currentYear }}</span>
            <span class="month-title">{{ nextMonthName }} {{ nextMonthYear }}</span>
          </div>

          <button type="button" class="nav-arrow" aria-label="Next month" @click="next">
            <ChevronRight :size="16" />
          </button>
        </div>

        <!-- 1. DAYS VIEW -->
        <template v-if="viewMode === 'days'">
          <div :class="['calendars-wrapper', { 'double-grid': doubleMonth }]">
            
            <!-- Calendar Month 1 -->
            <div class="calendar-pane">
              <div class="week-days">
                <span v-for="d in ['Su','Mo','Tu','We','Th','Fr','Sa']" :key="d" class="week-day">{{ d }}</span>
              </div>

              <div class="days-grid">
                <div
                  v-for="(day, idx) in month1Days"
                  :key="idx"
                  :class="[
                    'day-cell-wrapper',
                    {
                      'not-in-month': !day.inMonth,
                      'is-disabled': !day.inMonth || isDayDisabled(day.date),
                      'is-today': day.isToday,
                      ...getCellState(day.date)
                    }
                  ]"
                >
                  <div
                    v-if="day.inMonth && (getCellState(day.date).isInRange || getCellState(day.date).isBoundary)"
                    class="range-ribbon"
                  />
                  <button
                    type="button"
                    :disabled="!day.inMonth || isDayDisabled(day.date)"
                    :class="[
                      'day-cell',
                      {
                        'is-start-cell': getCellState(day.date).isStart,
                        'is-end-cell': getCellState(day.date).isEnd,
                        'is-selected-cell': getCellState(day.date).isBoundary
                      }
                    ]"
                    @click="selectDate(day.date)"
                    @mouseenter="handleDayHover(day.date)"
                  >
                    {{ day.dayNum }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Calendar Month 2 (Double Month Mode) -->
            <div v-if="doubleMonth" class="calendar-pane">
              <div class="week-days">
                <span v-for="d in ['Su','Mo','Tu','We','Th','Fr','Sa']" :key="d" class="week-day">{{ d }}</span>
              </div>

              <div class="days-grid">
                <div
                  v-for="(day, idx) in month2Days"
                  :key="idx"
                  :class="[
                    'day-cell-wrapper',
                    {
                      'not-in-month': !day.inMonth,
                      'is-disabled': !day.inMonth || isDayDisabled(day.date),
                      'is-today': day.isToday,
                      ...getCellState(day.date)
                    }
                  ]"
                >
                  <div
                    v-if="day.inMonth && (getCellState(day.date).isInRange || getCellState(day.date).isBoundary)"
                    class="range-ribbon"
                  />
                  <button
                    type="button"
                    :disabled="!day.inMonth || isDayDisabled(day.date)"
                    :class="[
                      'day-cell',
                      {
                        'is-start-cell': getCellState(day.date).isStart,
                        'is-end-cell': getCellState(day.date).isEnd,
                        'is-selected-cell': getCellState(day.date).isBoundary
                      }
                    ]"
                    @click="selectDate(day.date)"
                    @mouseenter="handleDayHover(day.date)"
                  >
                    {{ day.dayNum }}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </template>

        <!-- 2. MONTHS VIEW -->
        <template v-else-if="viewMode === 'months'">
          <div class="months-grid">
            <button
              v-for="(m, idx) in monthsList"
              :key="idx"
              type="button"
              :class="[
                'month-cell',
                {
                  'is-selected': idx === currentMonth,
                  'is-current-month': idx === new Date().getMonth() && currentYear === new Date().getFullYear()
                }
              ]"
              @click="selectMonth(idx)"
            >
              {{ m }}
            </button>
          </div>
        </template>

        <!-- 3. YEARS VIEW -->
        <template v-else-if="viewMode === 'years'">
          <div class="years-grid">
            <button
              v-for="yr in yearsList"
              :key="yr"
              type="button"
              :class="[
                'year-cell',
                {
                  'is-selected': yr === currentYear,
                  'is-current-year': yr === new Date().getFullYear()
                }
              ]"
              @click="selectYear(yr)"
            >
              {{ yr }}
            </button>
          </div>
        </template>

        <!-- Footer Actions & Presets -->
        <div class="picker-footer">
          <div class="footer-shortcuts">
            <button type="button" class="footer-btn" @click="selectPreset('today')">Today</button>
            <button type="button" class="footer-btn" @click="selectPreset('week')">This Week</button>
            <button type="button" class="footer-btn" @click="selectPreset('month')">This Month</button>
          </div>
          <button
            v-if="resolvedStart || resolvedEnd"
            type="button"
            class="footer-btn clear-btn"
            @click="clearRange"
          >
            Clear
          </button>
        </div>

      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ── Main Container ── */
.id-date-range-picker {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  font-family: var(--font);
  box-sizing: border-box;
}

.picker-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  letter-spacing: var(--tracking-tight, -0.01em);
}

/* ── Trigger Input Bar ── */
.picker-input {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 42px;
  padding: 0 14px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-sheet, 14px);
  box-shadow: var(--sh-card);
  cursor: pointer;
  user-select: none;
  transition: all 0.2s var(--ease-out-quart);
  outline: none;
}

.size-sm .picker-input { height: 36px; padding: 0 10px; border-radius: 10px; font-size: 13px; }
.size-lg .picker-input { height: 48px; padding: 0 16px; border-radius: 16px; font-size: 16px; }

.picker-input:hover:not(.is-disabled) {
  background: var(--hover);
  border-color: rgba(0, 0, 0, 0.15);
}

.picker-input.is-open {
  border-color: var(--accent);
  box-shadow: 0 0 0 3.5px rgba(0, 113, 227, 0.16);
}

.picker-input.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.calendar-icon {
  color: var(--text-3);
  flex-shrink: 0;
}

.picker-value {
  font-size: 14.5px;
  font-weight: 500;
  color: var(--text);
  flex: 1;
}

.picker-value.is-placeholder {
  color: var(--text-4);
}

.clear-input-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  border-radius: 50%;
  color: var(--text-3);
  cursor: pointer;
  transition: all 0.15s ease;
}

.clear-input-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: var(--text);
}

/* ── Popover Surface ── */
.picker-popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 100;
  width: 300px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-panel, 20px);
  box-shadow: var(--sh-overlay);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  user-select: none;
  box-sizing: border-box;
}

.picker-popover.is-double {
  width: 612px;
}

:root.dark .picker-popover,
html[data-theme="dark"] .picker-popover {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.12);
}

/* Header & Nav */
.month-header, .double-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.double-titles {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}

.header-selectors {
  display: flex;
  align-items: center;
  gap: 6px;
}

.header-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--hover);
  border: 1px solid var(--hairline);
  border-radius: var(--r-pill);
  padding: 4px 10px;
  font-family: var(--font);
  font-size: 13px;
  font-weight: 650;
  color: var(--text);
  cursor: pointer;
  transition: all 0.15s var(--ease-out-quart);
}

.header-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.15);
}

.header-btn.is-active {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
}

.header-btn.is-active .header-chevron {
  color: #ffffff;
  transform: rotate(180deg);
}

.header-chevron {
  color: var(--text-3);
  transition: transform 0.2s ease;
}

.nav-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--r-pill);
  color: var(--text-2);
  cursor: pointer;
  transition: all 0.15s ease;
}

.nav-arrow:hover {
  background: var(--hover);
  border-color: var(--hairline);
  color: var(--text);
}

/* Calendars Layout */
.calendars-wrapper {
  display: flex;
  gap: 16px;
}

.calendar-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Weekday Labels */
.week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text-3);
}

/* Days Grid */
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 3px;
}

/* ── Continuous Ribbon Highlight System ── */
.day-cell-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
}

.range-ribbon {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 0;
  right: 0;
  background: var(--accent-subtle, rgba(0, 113, 227, 0.14));
  pointer-events: none;
  transition: all 0.15s ease;
}

:root.dark .range-ribbon,
html[data-theme="dark"] .range-ribbon {
  background: rgba(10, 132, 255, 0.24);
}

.day-cell-wrapper.is-range-preview .range-ribbon {
  background: rgba(0, 113, 227, 0.1);
  border-top: 1px dashed var(--accent, #0071e3);
  border-bottom: 1px dashed var(--accent, #0071e3);
}

.day-cell-wrapper.is-start .range-ribbon {
  left: 2px;
  border-top-left-radius: 999px;
  border-bottom-left-radius: 999px;
}

.day-cell-wrapper.is-end .range-ribbon {
  right: 2px;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}

.day-cell-wrapper.is-single-day .range-ribbon {
  left: 2px;
  right: 2px;
  border-radius: 999px;
}

/* Day Button */
.day-cell {
  position: relative;
  z-index: 1;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 50%;
  font-family: var(--font);
  font-size: 13px;
  font-weight: 550;
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s var(--ease-out-quart);
  font-variant-numeric: tabular-nums;
  outline: none;
}

.day-cell:hover:not(:disabled) {
  background: var(--hover);
  transform: scale(1.05);
}

.day-cell-wrapper.not-in-month .day-cell {
  opacity: 0.25;
  cursor: default;
}

.day-cell-wrapper.is-today .day-cell {
  font-weight: 700;
  color: var(--accent);
  box-shadow: inset 0 0 0 1.5px var(--accent);
}

.day-cell.is-selected-cell {
  background: var(--accent) !important;
  color: #ffffff !important;
  font-weight: 700;
  box-shadow: none;
}

.day-cell-wrapper.is-disabled .day-cell {
  opacity: 0.2;
  cursor: not-allowed;
}

/* Month & Year Selection Grids */
.months-grid, .years-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 4px 0;
}

.month-cell, .year-cell {
  height: 42px;
  border: 1px solid var(--hairline);
  background: var(--hover);
  border-radius: 12px;
  font-family: var(--font);
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s var(--ease-out-quart);
}

.month-cell:hover, .year-cell:hover {
  background: rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.month-cell.is-selected, .year-cell.is-selected {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.25);
}

/* Footer Shortcuts */
.picker-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--hairline);
  padding-top: 10px;
  margin-top: 2px;
}

.footer-shortcuts {
  display: flex;
  align-items: center;
  gap: 4px;
}

.footer-btn {
  background: transparent;
  border: none;
  font-family: var(--font);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--accent);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.footer-btn:hover {
  background: rgba(0, 113, 227, 0.08);
}

.clear-btn {
  color: var(--text-3);
}

.clear-btn:hover {
  background: var(--hover);
  color: var(--danger, #ff3b30);
}

/* Popover Transition */
.popover-enter-active,
.popover-leave-active {
  transition: opacity 0.2s var(--ease-spring), transform 0.2s var(--ease-spring);
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
