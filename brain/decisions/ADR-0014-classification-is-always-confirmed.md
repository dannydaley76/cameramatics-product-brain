---
id: ADR-0014
title: Every classification is proposed and confirmed, not only credit
status: accepted
date: 2026-09-14
supersedes: none
amends: ADR-0010
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-11]
risks: [R-12, R-13]
metrics: [M-09, M-11, M-13]
questions: [Q-08]
---

# ADR-0014 — Every classification is proposed and confirmed, not only credit

## Context

[[ADR-0010]] separated classification from severity and said, in its own words,
*"the system proposes a classification; the manager confirms it."* The
requirements then enforced that for **credit** only ([[US-012]]), because the
risk in view was [[R-13]] — unearned praise. Risk and neutral were displayed as
settled facts with the evidence beside them.

Building the prototype made the gap visible in a way the written requirement did
not. Two problems, and the second is the serious one.

**Anchoring.** A classification shown before the manager has formed a view
becomes the default answer. The manager's job in this product is the judgement;
handing them the answer first and asking them to act on it is not the same
thing as asking them to judge.

**It gives a manager somewhere to hide.** *"The system said it was neutral"* is
available as an account of a decision, and [[canon#C-07]] says the top of the
queue must be defensible to the driver in the clip. A defence that rests on what
the system proposed is not a defence. Neutral is the classification where this
matters most: it is the one that **removes** a conversation, and nobody goes
looking for conversations that did not happen.

## Decision

**The system's classification is always a proposal, and no outcome is recorded
until a human confirms or changes it — risk, neutral and credit alike.**

- It is displayed as *proposed*, with the evidence for it, never as settled.
- Confirming and acting are **one action, not two**: the classification the
  manager lands on determines which outcome is offered, so confirming costs a
  choice rather than an extra click.
- The record distinguishes *system-proposed and confirmed* from *changed by a
  human*, with who made the call. [[M-13]] already needed that split for
  recognition; it now exists for all three classes.

## Alternatives considered

**Leave it — confirm credit only.** The status quo, and rejected because the
argument for confirming credit applies at least as strongly to neutral. Credit
is confirmed to stop us praising the wrong thing in front of a driver. Neutral
decides that no conversation happens at all, and there is no moment later where
anyone notices it was wrong.

**Hide the proposal until the manager has classified it themselves.** The
strongest anti-anchoring option and it was seriously considered. Rejected on
[[canon#C-05]]: it adds a step to every event in a product whose premise is that
manager attention is the scarce resource, and it withholds corroborating
evidence the system already has in order to test the person using it. A tool
that hides what it knows to check whether you agree with it is not a tool.

**Auto-confirm below a severity threshold.** Rejected: it reintroduces
*decisions taken without a human* through the back door, which is the thing
[[ADR-0007]] removed from this design in the first place.

## Consequences we accept

1. **A choice on every event where there was previously a default.** The cost is
   contained by merging confirmation with the outcome action rather than adding
   a step, but it is not zero, and [[canon#C-05]] means it has to be said out
   loud rather than absorbed.
2. **The downgrade audit gains a population worth sampling**: events where the
   manager confirmed the proposal without changing it. A high confirm-without-
   change rate is either good grading or rubber-stamping, and the rate alone
   cannot tell you which — it is readable only with [[M-09]] and the audit
   sample ([[M-11]]).
3. **We will find out that some proposals are bad**, on neutral especially,
   because for the first time the disagreements are recorded. That is the point,
   and it will look like a quality problem before it looks like a control.
4. **"The system said so" stops being available** as an account of a decision.
   That is the consequence this decision is actually for.

## Correction, 2026-09-14, on the prototype's adversarial pass

Consequence 1 above claimed the cost was contained because *"confirming and
acting are one action, not two"*. Built, it was two: classify, then act. The
adversarial pass also measured the proposed classification's button at 46%
taller than the alternatives, and costed the three paths — neutral at two
clicks and no typing, risk and credit at three plus typing. So the cheapest
path through any event was the one this decision calls the dangerous one.

**What changed.** The three classifications are now one click each and each
states its consequence: risk opens coaching or dismissal, neutral records and
closes, credit records the recognition. The proposal is named in the panel
above the buttons rather than marked on one of them, so the three weigh the
same. The cost gradient now tracks consequence: neutral needs no clip, credit
needs the clip watched, risk needs the clip watched and something written.

**What was proposed and rejected.** The agent proposed requiring a typed reason
for neutral, to even the cost. Danny overruled it: neutral is *nothing to see
here*, and making someone type that buys friction rather than judgement. The
guard against neutral being over-used is the downgrade audit sampling it
afterwards — the same argument [[ADR-0008]] already makes about bulk dismissal
— not friction at the point of decision. Recorded as J-27.

## Revisit when

The confirm-without-change rate is high enough for long enough that the
confirmation has become ceremony rather than judgement. At that point the
question is whether classification is good enough to apply automatically for
some bands — a new decision, with evidence behind it rather than an assumption.
