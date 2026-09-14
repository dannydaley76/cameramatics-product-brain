---
id: ADR-0004
title: No driver-facing surface in v1
status: accepted
date: 2026-09-10
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: ran 2026-09-14
assumptions: [A-01, A-07]
risks: [R-04]
metrics: [M-03, M-12]
---

# ADR-0004 — No driver-facing surface in v1

## Context

The argument for a driver app is strong and I want to be honest that I find it
persuasive: coaching without the driver seeing their own events is a one-way
conversation, self-correction is cheaper than management attention, and drivers
who can see and contest their record are far less likely to treat the camera as
surveillance ([[jtbd]], [[R-04]]).

It is also a second product: authentication for a population without company
email, an app or SMS channel, a dispute workflow, a notification policy, and a
separate set of data-protection questions.

## Decision

**No driver-facing surface in v1.** The driver is served indirectly: every
coaching action must be evidenced by footage the manager has actually viewed
([[ADR-0005]]) and can show the driver in person.

## Alternatives considered

**Ship driver visibility in v1.** Rejected on scope, not on merit. It roughly
doubles the v1 surface and makes the release dependent on driver identity
management ([[Q-09]]) being solved well rather than adequately. Building the
manager loop badly *and* the driver loop badly is the worst of the available
outcomes.

**Driver-first, manager handles exceptions.** Rejected as answering a different
brief — and it presumes a level of driver engagement we have no evidence for.

**Read-only driver notification in v1** — "an event was logged, speak to your
manager". Rejected as the worst option available: it carries all of the anxiety
of being monitored and none of the recourse. A notification without a dispute
path is a worse artefact than silence.

## Consequences we accept

1. **The fairness constraint is carried entirely by manager behaviour in v1**,
   enforced by [[ADR-0005]] and watched by [[M-12]]. If disputes rise, this
   decision is the first place to look.
2. Behaviour change depends on the manager having the conversation, so
   [[R-07]] (coaching happening outside the system) is a live measurement risk.
3. We will be asked about the driver experience in every sales conversation. The
   answer is a phase, not a shrug — and it is recorded here so it reads as a
   trade-off rather than an omission.

## Revisit when

The manager loop is demonstrably habitual ([[M-07]] holding above 80%) — at
which point driver visibility becomes the highest-value next investment rather
than a competing one.
