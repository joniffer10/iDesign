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
export declare const IdInput: DefineComponent<{ modelValue?: string | number, label?: string, placeholder?: string, hint?: string, errorText?: string, trailingText?: string, type?: string, masked?: boolean, size?: IdSize, variant?: 'default' | 'search' | string, clearable?: boolean, disabled?: boolean, id?: string, radius?: IdRadius, color?: IdColor, ui?: Record<string, any> }>
export declare const IdTextarea: DefineComponent<{ modelValue?: string, label?: string, placeholder?: string, hint?: string, rows?: number, maxlength?: number, disabled?: boolean, size?: IdSize, variant?: string, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdSelect: DefineComponent<{ modelValue?: string | number | null, options: Array<any>, label?: string, placeholder?: string, hint?: string, disabled?: boolean, clearable?: boolean, searchable?: boolean, searchPlaceholder?: string, emptyText?: string, size?: IdSize, variant?: 'default' | 'no-divider' | 'glass', radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdCheckbox: DefineComponent<{ modelValue?: boolean, label?: string, disabled?: boolean, size?: IdSize, color?: IdColor, ui?: Record<string, any> }>
export declare const IdRadioGroup: DefineComponent<{ modelValue?: string | number, options: Array<any>, label?: string, direction?: IdDirection, disabled?: boolean, size?: IdSize, color?: IdColor, ui?: Record<string, any> }>
export declare const IdSlider: DefineComponent<{ modelValue?: number, min?: number, max?: number, step?: number, label?: string, showValue?: boolean, disabled?: boolean, size?: IdSize, color?: IdColor, ui?: Record<string, any> }>
export declare const IdToggle: DefineComponent<{ modelValue?: boolean, label?: string, disabled?: boolean, size?: IdSize, color?: IdColor, ui?: Record<string, any> }>
export declare const IdModal: DefineComponent<{ modelValue: boolean, title?: string, subtitle?: string, description?: string, content?: string, body?: string, maxWidth?: string, size?: IdSize | 'full', variant?: 'default' | 'clean' | 'plain' | 'no-divider' | 'glass' | 'seamless' | 'alert' | string, closeOnBackdrop?: boolean, closeOnOutsideClick?: boolean, closeOnEscape?: boolean, showClose?: boolean, showCloseButton?: boolean, teleport?: boolean, ui?: Record<string, any> }>
export declare const IdBottomSheet: DefineComponent<{ modelValue: boolean, title?: string, description?: string, body?: string, teleport?: boolean, size?: IdSize | 'full', variant?: 'default' | 'inset' | 'persistent' | 'glass' | string, position?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right' | 'center', showGrabber?: boolean, backdrop?: boolean | 'blur' | 'dim' | 'glass' | 'none' | 'transparent' | string, showBackdrop?: boolean, closeOnBackdrop?: boolean, closeOnEsc?: boolean, height?: string, maxHeight?: string, peekHeight?: string | number, collapsedHeight?: string | number, dismissible?: boolean, radius?: IdRadius, color?: IdColor, direction?: IdDirection, disabled?: boolean, loading?: boolean, ui?: Record<string, any> }>
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
export declare const IdAlert: DefineComponent<{ variant?: 'subtle' | 'solid' | 'glass' | 'outline' | 'info' | 'success' | 'warning' | 'error' | string, color?: IdColor, title?: string, description?: string, icon?: any, action?: any, dismissible?: boolean, size?: IdSize, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdDivider: DefineComponent<{ direction?: IdDirection, variant?: string, ui?: Record<string, any> }>
export declare const IdBreadcrumbs: DefineComponent<{ items: Array<{ label: string, href?: string, icon?: any }>, size?: IdSize, variant?: string, color?: IdColor, ui?: Record<string, any> }>
export declare const IdPagination: DefineComponent<{ modelValue: number, totalPages: number, siblings?: number, size?: IdSize, variant?: string, color?: IdColor, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdTable: DefineComponent<{ columns: Array<{ key: string, label: string, width?: string, sortable?: boolean, filterable?: boolean, align?: 'left' | 'right' | 'center' }>, data?: Array<any>, title?: string, count?: number | string, variant?: 'default' | 'striped' | 'glass' | 'compact' | 'borderless' | string, compact?: boolean, selectable?: boolean, hoverable?: boolean, searchable?: boolean, searchPlaceholder?: string, filterable?: boolean, selectedRows?: Array<any>, hasRowActions?: boolean, emptyText?: string, size?: IdSize, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdFileUpload: DefineComponent<{ modelValue?: Array<any> | any, src?: string, imageSrc?: string, preview?: string, accept?: string, multiple?: boolean, title?: string, hint?: string, label?: string, buttonLabel?: string, buttonVariant?: string, shape?: 'circle' | 'squircle' | 'rounded', aspectRatio?: string, size?: IdSize, variant?: 'default' | 'glass' | 'compact' | 'avatar' | 'button' | 'image-card' | string, disabled?: boolean, loading?: boolean, showFileList?: boolean, maxSize?: number, ui?: Record<string, any> }>
export declare const IdConfirmDialog: DefineComponent<{ modelValue?: boolean, open?: boolean, title?: string, message?: string, description?: string, content?: string, confirmText?: string, cancelText?: string, icon?: any, danger?: boolean, loading?: boolean, confirmLoading?: boolean, disabled?: boolean, confirmDisabled?: boolean, cancelDisabled?: boolean, variant?: 'default' | 'centered' | 'centered-empty' | 'inset' | 'compact' | string, closeOnBackdrop?: boolean, closeOnOutsideClick?: boolean, closeOnEscape?: boolean, teleport?: boolean, ui?: Record<string, any> }>
export declare const IdStack: DefineComponent<{ direction?: IdDirection, gap?: number | string, align?: string, justify?: string, wrap?: boolean, ui?: Record<string, any> }>
export { default as IdCommandPalette } from './components/idesign/IdCommandPalette.vue'
export declare const IdCarousel: DefineComponent<{ showControls?: boolean, showDots?: boolean }>
export declare const IdMacOsBanner: DefineComponent<{ modelValue?: boolean, appName?: string, title: string, message?: string, time?: string, iconBg?: string, dismissible?: boolean }>
export declare const IdFileTree: DefineComponent<{ items: Array<any>, selectedId?: string | number, expandedIds?: Array<any> }>
export declare const IdPopover: DefineComponent<{ position?: 'top' | 'bottom' | 'left' | 'right', title?: string, subtitle?: string, content?: string, body?: string, size?: IdSize, variant?: string, ui?: Record<string, any> }>
export declare const IdDock: DefineComponent<{ items: Array<{ id?: string | number, label?: string, tooltip?: string, icon?: any, iconBg?: string, active?: boolean, disabled?: boolean, badge?: number | string | boolean, badgeColor?: string, separator?: boolean, showDot?: boolean, onClick?: (e: MouseEvent) => void, [key: string]: any }>, activeId?: string | number, modelValue?: string | number, variant?: 'glass' | 'solid' | 'translucent' | 'tinted' | string, size?: IdSize, direction?: 'horizontal' | 'vertical' | 'auto', position?: 'bottom' | 'top' | 'left' | 'right' | 'none' | 'static' | 'relative', alignment?: 'start' | 'center' | 'end', color?: IdColor, magnification?: boolean | number, magnifyDistance?: number, tooltip?: boolean, disabled?: boolean, safeArea?: boolean, ariaLabel?: string, ui?: Record<string, any> }>
export declare const IdAvatarGroup: DefineComponent<{ users: Array<any>, max?: number, size?: IdSize, shape?: 'circle' | 'squircle', variant?: string, direction?: IdDirection, framed?: boolean, interactive?: boolean, label?: string, ui?: Record<string, any> }>
export declare const IdSparkline: DefineComponent<{ data?: Array<number>, color?: string, fill?: boolean, width?: number, height?: number, strokeWidth?: number }>
export declare const IdStat: DefineComponent<{ label: string, value: string | number, unit?: string, change?: string, changeType?: 'positive' | 'negative' | 'neutral', description?: string, sparklineData?: Array<number> }>
export declare const IdBarChart: DefineComponent<{ data: Array<{ label: string, value: number, color?: string }>, height?: number | string, color?: string, max?: number }>
export declare const IdPieChart: DefineComponent<{ modelValue?: number | string, value?: number | string, max?: number, min?: number, variant?: 'full' | 'progress' | string, size?: IdSize | number | string, thickness?: 'thin' | 'normal' | 'thick' | number | string, color?: IdColor, trackColor?: string, centerLabel?: string, label?: string, valueText?: string, description?: string, unit?: string, icon?: any, showValue?: boolean, showLegend?: boolean, animated?: boolean, card?: boolean, data?: Array<{ label: string, value: number, color?: string }>, ui?: Record<string, any> }>
export declare const IdDonutChart: typeof IdPieChart
export declare const IdMobileNavbar: DefineComponent<{ modelValue?: string | number, active?: string | number, items?: Array<any>, size?: IdSize, variant?: 'glass' | 'liquid' | 'floating' | 'solid' | 'bordered' | 'flat' | 'minimal' | string, color?: IdColor, position?: 'static' | 'fixed' | 'sticky', placement?: 'bottom' | 'top', safeArea?: boolean, fullWidth?: boolean, animated?: boolean, bordered?: boolean, ariaLabel?: string, ui?: Record<string, any> }>
export declare const MobileNavbar: typeof IdMobileNavbar
export declare const IdEmpty: DefineComponent<{ title?: string, description?: string, icon?: any, actionLabel?: string, noBg?: boolean, size?: IdSize, variant?: string, ui?: Record<string, any> }>
export declare const IdIphoneFrame: DefineComponent<{}>
export declare const IdToast: DefineComponent<{ position?: 'bottom-center' | 'bottom-right' | 'top-center' | 'top-right' }>
export declare const IdTimeline: DefineComponent<{ items: Array<{ id?: string | number, title: string, description?: string, time?: string, timestamp?: string, icon?: any, variant?: string, status?: string, actions?: Array<any> }>, variant?: 'default' | 'cards' | string, size?: IdSize, connector?: boolean, ui?: Record<string, any> }>
export declare const IdStepper: DefineComponent<{ steps: Array<{ label?: string, title?: string, description?: string, icon?: any, status?: 'pending' | 'active' | 'completed' | 'error' | string, disabled?: boolean, error?: boolean | string } | string>, modelValue?: number, orientation?: 'horizontal' | 'vertical', clickable?: boolean, size?: IdSize, variant?: 'default' | 'glass' | string, color?: IdColor, ui?: Record<string, any> }>

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
export declare const IdDialog: DefineComponent<{ modelValue?: boolean, open?: boolean, title?: string, subtitle?: string, description?: string, maxWidth?: string, size?: string, variant?: string, closeOnBackdrop?: boolean, closeOnOutsideClick?: boolean, closeOnEscape?: boolean, showClose?: boolean, teleport?: boolean, ui?: Record<string, any> }>
export declare const IdDialogHeader: DefineComponent<{}>
export declare const IdDialogTitle: DefineComponent<{}>
export declare const IdDialogDescription: DefineComponent<{}>
export declare const IdDialogBody: DefineComponent<{}>
export declare const IdDialogFooter: DefineComponent<{}>

// ── Hardware Shells & Layout Components ──
export declare const IdMacbookFrame: DefineComponent<{ appName?: string, showMenuBar?: boolean, color?: 'silver' | 'space-gray' | 'midnight' | 'starlight' }>
export declare const IdIpadFrame: DefineComponent<{ orientation?: 'landscape' | 'portrait', showStatusBar?: boolean, showHomeBar?: boolean, color?: 'space-gray' | 'silver' | 'starlight' }>
export declare const IdSidebar: DefineComponent<{ modelValue?: string | number, title?: string, logo?: any, groups?: Array<{ id?: string, title?: string, collapsible?: boolean, collapsed?: boolean, items: Array<{ id?: string | number, label?: string, title?: string, icon?: any, badge?: string | number, disabled?: boolean, children?: Array<any> }> }>, items?: Array<any>, user?: { name?: string, email?: string, role?: string, avatar?: string }, collapsible?: boolean, collapsed?: boolean, variant?: 'default' | 'glass' | 'bordered' | 'floating' | string, size?: IdSize, ui?: Record<string, any> }>
export declare const IdHeader: DefineComponent<{ title?: string, subtitle?: string, eyebrow?: string, sticky?: boolean, border?: boolean, variant?: string }>
export declare const IdFooter: DefineComponent<{ columns?: any[], copyrightText?: string, countryText?: string, legalLinks?: any[], border?: boolean, variant?: string }>
export declare const IdBanner: DefineComponent<{ modelValue?: boolean, message?: string, icon?: string, actionLabel?: string, dismissible?: boolean, sticky?: boolean, align?: string, variant?: string, size?: IdSize, radius?: IdRadius, ui?: Record<string, any> }>
export declare const IdSeparator: DefineComponent<{ orientation?: IdDirection, label?: string, spacing?: string, variant?: string, ui?: Record<string, any> }>
export declare const IdKbd: DefineComponent<{ keys?: string | string[], size?: IdSize, variant?: string, ui?: Record<string, any> }>
export declare const IdWallpaper: DefineComponent<{
  variant?: 'solid' | 'gradient' | 'mesh' | 'radial' | 'aurora' | 'glow' | 'noise' | 'image' | string,
  preset?: string,
  direction?: string,
  from?: string,
  to?: string,
  stops?: (string | { color: string, offset?: string })[],
  intensity?: 'subtle' | 'soft' | 'normal' | 'vibrant' | number,
  opacity?: number | string,
  position?: 'top' | 'top-left' | 'top-right' | 'center' | 'bottom' | 'bottom-left' | 'bottom-right' | string,
  size?: 'cover' | 'contain' | 'auto' | string,
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | number | string,
  mask?: 'none' | 'fade-bottom' | 'fade-top' | 'fade-edges' | 'radial' | string,
  overlay?: 'none' | 'vignette' | 'scrim' | 'frosted' | 'dots' | 'grid' | string,
  imageSrc?: string,
  imageAlt?: string,
  noise?: boolean,
  animated?: boolean,
  fixed?: boolean,
  as?: string,
  color?: string,
  ui?: Record<string, any>
}>
export declare const Wallpaper: typeof IdWallpaper

// ── Advanced Form Inputs ──
export declare const IdPinInput: DefineComponent<{
  modelValue?: string | number | string[],
  length?: number,
  type?: 'numeric' | 'alphanumeric' | 'alpha' | 'any',
  masked?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  error?: boolean,
  errorText?: string,
  hint?: string,
  label?: string,
  required?: boolean,
  size?: 'sm' | 'md' | 'lg' | 'xl' | string,
  autofocus?: boolean,
  placeholder?: string,
  separator?: boolean | string,
  separatorStep?: number,
  ariaLabel?: string,
  ui?: Record<string, any>
}>
export declare const IdTimePicker: DefineComponent<{
  modelValue?: string | number | Date,
  value?: string | number | Date,
  is24Hour?: boolean,
  format?: '12h' | '24h' | '12' | '24' | string,
  showSeconds?: boolean,
  minuteStep?: number,
  step?: number,
  hourStep?: number,
  secondStep?: number,
  min?: string,
  max?: string,
  direction?: 'horizontal' | 'vertical',
  disabled?: boolean,
  readonly?: boolean,
  loading?: boolean,
  clearable?: boolean,
  continuous?: boolean,
  showIcon?: boolean,
  label?: string,
  hint?: string,
  description?: string,
  errorText?: string,
  error?: boolean | string,
  required?: boolean,
  size?: IdSize,
  variant?: 'default' | 'glass' | 'subtle' | 'ghost' | 'outline' | 'pill' | string,
  radius?: IdRadius,
  color?: IdColor,
  id?: string,
  ui?: {
    base?: string,
    wrapper?: string,
    decrement?: string,
    increment?: string,
    hour?: string,
    minute?: string,
    second?: string,
    separator?: string,
    period?: string,
    label?: string,
    hint?: string,
    error?: string,
    icon?: string,
    spinner?: string,
    [key: string]: any
  }
}>
export declare const IdTagInput: DefineComponent<{
  modelValue?: string[],
  value?: string[],
  placeholder?: string,
  placeholderOnlyWhenEmpty?: boolean,
  label?: string,
  hint?: string,
  description?: string,
  errorText?: string,
  error?: boolean | string,
  success?: boolean | string,
  warning?: boolean | string,
  disabled?: boolean,
  readonly?: boolean,
  loading?: boolean,
  required?: boolean,
  clearable?: boolean,
  allowDuplicates?: boolean,
  addOnBlur?: boolean,
  addOnPaste?: boolean,
  delimiters?: string[],
  maxTags?: number,
  maxTagLength?: number,
  tagVariant?: 'default' | 'accent' | 'heat' | 'live' | 'gray' | 'plain' | 'success' | 'warning' | 'danger' | 'mono' | string,
  variant?: string,
  color?: IdColor,
  size?: IdSize | string,
  radius?: IdRadius | string,
  id?: string,
  iconLeft?: any,
  iconRight?: any,
  ui?: {
    base?: string,
    label?: string,
    wrapper?: string,
    box?: string,
    tags?: string,
    tagsList?: string,
    tag?: string,
    tagLabel?: string,
    remove?: string,
    removeButton?: string,
    input?: string,
    hint?: string,
    error?: string,
    spinner?: string,
    icon?: string,
    clearButton?: string,
    [key: string]: any
  }
}>
export declare const IdRating: DefineComponent<{
  modelValue?: number,
  max?: number,
  count?: number,
  allowHalf?: boolean,
  half?: boolean,
  clearable?: boolean,
  showScore?: boolean,
  showValue?: boolean,
  scoreFormat?: ((score: number) => string) | string,
  label?: string,
  readonly?: boolean,
  disabled?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string,
  color?: string,
  ui?: {
    base?: string,
    label?: string,
    stars?: string,
    star?: string,
    active?: string,
    inactive?: string,
    hover?: string,
    score?: string,
    value?: string,
    [key: string]: any
  }
}>
export declare const IdNumberInput: DefineComponent<{ modelValue?: number | string, value?: number | string, min?: number, max?: number, step?: number, stepVal?: number, direction?: 'horizontal' | 'vertical', size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string, radius?: string, color?: string, variant?: string, precision?: number, unit?: string, prefix?: string, suffix?: string, label?: string, hint?: string, description?: string, placeholder?: string, errorText?: string, error?: boolean | string, success?: boolean | string, warning?: boolean | string, disabled?: boolean, readonly?: boolean, loading?: boolean, required?: boolean, continuous?: boolean, id?: string, ui?: { base?: string, wrapper?: string, decrement?: string, input?: string, increment?: string, icon?: string, label?: string, hint?: string, prefix?: string, suffix?: string, unit?: string, spinner?: string, [key: string]: any } }>
export declare const IdNumericStepper: DefineComponent<{ modelValue?: number | string, value?: number | string, min?: number, max?: number, step?: number, stepVal?: number, direction?: 'horizontal' | 'vertical', size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string, radius?: string, color?: string, variant?: string, precision?: number, unit?: string, prefix?: string, suffix?: string, label?: string, hint?: string, description?: string, placeholder?: string, errorText?: string, error?: boolean | string, success?: boolean | string, warning?: boolean | string, disabled?: boolean, readonly?: boolean, loading?: boolean, required?: boolean, continuous?: boolean, id?: string, ui?: { base?: string, wrapper?: string, decrement?: string, input?: string, increment?: string, icon?: string, label?: string, hint?: string, prefix?: string, suffix?: string, unit?: string, spinner?: string, [key: string]: any } }>
export declare const IdColorPicker: DefineComponent<{
  modelValue?: string,
  value?: string,
  label?: string,
  hint?: string,
  description?: string,
  format?: 'auto' | 'hex' | 'rgb' | 'hsl' | 'hsv',
  opacity?: boolean,
  showAlpha?: boolean,
  alpha?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  required?: boolean,
  size?: 'sm' | 'md' | 'lg' | string,
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | string,
  variant?: 'default' | 'outline' | 'solid' | 'glass' | string,
  mode?: 'spectrum' | 'grid' | 'sliders',
  showModeSwitch?: boolean,
  showInputs?: boolean,
  showPresets?: boolean,
  showPreview?: boolean,
  showEyeDropper?: boolean,
  inline?: boolean,
  presets?: string[],
  ui?: {
    base?: string,
    label?: string,
    trigger?: string,
    triggerSwatch?: string,
    triggerValue?: string,
    triggerAlpha?: string,
    popover?: string,
    panel?: string,
    modes?: string,
    spectrumArea?: string,
    spectrumHandle?: string,
    preview?: string,
    hueSlider?: string,
    alphaSlider?: string,
    sliderThumb?: string,
    inputs?: string,
    presets?: string,
    presetSwatch?: string,
    footer?: string,
    hint?: string,
    [key: string]: any
  }
}>
export declare const IdQRCode: DefineComponent<{
  value?: string | number,
  size?: IdSize | number | string,
  variant?: 'default' | 'rounded' | 'minimal' | 'glass' | string,
  color?: string,
  background?: string,
  errorCorrection?: 'L' | 'M' | 'Q' | 'H' | 'l' | 'm' | 'q' | 'h',
  margin?: number,
  radius?: IdRadius | number | string,
  disabled?: boolean,
  logo?: any,
  logoSrc?: string,
  logoIcon?: any,
  logoSize?: number | string,
  logoRadius?: string | number,
  logoBackground?: string,
  logoMargin?: number,
  label?: string,
  caption?: string,
  labelPosition?: 'top' | 'bottom',
  responsive?: boolean,
  downloadable?: boolean,
  ariaLabel?: string,
  ui?: {
    base?: string,
    code?: string,
    background?: string,
    logo?: string,
    label?: string,
    caption?: string,
    actions?: string,
    [key: string]: any
  }
}>
export declare const QRCode: typeof IdQRCode


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

export declare function IdesignResolver(options?: {
  prefix?: string
  importStyle?: 'css' | boolean
}): {
  type: 'component'
  resolve: (name: string) => { name: string; from: string; sideEffects?: string[] } | undefined
}



