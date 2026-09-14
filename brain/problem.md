---
id: PROBLEM
title: Problem statement — risky driving events
status: draft
owner: danny
links: [[jtbd]] [[business-case]] [[personas/fleet-manager]]
---

# The problem

Collisions in a mid-size commercial fleet are concentrated: a minority of drivers
and a short list of repeatable behaviours — following too close, speed on
approach, phone in hand, fatigue — account for most of the at-fault cost.

Fleet managers already believe this. What they do not have is a way to find out
**which driver, which behaviour, this week**, cheaply enough to act before the
next incident. Today the camera is a black-box recorder: an insurance artefact
pulled after the fact, not a management tool. The loop is retrospective and
incident-driven.

In-cab AI detection changes what is *visible*: risk shows up before the
collision, not after it. But visibility is not value.

## The failure mode we are actually designing against

Every AI dashcam rollout fails the same way. The device is technically correct
and practically overwhelming. A 100-vehicle fleet generates somewhere between 50
and 450 detectable events a day at default sensitivity ([[A-02]]) — most of them
real (the van did brake hard) and irrelevant (a cyclist swerved out). The
manager logs in, sees 340 events, reviews six, and stops logging in. The
capability is dead inside sixty days and the renewal conversation is awkward.

Detection accuracy is not what saves that rollout. Nothing in the event feed
does. The scarce resource is **manager attention**: roughly fifteen minutes a
day, two or three times a week ([[A-03]]), competing with vehicle-off-road,
driver shortages, compliance and customer calls.

## Problem statement

> Fleet managers cannot convert a firehose of detected driving events into a
> small, repeatable weekly routine that measurably changes driver behaviour.

So the product problem is not detection — detection is table stakes and
increasingly commodity at the edge. The product problem is **triage and the
coaching loop**: reduce hundreds of events to the handful worth a conversation,
make that conversation quick and fair, and prove the behaviour changed.

## What this implies about the product

1. The unit of work is not an event. It is a **weekly review session** that
   starts full and ends empty.
2. Every event that reaches a human must have earned it. Suppression, scoring
   and grouping are first-class features, not settings.
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
