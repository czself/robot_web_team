import type { Directive } from 'vue'

/*
 * v-tilt="6"  —— 指针在卡片上时做轻微 3D 倾斜，并同步 --mx/--my 供高光跟随
 * 角度很小（默认 5°），只做"浮起来看"的暗示，不做夸张翻转
 */

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const cleanups = new WeakMap<HTMLElement, () => void>()

export const tilt: Directive<HTMLElement, number | boolean | undefined> = {
  mounted(el, binding) {
    if (binding.value === false) return
    if (!finePointer() || reduced()) return

    const max = typeof binding.value === 'number' ? binding.value : 5
    let frame = 0
    let rx = 0
    let ry = 0

    const flush = () => {
      frame = 0
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    }

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5

      ry = px * max * 2
      rx = -py * max * 2

      el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`)
      el.classList.add('is-tilting')

      if (!frame) frame = requestAnimationFrame(flush)
    }

    const onLeave = () => {
      el.classList.remove('is-tilting')
      rx = 0
      ry = 0
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
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
