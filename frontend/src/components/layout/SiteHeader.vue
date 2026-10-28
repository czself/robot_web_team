<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from '@/components/ui/BrandMark.vue'
import MechaButton from '@/components/ui/MechaButton.vue'
import { nav, type NavItem } from '@/data/site'

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()

/* 首页用精确匹配，其余按前缀匹配（子路径也能保持高亮） */
const isActive = (item: NavItem) =>
  item.exact ? route.path === item.to : route.path.startsWith(item.to)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const close = () => {
  open.value = false
}
</script>

<template>
  <header class="hd" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <div class="hd__bar shell">
      <RouterLink to="/" class="hd__brand" aria-label="YZ Control 首页" @click="close">
        <BrandMark />
      </RouterLink>

      <nav class="hd__nav">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="hd__link"
          :class="{ 'is-active': isActive(item) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="hd__actions">
        <MechaButton to="/join" variant="red" class="hd__cta">加入我们</MechaButton>
        <button class="hd__burger" :aria-expanded="open" aria-label="菜单" @click="open = !open">
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <div class="hd__mobile">
      <div class="hd__mobile-inner">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="hd__m-link"
          :class="{ 'is-active': isActive(item) }"
          @click="close"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink to="/join" class="hd__m-link hd__m-link--accent" @click="close">
          加入我们
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hd {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid transparent;
  transition:
    background 0.35s ease,
    border-color 0.35s ease;
  animation: header-in 0.7s var(--ease-out) both;
}

@keyframes header-in {
  from {
    transform: translate3d(0, -100%, 0);
  }
  to {
    transform: none;
  }
}

.hd.is-scrolled,
.hd.is-open {
  background: rgba(5, 7, 10, 0.84);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--line-1);
}

.hd__bar {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.hd__nav {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-right: auto;
  margin-left: 30px;
}

.hd__link {
  position: relative;
  padding: 8px 14px;
  font-size: 13.5px;
  color: var(--tx-1);
  transition: color 0.2s ease;
}

.hd__link::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 3px;
  height: 1px;
  background: var(--rm-red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.42s var(--ease-out);
}

.hd__link:hover {
  color: var(--tx-0);
}

.hd__link:hover::after {
  transform: scaleX(1);
}

.hd__link.is-active {
  color: var(--tx-0);
}

.hd__link.is-active::after {
  transform: scaleX(1);
  background: var(--rm-red);
}

.hd__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 与导航项统一字体：不用按钮组件默认的等宽字 */
.hd .hd__cta {
  font-family: var(--font-display);
  font-size: 13.5px;
  letter-spacing: 0.02em;
}

.hd__burger {
  display: none;
  width: 42px;
  height: 42px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.hd__burger span {
  display: block;
  width: 20px;
  height: 1.5px;
  background: var(--tx-0);
  transition: transform 0.36s var(--ease-out);
}

.is-open .hd__burger span:first-child {
  transform: translateY(3.75px) rotate(45deg);
}

.is-open .hd__burger span:last-child {
  transform: translateY(-3.75px) rotate(-45deg);
}

.hd__mobile {
  display: none;
}

.hd__mobile-inner {
  display: flex;
  flex-direction: column;
}

.hd__m-link {
  padding: 15px 4px;
  font-size: 16px;
  color: var(--tx-1);
  border-bottom: 1px solid var(--line-1);
}

.hd__m-link.is-active {
  color: var(--rm-red);
}

.hd__m-link--accent {
  color: var(--rm-red);
  border-bottom: none;
}

@media (max-width: 900px) {
  .hd__nav {
    display: none;
  }
  .hd__burger {
    display: flex;
  }
  .hd__cta {
    display: none;
  }

  /* 展开用 grid-rows 0fr→1fr，高度可平滑过渡，不用 max-height 猜数值 */
  .hd__mobile {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    border-top: 1px solid transparent;
    transition:
      grid-template-rows 0.46s var(--ease-out),
      opacity 0.28s ease,
      border-color 0.3s ease;
  }

  .hd__mobile-inner {
    overflow: hidden;
    min-height: 0;
    padding: 8px 4vw 22px;
  }

  .is-open .hd__mobile {
    grid-template-rows: 1fr;
    opacity: 1;
    border-top-color: var(--line-1);
  }
}
</style>
