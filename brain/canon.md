---
id: CANON
title: Canon — rules this product brain does not break
status: active
owner: danny
adversarial_pass: ran 2026-09-14
---

# Canon

Standing rules for this repository. They bind me and they bind any agent working
in here. If a rule needs to change, it changes by a new decision record
([[decisions/]]) with a reason — not by quietly writing around it.

Canon is what makes the rest of the brain trustworthy. Without it a knowledge
base is just a folder of confident prose.

---

## 1. Provenance

**C-01 — Every claim is traceable or it is labelled an assumption.**
No number, benchmark or market fact appears anywhere in this repo or in the
submission unless it is either (a) measured, with a named source, or (b) an
entry in `registers/assumptions.yaml` with a confidence, an impact and a
validation plan.

**C-02 — No invented evidence, ever.**
No fabricated statistics, no invented customer quotes, no imagined CameraMatics
internals, no citations that were not read. An agent that does not know says
so and opens a question in `registers/questions.yaml`. A plausible number is
more dangerous than a blank.

**C-03 — Ranges, not false precision.**
Where an assumption is quantified it carries a range. "50–450 events a day"
is honest; "312 events a day" is a lie with a decimal point.

**C-04 — Distinguish what was said from what was inferred.**
Customer input, engineering input and my own inference are marked as such. My
inference is not evidence and does not get promoted to fact because it has been
restated three times.

## 2. Product judgement

**C-05 — Manager attention is the scarce resource.**
Any change that adds items to the review queue must say what it removes. This
is the spine of the capability ([[problem]]); a feature that increases what a
human must look at needs to justify itself against it explicitly.

**C-06 — Nothing reaches a human that has not earned it.**
Grading, grouping and scoring are product features with owners and metrics, not
configuration we hand to the customer.
*Amended by [[decisions/ADR-0007]]: "not reaching a human" now means routed to a
lower band, never discarded. Every event is retained and contributes to the
driver record; the band decides the action.*

**C-07 — The top of the queue must be defensible to the driver in the clip.**
If a manager could not justify the event to the person who was driving, it does
not belong at the top. Fairness is a design constraint, not a policy footnote.

**C-08 — No feature justified by competitor parity alone.**
"Samsara has it" is context, not a reason. The reason is the job in
[[jtbd]] and the metric it moves.

**C-09 — Requirements describe behaviour, not implementation.**
The portal requirements say what must be true for the fleet manager. Where a
requirement constrains implementation, it says why, and that why is an ADR.

## 3. Traceability (enforced by `scripts/validate.py`)

**C-10 — Every requirement links to at least one metric, exactly one phase, and
has at least one acceptance criterion.** A story that moves no metric is not a
requirement; it is a preference.

**C-11 — Every acceptance criterion is testable.**
Given/When/Then, with an observable outcome. "Intuitive", "fast", "seamless"
and "user-friendly" are banned from acceptance criteria — if speed matters,
state the number.

**C-12 — Every risk carries a mitigation or an open question.**
A risk with neither is decoration.

**C-13 — Every outcome or behaviour metric has a counter-metric.**
We do not ship a target without stating how it could be gamed or how hitting it
could still be a bad outcome.

**C-14 — IDs are permanent.**
`US-`, `ADR-`, `A-`, `R-`, `M-`, `Q-` prefixes, never renumbered, never reused.
Superseded items are marked superseded and kept. History is the point.

**C-15 — No orphans and no dangling links.**
Every `[[link]]` resolves. Every assumption and risk is referenced by something.
CI fails the build otherwise.

## 4. Decisions

**C-16 — Decisions are records, not edits.**
A reversal is a new ADR that supersedes the old one, stating what changed in the
world. Deleting the wrong turn destroys the most useful thing in the repo.

**C-17 — Every ADR states the alternatives that were actually considered and the
consequence we accepted.** An ADR with no rejected option was not a decision.

**C-18 — Scope cuts are recorded as decisions.**
Anything deliberately excluded from v1 gets an ADR explaining why, so that
"you forgot X" can be answered with "no, here is the trade-off I took".

## 5. Working with agents

**C-19 — The brain is the source; artefacts are generated.**
The deck, the PRD and the traceability matrix are outputs. If the deck and the
brain disagree, the brain is wrong and gets fixed, or the deck is stale and gets
regenerated. Never patch only the output.

**C-20 — Agents may not invent inputs, silently widen scope, or resolve an open
question.** They draft, structure, challenge and check. Closing a question
requires evidence from a human.

