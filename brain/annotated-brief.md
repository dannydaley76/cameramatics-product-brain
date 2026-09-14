---
id: BRIEF
title: Annotated brief — what it asks, implies, and leaves out
status: draft
owner: danny
stage: discovery
drafted_by: danny (first read) + agent (additions)
decided_by: danny
adversarial_pass: not run
assumptions: [A-11, A-12, A-13, A-16, A-18]
risks: [R-06, R-09]
questions: [Q-09, Q-10]
decisions: [ADR-0006]
links: [[problem]] [[company-analysis]] [[canon]]
---

# Annotated brief

The first Discovery artefact. Before deciding what to build, decide what was
actually asked — and, more usefully, what was not.

**Two reads, kept separate on purpose.** Danny read the brief first and marked it
up without seeing any agent output, because a first read that reacts to a draft
is not a first read. The agent's additions came second and are marked. Nothing
has been smoothed into a single voice; where the two reads differ, both are here.

---

## The scenario, as written

> A fleet operator wants to reduce collisions and improve driver safety across
> their vehicles. They are interested in a capability that automatically catches
> risky driving as it happens and helps their fleet managers act on it.
>
> Your challenge is to design the product capability that:
> - Detects a risky driving event on the in-cab device — for example harsh
>   braking, or driver distraction picked up by the in-cab camera.
> - Gets the relevant video and event data from the device up to the cloud
>   platform.
> - Presents the event in the customer web portal so a fleet manager can review
>   the footage, coach the driver, and track improvement over time.

Roughly 120 words to design a capability across three layers of a stack. The
brevity is not an oversight — what gets read into the gaps is most of the test.

## Stated, and therefore not up for negotiation *(DD)*

1. **The primary user is the fleet manager.** Named explicitly, twice.
2. **The goal is fewer collisions and improved driver safety.**
3. **The method is a pipeline**: detect an event on the vehicle — harsh braking
   or distraction — upload to cloud, present in the portal for review and
   coaching.

These are instructions, not inferences. Where our research later contradicts one
of them, the instruction wins and the contradiction gets recorded rather than
acted on ([[decisions/ADR-0006]]).

## The load-bearing sentences

Two, and they fail in different ways.

**"Automatically catches risky driving"** *(DD)* — the whole capability rests on
a definition of **risky** that the brief never gives. It is not a modelling
detail. It decides which behaviours put a name in front of a manager, and
therefore whose employment record takes the hit. Get this wrong in the
permissive direction and the queue is noise; wrong in the strict direction and
we are policing mirror checks. This is the deeper of the two, because it is an
ethical question wearing a technical costume ([[canon#C-07]]).

**"Helps their fleet managers act on it"** *(agent)* — four words carrying the
entire unsolved problem, sitting next to a detection capability that is largely
solved. Everything before those words is table stakes; everything hard is
inside them. A submission that spends its depth on detection has answered the
easy half.

## Implied but not stated

- **Video, at volume, over cellular** *(agent)* — "gets the relevant video up to
  the cloud" implies a cost and latency problem nobody has named. See
  [[decisions/ADR-0002]].
- **Some inference at the edge** *(agent)* — "distraction picked up by the in-cab
  camera" cannot be done without vision inference on the device. This is the
  only place the brief implies AI, and it is the only place we have put it
  ([[canon#C-28]]).
- **Real time** *(DD)* — "as it happens" sets an expectation about detection, but
  says nothing about how quickly a human needs to see it. Those are different
  requirements and conflating them is expensive.

## Absent

Seven things a real version of this capability cannot avoid, none of which the
brief mentions.

1. **Triage** *(DD)* — nothing about which events reach a human, or how many
   there are. This is the gap the whole submission is built on ([[problem]]).
2. **Success metrics** *(DD)* — "reduce collisions" is the outcome and it is not
   readable inside a quarter at fleet scale. Something measurable has to stand in
   front of it, and the brief offers nothing. See [[success-criteria]].
3. **Any mention of AI** *(DD)* — notable by absence, and treated as a signal
   rather than an oversight. AI goes in where it demonstrably beats a rule, and
   nowhere else ([[canon#C-28]]).
4. **Which driver was in the seat** *(agent)* — "coach the driver" assumes
   attribution the brief never addresses. In mixed-shift fleets it is frequently
   unknown, and without it no per-driver measurement exists at all ([[A-11]],
   [[R-09]]).
5. **Who actually has the conversation** *(agent)* — the brief has one person
   reviewing and coaching. CameraMatics' own published workflow splits it: fleet
   manager triages, depot manager coaches ([[A-16]]).
6. **The driver has no stake in this brief** *(agent)* — no consent, no
   visibility, no dispute route. For a capability that judges people using
   footage of their faces, the absence is conspicuous, and it decides whether
   coaching changes behaviour or breeds resentment ([[R-04]]).
7. **"Track improvement over time" is an attribution claim** *(agent)* — proving
   coaching caused a behaviour change needs a control cohort and a base rate.
   The brief treats it as a chart ([[R-06]]).

## What we are choosing to read into it

The brief reads as greenfield. Our research says the capability substantially
exists — detection, scoring, a coaching workflow with statuses, a driver app
([[A-12]]). We are treating the exercise as designing the part that is missing
rather than rebuilding what is there, and holding that reading as a hypothesis to
be tested in one question ([[Q-10]]), not as a verdict ([[A-18]]).
