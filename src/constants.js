export const COLORS = {
  ink: "#1E1522",
  inkDeep: "#140D18",
  plum: "#33253A",
  plumLight: "#402E48",
  thread: "#C4432E",
  threadLight: "#E0684A",
  ember: "#E8A54B",
  paper: "#F3E9DD",
  paperMuted: "#D9C6AE",
  ash: "#B8A9AE",
  ashDark: "#8A7880",
};

export const FONT_SERIF = "'Fraunces', Georgia, serif";
export const FONT_SANS = "'Inter', system-ui, sans-serif";

export const AVATARS = ["💕", "🔥", "🌙", "🌊", "🦋", "🌻"];

export const QUESTIONS = [
  "¿Qué inseguridad mía podrías aceptar mejor?",
  "¿En qué momento te sentiste más orgulloso u orgullosa de mí?",
  "¿Qué sueño nuestro no hemos hablado en meses?",
  "¿Cuándo fue la última vez que sentiste que te escuché de verdad?",
  "Si mañana no existiera, ¿qué lamentarías no haberme dicho?",
  "¿Qué admiras de cómo enfrentamos los problemas juntos?",
  "¿Hay algo que te gustaría que hiciéramos más seguido?",
];

export const PARTNER_REPLIES = [
  "Creo que a veces sientes que no alcanzas, y quiero que sepas que para mí ya eres suficiente, no necesitas demostrar nada.",
  "El día que hablaste con tu jefe sobre el aumento aunque tenías miedo. Ahí sentí un orgullo enorme por ti.",
  "La casa con el patio grande donde queríamos tener un huerto. Se me había olvidado hasta ahora, pero sigue ahí.",
  "La otra noche, cuando te quedaste en silencio solo escuchando, sin intentar arreglar nada. Eso significó mucho.",
  "Que eres la razón por la que creo en construir algo real, y que nunca me arrepentí de un solo día contigo.",
  "Que casi nunca nos dormimos enojados. Siempre encontramos la forma de volver el uno al otro.",
  "Cocinar juntos los domingos, sin prisa, solo nosotros y música de fondo.",
];

export const MISSION_POOL = [
  { emoji: "🎬", text: "Graben un video de 30 segundos diciendo por qué se aman" },
  { emoji: "🎵", text: "Armen una playlist juntos: 5 canciones elige cada uno" },
  { emoji: "📸", text: "Tómense una foto en un lugar inesperado esta semana" },
  { emoji: "💬", text: "Hablen 15 minutos de un tema que normalmente evitan" },
  { emoji: "🌙", text: "Una noche sin teléfonos contándose historias de infancia" },
  { emoji: "🗺️", text: "Planeen un viaje juntos en 30 minutos, sin pensarlo de más" },
  { emoji: "🕯️", text: "Escriban 3 cosas que aún no le han agradecido al otro" },
  { emoji: "🍳", text: "Cocinen algo nuevo juntos este fin de semana" },
];

export const TAGS = {
  hito: { label: "Hito", color: COLORS.ember },
  apasionado: { label: "Apasionado", color: COLORS.thread },
  dificil: { label: "Difícil", color: COLORS.ash },
};

export const TODAY_LABEL = new Date().toLocaleDateString("es-ES", {
  day: "numeric",
  month: "short",
});
