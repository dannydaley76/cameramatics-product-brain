---
id: US-001
title: A weekly review set that can be finished
epic: EP-01
persona: fleet-manager
phase: v1
priority: must
size: M
metrics: [M-05, M-07]
risks: [R-01, R-11]
assumptions: [A-19]
decisions: [ADR-0007, ADR-0009]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-001 — A weekly review set that can be finished

**As a** fleet manager
**I want** a short, ranked set of this week's events that need me
**so that** I can work through it to the end rather than scan a list that never
empties.

## Acceptance criteria

- **Given** high-band events exist for the current week, **when** the manager
  opens the review set, **then** they are listed newest-risk-first by severity
  score, and the count of remaining items is visible without scrolling.
- **Given** an event has been graded medium or low ([[ADR-0007]]), **when** the
  review set is displayed, **then** that event does not appear as an individual
  row, and is reachable through the band filters.
- **Given** the manager has reached a terminal state on every item, **when** the
  set is displayed, **then** it reads exactly:
  *"Nothing needs your attention this week."*
  followed by *"{n} events were graded and handled without you. You can look at
  any of them."*
- **Given** events were graded this week, **when** the set is displayed,
  **then** the band distribution for the week is visible from the same screen
  ([[M-11]]) — nothing is hidden, only routed.
- **Given** the set contains credit-classified events ([[ADR-0010]]), **when**
  it is displayed, **then** they appear in the same set as risk events and are
  visually distinguishable without using colour alone.

## Out of scope for this story

- Sort or filter controls beyond the band filters. Ranking is our responsibility
  ([[ADR-0003]]).
- Any per-account configuration of set size or composition.
- The behaviour of the set at week boundaries — see [[US-003]].
