# Skill: Decision Record (ADR)

*New for this brain. The document type the other skills kept referring to, so it
needed a recipe of its own.*

## When to use
Whenever a choice is made that someone could reasonably have made differently —
including, and especially, a decision to **not** build something. Scope cuts are
the ADRs that earn their keep six months later.

Not for choices with one correct answer. An ADR for a typo fix is noise.

## Required frontmatter

```yaml
---
id: ADR-000N        # permanent, never reused
title: ...
status: proposed | accepted | superseded
date: YYYY-MM-DD
supersedes: ADR-000N | none
decided_by: danny | proposed-by-agent
drafted_by: agent | human
adversarial_pass: ran | not run     # canon C-24
assumptions: [A-0N]
risks: [R-0N]
metrics: [M-0N]
---
```

## Format

**Context**
The situation that forces a choice. What is true that makes this a decision
rather than a default? Include the constraint that hurts.

**Decision**
One sentence, active voice, no hedge. "We surface only high-severity events in
the default queue." Not "we recommend considering surfacing…".

**Alternatives considered**
At least two, each with the reason it lost. An ADR with no rejected option was
not a decision — it was a description (canon C-17).

**Consequences we accept**
What gets worse because of this. Every real decision costs something; naming the
cost is how you can tell it was real. If nothing gets worse, the decision was
free and probably not worth a record.

**Revisit when**
The observable condition that should reopen this — a measurement, a date, a
customer signal. Not "if it becomes a problem".

## Conventions
- A reversal is a **new** ADR that supersedes the old one, stating what changed
  in the world. Never edit a decision to match the present (canon C-16).
- The consequences section is the one that gets skipped and the one that gets
  read. Write it first if it helps.
- Where an agent proposed the decision, say so and mark it `proposed` until a
  human ratifies. An agent-authored ADR presented as settled judgement is the
  exact failure the [[../brain/judgement-log]] exists to prevent.
