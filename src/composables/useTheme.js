/* ════════════════════════════════════════════════════════════════
   Idesign — Liquid Glass Animated Theme Composable (`useTheme`)
   Vue 3 & Nuxt 3 Native Support
   ════════════════════════════════════════════════════════════════ */

import { ref, computed } from 'vue'

const STORAGE_DARK_KEY = 'idesign_dark'
const STORAGE_THEME_KEY = 'idesign_theme'

// Shared singleton reactive state
const themeState = ref('light') // 'light' | 'dark' | 'auto'
const isDarkState = ref(false)
const isTransitioning = ref(false)
let isInitialized = false
let mediaQueryList = null

function getSystemDark() {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolveIsDark(themeValue) {
  if (themeValue === 'dark') return true
  if (themeValue === 'light') return false
  return getSystemDark()
}

function applyThemeDom(dark, themeValue) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (dark) {
    root.classList.add('dark')
    root.classList.remove('light')
    root.setAttribute('data-theme', 'dark')
  } else {
    root.classList.remove('dark')
    root.classList.add('light')
    root.setAttribute('data-theme', 'light')
  }
}

/**
 * Initializes the theme from localStorage or system preference.
 */
export function initTheme() {
  if (typeof window === 'undefined' || isInitialized) return
  isInitialized = true

  const savedTheme = localStorage.getItem(STORAGE_THEME_KEY)
  const savedDark = localStorage.getItem(STORAGE_DARK_KEY)

  let initialTheme = 'auto'
  if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'auto') {
    initialTheme = savedTheme
  } else if (savedDark !== null) {
    initialTheme = savedDark === 'true' ? 'dark' : 'light'
  } else if (document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark') {
    initialTheme = 'dark'
  }

  themeState.value = initialTheme
  const dark = resolveIsDark(initialTheme)
  isDarkState.value = dark
  applyThemeDom(dark, initialTheme)

  // Listen to system theme changes
  if (window.matchMedia) {
    mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = (e) => {
      if (themeState.value === 'auto') {
        isDarkState.value = e.matches
        applyThemeDom(e.matches, 'auto')
      }
    }
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleSystemChange)
    } else if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handleSystemChange)
    }
  }
}

// Auto-run if running in browser
if (typeof window !== 'undefined') {
  initTheme()
}

/**
 * Executes a smooth animated transition between light and dark themes.
 * Uses View Transitions API (with radial reveal or cross-fade) where supported,
 * and gracefully falls back to CSS token interpolation.
 */
export async function executeThemeTransition(newTheme, options = {}) {
  const targetTheme = newTheme === 'toggle' 
    ? (isDarkState.value ? 'light' : 'dark') 
    : newTheme

  const nextDark = resolveIsDark(targetTheme)
  if (targetTheme === themeState.value && nextDark === isDarkState.value) {
    return
  }

  const effect = options.effect || 'reveal' // 'reveal' | 'fade' | 'none'
  const event = options.event || (options instanceof MouseEvent ? options : null)

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const commitTheme = () => {
    themeState.value = targetTheme
    isDarkState.value = nextDark
    applyThemeDom(nextDark, targetTheme)

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_THEME_KEY, targetTheme)
      localStorage.setItem(STORAGE_DARK_KEY, nextDark ? 'true' : 'false')
    }
  }

  // 1. Instant update if reduced motion or effect is disabled
  if (prefersReducedMotion || effect === 'none' || typeof document === 'undefined') {
    commitTheme()
    return
  }

  // 2. View Transitions API (Modern Chrome, Edge, Safari 18+)
  if (typeof document !== 'undefined' && typeof document.startViewTransition === 'function') {
    isTransitioning.value = true

    // Compute origin coordinates for expanding radial reveal
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    if (options.x !== undefined && options.y !== undefined) {
      x = options.x
      y = options.y
    } else if (event && typeof event.clientX === 'number') {
      x = event.clientX
      y = event.clientY
    } else if (options.target && options.target.getBoundingClientRect) {
      const rect = options.target.getBoundingClientRect()
      x = rect.left + rect.width / 2
      y = rect.top + rect.height / 2
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    if (effect === 'fade') {
      document.documentElement.setAttribute('data-theme-transition', 'fade')
    }

    try {
      const transition = document.startViewTransition(() => {
        commitTheme()
      })

      await transition.ready

      if (effect === 'reveal') {
        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 380,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        )
        await animation.finished
      } else {
        await transition.finished
      }
    } catch (e) {
      // Fallback in case transition failed
      commitTheme()
    } finally {
      document.documentElement.removeAttribute('data-theme-transition')
      isTransitioning.value = false
    }
    return
  }

  // 3. Performant CSS Token Interpolation Fallback
  isTransitioning.value = true
  const root = document.documentElement
  root.classList.add('theme-transitioning')

  commitTheme()

  setTimeout(() => {
    root.classList.remove('theme-transitioning')
    isTransitioning.value = false
  }, 360)
}

/**
 * useTheme Composable
 */
export function useTheme() {
  initTheme()

  const isDark = computed(() => isDarkState.value)
  const theme = computed(() => themeState.value)

  const toggleTheme = (eventOrOptions = {}) => {
    const opts = eventOrOptions instanceof MouseEvent 
      ? { event: eventOrOptions } 
      : eventOrOptions
    return executeThemeTransition('toggle', opts)
  }

  const setTheme = (mode, eventOrOptions = {}) => {
    const opts = eventOrOptions instanceof MouseEvent 
      ? { event: eventOrOptions } 
      : eventOrOptions
    return executeThemeTransition(mode, opts)
  }

  return {
    theme,
    isDark,
    isTransitioning: computed(() => isTransitioning.value),
    toggleTheme,
    setTheme,
    initTheme
  }
}
