import { Camera, Flame, Heart, Lock, Target, BarChart3 } from "lucide-react";
import { COLORS } from "../constants";

export function TopHeader({ coupleName, avatar, dayCount, streak }) {
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

export function BottomNav({ activeTab, setActiveTab }) {
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
