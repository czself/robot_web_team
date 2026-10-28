<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import CursorGlow from '@/components/ui/CursorGlow.vue'
</script>

<template>
  <CursorGlow />
  <SiteHeader />

  <!-- 固定最小高度，避免 out-in 空档期页面塌陷、页脚跳一下 -->
  <div class="route-stage">
    <RouterView v-slot="{ Component, route }">
      <Transition name="route" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>

  <SiteFooter />
</template>

<style>
.route-stage {
  min-height: 100vh;
  min-height: 100svh;
}

.route-enter-active {
  transition:
    opacity 0.44s var(--ease-out),
    transform 0.44s var(--ease-out);
}

.route-leave-active {
  transition: opacity 0.2s ease;
}

.route-enter-from {
  opacity: 0;
  transform: translate3d(0, 10px, 0);
}

.route-leave-to {
  opacity: 0;
}
</style>
