import { DefineComponent } from 'vue'

export declare const IdGlassNav: DefineComponent<{ title?: string }>
export declare const IdSegmentedControl: DefineComponent<{ modelValue: string | number, options: Array<any>, theme?: 'white' | 'black' }>
export declare const IdButton: DefineComponent<{ label?: string, variant?: 'primary' | 'secondary' | 'glass' | 'dark' | 'ghost' | 'danger', size?: 'sm' | 'md' | 'lg', iconLeft?: any, iconRight?: any, disabled?: boolean, loading?: boolean, block?: boolean }>
export declare const IdPanel: DefineComponent<{}>
export declare const IdPanelRow: DefineComponent<{ title: string, subtitle?: string, detail?: string, iconBg?: string, href?: string, clickable?: boolean, chevron?: boolean }>
export declare const IdCard: DefineComponent<{ title?: string, subtitle?: string, description?: string, tag?: string, image?: string, imageAlt?: string, imageAspect?: '16-9' | '4-3' | '1-1' | '21-9' | 'auto', href?: string, variant?: 'default' | 'framed' | 'glass' | 'hero' | 'image-top' | 'image-bg', padding?: 'sm' | 'md' | 'lg', interactive?: boolean }>
export declare const IdHeroCta: DefineComponent<{ title?: string, subtitle?: string, eyebrow?: string }>
export declare const IdInput: DefineComponent<{ modelValue?: string | number, label?: string, placeholder?: string, hint?: string, errorText?: string, trailingText?: string, type?: string, size?: 'sm' | 'md' | 'lg', variant?: 'default' | 'search' | 'error' | 'success', clearable?: boolean, disabled?: boolean }>
export declare const IdTextarea: DefineComponent<{ modelValue?: string, label?: string, placeholder?: string, hint?: string, rows?: number, maxlength?: number, disabled?: boolean }>
export declare const IdSelect: DefineComponent<{ modelValue?: string | number | null, options: Array<any>, label?: string, placeholder?: string, hint?: string, disabled?: boolean }>
export declare const IdCheckbox: DefineComponent<{ modelValue?: boolean, label?: string, disabled?: boolean }>
export declare const IdRadioGroup: DefineComponent<{ modelValue?: string | number, options: Array<any>, label?: string, direction?: 'vertical' | 'horizontal', disabled?: boolean }>
export declare const IdSlider: DefineComponent<{ modelValue?: number, min?: number, max?: number, step?: number, label?: string, showValue?: boolean, disabled?: boolean }>
export declare const IdToggle: DefineComponent<{ modelValue?: boolean, label?: string, disabled?: boolean }>
export declare const IdModal: DefineComponent<{ modelValue: boolean, title?: string, subtitle?: string, maxWidth?: string, size?: 'sm' | 'md' | 'lg' | 'xl' | 'full', variant?: 'default' | 'glass' | 'alert', closeOnBackdrop?: boolean }>
export declare const IdBottomSheet: DefineComponent<{ modelValue: boolean, title?: string }>
export declare const IdDrawer: DefineComponent<{ modelValue: boolean, title?: string, position?: 'right' | 'left' }>
export declare const IdDropdownMenu: DefineComponent<{ items: Array<any>, align?: 'left' | 'right' }>
export declare const IdTooltip: DefineComponent<{ text: string, position?: 'top' | 'bottom' | 'left' | 'right' }>
export declare const IdTag: DefineComponent<{ label?: string, variant?: 'plain' | 'accent' | 'success' | 'warning' | 'danger' | 'heat' | 'mono', size?: 'sm' | 'md' | 'lg', iconLeft?: any, iconRight?: any, removable?: boolean }>
export declare const IdLiveDot: DefineComponent<{}>
export declare const IdBadge: DefineComponent<{ variant?: 'default' | 'accent', count?: number | null, dot?: boolean }>
export declare const IdAvatar: DefineComponent<{ src?: string, name?: string, alt?: string, size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', shape?: 'circle' | 'squircle', framed?: boolean, status?: 'online' | 'offline' | 'busy' | null }>
export declare const IdProgress: DefineComponent<{ value?: number, label?: string, showValue?: boolean, size?: 'sm' | 'md' | 'lg', indeterminate?: boolean }>
export declare const IdSkeleton: DefineComponent<{ variant?: 'rect' | 'text' | 'circle', width?: string, height?: string, borderRadius?: string, animated?: boolean }>
export declare const IdSpinner: DefineComponent<{ size?: 'sm' | 'md' | 'lg', label?: string }>
export declare const IdAccordion: DefineComponent<{ items: Array<{ title: string, content: string }>, multiple?: boolean }>
export declare const IdTabs: DefineComponent<{ modelValue: string | number, tabs: Array<any> }>
export declare const IdAlert: DefineComponent<{ variant?: 'info' | 'success' | 'warning' | 'error', title?: string, dismissible?: boolean }>
export declare const IdDivider: DefineComponent<{ direction?: 'horizontal' | 'vertical', variant?: 'hairline' | 'faint' | 'spaced' }>
export declare const IdBreadcrumbs: DefineComponent<{ items: Array<{ label: string, href?: string }> }>
export declare const IdPagination: DefineComponent<{ modelValue: number, totalPages: number, siblings?: number }>
export declare const IdTable: DefineComponent<{ columns: Array<{ key: string, label: string, width?: string, sortable?: boolean, align?: 'left' | 'right' | 'center' }>, data?: Array<any>, title?: string, variant?: 'default' | 'striped' | 'glass' | 'compact' | 'borderless', compact?: boolean, selectable?: boolean, hoverable?: boolean, searchable?: boolean, selectedRows?: Array<any>, hasRowActions?: boolean, emptyText?: string }>
export declare const IdFileUpload: DefineComponent<{ accept?: string, multiple?: boolean, hint?: string, disabled?: boolean }>
export declare const IdConfirmDialog: DefineComponent<{ modelValue: boolean, title?: string, message?: string, confirmText?: string, cancelText?: string, danger?: boolean }>
export declare const IdStack: DefineComponent<{ direction?: 'vertical' | 'horizontal', gap?: number | string, align?: string, justify?: string, wrap?: boolean }>
export { default as IdCommandPalette } from './components/idesign/IdCommandPalette.vue'
export declare const IdCarousel: DefineComponent<{ showControls?: boolean, showDots?: boolean }>
export declare const IdMacOsBanner: DefineComponent<{ modelValue?: boolean, appName?: string, title: string, message?: string, time?: string, iconBg?: string, dismissible?: boolean }>
export declare const IdFileTree: DefineComponent<{ items: Array<any>, selectedId?: string | number, expandedIds?: Array<any> }>
export declare const IdPopover: DefineComponent<{ position?: 'top' | 'bottom' | 'left' | 'right' }>
export declare const IdDock: DefineComponent<{ items: Array<any>, activeId?: string | number, position?: 'bottom' | 'top' }>
export declare const IdAvatarGroup: DefineComponent<{ users: Array<any>, max?: number, size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', shape?: 'circle' | 'squircle', variant?: 'stacked' | 'grid' | 'hero' | 'expanded', direction?: 'row' | 'column', framed?: boolean, interactive?: boolean, label?: string }>
export declare const IdSparkline: DefineComponent<{ data?: Array<number>, color?: string, fill?: boolean, width?: number, height?: number, strokeWidth?: number }>
export declare const IdStat: DefineComponent<{ label: string, value: string | number, unit?: string, change?: string, changeType?: 'positive' | 'negative' | 'neutral', description?: string, sparklineData?: Array<number> }>
export declare const IdEmpty: DefineComponent<{ title?: string, description?: string, icon?: string, actionLabel?: string }>
export declare const IdIphoneFrame: DefineComponent<{}>
export declare const IdToast: DefineComponent<{ position?: 'bottom-center' | 'bottom-right' | 'top-center' | 'top-right' }>
export declare const HeroTemplate: DefineComponent<{}>
export declare const ProductShowcaseTemplate: DefineComponent<{}>
export declare const AiChatTemplate: DefineComponent<{}>
export declare const DashboardTemplate: DefineComponent<{}>

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
  isDesktop: () => boolean
}
