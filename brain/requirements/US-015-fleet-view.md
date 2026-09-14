---
id: US-015
title: A fleet view that does not overstate what it knows
epic: EP-04
persona: fleet-manager
phase: v1.1
priority: should
size: M
metrics: [M-04, M-03, M-07]
risks: [R-06]
decisions: [ADR-0010]
status: proposed
drafted_by: agent
adversarial_pass: ran 2026-09-14
---

# US-015 — A fleet view that does not overstate what it knows

**As a** fleet manager
**I want** a fleet-level view of where risk sits and whether it is moving
**so that** I can answer the MD without claiming more than the data supports.

*Specified more lightly than EP-01 to EP-03, deliberately. This is the part of
the brief where reporting is expected; it is not where the loop lives, and
over-specifying it now would be guessing.*

## Acceptance criteria

- **Given** the fleet view is opened, **when** it is displayed, **then** it shows
  the distribution of drivers across risk bands and its direction over the last
  three months ([[M-04]]).
- **Given** a trend is displayed, **when** the underlying population is under 20
  drivers or under 8 weeks, **then** the trend is shown with an explicit
  statement that it is not yet readable, rather than being hidden or presented
  plainly.
- **Given** any outcome claim is displayed, **when** it is rendered, **then** it
  is expressed as counts rather than as a percentage improvement — *"12 of 40
  coached drivers had fewer events in the following four weeks"*, never *"your
  fleet is 23% safer"* ([[../../skills/ux-writing]] W-07, [[R-06]]).
- **Given** recognition records exist, **when** the fleet view is displayed,
  **then** recognition volume appears alongside coaching volume ([[M-13]]),
  because a fleet where the product only ever criticised is a finding.

## Out of scope for this story

- Collision outcome reporting ([[M-01]]). It is not readable at single-fleet
  scale inside a quarter and putting it on a dashboard invites exactly the claim
  we cannot defend.
- Export, scheduled reports, or board-pack generation.
- Benchmarking against other fleets.
