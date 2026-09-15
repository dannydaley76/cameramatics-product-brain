---
id: ADR-0015
title: Nothing unreviewed is ever used in a conversation with a driver
status: accepted
date: 2026-09-15
supersedes: none
amends: ADR-0007
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-11, A-20]
risks: [R-04, R-12]
metrics: [M-03, M-04, M-11, M-16]
---

# ADR-0015 — Nothing unreviewed is ever used in a conversation with a driver

## Context

Two decisions made three days apart contradict each other, and nobody noticed
until a reviewer costed the fixture data.

[[ADR-0007]] says every detected event is retained, scored and contributes to
the driver record. [[ADR-0014]] says no outcome is recorded until a human has
classified the event, and rejects auto-confirming below a severity threshold
because it reintroduces decisions taken without a person.

Both cannot be true. Medium and low band events never reach a manager by design,
so nobody ever classifies them, and they land on the driver record anyway. In
the prototype's own fixture that is **150 events of 161, or 93% of the week**.

The consequence is the one the design exists to prevent. A driver who spends a
week being cut up in city traffic accumulates 150 unlabelled marks, and the
*not their doing* label that exists to protect them only ever reaches the eleven
events a manager opened. An unclassified event is treated as theirs by default,
which is the assumption of fault that [[canon#C-07]] says has to be defensible
to the person in the clip.

## Decision

**Split what the driver record is for.**

- **The evidence half** — what a manager would turn the screen round and show a
  driver — contains only events a human has classified. Nothing else appears in
  it, ever.
- **The trend half** — what the fleet operator reads, and what [[M-03]] and
  [[M-04]] are computed from — contains every event, and states on its face how
  many of them nobody reviewed.

One rule, and it is short enough to hold in your head: **nothing unreviewed is
ever used in a conversation with a driver. Everything is used in the trend, and
the trend says so.**

## Alternatives considered

**Keep unreviewed events off the driver record entirely.** The fairest option
and the one that costs the most. [[M-03]], [[M-04]] and the concentration
argument in [[A-20]] are all per-driver counts, and this would compute them from
the 7% of events a human happened to open. Rejected: it fixes a fairness problem
by making the measurement dishonest.

**Let the system's label stand unless a human changes it.** Rejected, and
quickly. [[ADR-0014]] rejected auto-confirming below a severity threshold three
days ago in those words. This is the same thing with a different name, and
adopting it would mean superseding a decision within a week of making it,
because building the screen made the cost visible rather than because anything
changed.

**Show the split and change nothing else.** Not an alternative: that is the
surface of this decision rather than a substitute for it. Without the rule, the
split is a disclosure that a driver is being judged on unreviewed events, which
is worse than not disclosing it.

## Consequences we accept

1. **[[M-03]] and [[M-04]] are computed on a population that includes events
   nobody checked.** That has to be said wherever they are reported rather than
   glossed, because the alternative is a repeat of this defect one layer out.
2. **The downgrade audit matters more, not less.** It is now the only thing
   sampling the unreviewed 93%, which raises the cost of [[ADR-0013]]'s deferral
   of its cadence and makes that the next thing to settle.
3. **A driver record carries two numbers where it carried one.** On a surface
   whose whole argument is that it is simple enough to use in ten minutes, that
   is a real cost, paid because the alternative is a record that quietly
   overstates what it knows.
4. **The fairness claim narrows, and becomes true.** Before this it was "a human
   labels every event", which was false. After it is "a human labels every event
   we ever put in front of you", which is checkable and which a driver can be
   told without it being a lie.

## Revisit when

The audit shows the unreviewed population contains events that should have been
reviewed, at a rate that makes the trend half untrustworthy. At that point the
question is whether the medium band is drawn in the right place, which is an
[[ADR-0007]] question rather than this one.
