# Changelog

All notable changes to the `@idesign/vue` library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-08-19

### 🚀 Major Additions
- **Dedicated Nuxt 3 Module (`@idesign/vue/nuxt`)**:
  - One-line Nuxt 3 integration (`modules: ['@idesign/vue/nuxt']`) with automatic token injection, global component discovery, and composable auto-imports.
- **`unplugin-vue-components` Resolver (`@idesign/vue/resolver`)**:
  - Exported `IdesignResolver` for automatic on-demand component importing in Vite, Webpack, Rollup, and Astro.
- **1-Click CLI Copy on Catalog Cards**:
  - Added direct `CLI Add` button to every catalog grid card in `CatalogGrid.vue` for instant `npx idesign add <component>` copying.
- **Dedicated Component Installation Modal**:
  - Added dedicated installation modal to `ComponentPlaygroundModal.vue` with copyable CLI, NPM, and Nuxt 3 auto-import commands.
- **CDN Stylesheet Integration for HTML + CSS**:
  - Integrated unpkg CDN stylesheet link (`https://unpkg.com/@idesign/vue@latest/dist/idesign.css`) at the top of all HTML + CSS snippets for instant zero-config rendering.

### ✨ Component & Aesthetic Improvements
- **Expanded File & Avatar Uploader (`IdFileUpload`) with 6 Variants**:
  - `variant="avatar"`: Circular / squircle / rounded avatar photo uploader with `+` / camera badge button, live preview, and frosted glass hover change overlay.
  - `variant="button"`: Standalone upload button trigger with customizable icon, button styles (`primary`, `secondary`, `glass`), sizes (`xs`-`xl`), and loading spinner.
  - `variant="image-card"`: Media thumbnail card dropzone with configurable aspect ratios (`16-9`, `1-1`, `4-3`), photo preview, and replace/delete action controls.
  - `variant="compact"`: Horizontal compact inline upload bar with upload icon, filename/hint text, and browse button.
  - `variant="default"` & `variant="glass"`: Full drag-and-drop dropzone surfaces with dashed/frosted borders and file list queue.
- **Harmonized Time Input (`IdTimePicker`) with Numeric Stepper Input**:
  - Re-architected `IdTimePicker` to match the exact Liquid Glass UI surface, hairline dividers, continuous-hold stepping, and visual language of `IdNumberInput`.
  - Added full suite of variants: `default`, `glass`, `subtle`, `ghost`, `outline`, `pill`.
  - Added full 5-tier size scale: `xs` (28px), `sm` (34px), `md` (42px), `lg` (48px), `xl` (54px), plus `horizontal` and `vertical` orientations.
  - Added radius tiers (`none`, `sm`, `md`, `lg`, `full`) and semantic color accent rings (`primary`, `success`, `warning`, `danger`).
- **Enhanced Workflow Stepper (`IdStepper`)**:
  - Added `subtle`, `card`, and `pill` variants matching the Liquid Glass system.
  - Expanded size scaling with `size-xs` and `size-xl` tiers.
- **Searchable Select Dropdown (`IdSelect`)**:
  - Added `searchable`, `searchPlaceholder`, and `emptyText` props for real-time option filtering, arrow keyboard navigation, and Enter selection.
- **Masked Password Mode (`IdInput`)**:
  - Added `masked` prop and `type="password"` support with built-in accessible Eye / Eye-Off toggle button.
- **Apple-Grade Spring Micro-Interactions**:
  - Added tactile active press compression (`:active { transform: scale(0.97); }`) and calibrated spring release (`--ease-spring: cubic-bezier(0.32, 0.72, 0, 1)`) across `IdButton`, `IdCard`, `IdSegmentedControl`, `IdPanelRow`, `IdNumberInput`, `IdTimePicker`, and `CatalogGrid` cards.
- **Full WAI-ARIA Keyboard Navigation**:
  - `IdDropdownMenu`: Added `ArrowDown`/`ArrowUp` roving keyboard navigation, `Enter`/`Space` selection, `Escape` dismissal, and ARIA roles (`role="menu"`, `role="menuitem"`, `aria-haspopup="menu"`).
  - `IdSelect`: Enhanced combobox and listbox keyboard accessibility with auto-scroll, search filter, and roving index.
  - `IdModal`: Focus trapping (`tab` / `shift+tab`), `aria-modal="true"`, and automatic backdrop escape handlers.
- **Form Validation & Context Integration**:
  - Implemented form field context injection (`id-form-field-context`) connecting `IdFormField` directly to `IdInput`, `IdSelect`, `IdTimePicker`, and `IdPinInput`.
  - Automatically propagates `name`, `error`, `required`, `disabled`, and `aria-invalid` attributes for seamless compatibility with **VeeValidate**, **Zod**, and native HTML forms.

### 🧪 Test Suite & Packaging
- **Vitest Suite**: Expanded test suite to **100 automated unit tests** (`tests/components.test.js`, `tests/modal.test.js`), passing 100% cleanly.
- **Subpath Exports**: Configured `./nuxt`, `./resolver`, `./tokens`, and `./styles.css` subpath exports in `package.json`.
- **Packaging Tarball**: Verified `npm pack --dry-run` to accurately include all 118 files across distribution bundles, SFC components, templates, tokens, and typings.
