---
id: US-009
title: Dismiss a single event with a reason
epic: EP-02
persona: fleet-manager
phase: v1
priority: must
size: S
metrics: [M-09, M-11]
risks: [R-12]
decisions: [ADR-0008, ADR-0010]
questions: [Q-08]
status: proposed
drafted_by: agent
---

# US-009 — Dismiss a single event with a reason

**As a** fleet manager
**I want** to close an event that does not need a conversation, and say why
**so that** the queue moves and the system learns something from my decision.

## Acceptance criteria

- **Given** an event is open, **when** the manager chooses *"Dismiss with a
  reason"*, **then** a free-text reason is required before the dismissal is
  recorded.
- **Given** a dismissal is recorded, **when** [[M-09]] is calculated, **then** it
  counts as one dismissal of a high-band event, which is our only available
  proxy for precision at the top of the set.
- **Given** the manager's reason indicates the event was not the driver's doing,
  **when** the dismissal is recorded, **then** the manager is offered
  reclassification to **neutral** ([[ADR-0010]]) so the event is recorded as
  evidence on the driver's side rather than disappearing.
- **Given** a dismissal is recorded, **when** the downgrade audit sample is
  drawn, **then** it is eligible for selection.
- **Given** footage was never available, **when** the manager dismisses,
  **then** the dismissal is recorded and marked as made without footage, so
  [[M-09]] can be read with and without that population.

## Out of scope for this story

- Reason codes or a taxonomy ([[Q-08]]).
- Undo beyond reopening the event from the closed set.
