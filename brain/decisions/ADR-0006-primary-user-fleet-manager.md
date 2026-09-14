---
id: ADR-0006
title: Primary user is the fleet manager, reviewing and coaching
status: accepted
date: 2026-09-14
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-01, A-03, A-16, A-17, A-18]
risks: [R-07]
metrics: [M-07, M-08]
questions: [Q-09]
---

# ADR-0006 — Primary user is the fleet manager, reviewing and coaching

## Context

The brief names the user twice and unambiguously: "helps their **fleet managers**
act on it", and "so a **fleet manager** can review the footage, coach the driver,
and track improvement over time". One person, both jobs.

Our own research disagrees. CameraMatics' published coaching workflow splits the
work across two roles — the fleet manager triages and shares an event, a depot
manager holds the conversation with the driver ([[A-16]]). Their named customers
are large and multi-depot — Royal Mail, XPO, DFDS, a 250+ depot US operator —
and the June 2026 raise is pointed at enterprise ([[A-17]]).

So an explicit instruction in the brief conflicts with an inference drawn from
public pages of unknown currency ([[A-18]]).

## Decision

**v1 designs for a single fleet-manager role who both reviews and coaches, as the
brief specifies.** The delegated two-role model is recorded as a known
divergence, carried as [[A-16]], and named as the first phase-2 candidate.

## Alternatives considered

**Two-role in v1 — triager and coach as distinct users.** More accurate about
their world, and the version I would probably build if I worked there. Rejected
because it departs from an explicit instruction on the strength of an inference,
and because it roughly doubles the v1 surface: a handover, two permission sets,
and an ownership model for an event that has moved between people.

**Enterprise safety manager as primary user.** Follows the money and the named
accounts. Rejected: the brief says fleet manager, and a safety-manager product
pulls toward league tables and programme reporting, away from the act-on-it loop
the brief actually describes.

## Why this way round

When an explicit instruction conflicts with an inference, follow the instruction
and *show* the inference. Doing the reverse means answering a question nobody
asked while looking like you misread the one they did. Surfacing the divergence
costs a paragraph and demonstrates the research; acting on it unilaterally costs
the brief.

## Consequences we accept

1. **v1 under-serves multi-depot accounts** — precisely the accounts the growth
   capital is aimed at. Mitigated only by making handover the first phase-2 item
   rather than a later one.
2. **If [[A-16]] is confirmed, the queue needs an ownership model** — who owns an
   event once it has been passed on, and whose queue it counts against. That is
   a design question we have deferred, not answered.
3. **[[R-07]] gets worse.** One person reviewing and coaching makes it more
   likely the conversation happens in the depot and never gets logged, which is
   the failure mode that quietly invalidates [[M-08]].

## Revisit when

[[Q-09]] and a conversation with any multi-depot customer establish how coaching
is actually conducted. If it is delegated in practice, this decision is
superseded rather than amended.
