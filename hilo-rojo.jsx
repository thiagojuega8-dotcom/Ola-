import { useState } from "react";
import {
  Heart,
  Flame,
  Camera,
  Target,
  BarChart3,
  Lock,
  Plus,
  Send,
  Check,
  Mail,
  Sparkles,
} from "lucide-react";

const COLORS = {
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

const FONT_SERIF = "'Fraunces', Georgia, serif";
const FONT_SANS = "'Inter', system-ui, sans-serif";

const AVATARS = ["💕", "🔥", "🌙", "🌊", "🦋", "🌻"];

const QUESTIONS = [
  "¿Qué inseguridad mía podrías aceptar mejor?",
  "¿En qué momento te sentiste más orgulloso u orgullosa de mí?",
  "¿Qué sueño nuestro no hemos hablado en meses?",
  "¿Cuándo fue la última vez que sentiste que te escuché de verdad?",
  "Si mañana no existiera, ¿qué lamentarías no haberme dicho?",
  "¿Qué admiras de cómo enfrentamos los problemas juntos?",
  "¿Hay algo que te gustaría que hiciéramos más seguido?",
];

const PARTNER_REPLIES = [
  "Creo que a veces sientes que no alcanzas, y quiero que sepas que para mí ya eres suficiente, no necesitas demostrar nada.",
  "El día que hablaste con tu jefe sobre el aumento aunque tenías miedo. Ahí sentí un orgullo enorme por ti.",
  "La casa con el patio grande donde queríamos tener un huerto. Se me había olvidado hasta ahora, pero sigue ahí.",
  "La otra noche, cuando te quedaste en silencio solo escuchando, sin intentar arreglar nada. Eso significó mucho.",
  "Que eres la razón por la que creo en construir algo real, y que nunca me arrepentí de un solo día contigo.",
  "Que casi nunca nos dormimos enojados. Siempre encontramos la forma de volver el uno al otro.",
  "Cocinar juntos los domingos, sin prisa, solo nosotros y música de fondo.",
];

const MISSION_POOL = [
  { emoji: "🎬", text: "Graben un video de 30 segundos diciendo por qué se aman" },
  { emoji: "🎵", text: "Armen una playlist juntos: 5 canciones elige cada uno" },
  { emoji: "📸", text: "Tómense una foto en un lugar inesperado esta semana" },
  { emoji: "💬", text: "Hablen 15 minutos de un tema que normalmente evitan" },
  { emoji: "🌙", text: "Una noche sin teléfonos contándose historias de infancia" },
  { emoji: "🗺️", text: "Planeen un viaje juntos en 30 minutos, sin pensarlo de más" },
  { emoji: "🕯️", text: "Escriban 3 cosas que aún no le han agradecido al otro" },
  { emoji: "🍳", text: "Cocinen algo nuevo juntos este fin de semana" },
];

const TAGS = {
  hito: { label: "Hito", color: COLORS.ember },
  apasionado: { label: "Apasionado", color: COLORS.thread },
  dificil: { label: "Difícil", color: COLORS.ash },
};

const TODAY_LABEL = new Date().toLocaleDateString("es-ES", {
  day: "numeric",
  month: "short",
});

function Knot({ color = COLORS.thread, size = 10 }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}88`,
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

function PrimaryButton({ children, onClick, disabled, icon: Icon, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? COLORS.ashDark : COLORS.thread,
        color: COLORS.paper,
        opacity: disabled ? 0.5 : 1,
        fontFamily: FONT_SANS,
        ...style,
      }}
      className="rounded-full px-5 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-opacity"
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

function Onboarding({ coupleName, setCoupleName, avatar, setAvatar, startDate, setStartDate, onStart }) {
  return (
    <div className="min-h-screen flex flex-col justify-center px-7 py-10" style={{ fontFamily: FONT_SANS }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes threadDraw { to { stroke-dashoffset: 0; } }
      `}</style>

      <div className="flex justify-center mb-6">
        <svg width="120" height="70" viewBox="0 0 120 70">
          <circle cx="18" cy="50" r="7" fill={COLORS.ember} />
          <circle cx="102" cy="20" r="7" fill={COLORS.threadLight} />
          <path
            d="M 18 50 C 45 65, 55 15, 102 20"
            fill="none"
            stroke={COLORS.thread}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="180"
            strokeDashoffset="180"
            style={{ animation: "threadDraw 1.6s ease forwards" }}
          />
        </svg>
      </div>

      <h1
        className="text-center text-4xl mb-2"
        style={{ fontFamily: FONT_SERIF, color: COLORS.paper, fontWeight: 600 }}
      >
        Hilo Rojo
      </h1>
      <p className="text-center text-sm mb-10" style={{ color: COLORS.ash }}>
        El espacio secreto de ustedes dos
      </p>

      <label className="text-sm mb-2 block" style={{ color: COLORS.paperMuted }}>
        ¿Cómo se llaman como pareja?
      </label>
      <input
        value={coupleName}
        onChange={(e) => setCoupleName(e.target.value)}
        placeholder="Ale &amp; Isa"
        className="w-full rounded-xl px-4 py-3 mb-6 text-sm focus:outline-none"
        style={{ backgroundColor: COLORS.plumLight, color: COLORS.paper }}
      />

      <label className="text-sm mb-3 block" style={{ color: COLORS.paperMuted }}>
        Elijan un símbolo para los dos
      </label>
      <div className="flex gap-3 mb-6 flex-wrap">
        {AVATARS.map((a) => (
          <button
            key={a}
            onClick={() => setAvatar(a)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all"
            style={{
              backgroundColor: COLORS.plumLight,
              border: avatar === a ? `2px solid ${COLORS.ember}` : "2px solid transparent",
            }}
          >
            {a}
          </button>
        ))}
      </div>

      <label className="text-sm mb-2 block" style={{ color: COLORS.paperMuted }}>
        ¿Desde cuándo están tejiendo esta historia?
      </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full rounded-xl px-4 py-3 mb-10 text-sm focus:outline-none"
        style={{ backgroundColor: COLORS.plumLight, color: COLORS.paper, colorScheme: "dark" }}
      />

      <PrimaryButton disabled={!coupleName.trim()} onClick={onStart} style={{ padding: "14px 0", borderRadius: 999 }}>
        Comenzar nuestra historia
      </PrimaryButton>
    </div>
  );
}

