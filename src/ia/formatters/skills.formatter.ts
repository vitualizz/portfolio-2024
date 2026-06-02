import type { SkillGroup } from '../tools/types'

export const formatSkills = (groups: SkillGroup[]): string =>
  groups
    .map((g) => {
      const items = g.items
        .map((i) => (typeof i === 'string' ? i : i.label))
        .join(', ')
      return `${g.label}: ${items}`
    })
    .join('\n')
