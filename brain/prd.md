---
id: PRD
title: PRD — event triage and coaching loop
status: draft
owner: danny
stage: requirements
drafted_by: agent
decided_by: danny
adversarial_pass: not run
produced_with: skills/prd.md
assumptions: [A-02, A-03, A-11, A-13, A-18]
metrics: [M-03, M-07, M-09, M-11, M-12, M-13]
risks: [R-01, R-02, R-07, R-09, R-13]
decisions: [ADR-0001, ADR-0002, ADR-0003, ADR-0004, ADR-0005, ADR-0006, ADR-0007, ADR-0008, ADR-0009, ADR-0010]
questions: [Q-01, Q-02, Q-09, Q-10]
links: [[problem]] [[success-criteria]] [[stack-outline]] [[portal-requirements]]
---

# Event triage and coaching loop

## Problem

A fleet manager has 10–15 minutes a day ([[A-03]]) and a system that generates
50–450 detectable events a day across a 100-vehicle fleet ([[A-02]]). Most are
technically correct and practically irrelevant. Today the triage is manual — the
manager scans a dashboard and picks events "from which lessons can be learned"
([[A-13]]). That does not scale to a 250-depot account, and it is the step where
every camera rollout dies: the manager reviews six of three hundred, then stops
logging in ([[R-01]]).

Without this, detection quality keeps improving and nothing changes in a cab.

## Solution

**Decide which events deserve a human, make the resulting conversation quick and
evidenced, and measure whether it worked.**

Three parts. The cloud scores and groups every event into one of four severity
bands, each with its own action — nothing is discarded ([[ADR-0007]]) — and
classifies it independently as risk, neutral or credit ([[ADR-0010]]), producing
a weekly review set that can be finished rather than a feed that cannot.

**Praise the good, coach the bad** ([[canon#C-30]]). A driver who brakes hard for
a child has not created risk, they have prevented harm, and a system that can
only ever criticise makes invisibility the best outcome a driver can achieve.
That is how safety tools come to be resented. The portal presents that queue with honest footage
states and a one-step coaching action. The platform measures repeat behaviour
after coaching, with counter-metrics on what we suppressed and what drivers
disputed.

Not a detection project. The v1 event set is deliberately narrow ([[ADR-0001]]),
and no model goes anywhere a rule would do ([[canon#C-28]]).

## Users affected

**Fleet manager** — primary, and the only user with a surface in v1. Reviews and
coaches ([[ADR-0006]]). See [[personas/fleet-manager]].

**Driver** — affected, not served. Every v1 coaching action must be evidenced by
footage the manager has actually watched ([[ADR-0005]]), which is the whole of
their protection in this release ([[ADR-0004]]). Watched via [[M-12]].

**Depot manager** — exists in their real workflow and has no surface here
([[A-16]]). First phase-2 candidate; the handover and visibility model is
defined below rather than left unstated.

**Support** — must be able to answer "why did this event surface", which is why
severity carries its reasons rather than just a score.

## Success metrics

| | Metric | Target |
|---|---|---|
| Headline | Dismissal rate at the top of the queue ([[M-09]]) | < 20% |
| Balance | Recognition-to-coaching ratio ([[M-13]]) | Watched, never targeted |
| Leading | Weekly reviewing accounts ([[M-07]]) | > 80% by week 4 |
| Proof | Coached-driver 28-day repeat rate ([[M-03]]) | Baseline, then hold |

Counter-metrics reported at the same cadence: share of events auto-suppressed
with a weekly human sample ([[M-11]]), and driver disputes and coached-cohort
attrition ([[M-12]]). Full reasoning in [[success-criteria]].

## Top-level user stories

Parent stories only. Detail in [[portal-requirements]], written against
[[../skills/user-stories]].

**EP-01 — Review queue.** As a fleet manager, I want a short ranked list of the
events that matter this week, so that I can clear it in one sitting rather than
scanning a feed that never ends.

**EP-02 — Event review.** As a fleet manager, I want to see what happened and why
it was ranked where it was, so that I can decide whether it is worth a
conversation and defend that decision to the driver.

**EP-03 — Coaching action.** As a fleet manager, I want to log a coaching
conversation in one step from the clip, so that the record exists without the
logging costing more than the conversation ([[R-07]]).

**EP-04 — Improvement over time.** As a fleet manager, I want to see whether
coached drivers actually changed, so that I can answer "is this working" without
overstating what the data supports.

## Open questions

| ID | Question | Blocking |
|---|---|---|
| [[Q-10]] | Does event ranking already exist, and what do you show when a customer asks if coaching worked? | Yes — pre-interview gate |
| [[Q-02]] | What is real event volume per vehicle per day? | Yes — engineering gate |
| [[Q-09]] | Which attribution mechanism is in use, and what is its gap rate on overtime and agency shifts? | Yes |
| [[Q-01]] | What is the manager's current weekly safety routine, and what would they stop doing? | Yes |

## Out of scope

| Excluded | Decided in |
|---|---|
| Driver-facing app, notifications, dispute flow | [[ADR-0004]] |
| Customer-configurable ranking of what surfaces | [[ADR-0003]] |
| Headway/tailgating and fatigue detection | [[ADR-0001]] |
| Depot-manager handover and event ownership transfer | [[ADR-0006]] |
| Eager upload of footage for every event | [[ADR-0002]] |
| Collision reconstruction, claims handling, ADAS intervention | [[problem]] |
| Driver notification delivery channel | [[ADR-0007]], [[ADR-0004]] |
| Depot-manager decision visibility | [[ADR-0006]] |

## Defined, but out of scope

Two things v1 does not build, written down so that the boundary is a decision
rather than a silence. Both are specified to the point where the next phase can
pick them up without rediscovering the thinking.

**Sending a medium-band event to the driver.** [[ADR-0007]] gives the medium band
a single action — send it to the driver so they know, without requiring a
manager conversation — at the fleet manager's or depot manager's discretion. The
*action* is in scope and defined. The *delivery channel* is not: there is no
driver app, notification service or acknowledgement flow in v1 ([[ADR-0004]]).
Until a channel exists the action degrades to grouped visibility with no
outbound step. The capability is worth having early and cheap even without the
app, because "the driver was told" is the difference between a record and a
surprise.

**Depot-manager decisions visible to the fleet manager.** In the real workflow
the fleet manager triages and a depot manager holds the conversation
([[A-16]]). When that arrives, the fleet manager should be able to see what the
depot manager decided — not as surveillance of their colleague, but because an
event that left their queue and was then dismissed is information they need and
currently would not get. v1 has one role and no handover ([[ADR-0006]]), so
there is nothing yet to make visible. Specified here so that when handover is
built, the visibility question is already answered rather than discovered.
