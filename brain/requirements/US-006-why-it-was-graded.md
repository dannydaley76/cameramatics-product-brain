---
id: US-006
title: See why this event was graded and classified as it was
epic: EP-02
persona: fleet-manager
phase: v1
priority: must
size: M
metrics: [M-09, M-13]
risks: [R-02, R-12, R-13]
decisions: [ADR-0007, ADR-0010]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-006 — See why this event was graded and classified as it was

**As a** fleet manager
**I want** the reasons behind the grading and the classification
**so that** I can trust the ranking, and defend it to the driver in the clip.

## Acceptance criteria

- **Given** an event is displayed, **when** the manager views it, **then** the
  reasons for its severity band are shown in plain language — not a score alone
  — for example: *"Graded high: deceleration in the top few percent, with a
  vehicle ahead."*
- **Given** an event is classified credit, **when** it is displayed, **then** the
  evidence for that classification is stated specifically, for example:
  *"Proposed as avoided harm: a cyclist entered from the left and there was no
  contact."* and it is marked as **proposed** until confirmed ([[US-012]]).
- **Given** an event is classified neutral, **when** it is displayed, **then**
  the reason is stated and the event is recorded on the driver's side rather
  than against them ([[ADR-0010]]).
- **Given** the severity model version changed after this event was scored,
  **when** the event is displayed, **then** the version that scored it is
  retrievable, so historical comparison is not silently invalidated.
- **Given** any grading reason is displayed, **when** it references a threshold
  or a number, **then** that number traces to a definition
  ([[../../skills/ux-writing]] W-07).

## Out of scope for this story

- Any ability to change the grading or the model from the portal ([[ADR-0003]]).
- Model explainability beyond the stated contributing reasons — this is a
  product requirement for legibility, not an interpretability feature.
