<script setup lang="ts">
import { reactive, ref } from 'vue'
import MechaButton from '@/components/ui/MechaButton.vue'
import SectionHead from '@/components/ui/SectionHead.vue'
import { recruitment } from '@/data/site'
import { submitApplication, type ApplicationPayload } from '@/services/recruitment'

const form = reactive<ApplicationPayload>({
  name: '',
  studentId: '',
  department: '',
  major: '',
  grade: '',
  qq: '',
  groups: [],
  experience: '',
  intro: '',
})

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const notice = ref<{ ok: boolean; message: string } | null>(null)

/* 与后端 SignRequest 的 @Size(max = 5) 对齐 */
const MAX_GROUPS = 5

const toggleGroup = (group: string) => {
  const i = form.groups.indexOf(group)
  if (i >= 0) {
    form.groups.splice(i, 1)
  } else if (form.groups.length >= MAX_GROUPS) {
    // 组别数量到顶，先提示再放弃本次选中，不做静默忽略
    errors.groups = `组别最多选择 ${MAX_GROUPS} 个`
    return
  } else {
    form.groups.push(group)
  }
  if (errors.groups) delete errors.groups
}

const validate = () => {
  ;['name', 'studentId', 'department', 'major', 'grade', 'qq', 'groups'].forEach((k) => delete errors[k])
  if (!form.name.trim()) errors.name = '请填写姓名'
  if (!form.studentId.trim()) errors.studentId = '请填写学号'
  // 后端收紧为 ^\d{10}$，这里必须一致，否则 user 能提交出去再被退回
  else if (!/^\d{10}$/.test(form.studentId.trim())) errors.studentId = '学号应为 10 位数字'
  if (!form.department.trim()) errors.department = '请填写所在学院'
  if (!form.major.trim()) errors.major = '请填写专业'
  if (!form.grade) errors.grade = '请选择年级'
  // 与后端 SignRequest 的 QQ 校验保持一致：5–12 位数字，且首位不能为 0
  if (!form.qq.trim()) errors.qq = '请填写 QQ 号'
  else if (!/^[1-9]\d{4,11}$/.test(form.qq.trim())) errors.qq = 'QQ 号应为 5–12 位数字'
  if (form.groups.length === 0) errors.groups = '请至少选择一个组别'
  else if (form.groups.length > MAX_GROUPS) errors.groups = `组别最多选择 ${MAX_GROUPS} 个`
  return Object.keys(errors).length === 0
}