**C-21 — Skills are versioned and inspectable.**
Every document type produced with agent assistance has a skill in `skills/`
describing how it is produced. If the output shape matters, the recipe is in
the repo, not in a chat log.

**C-22 — I own everything in here.**
Agent-drafted is fine; unread is not. Nothing stays in this repo that I cannot
defend cold, without the file open.

**C-23 — Provenance is a field, not a footnote.**
Every artefact states who drafted it, who decided it, and whether the
adversarial pass ran. `status: proposed` and `status: ratified` are different
things and the repo never blurs them.

**C-24 — If the adversarial pass did not run, the handover says so.**
An unreviewed artefact and a reviewed one are different objects. The difference
is never silent, and "assume it was checked" is not available.

## 6. What agents do not decide

The division of labour only means something if the line is written down. Agents
draft, structure, enumerate options, hold cross-references consistent, enforce
the schema, and attack the work. They do not make the calls below — and where
one has proposed a call, it is logged as `proposed` in [[judgement-log]] until a
human ratifies it.

**C-25 — Not agent decisions:**

1. **What the product is for** — the spine, the primary user, the job to be done.
2. **What is cut.** Scope decisions are the job. An agent that quietly widens
   scope to be helpful has done the opposite.
3. **What counts as high severity** — the threshold at which we interrupt a human
   about another human's driving. This is an ethical call before it is a
   modelling one ([[C-07]]).
4. **Which risk we accept.** An agent can enumerate and price risks. Deciding to
   ship with one open is accountability, and accountability does not delegate.
5. **What we tell a customer** — any outcome claim, any number in a commercial
   artefact.
6. **Pricing and packaging.**
7. **Closing an open question.** Questions close on evidence from a human, never
   on an agent's confidence ([[C-20]]).

**C-27 — A reversal records why the recommendation was rejected, not only what
replaced it.**
When an agent's proposal is overruled, [[judgement-log]] states the agent's
reasoning, the specific flaw in it, and the class of error. "The human decided
otherwise" is not evidence of judgement — it is evidence of a preference. The
reason is the whole artefact, and the recurring classes of error are the most
useful thing the log produces, because they say where to watch next time.

**C-26 — The machine enforces the rules; a human writes them.**
`scripts/validate.py` is the most automated thing in this repo and it is pure
judgement in written form. Every rule it checks was a choice about what good
looks like. That is the division of labour in one file, and it is why the
validator is committed rather than described.

## 7. AI in the product

**C-28 — AI goes into the product only where it demonstrably beats a rule.**
The brief asks for AI nowhere except where edge vision already requires it. So
nothing in triage, scoring, grouping, routing or coaching gets a model because a
model was available. The test, before any model ships: say what it does that a
deterministic rule cannot; name the failure mode it introduces — unexplainable
ranking, drift, no ground truth to measure against; and show why that is worth
paying. Where a rule and a model are close, ship the rule. A rule is explainable
to a fleet manager, debuggable by an engineer, and reversible in an afternoon.

Note the asymmetry, because it is deliberate: this repository is heavily
agent-produced, and it argues for restraint about putting AI in the product.
Those are not in tension. They are the same judgement applied twice — use the
tool where it earns its place, and not where it does not.

## 8. Adoption

**C-29 — A tool that is not being used is a failure of the tool.**
Non-use is a product defect, not a customer-success problem and not a
characteristic of the user. If a fleet manager stops opening the review set, the
finding is about what we built. This rule exists because the opposite reflex —
"they aren't engaging" — is available, comfortable, and has killed more
capabilities in this category than bad detection ever has.

The practical consequence: adoption metrics are release gates, not reporting.
[[M-07]] falling is a P1.

## 9. What the system is for

**C-30 — Praise the good, coach the bad.**
A system that only detects failure makes the best achievable outcome
*invisibility* — do everything right and nothing happens, and the only time the
product speaks to you is to criticise. That is how a safety tool becomes the
thing drivers resent, and it makes "driver advocate" a claim the product
contradicts every day.

So a driver action that avoids harm is recognised, not merely not-penalised
([[decisions/ADR-0010]]). Zero events is not the ceiling.

Two disciplines make this real rather than decorative. Recognition is
**specific and evidenced** — a named act on a named day with the clip attached,
never a badge, a streak or a score. And it is **confirmed by a human** before it
reaches a driver, because unearned praise costs more credibility than silence.
