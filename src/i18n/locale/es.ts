import type { LanguageLocale } from 'src/types/I18n.types'

const locale: LanguageLocale = {
  nav: {
    presentation: 'Presentación',
    about_me: 'Sobre mí',
    projects: 'Proyectos',
    contact_me: 'Contáctame',
    blog: 'Blog',
    work_experience: 'Experiencia',
    ask_ai: 'Pregúntale',
    resume_label: 'Currículum',
    switch_language: 'Cambiar idioma',
    language_name: 'Español',
    language_option: 'Cambiar a {language}'
  },
  home: {
    about_eyebrow: '// 01 · Sobre mí',
    about_title: "Acerca de <span class='hl-title'>mí</span>",
    about_subtitle:
      'El humano detrás del código — qué me mueve, qué hago, y qué tengo en la caja de herramientas.',
    ai_eyebrow: '// 02 · Lab',
    ai_title: "Pregúntale a Lee <span class='hl-title'>↳ vía IA</span>",
    ai_subtitle:
      'Una IA entrenada con mi CV, stacks y proyectos. Hazle preguntas técnicas, sobre mi experiencia, o lo que sea.',
    projects_eyebrow: '// 03 · Proyectos',
    projects_title: "Trabajo <span class='hl-title'>seleccionado</span>",
    projects_subtitle:
      'Trabajo enviado a producción. Click para ver demo o código.',
    xp_eyebrow: '// 04 · Experiencia',
    xp_title: "Mi <span class='hl-title'>recorrido</span>",
    xp_subtitle:
      'Cuatro paradas profesionales, una constante: producto que se envía.',
    blog_eyebrow: '// 05 · Notas',
    blog_title: "Lo que <span class='hl-title'>escribo</span>",
    blog_subtitle: 'Notas técnicas sobre lo que voy aprendiendo.',
    contact_title:
      "Hablemos<br/>Contame sobre tu <em class='not-italic hl'>proyecto</em> ✨",
    contact_subtitle:
      'Si estás armando equipo y buscás a alguien que tome ownership de punta a punta, ordene arquitectura y sostenga entregas reales, hablemos. Me muevo cómodo entre producto, backend y negocio, y respondo en menos de 24 horas hábiles.',
    contact_download_cv: 'Descargar CV',
    paused_label: 'pausado',
    footer_location_line: 'Lima · UTC −5 · ES / EN',
    quote_text:
      "El código es la parte fácil. <span class='hl'>Enviar producto que aguante</span> — y que el equipo entienda al volver el lunes — es el trabajo.",
    stack_legend_core: 'Core',
    stack_legend_strong: 'Sólido',
    stack_legend_learn: 'Aprendiendo'
  },
  presentation: {
    hi: 'Hola, 🚀',
    i_am: "Soy <span class='hl text-nowrap'>Lee Palacios</span>",
    profession: 'Ingeniero de Software y amante de los gatos 🐱',
    description:
      "<span class='hl'>+7 años</span> entregando producto <strong class='text-ink'>end‑to‑end</strong> en startups LATAM. <strong class='text-ink'>API, base de datos, UI e infra</strong> — la cadena completa, sin pasar la pelota. TypeScript, React, Rails, Python, AWS. Cuando la feature lo pide, también agentes de IA en producción.",
    description_ps:
      'PD: mis tres gatos revisan cada PR antes que cualquier humano. Aún no me han aprobado un rebase --force.',
    typewriter_words:
      'Senior Fullstack Engineer|TypeScript · React · Rails · Python|De Postgres al pixel|AI Builder · LLM orchestration|Cat dad · 3 gatos',
    tagline:
      'Construyo sistemas que escalan, productos que se envían y equipos que avanzan.',
    cta_primary: 'Ver mis proyectos',
    cta_secondary: 'Contactarme'
  },
  about_me: {
    section_about_me: 'Acerca de mí',
    section_skills: 'Habilidades',
    biography: [
      "Empecé a programar a los <span class='hl-soft'>12 años</span> queriendo vender origamis por internet — el primer HTML que escribí fue una página de producto. A los <span class='hl-soft'>15 ya cobraba</span> por escribir software — antes de saber cómo se llamaba el oficio.",
      "Desde entonces, mi carrera ha sido un recorrido por startups LATAM: de <strong class='text-ink'>developer</strong> a <strong class='text-ink'>Tech Lead</strong> a <strong class='text-ink'>Senior IC</strong>. Construí un sistema de campañas para influencers desde cero, optimicé una plataforma SaaS usada por miles de edificios, y refactoricé stacks que un equipo entero heredó sin documentación. Cada parada me dejó lo mismo: <span class='hl-soft'>producto que se envía</span>.",
      "Hoy me defino como <strong class='text-ink'>Senior Fullstack Engineer</strong> con <strong class='text-ink'>7+ años</strong> de experiencia: entrego features <strong class='text-ink'>end-to-end</strong> — schema, API, UI, infra — sin pasar la pelota a otro equipo. En el último año sumé <b class='text-mint'>AI Builder</b> a la mochila: agentes y LLMs cuando la feature lo justifica, no por hype.",
      "Caja de herramientas rápida: <strong class='text-ink'>TypeScript, React/React Native, Rails, Python, Postgres, AWS</strong>. El detalle vive en mi CV — ahí también está el resto del recorrido."
    ],
    mini_note:
      'Lima · ES nativo / EN fluido · tres gatos que aprueban mi código.',
    skills_section_frameworks: 'Frameworks y Bibliotecas',
    skills_section_others: 'Otros',
    skills_section_languages: 'Lenguajes',
    stat_years: 'Años de exp.',
    stat_projects: 'Proyectos',
    stat_stack: 'Full Stack',
    stack_footer:
      '→ alguien que prefiere <b>aprender una herramienta a fondo</b> que coleccionar 20 logos en el CV.'
  },
  work_experience: {
    title: 'Experiencia',
    present: 'Actualidad',
    show_more: 'Ver más',
    show_less: 'Ver menos'
  },
  projects: {
    section_projects: 'Proyectos',
    live_preview: 'Ver sitio',
    github_label: 'Ver código',
    view_image: 'Ver imagen'
  },
  contact_me: {
    tell_me: 'Hablemos</br>Cuéntame sobre tu Proyecto',
    send_message_me: 'Envíame un mensaje ✨',
    resume_label: 'Curriculum',
    form: {
      name_label: 'Nombre',
      name_placeholder: 'Tu nombre',
      email_label: 'Email',
      email_placeholder: 'tu@email.com',
      message_label: 'Mensaje',
      message_placeholder: '¿En qué puedo ayudarte?',
      submit: 'Enviar mensaje',
      submitting: 'Enviando...',
      success: '¡Mensaje enviado! Me pondré en contacto pronto.',
      error: 'Error al enviar. Intentá de nuevo.'
    }
  },
  footer: {
    thanks: 'Con amor @vitualizz'
  },
  blog: {
    title: 'Últimos Posts',
    read_more: 'Leer más',
    read_article: 'Leer artículo',
    back_to_blog: '← Volver al blog',
    min_read: 'MIN DE LECTURA'
  },
  ai: {
    greeting:
      '¡Hola! Soy la versión IA de Lee. Preguntame sobre <b class="hl">backend</b>, <b class="hl">arquitectura</b>, <b class="hl">agentes de IA</b>, <b class="hl">Postgres</b> o proyectos reales en producción 🐱.',
    hint: 'Tip: prueba un atajo arriba ↑ o escribe tu propia pregunta abajo ↓',
    input_placeholder: 'Escribe tu pregunta para Lee...',
    send_aria: 'Enviar',
    thinking: 'pensando...',
    error_fallback: 'No pude procesar tu pregunta. Intenta de nuevo.',
    crash_fallback:
      'Ups, algo se cayó. Escríbeme directo por el formulario de contacto.',
    user_avatar: 'TÚ',
    disclaimer:
      'La IA puede cometer errores o inventar cosas. Para lo que realmente importa,',
    disclaimer_link: 'escribime directo →',
    tabs: {
      backend:
        '¿Cuál ha sido tu proyecto backend más complejo y qué aprendiste de él?',
      ai_builder:
        'Cuéntame sobre tu experiencia construyendo con LLMs y agentes de IA. ¿Qué stack usas?',
      postgres:
        'Si te pidiera optimizar una query lenta de Postgres en producción, ¿por dónde empezarías?',
      culture:
        '¿Qué buscas en tu próximo equipo? ¿Qué tipo de cultura te hace feliz?'
    },
    tab_labels: {
      backend: 'backend ↗',
      ai_builder: 'ai builder ↗',
      postgres: 'postgres ↗',
      culture: 'cultura ↗'
    }
  },
  contact_modal: {
    close_aria: 'Cerrar',
    eyebrow: '// Hablemos',
    title: 'Cuéntame sobre tu proyecto',
    subtitle:
      'Respondo en menos de 24 horas hábiles. Para algo urgente, ping también por LinkedIn.',
    name_label: 'Tu nombre',
    name_placeholder: 'ej. Ana Pérez',
    email_label: 'Email',
    email_placeholder: 'tu@email.com',
    message_label: 'Mensaje',
    message_placeholder: 'Cuéntame qué necesitas, qué stack tienes, plazos...',
    submit: 'Enviar mensaje',
    submitting: 'Enviando...',
    submit_error: 'Error — intenta de nuevo',
    success_title: '¡Mensaje enviado!',
    success_text: 'Te contesto en menos de 24h hábiles.'
  },
  resume_actions: {
    preview: 'Vista previa',
    download: 'Descargar',
    menu_aria: 'Abrir acciones del currículum',
    preview_modal_title: 'Vista previa del currículum',
    preview_modal_close_aria: 'Cerrar vista previa del currículum',
    preview_modal_fallback: 'Abrir currículum en una nueva pestaña'
  },
  seo: {
    title:
      'Tech Lead / Senior Fullstack Engineer | JavaScript, Ruby, AI Agents | Disponible para equipos de alto impacto',
    description:
      'Ingeniero de software con +7 años entregando producto en startups de Latam. Especializado en backend, arquitectura y agentes de IA para equipos que necesitan velocidad con calidad.',
    image: '/img/seo/og-image.png',
    url: 'https://vitualizz.vercel.app/es'
  }
}

export default locale
