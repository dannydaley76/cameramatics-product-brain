---
id: US-008
title: Resolve who was driving
epic: EP-02
persona: fleet-manager
phase: v1
priority: must
size: M
metrics: [M-03]
risks: [R-09]
assumptions: [A-11]
questions: [Q-09]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-008 — Resolve who was driving

**As a** fleet manager
**I want** to be told when the system does not know who was driving, and to be
able to say
**so that** nobody is coached for someone else's shift.

## Acceptance criteria

- **Given** attribution confidence is below the accepted threshold, **when** the
  event is displayed, **then** the driver field reads *"Driver not identified"*
  and offers the action *"Say who was driving"*. The system never displays a
  guessed name.
- **Given** the driver is unidentified, **when** the manager attempts to record a
  coaching conversation or confirm recognition, **then** the action is
  unavailable until a driver is set.
- **Given** the manager sets a driver, **when** the event is saved, **then** the
  record retains that it was set by a human and by whom, distinguishably from a
  system attribution.
- **Given** events exist with unresolved attribution, **when** platform metrics
  are emitted, **then** attribution coverage is reported per account
  ([[R-09]]) — an inherited gap rate we measure rather than assume.
- **Given** attribution is unresolved, **when** the event contributes to
  per-driver measurement, **then** it is excluded from [[M-03]] rather than
  attributed to a best guess.

## Out of scope for this story

- Building or changing the attribution mechanism itself, which is inherited
  ([[A-11]]) and whose shape is an open question ([[Q-09]]).
- Facial identification. It would close the gap and is disproportionate.
