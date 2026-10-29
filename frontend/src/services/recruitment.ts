export interface ApplicationPayload {
  name: string
  studentId: string
  department: string
  major: string
  grade: string
  qq: string
  groups: string[]
  experience: string
  intro: string
}

export interface SubmitResult {
  ok: boolean
  message: string
}

/**
 * 提交体，字段名与后端 com.siersi.backend.request.sign.SignRequest 严格对应。
 *
 * 只提交用户填写的内容：id / createTime / updateTime / valid 由后端负责，
 * 前端不传，避免与后端默认值或审核逻辑冲突。
 *
 * 注意 groups 必须是**数组**：后端 SignRequest.groups 是 List<String>，
 * 由服务层自己 objectMapper.writeValueAsString 成 JSON 存进 Sign.groups(Text)。
 * 若在这里拼成 "电控,机械" 这样的字符串，Jackson 会因类型不匹配抛
 * MismatchedInputException，被全局异常处理器翻成"参数格式错误"。
 */
interface SignSubmitBody {
  name: string
  stuId: string
  department: string
  major: string
  grade: string
  qq: string
  groups: string[]
  experience: string
  intro: string
}

/**
 * 接口基地址。
 * 开发期默认走 Vite 代理（见 vite.config.ts）把 /api 转到 localhost:8080；
 * 生产部署若前后端不同源，在 .env 里设置 VITE_API_BASE 指定地址即可。
 */
const API_BASE = (import.meta.env.VITE_API_BASE ?? '/api').replace(/\/+$/, '')
const SUBMIT_URL = `${API_BASE}/sign/submit`

/** 超时保护：后端无响应时不让按钮无限转圈 */
const TIMEOUT_MS = 12000

const msg = (s: string) => s.trim()

const toBody = (p: ApplicationPayload): SignSubmitBody => ({
  name: msg(p.name),
  stuId: msg(p.studentId),
  department: msg(p.department),
  major: msg(p.major),
  grade: p.grade,
  qq: msg(p.qq),
  // 后端是 List<String>，原样传数组，不要拼接
  groups: p.groups.slice(),
  experience: msg(p.experience),
  intro: msg(p.intro),
})

/**
 * 从常见包装结构里取后端给的提示文案。
 *
 * 后端的 Bean Validation 会把多条校验失败拼成 "QQ不能为空; QQ号格式不正确"
 * （半角分号 + 空格），这里统一成中文分号，避免界面上出现夹生标点。
 */
const pickMessage = (data: unknown): string | null => {
  if (!data || typeof data !== 'object') return null
  const d = data as Record<string, unknown>
  for (const key of ['msg', 'message', 'error', 'errMsg', 'detail']) {
    const v = d[key]
    if (typeof v === 'string' && v.trim()) {
      return v
        .trim()
        .split(/\s*;\s*/)
        .filter(Boolean)
        .join('；')
    }
  }
  return null
}

/**
 * 判定业务是否成功。兼容三种常见返回：
 *   1. 裸 2xx + 空 body
 *   2. { code: 0 | 200, msg } 这类统一包装
 *   3. { success: true } / { ok: true }
 * 识别不出业务码时以 HTTP 状态码为准。
 */
const isSuccess = (data: unknown): boolean => {
  if (data === null || typeof data !== 'object') return true
  const d = data as Record<string, unknown>

  if (typeof d.success === 'boolean') return d.success
  if (typeof d.ok === 'boolean') return d.ok

  const code = d.code ?? d.status ?? d.errCode
  if (code === undefined || code === null) return true
  if (typeof code === 'number') return code === 0 || (code >= 200 && code < 300)

  const s = String(code).toUpperCase()
  return s === '0' || s === '200' || s === 'OK' || s === 'SUCCESS'
}

/**
 * 报名提交入口。
 * 页面只关心 SubmitResult，接口细节全部收在这里。
 */
export async function submitApplication(payload: ApplicationPayload): Promise<SubmitResult> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(toBody(payload)),
      signal: controller.signal,
    })

    const raw = await res.text()
    let data: unknown = null
    if (raw) {
      try {
        data = JSON.parse(raw)
      } catch {
        // 非 JSON 响应（如纯文本 ok），交给状态码判断
      }
    }

    if (!res.ok) {
      return {
        ok: false,
        message:
          pickMessage(data) ?? `提交失败（${res.status}），请稍后重试，或加入 QQ 群联系我们。`,
      }
    }

    if (!isSuccess(data)) {
      return {
        ok: false,
        message: pickMessage(data) ?? '提交未成功，请稍后重试，或加入 QQ 群联系我们。',
      }
    }

    return {
      ok: true,
      message: '报名已提交，我们会在近期通过 QQ 联系你。',
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return { ok: false, message: '请求超时，请检查网络后重试，或加入 QQ 群联系我们。' }
    }
    return { ok: false, message: '网络异常，未能连接报名服务，请稍后重试或加入 QQ 群联系我们。' }
  } finally {
    window.clearTimeout(timer)
  }
}
