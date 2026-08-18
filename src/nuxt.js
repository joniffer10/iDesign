import { defineNuxtModule, addPlugin, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@idesign/vue',
    configKey: 'idesign',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    prefix: '',
    tokens: true
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // 1. Inject Liquid Glass Design Tokens CSS
    if (options.tokens) {
      nuxt.options.css = nuxt.options.css || []
      const tokensPath = resolver.resolve('./styles/tokens.css')
      if (!nuxt.options.css.includes(tokensPath)) {
        nuxt.options.css.unshift(tokensPath)
      }
    }

    // 2. Auto-register all Idesign components
    addComponentsDir({
      path: resolver.resolve('./components/idesign'),
      prefix: options.prefix || '',
      global: true,
      pathPrefix: false
    })

    // 3. Auto-import composables
    addImportsDir(resolver.resolve('./composables'))
  }
})
