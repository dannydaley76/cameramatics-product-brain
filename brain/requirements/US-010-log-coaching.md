---
id: US-010
title: Record a coaching conversation from the clip
epic: EP-03
persona: fleet-manager
phase: v1
priority: must
size: M
metrics: [M-08, M-03]
risks: [R-07, R-04]
decisions: [ADR-0005]
status: proposed
drafted_by: agent
---

# US-010 — Record a coaching conversation from the clip

**As a** fleet manager
**I want** to log the conversation in one step while I am looking at the footage
**so that** recording it costs less than not recording it.

## Acceptance criteria

- **Given** the manager has played the clip, **when** the event is displayed,
  **then** the action *"Log coaching conversation"* is available.
- **Given** the manager has **not** played the clip, **when** they attempt to log
  a coaching conversation, **then** the action is unavailable and reads
  *"Watch the clip before recording a conversation"* ([[ADR-0005]]).
- **Given** the manager logs a conversation, **when** the form is displayed,
  **then** two fields are required: the behaviour, pre-filled from the
  classification, and **what was discussed and agreed** in free text. A status
  change with no content is not a coaching record.
- **Given** the manager submits with the discussion field empty, **when** they
  attempt to save, **then** the action is unavailable. *"Spoke to driver"* is
  explicitly **not** an acceptable complete record — it is the tick-box this
  requirement exists to prevent.
- **Given** a coaching record is saved, **when** it is displayed, **then** it
  contains the clip reference, what was discussed and agreed, and the driver's
  response ([[US-011]]) — enough for a third party to see what happened rather
  than that something happened.
- **Given** a coaching record is created, **when** it is saved, **then** it is
  attached to the driver, the event and the footage reference, and is
  retrievable as a single artefact the manager could show the driver.
- **Given** a coaching record exists, **when** [[M-03]] is calculated, **then**
  the coached behaviour and date anchor the 28-day repeat window.

## Out of scope for this story

- Structured coaching content, training assignment, or any curriculum. The
  required field is one free-text box, not a form — the discipline is that
  *something happened and here is what*, not that it was filled in correctly.
- Sending the record anywhere. The driver sees it when the manager shows them
  ([[ADR-0004]]).
- Scheduling. This records a conversation, it does not arrange one.
