import type { ExperienceEntry, ProjectEntry, SkillGroup } from '../tools/types'
import experienceData from '../../data/experience.json'
import projectsData from '../../data/projects.json'
import { skillGroups } from '../../data/skills'

export const loadExperience = (): ExperienceEntry[] =>
  experienceData as ExperienceEntry[]

export const loadProjects = (): ProjectEntry[] =>
  projectsData as ProjectEntry[]

export const loadSkills = (): SkillGroup[] =>
  skillGroups as SkillGroup[]
