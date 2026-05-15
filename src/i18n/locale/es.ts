import type { LanguageLocale } from 'src/types/I18n.types'

const locale: LanguageLocale = {
  nav: {
    presentation: "Presentación",
    about_me: "Sobre mí",
    projects: "Proyectos",
    contact_me: "Contáctame",
    blog: "Blog",
    work_experience: "Experiencia"
  },
  presentation: {
    hi: "Hola, 🚀",
    i_am: "Soy <span class='font-bold'>Lee Palacios</span>",
    profession: "Ingeniero de Software y amante de los gatos 🐱",
    description: "<span class='text-color-1'>+7 años</span> de experiencia en programación, ¡soy tu aliado amante de la tecnología listo para sacudir tu mundo digital!",
    tagline: "Construyo interfaces que importan y sistemas que escalan.",
    cta_primary: "Ver mis proyectos",
    cta_secondary: "Contactarme"
  },
  about_me: {
    section_about_me: "Acerca de mí",
    section_skills: "Habilidades",
    biography: "Soy un <span class='text-color-2'>ingeniero de software</span>, adentrándome en un emocionante universo <span class='text-color-2'>tecnológico</span> donde cada línea de código es un trazo de creatividad. Mi corazón late al ritmo de <span class='text-color-1'>Javascript</span> y <span class='text-color-1'>Ruby</span>, pero mi curiosidad me ha llevado a explorar un arcoíris de lenguajes. En cada proyecto, busco la excelencia y <span class='text-color-2'>calidad</span>, convirtiendo el proceso de codificación en una aventura <span class='text-color-2'>emocionante</span> y <span class='text-color-2'>gratificante</span>.",
    skills_section_frameworks: "Frameworks y Bibliotecas",
    skills_section_others: "Otros",
    skills_section_languages: "Lenguajes"
  },
  work_experience: {
    title: "Experiencia",
    present: "Actualidad",
    show_more: "Ver más",
    show_less: "Ver menos"
  },
  projects: {
    section_projects: "Proyectos",
    live_preview: "Ver sitio",
    github_label: "Ver código",
    view_image: "Ver imagen"
  },
  contact_me: {
    tell_me: "Hablemos</br>Cuéntame sobre tu Proyecto",
    send_message_me: "Envíame un mensaje ✨",
    resume_label: "Curriculum",
    form: {
      name_label: "Nombre",
      name_placeholder: "Tu nombre",
      email_label: "Email",
      email_placeholder: "tu@email.com",
      message_label: "Mensaje",
      message_placeholder: "¿En qué puedo ayudarte?",
      submit: "Enviar mensaje",
      submitting: "Enviando...",
      success: "¡Mensaje enviado! Me pondré en contacto pronto.",
      error: "Error al enviar. Intentá de nuevo."
    }
  },
  footer: {
    thanks: "Con amor @vitualizz"
  },
  blog: {
    title: 'Últimos Posts',
    read_more: 'Leer más'
  },
  seo: {
    title: "Desarrollador de Software | Experiencia en JavaScript y Ruby | Proyectos de Calidad | Contáctame",
    description: "¡Con más de 7 años de experiencia en programación, soy un ingeniero de software apasionado por la tecnología! Trabajo con JavaScript, Ruby y más. ¡Contáctame para proyectos de calidad!",
    image: "/img/seo/og-image.png",
    url: "https://vitualizz.vercel.app/es"
  }
}

export default locale
