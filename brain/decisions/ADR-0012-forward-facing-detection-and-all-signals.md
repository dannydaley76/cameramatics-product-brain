---
id: ADR-0012
title: Forward-facing detection is in v1, and every event carries every signal
status: accepted
date: 2026-09-14
supersedes: ADR-0001
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-02, A-04, A-12, A-18]
risks: [R-02, R-05, R-13]
metrics: [M-09, M-11]
questions: [Q-03]
---

# ADR-0012 — Forward-facing detection is in v1, and every event carries every signal

## Context

[[ADR-0001]] cut v1 to four signals — harsh braking, harsh acceleration, harsh
cornering and phone-in-hand distraction — and said "nothing else". The
adversarial pass found that decision contradicted in three places at once:

- [[ADR-0010]] claims credit classification needs "nothing new", because the
  corroborating signals already carry it — the forward camera seeing a
  vulnerable road user or a vehicle cutting in. The signal list in
  [[stack-outline]] contained no forward-camera inference at all.
- [[US-006]] mandates the grading exemplar *"deceleration in the top few
  percent, with a vehicle ahead"*. That is forward-vehicle detection.
- [[US-012]] mandates a recognition record naming a cyclist. That is
  vulnerable-road-user detection.

So two acceptance criteria and the entire mechanism behind [[canon#C-30]] depend
on a capability an accepted ADR had excluded. It is load-bearing rather than
cosmetic: without forward-facing evidence, recognition can only infer "avoided
harm" from g-force, speed, GPS, time of day and wiper state, which cannot
distinguish an emergency stop for a cyclist from an emergency stop for a traffic
light. That is exactly the failure [[R-13]] names.

The constraint that hurts is that ADR-0001 was right about *why* it cut.
Precision at the top of the queue buys adoption, and each unreliable signal
contaminates trust in every other. Adding a detector is never free. What changed
is the evidence about what this particular detector costs: CameraMatics AI
already detects vulnerable pedestrians, co-workers and cyclists ([[A-12]], from
public product pages, with the lag [[A-18]] describes). The capability is not a
new build. The open question is whether it reaches the vehicles, and that is
[[Q-03]].

## Decision

**Two parts. The second is the more important one.**

1. **Forward-facing detection is in the v1 signal set** — vulnerable road users
   and forward-vehicle presence — conditional on the supported-device matrix
   that [[R-05]] already requires. Where a device cannot run it, events from
   that device still flow; they carry less evidence, and credit is not proposed
   from them.

2. **Every event carries every sensor input available at the time, regardless of
   which signal triggered it.** The trigger decides that an event exists. It
   does not decide what evidence the event carries.

Part two is the durable half. It is what lets [[ADR-0010]]'s classification read
the same event two ways — risk or credit — without a new detector per outcome,
and it is what makes a grading rule revisable without a firmware release. Part
one is a capability bet gated on [[Q-03]]; part two is free and holds whatever
[[Q-03]] answers.

## Alternatives considered

**Supersede [[ADR-0010]] instead, and propose credit only from signals the stack
already carries.** The cheaper repair, and it keeps the repo consistent by
making the product worse. Recognition inferred from inertial signals alone is
precisely the thing [[R-13]] warns about, and [[canon#C-30]] becomes a claim the
product cannot back. Rejected.

**Rewrite the US-006 and US-012 exemplars to remove the forward-camera
evidence.** Rejected: the copy was right and the scope was wrong. Strip the
cyclist out of the recognition record and recognition can no longer say what the
driver actually did — which is the one discipline [[canon#C-30]] insists on,
specific and evidenced.

**Bring in headway / tailgating as a coachable event type while we are here.**
Rejected, and this is the part of ADR-0001 that survives intact. Measuring
following distance needs per-install camera calibration, which is a
field-operations lead time rather than a software one. Detecting that a vehicle
or a cyclist *was there* is a different problem from measuring *how far away it
was*. The first is evidence attached to an event; the second is an event type of
its own. Only the first is in v1, and [[Q-03]] still carries the following-
distance question.

**Leave the four-signal set and note the inconsistency as known.** Rejected. A
submission whose thesis is that its claims are checkable cannot leave a claim
standing that was checked and failed.

## Consequences we accept

1. **Inference budget is the real cost.** The SoC shares inference with
   recording and encoding, and a second camera-side workload competes for it.
   [[Q-03]] now has to answer for two models rather than one, and the supported-
   device matrix is likely to come back narrower as a result. That lands
   squarely on [[R-05]], which was already the delivery risk that most shapes
   phasing.
2. **[[A-04]] gets heavier.** It is already low-confidence and critical-impact.
   This decision increases what depends on it without improving what we know.
3. **The v1 event set and the v1 signal set are now different things.** Four
   behaviours trigger events; more than four signals describe them. Any sentence
   in this repo of the form "v1 detects four things" is now wrong and has to go.
4. **The supported-device matrix becomes a gate on recognition, not only on
   onboarding.** A fleet on older hardware gets triage without credit — a worse
   product for those drivers, and one that has to be said plainly in the sales
   conversation rather than discovered in week three.
5. **We carry more data per event than any single grading rule uses.** Accepted
   deliberately: that redundancy is what makes classification revisable without
   a new detector each time, and it is cheap next to video.

## Revisit when

- [[Q-03]] answers. If forward-facing inference reaches a materially smaller
  share of the installed base than distraction inference does, part 1 becomes a
  v1.1 decision and recognition phases behind it. Part 2 does not move.
- The downgrade audit shows credit being proposed on events where the forward
  signal was absent or wrong.

## What this does not settle

The adversarial pass also asked what grades the behaviours the existing product
detects and this v1 does not: [[ADR-0007]] says every detected event is
retained, scored and contributes to the driver record, and if detection already
covers eleven behaviours then "every detected event" is a larger set than this
decision describes. That is a **routing**-scope question rather than a detection-
scope one, and it is open. It is recorded as deferred in
[[../../reviews/2026-09-14-prd-and-requirements]] rather than answered here,
because answering it is a scope decision and this ADR is not the place to slip
one in.
