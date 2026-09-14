---
id: US-005
title: Watch the clip with enough before and after to judge it
epic: EP-02
persona: fleet-manager
phase: v1
priority: must
size: M
metrics: [M-10, M-09]
risks: [R-02]
assumptions: [A-09]
decisions: [ADR-0002, ADR-0005]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-005 — Watch the clip with enough before and after to judge it

**As a** fleet manager
**I want** to see what happened either side of the event, not just the moment
itself
**so that** I can tell the difference between bad driving and a bad situation.

## Acceptance criteria

- **Given** footage is available, **when** the manager opens an event, **then**
  playback offers at least 6 seconds before and 6 seconds after the trigger, and
  starts paused at 3 seconds before it.
- **Given** the device has more than one camera channel, **when** the event is
  opened, **then** available channels are selectable, and the road-facing
  channel is shown first.
- **Given** the event is classified credit or neutral ([[ADR-0010]]), **when**
  the clip is displayed, **then** the same controls and context window are
  offered — a driver being recognised gets the same evidence as one being
  coached.
- **Given** the manager has not played the clip, **when** they attempt to record
  a coaching conversation, **then** the action is unavailable ([[ADR-0005]],
  enforced in [[US-010]]).

## Out of scope for this story

- Frame-by-frame scrubbing, export, redaction, or sharing footage outside the
  portal.
- Any change to what the device records or how long it keeps it.
