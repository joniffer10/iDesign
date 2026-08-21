import { reactive, inject, computed } from 'vue'
import { executeThemeTransition } from './useTheme'

const IDESIGN_CONFIG_KEY = Symbol('IDESIGN_CONFIG')

const defaultUiConfig = {
  base: {
    fontFamily: '',
    radius: '',
    transition: ''
  },
  colors: {
    primary: '',
    secondary: '',
    accent: '',
    success: '',
    warning: '',
    danger: '',
    error: '',
    info: '',
    bg: '',
    surface: '',
    text: '',
    border: ''
  },
  sizes: {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
    '2xl': ''
  },
  spacing: {
    '3xs': '',
    '2xs': '',
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
    '2xl': ''
  },
  radius: {
    none: '',
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
    hero: '',
    full: ''
  },
  shadows: {
    none: '',
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
    lift: '',
    cta: ''
  },
  motion: {
    instant: '',
    fast: '',
    normal: '',
    slow: '',
    easing: '',
    spring: ''
  },
  components: {}
}

const defaultConfig = {
  theme: 'auto', // 'light' | 'dark' | 'auto' | string
  density: 'comfortable', // 'compact' | 'comfortable' | 'spacious'
  radius: 'md',
  size: 'md',
  locale: 'en',
  dir: 'ltr',
  ui: defaultUiConfig
}

function applyThemeToDom(theme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
    root.classList.remove('light')
    root.setAttribute('data-theme', 'dark')
  } else if (theme === 'light') {
    root.classList.remove('dark')
    root.classList.add('light')
    root.setAttribute('data-theme', 'light')
  } else if (theme === 'auto') {
    root.classList.remove('dark', 'light')
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
}

function applyDensityToDom(density) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (density && density !== 'comfortable') {
    root.setAttribute('data-density', density)
  } else {
    root.removeAttribute('data-density')
  }
}

function applyDirToDom(dir) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (dir) {
    root.setAttribute('dir', dir)
  } else {
    root.removeAttribute('dir')
  }
}

