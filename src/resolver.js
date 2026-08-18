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
      // Matches IdButton, IdPinInput, IdCard, IdSegmentedControl, etc.
      if (name.startsWith(prefix) || name === 'MobileNavbar' || name.endsWith('Template')) {
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
