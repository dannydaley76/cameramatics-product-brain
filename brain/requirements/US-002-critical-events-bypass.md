---
id: US-002
title: Critical events bypass the weekly rhythm
epic: EP-01
persona: fleet-manager
phase: v1
priority: must
size: S
metrics: [M-05, M-10]
risks: [R-01, R-04]
assumptions: [A-10]
decisions: [ADR-0002, ADR-0007, ADR-0011]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-002 — Critical events bypass the weekly rhythm

**As a** fleet manager
**I want** collision-grade events to reach me immediately rather than waiting
for the weekly set
**so that** I am not reading about an impact five days after it happened.

## Acceptance criteria

- **Given** an event is classified critical, **when** it is ingested, **then** it
  appears at the top of the review set within 5 minutes of the platform
  receiving it, regardless of the current week's state.
- **Given** a critical event exists and is unreviewed, **when** the manager opens
  any screen in the capability, **then** a persistent indicator shows the count
  of unreviewed critical events.
- **Given** a critical event is created, **when** the platform processes it,
  **then** footage upload is initiated unconditionally and not subject to the
  severity gate ([[ADR-0002]]).
- **Given** the weekly set closes ([[US-003]]), **when** an unreviewed critical
  event exists, **then** that event is **not** closed with the set and remains
  outstanding.

- **Given** a critical event has been unreviewed for 15 minutes, **when** the
  platform evaluates notifications, **then** an email is sent to the account's
  nominated recipients with the subject *"A critical event needs review"*.
- **Given** that email is composed, **when** it is sent, **then** it contains the
  vehicle, the time and a link to the event, and contains **no driver name, no
  footage, no still image and no location detail** ([[ADR-0011]]). Anyone who
  needs those signs in.
- **Given** several critical events occur within 15 minutes on one account,
  **when** notification is evaluated, **then** one email is sent stating the
  count, not one per event.
- **Given** an event is graded high, medium or low, **when** notification is
  evaluated, **then** no email is sent. Email is critical-band only.

## Out of scope for this story

- SMS, push, or any channel other than email ([[ADR-0011]]).
- Escalation to anyone else when a critical event goes unreviewed, and any
  reminder after the first email.
- Managing who the nominated recipients are — account configuration, assumed to
  exist.
