<template>
  <div
    ref="wrapperRef"
    :class="[
      'id-date-picker',
      `size-${currentSize}`,
      `variant-${currentVariant}`,
      config.mergedUi.value.base
    ]"
  >
    <label v-if="label" :class="['picker-label', config.mergedUi.value.label]">{{ label }}</label>
    <div
      :class="[
        'picker-input',
        { 'is-open': isOpen, 'is-disabled': disabled },
        config.mergedUi.value.input
      ]"
      :tabindex="disabled ? undefined : 0"
      :aria-expanded="isOpen"
      role="combobox"
      aria-haspopup="dialog"
      @click="!disabled && toggle()"
      @keydown.space.prevent="!disabled && toggle()"
      @keydown.enter.prevent="!disabled && toggle()"
    >
      <CalendarIcon :size="iconSize" :class="['calendar-icon', config.mergedUi.value.icon]" />
      <span :class="['picker-value', { 'is-placeholder': !modelValue }, config.mergedUi.value.value]">
        {{ formattedValue || placeholder }}
      </span>
    </div>

    <Transition name="popover">
      <div
        v-if="isOpen"
        :class="['picker-popover', `view-${viewMode}`, config.mergedUi.value.popover]"
        role="dialog"
        aria-modal="true"
        aria-label="Date Picker"
      >
        <!-- Header Controls -->
        <div :class="['month-header', config.mergedUi.value.header]">
          <button
            type="button"
            class="nav-arrow"
            :aria-label="prevAriaLabel"
            @click="prev"
          >
            <ChevronLeft :size="16" />
          </button>

          <!-- Selectable Month & Year Header Titles -->
          <div class="header-selectors">
            <button
              type="button"
              :class="['header-btn', 'month-select-btn', { 'is-active': viewMode === 'months' }]"
              :aria-label="`Select month. Currently ${monthName}`"
              @click="toggleViewMode('months')"
            >
              <span>{{ monthName }}</span>
              <ChevronDown :size="12" class="header-chevron" />
            </button>
            <button
              type="button"
              :class="['header-btn', 'year-select-btn', { 'is-active': viewMode === 'years' }]"
              :aria-label="`Select year. Currently ${currentYear}`"
              @click="toggleViewMode('years')"
            >
              <span>{{ viewMode === 'years' ? `${decadeStart} – ${decadeStart + 11}` : currentYear }}</span>
              <ChevronDown :size="12" class="header-chevron" />
            </button>
          </div>

          <button
            type="button"
            class="nav-arrow"
            :aria-label="nextAriaLabel"
            @click="next"
          >
            <ChevronRight :size="16" />
          </button>
        </div>

        <!-- 1. DAYS VIEW -->
        <template v-if="viewMode === 'days'">
          <!-- Days of Week Header -->
          <div class="week-days">
            <span v-for="d in ['Su','Mo','Tu','We','Th','Fr','Sa']" :key="d" class="week-day">{{ d }}</span>
          </div>

          <!-- Days Grid -->
          <div class="days-grid">
            <button
              v-for="(day, idx) in days"
              :key="idx"
              type="button"
              :disabled="!day.inMonth || isDayDisabled(day.date)"
              :class="[
                'day-cell',
                {
                  'not-in-month': !day.inMonth,
                  'is-today': day.isToday,
                  'is-selected': isSelected(day.date),
                  'is-disabled': isDayDisabled(day.date)
                }
              ]"
              @click="selectDate(day.date)"
            >
              {{ day.dayNum }}
            </button>
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

        <!-- Footer Actions (Today / Clear) -->
        <div class="picker-footer">
          <button type="button" class="footer-btn today-btn" @click="selectToday">
            Today
          </button>
          <button v-if="modelValue" type="button" class="footer-btn clear-btn" @click="clearDate">
            Clear
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from '@lucide/vue'
import { useIdesignConfig } from '../../composables/useIdesignConfig'

const props = defineProps({
  modelValue: { type: String, default: '' }, // YYYY-MM-DD
  label: String,
  placeholder: { type: String, default: 'Select date...' },
  size: { type: String, default: undefined },
  variant: { type: String, default: undefined },
  min: String,
  max: String,
  disabled: Boolean,
  ui: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue', 'change'])

const config = useIdesignConfig('DatePicker', props)
const currentSize = computed(() => config.resolvedSize.value || 'md')
const currentVariant = computed(() => config.resolvedVariant.value || 'default')

const wrapperRef = ref(null)
const isOpen = ref(false)
const viewMode = ref('days') // 'days' | 'months' | 'years'

const parseDateString = (str) => {
  if (!str) return new Date()
  const parts = String(str).split('-')
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10)
    const m = parseInt(parts[1], 10) - 1
    const d = parseInt(parts[2], 10)
    return new Date(y, m, d)
  }
  const parsed = new Date(str)
  return isNaN(parsed.getTime()) ? new Date() : parsed
}

