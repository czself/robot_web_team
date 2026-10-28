<script setup lang="ts">
import BrandMark from '@/components/ui/BrandMark.vue'
import { links, recruitment, team } from '@/data/site'
</script>

<template>
  <footer class="ft">
    <span class="ft__bg mono" aria-hidden="true">YZ CONTROL</span>

    <div class="shell ft__inner" v-reveal>
      <div class="ft__row">
        <div class="ft__brand">
          <BrandMark compact />
          <div class="ft__slogan">
            <p class="ft__slogan-zh">{{ team.sloganZh }}</p>
            <p class="ft__slogan-en mono">{{ team.sloganEn }}</p>
          </div>
        </div>

        <nav class="ft__links">
          <a :href="links.official" target="_blank" rel="noopener">RoboMaster 官网 →</a>
          <a :href="recruitment.qqGroupUrl" target="_blank" rel="noopener">招新 QQ 群 →</a>
        </nav>
      </div>

      <div class="ft__bottom">
        <span>© 2026 {{ team.name }} · {{ team.school }}</span>
        <span class="ft__mark" aria-hidden="true"></span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ft {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  /* 上下内边距必须相等：水印与内容都按页脚盒子居中，
     一旦上下不等（之前是上 10 / 下 22），居中基准就和视觉重心错开 6px */
  padding: 16px 0;
  border-top: 1px solid var(--line-1);
  background: var(--ink-0);
}

/* 背景板：队名居中于页脚，信息浮在其上 */
.ft__bg {
  position: absolute;
  left: 0;
  right: 0;
  /* 不再压到底部，改成落在页脚的垂直中线上，上下留白才均匀 */
  top: 50%;
  /* line-height:1 时盒子高正好 1em，上移略少于半字高：
     等宽字体的大写字形视觉中心比盒子几何中心高约 0.06em，
     取 0.46em 才能让字形（而非盒子）真正居中 */
  margin-top: -0.46em;
  z-index: 0;
  text-align: center;
  font-size: clamp(30px, 8.6vw, 124px);
  line-height: 1;
  letter-spacing: 0.02em;
  /* letter-spacing 会在末字符后也留一份间距，使字形整体偏左半个间距，这里补回来 */
  padding-left: 0.02em;
  white-space: nowrap;
  color: rgba(152, 176, 202, 0.12);
  pointer-events: none;
  user-select: none;
}

.ft__inner {
  position: relative;
  z-index: 1;
}

.ft__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px 28px;
}

.ft__brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.ft__slogan-zh {
  font-size: 14px;
  letter-spacing: 0.06em;
  color: var(--tx-0);
}

.ft__slogan-en {
  margin-top: 3px;
  font-size: 9.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--tx-2);
}

.ft__links {
  display: flex;
  align-items: center;
  gap: 22px;
  font-size: 13px;
  color: var(--tx-1);
}

.ft__links a {
  transition: color 0.2s ease;
}

.ft__links a:hover {
  color: var(--rm-red);
}

.ft__bottom {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
  padding-top: 13px;
  border-top: 1px solid var(--line-1);
  font-size: 11.5px;
  color: var(--tx-2);
}

.ft__dot {
  width: 3px;
  height: 3px;
  background: var(--rm-blue);
}

.ft__mark {
  width: 46px;
  height: 3px;
  margin-left: auto;
  background: linear-gradient(
    90deg,
    var(--rm-red) 0 44%,
    transparent 44% 56%,
    var(--rm-blue) 56% 100%
  );
}

@media (max-width: 760px) {
  .ft {
    padding: 12px 0;
  }
  .ft__row {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
  .ft__links {
    gap: 18px;
    font-size: 12.5px;
  }
  .ft__bottom {
    margin-top: 20px;
    gap: 8px;
  }
  .ft__mark {
    display: none;
  }
}
</style>
