import { describe, it, expect } from 'vitest'
import { normalize } from '../utils/normalize'

describe('normalize', () => {
  it('removes diacritics and lowercases', () => {
    expect(normalize('  Héllo Wörld  ')).toBe('hello world')
  })

  it('already clean string passes through unchanged', () => {
    expect(normalize('react')).toBe('react')
  })

  it('empty string returns empty string', () => {
    expect(normalize('')).toBe('')
  })
})
