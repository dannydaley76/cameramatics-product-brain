---
id: PROBLEM
title: Problem statement — risky driving events
status: draft
owner: danny
links: [jtbd, business-case, personas/fleet-manager]
adversarial_pass: ran 2026-09-14
---

# The problem

Collisions in a mid-size commercial fleet are concentrated: a minority of drivers
and a short list of repeatable behaviours — following too close, speed on
approach, phone in hand, fatigue — account for most of the at-fault cost. That is
an assumption, not a finding ([[A-20]]), and it is the premise the commercial
case rests on. The shape is assumed; no ratio is claimed.

Fleet managers are assumed to believe it already, which is a claim about
customers this brain has not spoken to. What they do not have is a way to find out
**which driver, which behaviour, this week**, cheaply enough to act before the
next incident. Today the camera is a black-box recorder: an insurance artefact
pulled after the fact, not a management tool. The loop is retrospective and
incident-driven.

In-cab AI detection changes what is *visible*: risk shows up before the
collision, not after it. But visibility is not value.

## The failure mode we are actually designing against

Camera rollouts fail on attention rather than on detection ([[A-21]]) — a
belief this design is built on and one CameraMatics can check against its own
churn in an afternoon. The device is technically correct
and practically overwhelming. A 100-vehicle fleet generates somewhere between 50
and 450 detectable events a day at default sensitivity ([[A-02]]) — most of them
real (the van did brake hard) and irrelevant (a cyclist swerved out). The
manager logs in, sees 340 events, reviews six, and stops logging in. The
capability is dead inside sixty days and the renewal conversation is awkward.

Detection accuracy is not what saves that rollout. Nothing in the event feed
does. The scarce resource is **manager attention** — finite and contested,
competing with vehicle-off-road, driver shortages, compliance and customer calls
([[A-03]]).

How finite, we do not know, and it matters that we resist guessing. The goal is
fewer collisions, not a faster reviewer: if preventing one takes forty
well-spent minutes a week, that is the right answer, and a product designed
around a fifteen-minute budget would be the wrong one. What we can say is that
attention will never stretch to hundreds of events a day, and that a manager who
clears a list quickly while changing nothing has got no value from the product at
all.

## Problem statement

> Fleet managers cannot convert a firehose of detected driving events into a
> small, repeatable weekly routine that measurably changes driver behaviour.

So the product problem is not detection — detection is table stakes and
increasingly commodity at the edge ([[A-22]]). The product problem is **triage and the
coaching loop**: reduce hundreds of events to the handful worth a conversation,
make that conversation quick and fair, and prove the behaviour changed.

## What this implies about the product

1. The unit of work is not an event. It is a **weekly review session** that
   starts full and ends empty.
2. Every event that reaches a human must have earned it. Grading, scoring and
   grouping are first-class features, not settings. Nothing is discarded —
   grading decides the action, not whether the event exists ([[ADR-0007]]).
3. "Track improvement over time" is not a chart. It is an outcome claim, and it
   only holds if we can attribute a behaviour change to a coaching action
   ([[R-06]]).
4. A manager who does not trust the severity ranking will review everything or
   nothing. Precision of the *top of the queue* matters more than recall
   ([[R-02]]).

## Out of scope for this capability

Collision reconstruction, insurance claims handling, ADAS intervention,
driver scheduling and telematics compliance reporting. They may consume our
outputs; they are not this capability.
