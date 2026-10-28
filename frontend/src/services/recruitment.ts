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
 * 报名提交入口。
 *
 * 后端就绪后，只需替换本函数内部实现（如 POST /api/apply），
 * 页面与表单逻辑无需改动。
 */
export async function submitApplication(_payload: ApplicationPayload): Promise<SubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return {
    ok: false,
    message: '报名通道尚未接入后台，请先加入 QQ 群联系战队。',
  }
}