const viewDate = ref(parseDateString(props.modelValue))

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    viewDate.value = parseDateString(newVal)
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

const formattedValue = computed(() => {
  if (!props.modelValue) return ''
  const d = parseDateString(props.modelValue)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
})

const iconSize = computed(() => {
  const sz = currentSize.value
  return sz === 'sm' ? 14 : sz === 'lg' ? 18 : 16
})

const prevAriaLabel = computed(() => {
  if (viewMode.value === 'days') return 'Previous month'
  if (viewMode.value === 'months') return 'Previous year'
  return 'Previous 12 years'
})

const nextAriaLabel = computed(() => {
  if (viewMode.value === 'days') return 'Next month'
  if (viewMode.value === 'months') return 'Next year'
  return 'Next 12 years'
})

const days = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDayIndex = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const result = []

  // Prev month padding
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = prevMonthDays - i
    const m = month === 0 ? 12 : month
    const y = month === 0 ? year - 1 : year
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    result.push({ dayNum: d, inMonth: false, date: dateStr, isToday: false })
  }

  // Current month days
  const now = new Date()
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    result.push({ dayNum: i, inMonth: true, date: dateStr, isToday: dateStr === todayStr })
  }

  // Next month padding to complete 42 cells (6 rows)
  const remaining = 42 - result.length
  for (let i = 1; i <= remaining; i++) {
    const m = month + 2 > 12 ? 1 : month + 2
    const y = month + 2 > 12 ? year + 1 : year
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    result.push({ dayNum: i, inMonth: false, date: dateStr, isToday: false })
  }

  return result
})

const isDayDisabled = (dateStr) => {
  if (props.min && dateStr < props.min) return true
  if (props.max && dateStr > props.max) return true
  return false
}

const toggle = () => {
  if (!isOpen.value) {
    viewMode.value = 'days'
    if (props.modelValue) {
      viewDate.value = parseDateString(props.modelValue)
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

const isSelected = (dateStr) => props.modelValue === dateStr

const selectDate = (dateStr) => {
  emit('update:modelValue', dateStr)
  emit('change', dateStr)
  isOpen.value = false
}

const selectToday = () => {
  const now = new Date()
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  viewDate.value = new Date()
  emit('update:modelValue', todayStr)
  emit('change', todayStr)
  isOpen.value = false
}

const clearDate = () => {
  emit('update:modelValue', '')
  emit('change', '')
  isOpen.value = false
}

const handleOutside = (e) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleOutside))
</script>

<style scoped>
.id-date-picker {
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

/* ──────────────────────────────────────────────────────────
   POPOVER SURFACE & VIEWS
   ────────────────────────────────────────────────────────── */
.picker-popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 100;
  width: 296px;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-panel, 20px);
  box-shadow: var(--sh-overlay);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  user-select: none;
}

:root.dark .picker-popover {
  background: #1c1c1e;
  border-color: rgba(255, 255, 255, 0.12);
}

/* Month & Year Header */
.month-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
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
  background: var(--surface-2, rgba(0, 0, 0, 0.08));
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

/* Days View */
.week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text-3);
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
}

.day-cell {
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

.day-cell:hover:not(:disabled):not(.is-disabled) {
  background: var(--hover);
  transform: scale(1.05);
}

.day-cell.not-in-month {
  opacity: 0.25;
  cursor: default;
}

.day-cell.is-today {
  font-weight: 700;
  color: var(--accent);
  box-shadow: inset 0 0 0 1px var(--accent);
}

.day-cell.is-selected {
  background: var(--accent) !important;
  color: #ffffff !important;
  font-weight: 700;
  box-shadow: none;
}

.day-cell.is-disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

/* Months Grid */
.months-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 4px 0;
}

.month-cell {
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

.month-cell:hover {
  background: var(--surface-2, rgba(0, 0, 0, 0.08));
  border-color: rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.month-cell.is-selected {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.25);
}

.month-cell.is-current-month:not(.is-selected) {
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 700;
}

/* Years Grid */
.years-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 4px 0;
}

.year-cell {
  height: 42px;
  border: 1px solid var(--hairline);
  background: var(--hover);
  border-radius: 12px;
  font-family: var(--font);
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s var(--ease-out-quart);
}

.year-cell:hover {
  background: var(--surface-2, rgba(0, 0, 0, 0.08));
  border-color: rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.year-cell.is-selected {
  background: var(--accent);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.25);
}

.year-cell.is-current-year:not(.is-selected) {
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 700;
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

.footer-btn {
  background: transparent;
  border: none;
  font-family: var(--font);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.today-btn {
  color: var(--accent);
}
.today-btn:hover {
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