const onSubmit = async () => {
  notice.value = null
  if (!validate()) return
  submitting.value = true
  try {
    const result = await submitApplication({ ...form })
    notice.value = result
    // 提交成功后清空，避免同一份信息被重复提交
    if (result.ok) resetForm()
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  form.name = ''
  form.studentId = ''
  form.department = ''
  form.major = ''
  form.grade = ''
  form.qq = ''
  form.groups = []
  form.experience = ''
  form.intro = ''
  Object.keys(errors).forEach((k) => delete errors[k])
}
</script>

<template>
  <section id="join" class="section join">
    <div class="shell">
      <SectionHead
        index="06"
        en="Apply"
        zh="加入我们"
        desc="不需要你先会做机器人，只需要你愿意学。填完这张表，我们会主动联系你。"
      />

      <div class="join__grid">
        <div class="join__form-wrap">
          <template v-if="recruitment.open">
            <form class="join__form" novalidate @submit.prevent="onSubmit">
              <div class="join__row">
                <label class="field">
                  <span class="field__label">姓名 <i>*</i></span>
                  <input
                    v-model="form.name"
                    class="field__input cut-a"
                    type="text"
                    maxlength="32"
                    placeholder="你的姓名"
                    :aria-invalid="!!errors.name"
                  />
                  <span v-if="errors.name" class="field__error">{{ errors.name }}</span>
                </label>

                <label class="field">
                  <span class="field__label">学号 <i>*</i></span>
                  <input
                    v-model="form.studentId"
                    class="field__input cut-a"
                    type="text"
                    inputmode="numeric"
                    maxlength="10"
                    placeholder="10 位学号"
                    :aria-invalid="!!errors.studentId"
                  />
                  <span v-if="errors.studentId" class="field__error">{{ errors.studentId }}</span>
                </label>
              </div>

              <div class="join__row">
                <label class="field">
                  <span class="field__label">学院 <i>*</i></span>
                  <input
                    v-model="form.department"
                    class="field__input cut-a"
                    type="text"
                    maxlength="64"
                    placeholder="填写所在学院全称"
                    :aria-invalid="!!errors.department"
                  />
                  <span v-if="errors.department" class="field__error">{{ errors.department }}</span>
                </label>

                <label class="field">
                  <span class="field__label">年级 <i>*</i></span>
                  <select
                    v-model="form.grade"
                    class="field__input field__select cut-a"
                    :aria-invalid="!!errors.grade"
                  >
                    <option value="" disabled>请选择年级</option>
                    <option v-for="g in recruitment.gradeOptions" :key="g" :value="g">{{ g }}</option>
                  </select>
                  <span v-if="errors.grade" class="field__error">{{ errors.grade }}</span>
                </label>
              </div>

              <label class="field">
                <span class="field__label">专业 <i>*</i></span>
                <input
                  v-model="form.major"
                  class="field__input cut-a"
                  type="text"
                  maxlength="64"
                  placeholder="如：软件工程"
                  :aria-invalid="!!errors.major"
                />
                <span v-if="errors.major" class="field__error">{{ errors.major }}</span>
              </label>

              <label class="field">
                <span class="field__label">QQ <i>*</i></span>
                <input
                  v-model="form.qq"
                  class="field__input cut-a"
                  type="text"
                  inputmode="numeric"
                  maxlength="12"
                  placeholder="我们通过这个联系你"
                  :aria-invalid="!!errors.qq"
                />
                <span v-if="errors.qq" class="field__error">{{ errors.qq }}</span>
              </label>

              <div class="field">
                <span class="field__label">意向组别 <i>*</i>（可多选，最多 {{ MAX_GROUPS }} 个）</span>
                <div class="chips">
                  <button
                    v-for="g in recruitment.groups"
                    :key="g"
                    type="button"
                    class="chip cut-a"
                    :class="{ 'is-on': form.groups.includes(g) }"
                    :aria-pressed="form.groups.includes(g)"
                    @click="toggleGroup(g)"
                  >
                    {{ g }}
                  </button>
                </div>
                <span v-if="errors.groups" class="field__error">{{ errors.groups }}</span>
              </div>

              <div class="field">
                <span class="field__label">现有基础</span>
                <div class="chips">
                  <button
                    v-for="e in recruitment.experienceOptions"
                    :key="e"
                    type="button"
                    class="chip chip--blue cut-a"
                    :class="{ 'is-on': form.experience === e }"
                    :aria-pressed="form.experience === e"
                    @click="form.experience = form.experience === e ? '' : e"
                  >
                    {{ e }}
                  </button>
                </div>
              </div>

              <label class="field">
                <span class="field__head">
                  <span class="field__label">自我介绍 / 作品链接</span>
                  <span class="field__count" :class="{ 'is-near': form.intro.length > 450 }">
                    {{ form.intro.length }} / 500
                  </span>
                </span>
                <textarea
                  v-model="form.intro"
                  class="field__input field__textarea cut-a"
                  rows="4"
                  maxlength="500"
                  placeholder="做过什么、想做什么都行，没有也可以不填"
                ></textarea>
              </label>

              <div class="join__submit">
                <MechaButton type="submit" variant="red" size="lg" :disabled="submitting">
                  {{ submitting ? '提交中' : '提交报名' }}
                </MechaButton>
                <p class="join__privacy">信息仅用于本次招新联系，不作他用。</p>
              </div>

              <p v-if="notice" class="notice" :class="notice.ok ? 'notice--ok' : 'notice--warn'" role="status">
                {{ notice.message }}
              </p>
            </form>
          </template>

          <div v-else class="join__closed cut-a">
            <span class="join__closed-label mono">CHANNEL CLOSED</span>
            <p class="join__closed-title">报名通道暂未开启</p>
            <p class="join__closed-desc">开启后会在这里公布，也可以先加 QQ 群，后续安排会在群里通知。</p>
            <MechaButton :href="recruitment.qqGroupUrl" variant="ghost" external class="join__closed-btn">
              先加入 QQ 群
            </MechaButton>
          </div>
        </div>

        <aside class="join__aside" v-reveal="100">
          <div class="join__group-card cut-a">
            <span class="join__group-label mono">JOIN CHAT</span>
            <p class="join__group-title">招新 QQ 群</p>
            <p class="join__group-desc">点击后在 QQ 内打开入群页，后续通知都在群里发布。</p>
            <MechaButton
              :href="recruitment.qqGroupUrl"
              variant="blue"
              external
              class="join__group-btn"
            >
              点击加入招新群
            </MechaButton>
            <p class="join__group-hint mono">QM.QQ.COM / GROUP INVITE</p>
          </div>

          <ul class="join__notes">
            <li v-for="n in recruitment.notes" :key="n">{{ n }}</li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.join__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: clamp(28px, 4vw, 56px);
  align-items: start;
}

.join__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.join__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.field__label {
  font-size: 12.5px;
  letter-spacing: 0.04em;
  color: var(--tx-1);
}

/* 标签行：左侧说明 + 右侧字数计数 */
.field__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.field__count {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--tx-2);
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease;
}