function applyUiTokensToDom(ui = {}) {
  if (typeof document === 'undefined' || !ui) return
  const root = document.documentElement

  // Base
  if (ui.base) {
    if (ui.base.fontFamily) root.style.setProperty('--font', ui.base.fontFamily)
    if (ui.base.transition) root.style.setProperty('--duration-normal', ui.base.transition)
  }

  // Colors
  if (ui.colors) {
    if (ui.colors.primary) {
      root.style.setProperty('--color-primary', ui.colors.primary)
      root.style.setProperty('--accent', ui.colors.primary)
    }
    if (ui.colors.secondary) root.style.setProperty('--color-secondary', ui.colors.secondary)
    if (ui.colors.accent) {
      root.style.setProperty('--color-accent', ui.colors.accent)
      root.style.setProperty('--accent', ui.colors.accent)
    }
    if (ui.colors.success) {
      root.style.setProperty('--color-success', ui.colors.success)
      root.style.setProperty('--success', ui.colors.success)
    }
    if (ui.colors.warning) {
      root.style.setProperty('--color-warning', ui.colors.warning)
      root.style.setProperty('--warning', ui.colors.warning)
    }
    if (ui.colors.danger || ui.colors.error) {
      const dangerCol = ui.colors.danger || ui.colors.error
      root.style.setProperty('--color-danger', dangerCol)
      root.style.setProperty('--color-error', dangerCol)
      root.style.setProperty('--danger', dangerCol)
    }
    if (ui.colors.info) {
      root.style.setProperty('--color-info', ui.colors.info)
      root.style.setProperty('--info', ui.colors.info)
    }
    if (ui.colors.bg || ui.colors.background) {
      const bgCol = ui.colors.bg || ui.colors.background
      root.style.setProperty('--bg', bgCol)
      root.style.setProperty('--color-bg', bgCol)
    }
    if (ui.colors.surface) {
      root.style.setProperty('--surface', ui.colors.surface)
      root.style.setProperty('--color-surface', ui.colors.surface)
    }
    if (ui.colors.text || ui.colors.foreground) {
      const textCol = ui.colors.text || ui.colors.foreground
      root.style.setProperty('--text', textCol)
      root.style.setProperty('--color-fg', textCol)
    }
    if (ui.colors.border || ui.colors.hairline) {
      const borderCol = ui.colors.border || ui.colors.hairline
      root.style.setProperty('--hairline', borderCol)
      root.style.setProperty('--color-border', borderCol)
    }
  }

  // Sizes
  if (ui.sizes) {
    if (ui.sizes.xs) root.style.setProperty('--size-xs', ui.sizes.xs)
    if (ui.sizes.sm) root.style.setProperty('--size-sm', ui.sizes.sm)
    if (ui.sizes.md) root.style.setProperty('--size-md', ui.sizes.md)
    if (ui.sizes.lg) root.style.setProperty('--size-lg', ui.sizes.lg)
    if (ui.sizes.xl) root.style.setProperty('--size-xl', ui.sizes.xl)
    if (ui.sizes['2xl']) root.style.setProperty('--size-2xl', ui.sizes['2xl'])
  }

  // Spacing
  if (ui.spacing) {
    if (ui.spacing['3xs']) root.style.setProperty('--space-3xs', ui.spacing['3xs'])
    if (ui.spacing['2xs']) root.style.setProperty('--space-2xs', ui.spacing['2xs'])
    if (ui.spacing.xs) root.style.setProperty('--space-xs', ui.spacing.xs)
    if (ui.spacing.sm) root.style.setProperty('--space-sm', ui.spacing.sm)
    if (ui.spacing.md) root.style.setProperty('--space-md', ui.spacing.md)
    if (ui.spacing.lg) root.style.setProperty('--space-lg', ui.spacing.lg)
    if (ui.spacing.xl) root.style.setProperty('--space-xl', ui.spacing.xl)
    if (ui.spacing['2xl']) root.style.setProperty('--space-2xl', ui.spacing['2xl'])
  }

  // Radius
  if (ui.radius) {
    if (ui.radius.none !== undefined) root.style.setProperty('--radius-none', ui.radius.none)
    if (ui.radius.xs) root.style.setProperty('--radius-xs', ui.radius.xs)
    if (ui.radius.sm) {
      root.style.setProperty('--radius-sm', ui.radius.sm)
      root.style.setProperty('--r-chip', ui.radius.sm)
    }
    if (ui.radius.md) {
      root.style.setProperty('--radius-md', ui.radius.md)
      root.style.setProperty('--r-thumb', ui.radius.md)
    }
    if (ui.radius.lg) {
      root.style.setProperty('--radius-lg', ui.radius.lg)
      root.style.setProperty('--r-card', ui.radius.lg)
    }
    if (ui.radius.xl) {
      root.style.setProperty('--radius-xl', ui.radius.xl)
      root.style.setProperty('--r-panel', ui.radius.xl)
    }
    if (ui.radius.hero) {
      root.style.setProperty('--radius-hero', ui.radius.hero)
      root.style.setProperty('--r-hero', ui.radius.hero)
    }
    if (ui.radius.full) {
      root.style.setProperty('--radius-full', ui.radius.full)
      root.style.setProperty('--r-pill', ui.radius.full)
    }
  }

  // Shadows
  if (ui.shadows) {
    if (ui.shadows.none !== undefined) root.style.setProperty('--shadow-none', ui.shadows.none)
    if (ui.shadows.xs) root.style.setProperty('--shadow-xs', ui.shadows.xs)
    if (ui.shadows.sm) root.style.setProperty('--shadow-sm', ui.shadows.sm)
    if (ui.shadows.md) {
      root.style.setProperty('--shadow-md', ui.shadows.md)
      root.style.setProperty('--sh-card', ui.shadows.md)
    }
    if (ui.shadows.lg) {
      root.style.setProperty('--shadow-lg', ui.shadows.lg)
      root.style.setProperty('--sh-panel', ui.shadows.lg)
    }
    if (ui.shadows.xl) {
      root.style.setProperty('--shadow-xl', ui.shadows.xl)
      root.style.setProperty('--sh-overlay', ui.shadows.xl)
    }
    if (ui.shadows.lift) root.style.setProperty('--sh-lift', ui.shadows.lift)
    if (ui.shadows.cta) root.style.setProperty('--sh-cta', ui.shadows.cta)
  }

  // Motion
  if (ui.motion) {
    if (ui.motion.instant) root.style.setProperty('--duration-instant', ui.motion.instant)
    if (ui.motion.fast) root.style.setProperty('--duration-fast', ui.motion.fast)
    if (ui.motion.normal) root.style.setProperty('--duration-normal', ui.motion.normal)
    if (ui.motion.slow) root.style.setProperty('--duration-slow', ui.motion.slow)
    if (ui.motion.easing) root.style.setProperty('--ease-out-quart', ui.motion.easing)
    if (ui.motion.spring) root.style.setProperty('--ease-spring', ui.motion.spring)
  }
}

