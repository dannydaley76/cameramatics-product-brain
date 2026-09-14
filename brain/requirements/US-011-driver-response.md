---
id: US-011
title: Capture the driver's response in their own words
epic: EP-03
persona: fleet-manager
phase: v1
priority: must
size: XS
metrics: [M-12]
risks: [R-04]
assumptions: [A-12]
decisions: [ADR-0004, ADR-0010]
status: proposed
drafted_by: agent
---

# US-011 — Capture the driver's response in their own words

**As a** fleet manager
**I want** to record what the driver said about the event
**so that** the record has two sides, and a disagreement has somewhere to live
before it becomes a grievance.

## Acceptance criteria

- **Given** a coaching record is being created or reopened, **when** the form is
  displayed, **then** a field labelled *"What the driver said"* is offered and is
  optional.
- **Given** the driver disagreed with the event, **when** the manager records
  that, **then** the record can be marked *"Driver disputes this"* and that mark
  is retained on the driver's record.
- **Given** a disputed record exists, **when** [[M-12]] is calculated, **then**
  it contributes to disputes raised per 100 coaching actions.
- **Given** a driver's record is displayed, **when** it contains disputed events,
  **then** the dispute is shown alongside the event rather than in a separate
  view.

## Out of scope for this story

- Any route for the driver to enter this themselves — no channel exists in v1
  ([[ADR-0004]]). The manager types what they were told, which is what
  CameraMatics' existing workflow already does and what this design had
  mistakenly dropped.
- Resolution workflow for a dispute. Recording one is in scope; adjudicating it
  is not.
