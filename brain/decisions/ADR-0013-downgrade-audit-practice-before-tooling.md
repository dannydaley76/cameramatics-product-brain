---
id: ADR-0013
title: The downgrade audit ships as a practice in phase 1 and as tooling in phase 2
status: accepted
date: 2026-09-14
supersedes: none
amends: ADR-0008
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-19]
risks: [R-12, R-13]
metrics: [M-09, M-11, M-14]
questions: [Q-08]
---

# ADR-0013 — The downgrade audit ships as a practice in phase 1 and as tooling in phase 2

## Context

[[ADR-0008]] created the downgrade audit and left one line open: *"It needs an
owner. A control nobody performs is not a control."* Nothing since has named
one.

That gap is load-bearing. Once [[ADR-0007]] stopped suppressing anything, the
critical failure moved from concealment to mis-grading — an event that deserved
a conversation graded medium and sent as a notification instead ([[R-12]]) — and
to unearned praise in the other direction ([[R-13]]). Both risks name the audit
as their mitigation, and [[M-11]]'s own target says the audit's finding rate
outranks [[M-09]]: a rising share of "should have graded higher" invalidates the
grading model regardless of what the dismissal rate says.

So the audit is the only control on the grading model, and it had no owner, no
cadence and — this is the part that decides the shape of the answer — no user
story. Nothing in the fifteen builds a sampling surface, a review screen or a
way to record a finding. It is the one piece of the loop with zero engineering
behind it.

The constraint that hurts: the product's whole argument is that manager
attention is the scarce resource. An audit is a human reading events nobody
would otherwise read. Left unexamined, the control that makes grading
trustworthy spends the exact thing the product exists to conserve.

## Decision

**Separate the practice from the tooling.**

- **Phase 1: the audit runs, performed by CameraMatics, with no product
  surface.** A sample of bulk dismissals and of the medium and low bands is
  pulled from the platform and read by a person. A spreadsheet is an acceptable
  instrument. The finding rate is reported into [[M-11]] from day one.
- **Phase 2: the tooling.** Sampling, a review surface and finding-recording
  become a user story when the manual version stops scaling — which is an
  observable condition, not a date.

**Who performs it:** CameraMatics, not the customer. The audit is quality
assurance on our grading model, not work we hand to a fleet manager whose
attention we have just spent a product justifying the conservation of.

**Cadence and sample rate are deliberately not set here.** They depend on event
volume ([[A-19]], unmeasured) and on the early finding rate, and a number
invented now would be a false precision in the one control that has to be
trusted ([[canon#C-03]]).

## Alternatives considered

**Build the tooling in v1.** Rejected on cost, not on principle. It is a
sixteenth story competing with the review queue, the coaching loop and footage
states, and it would be built before anyone has read a single sample and knows
what the surface should show. The manual pass is how we learn what to build.

**Defer the audit entirely to phase 2.** The tempting reading of "it's phase 2",
and the one this decision exists to reject. It ships the grading model with no
control on it at all for the whole of phase 1, while [[R-12]] and [[R-13]] carry
a mitigation that does not yet exist — a promise, not a control. If the audit is
worth having at all, the first release is when the grading model is least
trustworthy and the audit matters most.

**Make it the fleet manager's job.** Rejected. It inverts the product's own
argument, it asks the customer to QA our model, and a manager reading events we
already decided were not worth their time is the least likely task in the
product to actually get done ([[canon#C-29]] — non-use would be our defect, and
this one would be predictable).

## Consequences we accept

1. **An operational cost on our side, unpriced.** It is real headcount time from
   launch, and it grows with the number of live accounts until the tooling
   arrives. Naming it as ours rather than the customer's does not make it free,
   and the phasing section has to carry it.
2. **The finding rate in phase 1 is produced by a manual process**, so it is
   slower and less consistent than the tooled version will be. Accepted: a
   rough reading of a real sample beats a precise reading of nothing.
3. **We are committing to a control before knowing what it costs to run.** That
   is the right way round for a safety mechanism and the wrong way round for
   most features; it is worth saying which one this is.
4. **Phase 2's trigger is a judgement, not a metric.** "When the manual version
   stops scaling" needs someone to call it, and the person doing the reading is
   the person who will know.

## Revisit when

- The manual sample stops being readable in the time available, which is the
  trigger for the phase-2 story.
- The finding rate falls far enough for long enough that the sample rate can
  fall — [[ADR-0008]]'s revisit condition, and the sample rate falls, never the
  control.
- Event volume turns out low enough ([[Q-02]]) that every event reaches a human
  anyway, in which case there is nothing to audit.