function TopHeader({ coupleName, avatar, dayCount, streak }) {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ backgroundColor: COLORS.plumLight }}
        >
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: COLORS.paper }}>
            {coupleName}
          </p>
          <p className="text-xs" style={{ color: COLORS.ashDark }}>
            Día {dayCount} de su hilo
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{ backgroundColor: COLORS.plumLight }}
      >
        <Flame size={14} color={COLORS.ember} />
        <span className="text-xs font-medium" style={{ color: COLORS.paper }}>
          {streak}
        </span>
      </div>
    </div>
  );
}

function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "hoy", label: "Hoy", icon: Heart },
    { id: "timeline", label: "Su hilo", icon: Camera },
    { id: "misiones", label: "Misiones", icon: Target },
    { id: "nosotros", label: "Nosotros", icon: BarChart3 },
    { id: "secretos", label: "Secretos", icon: Lock },
  ];
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 max-w-md mx-auto pt-3 pb-5 px-3"
      style={{ backgroundColor: COLORS.inkDeep, borderTop: `1px solid ${COLORS.plumLight}` }}
    >
      <div className="flex justify-around relative">
        {tabs.map((t) => {
          const active = activeTab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="flex flex-col items-center gap-1 bg-transparent border-none"
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: active ? COLORS.ember : COLORS.ashDark,
                  boxShadow: active ? `0 0 8px ${COLORS.ember}` : "none",
                  transition: "all .25s",
                }}
              />
              <Icon size={19} color={active ? COLORS.paper : COLORS.ashDark} />
              <span className="text-[10px]" style={{ color: active ? COLORS.paper : COLORS.ashDark }}>
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function TabHoy({ state, actions }) {
  const { qPointer, myAnswer, answered, revealed, waiting } = state;
  const question = QUESTIONS[qPointer % QUESTIONS.length];
  const partnerReply = PARTNER_REPLIES[qPointer % PARTNER_REPLIES.length];
  const nextMission = state.missions.find((m) => !m.completed);

  return (
    <div className="px-5 pb-6">
      <div
        key={qPointer}
        className="rounded-2xl p-5 mb-5"
        style={{
          backgroundColor: COLORS.paper,
          color: COLORS.ink,
          transform: "rotate(-1deg)",
          boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
        }}
      >
        <p className="text-xs mb-2" style={{ color: COLORS.ashDark }}>
          Pregunta de hoy
        </p>
        <p className="text-lg mb-4 leading-snug" style={{ fontFamily: FONT_SERIF, fontWeight: 600 }}>
          {question}
        </p>

        {!answered && (
          <>
            <textarea
              value={myAnswer}
              onChange={(e) => actions.setMyAnswer(e.target.value)}
              rows={3}
              placeholder="Escribe desde el corazón..."
              className="w-full bg-transparent resize-none focus:outline-none text-sm mb-3 border-b pb-2"
              style={{ borderColor: COLORS.paperMuted, fontFamily: FONT_SANS }}
            />
            <PrimaryButton icon={Send} disabled={!myAnswer.trim()} onClick={actions.submitAnswer}>
              Enviar mi respuesta
            </PrimaryButton>
          </>
        )}

        {answered && waiting && (
          <div className="flex items-center gap-2 py-2">
            <span className="animate-pulse">
              <Knot color={COLORS.thread} size={9} />
            </span>
            <p className="text-sm" style={{ color: COLORS.ashDark }}>
              Ya respondiste. Esperando a que tu pareja también responda...
            </p>
          </div>
        )}

        {revealed && (
          <div className="mt-1">
            <div className="rounded-xl p-3 mb-2" style={{ backgroundColor: COLORS.paperMuted }}>
              <p className="text-xs mb-1" style={{ color: COLORS.ashDark }}>Tú</p>
              <p className="text-sm">{myAnswer}</p>
            </div>
            <div className="flex justify-center my-1">
              <div style={{ width: 2, height: 14, backgroundColor: COLORS.thread }} />
            </div>
            <div
              className="rounded-xl p-3 mb-4"
              style={{ backgroundColor: COLORS.plumLight, color: COLORS.paper }}
            >
              <p className="text-xs mb-1" style={{ color: COLORS.ash }}>Tu pareja</p>
              <p className="text-sm">{partnerReply}</p>
            </div>
            <PrimaryButton onClick={actions.nextDay}>Pasar al día siguiente</PrimaryButton>
          </div>
        )}
      </div>

      {nextMission && (
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ backgroundColor: COLORS.plumLight }}
        >
          <Sparkles size={18} color={COLORS.ember} />
          <div className="flex-1">
            <p className="text-xs mb-0.5" style={{ color: COLORS.ash }}>Misión pendiente</p>
            <p className="text-sm" style={{ color: COLORS.paper }}>
              {nextMission.emoji} {nextMission.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function TabTimeline({ timeline, form, actions }) {
  return (
    <div className="px-5 pb-6">
      <div className="flex items-center justify-between mb-5">
        <h2 style={{ fontFamily: FONT_SERIF, color: COLORS.paper, fontSize: 22, fontWeight: 600 }}>
          Su hilo
        </h2>
        <button
          onClick={() => actions.setShowAdd(!form.showAdd)}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: COLORS.thread }}
        >
          <Plus size={16} color={COLORS.paper} />
        </button>
      </div>

      {form.showAdd && (
        <div className="rounded-2xl p-4 mb-5" style={{ backgroundColor: COLORS.plumLight }}>
          <textarea
            value={form.text}
            onChange={(e) => actions.setText(e.target.value)}
            rows={2}
            placeholder="¿Qué momento quieren guardar?"
            className="w-full bg-transparent resize-none focus:outline-none text-sm mb-3"
            style={{ color: COLORS.paper }}
          />
          <div className="flex gap-2 mb-3">
            {Object.entries(TAGS).map(([key, t]) => (
              <button
                key={key}
                onClick={() => actions.setTag(key)}
                className="text-xs rounded-full px-3 py-1.5"
                style={{
                  backgroundColor: form.tag === key ? t.color : COLORS.ink,
                  color: form.tag === key ? COLORS.ink : COLORS.ash,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <PrimaryButton disabled={!form.text.trim()} onClick={actions.addMoment}>
            Añadir al hilo
          </PrimaryButton>
        </div>
      )}

      <div className="relative pl-5">
        <div
          className="absolute top-1 bottom-1 left-1"
          style={{ width: 2, backgroundColor: COLORS.plumLight }}
        />
        {timeline.map((m) => (
          <div key={m.id} className="relative mb-5">
            <div className="absolute -left-4 top-1.5">
              <Knot color={TAGS[m.tag].color} size={11} />
            </div>
            <div className="rounded-xl p-3.5" style={{ backgroundColor: COLORS.plumLight }}>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-medium" style={{ color: TAGS[m.tag].color }}>
                  {TAGS[m.tag].label}
                </span>
                <span className="text-xs" style={{ color: COLORS.ashDark }}>{m.date}</span>
              </div>
              <p className="text-sm" style={{ color: COLORS.paper }}>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabMisiones({ missions, missionPoolIndex, actions }) {
  const completedCount = missions.filter((m) => m.completed).length;
  const canSuggest = missionPoolIndex < MISSION_POOL.length;

  return (
    <div className="px-5 pb-6">
      <h2 style={{ fontFamily: FONT_SERIF, color: COLORS.paper, fontSize: 22, fontWeight: 600 }} className="mb-1">
        Misiones para tejer juntos
      </h2>
      <p className="text-sm mb-4" style={{ color: COLORS.ash }}>
        {completedCount} de {missions.length} cumplidas
      </p>

      <div className="h-1 rounded-full mb-5 overflow-hidden" style={{ backgroundColor: COLORS.plumLight }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${missions.length ? (completedCount / missions.length) * 100 : 0}%`,
            backgroundColor: COLORS.thread,
          }}
        />
      </div>

      <div className="flex flex-col gap-2.5 mb-5">
        {missions.map((m) => (
          <button
            key={m.id}
            onClick={() => actions.toggleMission(m.id)}
            className="rounded-xl p-3.5 flex items-center gap-3 text-left"
            style={{ backgroundColor: COLORS.plumLight, opacity: m.completed ? 0.55 : 1 }}
          >
            <span className="text-lg">{m.emoji}</span>
            <span className="text-sm flex-1" style={{ color: COLORS.paper }}>{m.text}</span>
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: m.completed ? COLORS.ember : "transparent",
                border: m.completed ? "none" : `1.5px solid ${COLORS.ashDark}`,
              }}
            >
              {m.completed && <Check size={13} color={COLORS.ink} />}
            </span>
          </button>
        ))}
      </div>

      {canSuggest ? (
        <PrimaryButton icon={Sparkles} onClick={actions.suggestMission} style={{ width: "100%", padding: "12px 0" }}>
          Sugerir otra misión
        </PrimaryButton>
      ) : (
        <p className="text-sm text-center" style={{ color: COLORS.ashDark }}>
          Ya probaron todas las misiones sugeridas. El resto depende de ustedes.
        </p>
      )}
    </div>
  );
}

function TabNosotros({ streak, answeredCount, timelineCount, missionsCompleted, startDate }) {
  const activeBeads = ((streak - 1) % 7) + 1;
  const daysTogether = startDate
    ? Math.max(0, Math.floor((Date.now() - new Date(startDate)) / 86400000))
    : null;

  const stats = [
    { label: "Preguntas respondidas", value: answeredCount },
    { label: "Momentos en su hilo", value: timelineCount },
    { label: "Misiones cumplidas", value: missionsCompleted },
  ];

  return (
    <div className="px-5 pb-6">
      <h2 style={{ fontFamily: FONT_SERIF, color: COLORS.paper, fontSize: 22, fontWeight: 600 }} className="mb-5">
        Nosotros en números
      </h2>

      <div className="flex flex-col items-center mb-6">
        <Flame size={30} color={COLORS.ember} />
        <p className="text-4xl mt-2" style={{ fontFamily: FONT_SERIF, color: COLORS.paper, fontWeight: 600 }}>
          {streak}
        </p>
        <p className="text-xs" style={{ color: COLORS.ash }}>días seguidos conectando</p>
      </div>

      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl p-3 text-center" style={{ backgroundColor: COLORS.plumLight }}>
            <p className="text-xl font-semibold" style={{ color: COLORS.paper }}>{s.value}</p>
            <p className="text-[11px] mt-1" style={{ color: COLORS.ash }}>{s.label}</p>
          </div>
        ))}
      </div>

      <p className="text-sm mb-3" style={{ color: COLORS.paperMuted }}>Semana de conexión</p>
      <div className="flex items-center justify-between mb-6 px-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Knot color={i < activeBeads ? COLORS.ember : COLORS.plumLight} size={i < activeBeads ? 12 : 9} />
            {i < 6 && <div style={{ width: 14, height: 2, backgroundColor: COLORS.plumLight, marginTop: -20 }} />}
          </div>
        ))}
      </div>

      {daysTogether !== null && (
        <p className="text-sm text-center" style={{ color: COLORS.ash }}>
          Llevan {daysTogether} días escribiendo esta historia juntos.
        </p>
      )}
    </div>
  );
}

function TabSecretos({ secrets, newSecret, setNewSecret, addSecret, revealSecret, letters, letterForm, setLetterForm, addLetter }) {
  return (
    <div className="px-5 pb-6">
      <div className="flex items-center gap-2 mb-1">
        <Lock size={18} color={COLORS.ember} />
        <h2 style={{ fontFamily: FONT_SERIF, color: COLORS.paper, fontSize: 20, fontWeight: 600 }}>
          Bóveda de secretos
        </h2>
      </div>
      <p className="text-sm mb-4" style={{ color: COLORS.ash }}>
        Guarden algo que aún no se han dicho de frente.
      </p>

      <textarea
        value={newSecret}
        onChange={(e) => setNewSecret(e.target.value)}
        rows={2}
        placeholder="Quiero confesar que..."
        className="w-full rounded-xl px-4 py-3 mb-3 text-sm resize-none focus:outline-none"
        style={{ backgroundColor: COLORS.plumLight, color: COLORS.paper }}
      />
      <PrimaryButton disabled={!newSecret.trim()} onClick={addSecret} style={{ marginBottom: 20 }}>
        Guardar en la bóveda
      </PrimaryButton>

      <div className="flex flex-col gap-2.5 mb-8">
        {secrets.length === 0 && (
          <p className="text-sm" style={{ color: COLORS.ashDark }}>
            La bóveda está vacía por ahora.
          </p>
        )}
        {secrets.map((s) => (
          <div key={s.id} className="rounded-xl p-4" style={{ backgroundColor: COLORS.plumLight }}>
            {s.revealed ? (
              <>
                <p className="text-sm mb-2" style={{ color: COLORS.paper }}>{s.text}</p>
                <p className="text-xs" style={{ color: COLORS.ember }}>Tu pareja ya lo leyó 💌</p>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: COLORS.ash }}>
                  Un secreto sellado, esperando el momento
                </span>
                {s.revealing ? (
                  <span className="animate-pulse text-xs" style={{ color: COLORS.ember }}>abriendo...</span>
                ) : (
                  <button onClick={() => revealSecret(s.id)} className="text-xs font-medium" style={{ color: COLORS.ember }}>
                    Revelar juntos
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-1">
        <Mail size={18} color={COLORS.ember} />
        <h2 style={{ fontFamily: FONT_SERIF, color: COLORS.paper, fontSize: 20, fontWeight: 600 }}>
          Cartas al futuro
        </h2>
      </div>
      <p className="text-sm mb-4" style={{ color: COLORS.ash }}>
        Escriban algo que se entregará más adelante.
      </p>

      <input
        value={letterForm.label}
        onChange={(e) => setLetterForm({ ...letterForm, label: e.target.value })}
        placeholder="¿Para qué momento es esta carta?"
        className="w-full rounded-xl px-4 py-3 mb-2 text-sm focus:outline-none"
        style={{ backgroundColor: COLORS.plumLight, color: COLORS.paper }}
      />
      <textarea
        value={letterForm.text}
        onChange={(e) => setLetterForm({ ...letterForm, text: e.target.value })}
        rows={2}
        placeholder="Lo que quieran decirse en ese momento..."
        className="w-full rounded-xl px-4 py-3 mb-3 text-sm resize-none focus:outline-none"
        style={{ backgroundColor: COLORS.plumLight, color: COLORS.paper }}
      />
      <PrimaryButton disabled={!letterForm.text.trim() || !letterForm.label.trim()} onClick={addLetter}>
        Sellar esta carta
      </PrimaryButton>

      <div className="flex flex-col gap-2.5 mt-5">
        {letters.map((l) => (
          <div key={l.id} className="rounded-xl p-4 flex items-center gap-3" style={{ backgroundColor: COLORS.plumLight }}>
            <Lock size={15} color={COLORS.ashDark} />
            <div>
              <p className="text-sm" style={{ color: COLORS.paper }}>Para: {l.label}</p>
              <p className="text-xs" style={{ color: COLORS.ashDark }}>Se abrirá cuando llegue el momento</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HiloRojoApp() {
  const [screen, setScreen] = useState("onboarding");
  const [coupleName, setCoupleName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [startDate, setStartDate] = useState("");
  const [activeTab, setActiveTab] = useState("hoy");

  const [dayCount, setDayCount] = useState(1);
  const [qPointer, setQPointer] = useState(0);
  const [myAnswer, setMyAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const [timeline, setTimeline] = useState([
    { id: 1, text: "Empezamos a tejer nuestra historia en Hilo Rojo.", tag: "hito", date: TODAY_LABEL },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [momentText, setMomentText] = useState("");
  const [momentTag, setMomentTag] = useState("hito");

  const [missions, setMissions] = useState(
    MISSION_POOL.slice(0, 4).map((m, i) => ({ id: i + 1, ...m, completed: false }))
  );
  const [missionPoolIndex, setMissionPoolIndex] = useState(4);

  const [secrets, setSecrets] = useState([]);
  const [newSecret, setNewSecret] = useState("");

  const [letters, setLetters] = useState([]);
  const [letterForm, setLetterForm] = useState({ text: "", label: "" });

  function submitAnswer() {
    if (!myAnswer.trim()) return;
    setAnswered(true);
    setWaiting(true);
    setTimeout(() => {
      setWaiting(false);
      setRevealed(true);
    }, 1600);
  }

  function nextDay() {
    setAnsweredCount((c) => c + 1);
    setStreak((s) => s + 1);
    setDayCount((d) => d + 1);
    setQPointer((p) => p + 1);
    setMyAnswer("");
    setAnswered(false);
    setRevealed(false);
  }

  function addMoment() {
    if (!momentText.trim()) return;
    setTimeline((t) => [{ id: Date.now(), text: momentText.trim(), tag: momentTag, date: TODAY_LABEL }, ...t]);
    setMomentText("");
    setShowAdd(false);
  }

  function toggleMission(id) {
    setMissions((ms) => ms.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m)));
  }

  function suggestMission() {
    if (missionPoolIndex >= MISSION_POOL.length) return;
    const next = MISSION_POOL[missionPoolIndex];
    setMissions((ms) => [...ms, { id: Date.now(), ...next, completed: false }]);
    setMissionPoolIndex((i) => i + 1);
  }

  function addSecret() {
    if (!newSecret.trim()) return;
    setSecrets((s) => [{ id: Date.now(), text: newSecret.trim(), revealed: false, revealing: false }, ...s]);
    setNewSecret("");
  }

  function revealSecret(id) {
    setSecrets((s) => s.map((x) => (x.id === id ? { ...x, revealing: true } : x)));
    setTimeout(() => {
      setSecrets((s) => s.map((x) => (x.id === id ? { ...x, revealed: true, revealing: false } : x)));
    }, 1200);
  }

  function addLetter() {
    if (!letterForm.text.trim() || !letterForm.label.trim()) return;
    setLetters((l) => [{ id: Date.now(), text: letterForm.text.trim(), label: letterForm.label.trim() }, ...l]);
    setLetterForm({ text: "", label: "" });
  }

  if (screen === "onboarding") {
    return (
      <div style={{ backgroundColor: COLORS.ink, minHeight: "100vh" }} className="w-full max-w-md mx-auto">
        <Onboarding
          coupleName={coupleName}
          setCoupleName={setCoupleName}
          avatar={avatar}
          setAvatar={setAvatar}
          startDate={startDate}
          setStartDate={setStartDate}
          onStart={() => coupleName.trim() && setScreen("app")}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${COLORS.ink} 0%, ${COLORS.inkDeep} 100%)`,
        minHeight: "100vh",
        fontFamily: FONT_SANS,
      }}
      className="w-full max-w-md mx-auto relative"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <TopHeader coupleName={coupleName} avatar={avatar} dayCount={dayCount} streak={streak} />

      <div className="pb-20">
        {activeTab === "hoy" && (
          <TabHoy
            state={{ qPointer, myAnswer, answered, revealed, waiting, missions }}
            actions={{ setMyAnswer, submitAnswer, nextDay }}
          />
        )}
        {activeTab === "timeline" && (
          <TabTimeline
            timeline={timeline}
            form={{ showAdd, text: momentText, tag: momentTag }}
            actions={{ setShowAdd, setText: setMomentText, setTag: setMomentTag, addMoment }}
          />
        )}
        {activeTab === "misiones" && (
          <TabMisiones
            missions={missions}
            missionPoolIndex={missionPoolIndex}
            actions={{ toggleMission, suggestMission }}
          />
        )}
        {activeTab === "nosotros" && (
          <TabNosotros
            streak={streak}
            answeredCount={answeredCount}
            timelineCount={timeline.length}
            missionsCompleted={missions.filter((m) => m.completed).length}
            startDate={startDate}
          />
        )}
        {activeTab === "secretos" && (
          <TabSecretos
            secrets={secrets}
            newSecret={newSecret}
            setNewSecret={setNewSecret}
            addSecret={addSecret}
            revealSecret={revealSecret}
            letters={letters}
            letterForm={letterForm}
            setLetterForm={setLetterForm}
            addLetter={addLetter}
          />
        )}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
