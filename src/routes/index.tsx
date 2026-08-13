import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { EscapeButton } from "@/components/EscapeButton";
import { Confetti } from "@/components/Confetti";
import { AvatarScene, type Reaction } from "@/components/Avatars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Un petit mot pour Tchoutchou 💌" },
      {
        name: "description",
        content:
          "Une petite expérience interactive, très sérieuse et scientifiquement rigoureuse, créée spécialement pour Tchoutchou.",
      },
      { property: "og:title", content: "Un petit mot pour Tchoutchou 💌" },
      {
        property: "og:description",
        content: "Quelques questions, un bouton qui fuit, et beaucoup d'igname. 😂",
      },
    ],
  }),
  component: Index,
});

/** Réponses gardées en mémoire — prêtes à être envoyées plus tard. */
type Answers = {
  question1: string;
  question2: string;
  nonAttempts: number;
  question3: string;
  question4: string;
  question5: string;
  availability: string;
};

const initialAnswers: Answers = {
  question1: "",
  question2: "",
  nonAttempts: 0,
  question3: "",
  question4: "",
  question5: "",
  availability: "",
};

const INTRO_PARAGRAPHS = [
  "Bonjour Tchoutchou 👋🏾",
  "Déjà, merci d'avoir ouvert mon site.",
  "Je sais que ça fait un moment qu'on ne s'est pas parlé. Je sais aussi que ça n'a pas été tout rose entre nous ces derniers temps et je suis conscient du gros toupet que j'ai de te recontacter malgré tout 😭.",
  "Mais si tu me le permets, j'avais envie de te voir.",
  "Je ne voyais toutefois pas de manière originale de te dire ça, et un simple message aurait été beaucoup trop lambda.",
  "Du coup, autant faire ce que je sais faire de mieux : taper sur mon clavier 👨🏾‍💻.",
  "J'ai donc décidé de créer un petit site web pour qu'on puisse interagir.",
  "Tu veux bien répondre aux quelques questions en bas ? 👀",
];

