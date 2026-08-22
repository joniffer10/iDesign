/**
 * ════════════════════════════════════════════════════════════════
 *  Idesign — Shared Variant System
 *  Canonical variant resolution, alias mapping, and constants.
 * ════════════════════════════════════════════════════════════════
 */

/**
 * Canonical variant vocabulary.
 * Every variant in the library must be one of these canonical names
 * (or a component-specific variant that extends this list).
 */
export const CANONICAL_VARIANTS = [
  'default',
  'solid',
  'outline',
  'soft',
  'subtle',
  'ghost',
  'glass',
  'borderless',
  'seamless',
  'hero',
  'pill'
]

/**
 * Global alias map: alternative names → canonical name.
 * Components may extend this with component-specific aliases.
 */
export const VARIANT_ALIASES = {
  // borderless aliases
  'no-outline': 'borderless',
  'no-border': 'borderless',
  'noborder': 'borderless',

  // seamless aliases
  'no-dividers': 'seamless',
  'no-divider': 'seamless',
  'nodivider': 'seamless',
  'nodividers': 'seamless',
  'clean': 'seamless',
  'plain': 'seamless',
  'solid-seamless': 'seamless',

  // soft ↔ subtle intent helpers
  'tinted': 'soft',
  'muted': 'subtle',
  'quiet': 'subtle',

  // primary → solid for action components
  'filled': 'solid',

  // pill → pill
  'rounded': 'pill'
}

/**
 * Resolves a variant value through the alias map to its canonical form.
 *
 * @param {string} variant - The variant value to resolve (may be an alias).
 * @param {string[]} [allowedVariants] - Optional list of variants the component supports.
 *   If provided, unrecognized variants fall back to the first allowed or 'default'.
 * @param {Record<string, string>} [componentAliases] - Optional component-specific alias overrides.
 *   These take priority over global aliases.
 * @returns {string} The resolved canonical variant name.
 */
export function resolveVariant(variant, allowedVariants, componentAliases) {
  if (!variant) return 'default'

  const v = String(variant).toLowerCase().trim()

  // 1. Check component-specific aliases first
  if (componentAliases && componentAliases[v]) {
    return componentAliases[v]
  }

  // 2. If the value is explicitly in the allowed list, keep it
  if (allowedVariants && allowedVariants.includes(v)) {
    return v
  }

  // 3. Check global aliases
  if (VARIANT_ALIASES[v]) {
    return VARIANT_ALIASES[v]
  }

  return v
}

/**
 * Creates a variant resolver pre-configured for a specific component.
 * Useful for components that want to set up their variant resolution once.
 *
 * @param {string[]} allowedVariants - Variants this component supports.
 * @param {Record<string, string>} [componentAliases] - Component-specific alias map.
 * @returns {(variant: string) => string} A resolver function.
 */
export function createVariantResolver(allowedVariants, componentAliases) {
  return (variant) => resolveVariant(variant, allowedVariants, componentAliases)
}

/**
 * Checks whether a given variant is one of the glass-family variants
 * that should receive the shared Liquid Glass material treatment.
 *
 * @param {string} variant - The variant to check.
 * @returns {boolean}
 */
export function isGlassVariant(variant) {
  return variant === 'glass'
}

/**
 * Checks whether a given variant should remove internal structural dividers.
 *
 * @param {string} variant - The variant to check.
 * @returns {boolean}
 */
export function isSeamlessVariant(variant) {
  const v = resolveVariant(variant)
  return v === 'seamless'
}

/**
 * Checks whether a given variant should remove the outer border.
 *
 * @param {string} variant - The variant to check.
 * @returns {boolean}
 */
export function isBorderlessVariant(variant) {
  const v = resolveVariant(variant)
  return v === 'borderless'
}

/**
 * Checks whether a given variant should apply pill radius.
 *
 * @param {string} variant - The variant to check.
 * @returns {boolean}
 */
export function isPillVariant(variant) {
  return variant === 'pill'
}
