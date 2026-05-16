import type { LanguageLocale } from 'src/types/I18n.types'

const locale: LanguageLocale = {
  nav: {
    presentation: "Presentación",
    about_me: "Sobre mí",
    projects: "Proyectos",
    contact_me: "Contáctame",
    blog: "Blog",
    work_experience: "Experiencia",
    ask_ai: "Pregúntale",
    resume_label: "Currículum",
    switch_language: "Cambiar idioma",
    language_name: "Español",
    language_option: "Cambiar a {language}"
  },
  home: {
    about_eyebrow: "// 01 · Sobre mí",
    about_title: "Acerca de <span class='y'>mí</span>",
    about_subtitle: "El humano detrás del código — qué me mueve, qué hago, y qué tengo en la caja de herramientas.",
    ai_eyebrow: "// 02 · Lab",
    ai_title: "Pregúntale a Lee <span class='y'>↳ vía IA</span>",
    ai_subtitle: "Una IA entrenada con mi CV, stacks y proyectos. Hazle preguntas técnicas, sobre mi experiencia, o lo que sea.",
    projects_eyebrow: "// 03 · Proyectos",
    projects_title: "Trabajo <span class='y'>seleccionado</span>",
    projects_subtitle: "Trabajo enviado a producción. Click para ver demo o código.",
    xp_eyebrow: "// 04 · Experiencia",
    xp_title: "Mi <span class='y'>recorrido</span>",
    xp_subtitle: "Cuatro paradas profesionales, una constante: producto que se envía.",
    blog_eyebrow: "// 05 · Notas",
    blog_title: "Lo que <span class='y'>escribo</span>",
    blog_subtitle: "Notas técnicas sobre lo que voy aprendiendo.",
    contact_title: "Hablemos<br/>Cuéntame sobre tu <em class='not-italic text-accent'>Proyecto</em> ✨",
    contact_subtitle: "Si tienes una idea que necesita manos expertas — código limpio, escalable y enviado a tiempo — me encantaría escucharte. Respondo en menos de 24 horas hábiles.",
    contact_download_cv: "Descargar CV",
    paused_label: "pausado",
    footer_location_line: "Lima · UTC −5 · ES / EN"
  },
  presentation: {
    hi: "Hola, 🚀",
    i_am: "Soy <span class='font-bold'>Lee Palacios</span>",
    profession: "Ingeniero de Software y amante de los gatos 🐱",
    description: "<span class='text-color-1'>+7 años</span> de experiencia construyendo producto en startups latinoamericanas. Hoy soy <strong>founder de Inmology</strong>, diseñando agentes de IA que automatizan operaciones inmobiliarias. ¡Listo para sacudir tu mundo digital!",
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
    skills_section_languages: "Lenguajes",
    stat_years: "Años de exp.",
    stat_projects: "Proyectos",
    stat_stack: "Full Stack"
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
    read_more: 'Leer más',
    read_article: 'Leer artículo'
  },
  ai: {
    greeting: "¡Hola! Soy una versión IA de Lee. Pregúntame sobre <b>backend</b>, <b>arquitectura</b>, <b>AI agents</b>, <b>Postgres</b>, mis proyectos, o por qué tengo 3 gatos 🐱. Lo que quieras.",
    hint: "Tip: prueba un atajo arriba ↑ o escribe tu propia pregunta abajo ↓",
    input_placeholder: "Escribe tu pregunta para Lee...",
    send_aria: "Enviar",
    thinking: "pensando...",
    error_fallback: "No pude procesar tu pregunta. Intenta de nuevo.",
    crash_fallback: "Ups, algo se cayó. Escríbeme directo por el formulario de contacto.",
    user_avatar: "TÚ",
    tabs: {
      backend: "¿Cuál ha sido tu proyecto backend más complejo y qué aprendiste de él?",
      ai_builder: "Cuéntame sobre tu experiencia construyendo con LLMs y agentes de IA. ¿Qué stack usas?",
      postgres: "Si te pidiera optimizar una query lenta de Postgres en producción, ¿por dónde empezarías?",
      culture: "¿Qué buscas en tu próximo equipo? ¿Qué tipo de cultura te hace feliz?"
    },
    tab_labels: {
      backend: "backend ↗",
      ai_builder: "ai builder ↗",
      postgres: "postgres ↗",
      culture: "cultura ↗"
    }
  },
  contact_modal: {
    close_aria: "Cerrar",
    eyebrow: "// Hablemos",
    title: "Cuéntame sobre tu proyecto",
    subtitle: "Respondo en menos de 24 horas hábiles. Para algo urgente, ping también por LinkedIn.",
    name_label: "Tu nombre",
    name_placeholder: "ej. Ana Pérez",
    email_label: "Email",
    email_placeholder: "tu@email.com",
    message_label: "Mensaje",
    message_placeholder: "Cuéntame qué necesitas, qué stack tienes, plazos...",
    submit: "Enviar mensaje",
    submitting: "Enviando...",
    submit_error: "Error — intenta de nuevo",
    success_title: "¡Mensaje enviado!",
    success_text: "Te contesto en menos de 24h hábiles."
  },
  seo: {
    title: "Desarrollador de Software | Experiencia en JavaScript y Ruby | Proyectos de Calidad | Contáctame",
    description: "¡Con más de 7 años de experiencia en programación, soy un ingeniero de software apasionado por la tecnología! Trabajo con JavaScript, Ruby y más. ¡Contáctame para proyectos de calidad!",
    image: "/img/seo/og-image.png",
    url: "https://vitualizz.vercel.app/es"
  }
}

export default locale
