---
id: US-013
title: Send a medium-band group to the driver
epic: EP-03
persona: fleet-manager
phase: v1
priority: should
size: S
metrics: [M-11, M-12]
risks: [R-04, R-12]
decisions: [ADR-0004, ADR-0007]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-013 — Send a medium-band group to the driver

**As a** fleet manager
**I want** to pass on the events a driver should know about without holding a
conversation about each one
**so that** the driver is informed rather than surprised, and my time goes to the
events that need me.

## Acceptance criteria

- **Given** medium-band events exist for a driver, **when** the manager views
  that driver's grouping, **then** the action *"Send to driver"* is available for
  the group.
- **Given** the manager sends a group, **when** the record is written, **then**
  it captures who sent it, when, and which events it covered, and appears on the
  driver's record as informed rather than coached.
- **Given** no delivery channel is configured, **when** the manager sends a
  group, **then** the record is still created and the confirmation reads:
  *"Recorded. There is no driver app yet, so pass this on when you next speak."*
  — the action is defined in v1, the delivery is not ([[ADR-0007]]).
- **Given** a group has been sent, **when** [[M-03]] is calculated, **then**
  those events do **not** count as coaching actions. Informing is not coaching
  and must not flatter the coaching numbers.

## Out of scope for this story

- The delivery channel itself — app, SMS, email, acknowledgement, read receipt.
  Specified as deferred in [[../prd]] rather than left unstated.
- Any automatic sending. A human decides every time ([[ADR-0007]]).
