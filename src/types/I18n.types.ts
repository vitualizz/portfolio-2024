export type LanguagesCodes = 'en' | 'es'

export type ContactForm = {
  name_label: string
  name_placeholder: string
  email_label: string
  email_placeholder: string
  message_label: string
  message_placeholder: string
  submit: string
  submitting: string
  success: string
  error: string
}

export type WorkExperienceLocale = {
  title: string
  present: string
  show_more: string
  show_less: string
}

export type LanguageLocale = {
  nav: {
    presentation: string
    about_me: string
    projects: string
    contact_me: string
    blog: string
    work_experience: string
  },
  presentation: {
    hi: string
    i_am: string
    profession: string
    description: string
    tagline: string
    cta_primary: string
    cta_secondary: string
  },
  about_me: {
    section_about_me: string
    section_skills: string
    biography: string
    skills_section_languages: string
    skills_section_frameworks: string
    skills_section_others: string
  },
  work_experience: WorkExperienceLocale,
  projects: {
    section_projects: string
    live_preview: string
    github_label: string
    view_image: string
  },
  contact_me: {
    tell_me: string
    send_message_me: string
    resume_label: string
    form: ContactForm
  },
  footer: {
    thanks: string
  },
  blog: {
    title: string
    read_more: string
  },
  seo: {
    title: string
    description: string
    image: string
    url: string
  },
}
