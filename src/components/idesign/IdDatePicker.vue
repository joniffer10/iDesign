<template>
  <div ref="wrapperRef" class="id-date-picker">
    <label v-if="label" class="picker-label">{{ label }}</label>
    <div
      :class="['picker-input', { 'is-open': isOpen }]"
      tabindex="0"
      @click="toggle"
      @keydown.space.prevent="toggle"
      @keydown.enter.prevent="toggle"
    >
      <CalendarIcon :size="16" class="calendar-icon" />
      <span :class="['picker-value', { 'is-placeholder': !modelValue }]">
        {{ formattedValue || placeholder }}
      </span>
    </div>

    <Transition name="popover">
      <div v-if="isOpen" class="picker-popover">
        <!-- Month Header -->
        <div class="month-header">
          <button type="button" class="nav-arrow" aria-label="Previous month" @click="prevMonth"><ChevronLeft :size="16" /></button>
          <span class="month-title">{{ monthName }} {{ currentYear }}</span>
          <button type="button" class="nav-arrow" aria-label="Next month" @click="nextMonth"><ChevronRight :size="16" /></button>
        </div>

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
            :disabled="!day.inMonth"
            :class="[
              'day-cell',
              {
                'not-in-month': !day.inMonth,
                'is-today': day.isToday,
                'is-selected': isSelected(day.date)
              }
            ]"
            @click="selectDate(day.date)"
          >
            {{ day.dayNum }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from '@lucide/vue'

const props = defineProps({
  modelValue: { type: String, default: '' }, // YYYY-MM-DD
  label: String,
  placeholder: { type: String, default: 'Select date...' }
})

const emit = defineEmits(['update:modelValue'])

const wrapperRef = ref(null)
const isOpen = ref(false)

const viewDate = ref(props.modelValue ? new Date(props.modelValue) : new Date())

const currentYear = computed(() => viewDate.value.getFullYear())
const currentMonth = computed(() => viewDate.value.getMonth())

const monthName = computed(() => {
  return viewDate.value.toLocaleString('default', { month: 'long' })
})

const formattedValue = computed(() => {
  if (!props.modelValue) return ''
  const d = new Date(props.modelValue + 'T00:00:00')
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
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
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`
    result.push({ dayNum: prevMonthDays - i, inMonth: false, date: dateStr, isToday: false })
  }

  // Current month days
  const todayStr = new Date().toISOString().split('T')[0]
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    result.push({ dayNum: i, inMonth: true, date: dateStr, isToday: dateStr === todayStr })
  }

  // Next month padding to complete 42 cells (6 rows)
  const remaining = 42 - result.length
  for (let i = 1; i <= remaining; i++) {
    const dateStr = `${year}-${String(month + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    result.push({ dayNum: i, inMonth: false, date: dateStr, isToday: false })
  }

  return result
})

const toggle = () => { isOpen.value = !isOpen.value }
const prevMonth = () => { viewDate.value = new Date(currentYear.value, currentMonth.value - 1, 1) }
const nextMonth = () => { viewDate.value = new Date(currentYear.value, currentMonth.value + 1, 1) }

const isSelected = (dateStr) => props.modelValue === dateStr

const selectDate = (dateStr) => {
  emit('update:modelValue', dateStr)
  isOpen.value = false
}

const handleOutside = (e) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target)) isOpen.value = false
}

onMounted(() => document.addEventListener('click', handleOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleOutside))
</script>

<style scoped>
.id-date-picker { position: relative; display: flex; flex-direction: column; gap: 6px; width: 100%; }
.picker-label { font-size: 13px; font-weight: 600; color: var(--text-2); }
.picker-input {
  display: flex; align-items: center; gap: 10px; height: 42px; padding: 0 12px;
  background: var(--surface); border: 1px solid rgba(0,0,0,0.12); border-radius: 10px;
  cursor: pointer; user-select: none; transition: border-color .2s, box-shadow .2s;
}
.picker-input.is-open { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0,113,227,0.15); }
.calendar-icon { color: var(--text-3); flex-shrink: 0; }
.picker-value { font-size: 14.5px; color: var(--text); flex: 1; }
.picker-value.is-placeholder { color: var(--text-4); }

.picker-popover {
  position: absolute; top: calc(100% + 6px); left: 0; z-index: 70; width: 280px;
  background: var(--surface); border: 1px solid var(--hairline); border-radius: 16px;
  box-shadow: var(--sh-overlay); padding: 14px; display: flex; flex-direction: column; gap: 10px;
}
.month-header { display: flex; align-items: center; justify-content: space-between; }
.month-title { font-size: 14px; font-weight: 700; color: var(--text); }
.nav-arrow { background: transparent; border: none; font-size: 18px; color: var(--text-2); cursor: pointer; padding: 0 8px; border-radius: 6px; }
.nav-arrow:hover { background: var(--hover); }
.week-days { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 11px; font-weight: 700; color: var(--text-3); }
.days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.day-cell {
  height: 32px; border: none; background: transparent; border-radius: 50%; font-family: var(--font);
  font-size: 13px; font-weight: 550; color: var(--text); cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .15s; font-variant-numeric: tabular-nums;
}
.day-cell:hover:not(:disabled) { background: var(--hover); }
.day-cell.not-in-month { opacity: .25; cursor: default; }
.day-cell.is-today { font-weight: 700; color: var(--accent); }
.day-cell.is-selected { background: var(--accent) !important; color: #fff !important; font-weight: 700; }

.popover-enter-active, .popover-leave-active { transition: opacity .15s, transform .15s var(--ease-out-quart); }
.popover-enter-from, .popover-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
