---
id: ADR-0009
title: Weekly review sets that close
status: accepted
date: 2026-09-14
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-03, A-19]
risks: [R-01, R-11]
metrics: [M-05, M-07]
---

# ADR-0009 — Weekly review sets that close

## Context

A queue that never empties is a feed, and a feed is the thing this capability
exists to replace. Something has to bound the work so that "done" is a state a
manager can actually reach — because reaching it is what makes them come back.

## Decision

**High-band events are batched into weekly review sets. A set closes when the
next week begins.** Critical events bypass the weekly rhythm entirely and are
surfaced immediately ([[ADR-0007]]).

Events left unreviewed in a closed set are **not deleted and not silently
absorbed**. They are counted, and the count is shown on the face of the queue —
"14 events closed unreviewed last week". Footage remains recoverable inside the
device retention window ([[A-10]]), so a closed event can still be opened if
something later makes it matter.

## Alternatives considered

**A rolling open list.** Rejected: it is a feed with a sort order. It never
reaches empty, so the manager never gets the signal that they are finished, and
the psychological mechanism the whole design depends on never fires.

**Carry unreviewed events forward into the next week.** Rejected, and it is the
closest call here. Carrying forward feels more responsible and produces a queue
that grows without limit for exactly the manager who is already struggling —
punishing the person we most need to re-engage.

**Auto-close silently.** Rejected: that is suppression by timeout, wearing a
friendlier name.

## Consequences we accept

1. **Some real events will close unreviewed.** That is a genuine loss. The
   defence is that it is counted and visible, not that it does not happen.
2. **A manager can accumulate many closed unreviewed weeks**, and the product as
   specified does nothing about it beyond displaying the number. That is a real
   gap — see below.
3. **The weekly cadence is assumed, not observed.** Some fleets work to a
   fortnightly safety rhythm and some to a daily one ([[A-03]] no longer asserts
   a time budget).

## The gap this leaves, named as a gap

If a manager has eight consecutive weeks of unreviewed sets, the product has
failed and the number on the screen is not a solution — it is a receipt.

**A tool that is not being used is a failure of the tool** ([[canon#C-29]]), not
of the person. What to do about sustained non-use — re-engagement, escalation to
whoever owns the account internally, automatic reduction of what we surface,
or a conversation rather than a feature — is a **phase-2 design problem** that
this decision deliberately does not solve. Naming it here so that it reads as
deferred rather than unnoticed, and so that [[R-11]] carries it.

## Revisit when

The share of accounts with two or more consecutive unreviewed weeks becomes
non-trivial. That is the trigger for the phase-2 work above, and it should be
instrumented from day one rather than discovered later.
