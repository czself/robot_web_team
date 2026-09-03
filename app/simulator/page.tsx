import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, Cpu, Target, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "3v3 机甲模拟器",
  description:
    "在浏览器中体验 RMUL2026 3V3 机甲大师高校联盟赛：组装英雄、步兵、哨兵，进入实时对战仿真。",
  openGraph: {
    title: "3v3 机甲模拟器 · YZ Control",
    description: "组装模块、配置战术、在浏览器中运行 3V3 对战仿真。",
    url: "/simulator",
  },
};

const features = [
  {
    icon: Cpu,
    title: "机体组装",
    desc: "为英雄、步兵、哨兵选择底盘、枪管、装甲与模块，实时校验功率、高度与属性。",
  },
  {
    icon: Target,
    title: "实时对战",
    desc: "WASD 操控移动，鼠标瞄准射击，体验弹道、受击、过热、补弹与复活机制。",
  },
  {
    icon: Shield,
    title: "哨兵编程",
    desc: "为哨兵编写预设程序或使用内置战术：前线防御、补给区巡逻、控制区压制。",
  },
  {
    icon: Zap,
    title: "战术博弈",
    desc: "争夺中心控制区、管理金币经济、在 5 分钟内击垮对方胜利点。",
  },
];

export default function SimulatorPage() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <section className="relative max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rm-blue/30 bg-rm-blue/10 text-rm-blue text-sm mb-6">
          <Gamepad2 className="h-4 w-4" />
          <span>浏览器端仿真</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          RMUL2026{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rm-red to-rm-blue">
            3V3 机甲模拟器
          </span>
        </h1>
        <p className="text-lg text-rm-gray max-w-2xl mx-auto mb-10">
          无需安装任何软件，在浏览器中完成机体组装并进入 3V3 实时对战仿真。
          适合用于理解机器人配置、弹道机制与基础战术决策。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/simulator.html"
            className="inline-flex items-center gap-2 px-8 py-4 bg-rm-red hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Gamepad2 className="h-5 w-5" />
            启动模拟器
          </Link>
          <a
            href="https://www.robomaster.com/zh-CN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-rm-blue/50 text-white font-semibold rounded-lg transition-colors"
          >
            了解 RoboMaster ↗
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-rm-blue/10 flex items-center justify-center text-rm-blue mb-4">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-rm-gray leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03]">
          <h2 className="text-xl font-semibold mb-4">操作说明</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-rm-gray">
            <div>
              <strong className="text-white">移动与选择</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>WASD：移动当前选中机器人</li>
                <li>鼠标左键：选中己方机器人 / 瞄准射击</li>
                <li>空格键：在英雄与步兵之间切换</li>
              </ul>
            </div>
            <div>
              <strong className="text-white">战斗与策略</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Q：切换自转模式</li>
                <li>R：在己方补给区购买弹药</li>
                <li>哨兵仅由预设程序控制，可自定义逻辑</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
