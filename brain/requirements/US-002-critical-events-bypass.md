---
id: US-002
title: Critical events bypass the weekly rhythm
epic: EP-01
persona: fleet-manager
phase: v1
priority: must
size: S
metrics: [M-05, M-10]
risks: [R-01]
assumptions: [A-10]
decisions: [ADR-0002, ADR-0007]
status: proposed
drafted_by: agent
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

## Out of scope for this story

- Notification outside the portal — email, SMS or push. v1 requires the manager
  to be in the portal to see the indicator, which is a known weakness and is
  named as such in [[../phasing]].
- Escalation to anyone else when a critical event goes unreviewed.
