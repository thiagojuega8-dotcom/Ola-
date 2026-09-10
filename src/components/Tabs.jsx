import { Check, Flame, Lock, Mail, Plus, Send, Sparkles } from "lucide-react";
import { COLORS, FONT_SANS, FONT_SERIF, MISSION_POOL, PARTNER_REPLIES, QUESTIONS, TAGS } from "../constants";
import { Knot, PrimaryButton } from "./ui";

export function TabHoy({ state, actions }) {
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

export function TabTimeline({ timeline, form, actions }) {
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

export function TabMisiones({ missions, missionPoolIndex, actions }) {
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

export function TabNosotros({ streak, answeredCount, timelineCount, missionsCompleted, startDate }) {
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

export function TabSecretos({ secrets, newSecret, setNewSecret, addSecret, revealSecret, letters, letterForm, setLetterForm, addLetter }) {
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