function Progress({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-2 rounded-full transition-all duration-500 ${
            n < step
              ? "w-2 bg-primary/50"
              : n === step
                ? "w-6 bg-primary"
                : "w-2 bg-border"
          }`}
        />
      ))}
    </div>
  );
}

function Choice({
  label,
  hint,
  small,
  selected,
  onSelect,
  disabled,
}: {
  label: string;
  hint?: string;
  small?: boolean;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <button
        type="button"
        disabled={disabled}
        onClick={onSelect}
        className={`btn-choice break-words ${small ? "text-[0.82rem]" : "text-base"} ${
          selected ? "btn-choice-selected" : ""
        }`}
      >
        {label}
      </button>
      {hint ? (
        <p className="mt-1 px-2 text-[0.68rem] leading-snug text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

function StepShell({ children, k }: { children: React.ReactNode; k: string | number }) {
  return (
    <div key={k} className="animate-rise space-y-4">
      {children}
    </div>
  );
}

function Index() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [selected, setSelected] = useState<string>("");
  const [reaction, setReaction] = useState<string>("");
  const [mood, setMood] = useState<Reaction>("idle");
  const [bubble, setBubble] = useState<string>("");
  const [girlLean, setGirlLean] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState(1);
  const [q5Phase, setQ5Phase] = useState<"choice" | "input">("choice");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (step !== 0 || visibleParagraphs >= INTRO_PARAGRAPHS.length) return;
    const t = setTimeout(() => setVisibleParagraphs((n) => n + 1), 550);
    return () => clearTimeout(t);
  }, [step, visibleParagraphs]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const advance = (delay: number) => {
    const t = setTimeout(() => {
      setSelected("");
      setReaction("");
      setMood("idle");
      setBubble("");
      setGirlLean(false);
      setStep((s) => s + 1);
    }, delay);
    timers.current.push(t);
  };

  const pick = (
    key: keyof Answers,
    value: string,
    reactionEmoji: string,
    delay = 800,
    nextMood: Reaction = "happy",
    bubbleText?: string,
  ) => {
    setSelected(value);
    setReaction(reactionEmoji);
    setMood(nextMood);
    setGirlLean(true);
    if (bubbleText) setBubble(bubbleText);
    setAnswers((a) => ({ ...a, [key]: value }));
    advance(delay);
  };

  return (
    <main className="flex min-h-[100dvh] w-full justify-center overflow-x-hidden px-4 py-6">
      {step === 6 ? <Confetti /> : null}
      <div className="w-full max-w-md">
        <section className="card-soft relative flex min-h-[80dvh] flex-col gap-5 p-5 sm:p-7">
          <Avatar />
          {step >= 1 && step <= 5 ? <Progress step={step} /> : null}

          <div className="flex-1">
            {step === 0 && (
              <StepShell k="intro">
                <div className="space-y-3">
                  {INTRO_PARAGRAPHS.slice(0, visibleParagraphs).map((p, i) => (
                    <p
                      key={p}
                      className={`animate-rise text-[0.98rem] leading-relaxed text-foreground/85 ${
                        i === 0 ? "font-display text-2xl font-semibold text-foreground" : ""
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell k="q1">
                <h1 className="font-display text-2xl font-semibold">Déjà, les politesses… 😌</h1>
                <p className="text-foreground/80">J'espère que tu vas bien.</p>
                <p className="text-lg font-semibold">Est-ce que tu te portes bien ?</p>
                <div className="space-y-3 pt-1">
                  {["Oui 🙂", "Non 😕", "Ah gars, je suis ein… 😭"].map((label) => (
                    <Choice
                      key={label}
                      label={label}
                      selected={selected === label}
                      disabled={!!selected}
                      onSelect={() => pick("question1", label, "🥹")}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell k="q2">
                <h2 className="font-display text-2xl font-semibold">
                  Ensuite… est-ce que tu accepterais de me parler ? 👀
                </h2>
                <p className="text-sm text-muted-foreground">
                  (N'appuie pas sur « Non » stp !! 😭)
                </p>
                <div className="space-y-3 pt-1">
                  <Choice
                    label="Oui 🙂"
                    selected={selected === "Oui 🙂"}
                    disabled={!!selected}
                    onSelect={() => pick("question2", "Oui 🙂", "🥳", 900)}
                  />
                  {selected ? null : (
                    <EscapeButton
                      onEscape={(attempt) =>
                        setAnswers((a) => ({ ...a, nonAttempts: attempt }))
                      }
                      onCaught={() => pick("question2", "Non", "😭😭😭", 1500)}
                    />
                  )}
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell k="q3">
                <h2 className="font-display text-2xl font-semibold">Pour aller plus loin…</h2>
                <p className="text-lg">
                  Si tu as répondu « Non » à la question précédente, est-ce que tu accepterais
                  qu'on se voie ? 👀
                </p>
                <div className="space-y-3 pt-1">
                  <Choice
                    label="Oui, je veux bien 🙂"
                    selected={selected === "Oui, je veux bien 🙂"}
                    disabled={!!selected}
                    onSelect={() => pick("question3", "Oui, je veux bien 🙂", "🤍")}
                  />
                  <Choice
                    small
                    label="Oui, je veux bien, mais je clique sur ce bouton parce que je ne trouve pas le bouton « Non », donc je veux bien. 🙄"
                    selected={selected.startsWith("Oui, je veux bien, mais")}
                    disabled={!!selected}
                    onSelect={() =>
                      pick(
                        "question3",
                        "Oui, je veux bien, mais je clique sur ce bouton parce que je ne trouve pas le bouton « Non », donc je veux bien. 🙄",
                        "😏",
                      )
                    }
                  />
                </div>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell k="q4">
                <h2 className="font-display text-2xl font-semibold">
                  Ça me fait plaisir que tu veuilles me voir :-)
                </h2>
                <p className="text-foreground/80">
                  Je pourrais te rendre visite et discuter un peu, si tu veux bien.
                </p>
                <p className="text-foreground/80">Et on ne rend jamais visite les mains vides…</p>
                <p className="text-lg font-semibold">Qu'est-ce que tu en penses ? 👀</p>
                <div className="space-y-3 pt-1">
                  <Choice
                    label="Oui s'il te plaît, je veux Igname 😌"
                    hint="Je sais que tu as lu sans mettre l'article lol. Il faut apprendre à mettre les articles sur vos mots 😂"
                    selected={selected === "Oui s'il te plaît, je veux Igname 😌"}
                    disabled={!!selected}
                    onSelect={() => pick("question4", "Oui s'il te plaît, je veux Igname 😌", "🍠")}
                  />
                  <Choice
                    small
                    label="Non c'est correct… mais la première réponse m'a intéressée 👀"
                    selected={selected.startsWith("Non c'est correct")}
                    disabled={!!selected}
                    onSelect={() =>
                      pick("question4", "Non c'est correct… mais la première réponse m'a intéressée 👀", "😂")
                    }
                  />
                  <Choice
                    small
                    label="T'inquiète, te voir va me rassasier. Ça va venir dans mes yeux, ça va remplir mon ventre. 😂"
                    selected={selected.startsWith("T'inquiète")}
                    disabled={!!selected}
                    onSelect={() =>
                      pick(
                        "question4",
                        "T'inquiète, te voir va me rassasier. Ça va venir dans mes yeux, ça va remplir mon ventre. 😂",
                        "🥰",
                      )
                    }
                  />
                </div>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell k="q5">
                {q5Phase === "choice" ? (
                  <>
                    <h2 className="font-display text-2xl font-semibold">
                      Quand est-ce que tu seras dispo alors, s'il te plaît ? 👀
                    </h2>
                    <div className="space-y-3 pt-1">
                      <Choice
                        label="Je suis là ein 🤷🏾‍♀️"
                        selected={selected === "Je suis là ein 🤷🏾‍♀️"}
                        disabled={!!selected}
                        onSelect={() => {
                          setSelected("Je suis là ein 🤷🏾‍♀️");
                          setAnswers((a) => ({ ...a, question5: "Je suis là ein 🤷🏾‍♀️" }));
                          timers.current.push(
                            setTimeout(() => {
                              setSelected("");
                              setQ5Phase("input");
                            }, 800),
                          );
                        }}
                      />
                      <Choice
                        small
                        label="Je suis une corporate girl très occupée 💅🏾, mais je crois que je peux accorder 2 minutes à un petit nouchi des rues dans ton genre."
                        selected={selected.startsWith("Je suis une corporate")}
                        disabled={!!selected}
                        onSelect={() => {
                          const v =
                            "Je suis une corporate girl très occupée 💅🏾, mais je crois que je peux accorder 2 minutes à un petit nouchi des rues dans ton genre.";
                          setSelected(v);
                          setAnswers((a) => ({ ...a, question5: v }));
                          timers.current.push(
                            setTimeout(() => {
                              setSelected("");
                              setQ5Phase("input");
                            }, 800),
                          );
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <form
                    className="animate-rise space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(6);
                    }}
                  >
                    <h2 className="font-display text-2xl font-semibold">😂 Okay okay…</h2>
                    <p className="text-lg">
                      Plus sérieusement, donne-moi un jour où tu serais dispo 👀
                    </p>
                    <input
                      value={answers.availability}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, availability: e.target.value }))
                      }
                      placeholder="Ex : samedi après 17h"
                      className="w-full rounded-2xl border border-input bg-background px-4 py-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                    <button type="submit" className="btn-primary-lg">
                      Envoyer 💌
                    </button>
                  </form>
                )}
              </StepShell>
            )}

            {step === 6 && (
              <StepShell k="final">
                <div className="space-y-3 py-4 text-center">
                  <p className="animate-pop text-5xl">🎉</p>
                  <h2 className="font-display text-3xl font-semibold">Okay :-)</h2>
                  <p className="text-lg">Je passerai donc aussitôt que possible !!</p>
                  <p className="text-lg font-semibold">On se voit bientôt 👋🏾❤️</p>
                  <p className="pt-3 text-sm text-muted-foreground">
                    Merci d'avoir participé à cette expérience extrêmement sérieuse et
                    scientifiquement rigoureuse. 😂
                  </p>
                </div>
              </StepShell>
            )}
          </div>

          {reaction ? (
            <p className="animate-pop text-center text-3xl" aria-hidden>
              {reaction}
            </p>
          ) : null}

          {step === 0 && visibleParagraphs >= INTRO_PARAGRAPHS.length ? (
            <button
              type="button"
              className="btn-primary-lg animate-rise"
              onClick={() => setStep(1)}
            >
              Bon… voyons ça 👀
            </button>
          ) : null}
        </section>

        <p className="pt-4 text-center text-xs text-muted-foreground">
          Fait avec ❤️ pour Tchoutchou
        </p>
      </div>
    </main>
  );
}
