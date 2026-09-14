---
id: ADR-0007
title: Severity decides the action, not whether the event exists
status: accepted
date: 2026-09-14
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-19, A-02]
risks: [R-01, R-02, R-11]
metrics: [M-09, M-11]
questions: [Q-08]
---

# ADR-0007 — Severity decides the action, not whether the event exists

## Context

The earlier framing was suppression: most events are noise, so filter them out
and show the manager what survives. That framing has a defect hiding in it —
it makes every threshold a discard decision, and a discarded event is one nobody
can audit, learn from, or point at later.

The better framing: **every detected event is real and relevant. What differs is
what should happen about it.** Volume is high enough that a human cannot look at
each one ([[A-19]]), but that is an argument about *routing*, not about deletion.

## Decision

**Every detected event is retained, scored and contributes to the driver's
record. The severity band determines the action, and only the action.**

| Band | What happens | Footage |
|---|---|---|
| **Critical** — impact or collision-grade | Surfaced immediately, outside the weekly rhythm. Same-day expectation. | Pushed unconditionally ([[ADR-0002]]) |
| **High** — warrants a conversation | Surfaced individually in the weekly review set. Coaching is the expected outcome. | Pushed |
| **Medium** — the driver should know, the manager need not talk | Not surfaced individually. Grouped by driver and behaviour. Available action: send to the driver, at the manager's or depot manager's discretion. | Fetched on demand |
| **Low** — logged, not actioned | Never individually surfaced. Contributes to score and trend. Sampled in look-back review. | Fetched on demand |

**A band exists only if it has a distinct action.** That is the rule that stops
this becoming a five-point scale nobody can act on differently.

Nothing is hidden. The manager can always open any band and look.

## Alternatives considered

**Binary surface/suppress.** The original design. Rejected: it throws away
information we already paid to collect, and it turns every threshold into a
life-or-death cut with no recourse.

**Manager-configurable bands.** Rejected per [[ADR-0003]] — transfers our hardest
problem to the person least equipped to solve it.

**More bands, finer grading.** Rejected by the rule above: we can name four
genuinely distinct actions and no more. A band without its own action is
decoration that makes the ranking harder to explain.

## Consequences we accept

1. **The critical failure moves.** It is no longer "we suppressed something
   real" — it is **mis-grading between medium and high**, where an event that
   deserved a conversation becomes a notification instead. That is the thing
   look-back review exists to catch ([[ADR-0008]]).
2. **[[M-11]] changes meaning.** It is no longer "share suppressed" but share
   routed to each band, plus a sampled look-back on the medium and low bands.
   Better: nothing is hidden, so the counter-metric measures grading quality
   rather than concealment.
3. **The medium band depends on a channel we do not own.** Sending to the driver
   requires a delivery route that is out of scope in v1 ([[ADR-0004]]). The
   *action* is defined here; the *delivery* is a dependency, and until it exists
   the medium band degrades to grouped visibility with no outbound step.
4. **Explaining four bands is harder than explaining a queue.** Accepted,
   because the alternative is explaining why we deleted something.

## Revisit when

The look-back sample shows systematic mis-grading at the medium/high boundary,
or the driver channel ships and the medium band's action becomes real rather
than defined.
