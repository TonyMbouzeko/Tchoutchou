# Tchoutchou's Little Game

Create a small, playful, cute and polished interactive website designed primarily for MOBILE use.

The website is a personal interactive experience sent to one person named "Tchoutchou". It should feel like a playful conversation rather than a traditional form.

IMPORTANT:

The entire website content must be in French.

Keep the exact informal/Ivorian expressions used in the text.

Prioritize mobile responsiveness because the recipient will most likely open it from her phone.

Do NOT create authentication.

Do NOT connect a database yet.

Keep the code clean so Supabase can be connected later to save the answers.

Each question should feel like a separate step/card rather than displaying a long form.

Use smooth animations between steps.

The overall tone should be cute, playful, slightly romantic, humorous and intentionally over-the-top.

Do not make the design childish.

VISUAL STYLE

Create a modern, minimal and elegant interface.

Use:

rounded cards

subtle shadows

smooth transitions

tasteful emojis

a warm background

large readable typography

buttons large enough for mobile

small micro-animations when answers are selected

The central card should occupy most of the mobile screen without feeling crowded.

At the top of the conversation, leave a circular placeholder for an avatar/profile image that I will replace later.

Add a subtle progress indicator such as:

● ○ ○ ○ ○

which progresses as questions are answered.

INTRODUCTION

Display an avatar at the top.

Then show this message progressively, either with a subtle typing animation or small paragraph fade-ins:

"Bonjour Tchoutchou 👋🏾

Déjà, merci d'avoir ouvert mon site.

Je sais que ça fait un moment qu'on ne s'est pas parlé. Je sais aussi que ça n'a pas été tout rose entre nous ces derniers temps et je suis conscient du gros toupet que j'ai de te recontacter malgré tout 😭.

Mais si tu me le permets, j'avais envie de te voir.

Je ne voyais toutefois pas de manière originale de te dire ça, et un simple message aurait été beaucoup trop lambda.

Du coup, autant faire ce que je sais faire de mieux : taper sur mon clavier 👨🏾‍💻.

J'ai donc décidé de créer un petit site web pour qu'on puisse interagir.

Tu veux bien répondre aux quelques questions en bas ? 👀"

At the bottom add a button:

"Bon… voyons ça 👀"

Clicking it launches Question 1.

QUESTION 1

Display:

"Déjà, les politesses… 😌

J'espère que tu vas bien.

Est-ce que tu te portes bien ?"

Three buttons:

"Oui 🙂"

"Non 😕"

"Ah gars, je suis ein… 😭"

When any answer is selected:

visually highlight the selected answer

briefly show a small reaction

wait approximately 600–900 ms

smoothly transition to Question 2.

Keep the selected answer in the application's state because it will later be sent to Supabase.

QUESTION 2

Display:

"Ensuite… est-ce que tu accepterais de me parler ? 👀"

Below it, in smaller text:

"(N'appuie pas sur « Non » stp !! 😭)"

Buttons:

"Oui 🙂"

"Non"

SPECIAL BEHAVIOR FOR THE "NON" BUTTON:

The "Non" button should playfully escape when the user attempts to click/tap it.

It must remain INSIDE the visible card/screen and must NEVER become impossible to see.

For mobile:
When the user taps it, move it to another random position within a safe visible area.

For desktop:
It may move when the mouse approaches it or when clicked.

Make it escape exactly 6 times.

Change its text during the attempts:

Attempt 1:
"Non"

Attempt 2:
"J'ai dit n'appuie pas 😭"

Attempt 3:
"Tchoutchou ??? 😭"

Attempt 4:
"Tu forces ein"

Attempt 5:
"Pourquoi tu me fais ça ? 😭"

Attempt 6:
"Bon d'accord..."

After six escapes, stop moving the button and allow it to be clicked.

If she chooses "Oui 🙂":
Show a happy micro-animation and continue.

If she eventually clicks "Non":
Show a funny crying animation.

Use animated crying emojis such as 😭😭😭 with a tasteful animation.

After approximately 1.5 seconds continue to Question 3.

Store both:

the final answer

the number of attempts made on the Non button.

QUESTION 3

Display:

"Pour aller plus loin…

Si tu as répondu « Non » à la question précédente, est-ce que tu accepterais qu'on se voie ? 👀"

There must intentionally be NO "Non" button.

Only display these two buttons:

"Oui, je veux bien 🙂"

and

"Oui, je veux bien, mais je clique sur ce bouton parce que je ne trouve pas le bouton « Non », donc je veux bien. 🙄"

Make the second button slightly smaller if necessary to fit nicely on mobile.

When selected, save the exact selected answer and transition to Question 4.

QUESTION 4

Display:

"Ça me fait plaisir que tu veuilles me voir :-)

Je pourrais te rendre visite et discuter un peu, si tu veux bien.

Et on ne rend jamais visite les mains vides…

Qu'est-ce que tu en penses ? 👀"

Provide three buttons.

BUTTON 1:

"Oui s'il te plaît, je veux Igname 😌"

Under this button, in very small playful text:

"Je sais que tu as lu sans mettre l'article lol. Il faut apprendre à mettre les articles sur vos mots 😂"

BUTTON 2:

"Non c'est correct… mais la première réponse m'a intéressée 👀"

BUTTON 3:

"T'inquiète, te voir va me rassasier. Ça va venir dans mes yeux, ça va remplir mon ventre. 😂"

Make sure long answers wrap beautifully on mobile.

Save the exact selected response.

Then transition to Question 5.

QUESTION 5

Display:

"Quand est-ce que tu seras dispo alors, s'il te plaît ? 👀"

Two playful answers:

"Je suis là ein 🤷🏾‍♀️"

and

"Je suis une corporate girl très occupée 💅🏾, mais je crois que je peux accorder 2 minutes à un petit nouchi des rues dans ton genre."

After she chooses one, show:

"😂 Okay okay…

Plus sérieusement, donne-moi un jour où tu serais dispo 👀"

Display an optional text input where she can type something naturally such as:

"Samedi", "Dimanche après-midi", "Après 18h", etc.

Do NOT force a date picker.

Placeholder:

"Ex : samedi après 17h"

Button:

"Envoyer 💌"

Store both:

the playful Question 5 answer

the written availability.

FINAL SCREEN

After pressing "Envoyer 💌", display a celebratory but tasteful animation.

Then display:

"Okay :-)"

"Je passerai donc aussitôt que possible !!"

"On se voit bientôt 👋🏾❤️"

Below that, add:

"Merci d'avoir participé à cette expérience extrêmement sérieuse et scientifiquement rigoureuse. 😂"

Optionally animate a few hearts/confetti particles, but keep it elegant and not excessive.

TECHNICAL REQUIREMENTS

Structure the application so answers are stored in a single JavaScript/React object, for example:

{
question1: "",
question2: "",
nonAttempts: 0,
question3: "",
question4: "",
question5: "",
availability: ""
}

Do not send this data anywhere yet.

Keep it in state/local application memory.

Later I will connect Supabase and save this object when the final "Envoyer" button is pressed.

Make all animations smooth.

Ensure the escaping Non button works properly on:

iPhone

Android

desktop browsers

Prevent horizontal scrolling.

The escaping button must always remain completely visible.

The site should look intentionally designed, not like a generic survey/form.

The final result should feel like an interactive conversation created personally for Tchoutchou.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d40f8e32-f3ff-40b4-b69a-364122d9b82b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
