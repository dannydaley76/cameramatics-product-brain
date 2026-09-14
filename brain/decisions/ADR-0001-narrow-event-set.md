---
id: ADR-0001
title: Narrow, reliable event set in v1
status: superseded
superseded_by: ADR-0012
date: 2026-09-10
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: ran 2026-09-14
assumptions: [A-02, A-04]
risks: [R-02, R-05]
metrics: [M-09]
---

# ADR-0001 — Narrow, reliable event set in v1

> **Superseded by [[ADR-0012]] on 2026-09-14.** The reasoning below still holds
> and is why ADR-0012 keeps headway out of v1. What it got wrong was conflating
> the set of behaviours that *trigger* an event with the set of signals that
> *describe* one, which left [[ADR-0010]], [[US-006]] and [[US-012]] depending on
> forward-facing evidence this decision had excluded. Kept unedited per
> [[canon#C-16]].

## Context

The category advertises long event lists: harsh braking, acceleration,
cornering, speeding, tailgating, distraction, phone use, smoking, seatbelt,
fatigue, rolling stops. Every additional type is a line on an RFP feature grid
and a source of events we then have to triage.

The binding constraint is not how many behaviours we can detect. It is that a
manager who sees two events they consider nonsense will discount the ranking
permanently ([[R-02]]). Precision at the top of the queue buys adoption; recall
buys nothing if nobody is looking.

## Decision

**v1 detects harsh braking, harsh acceleration, harsh cornering and
phone-in-hand distraction.** Nothing else.

## Alternatives considered

**Ship the broad set and let severity scoring sort it out.** Rejected: scoring
cannot rescue a signal that is unreliable at source, and each noisy type
contaminates trust in every other. The queue is judged as one object.

**Inertial events only, no camera inference in v1.** Tempting — cheapest, most
reliable, no dependency on [[Q-03]]. Rejected because inertial events alone
cannot answer the question managers actually care about. Harsh braking tells you
something happened; distraction tells you *why*, and it is the behaviour that
most reliably precedes a collision the driver could have avoided.

**Include headway / tailgating.** Deferred to v1.1, not rejected. It is a
credible signal, but it needs per-install camera calibration — a
field-operations dependency with a lead time, not a software one. Shipping it in
v1 would make the release date hostage to a fitting programme.

**Include fatigue / drowsiness.** Rejected for v1 on reliability. It is the most
disputed signal in the category and the hardest to defend to a driver, which
makes it exactly the wrong thing to put at the top of a queue we need trusted.

## Consequences we accept

1. **We lose feature-grid comparisons.** A competitor listing eleven event types
   against our four will win that slide. The answer is the dismissal rate, and
   it only works if we actually measure and publish it ([[M-09]]).
2. Distraction detection creates a dependency on device inference capability
   ([[A-04]], [[Q-03]]) and so a supported-device matrix that gates onboarding.
3. Some real risk goes undetected in v1. That is a deliberate trade of recall
   for trust, and it is reversible in a way that lost trust is not.

## Revisit when

- Dismissal rate on the v1 set holds under 20% for two quarters — then the queue
  has trust to spend on a new type.
- Camera calibration becomes part of standard installation, which removes the
  objection to headway.
