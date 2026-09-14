---
id: US-012
title: Confirm recognition for a driver who avoided harm
epic: EP-03
persona: fleet-manager
phase: v1
priority: must
size: M
metrics: [M-13, M-12]
risks: [R-13]
decisions: [ADR-0010]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-012 — Confirm recognition for a driver who avoided harm

**As a** fleet manager
**I want** to confirm and record that a driver's action prevented harm
**so that** the only time this system speaks about a driver is not to criticise
them ([[canon#C-30]]).

## Acceptance criteria

- **Given** an event is classified credit, **when** it is displayed, **then** it
  is marked *proposed* and the available action is *"Confirm recognition"*.
  Recognition is never recorded without a human confirming it ([[R-13]]).
  *Since [[ADR-0014]] this is an instance of a general rule rather than a
  special case: every classification is proposed and confirmed. What remains
  particular to credit is that the confirmation is also what reaches a driver.*
- **Given** the manager has not played the clip, **when** they attempt to confirm
  recognition, **then** the action is unavailable — the same evidence rule that
  governs coaching ([[ADR-0005]]).
- **Given** recognition is confirmed, **when** the record is written, **then** it
  names the act, the place and the time and attaches the clip, for example:
  *"Tuesday 14:06, Mill Lane. Stopped in time for a cyclist who came out of the
  junction."* — never a badge, streak, score or emoji
  ([[../../skills/ux-writing]] W-06).
- **Given** the manager judges the credit classification wrong, **when** they
  review it, **then** they can reclassify it to risk or neutral with a reason,
  and that correction is eligible for the downgrade audit.
- **Given** recognition records exist, **when** [[M-13]] is calculated, **then**
  the recognition-to-coaching ratio is emitted per account. No target is set on
  it, ever — a quota manufactures unearned praise.

## Out of scope for this story

- Delivering recognition to the driver through any channel ([[ADR-0004]]). The
  manager shows them, as with coaching.
- Any aggregate "safest driver" surface, league table or ranking of drivers by
  recognition.
