// ============================================================
// CONTENIDO EDITABLE — todo el texto del sitio vive aquí.
// Los campos [entre corchetes] son placeholders para editar.
// ============================================================

export const site = {
  name: 'Pamela González',
  role: 'Fisioterapeuta',
  words: ['Movimiento', 'Recuperación', 'Bienestar'],
  whatsappNumber: '50689846677',
  whatsappUrl: 'https://wa.me/50689846677',
  phoneDisplay: '8984-6677',
  phoneHref: 'tel:+50689846677',
  location: 'Costa Rica',
};

export const navLinks = [
  { label: 'Sobre mí', href: '#sobre-mi', id: 'sobre-mi' },
  { label: 'Servicios', href: '#servicios', id: 'servicios' },
  { label: 'Casos', href: '#casos', id: 'casos' },
  { label: 'Formación', href: '#formacion', id: 'formacion' },
  { label: 'Contacto', href: '#contacto', id: 'contacto' },
];

export const hero = {
  overline: '01 — Inicio',
  line1: 'PAMELA',
  line2: 'GONZÁLEZ',
  subtitle: 'FISIOTERAPEUTA',
  subtitleNote: 'Universidad Santa Paula · Costa Rica',
  ctaPrimary: 'Agendar una cita',
  ctaSecondary: 'Ver servicios',
  scrollLabel: 'Desliza',
};

export const about = {
  overline: '02 — Sobre mí',
  title: ['Movimiento que', '*se alinea.*'],
  photoCaption: '[Foto profesional — editar]',
  photoMark: 'PG',
  paragraphs: [
    'Soy Pamela González, fisioterapeuta costarricense. Actualmente finalizo la Licenciatura en Fisioterapia en la Universidad Santa Paula, y mi trabajo nace de una convicción sencilla: el movimiento es la herramienta más poderosa que tiene el cuerpo para recuperarse.',
    'Mi enfoque combina atención personalizada, tratamiento basado en evidencia y un acompañamiento cercano. Cada plan se diseña alrededor de tu cuerpo, tus objetivos y tu ritmo — sin protocolos genéricos.',
  ],
  quote: 'Cada cuerpo tiene la capacidad de sanar; mi trabajo es alinear el camino.',
  pillars: [
    {
      icon: 'ClipboardCheck',
      title: 'Evaluación integral',
      text: 'Miro más allá del síntoma: postura, movilidad, fuerza y hábitos.',
    },
    {
      icon: 'SlidersHorizontal',
      title: 'Tratamiento personalizado',
      text: 'Cada sesión se ajusta a tu cuerpo y a tus objetivos.',
    },
    {
      icon: 'HeartHandshake',
      title: 'Acompañamiento en el proceso',
      text: 'Presencia constante, objetivos claros y seguimiento real.',
    },
  ],
};

export const services = {
  overline: '03 — Servicios',
  title: ['Cada cuerpo,', '*un plan* distinto.'],
  items: [
    {
      title: 'Evaluación fisioterapéutica',
      desc: 'Valoración completa de tu postura, movilidad y función para identificar el origen del dolor y diseñar un plan de tratamiento a tu medida.',
    },
    {
      title: 'Descargas musculares',
      desc: 'Técnicas de liberación miofascial y masaje terapéutico para reducir la tensión, disminuir el dolor y devolver elasticidad al músculo.',
    },
    {
      title: 'Rehabilitación mediante ejercicio',
      desc: 'Programas de ejercicio terapéutico progresivo y basados en evidencia para reconstruir fuerza, control y confianza tras una lesión.',
    },
    {
      title: 'Readaptación física',
      desc: 'Acompañamiento en tu regreso seguro a la actividad deportiva o laboral, recuperando el rendimiento paso a paso.',
    },
    {
      title: 'Recuperación',
      desc: 'Seguimiento cercano del proceso de sanación, con objetivos claros y medibles en cada etapa de tu recuperación.',
    },
    {
      title: 'Movilidad y flexibilidad',
      desc: 'Trabajo de movilidad articular y flexibilidad muscular para que te muevas con libertad y prevengas futuras molestias.',
    },
  ],
};

