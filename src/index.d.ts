import { DefineComponent } from 'vue'

export type IdSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type IdColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | string
export type IdRadius = 'none' | 'sm' | 'md' | 'lg' | 'full' | string
export type IdDirection = 'horizontal' | 'vertical'

export declare const IdGlassNav: DefineComponent<{ title?: string }>
export declare const IdSegmentedControl: DefineComponent<{ modelValue: string | number, options: Array<any>, theme?: string, variant?: 'default' | 'glass', size?: IdSize, ui?: Record<string, any> }>
export declare const IdButton: DefineComponent<{ label?: string, variant?: 'default' | 'outline' | 'ghost' | 'soft' | 'glass' | 'link' | string, color?: IdColor, size?: IdSize, density?: 'compact' | 'comfortable' | 'spacious', iconLeft?: any, iconRight?: any, href?: string, type?: string, disabled?: boolean, loading?: boolean, block?: boolean, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdPanel: DefineComponent<{ size?: IdSize, variant?: string, noDividers?: boolean, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdPanelRow: DefineComponent<{ title: string, subtitle?: string, detail?: string, iconBg?: string, href?: string, clickable?: boolean, chevron?: boolean }>
export declare const IdCard: DefineComponent<{ title?: string, subtitle?: string, description?: string, tag?: string, image?: string, imageAlt?: string, imageAspect?: '16-9' | '4-3' | '1-1' | '21-9' | 'auto', href?: string, variant?: 'default' | 'framed' | 'glass' | 'hero' | 'image-top' | 'image-bg', padding?: IdSize, size?: IdSize, interactive?: boolean, showActions?: boolean, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdHeroCta: DefineComponent<{ title?: string, subtitle?: string, eyebrow?: string }>
export declare const IdInput: DefineComponent<{ modelValue?: string | number, label?: string, placeholder?: string, hint?: string, errorText?: string, trailingText?: string, type?: string, size?: IdSize, variant?: 'default' | 'search' | string, clearable?: boolean, disabled?: boolean, id?: string, radius?: IdRadius, color?: IdColor, ui?: Record<string, any> }>
export declare const IdTextarea: DefineComponent<{ modelValue?: string, label?: string, placeholder?: string, hint?: string, rows?: number, maxlength?: number, disabled?: boolean, size?: IdSize, variant?: string, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdSelect: DefineComponent<{ modelValue?: string | number | null, options: Array<any>, label?: string, placeholder?: string, hint?: string, disabled?: boolean, clearable?: boolean, size?: IdSize, variant?: 'default' | 'no-divider' | 'glass', radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdCheckbox: DefineComponent<{ modelValue?: boolean, label?: string, disabled?: boolean, size?: IdSize, color?: IdColor, ui?: Record<string, any> }>
export declare const IdRadioGroup: DefineComponent<{ modelValue?: string | number, options: Array<any>, label?: string, direction?: IdDirection, disabled?: boolean, size?: IdSize, color?: IdColor, ui?: Record<string, any> }>
export declare const IdSlider: DefineComponent<{ modelValue?: number, min?: number, max?: number, step?: number, label?: string, showValue?: boolean, disabled?: boolean, size?: IdSize, color?: IdColor, ui?: Record<string, any> }>
export declare const IdToggle: DefineComponent<{ modelValue?: boolean, label?: string, disabled?: boolean, size?: IdSize, color?: IdColor, ui?: Record<string, any> }>
export declare const IdModal: DefineComponent<{ modelValue: boolean, title?: string, subtitle?: string, content?: string, body?: string, maxWidth?: string, size?: IdSize | 'full', variant?: 'default' | 'glass' | 'alert', closeOnBackdrop?: boolean, teleport?: boolean, ui?: Record<string, any> }>
export declare const IdBottomSheet: DefineComponent<{ modelValue: boolean, title?: string, description?: string, body?: string, teleport?: boolean, size?: IdSize, variant?: string, position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right' | 'center', showGrabber?: boolean, closeOnBackdrop?: boolean, closeOnEsc?: boolean, height?: string, maxHeight?: string, dismissible?: boolean, ui?: Record<string, any> }>
export declare const IdDrawer: DefineComponent<{ modelValue: boolean, title?: string, position?: 'right' | 'left', size?: IdSize, variant?: string, ui?: Record<string, any> }>
export declare const IdDropdownMenu: DefineComponent<{ items: Array<any>, align?: 'left' | 'right', size?: IdSize, variant?: string, ui?: Record<string, any> }>
export declare const IdTooltip: DefineComponent<{ text: string, position?: 'top' | 'bottom' | 'left' | 'right', ui?: Record<string, any> }>
export declare const IdTag: DefineComponent<{ label?: string, variant?: 'plain' | 'accent' | 'success' | 'warning' | 'danger' | 'heat' | 'mono' | string, size?: IdSize, color?: IdColor, radius?: IdRadius, iconLeft?: any, iconRight?: any, removable?: boolean, ui?: Record<string, any> }>
export declare const IdLiveDot: DefineComponent<{}>
export declare const IdBadge: DefineComponent<{ variant?: string, color?: IdColor, count?: number | null, dot?: boolean, size?: IdSize, ui?: Record<string, any> }>
export declare const IdAvatar: DefineComponent<{ src?: string, name?: string, alt?: string, size?: IdSize, shape?: 'circle' | 'squircle', framed?: boolean, status?: 'online' | 'offline' | 'busy' | null, ui?: Record<string, any> }>
export declare const IdProgress: DefineComponent<{ value?: number, label?: string, showValue?: boolean, size?: IdSize, indeterminate?: boolean, color?: IdColor, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdSkeleton: DefineComponent<{ variant?: 'rect' | 'text' | 'circle', width?: string, height?: string, borderRadius?: string, animated?: boolean, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdSpinner: DefineComponent<{ size?: IdSize, label?: string, color?: IdColor, ui?: Record<string, any> }>
export declare const IdAccordion: DefineComponent<{ items: Array<{ title: string, content: string }>, multiple?: boolean, size?: IdSize, variant?: string, ui?: Record<string, any> }>
export declare const IdTabs: DefineComponent<{ modelValue: string | number, tabs: Array<any>, size?: IdSize, variant?: string, color?: IdColor, ui?: Record<string, any> }>
export declare const IdAlert: DefineComponent<{ variant?: string, color?: IdColor, title?: string, dismissible?: boolean, size?: IdSize, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdDivider: DefineComponent<{ direction?: IdDirection, variant?: string, ui?: Record<string, any> }>
export declare const IdBreadcrumbs: DefineComponent<{ items: Array<{ label: string, href?: string, icon?: any }>, size?: IdSize, variant?: string, color?: IdColor, ui?: Record<string, any> }>
export declare const IdPagination: DefineComponent<{ modelValue: number, totalPages: number, siblings?: number, size?: IdSize, variant?: string, color?: IdColor, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdTable: DefineComponent<{ columns: Array<{ key: string, label: string, width?: string, sortable?: boolean, align?: 'left' | 'right' | 'center' }>, data?: Array<any>, title?: string, variant?: string, compact?: boolean, selectable?: boolean, hoverable?: boolean, searchable?: boolean, selectedRows?: Array<any>, hasRowActions?: boolean, emptyText?: string, size?: IdSize, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdFileUpload: DefineComponent<{ accept?: string, multiple?: boolean, hint?: string, disabled?: boolean }>
export declare const IdConfirmDialog: DefineComponent<{ modelValue: boolean, title?: string, message?: string, confirmText?: string, cancelText?: string, danger?: boolean, variant?: string, teleport?: boolean, ui?: Record<string, any> }>
export declare const IdStack: DefineComponent<{ direction?: IdDirection, gap?: number | string, align?: string, justify?: string, wrap?: boolean, ui?: Record<string, any> }>
export { default as IdCommandPalette } from './components/idesign/IdCommandPalette.vue'
export declare const IdCarousel: DefineComponent<{ showControls?: boolean, showDots?: boolean }>
export declare const IdMacOsBanner: DefineComponent<{ modelValue?: boolean, appName?: string, title: string, message?: string, time?: string, iconBg?: string, dismissible?: boolean }>
export declare const IdFileTree: DefineComponent<{ items: Array<any>, selectedId?: string | number, expandedIds?: Array<any> }>
export declare const IdPopover: DefineComponent<{ position?: 'top' | 'bottom' | 'left' | 'right', title?: string, subtitle?: string, content?: string, body?: string, size?: IdSize, variant?: string, ui?: Record<string, any> }>
export declare const IdDock: DefineComponent<{ items: Array<any>, activeId?: string | number, position?: 'bottom' | 'top' }>
export declare const IdAvatarGroup: DefineComponent<{ users: Array<any>, max?: number, size?: IdSize, shape?: 'circle' | 'squircle', variant?: string, direction?: IdDirection, framed?: boolean, interactive?: boolean, label?: string, ui?: Record<string, any> }>
export declare const IdSparkline: DefineComponent<{ data?: Array<number>, color?: string, fill?: boolean, width?: number, height?: number, strokeWidth?: number }>
export declare const IdStat: DefineComponent<{ label: string, value: string | number, unit?: string, change?: string, changeType?: 'positive' | 'negative' | 'neutral', description?: string, sparklineData?: Array<number> }>
export declare const IdEmpty: DefineComponent<{ title?: string, description?: string, icon?: any, actionLabel?: string, noBg?: boolean, size?: IdSize, variant?: string, ui?: Record<string, any> }>
export declare const IdIphoneFrame: DefineComponent<{}>
export declare const IdToast: DefineComponent<{ position?: 'bottom-center' | 'bottom-right' | 'top-center' | 'top-right' }>

// ── Compound Form System ──
export declare const IdForm: DefineComponent<{ density?: 'compact' | 'comfortable' | 'spacious' | string, disabled?: boolean, gap?: string | number, ui?: Record<string, any> }>
export declare const IdFormField: DefineComponent<{ name?: string, label?: string, description?: string, hint?: string, message?: string, error?: boolean | string, success?: boolean | string, warning?: boolean | string, required?: boolean, disabled?: boolean, ui?: Record<string, any> }>
export declare const IdFormLabel: DefineComponent<{ for?: string, required?: boolean }>
export declare const IdFormDescription: DefineComponent<{}>
export declare const IdFormMessage: DefineComponent<{ error?: boolean | string, success?: boolean | string, warning?: boolean | string, message?: string }>
export declare const IdFormGroup: DefineComponent<{ direction?: IdDirection | 'grid', inline?: boolean, columns?: number | string, ui?: Record<string, any> }>
export declare const IdFormSection: DefineComponent<{ title?: string, description?: string, divider?: boolean }>
export declare const IdFormActions: DefineComponent<{ align?: 'left' | 'center' | 'right' | 'between' | string, sticky?: boolean, ui?: Record<string, any> }>

// ── Compound Card System ──
export declare const IdCardHeader: DefineComponent<{}>
export declare const IdCardTitle: DefineComponent<{ tag?: string }>
export declare const IdCardDescription: DefineComponent<{}>
export declare const IdCardContent: DefineComponent<{}>
export declare const IdCardFooter: DefineComponent<{}>

// ── Compound Dialog System ──
export declare const IdDialog: DefineComponent<{ modelValue?: boolean, open?: boolean, title?: string, subtitle?: string, maxWidth?: string, size?: string, variant?: string, closeOnBackdrop?: boolean, teleport?: boolean }>
export declare const IdDialogHeader: DefineComponent<{}>
export declare const IdDialogTitle: DefineComponent<{}>
export declare const IdDialogDescription: DefineComponent<{}>
export declare const IdDialogBody: DefineComponent<{}>
export declare const IdDialogFooter: DefineComponent<{}>

// ── Hardware Shells & Layout Components ──
export declare const IdMacbookFrame: DefineComponent<{ appName?: string, showMenuBar?: boolean, color?: 'silver' | 'space-gray' | 'midnight' | 'starlight' }>
export declare const IdIpadFrame: DefineComponent<{ orientation?: 'landscape' | 'portrait', showStatusBar?: boolean, showHomeBar?: boolean, color?: 'space-gray' | 'silver' | 'starlight' }>
export declare const IdSidebar: DefineComponent<{ modelValue?: string | number, title?: string, logo?: string, groups?: any[], user?: any, collapsible?: boolean, collapsed?: boolean, variant?: string }>
export declare const IdHeader: DefineComponent<{ title?: string, subtitle?: string, eyebrow?: string, sticky?: boolean, border?: boolean, variant?: string }>
export declare const IdFooter: DefineComponent<{ columns?: any[], copyrightText?: string, countryText?: string, legalLinks?: any[], border?: boolean, variant?: string }>
export declare const IdBanner: DefineComponent<{ modelValue?: boolean, message?: string, icon?: string, actionLabel?: string, dismissible?: boolean, sticky?: boolean, align?: string, variant?: string, size?: IdSize, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdSeparator: DefineComponent<{ orientation?: IdDirection, label?: string, spacing?: string, variant?: string, ui?: Record<string, any> }>
export declare const IdKbd: DefineComponent<{ keys?: string | string[], size?: IdSize, variant?: string, ui?: Record<string, any> }>

// ── Advanced Form Inputs ──
export declare const IdPinInput: DefineComponent<{ modelValue?: string, length?: number, masked?: boolean, disabled?: boolean, error?: boolean, errorText?: string, hint?: string, label?: string, size?: string }>
export declare const IdTimePicker: DefineComponent<{ modelValue?: string, is24Hour?: boolean, showSeconds?: boolean, minuteStep?: number, label?: string, errorText?: string, error?: boolean, disabled?: boolean, size?: string }>
export declare const IdTagInput: DefineComponent<{ modelValue?: string[], placeholder?: string, label?: string, hint?: string, errorText?: string, error?: boolean, disabled?: boolean, readonly?: boolean, allowDuplicates?: boolean, maxTags?: number, maxTagLength?: number, tagVariant?: string, size?: string }>
export declare const IdRating: DefineComponent<{ modelValue?: number, count?: number, allowHalf?: boolean, clearable?: boolean, showScore?: boolean, label?: string, readonly?: boolean, disabled?: boolean, size?: string }>
export declare const IdNumberInput: DefineComponent<{ modelValue?: number, min?: number, max?: number, stepVal?: number, unit?: string, label?: string, hint?: string, errorText?: string, error?: boolean, disabled?: boolean, readonly?: boolean, size?: string }>
export declare const IdColorPicker: DefineComponent<{ modelValue?: string, label?: string, disabled?: boolean, presets?: string[], size?: string }>


export declare const HeroTemplate: DefineComponent<{}>
export declare const ProductShowcaseTemplate: DefineComponent<{}>
export declare const AiChatTemplate: DefineComponent<{}>
export declare const DashboardTemplate: DefineComponent<{}>
export declare const AuthTemplate: DefineComponent<{}>
export declare const SettingsTemplate: DefineComponent<{}>
export declare const AnalyticsTemplate: DefineComponent<{}>
export declare const CheckoutTemplate: DefineComponent<{}>



export declare function useToast(): {
  toasts: any
  add: (message: string, options?: any) => number
  remove: (id: number) => void
  success: (msg: string, opts?: any) => number
  error: (msg: string, opts?: any) => number
  info: (msg: string, opts?: any) => number
  warning: (msg: string, opts?: any) => number
}

export declare function useModal(): {
  modals: any
  open: (options?: any) => Promise<boolean>
  close: (id: number, result?: boolean) => void
  confirm: (options?: any) => Promise<boolean>
}

export declare function useClipboard(): {
  copy: (text: string) => Promise<boolean>
  copied: any
}

export declare function useBreakpoint(): {
  width: any
  current: any
  isAbove: (bp: string) => boolean
  isBelow: (bp: string) => boolean
  isMobile: () => boolean
  isTablet: () => boolean
  isDesktop: () => boolean
  breakpoints: Record<string, number>
}

export interface IdesignUiConfig {
  base?: {
    fontFamily?: string
    radius?: string
    transition?: string
  }
  colors?: {
    primary?: string
    secondary?: string
    accent?: string
    success?: string
    warning?: string
    danger?: string
    error?: string
    info?: string
    bg?: string
    surface?: string
    text?: string
    border?: string
  }
  sizes?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }
  spacing?: {
    '3xs'?: string
    '2xs'?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }
  radius?: {
    none?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    hero?: string
    full?: string
  }
  shadows?: {
    none?: string
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    lift?: string
    cta?: string
  }
  motion?: {
    instant?: string
    fast?: string
    normal?: string
    slow?: string
    easing?: string
    spring?: string
  }
  components?: Record<string, Record<string, any>>
}

export declare function createIdesign(customConfig?: {
  theme?: 'light' | 'dark' | 'auto' | string
  density?: 'compact' | 'comfortable' | 'spacious'
  radius?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'full' | string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  locale?: string
  dir?: 'ltr' | 'rtl'
  defaults?: Record<string, Record<string, any>>
  ui?: IdesignUiConfig
}): {
  install: (app: any) => void
}

export declare const createUI: typeof createIdesign


export declare function useIdesignConfig(componentNameOrOverrides?: string | {
  theme?: string
  density?: string
  radius?: string
  size?: string
  locale?: string
  dir?: 'ltr' | 'rtl'
}, maybeOverrides?: Record<string, any>): {
  theme: string
  density: string
  radius: string
  size: string
  locale: string
  dir: string
  themeRef: any
  densityRef: any
  sizeRef: any
  radiusRef: any
  localeRef: any
  dirRef: any
  ui: IdesignUiConfig
  setTheme: (theme: string) => void
  setDensity: (density: string) => void
  setDir: (dir: 'ltr' | 'rtl') => void
  setLocale: (locale: string) => void
  setSize: (size: string) => void
  setRadius: (radius: string) => void
  setUi: (ui: IdesignUiConfig) => void
  formatNumber: (val: number, options?: Intl.NumberFormatOptions) => string
  formatCurrency: (val: number, currency?: string, options?: Intl.NumberFormatOptions) => string
  formatDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string
  getComponentDefaults: (name: string) => Record<string, any>
  config: any
}