export function createIdesign(customConfig = {}) {
  const compDefaults = customConfig.defaults || customConfig.ui?.components || customConfig.components || {}

  const mergedUi = {
    base: { ...defaultUiConfig.base, ...(customConfig.ui?.base || {}) },
    colors: { ...defaultUiConfig.colors, ...(customConfig.ui?.colors || (typeof customConfig.theme === 'object' ? customConfig.theme : {})) },
    sizes: { ...defaultUiConfig.sizes, ...(customConfig.ui?.sizes || {}) },
    spacing: { ...defaultUiConfig.spacing, ...(customConfig.ui?.spacing || {}) },
    radius: { ...defaultUiConfig.radius, ...(customConfig.ui?.radius || {}) },
    shadows: { ...defaultUiConfig.shadows, ...(customConfig.ui?.shadows || {}) },
    motion: { ...defaultUiConfig.motion, ...(customConfig.ui?.motion || {}) },
    components: { ...compDefaults }
  }

  const state = reactive({
    ...defaultConfig,
    ...customConfig,
    ui: mergedUi
  })

  // Apply initial DOM configuration
  applyThemeToDom(state.theme)
  applyDensityToDom(state.density)
  applyDirToDom(state.dir)
  applyUiTokensToDom(state.ui)

  return {
    install(app) {
      app.provide(IDESIGN_CONFIG_KEY, state)
    }
  }
}

export const createUI = createIdesign


