import type { Directive } from 'vue'

/*
 * v-magnetic="8" —— 指针靠近时元素被轻轻"吸"过去，最大位移默认 6px
 * 只写 --mgt-x / --mgt-y，实际 transform 由组件 CSS 决定，避免和 hover 状态打架
 */

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const cleanups = new WeakMap<HTMLElement, () => void>()

export const magnetic: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (!finePointer() || reduced()) return

    const max = typeof binding.value === 'number' ? binding.value : 6
    let frame = 0
    let x = 0
    let y = 0

    const flush = () => {
      frame = 0
      el.style.setProperty('--mgt-x', `${x.toFixed(2)}px`)
      el.style.setProperty('--mgt-y', `${y.toFixed(2)}px`)
    }

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - rect.left) / rect.width - 0.5
      const dy = (e.clientY - rect.top) / rect.height - 0.5

      x = dx * max * 2
      y = dy * max * 2

      el.classList.add('is-magnetic')
      if (!frame) frame = requestAnimationFrame(flush)
    }

    const onLeave = () => {
      el.classList.remove('is-magnetic')
      x = 0
      y = 0
      el.style.setProperty('--mgt-x', '0px')
      el.style.setProperty('--mgt-y', '0px')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    cleanups.set(el, () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    })
  },
  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
}
