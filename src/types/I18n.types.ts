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
    ask_ai: string
    resume_label: string
    switch_language: string
    language_name: string
    language_option: string
  }
  home: {
    about_eyebrow: string
    about_title: string
    about_subtitle: string
    ai_eyebrow: string
    ai_title: string
    ai_subtitle: string
    projects_eyebrow: string
    projects_title: string
    projects_subtitle: string
    xp_eyebrow: string
    xp_title: string
    xp_subtitle: string
    blog_eyebrow: string
    blog_title: string
    blog_subtitle: string
    contact_title: string
    contact_subtitle: string
    contact_download_cv: string
    paused_label: string
    footer_location_line: string
    quote_text: string
    stack_legend_core: string
    stack_legend_strong: string
    stack_legend_learn: string
  }
  presentation: {
    hi: string
    i_am: string
    profession: string
    description: string
    description_ps: string
    typewriter_words: string
    tagline: string
    cta_primary: string
    cta_secondary: string
  }
  about_me: {
    section_about_me: string
    section_skills: string
    biography: string[]
    mini_note: string
    skills_section_languages: string
    skills_section_frameworks: string
    skills_section_others: string
    stat_years: string
    stat_projects: string
    stat_stack: string
    stack_footer: string
  }
  work_experience: WorkExperienceLocale
  projects: {
    section_projects: string
    live_preview: string
    github_label: string
    view_image: string
  }
  contact_me: {
    tell_me: string
    send_message_me: string
    resume_label: string
    form: ContactForm
  }
  footer: {
    thanks: string
  }
  blog: {
    title: string
    read_more: string
    read_article: string
    back_to_blog: string
    min_read: string
    see_all: string
    index_eyebrow: string
    index_title: string
    index_subtitle: string
    index_stat_posts: string
    index_stat_topics: string
    index_stat_cats: string
    filter_label: string
    filter_all: string
    filter_search_placeholder: string
    featured_label: string
    closer_title: string
    closer_text: string
    closer_github: string
    closer_contact: string
    mascot_text: string
    empty_title: string
    empty_text: string
    follow_label: string
    follow_title: string
    follow_body: string
    follow_github: string
    follow_linkedin: string
    post_nav_prev: string
    post_nav_next: string
    more_posts_eyebrow: string
    more_posts_title: string
  }
  ai: {
    greeting: string
    hint: string
    input_placeholder: string
    send_aria: string
    thinking: string
    error_fallback: string
    crash_fallback: string
    user_avatar: string
    disclaimer: string
    disclaimer_link: string
    tabs: {
      backend: string
      ai_builder: string
      postgres: string
      culture: string
    }
    tab_labels: {
      backend: string
      ai_builder: string
      postgres: string
      culture: string
    }
  }
  contact_modal: {
    close_aria: string
    eyebrow: string
    title: string
    subtitle: string
    name_label: string
    name_placeholder: string
    email_label: string
    email_placeholder: string
    message_label: string
    message_placeholder: string
    submit: string
    submitting: string
    submit_error: string
    success_title: string
    success_text: string
  }
  resume_actions: {
    preview: string
    download: string
    menu_aria: string
    preview_modal_title: string
    preview_modal_close_aria: string
    preview_modal_fallback: string
  }
  seo: {
    title: string
    description: string
    image: string
    url: string
  }
}
