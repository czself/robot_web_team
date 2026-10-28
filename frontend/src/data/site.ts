export const team = {
  name: 'YZ Control',
  school: '豫章师范学院',
  schoolEn: 'YUZHANG NORMAL UNIVERSITY',
  sloganZh: '稳定 · 敏捷 · 尽在掌控',
  sloganEn: 'Stable. Responsive. In Control.',
  sloganShort: '尽在掌控',
  intro:
    'YZ Control 是豫章师范学院面向 RoboMaster 机甲大师系列赛组建的机器人战队，队员来自智能材料与新能源学院、小学教育学院与数学与计算机学院。',
  intro2:
    '2026 赛季，战队出战第二十五届全国大学生机器人大赛 RoboMaster 机甲大师高校联盟赛（RMUL 2026），在 3V3 对抗赛与步兵对抗赛中四个项目全部获奖。',
  departments: ['智能材料与新能源学院', '小学教育学院', '数学与计算机学院'],
  teachers: ['魏瑶琪', '刁肇石', '谢三发', '张毓敏'],
}

/* exact: true 表示只在路径完全相同时高亮（首页 '/' 是其他路径的前缀，必须精确匹配） */
export type NavItem = { label: string; to: string; exact?: boolean }

export const nav: NavItem[] = [
  { label: '首页', to: '/', exact: true },
  { label: '战队', to: '/about' },
  { label: '机器人', to: '/robots' },
  { label: '队史', to: '/history' },
  { label: '赛场', to: '/gallery' },
]

/* 首页目录：每张卡片对应一个独立页面 */
export const pages = [
  {
    index: '01',
    to: '/about',
    zh: '战队',
    en: 'ABOUT',
    desc: '三个学院、五个组别，一支从零搭起来的队伍。',
  },
  {
    index: '02',
    to: '/robots',
    zh: '机器人',
    en: 'ROBOTS',
    desc: '英雄、步兵、哨兵，三台真正上过场的机器。',
  },
  {
    index: '03',
    to: '/history',
    zh: '队史',
    en: 'HISTORY',
    desc: '2025 年 11 月建队，2026 年第一次上场。',
  },
  {
    index: '04',
    to: '/gallery',
    zh: '赛场',
    en: 'GALLERY',
    desc: '实验室、赛场与领奖台的现场记录。',
  },
  {
    index: '05',
    to: '/join',
    zh: '加入我们',
    en: 'JOIN US',
    desc: '面向全校招新，零基础也能来。',
  },
]

export type StatItem = {
  value: string
  unit: string
  label: string
  en: string
  /* 有 to 才会做数字滚动，年份这类不适合滚动的就不填 */
  to?: number
}

export const stats: StatItem[] = [
  { value: '04', unit: '项', label: '赛事奖项', en: 'AWARDS', to: 4 },
  { value: '03', unit: '台', label: '自研机器人', en: 'ROBOTS', to: 3 },
  { value: '05', unit: '个', label: '技术组别', en: 'DIVISIONS', to: 5 },
  { value: '2026', unit: '', label: '参赛赛季', en: 'SEASON' },
]

export const directions = [
  {
    index: '01',
    name: '电控',
    en: 'EMBEDDED CONTROL',
    desc: '机器人的神经系统。写嵌入式代码、调电机闭环、跑通整车通信，让它听话、跟手、不失控。',
    tags: ['STM32', 'CAN 总线', '闭环控制', 'RTOS'],
  },
  {
    index: '02',
    name: '机械',
    en: 'MECHANICAL',
    desc: '把图纸变成能上场的结构。底盘、云台、发射机构，从建模到加工装配走完全程。',
    tags: ['三维建模', 'CAD 出图', '加工装配', '结构强度'],
  },
  {
    index: '03',
    name: '算法',
    en: 'ALGORITHM',
    desc: '给机器人装眼睛和判断力。目标检测、装甲识别、自动瞄准，让它自己找到该打的地方。',
    tags: ['目标检测', '目标跟踪', '相机标定', '模型部署'],
  },
  {
    index: '04',
    name: '硬件',
    en: 'HARDWARE',
    desc: '机器人的心脏和血管。画板、配电、管功率，保证它在被撞、被压、飞坡之后还能跑。',
    tags: ['PCB 设计', '电源管理', '功率电子', 'EMC'],
  },
  {
    index: '05',
    name: '运营',
    en: 'OPERATIONS',
    desc: '让战队被看见。视觉设计、影像记录、新媒体运营与对外联络，也管队务和赛程。',
    tags: ['视觉设计', '影像剪辑', '新媒体', '外联'],
  },
]

