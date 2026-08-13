import { useRef, useState } from "react";

const LABELS = [
  "Non",
  "J'ai dit n'appuie pas 😭",
  "Tchoutchou ??? 😭",
  "Tu forces ein",
  "Pourquoi tu me fais ça ? 😭",
  "Bon d'accord...",
];

const MAX_ESCAPES = 6;

export function EscapeButton({
  onCaught,
  onEscape,
  disabled,
}: {
  onCaught: () => void;
  onEscape: (attempt: number) => void;
  disabled?: boolean;
}) {
  const [escapes, setEscapes] = useState(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const zoneRef = useRef<HTMLDivElement>(null);

  const caught = escapes >= MAX_ESCAPES;
  const label = LABELS[Math.min(escapes, LABELS.length - 1)];

  const flee = () => {
    const zone = zoneRef.current;
    if (!zone) return;
    const w = zone.clientWidth;
    const h = zone.clientHeight;
    const btnW = Math.min(240, w * 0.8);
    const btnH = 56;
    const x = Math.random() * Math.max(0, w - btnW);
    const y = Math.random() * Math.max(0, h - btnH);
    setPos((prev) => {
      if (prev && Math.abs(prev.x - x) < 40 && Math.abs(prev.y - y) < 30) {
        return { x: Math.max(0, w - btnW - x), y: Math.max(0, h - btnH - y) };
      }
      return { x, y };
    });
    const next = escapes + 1;
    setEscapes(next);
    onEscape(next);
  };

  const handleClick = () => {
    if (disabled) return;
    if (caught) onCaught();
    else flee();
  };

  return (
    <div
      ref={zoneRef}
      className="relative h-40 w-full select-none overflow-hidden rounded-2xl border border-dashed border-border/70 bg-muted/40"
    >
      <button
        type="button"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse" && !caught && !disabled) flee();
        }}
        onClick={handleClick}
        style={
          pos
            ? { position: "absolute", left: pos.x, top: pos.y, maxWidth: "80%" }
            : { position: "absolute", left: "50%", top: "38%", transform: "translate(-50%,-50%)", maxWidth: "80%" }
        }
        className="rounded-2xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] transition-all duration-300 ease-out active:scale-95"
      >
        {label}
      </button>
    </div>
  );
}