import { AVATARS, COLORS, FONT_SANS, FONT_SERIF } from "../constants";
import { PrimaryButton } from "./ui";

export default function Onboarding({ coupleName, setCoupleName, avatar, setAvatar, startDate, setStartDate, onStart }) {
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
