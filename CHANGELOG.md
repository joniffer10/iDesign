# Changelog

All notable changes to the `@idesign/vue` library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-08-16

### Added
- **Hardware Shells**: Added `<IdMacbookFrame>` and `<IdIpadFrame>` with camera notch/bezels, status bar, and menu bar simulations.
- **Layout & Navigation Components**: Added `<IdSidebar>`, `<IdHeader>`, `<IdFooter>`, `<IdBanner>`, `<IdSeparator>`, and `<IdKbd>`.
- **Advanced Form Inputs**: Added `<IdPinInput>`, `<IdTimePicker>`, `<IdTagInput>`, `<IdRating>`, `<IdNumberInput>`, `<IdColorPicker>`.
- **Drag & Drop File Upload**: Enhanced `<IdFileUpload>` with dedicated drag-and-drop dropzone variant, live hover physics, and file cards.
- **Global UI Configuration System**: Declarative customization via `createUI` / `createIdesign` and `useIdesignConfig` supporting design tokens (`base`, `colors`, `sizes`, `spacing`, `radius`, `shadows`, `motion`) and component-level defaults.

- **Compound Form System**: Added `<IdForm>`, `<IdFormField>`, `<IdFormLabel>`, `<IdFormDescription>`, `<IdFormMessage>`, `<IdFormGroup>`, `<IdFormSection>`, and `<IdFormActions>`.
- **Compound Card System**: Added `<IdCardHeader>`, `<IdCardTitle>`, `<IdCardDescription>`, `<IdCardContent>`, and `<IdCardFooter>`.
- **Compound Dialog System**: Added `<IdDialog>`, `<IdDialogHeader>`, `<IdDialogTitle>`, `<IdDialogDescription>`, `<IdDialogBody>`, and `<IdDialogFooter>`.
- **Interactive 3-Tab Customization Guide**: Added a 3-tab customization panel (Composition API, Slots, Theme & Global UI Config) inside the component playground modal.
- **Internationalization & RTL**: Added `dir="rtl"` support and formatting helpers (`formatNumber`, `formatCurrency`, `formatDate`, `setDir`, `setLocale`).
- **Comprehensive Vitest Suite**: 17 component and composable test suites covering forms, dialogs, buttons, inputs, accessibility, and theming.

### Improved
- **Accessibility (a11y)**: Complete WAI-ARIA implementation across `<IdTabs>`, `<IdAccordion>`, `<IdSelect>`, `<IdToggle>`, `<IdCheckbox>`, `<IdToast>`, and overlays with keyboard navigation and `:focus-visible` styling.
- **Design Tokens**: Standardized semantic tokens in `src/styles/tokens.css` with 2-layer elevation shadows and fluid spring curves.
- **TypeScript Support**: Full TypeScript declarations across all compound components, composables, and configuration interfaces in `src/index.d.ts`.
- **Packaging & Build**: Optimized ESM, UMD, and CSS bundle generation with zero warnings and clean side-effect declarations.
