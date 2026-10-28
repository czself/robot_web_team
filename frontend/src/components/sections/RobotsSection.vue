<script setup lang="ts">
import ImageCarousel from '@/components/ui/ImageCarousel.vue'
import MechaPanel from '@/components/ui/MechaPanel.vue'
import SectionHead from '@/components/ui/SectionHead.vue'
import { robots } from '@/data/site'
</script>

<template>
  <section id="robots" class="section rb">
    <div class="shell">
      <SectionHead
        index="03"
        en="Our robots"
        zh="三台机器人，三种战场角色"
        desc="英雄负责突破，步兵负责缠斗，哨兵守在基地。每一台都是从图纸开始做出来的。"
      />

      <div class="rb__grid">
        <MechaPanel
          v-for="(r, i) in robots"
          :key="r.id"
          cut="lg"
          pad="0"
          interactive
          v-reveal="{ delay: i * 80, dir: 'zoom' }"
        >
          <article class="rb__card">
            <div class="rb__media">
              <ImageCarousel :images="r.images" :alt="r.name" />
              <span class="rb__num mono">{{ r.index }}</span>
              <span class="rb__role">{{ r.role }}</span>
            </div>

            <div class="rb__body">
              <div class="rb__title-row">
                <h3 class="rb__name">{{ r.name }}</h3>
                <span class="rb__en mono">{{ r.en }}</span>
              </div>
              <p class="rb__desc">{{ r.desc }}</p>
              <ul class="rb__tags">
                <li v-for="t in r.tags" :key="t">{{ t }}</li>
              </ul>
            </div>
          </article>
        </MechaPanel>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rb__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.rb__card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.rb__media {
  position: relative;
  aspect-ratio: 4 / 3.3;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 45%, rgba(51, 153, 204, 0.13) 0%, transparent 62%),
    var(--ink-0);
  border-bottom: 1px solid var(--line-1);
}

.rb__num {
  position: absolute;
  left: 16px;
  top: 10px;
  z-index: 4;
  font-size: 42px;
  line-height: 1;
  color: rgba(241, 245, 250, 0.13);
  transition:
    color 0.45s ease,
    transform 0.55s var(--ease-out);
}

.rb__card:hover .rb__num {
  color: rgba(255, 51, 51, 0.26);
  transform: translate3d(0, -3px, 0);
}

.rb__role {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 4;
  padding: 5px 12px;
  font-size: 11px;
  color: var(--rm-red);
  background: rgba(5, 7, 10, 0.85);
  clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%);
}

.rb__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 22px 24px 24px;
}

.rb__title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.rb__name {
  font-size: 19px;
  font-weight: 500;
  color: var(--tx-0);
}

.rb__en {
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--rm-blue);
}

.rb__desc {
  flex: 1;
  margin-top: 10px;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--tx-1);
}

.rb__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 18px;
}

.rb__tags li {
  font-size: 11px;
  color: var(--tx-2);
  padding: 3px 8px;
  box-shadow: inset 0 0 0 1px var(--line-1);
}

@media (max-width: 1024px) {
  .rb__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .rb__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
