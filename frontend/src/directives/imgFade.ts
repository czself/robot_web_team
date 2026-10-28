import type { Directive } from 'vue'

/*
 * v-img-fade —— 图片解码完成后淡入，避免懒加载图片硬切出现
 * 已缓存/秒开的图片直接上屏，不播动画
 */
export const imgFade: Directive<HTMLImageElement> = {
  mounted(el) {
    if (el.complete && el.naturalWidth > 0) return

    el.classList.add('img-fade')
    el.addEventListener(
      'load',
      () => {
        el.classList.add('is-loaded')
        /* 过渡结束后摘掉类，避免长期保留过渡属性影响 hover 表现 */
        window.setTimeout(() => el.classList.remove('img-fade', 'is-loaded'), 900)
      },
      { once: true },
    )
  },
}
