import { COLORS, FONT_SANS } from "../constants";

export function Knot({ color = COLORS.thread, size = 10 }) {
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

export function PrimaryButton({ children, onClick, disabled, icon: Icon, style }) {
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
