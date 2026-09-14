# Skill: UX Writing

*New for this brain. Two sources: Material's communication principles, kept
deliberately lite, and CameraMatics' own voice as observed on their public site
in September 2026. Neither invented — see Sources at the foot.*

## When to use

Any user-visible string: buttons, labels, headings, empty states, absence and
error states, notifications, confirmation copy, and the exact wording quoted in
acceptance criteria. Use it when writing tickets ([[user-stories]]) and when
building the prototype — a prototype with placeholder copy tests the layout and
nothing else.

---

## The voice, in one paragraph

Professional, practical, operator-focused. Second person throughout — "you",
"your drivers". Specific rather than enthusiastic: confidence comes from naming
the thing precisely, not from adjectives. Mid-length sentences. Domain words the
reader already owns (telematics, event, depot, FNOL) are fine unexplained;
everything else gets plain English. Protective, never punitive.

## The rule that matters most here

**CameraMatics' public voice already frames the camera as the driver's
advocate** — "exonerate drivers", "indisputable evidence to protect against
false claims", "extra eyes and ears", "empowering drivers". The words
*violation*, *infraction* and *offence* appear nowhere on their site.

So punitive UI copy would not just be unkind, it would **contradict the
company's own brochure** — and the driver, who may well be shown this screen
during a coaching conversation, is the person who notices.

---

## Material, lite

Four principles, applied rather than quoted at length.

1. **Be concise, but not robotic.** Short, scannable text on a limited number of
   ideas. Concise is not clipped: "Footage not available yet" beats both "Error"
   and a paragraph.
2. **Write simply and directly.** Every time you write something, ask whether
   there is an easier way to say it.
3. **Address the reader clearly.** Second person. Never mix "you" and "my" in
   the same interface.
4. **Communicate only essential details.** What is needed for the task in hand,
   especially where the next click has consequences.

Mechanics that follow from those, and are house rules rather than quotations:

- **Sentence case everywhere.** Headings, buttons, labels, table headers.
- **No full stop on buttons and labels.** Full sentences in body copy get one.
- **Active voice, present tense.** "The vehicle has been offline since 14:20",
  not "has been detected as offline".
- **Front-load.** The first three words carry the meaning; the reader may not
  get to the rest.
- **Numbers as numerals**, including one to nine — this is an operational tool,
  not prose.

---

## Product rules

**W-01 — Every string about a driver must be defensible to that driver.**
Assume they will read it, because during a coaching conversation they will.
This is [[../brain/canon]] C-07 expressed as copy.

**W-02 — Describe behaviour, never character.** "Hard braking, 42 mph zone" is a
fact. "Aggressive driver" is a verdict, and we are not entitled to it.

**W-03 — Never blame the reader for our failure.** "14 events closed unreviewed
last week" reports what happened. "You have 14 unreviewed events" blames a
person for a system's behaviour ([[../brain/canon]] C-29).

**W-04 — Absence states carry three things**: what is missing, why, and what the
reader can do now. A state that says only "unavailable" makes the reader
distrust everything else on the screen.

**W-05 — Buttons name the action and its consequence.** "Log coaching
conversation", not "Submit". If a button is irreversible, the label says so.

**W-06 — Never celebrate the tool. Always be specific about the person.**
No streaks, no confetti, no badges, no "Great job!". A cleared review set gets a
calm acknowledgement, not a party — this is a product about people being injured
on roads and the copy should never forget it.

That is not the same as never praising. Under [[../brain/decisions/ADR-0010]]
the product recognises drivers whose actions avoided harm, and recognition copy
is **specific, evidenced and about the act**:

> ✗ Nice work this week! 🎉 3-week safe streak
> ✓ Tuesday 14:06, Mill Lane. You stopped in time for a cyclist who came out of
>   the junction. Reviewed and confirmed by Sam Okafor.

The first is gamification of injury. The second is a person being told that
something they did was seen and mattered. The distinction is whether the copy
points at a real act with evidence attached, or at a number going up.

**W-07 — Any number on screen traces to a metric definition** and is never
rounded in a direction that flatters us ([[../brain/canon]] C-01).

**W-08 — Use the system's vocabulary only where the reader already shares it.**
"Event" yes. "Severity band" in an internal tooltip, maybe. "Suppression
threshold" never.

---

## Patterns

**Empty state — the payoff of the whole design, and the most important copy in
the product.**

> ✗ No results found.
> ✓ Nothing needs your attention this week.
>   47 events were graded and handled without you. You can look at any of them.

**Absence of footage.**

> ✗ Error loading video.
> ✓ Footage not available yet. This vehicle has been offline since 14:20 on
>   Tuesday and will upload when it reconnects. You can still dismiss this event.

**An event, described.**

> ✗ Harsh braking violation — severity 8.2
> ✓ Hard braking. 42 mph zone, Tuesday 09:14.
>   Graded high: deceleration in the top few percent, with a vehicle ahead.

**Unreviewed work.**

> ✗ You have 14 unreviewed events.
> ✓ 14 events closed unreviewed last week.

**An outcome claim.**

> ✗ Your fleet is 23% safer.
> ✓ 12 of 40 coached drivers had fewer events in the following four weeks.

---

## Words

**Use:** event · coaching conversation · driver · review · dismiss · footage ·
needs a look · closed unreviewed · graded · vehicle offline · avoided ·
stopped in time · recognised · confirmed by

**Never:** violation · infraction · offence · offender · culprit · guilty ·
caught · bad driver · punishment · flagged for discipline

**Never, in recognition copy:** streak · score · points · badge · level ·
leaderboard · "safest driver" · any emoji

**Also never** (ordinary UI sins): oops · whoops · simply · just · easily ·
seamless · leverage · utilise · unfortunately · please note · are you sure

---

## In acceptance criteria

Where copy is load-bearing — an empty state, an absence state, a destructive
confirmation — the acceptance criterion quotes the **exact string**, because
"shows an appropriate message" is untestable and will be resolved by whoever
writes the code last ([[../brain/canon]] C-11).

> Given the vehicle has been offline since before the event,
> when the manager opens the event,
> then the footage panel reads "Footage not available yet. This vehicle has been
> offline since {time} and will upload when it reconnects."
> and the Dismiss action remains available.

Everywhere else, the criterion describes behaviour and the copy is free to
improve without a ticket.

---

## Sources

- CameraMatics voice observed from their public site, September 2026:
  [fleet managers](https://www.cameramatics.com/us/fleet-managers/),
  [drivers](https://www.cameramatics.com/drivers/),
  [Safety Centre](https://www.cameramatics.com/modules/safety-center/).
  Public marketing pages, subject to [[../brain/registers/assumptions]] A-18.
- Material's communication principles:
  [Material's Communication Principles: Intro to UX Writing](https://codelabs.developers.google.com/codelabs/material-communication-guidance),
  Google Codelabs. The mechanics section is derived house style, not quotation.
