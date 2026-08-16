import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    test: {
      environment: 'jsdom',
      globals: true
    },

    ...(isLib
      ? {
          build: {
            lib: {
              entry: path.resolve(__dirname, 'src/index.js'),
              name: 'Idesign',
              fileName: (format) => `idesign.${format}.js`
            },
            rollupOptions: {
              external: ['vue'],
              output: {
                globals: { vue: 'Vue' },
                assetFileNames: 'idesign.[ext]'
              }
            }
          }
        }
      : {})
  }
})
