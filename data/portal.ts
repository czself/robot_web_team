import type { TeamResourceCategory } from "@/data/team-directions";

export interface TeamResource {
  id: string;
  title: string;
  category: TeamResourceCategory;
  level: "入门" | "进阶" | "项目" | "规范";
  href: string;
  summary: string;
  updatedAt: number;
  source?: "custom";
}

// 默认资料已清空，所有资料均通过 /portal/admin 后台管理。
export const defaultResources: TeamResource[] = [];
