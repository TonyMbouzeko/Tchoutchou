/**
 * Deux petits personnages illustrés (SVG) : la fille (Tchoutchou) et le garçon.
 * Animations idle en CSS (respiration, balancement, clignement) + réactions
 * déclenchées via la prop `reaction`.
 */

export type Reaction =
  | "idle"
  | "happy"
  | "excited"
  | "sad"
  | "surprised"
  | "laugh"
  | "embarrassed";

const SKIN = "#8d5524";
const SKIN_DARK = "#7a471d";
const HAIR = "#241a16";
const BLUSH = "#c46a5a";
const LINE = "#2b1c14";

const BOY_TOP = "#3f6f63";
const GIRL_TOP = "#c46a4a";

const reactionClass: Record<Reaction, string> = {
  idle: "",
  happy: "av-react-happy",
  excited: "av-react-excited",
  sad: "av-react-sad",
  surprised: "av-react-surprised",
  laugh: "av-react-laugh",
  embarrassed: "av-react-embarrassed",
};

function Eyes({ reaction, alt }: { reaction: Reaction; alt?: boolean }) {
  if (reaction === "laugh" || reaction === "happy" || reaction === "excited") {
    return (
      <g stroke={LINE} strokeWidth={2.4} strokeLinecap="round" fill="none">
        <path d="M35 47 q4.5 -5 9 0" />
        <path d="M56 47 q4.5 -5 9 0" />
      </g>
    );
  }
  if (reaction === "sad") {
    return (
      <g stroke={LINE} strokeWidth={2.4} strokeLinecap="round" fill="none">
        <path d="M35 48 q4.5 4 9 0" />
        <path d="M56 48 q4.5 4 9 0" />
      </g>
    );
  }
  const r = reaction === "surprised" ? 4.6 : 3.1;
  return (
    <g className={alt ? "av-eyes-alt" : "av-eyes"}>
      <ellipse cx={39.5} cy={47} rx={r} ry={r} fill={LINE} />
      <ellipse cx={60.5} cy={47} rx={r} ry={r} fill={LINE} />
      <circle cx={41} cy={45.6} r={1.1} fill="#fff" />
      <circle cx={62} cy={45.6} r={1.1} fill="#fff" />
    </g>
  );
}

function Mouth({ reaction }: { reaction: Reaction }) {
  switch (reaction) {
    case "laugh":
      return <path d="M42 57 q8 10 16 0 q-8 3 -16 0z" fill={LINE} />;
    case "excited":
    case "happy":
      return (
        <path d="M42 56 q8 8 16 0" stroke={LINE} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      );
    case "sad":
      return (
        <path d="M43 60 q7 -6 14 0" stroke={LINE} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      );
    case "surprised":
      return <ellipse cx={50} cy={58} rx={4} ry={5} fill={LINE} />;
    case "embarrassed":
      return (
        <path d="M43 58 q4 3 7 -1 q3 -4 7 1" stroke={LINE} strokeWidth={2.2} fill="none" strokeLinecap="round" />
      );
    default:
      return (
        <path d="M44 57 q6 5 12 0" stroke={LINE} strokeWidth={2.2} fill="none" strokeLinecap="round" />
      );
  }
}

function Sparkles() {
  return (
    <g>
      {[
        { x: 22, y: 32, d: "0s", c: "#f2c14e" },
        { x: 78, y: 28, d: "0.15s", c: "#e07a5f" },
        { x: 70, y: 42, d: "0.3s", c: "#f2c14e" },
      ].map((s) => (
        <path
          key={s.d}
          className="av-spark"
          style={{ animationDelay: s.d, transformOrigin: `${s.x}px ${s.y}px` }}
          d={`M${s.x} ${s.y - 4} l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4z`}
          fill={s.c}
        />
      ))}
    </g>
  );
}

function Hearts() {
  return (
    <g>
      {[
        { x: 24, y: 30, d: "0s" },
        { x: 76, y: 34, d: "0.25s" },
      ].map((h) => (
        <path
          key={h.d}
          className="av-spark"
          style={{ animationDelay: h.d, transformOrigin: `${h.x}px ${h.y}px` }}
          d={`M${h.x} ${h.y + 3} c-4 -3.4 -5.4 -6 -3.2 -7.8 1.7 -1.4 3.2 0 3.2 1 0 -1 1.5 -2.4 3.2 -1 2.2 1.8 0.8 4.4 -3.2 7.8z`}
          fill="#d05f5f"
        />
      ))}
    </g>
  );
}

