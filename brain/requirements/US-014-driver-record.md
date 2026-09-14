---
id: US-014
title: A driver record that shows both sides
epic: EP-04
persona: fleet-manager
phase: v1
priority: must
size: M
metrics: [M-03, M-13, M-12]
risks: [R-06, R-09]
decisions: [ADR-0010]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-014 — A driver record that shows both sides

**As a** fleet manager
**I want** one page per driver showing what happened, what was said, and what
they got right
**so that** I can have a fair conversation and answer "is this working" for that
person.

## Acceptance criteria

- **Given** a driver record is opened, **when** it is displayed, **then** it
  shows, on one page: events by band, coaching conversations with the driver's
  response, confirmed recognitions, and neutral events recorded on the driver's
  side.
- **Given** a driver has been coached on a behaviour, **when** the record is
  displayed, **then** the rate of that behaviour in the 28 days before and after
  the conversation is shown, labelled as a comparison rather than as proof
  ([[R-06]]).
- **Given** fewer than 4 weeks of post-coaching data exist, **when** the
  comparison would be displayed, **then** it reads:
  *"Too early to say. This needs 4 weeks after the conversation."*
  and no figure is shown.
- **Given** attribution gaps exist for this driver, **when** the record is
  displayed, **then** the number of events that could not be attributed is
  stated, so the record is not read as complete when it is not ([[R-09]]).

## Out of scope for this story

- Ranking drivers against each other, league tables, or a single headline driver
  score in this view.
- Exporting the record. Showing it to the driver on screen is the v1 path.