export function useIdesignConfig(componentNameOrOverrides = {}, maybeOverrides = {}) {
  const isComponentCall = typeof componentNameOrOverrides === 'string'
  const componentName = isComponentCall ? componentNameOrOverrides : ''
  const componentOverrides = isComponentCall ? maybeOverrides : componentNameOrOverrides

  let injected = null
  try {
    injected = inject(IDESIGN_CONFIG_KEY, null)
  } catch {
    injected = null
  }
  const globalConfig = injected || reactive({ ...defaultConfig, ui: defaultUiConfig })

  const compKey = componentName ? componentName.toLowerCase() : ''
  const directUi = (componentName && (globalConfig?.ui?.[compKey] || globalConfig?.ui?.[componentName])) || {}
  const compGlobalDefaults = (componentName && (globalConfig?.ui?.components?.[componentName] || globalConfig?.ui?.components?.[compKey])) || directUi || {}

  const theme = computed(() => componentOverrides?.theme || compGlobalDefaults?.defaultProps?.theme || compGlobalDefaults?.theme || globalConfig?.theme || defaultConfig.theme)
  const density = computed(() => componentOverrides?.density || compGlobalDefaults?.defaultProps?.density || compGlobalDefaults?.density || globalConfig?.density || defaultConfig.density)
  const radius = computed(() => {
    if (componentOverrides?.radius !== undefined) return componentOverrides.radius
    if (compGlobalDefaults?.defaultProps?.radius !== undefined) return compGlobalDefaults.defaultProps.radius
    if (compGlobalDefaults?.radius !== undefined) return compGlobalDefaults.radius
    if (globalConfig?.radius && globalConfig.radius !== 'md') return globalConfig.radius
    return undefined
  })
  const size = computed(() => componentOverrides?.size || compGlobalDefaults?.defaultProps?.size || compGlobalDefaults?.size || globalConfig?.size || defaultConfig.size)
  const locale = computed(() => componentOverrides?.locale || compGlobalDefaults?.defaultProps?.locale || compGlobalDefaults?.locale || globalConfig?.locale || defaultConfig.locale)
  const dir = computed(() => componentOverrides?.dir || compGlobalDefaults?.defaultProps?.dir || compGlobalDefaults?.dir || globalConfig?.dir || defaultConfig.dir)

  const variant = computed(() => componentOverrides?.variant || compGlobalDefaults?.defaultProps?.variant || compGlobalDefaults?.variant || undefined)
  const color = computed(() => componentOverrides?.color || compGlobalDefaults?.defaultProps?.color || compGlobalDefaults?.color || undefined)
  const direction = computed(() => componentOverrides?.direction || compGlobalDefaults?.defaultProps?.direction || compGlobalDefaults?.direction || undefined)

  const mergedUi = computed(() => {
    if (!componentName) return {}
    const merged = {}
    const compConfig = (globalConfig?.ui?.components?.[componentName] || globalConfig?.ui?.components?.[compKey]) || {}
    const directUiConfig = (globalConfig?.ui?.[compKey] || globalConfig?.ui?.[componentName]) || {}
    const globalUi = compConfig.ui || (typeof directUiConfig === 'object' ? directUiConfig : {})
    const propUi = componentOverrides?.ui || {}

    const keys = new Set([...Object.keys(globalUi), ...Object.keys(propUi), ...Object.keys(compConfig), ...Object.keys(directUiConfig)])
    for (const k of keys) {
      if (k === 'defaultProps' || k === 'variants' || k === 'sizes' || k === 'ui') continue
      if (propUi[k] !== undefined) {
        merged[k] = propUi[k]
      } else if (globalUi[k] !== undefined) {
        merged[k] = globalUi[k]
      } else if (compConfig[k] !== undefined) {
        merged[k] = compConfig[k]
      } else if (directUiConfig[k] !== undefined) {
        merged[k] = directUiConfig[k]
      }
    }
    return merged
  })

  const setTheme = (newTheme, options = {}) => {
    globalConfig.theme = newTheme
    return executeThemeTransition(newTheme, options)
  }

  const setDensity = (newDensity) => {
    globalConfig.density = newDensity
    applyDensityToDom(newDensity)
  }

  const setDir = (newDir) => {
    globalConfig.dir = newDir
    applyDirToDom(newDir)
  }

  const setLocale = (newLocale) => {
    globalConfig.locale = newLocale
  }

  const setSize = (newSize) => {
    globalConfig.size = newSize
  }

  const setRadius = (newRadius) => {
    globalConfig.radius = newRadius
  }

  const setUi = (newUi = {}) => {
    globalConfig.ui = {
      base: { ...globalConfig.ui.base, ...(newUi.base || {}) },
      colors: { ...globalConfig.ui.colors, ...(newUi.colors || {}) },
      sizes: { ...globalConfig.ui.sizes, ...(newUi.sizes || {}) },
      spacing: { ...globalConfig.ui.spacing, ...(newUi.spacing || {}) },
      radius: { ...globalConfig.ui.radius, ...(newUi.radius || {}) },
      shadows: { ...globalConfig.ui.shadows, ...(newUi.shadows || {}) },
      motion: { ...globalConfig.ui.motion, ...(newUi.motion || {}) },
      components: { ...globalConfig.ui.components, ...(newUi.components || {}) }
    }
    applyUiTokensToDom(globalConfig.ui)
  }

  const formatNumber = (val, options = {}) => {
    try {
      return new Intl.NumberFormat(locale.value || 'en', options).format(val)
    } catch {
      return String(val)
    }
  }

  const formatCurrency = (val, currency = 'USD', options = {}) => {
    try {
      return new Intl.NumberFormat(locale.value || 'en', {
        style: 'currency',
        currency,
        ...options
      }).format(val)
    } catch {
      return `$${val}`
    }
  }

  const formatDate = (date, options = { dateStyle: 'medium' }) => {
    try {
      const d = date instanceof Date ? date : new Date(date)
      return new Intl.DateTimeFormat(locale.value || 'en', options).format(d)
    } catch {
      return String(date)
    }
  }

  const getComponentDefaults = (name) => {
    return globalConfig.ui?.components?.[name] || {}
  }

  return {
    theme: theme.value,
    density: density.value,
    radius: radius.value,
    size: size.value,
    locale: locale.value,
    dir: dir.value,
    themeRef: theme,
    densityRef: density,
    sizeRef: size,
    radiusRef: radius,
    localeRef: locale,
    dirRef: dir,
    resolvedVariant: variant,
    resolvedColor: color,
    resolvedSize: size,
    resolvedRadius: radius,
    resolvedDensity: density,
    resolvedDirection: direction,
    mergedUi,
    ui: globalConfig.ui,
    setTheme,
    setDensity,
    setDir,
    setLocale,
    setSize,
    setRadius,
    setUi,
    formatNumber,
    formatCurrency,
    formatDate,
    getComponentDefaults,
    config: globalConfig
  }
}