export const casesSection = {
  overline: '04 — Experiencia',
  title: ['Procesos, no', '*milagros.*'],
  note: 'Casos presentados de forma anónima y con consentimiento.',
  items: [
    {
      id: '01',
      title: 'Rodilla — deportista recreacional',
      objetivo: '[Caso de ejemplo — editar]',
      abordaje: '[Caso de ejemplo — editar]',
      resultado: '[Caso de ejemplo — editar]',
    },
    {
      id: '02',
      title: 'Lumbalgia — vida laboral',
      objetivo: '[Caso de ejemplo — editar]',
      abordaje: '[Caso de ejemplo — editar]',
      resultado: '[Caso de ejemplo — editar]',
    },
    {
      id: '03',
      title: 'Hombro — postoperatorio',
      objetivo: '[Caso de ejemplo — editar]',
      abordaje: '[Caso de ejemplo — editar]',
      resultado: '[Caso de ejemplo — editar]',
    },
    {
      id: '04',
      title: 'Tobillo — esguince',
      objetivo: '[Caso de ejemplo — editar]',
      abordaje: '[Caso de ejemplo — editar]',
      resultado: '[Caso de ejemplo — editar]',
    },
  ],
};

export const formation = {
  overline: '05 — Formación',
  title: ['Formación que', '*no se detiene.*'],
  note: 'Reemplaza los campos [entre corchetes] con tu información.',
  items: [
    {
      title: 'Bachillerato en Fisioterapia',
      place: 'Universidad Santa Paula',
      year: '[Año — editar]',
      note: 'Fundamentos clínicos y del movimiento humano.',
    },
    {
      title: 'Licenciatura en Fisioterapia',
      place: 'Universidad Santa Paula',
      year: 'En curso — finalizando',
      note: 'Profundización clínica, práctica supervisada y trabajo de graduación.',
    },
    {
      title: 'Cursos',
      place: '[Institución — editar]',
      year: '[Año — editar]',
      note: '[Nombre del curso — editar]',
    },
    {
      title: 'Certificaciones',
      place: '[Institución — editar]',
      year: '[Año — editar]',
      note: '[Nombre de la certificación — editar]',
    },
    {
      title: 'Seminarios',
      place: '[Institución — editar]',
      year: '[Año — editar]',
      note: '[Nombre del seminario — editar]',
    },
    {
      title: 'Experiencia práctica',
      place: 'Prácticas clínicas — [Centro — editar]',
      year: '[Año — editar]',
      note: 'Atención supervisada a pacientes en entorno clínico real.',
    },
  ],
};

export const testimonials = {
  overline: '06 — Testimonios',
  title: ['Voces del', '*proceso.*'],
  items: [
    {
      quote: '[Testimonio — editar]',
      author: '[Iniciales — editar]',
      context: '[Contexto — editar]',
    },
    {
      quote: '[Testimonio — editar]',
      author: '[Iniciales — editar]',
      context: '[Contexto — editar]',
    },
    {
      quote: '[Testimonio — editar]',
      author: '[Iniciales — editar]',
      context: '[Contexto — editar]',
    },
  ],
};

export const contact = {
  overline: '07 — Contacto',
  title: ['Empecemos tu', '*recuperación.*'],
  subtitle: 'Cuéntame qué te trae por hoy y seguimos desde ahí.',
  whatsappLabel: 'WhatsApp directo',
  formNote: 'El formulario abre WhatsApp con tu mensaje listo para enviar.',
  labels: {
    nombre: 'Tu nombre',
    motivo: 'Motivo de consulta',
    mensaje: 'Mensaje',
    submit: 'Enviar por WhatsApp',
    cta: 'Escribir por WhatsApp',
  },
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'TikTok', href: '#' },
  ],
  footerRole: 'Fisioterapeuta',
  backToTop: 'Volver arriba',
};