/* 接近上限时转红，提示还能写多少 */
.field__count.is-near {
  color: var(--rm-red);
}

.field__label i {
  font-style: normal;
  color: var(--rm-red);
}

.field__input {
  --cut: 9px;
  width: 100%;
  padding: 13px 16px;
  font-size: 15px;
  color: var(--tx-0);
  background: var(--ink-1);
  box-shadow: inset 0 0 0 1px var(--line-1);
  outline: none;
  transition:
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.field__input::placeholder {
  color: #5f6b7a;
}

/* 下拉框：去掉系统箭头，用两道斜线拼一个细三角，与机甲边框的直角语言一致 */
.field__select {
  appearance: none;
  padding-right: 38px;
  background-image:
    linear-gradient(45deg, transparent 50%, var(--tx-1) 50%),
    linear-gradient(135deg, var(--tx-1) 50%, transparent 50%);
  background-position:
    calc(100% - 20px) calc(50% + 1px),
    calc(100% - 15px) calc(50% + 1px);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  color-scheme: dark;
  cursor: pointer;
}

.field__select option {
  background: #0d131b;
  color: var(--tx-0);
}

.field__input:focus {
  background: var(--ink-2);
  box-shadow: inset 0 0 0 1px var(--rm-red);
}

.field__input[aria-invalid='true'] {
  box-shadow: inset 0 0 0 1px rgba(255, 51, 51, 0.7);
}

.field__textarea {
  resize: vertical;
  min-height: 96px;
  line-height: 1.7;
}

.field__error {
  font-size: 12.5px;
  color: #ff6b6b;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  --cut: 8px;
  padding: 10px 18px;
  font-size: 14px;
  color: var(--tx-1);
  background: var(--ink-1);
  box-shadow: inset 0 0 0 1px var(--line-1);
  transition:
    color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.chip:hover {
  color: var(--tx-0);
  box-shadow: inset 0 0 0 1px var(--line-3);
}

.chip.is-on {
  color: #fff;
  background: var(--rm-red-soft);
  box-shadow: inset 0 0 0 1px var(--rm-red);
}

.chip--blue.is-on {
  background: var(--rm-blue-soft);
  box-shadow: inset 0 0 0 1px var(--rm-blue);
}

.join__submit {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.join__privacy {
  font-size: 12px;
  color: var(--tx-2);
}

.notice {
  padding: 12px 16px;
  font-size: 13.5px;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
}

.notice--warn {
  color: #ffb4b4;
  background: rgba(255, 51, 51, 0.08);
  box-shadow: inset 0 0 0 1px rgba(255, 51, 51, 0.3);
}

.notice--ok {
  color: #9fe0c4;
  background: rgba(46, 213, 115, 0.08);
  box-shadow: inset 0 0 0 1px rgba(46, 213, 115, 0.28);
}

.join__closed {
  --cut: 18px;
  padding: 44px 36px;
  background: var(--ink-1);
  box-shadow: inset 0 0 0 1px var(--line-1);
}

.join__closed-label {
  font-size: 9.5px;
  letter-spacing: 0.22em;
  color: var(--rm-red);
}

.join__closed-title {
  margin-top: 14px;
  font-size: 22px;
  font-weight: 500;
}

.join__closed-desc {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--tx-1);
  max-width: 480px;
}

.join__closed-btn {
  margin-top: 22px;
}

.join__aside {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.join__group-card {
  --cut: 18px;
  position: relative;
  padding: 26px 24px 22px;
  background: var(--ink-1);
  box-shadow: inset 0 0 0 1px var(--line-2);
  display: flex;
  flex-direction: column;
}

.join__group-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 2px;
  background: var(--rm-red);
}

.join__group-label {
  font-size: 9.5px;
  letter-spacing: 0.24em;
  color: var(--rm-blue);
}

.join__group-title {
  margin-top: 12px;
  font-size: 21px;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.join__group-desc {
  margin-top: 10px;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--tx-2);
}

.join__group-btn {
  width: 100%;
  justify-content: center;
  margin-top: 20px;
}

.join__group-hint {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--line-1);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: #3f4854;
}

.join__notes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 4px;
}

.join__notes li {
  position: relative;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.7;
  color: var(--tx-1);
}

.join__notes li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 6px;
  height: 1px;
  background: var(--rm-blue);
}

@media (max-width: 900px) {
  .join__grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .join__aside {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .join__group-card {
    flex: 0 0 260px;
  }
  .join__notes {
    flex: 1;
    min-width: 200px;
  }
}

@media (max-width: 560px) {
  .join__row {
    grid-template-columns: minmax(0, 1fr);
  }
  .join__group-card {
    flex: 1 1 100%;
  }
}
</style>
