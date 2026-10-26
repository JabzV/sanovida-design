import type { DosageId, PlanId } from "./catalog";

export type Locale = "es" | "en";
export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}

interface Meta {
  title: string;
  description: string;
}

interface HeroCopy {
  eyebrow: string;
  /** Title lines; a line wrapped in *asterisks* renders in the pink italic accent. */
  title: string[];
  lead: string;
  /** Short bold line shown above the lead on some pages. */
  strong?: string;
  benefits: { title: string; sub: string }[];
  cta?: string;
  handLines: string[];
  sideNote?: string;
}

const es = {
  meta: {
    home: { title: "SanoVida · Orforglipron y app de bienestar incluida", description: "Orforglipron en cinco dosis, paquetes de 1, 3 y 6 meses y la app SanoVida gratis. Envío a todo México." },
    product: { title: "Orforglipron · Nuestro producto | SanoVida", description: "Conoce Orforglipron y elige entre cinco presentaciones: 0.8, 2.5, 5.5, 9 y 14.5 mg." },
    packages: { title: "Paquetes · 1, 3 y 6 meses | SanoVida", description: "Elige el plan ideal para ti. Misma fórmula, mejor precio mientras más tiempo te acompañamos." },
    app: { title: "App SanoVida · Incluida gratis | SanoVida", description: "Planes de nutrición, entrenamientos en casa, medidas, recordatorios y gráficas de progreso." },
    checkout: { title: "Finaliza tu compra | SanoVida", description: "Compra segura con envío a todo México." },
    how: { title: "Cómo funciona · Paso a paso | SanoVida", description: "Una tableta al día, la app SanoVida a tu lado y una dosis que avanza contigo. Así funciona el programa, de tu pedido a tu rutina." },
    faq: { title: "Preguntas frecuentes | SanoVida", description: "Respuestas sobre Orforglipron, dosis, envíos, pagos y la app SanoVida." },
  } satisfies Record<string, Meta>,
  skip: "Saltar al contenido",
  brandTagline: "Natural Wellness for a Better You",
  placeholder: "Imagen pendiente",
  nav: {
    home: "Inicio",
    product: "Producto",
    packages: "Paquetes",
    app: "App",
    how: "Cómo funciona",
    faq: "Preguntas frecuentes",
    buy: "Comprar ahora",
    menu: "Abrir menú",
    close: "Cerrar menú",
    language: "Idioma",
    secure: "Compra segura",
  },
  trust: {
    shipping: "Envío a todo México",
    fast: "Envío rápido a todo México",
    secure: "Compra segura",
    secure100: "Compra 100% segura",
    payments: "Pagos protegidos",
    support: "Atención personalizada",
    originals: "Productos originales SanoVida",
    whatsapp: "Soporte por WhatsApp",
  },
  footnote: "*Concepto de marca, no un resultado garantizado. Los resultados varían en cada persona. Consulta a tu médico antes de iniciar cualquier tratamiento.",
  dosages: {
    "0.8": { name: "Inicio perfecto", desc: "Ideal para comenzar tu proceso.", points: ["Control de apetito", "Buena tolerancia", "Primeros hábitos"] },
    "2.5": { name: "Progreso constante", desc: "Mayor control y continuidad.", points: ["Reducción de apetito", "Mayor saciedad", "Progreso visible"] },
    "5.5": { name: "Equilibrio ideal", desc: "Una etapa de mayor control.", points: ["Control de peso", "Estabilidad metabólica", "Bienestar continuo"] },
    "9": { name: "Transformación", desc: "Para un cambio más profundo.", points: ["Mayor reducción de apetito", "Mejora en metabolismo", "Constancia sostenida"] },
    "14.5": { name: "Máximo potencial", desc: "Tu mejor versión sin límites.", points: ["Máximo control de apetito", "Etapa avanzada", "Una vida más plena"] },
  } satisfies Record<DosageId, { name: string; desc: string; points: string[] }>,
  plans: {
    "1m": {
      name: "1 Mes",
      tag: "Ideal para comenzar",
      cta: "Comprar 1 mes",
      short: ["1 caja (30 tabletas)", "Seguimiento en la app", "Guías de nutrición", "Soporte por WhatsApp"],
      features: ["Una caja (30 tabletas)", "Comienza tu transformación", "Soporte por WhatsApp", "Guías de nutrición"],
    },
    "3m": {
      name: "3 Meses",
      tag: "Mejores resultados",
      cta: "Comprar 3 meses",
      short: ["3 cajas (90 tabletas)", "Ahorra 8%", "Plan completo en la app", "Soporte prioritario"],
      features: ["3 cajas (90 tabletas)", "Ahorra 8% vs. 1 mes", "Guías de nutrición y bienestar", "Plan completo en la app", "Soporte prioritario por WhatsApp"],
    },
    "6m": {
      name: "6 Meses",
      tag: "Tu transformación completa",
      cta: "Comprar 6 meses",
      short: ["6 cajas (180 tabletas)", "Ahorra 16%", "Plan premium en la app", "Soporte VIP"],
      features: ["6 cajas (180 tabletas)", "Ahorra 16% vs. 1 mes", "Acompañamiento por 6 meses", "Plan premium en la app", "Soporte VIP por WhatsApp", "Guías completas de bienestar"],
    },
  } satisfies Record<PlanId, { name: string; tag: string; cta: string; short: string[]; features: string[] }>,
  packagesCommon: { popular: "Más popular", save: "Ahorra", vs: "vs. 1 mes" },

  home: {
    hero: {
      eyebrow: "Tu mejor versión comienza hoy",
      title: ["Pierde peso,", "recupera tu energía", "y *siéntete increíble*"],
      lead: "Orforglipron de SanoVida es la nueva generación en control de peso, con respaldo científico, para un bienestar real y duradero.",
      benefits: [
        { title: "Control de", sub: "peso efectivo" },
        { title: "Más energía", sub: "día a día" },
        { title: "Bienestar", sub: "total" },
      ],
      cta: "Comprar ahora",
      handLines: ["8 kilos", "en 10 días"],
      sideNote: "Un nuevo comienzo es posible.",
    } satisfies HeroCopy,
    product: {
      eyebrow: "Nuestro producto",
      title: "Orforglipron",
      subtitle: "Ciencia para un *bienestar real*",
      body: "Orforglipron es un innovador tratamiento oral que ayuda a controlar el peso, reduce el apetito y favorece un metabolismo saludable, para que te sientas mejor por dentro y por fuera.",
      icons: [
        { title: "Innovación", sub: "científica" },
        { title: "Seguro y", sub: "confiable" },
        { title: "Seguimiento", sub: "visible" },
        { title: "Para una vida", sub: "más plena" },
      ],
    },
    packages: {
      eyebrow: "Elige tu paquete",
      title: "Resultados que se adaptan a ti",
      lead: "Ahorra más y mantén tu progreso por más tiempo.",
    },
    app: {
      eyebrow: "App SanoVida gratis",
      title: "Tu aliada en cada paso",
      body: "Más que un tratamiento, un acompañamiento completo para lograr tus objetivos. La app SanoVida está incluida gratis en todas tus compras.",
      tiles: [
        { title: "Plan de nutrición", sub: "Comidas saludables y deliciosas." },
        { title: "Entrenamientos en casa", sub: "Rutinas para todos los niveles." },
        { title: "Gráficas de progreso", sub: "Visualiza tu avance." },
        { title: "Recordatorios", sub: "Nunca olvides tu dosis." },
      ],
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Simple, seguro y efectivo",
      lead: "Una tableta al día y la app a tu lado. Sin inyecciones, sin complicaciones.",
      note: "Así de simple.",
      steps: [
        { title: "Tomas tu Orforglipron", sub: "Una tableta al día, de forma sencilla y práctica." },
        { title: "Tu cuerpo responde", sub: "Reduce el apetito y activa tu metabolismo." },
        { title: "Sigues tu progreso", sub: "Registra tu avance en la app, día a día." },
      ],
    },
    closing: {
      title: "Tu bienestar comienza hoy",
      lead: "Empieza tu camino hacia una vida más saludable con SanoVida.",
      cta: "Comprar ahora",
    },
  },

  product: {
    hero: {
      eyebrow: "Nuestro producto",
      title: ["Orforglipron"],
      strong: "Ciencia para un *bienestar real*",
      lead: "Orforglipron es un innovador tratamiento oral que ayuda a controlar el peso, reduce el apetito y favorece un metabolismo saludable, para que te sientas mejor por dentro y por fuera.",
      benefits: [
        { title: "Control de", sub: "peso efectivo" },
        { title: "Más energía", sub: "día a día" },
        { title: "Bienestar", sub: "total" },
      ],
      cta: "Comprar ahora",
      handLines: ["Un nuevo", "comienzo", "es posible"],
      sideNote: "Un acompañamiento real para una vida más plena.",
    } satisfies HeroCopy,
    dosage: {
      eyebrow: "Elige tu dosis ideal",
      title: "Cinco presentaciones, un mismo objetivo",
      lead: "El mismo respaldo científico, adaptado a cada etapa de tu transformación.",
      cta: "Elegir",
      note: "Si es tu primera vez, la mayoría empieza con 0.8 mg. Consulta a tu médico antes de iniciar cualquier tratamiento.",
    },
    quality: {
      eyebrow: "Calidad en cada detalle",
      title: "Un producto diseñado para tu bienestar",
      body: "Cada caja de Orforglipron de SanoVida refleja nuestro compromiso con la calidad, la ciencia y tu confianza. Desde su fórmula hasta su empaque, cada detalle está pensado para acompañarte en tu transformación.",
      items: [
        { title: "Diseño premium", sub: "que inspira confianza." },
        { title: "Calidad y autenticidad", sub: "en cada empaque." },
        { title: "Fórmula segura", sub: "y confiable." },
        { title: "Respaldado por ciencia", sub: "e innovación." },
      ],
      details: {
        eyebrow: "Detalles que marcan la diferencia",
        items: [
          { title: "Diseño premium", sub: "Un empaque elegante que refleja nuestra calidad." },
          { title: "Información clara", sub: "Dosis y beneficios siempre visibles para tu tranquilidad." },
          { title: "Protección total", sub: "Tabletas en empaque seguro para mantener su efectividad." },
        ],
      },
    },
    confidence: {
      eyebrow: "Tu tranquilidad es nuestra prioridad",
      title: "Compra con confianza",
      lead: "Todo lo que necesitas para empezar sin preocupaciones, incluido en cada pedido.",
      items: [
        { title: "Innovación", sub: "científica" },
        { title: "Seguro y", sub: "confiable" },
        { title: "Seguimiento", sub: "visible" },
        { title: "Para una vida", sub: "más plena" },
        { title: "Envío rápido", sub: "a todo México" },
        { title: "Pagos", sub: "protegidos" },
        { title: "Atención", sub: "personalizada" },
        { title: "Productos", sub: "originales" },
      ],
    },
    closing: {
      eyebrow: "Tu bienestar comienza hoy",
      title: "Elige tu dosis de Orforglipron",
      lead: "Empieza tu camino hacia una vida más saludable con SanoVida.",
      cta: "Comprar ahora",
    },
  },

  packages: {
    hero: {
      eyebrow: "Tu bienestar, a tu ritmo",
      title: ["Elige el plan ideal", "*para ti*"],
      strong: "Misma fórmula, mejores resultados.",
      lead: "Orforglipron de SanoVida te acompaña en cada etapa de tu transformación. Elige el plan que se adapte a tus objetivos y comienza hoy tu nueva vida.",
      benefits: [
        { title: "Control de", sub: "peso efectivo" },
        { title: "Más energía", sub: "día a día" },
        { title: "Bienestar", sub: "total" },
        { title: "Acompañamiento", sub: "diario" },
      ],
      handLines: ["Tu mejor", "versión", "comienza hoy"],
    } satisfies HeroCopy,
    cards: {
      eyebrow: "Paquetes SanoVida",
      title: "Resultados que se adaptan a ti",
      lead: "Ahorra más y mantén tu progreso por más tiempo.",
    },
    band: [
      { title: "Compra 100% segura y confiable", sub: "Tus datos están protegidos" },
      { title: "Envío rápido a todo México", sub: "Recibe en la puerta de tu casa" },
      { title: "Múltiples métodos de pago", sub: "Tarjeta, Mercado Pago y PayPal" },
      { title: "Soporte experto por WhatsApp", sub: "Estamos contigo en cada paso" },
    ],
    life: {
      title: "Más que un producto,",
      titleEm: "una vida más plena",
      items: ["Peso saludable", "Más energía", "Mayor confianza", "Bienestar total"],
      handLines: ["Pequeños", "cambios,", "grandes", "resultados"],
    },
    pay: "Compra con confianza en SanoVida.mx",
  },

  app: {
    hero: {
      eyebrow: "Tu bienestar en tus manos",
      title: ["La app de SanoVida", "*incluida gratis*", "en cada compra"],
      lead: "Tu aliado diario para lograr tus objetivos de peso y bienestar. Planes personalizados, seguimiento de tu progreso y herramientas prácticas para una vida más saludable.",
      benefits: [
        { title: "Incluida gratis", sub: "en tu compra" },
        { title: "Fácil de usar", sub: "en tu celular" },
        { title: "Tu bienestar", sub: "en cada paso" },
      ],
      handLines: ["Una vida", "más saludable", "y plena,", "siempre", "contigo."],
    } satisfies HeroCopy,
    stores: { apple: "Descárgala en el", google: "Disponible en" },
    tools: {
      eyebrow: "Todo lo que necesitas en una sola app",
      title: "Herramientas reales",
      titleEm: "para tu día a día",
      body: "La app de SanoVida te acompaña en cada paso con planes, seguimiento y recordatorios diseñados para tu bienestar.",
      handLines: ["Resultados", "reales", "en tu mano"],
      features: [
        { id: "progress", title: "Seguimiento de peso", sub: "Registra tu peso y visualiza tu progreso con gráficas claras y motivadoras." },
        { id: "nutrition", title: "Planes de nutrición", sub: "Recibe planes de alimentación personalizados con comidas saludables y deliciosas." },
        { id: "workouts", title: "Entrenamientos en casa", sub: "Rutinas guiadas paso a paso para todos los niveles, sin equipos y desde tu hogar." },
        { id: "measures", title: "Medidas corporales", sub: "Lleva el control de tus medidas y observa tus cambios de forma visual." },
        { id: "reminders", title: "Recordatorios inteligentes", sub: "Recibe recordatorios de tus tomas, agua, entrenamiento y más." },
        { id: "charts", title: "Gráficas de progreso", sub: "Visualiza tu evolución en peso, medidas y hábitos con estadísticas fáciles de entender." },
      ],
    },
    how: {
      eyebrow: "Cómo funciona",
      title: "Recibe tu acceso en",
      titleEm: "3 simples pasos",
      lead: "La app de SanoVida se activa automáticamente con tu compra. Sin costos adicionales.",
      steps: [
        { title: "Realiza tu compra", sub: "Elige tu producto o paquete de Orforglipron en sanovida.mx." },
        { title: "Recibe tu acceso", sub: "Después de tu compra, recibirás en tu correo las instrucciones para activar la app." },
        { title: "Comienza tu transformación", sub: "Descarga la app, crea tu cuenta y empieza a disfrutar de todos sus beneficios." },
      ],
    },
    closing: {
      eyebrow: "Compra hoy y obtén tu app gratis",
      title: "Tu bienestar completo",
      titleEm: "en un solo lugar",
      lead: "Adquiere tu paquete de Orforglipron y recibe acceso inmediato a la app de SanoVida. Más que un tratamiento, es un sistema integral para una vida más saludable.",
      cta: "Comprar ahora",
    },
    screen: {
      hello: "Hola, Ana",
      plan: "Tu plan de bienestar",
      progress: "Tu progreso",
      lost: "−4.1 kg",
      great: "¡Vas muy bien!",
      today: "Hoy",
      week: "Semana",
      meals: [
        { t: "Desayuno", d: "Avena con frutos rojos", k: "320 kcal" },
        { t: "Comida", d: "Pollo con quinoa y verduras", k: "540 kcal" },
        { t: "Cena", d: "Ensalada mediterránea", k: "380 kcal" },
      ],
      workouts: [
        { t: "Principiante", d: "Movilidad suave", m: "15 min" },
        { t: "Intermedio", d: "Cuerpo completo", m: "25 min" },
        { t: "Avanzado", d: "Fuerza y cardio", m: "30 min" },
      ],
      measures: [
        { t: "Cintura", v: "78 cm", d: "−3 cm" },
        { t: "Cadera", v: "98 cm", d: "−2 cm" },
        { t: "Brazo", v: "28 cm", d: "−1 cm" },
      ],
      reminders: [
        { t: "Tu dosis de hoy", m: "08:00" },
        { t: "Vaso de agua", m: "11:00" },
        { t: "Rutina en casa", m: "18:30" },
      ],
      tabs: ["Inicio", "Nutrición", "Rutinas", "Medidas", "Avisos"],
      titles: { progress: "Tu progreso", nutrition: "Plan de nutrición", workouts: "Entrenamientos", measures: "Medidas", reminders: "Recordatorios" },
    },
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "¿Tienes dudas? *Aquí las resolvemos*",
    lead: "Todo lo que necesitas saber sobre Orforglipron, tu pedido y la app SanoVida, explicado con calma.",
    handLines: ["Estamos", "para ti"],
    quick: {
      title: "Atajos útiles",
      items: [
        { label: "Las cinco dosis", sub: "Elige tu presentación", page: "product" as const },
        { label: "Paquetes y precios", sub: "1, 3 y 6 meses", page: "packages" as const },
        { label: "La app SanoVida", sub: "Incluida en tu compra", page: "app" as const },
      ],
    },
    groups: [
      {
        title: "Sobre Orforglipron",
        intro: "Qué es, cómo se toma y qué esperar.",
        items: [
          { q: "¿Qué es Orforglipron?", a: "Es un tratamiento oral de una toma al día que ayuda a controlar el apetito. Funciona mejor junto con una alimentación equilibrada y actividad física, que es justo lo que te da la app SanoVida." },
          { q: "¿Qué dosis debo elegir?", a: "Si es tu primera vez, la mayoría empieza con 0.8 mg y avanza por etapas. Consulta a tu médico antes de iniciar, sobre todo si tomas otros medicamentos o tienes alguna condición de salud." },
          { q: "¿“8 kilos en 10 días” es un resultado garantizado?", a: "No. Es el concepto de nuestra marca, no una promesa. Cada cuerpo responde distinto y los resultados dependen de tu dosis, alimentación, actividad y salud en general." },
          { q: "¿Cómo tomo Orforglipron?", a: "Una tableta al día, de preferencia a la misma hora. La app te envía un recordatorio diario para que no la olvides." },
        ],
      },
      {
        title: "Pedidos y envíos",
        intro: "Pagos, tiempos de entrega y seguimiento.",
        items: [
          { q: "¿Hacen envíos a todo México?", a: "Sí. Enviamos a toda la República y recibirás tu número de guía por correo para seguir tu pedido." },
          { q: "¿Qué métodos de pago aceptan?", a: "Tarjeta de crédito o débito, Mercado Pago y PayPal." },
          { q: "¿Cuánto tarda en llegar mi pedido?", a: "Normalmente entre 3 y 5 días hábiles, según tu ubicación." },
        ],
      },
      {
        title: "La app SanoVida",
        intro: "Cómo la activas y qué incluye.",
        items: [
          { q: "¿Cómo recibo la app SanoVida?", a: "Después de tu compra recibes un correo con tu confirmación y las instrucciones para descargar la app y activar tu cuenta. No tiene costo adicional." },
          { q: "¿Qué incluye la app?", a: "Planes de nutrición, entrenamientos en casa, registro de peso y medidas, gráficas de progreso y recordatorios." },
        ],
      },
    ],
    help: { title: "¿Necesitas ayuda?", lead: "Nuestro equipo está listo para apoyarte.", whatsapp: "WhatsApp", email: "Correo", hours: "Horario de atención", chat: "Escríbenos por WhatsApp" },
    jump: "Ir a",
    count: "preguntas",
    closing: { title: "¿Lista para *empezar*?", lead: "Elige tu dosis y tu paquete. La app SanoVida va incluida en cada compra.", cta: "Ver paquetes" },
  },

  howPage: {
    hero: {
      eyebrow: "Cómo funciona",
      title: ["Un camino claro", "hacia tu *bienestar*"],
      lead: "Una tableta al día, la app SanoVida a tu lado y una dosis que avanza contigo. Así es el programa, paso a paso.",
      benefits: [
        { title: "Una toma", sub: "al día" },
        { title: "Sin", sub: "inyecciones" },
        { title: "App", sub: "incluida" },
      ],
      cta: "Comprar ahora",
      handLines: ["Paso a paso,", "a tu ritmo"],
    } satisfies HeroCopy,
    journey: {
      title: "Tu primer mes, *día a día*",
      lead: "Esto es lo que pasa desde que haces tu pedido hasta que el hábito se vuelve parte de tu rutina.",
      phases: [
        { when: "Día 1", title: "Tu pedido llega a tu puerta", body: "Recibes tu caja de Orforglipron y, por correo, las instrucciones para activar la app SanoVida. Todo en un mismo envío.", tip: "Tu número de guía llega al correo." },
        { when: "Semana 1", title: "Creas tu rutina", body: "Tomas tu tableta cada mañana a la misma hora. La app te lo recuerda, te propone tu plan de comidas y tu primera rutina en casa.", tip: "Tú eliges la hora del recordatorio." },
        { when: "Semanas 2 a 4", title: "Tu cuerpo responde", body: "El apetito se vuelve más fácil de manejar y las comidas rinden más. Registras tu peso y medidas cuando quieras y ves tu gráfica avanzar.", tip: "Cada cuerpo responde a su ritmo." },
        { when: "Mes 2 en adelante", title: "Avanzas de etapa", body: "Con tu médico decides si subes a la siguiente dosis. Tu plan en la app se ajusta y tú sigues con la misma rutina sencilla.", tip: "Cinco dosis, un mismo camino." },
      ],
    },
    ritual: {
      title: "Una tableta. *Una vez al día.*",
      lead: "Sin inyecciones ni horarios complicados. Orforglipron se toma por vía oral, y la app se encarga de que no se te olvide.",
      moments: [
        { time: "Por la mañana", title: "Tomas tu tableta", body: "Con un vaso de agua, de preferencia a la misma hora todos los días." },
        { time: "Durante el día", title: "Sigues tu plan", body: "Comidas y rutinas pensadas para acompañar el tratamiento, listas en la app." },
        { time: "Cuando quieras", title: "Registras tu avance", body: "Peso, medidas y cómo te sientes. Tu progreso, en una gráfica clara." },
      ],
      note: "Consulta a tu médico antes de iniciar y ante cualquier duda durante el tratamiento.",
    },
    ladder: {
      title: "La dosis correcta *en cada etapa*",
      lead: "Orforglipron viene en cinco presentaciones. La mayoría empieza con 0.8 mg y avanza por etapas, siempre con orientación médica.",
      start: "Punto de partida",
      cta: "Ver las cinco presentaciones",
    },
    honest: {
      title: "Lo que debes saber",
      items: [
        { title: "Los resultados varían", body: "Cada persona responde distinto. “8 kilos en 10 días” es el concepto de nuestra marca, no una promesa." },
        { title: "Habla con tu médico", body: "Antes de empezar y al cambiar de dosis, sobre todo si tomas otros medicamentos o tienes alguna condición de salud." },
        { title: "El hábito hace la diferencia", body: "La tableta funciona mejor junto con la alimentación y el movimiento que te propone la app." },
      ],
    },
    closing: { title: "¿Lista para *empezar*?", lead: "Elige tu dosis y tu paquete. La app SanoVida va incluida.", cta: "Elegir mi paquete" },
  },

  checkout: {
    title: "Finaliza",
    titleEm: "tu compra",
    lead: "Estás a un paso de comenzar una versión más saludable de ti.",
    handLines: ["Tu bienestar", "comienza hoy"],
    steps: [
      { title: "Información", sub: "Tus datos" },
      { title: "Pago", sub: "Método de pago" },
      { title: "Confirmación", sub: "¡Listo!" },
    ],
    contact: { title: "1. Información del cliente", lead: "Completa tus datos para procesar tu pedido.", first: "Nombre(s)", last: "Apellidos", email: "Correo electrónico", phone: "Teléfono", optIn: "Quiero recibir noticias, promociones y consejos de bienestar de SanoVida." },
    shipping: { title: "2. Dirección de envío", lead: "Enviamos a todo México. Tu pedido llega de forma segura y rápida.", street: "Calle y número", colonia: "Colonia", zip: "Código postal", city: "Ciudad", state: "Estado", statePlaceholder: "Selecciona tu estado", billing: "Usar esta dirección como dirección de facturación." },
    payment: {
      title: "3. Método de pago",
      lead: "Todos los pagos son seguros y están encriptados.",
      card: "Tarjeta de crédito o débito",
      mp: "Mercado Pago",
      mpDesc: "Paga con tarjeta, transferencia o dinero en cuenta.",
      paypal: "PayPal",
      paypalDesc: "Paga de forma rápida y segura con tu cuenta PayPal.",
      number: "Número de tarjeta",
      expiry: "Fecha de expiración",
      cvc: "CVC",
      redirect: "Al confirmar, te llevaremos a {method} para completar el pago.",
    },
    placeholders: { first: "Ej. Ana María", last: "Ej. López García", email: "tucorreo@ejemplo.com", phone: "55 1234 5678", street: "Ej. Av. Insurgentes Sur 1234", colonia: "Ej. Del Valle", zip: "Ej. 03100", city: "Ej. Ciudad de México", number: "1234 5678 9012 3456", expiry: "MM / AA", cvc: "123" },
    band: [
      { title: "Pago 100% seguro", sub: "Tus datos están protegidos con encriptación SSL." },
      { title: "Envío a todo México", sub: "Rápido y confiable." },
      { title: "Compra protegida", sub: "Productos originales SanoVida." },
    ],
    summary: {
      title: "Resumen de tu pedido",
      packageOf: "Paquete de {name}",
      dosage: "Orforglipron {mg} mg",
      boxes: "{n} caja(s) ({t} tabletas)",
      change: "Cambiar",
      plan: "Paquete",
      dose: "Dosis",
      subtotal: "Subtotal",
      discount: "Descuento ({pct}%)",
      shipping: "Envío",
      free: "Gratis",
      total: "Total",
      saving: "Ahorras {amount} MXN con este paquete",
      appIncluded: "App SanoVida incluida",
    },
    confirm: "Confirmar compra",
    processing: "Procesando…",
    terms: "Al confirmar tu compra, aceptas nuestros",
    termsLink: "Términos y condiciones",
    and: "y",
    privacyLink: "Aviso de privacidad",
    cards: [
      { title: "Atención personalizada", sub: "Nuestro equipo te acompaña." },
      { title: "Envío rápido a todo México", sub: "Recibe tu pedido en 3 a 5 días hábiles." },
      { title: "Productos 100% originales", sub: "Directo de SanoVida para tu tranquilidad." },
      { title: "Tus datos seguros", sub: "Información protegida y confidencial." },
    ],
    help: { title: "¿Necesitas ayuda?", lead: "Nuestro equipo está listo para apoyarte.", whatsapp: "WhatsApp", email: "Correo", hours: "Horario de atención" },
    errors: {
      required: "Completa este campo.",
      email: "Escribe un correo válido, por ejemplo ana@correo.com.",
      phone: "Escribe un teléfono de 10 dígitos.",
      zip: "El código postal tiene 5 dígitos.",
      card: "Revisa el número de tarjeta.",
      expiry: "Usa el formato MM / AA.",
      cvc: "El CVC tiene 3 o 4 dígitos.",
      summary: "Revisa los campos marcados para continuar.",
    },
    done: {
      title: "¡Gracias, {name}!",
      lead: "Recibimos tu pedido. Enviamos la confirmación y el acceso a la app SanoVida a {email}.",
      order: "Número de pedido",
      next: "Qué sigue",
      nextItems: ["Revisa tu correo para activar tu app.", "Te enviaremos tu número de guía cuando salga tu pedido.", "Empieza tu plan desde el primer día."],
      again: "Hacer otro pedido",
      home: "Volver al inicio",
      demo: "Demostración: no se realizó ningún cargo.",
    },
  },

  footer: {
    disclaimer: "La información de este sitio no sustituye la consulta médica. Consulta a un profesional de la salud antes de iniciar cualquier tratamiento para el control de peso. Los resultados varían en cada persona.",
    links: { terms: "Términos y condiciones", privacy: "Aviso de privacidad", contact: "Contacto" },
    rights: "Todos los derechos reservados.",
  },

  alt: {
    heroHome: "Mujer sonriente en una terraza mediterránea con flores, junto a las cajas de Orforglipron de SanoVida",
    heroProduct: "Mujer sonriente en una terraza mediterránea, con flores rosas y el mar al fondo",
    heroPackages: "Mujer sonriente junto a tres cajas de Orforglipron de SanoVida",
    heroApp: "Mujer sonriente revisando la app SanoVida en su celular",
    heroCheckout: "Mujer sonriente mirando hacia el sol entre flores",
    heroHow: "Mujer sonriente en una terraza mediterránea, lista para empezar su rutina",
    box: "Caja de Orforglipron {mg} mg de SanoVida, 30 tabletas",
    pack: "Paquete SanoVida de {n} caja(s) de Orforglipron",
    boxTilted: "Caja de Orforglipron de SanoVida con hojas verdes",
    boxCorner: "Detalle de la esquina de una caja SanoVida",
    tablets: "Tabletas de Orforglipron en su blíster",
    meal: "Ensalada saludable con pollo",
    workout: "Mujer haciendo ejercicio en casa",
    chart: "Gráfica de progreso de peso en la app",
    reminder: "Recordatorio de la dosis diaria en la app",
    closing: "Mujer disfrutando el sol entre flores",
    trio: "Tres cajas de Orforglipron de SanoVida",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    home: { title: "SanoVida · Orforglipron and wellness app included", description: "Orforglipron in five dosages, 1, 3 and 6-month packages and the free SanoVida app. Shipping across Mexico." },
    product: { title: "Orforglipron · Our product | SanoVida", description: "Learn about Orforglipron and choose from five presentations: 0.8, 2.5, 5.5, 9 and 14.5 mg." },
    packages: { title: "Packages · 1, 3 and 6 months | SanoVida", description: "Choose the ideal plan for you. Same formula, better price the longer we're with you." },
    app: { title: "SanoVida app · Included free | SanoVida", description: "Nutrition plans, home workouts, measurements, reminders and progress charts." },
    checkout: { title: "Complete your order | SanoVida", description: "Secure checkout with shipping across Mexico." },
    how: { title: "How it works · Step by step | SanoVida", description: "One tablet a day, the SanoVida app by your side and a dosage that moves with you. How the program works, from your order to your routine." },
    faq: { title: "Frequently asked questions | SanoVida", description: "Answers about Orforglipron, dosages, shipping, payments and the SanoVida app." },
  },
  skip: "Skip to content",
  brandTagline: "Natural Wellness for a Better You",
  placeholder: "Image pending",
  nav: {
    home: "Home",
    product: "Product",
    packages: "Packages",
    app: "App",
    how: "How it works",
    faq: "FAQ",
    buy: "Buy now",
    menu: "Open menu",
    close: "Close menu",
    language: "Language",
    secure: "Secure checkout",
  },
  trust: {
    shipping: "Shipping across Mexico",
    fast: "Fast shipping across Mexico",
    secure: "Secure checkout",
    secure100: "100% secure checkout",
    payments: "Protected payments",
    support: "Personal support",
    originals: "Original SanoVida products",
    whatsapp: "WhatsApp support",
  },
  footnote: "*Brand concept, not a guaranteed result. Results vary from person to person. Talk to your doctor before starting any treatment.",
  dosages: {
    "0.8": { name: "Perfect start", desc: "Ideal to begin your journey.", points: ["Appetite control", "Well tolerated", "First habits"] },
    "2.5": { name: "Steady progress", desc: "More control and continuity.", points: ["Reduced appetite", "More satiety", "Visible progress"] },
    "5.5": { name: "Ideal balance", desc: "A stage of greater control.", points: ["Weight control", "Metabolic stability", "Ongoing wellbeing"] },
    "9": { name: "Transformation", desc: "For a deeper change.", points: ["Greater appetite reduction", "Improved metabolism", "Sustained consistency"] },
    "14.5": { name: "Full potential", desc: "Your best self, no limits.", points: ["Maximum appetite control", "Advanced stage", "A fuller life"] },
  },
  plans: {
    "1m": {
      name: "1 Month",
      tag: "Ideal to begin",
      cta: "Buy 1 month",
      short: ["1 box (30 tablets)", "Tracking in the app", "Nutrition guides", "WhatsApp support"],
      features: ["One box (30 tablets)", "Begin your transformation", "WhatsApp support", "Nutrition guides"],
    },
    "3m": {
      name: "3 Months",
      tag: "Better results",
      cta: "Buy 3 months",
      short: ["3 boxes (90 tablets)", "Save 8%", "Full plan in the app", "Priority support"],
      features: ["3 boxes (90 tablets)", "Save 8% vs. 1 month", "Nutrition and wellness guides", "Full plan in the app", "Priority WhatsApp support"],
    },
    "6m": {
      name: "6 Months",
      tag: "Your complete transformation",
      cta: "Buy 6 months",
      short: ["6 boxes (180 tablets)", "Save 16%", "Premium plan in the app", "VIP support"],
      features: ["6 boxes (180 tablets)", "Save 16% vs. 1 month", "6 months of support", "Premium plan in the app", "VIP WhatsApp support", "Complete wellness guides"],
    },
  },
  packagesCommon: { popular: "Most popular", save: "Save", vs: "vs. 1 month" },

  home: {
    hero: {
      eyebrow: "Your best self starts today",
      title: ["Lose weight,", "get your energy back", "and *feel amazing*"],
      lead: "Orforglipron by SanoVida is the new generation in weight management, backed by science, for real and lasting wellbeing.",
      benefits: [
        { title: "Effective", sub: "weight control" },
        { title: "More energy", sub: "every day" },
        { title: "Total", sub: "wellbeing" },
      ],
      cta: "Buy now",
      handLines: ["8 kilos", "in 10 days"],
      sideNote: "A new beginning is possible.",
    },
    product: {
      eyebrow: "Our product",
      title: "Orforglipron",
      subtitle: "Science for *real wellbeing*",
      body: "Orforglipron is an innovative oral treatment that helps control weight, reduces appetite and supports a healthy metabolism, so you feel better inside and out.",
      icons: [
        { title: "Scientific", sub: "innovation" },
        { title: "Safe and", sub: "reliable" },
        { title: "Visible", sub: "tracking" },
        { title: "For a", sub: "fuller life" },
      ],
    },
    packages: {
      eyebrow: "Choose your package",
      title: "Results that adapt to you",
      lead: "Save more and keep your progress going longer.",
    },
    app: {
      eyebrow: "Free SanoVida app",
      title: "Your ally at every step",
      body: "More than a treatment, complete support to reach your goals. The SanoVida app is included free with every purchase.",
      tiles: [
        { title: "Nutrition plan", sub: "Healthy, delicious meals." },
        { title: "Home workouts", sub: "Routines for every level." },
        { title: "Progress charts", sub: "See how far you've come." },
        { title: "Reminders", sub: "Never miss your dose." },
      ],
    },
    how: {
      eyebrow: "How it works",
      title: "Simple, safe and effective",
      lead: "One tablet a day with the app by your side. No injections, no fuss.",
      note: "That simple.",
      steps: [
        { title: "Take your Orforglipron", sub: "One tablet a day, simple and practical." },
        { title: "Your body responds", sub: "Reduces appetite and activates your metabolism." },
        { title: "Track your progress", sub: "Log your progress in the app, day by day." },
      ],
    },
    closing: {
      title: "Your wellbeing starts today",
      lead: "Start your path to a healthier life with SanoVida.",
      cta: "Buy now",
    },
  },

  product: {
    hero: {
      eyebrow: "Our product",
      title: ["Orforglipron"],
      strong: "Science for *real wellbeing*",
      lead: "Orforglipron is an innovative oral treatment that helps control weight, reduces appetite and supports a healthy metabolism, so you feel better inside and out.",
      benefits: [
        { title: "Effective", sub: "weight control" },
        { title: "More energy", sub: "every day" },
        { title: "Total", sub: "wellbeing" },
      ],
      cta: "Buy now",
      handLines: ["A new", "beginning", "is possible"],
      sideNote: "Real support for a fuller life.",
    },
    dosage: {
      eyebrow: "Choose your ideal dosage",
      title: "Five presentations, one goal",
      lead: "The same scientific backing, adapted to every stage of your transformation.",
      cta: "Choose",
      note: "If it's your first time, most people start at 0.8 mg. Talk to your doctor before starting any treatment.",
    },
    quality: {
      eyebrow: "Quality in every detail",
      title: "A product designed for your wellbeing",
      body: "Every box of SanoVida Orforglipron reflects our commitment to quality, science and your trust. From its formula to its packaging, every detail is designed to support your transformation.",
      items: [
        { title: "Premium design", sub: "that inspires confidence." },
        { title: "Quality and authenticity", sub: "in every package." },
        { title: "Safe and reliable", sub: "formula." },
        { title: "Backed by science", sub: "and innovation." },
      ],
      details: {
        eyebrow: "Details that make the difference",
        items: [
          { title: "Premium design", sub: "Elegant packaging that reflects our quality." },
          { title: "Clear information", sub: "Dosage and benefits always visible for your peace of mind." },
          { title: "Total protection", sub: "Tablets in secure packaging that keeps them effective." },
        ],
      },
    },
    confidence: {
      eyebrow: "Your peace of mind is our priority",
      title: "Buy with confidence",
      lead: "Everything you need to start without worry, included with every order.",
      items: [
        { title: "Scientific", sub: "innovation" },
        { title: "Safe and", sub: "reliable" },
        { title: "Visible", sub: "tracking" },
        { title: "For a", sub: "fuller life" },
        { title: "Fast shipping", sub: "across Mexico" },
        { title: "Protected", sub: "payments" },
        { title: "Personal", sub: "support" },
        { title: "Original", sub: "products" },
      ],
    },
    closing: {
      eyebrow: "Your wellbeing starts today",
      title: "Choose your Orforglipron dosage",
      lead: "Start your path to a healthier life with SanoVida.",
      cta: "Buy now",
    },
  },

  packages: {
    hero: {
      eyebrow: "Your wellbeing, at your pace",
      title: ["Choose the ideal plan", "*for you*"],
      strong: "Same formula, better results.",
      lead: "SanoVida Orforglipron supports you at every stage of your transformation. Choose the plan that fits your goals and start your new life today.",
      benefits: [
        { title: "Effective", sub: "weight control" },
        { title: "More energy", sub: "every day" },
        { title: "Total", sub: "wellbeing" },
        { title: "Daily", sub: "support" },
      ],
      handLines: ["Your best", "self starts", "today"],
    },
    cards: {
      eyebrow: "SanoVida packages",
      title: "Results that adapt to you",
      lead: "Save more and keep your progress going longer.",
    },
    band: [
      { title: "100% secure and reliable checkout", sub: "Your data is protected" },
      { title: "Fast shipping across Mexico", sub: "Delivered to your door" },
      { title: "Multiple payment methods", sub: "Card, Mercado Pago and PayPal" },
      { title: "Expert WhatsApp support", sub: "We're with you every step" },
    ],
    life: {
      title: "More than a product,",
      titleEm: "a fuller life",
      items: ["Healthy weight", "More energy", "More confidence", "Total wellbeing"],
      handLines: ["Small", "changes,", "big", "results"],
    },
    pay: "Shop with confidence at SanoVida.mx",
  },

  app: {
    hero: {
      eyebrow: "Your wellbeing in your hands",
      title: ["The SanoVida app", "*included free*", "with every order"],
      lead: "Your daily ally to reach your weight and wellness goals. Personalized plans, progress tracking and practical tools for a healthier life.",
      benefits: [
        { title: "Included free", sub: "with your order" },
        { title: "Easy to use", sub: "on your phone" },
        { title: "Your wellbeing", sub: "at every step" },
      ],
      handLines: ["A healthier,", "fuller life,", "always", "with you."],
    },
    stores: { apple: "Download on the", google: "Get it on" },
    tools: {
      eyebrow: "Everything you need in one app",
      title: "Real tools",
      titleEm: "for your everyday",
      body: "The SanoVida app supports you at every step with plans, tracking and reminders designed for your wellbeing.",
      handLines: ["Real results", "in your hand"],
      features: [
        { id: "progress", title: "Weight tracking", sub: "Log your weight and see your progress in clear, motivating charts." },
        { id: "nutrition", title: "Nutrition plans", sub: "Receive personalized meal plans with healthy, delicious meals." },
        { id: "workouts", title: "Home workouts", sub: "Step-by-step guided routines for every level, no equipment, from home." },
        { id: "measures", title: "Body measurements", sub: "Keep track of your measurements and see your changes visually." },
        { id: "reminders", title: "Smart reminders", sub: "Get reminders for your doses, water, workouts and more." },
        { id: "charts", title: "Progress charts", sub: "See your evolution in weight, measurements and habits with easy statistics." },
      ],
    },
    how: {
      eyebrow: "How it works",
      title: "Get your access in",
      titleEm: "3 simple steps",
      lead: "The SanoVida app activates automatically with your purchase. No extra cost.",
      steps: [
        { title: "Place your order", sub: "Choose your Orforglipron product or package at sanovida.mx." },
        { title: "Get your access", sub: "After your purchase, you'll receive instructions by email to activate the app." },
        { title: "Start your transformation", sub: "Download the app, create your account and start enjoying all its benefits." },
      ],
    },
    closing: {
      eyebrow: "Buy today and get your free app",
      title: "Your complete wellbeing",
      titleEm: "in one place",
      lead: "Get your Orforglipron package and receive immediate access to the SanoVida app. More than a treatment, it's a complete system for a healthier life.",
      cta: "Buy now",
    },
    screen: {
      hello: "Hi, Ana",
      plan: "Your wellness plan",
      progress: "Your progress",
      lost: "−4.1 kg",
      great: "You're doing great!",
      today: "Today",
      week: "Week",
      meals: [
        { t: "Breakfast", d: "Oats with berries", k: "320 kcal" },
        { t: "Lunch", d: "Chicken, quinoa and greens", k: "540 kcal" },
        { t: "Dinner", d: "Mediterranean salad", k: "380 kcal" },
      ],
      workouts: [
        { t: "Beginner", d: "Gentle mobility", m: "15 min" },
        { t: "Intermediate", d: "Full body", m: "25 min" },
        { t: "Advanced", d: "Strength and cardio", m: "30 min" },
      ],
      measures: [
        { t: "Waist", v: "78 cm", d: "−3 cm" },
        { t: "Hips", v: "98 cm", d: "−2 cm" },
        { t: "Arm", v: "28 cm", d: "−1 cm" },
      ],
      reminders: [
        { t: "Today's dose", m: "08:00" },
        { t: "Glass of water", m: "11:00" },
        { t: "Home workout", m: "18:30" },
      ],
      tabs: ["Home", "Meals", "Workouts", "Measures", "Alerts"],
      titles: { progress: "Your progress", nutrition: "Nutrition plan", workouts: "Workouts", measures: "Measurements", reminders: "Reminders" },
    },
  },

  faq: {
    eyebrow: "Frequently asked questions",
    title: "Questions? *We have answers*",
    lead: "Everything you need to know about Orforglipron, your order and the SanoVida app, explained calmly.",
    handLines: ["We're here", "for you"],
    quick: {
      title: "Useful shortcuts",
      items: [
        { label: "The five dosages", sub: "Choose your strength", page: "product" as const },
        { label: "Packages and prices", sub: "1, 3 and 6 months", page: "packages" as const },
        { label: "The SanoVida app", sub: "Included with your purchase", page: "app" as const },
      ],
    },
    groups: [
      {
        title: "About Orforglipron",
        intro: "What it is, how to take it and what to expect.",
        items: [
          { q: "What is Orforglipron?", a: "It's a once-daily oral treatment that helps control appetite. It works best alongside balanced eating and physical activity, which is exactly what the SanoVida app gives you." },
          { q: "Which dosage should I choose?", a: "If it's your first time, most people start at 0.8 mg and move up in stages. Talk to your doctor before starting, especially if you take other medication or have a health condition." },
          { q: "Is “8 kilos in 10 days” a guaranteed result?", a: "No. It's our brand concept, not a promise. Every body responds differently, and results depend on your dosage, diet, activity and overall health." },
          { q: "How do I take Orforglipron?", a: "One tablet a day, preferably at the same time. The app sends you a daily reminder so you don't forget." },
        ],
      },
      {
        title: "Orders and shipping",
        intro: "Payments, delivery times and tracking.",
        items: [
          { q: "Do you ship across Mexico?", a: "Yes. We ship nationwide and you'll receive a tracking number by email." },
          { q: "Which payment methods do you accept?", a: "Credit or debit card, Mercado Pago and PayPal." },
          { q: "How long does delivery take?", a: "Usually 3 to 5 business days, depending on your location." },
        ],
      },
      {
        title: "The SanoVida app",
        intro: "How to activate it and what's inside.",
        items: [
          { q: "How do I get the SanoVida app?", a: "After your purchase you'll receive an email with your confirmation and instructions to download the app and activate your account. There's no extra cost." },
          { q: "What does the app include?", a: "Nutrition plans, home workouts, weight and measurement logs, progress charts and reminders." },
        ],
      },
    ],
    help: { title: "Need help?", lead: "Our team is ready to support you.", whatsapp: "WhatsApp", email: "Email", hours: "Support hours", chat: "Message us on WhatsApp" },
    jump: "Jump to",
    count: "questions",
    closing: { title: "Ready to *begin*?", lead: "Choose your dosage and package. The SanoVida app is included with every purchase.", cta: "See packages" },
  },

  howPage: {
    hero: {
      eyebrow: "How it works",
      title: ["A clear path", "to your *wellbeing*"],
      lead: "One tablet a day, the SanoVida app by your side and a dosage that moves with you. This is the program, step by step.",
      benefits: [
        { title: "One dose", sub: "a day" },
        { title: "No", sub: "injections" },
        { title: "App", sub: "included" },
      ],
      cta: "Buy now",
      handLines: ["Step by step,", "at your pace"],
    },
    journey: {
      title: "Your first month, *day by day*",
      lead: "This is what happens from the moment you order until the habit becomes part of your routine.",
      phases: [
        { when: "Day 1", title: "Your order arrives", body: "You receive your box of Orforglipron and, by email, the instructions to activate the SanoVida app. Everything in one shipment.", tip: "Your tracking number arrives by email." },
        { when: "Week 1", title: "You build your routine", body: "You take your tablet every morning at the same time. The app reminds you, suggests your meal plan and your first home workout.", tip: "You choose the reminder time." },
        { when: "Weeks 2 to 4", title: "Your body responds", body: "Appetite becomes easier to manage and meals go further. You log your weight and measurements whenever you like and watch your chart move.", tip: "Every body responds at its own pace." },
        { when: "Month 2 onwards", title: "You move up a stage", body: "With your doctor you decide whether to step up to the next dosage. Your plan in the app adjusts and you keep the same simple routine.", tip: "Five dosages, one path." },
      ],
    },
    ritual: {
      title: "One tablet. *Once a day.*",
      lead: "No injections and no complicated schedules. Orforglipron is taken orally, and the app makes sure you never forget.",
      moments: [
        { time: "In the morning", title: "Take your tablet", body: "With a glass of water, ideally at the same time every day." },
        { time: "During the day", title: "Follow your plan", body: "Meals and routines designed to support the treatment, ready in the app." },
        { time: "Whenever you like", title: "Log your progress", body: "Weight, measurements and how you feel. Your progress, in one clear chart." },
      ],
      note: "Talk to your doctor before starting and whenever you have questions during treatment.",
    },
    ladder: {
      title: "The right dosage *at every stage*",
      lead: "Orforglipron comes in five strengths. Most people start at 0.8 mg and move up in stages, always with medical guidance.",
      start: "Starting point",
      cta: "See all five strengths",
    },
    honest: {
      title: "What you should know",
      items: [
        { title: "Results vary", body: "Everyone responds differently. “8 kilos in 10 days” is our brand concept, not a promise." },
        { title: "Talk to your doctor", body: "Before you start and when changing dosage, especially if you take other medication or have a health condition." },
        { title: "The habit makes the difference", body: "The tablet works best alongside the meals and movement the app suggests." },
      ],
    },
    closing: { title: "Ready to *begin*?", lead: "Choose your dosage and package. The SanoVida app is included.", cta: "Choose my package" },
  },

  checkout: {
    title: "Complete",
    titleEm: "your order",
    lead: "You're one step away from a healthier version of you.",
    handLines: ["Your wellbeing", "starts today"],
    steps: [
      { title: "Information", sub: "Your details" },
      { title: "Payment", sub: "Payment method" },
      { title: "Confirmation", sub: "Done!" },
    ],
    contact: { title: "1. Customer information", lead: "Fill in your details to process your order.", first: "First name", last: "Last name", email: "Email", phone: "Phone", optIn: "Send me news, promotions and wellness tips from SanoVida." },
    shipping: { title: "2. Shipping address", lead: "We ship across Mexico. Your order arrives safely and quickly.", street: "Street and number", colonia: "Neighborhood (colonia)", zip: "Postal code", city: "City", state: "State", statePlaceholder: "Select your state", billing: "Use this address as my billing address." },
    payment: {
      title: "3. Payment method",
      lead: "All payments are secure and encrypted.",
      card: "Credit or debit card",
      mp: "Mercado Pago",
      mpDesc: "Pay with card, bank transfer or account balance.",
      paypal: "PayPal",
      paypalDesc: "Pay quickly and securely with your PayPal account.",
      number: "Card number",
      expiry: "Expiry date",
      cvc: "CVC",
      redirect: "When you confirm, we'll take you to {method} to complete payment.",
    },
    placeholders: { first: "e.g. Ana María", last: "e.g. López García", email: "you@example.com", phone: "55 1234 5678", street: "e.g. Av. Insurgentes Sur 1234", colonia: "e.g. Del Valle", zip: "e.g. 03100", city: "e.g. Mexico City", number: "1234 5678 9012 3456", expiry: "MM / YY", cvc: "123" },
    band: [
      { title: "100% secure payment", sub: "Your data is protected with SSL encryption." },
      { title: "Shipping across Mexico", sub: "Fast and reliable." },
      { title: "Protected purchase", sub: "Original SanoVida products." },
    ],
    summary: {
      title: "Order summary",
      packageOf: "{name} package",
      dosage: "Orforglipron {mg} mg",
      boxes: "{n} box(es) ({t} tablets)",
      change: "Change",
      plan: "Package",
      dose: "Dosage",
      subtotal: "Subtotal",
      discount: "Discount ({pct}%)",
      shipping: "Shipping",
      free: "Free",
      total: "Total",
      saving: "You save {amount} MXN with this package",
      appIncluded: "SanoVida app included",
    },
    confirm: "Confirm order",
    processing: "Processing…",
    terms: "By confirming your order you accept our",
    termsLink: "Terms and conditions",
    and: "and",
    privacyLink: "Privacy notice",
    cards: [
      { title: "Personal support", sub: "Our team is with you." },
      { title: "Fast shipping across Mexico", sub: "Receive your order in 3 to 5 business days." },
      { title: "100% original products", sub: "Straight from SanoVida for your peace of mind." },
      { title: "Your data is safe", sub: "Protected, confidential information." },
    ],
    help: { title: "Need help?", lead: "Our team is ready to support you.", whatsapp: "WhatsApp", email: "Email", hours: "Support hours" },
    errors: {
      required: "Fill in this field.",
      email: "Enter a valid email, for example ana@mail.com.",
      phone: "Enter a 10-digit phone number.",
      zip: "Postal codes have 5 digits.",
      card: "Check the card number.",
      expiry: "Use the MM / YY format.",
      cvc: "The CVC has 3 or 4 digits.",
      summary: "Check the highlighted fields to continue.",
    },
    done: {
      title: "Thank you, {name}!",
      lead: "We've received your order. Your confirmation and SanoVida app access are on their way to {email}.",
      order: "Order number",
      next: "What's next",
      nextItems: ["Check your email to activate your app.", "We'll send your tracking number when your order ships.", "Start your plan from day one."],
      again: "Place another order",
      home: "Back to home",
      demo: "Demo: no charge was made.",
    },
  },

  footer: {
    disclaimer: "The information on this site does not replace medical advice. Talk to a healthcare professional before starting any weight-management treatment. Results vary from person to person.",
    links: { terms: "Terms and conditions", privacy: "Privacy notice", contact: "Contact" },
    rights: "All rights reserved.",
  },

  alt: {
    heroHome: "Smiling woman on a Mediterranean terrace with flowers, next to SanoVida Orforglipron boxes",
    heroProduct: "Smiling woman on a Mediterranean terrace with pink flowers and the sea behind",
    heroPackages: "Smiling woman next to three SanoVida Orforglipron boxes",
    heroApp: "Smiling woman checking the SanoVida app on her phone",
    heroCheckout: "Smiling woman looking toward the sun among flowers",
    heroHow: "Smiling woman on a Mediterranean terrace, ready to start her routine",
    box: "SanoVida Orforglipron {mg} mg box, 30 tablets",
    pack: "SanoVida package of {n} Orforglipron box(es)",
    boxTilted: "SanoVida Orforglipron box with green leaves",
    boxCorner: "Detail of a SanoVida box corner",
    tablets: "Orforglipron tablets in their blister pack",
    meal: "Healthy salad with chicken",
    workout: "Woman exercising at home",
    chart: "Weight progress chart in the app",
    reminder: "Daily dose reminder in the app",
    closing: "Woman enjoying the sun among flowers",
    trio: "Three SanoVida Orforglipron boxes",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
