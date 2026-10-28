<script setup lang="ts">
defineProps<{ compact?: boolean }>()
</script>

<template>
  <span class="bm">
    <span class="bm__plate">
      <img src="/images/logo-icon.png" alt="YZ Control 队徽" width="128" height="128" />
    </span>
    <span v-if="!compact" class="bm__text">
      <span class="bm__name">YZ CONTROL</span>
      <span class="bm__sub">豫章师范学院</span>
    </span>
  </span>
</template>

<style scoped>
.bm {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.bm__plate {
  position: relative;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: none;
}

.bm__plate img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* 队徽自带白色描边，深底上不需要额外底板 */
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.55));
}

.bm__text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}

.bm__name {
  font-family: var(--font-mono);
  font-size: 12.5px;
  letter-spacing: 0.16em;
  color: var(--tx-0);
}

.bm__sub {
  font-size: 10.5px;
  color: var(--tx-2);
}
</style>
