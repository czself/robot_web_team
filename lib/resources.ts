import "server-only";

import { kv } from "@/lib/kv";
import { type TeamResource } from "@/data/portal";
import {
  isResourceCategory,
  normalizeResourceCategory,
} from "@/data/team-directions";

const RESOURCES_KEY = "team:resources";
const RESOURCE_PREFIX = "team:resource:";

let seeded = false;

const SEED_RESOURCES: Omit<TeamResource, "id" | "updatedAt">[] = [
  {
    title: "STM32 全栈修炼手册",
    category: "电控",
    level: "进阶",
    href: "https://github.com/czself/stm_regis_hal",
    summary: "62 课 STM32F103 寄存器+HAL 双轨教程，从点灯到 FreeRTOS，含完整源码。",
  },
];

function resourceKey(id: string): string {
  return `${RESOURCE_PREFIX}${id}`;
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function isSafeHref(href: string): boolean {
  if (href.startsWith("/")) return !href.startsWith("//");
  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

async function seedResourcesIfEmpty(): Promise<void> {
  if (seeded) return;
  seeded = true;
  const ids = await kv.lrange(RESOURCES_KEY, 0, -1);
  if (ids.length) return;
  for (const resource of SEED_RESOURCES) {
    await createResource(resource);
  }
}

export async function listResources(): Promise<TeamResource[]> {
  const ids = await kv.lrange(RESOURCES_KEY, 0, -1);
  if (!ids.length && !seeded) {
    await seedResourcesIfEmpty();
    return listResources();
  }

  const resources: TeamResource[] = ids.length
    ? ((await kv.mget(...ids.map((id: string) => resourceKey(id)))) as Array<TeamResource | null>)
        .filter((resource): resource is TeamResource => Boolean(resource))
    : [];

  return resources
    .map((resource) => ({
      ...resource,
      category: normalizeResourceCategory(String(resource.category)),
      source: "custom" as const,
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function validateResourceInput(input: unknown):
  | Omit<TeamResource, "id" | "updatedAt">
  | string {
  if (!input || typeof input !== "object") return "请求体无效";
  const b = input as Record<string, unknown>;
  const title = String(b.title ?? "").trim();
  const category = String(b.category ?? "").trim() as TeamResource["category"];
  const level = String(b.level ?? "").trim() as TeamResource["level"];
  const href = String(b.href ?? "").trim();
  const summary = String(b.summary ?? "").trim();

  if (!title || title.length > 48) return "标题必填（最多 48 字）";
  if (!isResourceCategory(category)) return "分类无效";
  if (!["入门", "进阶", "项目", "规范"].includes(level)) return "等级无效";
  if (!href || href.length > 240) return "链接必填（最多 240 字）";
  if (!isSafeHref(href)) return "链接只支持站内路径或 http(s) 地址";
  if (!summary || summary.length > 160) return "简介必填（最多 160 字）";

  return { title, category, level, href, summary };
}

export async function createResource(input: Omit<TeamResource, "id" | "updatedAt">): Promise<TeamResource> {
  const resource: TeamResource = {
    ...input,
    id: `${Date.now().toString(36)}-${slugify(input.title) || "resource"}`,
    updatedAt: Date.now(),
  };

  await kv.set(resourceKey(resource.id), resource);
  await kv.lpush(RESOURCES_KEY, resource.id);
  return { ...resource, source: "custom" };
}

export async function updateResource(
  id: string,
  input: Omit<TeamResource, "id" | "updatedAt" | "source">
): Promise<TeamResource> {
  const existing = (await kv.get(resourceKey(id))) as TeamResource | null;
  if (!existing) throw new Error("资料不存在");

  const resource: TeamResource = {
    ...existing,
    ...input,
    id,
    updatedAt: Date.now(),
  };
  await kv.set(resourceKey(id), resource);
  return { ...resource, source: "custom" };
}

export async function deleteResource(id: string): Promise<{ deleted: boolean }> {
  const existing = await kv.get(resourceKey(id));
  if (!existing) return { deleted: false };
  await kv.del(resourceKey(id));
  await kv.lrem(RESOURCES_KEY, 0, id);
  return { deleted: true };
}
