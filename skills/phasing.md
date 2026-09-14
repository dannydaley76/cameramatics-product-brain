# Skill: Phasing

*New for this brain. Written when the phasing section needed producing and there
was no recipe for it — which, per [`../AGENTS.md`](../AGENTS.md), is the signal
that the shape is not settled and has to be decided rather than improvised.*

## When to use
Once requirements exist and before anyone commits build capacity. A phasing
document answers three questions and no others:

1. **What gates what** — the dependency chain, and which dependencies are
   outside our control.
2. **What we build first, and what can run beside it** — sequencing is not the
   same as a priority list.
3. **What is deliberately not in the first release**, and where each exclusion
   is already recorded as a decision.

Not a roadmap. A roadmap has dates and a phasing document has conditions; if a
phase boundary is a date rather than an observable condition, it is a guess
wearing a calendar.

## Required frontmatter

```yaml
---
id: PHASE
title: ...
status: draft | proposed | accepted
section: 4
drafted_by: agent | human
decided_by: danny | —
adversarial_pass: ran | not run
assumptions: [A-0N]
risks: [R-0N]
metrics: [M-0N]
questions: [Q-0N]
decisions: [ADR-000N]
---
```

## Format

**The unit of value**
State it before anything else, because it decides whether phasing is a cut or a
sequence. If the unit is a feature, phases cut features. If the unit is a loop,
a thin whole loop beats a thick partial one and the phasing is mostly sequence.
Getting this wrong produces a plausible plan that ships something nobody can use.

**The dependency chain**
What gates what, in order, marking which links are **inherited** — outside our
control and therefore not schedulable. An inherited dependency is a different
kind of risk from an engineering one and the document says which is which.

**What can run in parallel**
The useful output of the chain. Name the stub or the fake that lets a track
start early, and what it costs when the real thing arrives.

**The phases**
Use the register's own vocabulary — `v1`, `v1.1`, `later` — so the document and
the story frontmatter cannot drift. Each phase states what is in it, what is
not, and **the condition that opens the next one**. Never a date.

**Gates: what would stop us**
The open questions that would change the plan rather than delay it, each with
what it would change. A blocking question that does not appear here was not
really blocking.

**What is deliberately excluded, and where it is recorded**
Every exclusion points at an ADR. An exclusion with no decision record behind it
is an omission that has not been noticed yet (canon C-18).

## Conventions
- **Phase boundaries are conditions, not dates.** "When the manual sample stops
  being readable in the time available" is a boundary. "Q3" is a wish.
- **Scope cuts are the human's** (canon C-25.2). An agent may propose one; the
  document marks it `proposed` and the story frontmatter does not move until it
  is ratified. A phasing document whose cut is silently applied has made a
  decision it was not entitled to make.
- **Do not write the stories for a later phase.** If the phase exists because we
  do not yet know enough to build it, we do not know enough to specify it
  either; name it and say what would tell us.
- The phasing document is generated from the brain like every other artefact
  (canon C-19). If it disagrees with the registers, the registers win.
