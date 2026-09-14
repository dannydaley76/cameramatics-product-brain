---
id: ADR-0010
title: What kind of event it was is a separate question from how much attention it needs
status: accepted
date: 2026-09-14
supersedes: none
amends: ADR-0007
decided_by: danny
drafted_by: agent
adversarial_pass: ran 2026-09-14
assumptions: [A-11, A-12]
risks: [R-04, R-12, R-13]
metrics: [M-08, M-12, M-13]
questions: [Q-08]
---

# ADR-0010 — Classification is orthogonal to severity

## Context

[[ADR-0007]] grades every event into four severity bands and routes it
accordingly. That model has a defect, and it is not a gap — it is actively
wrong.

Consider a driver who brakes hard because a child steps out. Under the design as
it stood, that is a high-severity harsh-braking event, it enters the weekly
review set, and the expected outcome is a coaching conversation. **We would
coach a driver for preventing a collision.**

The deeper problem is structural. A system that only detects the bad makes the
best available outcome *invisibility*: do everything right and nothing happens.
Attention only ever arrives as criticism. That is how a safety tool becomes the
thing drivers resent, and it sits directly against how this company already
talks about drivers — "exonerate", "extra eyes and ears", "empowering drivers".
A purely negative detector cannot be a driver advocate whatever the brochure
says.

## Decision

**Severity and classification are two separate axes.**

- **Severity** (from [[ADR-0007]]) answers *how much attention does this need* —
  critical, high, medium, low. Unchanged.
- **Classification** answers *what kind of event was this* — and determines the
  outcome:

| Classification | What it means | Outcome |
|---|---|---|
| **Risk** | The driver's own handling created avoidable risk | Coaching conversation |
| **Neutral** | Real event, not the driver's doing — cut up, road surface, another party | Recorded as evidence on the driver's side, no action |
| **Credit** | The driver's action avoided or reduced harm | Recognition, confirmed by the manager |

A hard brake is high-severity either way. Whether it earns coaching or
recognition is a different judgement, made with the corroborating signals we
already collect.

**The system proposes a classification; the manager confirms it.** That is not
ceremony — see the consequences.

## What actually detects credit

Nothing new. The corroborating signals in [[stack-outline]] already carry it:
the forward camera saw a vulnerable road user or a vehicle cutting in, the
deceleration profile matches a reaction rather than inattention, there was no
contact. We were collecting the evidence and only ever reading it one way.

What we can detect is **avoidance** — something was there, the driver reacted,
nothing was hit. What we cannot reliably detect is whether the situation was
avoidable *earlier*, which is the difference between an emergency stop for a
child and a late reaction to a hazard that was visible for six seconds. So
credit is proposed conservatively, at high confidence only, and a human confirms
it before it reaches a driver.

## Alternatives considered

**A fifth "positive" severity band.** Rejected: severity is about attention, and
a collision avoided may warrant a great deal of attention. Cramming a different
kind of judgement into the same scale would make both harder to explain.

**Leave positives out of v1 and phase them.** The original recommendation, and
wrong. The defect above ships either way — without classification we actively
coach people for good driving, which is worse than not recognising it.

**Automatic recognition without manager confirmation.** Rejected: wrongly praising
a driver for a hard brake that was really their own late reaction is
embarrassing for the manager, corrosive to the system's credibility, and unfair
to the drivers who did the thing properly ([[R-13]]).

## Consequences we accept

1. **The review set contains things to praise, not only things to fix.** That
   changes the queue's character, its empty state and its copy
   ([[../skills/ux-writing]] W-06 needed amending as a direct result).
2. **Classification precision now matters in both directions.** [[R-12]] covered
   grading a conversation down to a notification; [[R-13]] adds praising the
   wrong thing. Both are caught by the same downgrade audit.
3. **Manager confirmation is friction on a positive action**, which is the
   opposite of where friction usually belongs. Accepted deliberately: the cost of
   unearned praise is higher than the cost of the click.
4. **The driver still has no channel in v1** ([[ADR-0004]]). Recognition is shown
   on the record and delivered the same way coaching is — a manager showing a
   driver a clip. That is not nothing, and it is honest about what exists.
5. **"Not the driver's fault" stops being a dismissal.** It is now a
   classification with a record, which is what [[Q-08]] was circling.

## Revisit when

The driver channel ships and recognition can reach the driver directly, or the
downgrade audit shows credit being proposed on events that do not deserve it.
