import { ref, markRaw } from 'vue'

const modals = ref([])
let modalId = 0

export function useModal() {
  const open = (options = {}) => {
    const id = ++modalId
    return new Promise((resolve) => {
      modals.value.push({
        id,
        title: options.title || '',
        component: options.component ? markRaw(options.component) : null,
        message: options.message || '',
        description: options.description || options.message || '',
        content: options.content || '',
        variant: options.variant || 'inset',
        danger: options.danger || false,
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        resolve
      })
    })
  }

  const close = (id, result = false) => {
    const modal = modals.value.find(m => m.id === id)
    if (modal) {
      modal.resolve(result)
      modals.value = modals.value.filter(m => m.id !== id)
    }
  }

  const confirm = async (options) => {
    return open({ ...options })
  }

  return { modals, open, close, confirm }
}
