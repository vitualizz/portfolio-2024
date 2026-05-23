const ALLOWED_TAGS = new Set(['span', 'em', 'strong', 'b', 'br'])
const ALLOWED_CLASSES = new Set([
  'hl',
  'hl-soft',
  'hl-title',
  'text-ink',
  'text-white',
  'text-mint',
  'not-italic',
  'text-nowrap'
])

function sanitizeClasses(rawClass: string | undefined): string {
  if (!rawClass) return ''

  const valid = rawClass
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => ALLOWED_CLASSES.has(token))

  if (valid.length > 0) return valid.join(' ')

  return 'hl'
}

export function safeI18nHtml(input: string): string {
  if (!input) return ''

  const withoutDangerousBlocks = input
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
    .replace(/<\s*style[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi, '')

  return withoutDangerousBlocks.replace(
    /<\/?([a-z0-9-]+)([^>]*)>/gi,
    (full, rawTag, rawAttrs) => {
      const tag = String(rawTag).toLowerCase()
      const isClosingTag = full.startsWith('</')

      if (!ALLOWED_TAGS.has(tag)) return ''

      if (isClosingTag) {
        if (tag === 'br') return ''
        return `</${tag}>`
      }

      if (tag === 'br') return '<br/>'

      const classMatch = String(rawAttrs || '').match(
        /\bclass\s*=\s*(['"])(.*?)\1/i
      )
      const safeClass = sanitizeClasses(classMatch?.[2])

      return safeClass ? `<${tag} class="${safeClass}">` : `<${tag}>`
    }
  )
}
