---
id: US-003
title: The weekly set closes, and what it leaves behind is visible
epic: EP-01
persona: fleet-manager
phase: v1
priority: must
size: M
metrics: [M-05, M-07]
risks: [R-11]
assumptions: [A-10]
decisions: [ADR-0009]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-003 — The weekly set closes, and what it leaves behind is visible

**As a** fleet manager
**I want** last week's set to close rather than roll forward
**so that** a bad week does not grow into a backlog I will never face.

## Acceptance criteria

- **Given** a new week begins, **when** the previous set contains unreviewed
  items, **then** those items move to a closed state and no longer appear in the
  current set.
- **Given** items closed unreviewed, **when** the manager opens the current set,
  **then** the count is stated on the face of the set, worded exactly:
  *"{n} events closed unreviewed last week."*
  and never as a construction that makes it the manager's failure — *"you have
  {n} unreviewed events"* is the banned form ([[../../skills/ux-writing]] W-03,
  [[canon#C-29]]). *Earlier wording of this criterion said "never as a
  second-person construction", which is not what W-03 says: W-03 is about blame,
  and the skill uses second person throughout.*
- **Given** an event closed unreviewed, **when** the manager opens it from the
  closed set, **then** every action available before closure remains available,
  and footage is retrievable if within the device retention window ([[A-10]]).
- **Given** footage is no longer retrievable, **when** the closed event is
  opened, **then** the footage panel reads:
  *"Footage no longer available. This event is outside the {n}-day window the
  camera keeps."*
- **Given** an event closed unreviewed, **when** platform metrics are computed,
  **then** it is not counted as having reached a terminal review state — closed
  is neither coached nor dismissed — so [[M-05]] measures review rather than the
  passage of time.
- **Given** an account has two or more consecutive weeks with unreviewed
  closures, **when** platform metrics are emitted, **then** that account is
  flagged in [[M-07]] reporting as a product defect signal ([[canon#C-29]]).

## Out of scope for this story

- Any re-engagement behaviour in response to sustained non-use. Deliberately
  deferred to phase 2 and named as deferred in [[ADR-0009]] — displaying the
  number is a receipt, not a solution.
- Carrying unreviewed items forward, which was considered and rejected.
