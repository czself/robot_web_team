<script setup lang="ts">
import MechaPanel from '@/components/ui/MechaPanel.vue'
import SectionHead from '@/components/ui/SectionHead.vue'
import { team } from '@/data/site'

const principles = [
  {
    index: '01',
    title: '以赛促学',
    desc: '课题不是课程作业，是规则书里必须解决的问题。每一版迭代都要能上场。',
  },
  {
    index: '02',
    title: '跨院协作',
    desc: '三个学院、五个组别共用一张进度表，接口对不上就一起返工。',
  },
  {
    index: '03',
    title: '技术传承',
    desc: '经验留档、代码与图纸可查，让下一届不必从零开始。',
  },
]
</script>

<template>
  <section id="about" class="section about">
    <div class="shell">
      <SectionHead
        index="01"
        en="About the team"
        zh="一支从零搭起来的战队"
        desc="我们没有现成的实验室积累，靠的是一届届队员把图纸、代码和赛场经验攒下来。"
      />

      <div class="about__grid">
        <div class="about__copy" v-reveal="{ dir: 'left' }">
          <p class="about__lead">{{ team.intro }}</p>
          <p class="about__text">{{ team.intro2 }}</p>

          <div class="about__block">
            <span class="about__label mono">FACULTIES / 03</span>
            <ul class="about__chips">
              <li v-for="d in team.departments" :key="d" class="about__chip cut-a">{{ d }}</li>
            </ul>
          </div>

          <div class="about__block">
            <span class="about__label mono">ADVISORS</span>
            <p class="about__teachers">
              <span class="about__teachers-key">指导老师</span>
              <span v-for="(t, i) in team.teachers" :key="t">
                {{ t }}<i v-if="i < team.teachers.length - 1"> · </i>
              </span>
            </p>
          </div>
        </div>

        <div class="about__principles" v-parallax="{ speed: -0.035, clamp: 28 }">
          <MechaPanel
            v-for="(p, i) in principles"
            :key="p.index"
            pad="24px 26px"
            interactive
            v-reveal="{ delay: i * 80, dir: 'right' }"
          >
            <div class="principle">
              <span class="principle__index mono">{{ p.index }}</span>
              <div>
                <h3 class="principle__title">{{ p.title }}</h3>
                <p class="principle__desc">{{ p.desc }}</p>
              </div>
            </div>
          </MechaPanel>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}

.about__lead {
  font-size: clamp(17px, 1.5vw, 19px);
  line-height: 1.85;
  color: var(--tx-0);
}

.about__text {
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.9;
  color: var(--tx-1);
}

.about__block {
  margin-top: 36px;
  padding-top: 22px;
  border-top: 1px solid var(--line-1);
}

.about__label {
  display: block;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: var(--tx-2);
  margin-bottom: 14px;
}

.about__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.about__chip {
  --cut: 8px;
  padding: 8px 14px;
  font-size: 13px;
  color: var(--tx-1);
  background: var(--ink-2);
  box-shadow: inset 0 0 0 1px var(--line-1);
}

.about__teachers {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 15px;
  color: var(--tx-0);
}

.about__teachers-key {
  font-size: 12.5px;
  color: var(--tx-2);
  margin-right: 8px;
}

.about__teachers i {
  font-style: normal;
  color: var(--line-3);
}

.about__principles {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.principle {
  display: flex;
  gap: 18px;
}

.principle__index {
  font-size: 12px;
  color: var(--rm-red);
  padding-top: 4px;
}

.principle__title {
  font-size: 17px;
  font-weight: 500;
  color: var(--tx-0);
}

.principle__desc {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--tx-1);
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
