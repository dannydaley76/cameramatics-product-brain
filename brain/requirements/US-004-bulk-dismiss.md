---
id: US-004
title: Dismiss a group of related events with a reason
epic: EP-01
persona: fleet-manager
phase: v1
priority: should
size: S
metrics: [M-09, M-11]
risks: [R-01, R-11, R-12]
decisions: [ADR-0008]
questions: [Q-08]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-004 — Dismiss a group of related events with a reason

**As a** fleet manager
**I want** to clear a run of related events in one action, saying why
**so that** one bad road on one shift does not cost me an afternoon, and so the
decision can be checked later.

## Acceptance criteria

- **Given** two or more events share a driver, a behaviour and a trip, **when**
  the review set is displayed, **then** they are offered as a single group with
  the button labelled *"Dismiss {n} events with a reason"*.
- **Given** the manager triggers a group dismissal, **when** the reason field is
  empty, **then** the confirm action is unavailable. The reason is free text,
  not a dropdown ([[ADR-0008]]).
- **Given** a group dismissal is confirmed, **when** [[M-09]] is calculated,
  **then** it contributes **one** dismissal signal, not one per event.
- **Given** a group dismissal is recorded, **when** the downgrade audit sample is
  drawn, **then** that dismissal is eligible for selection, with its reason,
  scope and author attached.
- **Given** events do not share driver, behaviour and trip, **when** the manager
  selects them, **then** no group dismissal is offered. Bulk action across
  unrelated events is not available at any size.

## Out of scope for this story

- A structured taxonomy of dismissal reasons. We do not yet know the real
  categories ([[Q-08]]); inventing them now would shape the answers.
- Bulk coaching or bulk recognition. Both require per-event judgement and neither
  is offered in bulk at any point.
