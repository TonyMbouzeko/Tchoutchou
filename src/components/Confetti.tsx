const EMOJIS = ["❤️", "💕", "✨", "🎉", "💌", "🧡"];

export function Confetti({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${(i * 97) % 96}%`,
            animation: `fall ${3 + ((i * 7) % 25) / 10}s linear ${(i % 8) * 0.35}s infinite`,
          }}
        >
          {EMOJIS[i % EMOJIS.length]}
        </span>
      ))}
    </div>
  );
}