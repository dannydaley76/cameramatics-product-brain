# Skill: User Stories

*Ported from my own working repo. Tailored for this brain: user types replaced,
required traceability frontmatter added, acceptance-criteria language bound to
[[../brain/canon]] C-11.*

## When to use
When breaking a PRD or feature down into implementation-ready stories an
engineering team can pick up without a meeting.

## Required frontmatter

Every story file carries this block. `scripts/validate.py` fails the build if
any of it is missing or points at an ID that does not exist.

```yaml
---
id: US-0NN          # permanent, never reused (canon C-14)
title: ...
epic: EP-0N
persona: fleet-manager | driver | safety-lead | support
phase: v1 | v1.1 | later
priority: must | should | could
metrics: [M-0N]     # at least one, or this is a preference not a requirement (C-10)
risks: [R-0N]       # the risks this story mitigates or creates
assumptions: [A-0N]
decisions: [ADR-000N]
status: proposed | ratified
drafted_by: agent | human
---
```

## Story format

### Epic / parent story
`As a [user type], I want to [high-level capability] so that [business outcome]`

### Child stories (one per deliverable)
`As a [user type], I want to [specific action] so that [specific outcome]`

**Acceptance criteria:**
- Given [context], when [action], then [observable result]
- Given [context], when [action], then [observable result]

**Out of scope for this story:**
- [Explicit exclusion]

## Conventions
- One story = one deployable thing. If it can't be shipped independently, split it.
- AC must be testable. Banned words in acceptance criteria: *intuitive, fast,
  seamless, user-friendly, works correctly, appropriate*. If speed matters, state
  the number (canon C-11).
- Given/When/Then throughout. Edge cases and error states are extra ACs on the
  same story, not separate stories.
- Every story states what it does **not** do. Half of requirements work is
  boundary-drawing.
- A story that moves no metric does not get written. Push back rather than
  inventing a metric to satisfy the schema — that is gaming the validator, and
  the validator exists to catch the thinking, not to be satisfied.

## User types
- **Fleet manager** — primary. 20–150 vehicle fleet, safety is one of six jobs,
  10–15 min/day. See [[../brain/personas/fleet-manager]].
- **Driver** — subject of the event. Not a v1 product surface (see ADR-0004), but
  every v1 story must be defensible to them (canon C-07).
- **Safety lead** — exists in larger accounts; consumes aggregates. Out of v1.
- **Support** — CameraMatics CS, needs to answer "why did this event surface".

## Story sizing guide
- XS: < 2 hours. Trivial, single surface.
- S: half a day. Clear scope, minimal unknowns.
- M: 1–2 days. Some complexity, well understood.
- L: 3–5 days. Complex, may have unknowns. Consider splitting.
- XL: > 5 days. Must be split before starting.

Sizing here is deliberately coarse and unverified — I have no access to this
team's velocity. Sizes in this brain are relative, and labelled as such wherever
they inform phasing (canon C-01).