export const robots = [
  {
    id: 'hero',
    index: '01',
    name: '英雄机器人',
    en: 'HERO',
    role: '主攻手',
    desc: '搭载大弹丸发射机构，负责正面突破与拆家，是场上火力最重的单位。',
    tags: ['大弹丸', '高功率', '云台增稳'],
    images: [
      '/images/robots/hero-1.png',
      '/images/robots/hero-2.png',
      '/images/robots/hero-3.png',
      '/images/robots/hero-4.png',
    ],
  },
  {
    id: 'infantry',
    index: '02',
    name: '步兵机器人',
    en: 'INFANTRY',
    role: '对抗核心',
    desc: '机动与射速兼备，承担游走牵制、抢点与掩护，是战线上数量最多的单位。',
    tags: ['高机动', '小弹丸', '快速响应'],
    images: [
      '/images/robots/infantry-1.png',
      '/images/robots/infantry-2.png',
      '/images/robots/infantry-3.png',
      '/images/robots/infantry-4.png',
    ],
  },
  {
    id: 'sentry',
    index: '03',
    name: '哨兵机器人',
    en: 'SENTRY',
    role: '自主防御',
    desc: '驻守基地的自动化单位，依靠视觉识别自主巡逻与拦截，守住最后一道防线。',
    tags: ['自主巡逻', '自动瞄准', '基地防御'],
    /* 注意：sentry-2.png 目前与 infantry-1.png 是同一个文件（素材拷错），
       先按四张排满，找到真正的第 2 张后直接覆盖同名文件即可，这里不用改 */
    images: [
      '/images/robots/sentry-1.png',
      '/images/robots/sentry-2.png',
      '/images/robots/sentry-3.png',
      '/images/robots/sentry-4.png',
    ],
  },
]

export const honors = [
  {
    level: '二等奖',
    group: '步兵对抗赛',
    code: 'RMUL2026BD271',
    image: '/images/awards/certificate-4.jpg',
  },
  {
    level: '三等奖',
    group: '3V3 对抗赛 · 英雄机器人组',
    code: 'RMUL2026YX271',
    image: '/images/awards/certificate-2.jpg',
  },
  {
    level: '三等奖',
    group: '3V3 对抗赛 · 步兵机器人组',
    code: 'RMUL2026BB271',
    image: '/images/awards/certificate-3.jpg',
  },
  {
    level: '优秀奖',
    group: '3V3 对抗赛 · 哨兵机器人组',
    code: 'RMUL2026SB271',
    image: '/images/awards/certificate-1.jpg',
  },
]

export const honorMeta = {
  event: '第二十五届全国大学生机器人大赛',
  league: 'RoboMaster 2026 机甲大师高校联盟赛',
  date: '2026.05',
}

/* 队史时间轴：一个年份一组事件，事件按时间先后排列 */
export type HistoryEvent = {
  date: string
  title: string
  desc: string
  tags?: string[]
  /* true 表示这个节点展开赛季奖项明细（数据取自 honors） */
  awards?: boolean
  state?: 'open'
}

export type HistoryYear = {
  year: string
  en: string
  summary: string
  events: HistoryEvent[]
}

export const history: HistoryYear[] = [
  {
    year: '2025',
    en: 'FOUNDING',
    summary: '一支从零开始的新队。',
    events: [
      {
        date: '2025.11',
        title: '战队成立',
        desc: 'YZ Control 在豫章师范学院成立，下设电控、机械、算法、硬件、运营五个技术组。第一批队员从零开始搭班底、建流程、找场地。',
        tags: ['建队', '五组设立'],
      },
    ],
  },
  {
    year: '2026',
    en: 'FIRST SEASON',
    summary: '第一次造车，第一次上场。',
    events: [
      {
        date: '2026.01 — 04',
        title: '首台车从图纸到上场',
        desc: '英雄、步兵、哨兵三台机器人走完结构设计、加工装配与整车联调，在没有现成方案可抄的情况下跑通一个完整研发周期。',
        tags: ['自主研发', '三台整车'],
      },
      {
        date: '2026.05',
        title: '首次出战 RMUL 2026',
        desc: '出战第二十五届全国大学生机器人大赛 RoboMaster 2026 机甲大师高校联盟赛，四个参赛项目全部获奖。',
        awards: true,
      },
      {
        date: '2026.10',
        title: '面向全校招新',
        desc: '五个方向同时开放报名，零基础可培养，为下一赛季补充人员。',
        state: 'open',
      },
    ],
  },
]

export const gallery = [
  { src: '/images/gallery/gallery-08.jpg', span: 'wide', alt: '赛场对抗' },
  { src: '/images/gallery/gallery-04.jpg', span: 'tall', alt: '场上交锋' },
  { src: '/images/gallery/gallery-09.jpg', span: 'normal', alt: '哨兵特写' },
  { src: '/images/gallery/gallery-10.jpg', span: 'wide', alt: '战队合影' },
  { src: '/images/gallery/gallery-05.jpg', span: 'tall', alt: '机器人待命' },
  { src: '/images/gallery/gallery-01.jpg', span: 'normal', alt: '实验室调试' },
  { src: '/images/gallery/gallery-11.jpg', span: 'normal', alt: '操作手' },
  { src: '/images/gallery/gallery-07.jpg', span: 'wide', alt: '参赛团队' },
  { src: '/images/gallery/gallery-02.jpg', span: 'normal', alt: '赛场大屏' },
  { src: '/images/gallery/gallery-06.jpg', span: 'normal', alt: '队员合影' },
  { src: '/images/gallery/gallery-03.jpg', span: 'normal', alt: '场边观赛' },
]

/* 招新开关：宣传组改这一行即可，无需改代码逻辑 */
export const recruitment = {
  open: true,
  qqGroupUrl: 'https://qm.qq.com/q/k7dwcIZ4aI',
  notes: [
    '面向全校各专业，不设专业限制',
    '零基础可培养，从工具链开始带',
    '需要能投入一个完整赛季的时间',
  ],
  groups: ['电控', '机械', '算法', '硬件', '运营'],
  experienceOptions: ['零基础', '自学过', '做过项目'],
  gradeOptions: ['2023 级', '2024 级', '2025 级', '2026 级'],
}

export const links = {
  official: 'https://www.robomaster.com/zh-CN',
}
