import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { EscapeButton } from "@/components/EscapeButton";
import { Confetti } from "@/components/Confetti";
import { AvatarScene, type Reaction } from "@/components/Avatars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Massah" },
      {
        name: "description",
        content:
          "Une petite expérience interactive, très sérieuse et scientifiquement rigoureuse, créée spécialement pour Tchoutchou.",
      },
      { property: "og:title", content: "Massah" },
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
};

const initialAnswers: Answers = {
  question1: "",
  question2: "",
  nonAttempts: 0,
  question3: "",
  question4: "",
  question5: "",
};

const INTRO_PARAGRAPHS = [
  "Bonjour Tchoutchou 👋🏾",
  "Déjà, merci d'avoir cliqué sur mon lien, si tu te demandes où tu es, tu sur un site web que j'ai conçu moi même.",
  "Je sais que ça fait un moment qu'on ne s'est pas parlé, pour plusieurs raisons valables biensûr. Je sais aussi que ça n'a pas été tout rose entre nous ces derniers temps et je suis conscient du gros toupet que j'ai de te recontacter malgré tout.",
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
  const [otherAvailability, setOtherAvailability] = useState("");
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
      <div className="w-full max-w-md">
        <section className="card-soft relative flex min-h-[80dvh] flex-col gap-5 p-5 sm:p-7">
          {step !== 6 ? <AvatarScene reaction={mood} bubble={bubble} girlLean={girlLean} /> : null}
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
                  {["Oui 🙂", "Non 😕", "Mon frère... dis ce que tu veux tu dégages 🙄"].map((label) => (
                    <Choice
                      key={label}
                      label={label}
                      selected={selected === label}
                      disabled={!!selected}
                      onSelect={() =>
                        pick(
                          "question1",
                          label,
                          "🥹",
                          800,
                          label.startsWith("Oui") ? "happy" : "sad",
                          label.startsWith("Oui") ? "Ça me va 😌" : "Mama!!! C'est la geurre?? 👀",
                        )
                      }
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell k="q2">
                <h2 className="font-display text-2xl font-semibold">
                  Ensuite… je vais aller droit au but. comme je t'ai dit dans mon message précédent, je voulais te voir, et je me suis dis pourquoi ne pas joinre l'utile à l'agréable? je voulais proposer quelque chose vite fait, mais je ne sais pas si tu seras partante. Je comprendrais biensûr si tu ne l'es pas? 👀
                </h2>
                <p className="text-sm text-muted-foreground">
                  (N'appuie pas sur « Non » stp !! 😭)
                </p>
                <div className="space-y-3 pt-1">
                  <Choice
                    label="Dis toujours, on verra 🙄"
                    selected={selected === "Dis toujours, on verra 🙄"}
                    disabled={!!selected}
                    onSelect={() => pick("question2", "Dis toujours, on verra 🙄", "🥳", 1100, "excited", "Oh 👀")}
                  />
                  {selected ? null : (
                    <EscapeButton
                      onEscape={(attempt) =>
                        setAnswers((a) => ({ ...a, nonAttempts: attempt }))
                      }
                      onCaught={() => pick("question2", "Non", "😭😭😭", 1500, "sad", "Bon… 😭")}
                    />
                  )}
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell k="q3">
                <h2 className="font-display text-2xl font-semibold">Pour aller plus loin…</h2>
                <p className="text-lg">
                  Je sais que tu as essayé de répondre "non" à la question précédente, Mais bon... c'est mon site je fais un peu ce que je veux 💅🏾😼. Bon... Est-ce que tu accepterais
                  de m'accompagner quelque part ? 👀
                </p>
                <div className="space-y-3 pt-1">
                  <Choice
                    label="Ahhhhiii, Oui, je veux bien, mais faut dire l'affaire là on quitte dessus. 🤨 "
                    selected={selected === "Oui, je veux bien 🙂"}
                    disabled={!!selected}
                    onSelect={() => pick("question3", "Oui, je veux bien 🙂", "🎊", 1000, "happy", "Ça me va 😌")}
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
                        1000,
                        "embarrassed",
                        "Je prends ça 😂",
                      )
                    }
                  />
                </div>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell k="q4">
                <h2 className="font-display text-2xl font-semibold">
                  Ça me fait plaisir que tu sois partante!!
                </h2>
                <p className="text-foreground/80">
                  Je pourrais joindre l'utile à l'agréable.
                </p>
                <p className="text-foreground/11000">Peut être tu ne le sais pas, mais j'aime beaucoup la Mythologie grecque, et je voulais aller voir l'Odyssée de Christopher  Nolan au cinéma. Tu as surement dû voir ça passer sur les réseaux, si tu ne l'as pas déjà vu (je n'espère pas).</p>
                <p className="text-lg font-semibold">Qu'est-ce que tu en penses ? 👀</p>
                <div className="space-y-3 pt-1">
                  <Choice
                    label="Bon, vu que c'est si gentillement demandé... Je veux bien y refléchir 😌"
                    selected={selected === "Bon, vu que c'est si gentillement demandé... Je veux bien y refléchir 😌"}
                    disabled={!!selected}
                    onSelect={() =>
                      pick("question4", "Bon, vu que c'est si gentillement demandé... Je veux bien y refléchir 😌",  "🥹", 1100, "excited", "Yeaaah!! 😌")
                    }
                  />
                  <Choice
                    small
                    label="Bofffff... Je ne suis pas fan de cinéma, ni de film (cette réponse c'est seulement pour te ragebait.) 👀"
                    selected={selected.startsWith("Bofffff... Je ne suis pas fan de cinéma, ni de film")}
                    disabled={!!selected}
                    onSelect={() =>
                      pick(
                        "question4",
                        "Bofffff... Je ne suis pas fan de cinéma, ni de film (cette réponse c'est seulement pour te ragebait.) 👀",
                        "😤",
                        1100,
                        "laugh",
                        "EKIE 😲",
                      )
                    }
                  />
                </div>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell k="q5">
                <h2 className="font-display text-2xl font-semibold">
                  Il ya 2 séances ce Samedi, une à 18h30 et une à 22h15 au cinéplex, Laquelle est meilleure pour toi s'il te plaît ? 👀
                </h2>
                <div className="space-y-3 pt-1">
                  <Choice
                    label="Je suis une corporate girl très occupée 💅🏾, mais je crois que je peux accorder 2 minutes à un petit nouchi des rues dans ton genre. Je pense que j'ai du temps à 18h30"
                    selected={selected === "18h30"}
                    disabled={!!selected}
                    onSelect={() => {
                      setSelected("18h30");
                      setMood("happy");
                      setBubble("Yeessssooo!! 😌");
                      setGirlLean(true);
                      setAnswers((a) => ({ ...a, question5: "18h30" }));
                      fetch("https://formspree.io/f/maewboep", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                        },
                        body: JSON.stringify({
                          ...answers,
                          question5: "18h30",
                        }),
                      }).catch((error) => console.error("Erreur Formspree :", error));
                      timers.current.push(
                        setTimeout(() => {
                          setSelected("");
                          setMood("idle");
                          setBubble("");
                          setGirlLean(false);
                          setStep(6);
                        }, 1100),
                      );
                    }}
                  />
                  <Choice
                    label="Écoute, tu n'es pas assez important pour que je t'accorde du temps en journée, mais je pense que j'ai du temps à 22h15"
                    selected={selected === "22h15"}
                    disabled={!!selected}
                    onSelect={() => {
                      setSelected("22h15");
                      setMood("laugh");
                      setBubble("Hayyyyaaar!!");
                      setGirlLean(true);
                      setAnswers((a) => ({ ...a, question5: "22h15" }));
                      fetch("https://formspree.io/f/maewboep", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                        },
                        body: JSON.stringify({
                          ...answers,
                          question5: "22h15",
                        }),
                      }).catch((error) => console.error("Erreur Formspree :", error));
                      timers.current.push(
                        setTimeout(() => {
                          setSelected("");
                          setMood("idle");
                          setBubble("");
                          setGirlLean(false);
                          setStep(6);
                        }, 1100),
                      );
                    }}
                  />

                  <Choice
                    label="Aucun des deux je travaille ce jour, ou j'ai déjà un programme😅"
                    selected={selected === "autre"}
                    disabled={selected !== "" && selected !== "autre"}
                    onSelect={() => {
                      setSelected("autre");
                      setMood("surprised");
                      setBubble("Ahh 😭");
                      setGirlLean(false);
                    }}
                  />

                  {selected === "autre" && (
                    <form
                      className="animate-rise space-y-3 pt-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const disponibilite = otherAvailability.trim();
                        if (!disponibilite) return;

                        setAnswers((a) => ({
                          ...a,
                          question5: `Autre disponibilité : ${disponibilite}`,
                        }));

                        fetch("https://formspree.io/f/maewboep", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                          body: JSON.stringify({
                            ...answers,
                            question5: "Autre disponibilité",
                            disponibilite,
                          }),
                        }).catch((error) =>
                          console.error("Erreur Formspree :", error),
                        );

                        setMood("happy");
                        setBubble("Okay, ça marche 😌");

                        timers.current.push(
                          setTimeout(() => {
                            setSelected("");
                            setMood("idle");
                            setBubble("");
                            setGirlLean(false);
                            setStep(6);
                          }, 1100),
                        );
                      }}
                    >
                      <input
                        type="text"
                        value={otherAvailability}
                        onChange={(e) => setOtherAvailability(e.target.value)}
                        required
                        placeholder="Dis-moi quand tu serais disponible 👀"
                        className="w-full rounded-2xl border border-input bg-background px-4 py-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
                      />

                      <button type="submit" className="btn-primary-lg">
                        Envoyer 😌
                      </button>
                    </form>
                  )}
                </div>
              </StepShell>
            )}

            {step === 6 && (
  <StepShell k="final">
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-5">
      <img
        src="/final-photo.jpg"
        alt="Photo finale"
        className="animate-rise max-h-[60dvh] w-full rounded-3xl object-contain"
      />

      <h2 className="animate-rise text-center font-display text-2xl font-semibold">
        T'inquiète j'ai déjà reçu ta réponse. On se voit alors bientôt! 😌. 
      </h2>
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
      </div>
    </main>
  );
}