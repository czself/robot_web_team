import type { Directive } from 'vue'

/*
 * v-reveal —— 元素进入视口时淡入
 *   v-reveal            默认从下方 22px 升起
 *   v-reveal="80"       延迟 80ms
 *   v-reveal="'left'"   从左滑入（left / right / zoom）
 *   v-reveal="{ delay: 80, dir: 'left' }"
 */

type RevealDir = 'left' | 'right' | 'zoom'
type RevealOptions = { delay?: number; dir?: RevealDir }

let observer: IntersectionObserver | null = null

const getObserver = () => {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

const normalize = (value: unknown): { delay: number; dir?: RevealDir } => {
  if (typeof value === 'number') return { delay: value }
  if (typeof value === 'string') return { delay: 0, dir: value as RevealDir }
  if (value && typeof value === 'object') {
    const o = value as RevealOptions
    return { delay: o.delay ?? 0, dir: o.dir }
  }
  return { delay: 0 }
}

export const reveal: Directive<HTMLElement, number | string | RevealOptions | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')

    const { delay, dir } = normalize(binding.value)
    if (dir) el.classList.add(`reveal--${dir}`)

    if (Number.isFinite(delay) && delay > 0) {
      el.style.animationDelay = `${delay}ms`
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }

    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
