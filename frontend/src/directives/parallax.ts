import type { Directive } from 'vue'

/**
 * 滚动驱动视差
 *
 * 用法：
 *   v-parallax="0.06"                          // 速度系数
 *   v-parallax="{ speed: 0.06, clamp: 40 }"    // 速度 + 位移上限（px）
 *
 * speed 的含义（不是"移动多少像素"，而是"比页面慢多少"）：
 *   正数 → 元素相对滚动滞后，读起来更远（背景层）
 *   负数 → 元素超前于滚动，读起来更近（前景层）
 *   0.06 大约是"每滚 100px 少走 6px"
 *
 * 为什么用 `translate` 而不是 `transform`：
 *   站内已有 `v-reveal` 入场动画在 `transform` / `scale` 上做位移，
 *   `.tilt` 也占用 `transform` 做 3D 倾斜。`translate` 是独立属性，
 *   可以和它们叠加，互不覆盖。
 *
 * 性能：
 *   全局只有一个 rAF 循环，所有元素共用；滚动停止后循环自动退出，
 *   不会常驻空转。所有读取（getBoundingClientRect）集中在写入之前完成，
 *   避免同一帧内读写交替触发布局抖动。
 */

export interface ParallaxOptions {
  speed?: number
  clamp?: number
}

interface Item {
  el: HTMLElement
  speed: number
  clamp: number
  /** 当前渲染值（带惯性插值） */
  current: number
  /** 目标值（由滚动位置算出） */
  target: number
}

type PxEl = HTMLElement & { __pxItem?: Item }

const items = new Set<Item>()
let raf = 0
let lastTime = 0
let listening = false

/** 惯性系数：0.86 表示每帧向目标靠拢 14%，约 8 帧（130ms）走完九成 */
const FOLLOW = 0.86
/** 小于这个距离就直接落位，避免无限逼近导致循环永不结束 */
const EPS = 0.06

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 窄屏减弱幅度：小屏上大位移更容易看出卡顿和露边 */
const damp = () => (window.innerWidth < 900 ? 0.5 : 1)

const measure = (it: Item) => {
  const rect = it.el.getBoundingClientRect()
  // getBoundingClientRect 已经带上了我们写进去的 translate，减掉才是元素的"原位置"
  const center = rect.top + rect.height / 2 - it.current
  const offset = center - window.innerHeight / 2
  const raw = -offset * it.speed * damp()
  return raw > it.clamp ? it.clamp : raw < -it.clamp ? -it.clamp : raw
}

const write = (it: Item, value: number) => {
  it.current = value
  it.el.style.setProperty('translate', `0 ${value.toFixed(2)}px`)
}

// 复用数组，避免每帧新建
const queue: Array<{ it: Item; target: number }> = []

const tick = (now: number) => {
  const dt = lastTime ? Math.min(now - lastTime, 50) : 16.7
  lastTime = now
  // 让插值系数与帧率无关，60Hz / 120Hz 手感一致
  const k = 1 - Math.pow(FOLLOW, dt / 16.7)

  // 第一遍：只读（所有 getBoundingClientRect 集中在写入之前，避免布局抖动）
  queue.length = 0
  for (const it of items) {
    queue.push({ it, target: measure(it) })
  }

  // 第二遍：只写
  let busy = false
  for (const { it, target } of queue) {
    it.target = target
    const diff = target - it.current
    if (Math.abs(diff) > EPS) {
      write(it, it.current + diff * k)
      busy = true
    } else if (it.current !== target) {
      write(it, target)
    }
  }

  if (busy) {
    raf = requestAnimationFrame(tick)
  } else {
    raf = 0
    lastTime = 0
  }
}

const wake = () => {
  if (raf) return
  raf = requestAnimationFrame(tick)
}

const listen = () => {
  if (listening) return
  listening = true
  window.addEventListener('scroll', wake, { passive: true })
  window.addEventListener('resize', wake)
}

export const parallax: Directive<HTMLElement, number | ParallaxOptions | undefined> = {
  mounted(el, binding) {
    if (reduced()) return

    const value = binding.value
    const speed = typeof value === 'number' ? value : (value?.speed ?? 0.05)
    const clamp = typeof value === 'number' ? 90 : (value?.clamp ?? 90)

    const item: Item = { el, speed, clamp, current: 0, target: 0 }
    ;(el as PxEl).__pxItem = item
    items.add(item)
    listen()

    // 首次落位：直接算到今天该在的位置，避免进场时从 0 滑过去
    write(item, measure(item))
    wake()
  },

  unmounted(el) {
    const item = (el as PxEl).__pxItem
    if (!item) return
    items.delete(item)
    ;(el as PxEl).__pxItem = undefined
    el.style.removeProperty('translate')
  },
}
