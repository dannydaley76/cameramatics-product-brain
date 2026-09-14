---
id: US-007
title: Footage states are honest
epic: EP-02
persona: fleet-manager
phase: v1
priority: must
size: M
metrics: [M-10]
risks: [R-03]
assumptions: [A-05, A-10]
decisions: [ADR-0002, ADR-0005]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-007 — Footage states are honest

**As a** fleet manager
**I want** to know whether footage is here, coming, or not coming, and why
**so that** I am not left guessing whether the system is broken or the van is
simply in a yard with no signal.

## Acceptance criteria

- **Given** footage has been uploaded, **when** the event is opened, **then** the
  clip plays without further action.
- **Given** footage has been requested and not yet arrived, **when** the event is
  opened, **then** the panel reads:
  *"Footage is on its way. It usually arrives within a few minutes."*
  and the view updates without a manual refresh when it lands.
- **Given** the vehicle has been offline since before the request, **when** the
  event is opened, **then** the panel reads:
  *"Footage not available yet. This vehicle has been offline since {time} and
  will upload when it reconnects."*
- **Given** footage is unavailable for any reason, **when** the event is
  displayed, **then** *Dismiss* remains available and *Log coaching
  conversation* does not ([[ADR-0005]]).
- **Given** any footage state is displayed, **when** the copy is rendered,
  **then** it names what is missing, why, and what the manager can do now
  ([[../../skills/ux-writing]] W-04). The word *error* does not appear.

## Out of scope for this story

- Manually forcing an upload from the portal.
- Any promise about arrival time beyond the wording above — we do not state a
  number we cannot hold.
