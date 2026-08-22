/**
 * ════════════════════════════════════════════════════════════════
 * Idesign — Date & Range Utility Helpers
 * ════════════════════════════════════════════════════════════════
 */

/**
 * Parse a YYYY-MM-DD date string or Date object safely.
 */
export function parseDateString(str) {
  if (!str) return new Date()
  if (str instanceof Date) {
    return isNaN(str.getTime()) ? new Date() : new Date(str.getTime())
  }
  const strVal = String(str).trim()
  const parts = strVal.split('-')
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10)
    const m = parseInt(parts[1], 10) - 1
    const d = parseInt(parts[2], 10)
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      return new Date(y, m, d)
    }
  }
  const parsed = new Date(strVal)
  return isNaN(parsed.getTime()) ? new Date() : parsed
}

/**
 * Format a Date object to YYYY-MM-DD string.
 */
export function formatDateString(date) {
  if (!date) return ''
  const d = parseDateString(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Format YYYY-MM-DD to localized display string (e.g. "Aug 15, 2026").
 */
export function formatDateDisplay(dateStr, locale = undefined, options = {}) {
  if (!dateStr) return ''
  const d = parseDateString(dateStr)
  const defaultOpts = { year: 'numeric', month: 'short', day: 'numeric', ...options }
  return d.toLocaleDateString(locale, defaultOpts)
}

/**
 * Format date range for input field display (e.g. "Aug 1 – Aug 15, 2026").
 */
export function formatRangeDisplay(startStr, endStr, placeholder = 'Select date range...', separator = ' – ', locale = undefined) {
  if (!startStr && !endStr) return ''
  if (startStr && !endStr) {
    return `${formatDateDisplay(startStr, locale)}${separator}`
  }
  if (!startStr && endStr) {
    return `${separator}${formatDateDisplay(endStr, locale)}`
  }

  const d1 = parseDateString(startStr)
  const d2 = parseDateString(endStr)

  // Same year & month formatting enhancement
  if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()) {
    const m = d1.toLocaleDateString(locale, { month: 'short' })
    const y = d1.getFullYear()
    return `${m} ${d1.getDate()}${separator}${d2.getDate()}, ${y}`
  }

  // Same year formatting
  if (d1.getFullYear() === d2.getFullYear()) {
    const m1 = d1.toLocaleDateString(locale, { month: 'short', day: 'numeric' })
    const m2 = d2.toLocaleDateString(locale, { month: 'short', day: 'numeric' })
    const y = d1.getFullYear()
    return `${m1}${separator}${m2}, ${y}`
  }

  return `${formatDateDisplay(startStr, locale)}${separator}${formatDateDisplay(endStr, locale)}`
}

/**
 * Generate 42-day calendar grid for a given year and month.
 */
export function getDaysInMonthGrid(year, month) {
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
    result.push({ dayNum: d, inMonth: false, date: dateStr, isToday: false, year: y, month: m - 1 })
  }

  // Current month days
  const now = new Date()
  const todayStr = formatDateString(now)
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    result.push({ dayNum: i, inMonth: true, date: dateStr, isToday: dateStr === todayStr, year, month })
  }

  // Next month padding to complete 42 cells (6 rows)
  const remaining = 42 - result.length
  for (let i = 1; i <= remaining; i++) {
    const m = month + 2 > 12 ? 1 : month + 2
    const y = month + 2 > 12 ? year + 1 : year
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    result.push({ dayNum: i, inMonth: false, date: dateStr, isToday: false, year: y, month: m - 1 })
  }

  return result
}

/**
 * Check if a date string falls strictly between start and end (inclusive).
 */
export function isDateInRange(dateStr, startStr, endStr) {
  if (!dateStr || !startStr || !endStr) return false
  const s = startStr < endStr ? startStr : endStr
  const e = startStr < endStr ? endStr : startStr
  return dateStr >= s && dateStr <= e
}

/**
 * Compare two YYYY-MM-DD date strings for equality.
 */
export function isSameDay(dateStr1, dateStr2) {
  return !!(dateStr1 && dateStr2 && dateStr1 === dateStr2)
}
