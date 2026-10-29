/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 报名接口基地址，默认 /api（走 Vite 代理）；生产可指向后端绝对地址 */
  readonly VITE_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
