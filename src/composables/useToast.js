import { ref, readonly } from 'vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
  const add = (message, options = {}) => {
    const id = ++toastId
    const toast = {
      id,
      message: typeof message === 'string' ? message : (options.message || ''),
      title: typeof message === 'object' ? message.title : (options.title || message),
      description: typeof message === 'object' ? message.description : options.description,
      type: options.type || options.variant || (typeof message === 'object' ? message.type : 'info'),
      duration: options.duration !== undefined ? options.duration : 3500,
      actionLabel: options.actionLabel,
      onAction: options.onAction,
      dismissible: options.dismissible !== false,
      icon: options.icon
    }

    toasts.value.push(toast)

    if (toast.duration > 0) {
      setTimeout(() => remove(id), toast.duration)
    }

    return id
  }

  const remove = (id) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (msg, opts) => add(msg, { ...opts, type: 'success' })
  const error = (msg, opts) => add(msg, { ...opts, type: 'error' })
  const info = (msg, opts) => add(msg, { ...opts, type: 'info' })
  const warning = (msg, opts) => add(msg, { ...opts, type: 'warning' })
  const clear = () => { toasts.value = [] }

  return {
    toasts: readonly(toasts),
    add,
    remove,
    clear,
    success,
    error,
    info,
    warning
  }
}
