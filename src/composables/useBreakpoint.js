import { ref, onMounted, onBeforeUnmount } from 'vue'

export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

export function useBreakpoint() {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const current = ref('lg')

  const update = () => {
    if (typeof window === 'undefined') return
    width.value = window.innerWidth
    if (width.value >= breakpoints['2xl']) current.value = '2xl'
    else if (width.value >= breakpoints.xl) current.value = 'xl'
    else if (width.value >= breakpoints.lg) current.value = 'lg'
    else if (width.value >= breakpoints.md) current.value = 'md'
    else if (width.value >= breakpoints.sm) current.value = 'sm'
    else current.value = 'xs'
  }

  const isAbove = (bp) => width.value >= (breakpoints[bp] || 0)
  const isBelow = (bp) => width.value < (breakpoints[bp] || 0)
  const isMobile = () => width.value < breakpoints.md
  const isTablet = () => width.value >= breakpoints.md && width.value < breakpoints.lg
  const isDesktop = () => width.value >= breakpoints.lg

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', update)
  })

  return {
    width,
    current,
    isAbove,
    isBelow,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints
  }
}
