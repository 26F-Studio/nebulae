import { i18nGlobal } from 'boot/i18n'

export const base64ToUuid = (base64: string) => {
  const hex = atob(base64)
    .split('')
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
  if (hex.length !== 32) {
    console.warn('Invalid UUID length', { base64, hex })
  }
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

export const hex2U8Array = (hexString: string) => {
  return new Uint8Array(
    hexString.match(/../g)?.map((hexChar) => {
      return parseInt(hexChar, 16)
    }) ?? [],
  )
}

export const i18nSubPath =
  (baseName: string) => (relativePath: string, data?: Record<string, unknown>) => {
    if (data) {
      return i18nGlobal.t(`${baseName}.${relativePath}`, data)
    } else {
      return i18nGlobal.t(`${baseName}.${relativePath}`)
    }
  }

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
