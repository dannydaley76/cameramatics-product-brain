---
id: ADR-0008
title: Bulk dismissal with a reason, subject to look-back review
status: accepted
date: 2026-09-14
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: not run
risks: [R-01, R-11]
metrics: [M-09, M-11]
questions: [Q-08]
---

# ADR-0008 — Bulk dismissal with a reason, subject to look-back review

## Context

A manager coming back from leave, or hitting a week where one vehicle triggered
forty events on a single bad road, needs to be able to clear a set in one action.
Forcing event-by-event dismissal in those cases punishes the person for the
system's behaviour, and the predictable result is that they stop opening the tool
at all ([[R-11]]).

The cost of allowing it is equally real: bulk dismissal is the shortest path to
rubber-stamping, and it corrupts the headline metric, because forty events
cleared in one click is one judgement, not forty ([[M-09]]).

## Decision

**Bulk dismissal is available and requires a reason.**

- A free-text reason is mandatory. Not a dropdown — the dropdown answer is
  always the first option and tells us nothing.
- A bulk dismissal counts as **one** signal in [[M-09]], never as N.
- Every bulk dismissal is retained with its reason, its scope and its author, and
  is eligible for **look-back review**.

## Look-back review

A periodic sample of what did *not* get a conversation — bulk dismissals, and the
medium and low bands from [[ADR-0007]] — read by a human, looking for events
that should have been graded higher.

It is the control on the whole grading model. Without it, [[ADR-0007]] is a
promise that nothing is hidden with no way to check.

*Naming note: this was provisionally "autopsy review". Renamed deliberately —
in a product about preventing road collisions, autopsy is the wrong word, and it
would eventually be said out loud in front of a customer who had lost a driver.*

## Alternatives considered

**Forbid bulk dismissal.** Rejected: it makes a bad week unclearable and drives
abandonment, which is a worse outcome than an imperfect dismissal.

**Allow it silently, as most tools do.** Rejected: an untraceable bulk action is
indistinguishable from the queue being wrong, and we lose the only signal that
would tell us which.

**Structured reason codes instead of free text.** Tempting for analysis, and
rejected for v1 — we do not yet know the real reason taxonomy ([[Q-08]]), and
inventing one now would bake in categories that shape the answers. Free text
first, taxonomy derived from it later.

## Consequences we accept

1. **Typing a reason is friction**, deliberately placed. It should cost slightly
   more than dismissing one event, and considerably less than watching forty
   clips.
2. **Free text is hard to analyse at scale.** Accepted for v1; the sample is read
   by a person, not aggregated.
3. **Look-back review is human work we are creating.** It needs an owner. A
   control nobody performs is not a control.

## Revisit when

Enough dismissal reasons exist to derive a real taxonomy, or the look-back sample
stops finding mis-grades — at which point the sample rate can fall rather than
the control disappearing.
