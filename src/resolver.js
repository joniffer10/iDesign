/**
 * Idesign Component Resolver for unplugin-vue-components
 * Enables automatic on-demand component importing in Vite, Webpack, Rollup, and Astro.
 *
 * @example
 * // vite.config.js
 * import Components from 'unplugin-vue-components/vite'
 * import { IdesignResolver } from '@idesign/vue/resolver'
 *
 * export default defineConfig({
 *   plugins: [
 *     Components({
 *       resolvers: [IdesignResolver()]
 *     })
 *   ]
 * })
 */
export function IdesignResolver(options = {}) {
  const { prefix = 'Id', importStyle = 'css' } = options

  return {
    type: 'component',
    resolve: (name) => {
      // Matches IdButton, IdTerminal, IdPinInput, etc., or aliases like Terminal, QRCode, MobileNavbar
      if (name.startsWith(prefix) || name === 'Terminal' || name === 'QRCode' || name === 'MobileNavbar' || name === 'Wallpaper' || name === 'DottedActivity' || name.endsWith('Template')) {
        const sideEffects = importStyle ? ['@idesign/vue/tokens'] : undefined

        return {
          name,
          from: '@idesign/vue',
          sideEffects
        }
      }
    }
  }
}

export default IdesignResolver
