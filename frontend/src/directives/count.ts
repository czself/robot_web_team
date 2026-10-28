import type { Directive } from 'vue'

/*
 * v-count="4"  —— 元素文本按数字滚动到目标值
 * 保留原文本位数（"04" 滚完仍是 "04"），不传值则不滚（年份这类数字不适合滚）。
 */

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* 起步快、收尾长，比线性更有"落定"感 */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3.4)

let observer: IntersectionObserver | null = null

const run = (el: HTMLElement, to: number) => {
  const final = el.dataset.countText ?? el.textContent ?? ''
  const pad = final.length
  const duration = 1200
  const start = performance.now()

  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration)
    el.textContent = String(Math.round(to * easeOut(p))).padStart(pad, '0')
    if (p < 1) requestAnimationFrame(step)
    else el.textContent = final
  }
  requestAnimationFrame(step)
}

const getObserver = () => {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        observer?.unobserve(el)
        const to = Number(el.dataset.countTo)
        if (Number.isFinite(to)) run(el, to)
      })
    },
    { threshold: 0.5 },
  )
  return observer
}

export const count: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (binding.value === undefined || binding.value === null) return
    const to = Number(binding.value)
    if (!Number.isFinite(to)) return

    el.dataset.countText = (el.textContent ?? '').trim()
    if (reduced()) return

    el.dataset.countTo = String(to)
    el.textContent = String(0).padStart(el.dataset.countText.length, '0')
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
