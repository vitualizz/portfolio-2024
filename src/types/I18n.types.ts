export type LanguagesCodes = 'en' | 'es'

export type LanguageLocale = {
  nav: {
    presentation: string
    about_me: string
    projects: string
    contact_me: string
    blog: string
  },
  presentation: {
    description: string
  },
  about_me: {
    section_about_me: string
    section_skills: string
    biography: string
    skills_section_languages: string
    skills_section_frameworks: string
    skills_section_others: string
  },
  projects: {
    section_projects: string
  },
  contact_me: {
    tell_me: string
    send_message_me: string
  },
  footer: {
    thanks: string
  },
  blog: {
    title: string
  },
  seo: {
    title: string
    description: string
    image: string
    url: string
  },
}