function Face({ reaction }: { reaction: Reaction }) {
  return (
    <>
      <Eyes reaction={reaction} />
      <g stroke={LINE} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.85}>
        <path d={reaction === "sad" ? "M33 39 q5 3 10 1" : "M33 38 q5 -3 10 -1"} />
        <path d={reaction === "sad" ? "M67 39 q-5 3 -10 1" : "M67 38 q-5 -3 -10 -1"} />
      </g>
      <Mouth reaction={reaction} />
      <ellipse
        cx={32}
        cy={54}
        rx={5}
        ry={3}
        fill={BLUSH}
        opacity={reaction === "embarrassed" ? 0.55 : 0.25}
      />
      <ellipse
        cx={68}
        cy={54}
        rx={5}
        ry={3}
        fill={BLUSH}
        opacity={reaction === "embarrassed" ? 0.55 : 0.25}
      />
    </>
  );
}

function Boy({ reaction }: { reaction: Reaction }) {
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full" role="img" aria-label="Avatar du garçon">
      <g className={reactionClass[reaction]} style={{ transformOrigin: "50px 100px" }}>
        <g className="av-body">
          {/* buste */}
          <path d="M22 120 q0 -26 28 -26 q28 0 28 26z" fill={BOY_TOP} />
          <path d="M42 96 h16 v6 q-8 6 -16 0z" fill={SKIN_DARK} />
          <g className="av-head">
            <ellipse cx={50} cy={49} rx={26} ry={27} fill={SKIN} />
            <ellipse cx={23} cy={52} rx={4} ry={5} fill={SKIN_DARK} />
            <ellipse cx={77} cy={52} rx={4} ry={5} fill={SKIN_DARK} />
            {/* cheveux courts */}
            <path d="M24 42 q3 -22 26 -22 q23 0 26 22 q-6 -9 -26 -9 q-20 0 -26 9z" fill={HAIR} />
            <Face reaction={reaction} />
          </g>
        </g>
        {reaction === "happy" ? <Hearts /> : null}
        {reaction === "excited" ? <Sparkles /> : null}
      </g>
    </svg>
  );
}

function Girl({ reaction, lean }: { reaction: Reaction; lean?: boolean }) {
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full" role="img" aria-label="Avatar de la fille">
      <g className={lean ? "av-react-lean" : ""} style={{ transformOrigin: "50px 100px" }}>
        <g className="av-body" style={{ animationDelay: "0.7s" }}>
          <path d="M22 120 q0 -26 28 -26 q28 0 28 26z" fill={GIRL_TOP} />
          <path d="M42 96 h16 v6 q-8 6 -16 0z" fill={SKIN_DARK} />
          <g className="av-head" style={{ animationDelay: "0.9s" }}>
            {/* chignon */}
            <circle cx={50} cy={17} r={9} fill={HAIR} />
            <path d="M20 58 q-2 -38 30 -38 q32 0 30 38 q-6 -6 -8 -18 q-10 6 -22 6 q-12 0 -22 -6 q-2 12 -8 18z" fill={HAIR} />
            <ellipse cx={50} cy={49} rx={26} ry={27} fill={SKIN} />
            <ellipse cx={23} cy={54} rx={4} ry={5} fill={SKIN_DARK} />
            <ellipse cx={77} cy={54} rx={4} ry={5} fill={SKIN_DARK} />
            <circle cx={23} cy={60} r={2.4} fill="#f2c14e" />
            <circle cx={77} cy={60} r={2.4} fill="#f2c14e" />
            <path d="M22 40 q6 -16 28 -16 q22 0 28 16 q-10 -8 -28 -8 q-18 0 -28 8z" fill={HAIR} />
            <Eyes reaction={reaction === "idle" ? "idle" : "happy"} alt />
            <g stroke={LINE} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.85}>
              <path d="M33 38 q5 -3 10 -1" />
              <path d="M67 38 q-5 -3 -10 -1" />
            </g>
            <path
              d="M44 57 q6 6 12 0"
              stroke={LINE}
              strokeWidth={2.2}
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx={32} cy={54} rx={5} ry={3} fill={BLUSH} opacity={0.3} />
            <ellipse cx={68} cy={54} rx={5} ry={3} fill={BLUSH} opacity={0.3} />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function AvatarScene({
  reaction = "idle",
  bubble,
  girlLean,
}: {
  reaction?: Reaction;
  bubble?: string;
  girlLean?: boolean;
}) {
  return (
    <div className="relative flex items-end justify-center gap-6 pb-1 pt-1 select-none">
      <div className="relative h-24 w-20 shrink-0 overflow-visible">
        <Boy reaction={reaction} />
        {bubble ? (
          <div
            key={bubble + reaction}
            className="av-bubble pointer-events-none absolute -top-1 left-[68%] z-10 whitespace-nowrap rounded-2xl rounded-bl-sm border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)]"
          >
            {bubble}
          </div>
        ) : null}
      </div>
      <div className="relative h-24 w-20 shrink-0">
        <Girl reaction={reaction} lean={girlLean} />
      </div>
    </div>
  );
}
