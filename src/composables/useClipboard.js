import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  let timeout = null

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => { copied.value = false }, 2000)
      return true
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        copied.value = true
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => { copied.value = false }, 2000)
        return true
      } catch {
        return false
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  return { copy, copied }
}
