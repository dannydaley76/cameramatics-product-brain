---
id: ADR-0002
title: Severity-gated video upload
status: accepted
date: 2026-09-10
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-05, A-09, A-10]
risks: [R-03, R-04]
metrics: [M-10, M-11]
---

# ADR-0002 — Severity-gated video upload

## Context

When the device detects an event, something has to cross the cellular link. The
options are: a clip every time, metadata only with footage fetched when a human
clicks, or a gate in between.

A 10–15 second clip at reviewable quality is roughly 1.5–4 MB per camera channel;
a metadata packet is a few KB to tens of KB ([[A-09]]). At 1.5 events per vehicle
per day on a single channel that is around 135 MB per vehicle per month; at 3
events per day across road and driver-facing channels, closer to 700 MB. Data is
contractually capped per vehicle ([[A-05]]). So the cost of "upload everything"
spans unremarkable to contract-breaking, and which end we land on is set by event
volume — the thing we do not yet know ([[Q-02]]).

Two things make this more than a plumbing decision. Footage of a driver's face
is personal data, and moving it speculatively for events nobody reviews is a
data-minimisation problem before it is a cost problem ([[A-07]]). And an event
without footage is not coachable ([[M-10]]) — so whatever we choose determines
whether a manager can see the thing they are about to judge someone on.

## Decision

Metadata is always sent immediately. **Footage is pushed eagerly for events the
device flags high-severity, and for anything collision-grade unconditionally.
Everything else is metadata-only, with footage fetched on demand from the device
within the retention window.**

## Alternatives considered

**Upload a clip with every event.** Rejected on two grounds: it pays to move
video nobody watches, and it is the weaker position to defend to a works council
on driver-facing footage. Genuinely simpler — no dual states, no fetch
orchestration, no retention promise — and if [[Q-02]] returns event volume below
roughly 0.3 per vehicle per day, this becomes the right answer and this ADR
should be superseded. Simplicity wins once the cost argument evaporates.

**Metadata only, always fetch on demand.** Rejected because it puts the coaching
loop at the mercy of connectivity: an event on a vehicle that is parked, off, or
out of coverage may never become reviewable, and the manager's first action every
session is to wait. Cost scaling with review capacity rather than event volume is
an excellent property, but not at the price of the loop working at all.

## Why this one

The gate is not a compromise between the other two — it is the same decision as
triage. If the product's job is to put a handful of events in front of a human,
then "which events do we upload eagerly" and "which events do we surface" are one
question, answered once. The architecture ends up expressing the product spine
rather than sitting beside it.

## Consequences we accept

1. **A severity false-negative becomes close to irreversible.** Under
   metadata-only, a mis-ranked event still has its footage on the card. Here, an
   event wrongly scored low is both unsurfaced and at risk of being overwritten.
   This is a materially worse failure than a badly sorted queue.
2. Therefore this decision **binds two requirements**, not caveats: a guaranteed
   device retention window ([[A-10]]), and a promote-and-fetch path so a
   challenge days later can still retrieve footage. Without both, this design
   has the cost profile of eager upload and the failure mode of lazy fetch.
3. **Two classes of event exist in the portal** and the manager must never have
   to think about which is which. That pushes real complexity into the portal's
   footage-state handling.
4. We carry the cost of ingesting metadata for events we then suppress. Accepted:
   metadata is cheap and cloud-side iteration speed is not ([[STACK]]).

## Revisit when

- [[Q-02]] returns measured event volume — below ~0.3 events/vehicle/day, revisit
  in favour of eager upload for everything.
- The measured device retention window proves shorter than the dispute window
  customers actually use, which would break promote-and-fetch.
- High-severity dismissal rate ([[M-09]]) exceeds 20%, which would mean the gate
  is not trustworthy enough to be load-bearing on footage retention.
