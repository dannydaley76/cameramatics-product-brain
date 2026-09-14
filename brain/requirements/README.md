---
id: REQS
title: Portal requirements — epics and stories
status: draft
owner: danny
stage: requirements
drafted_by: agent
decided_by: danny
adversarial_pass: not run
produced_with: skills/user-stories.md, skills/ux-writing.md
links: [[../prd]] [[../success-criteria]] [[../decisions/ADR-0007]] [[../decisions/ADR-0010]]
---

# Portal requirements

The fleet manager's review-and-coaching experience, written against
[[../../skills/user-stories]]. User-visible strings are written against
[[../../skills/ux-writing]]; where copy is load-bearing the acceptance criterion
quotes the exact string, because "shows an appropriate message" is untestable.

Depth is weighted deliberately. EP-01 to EP-03 carry full acceptance criteria —
they are the loop the brief asks about. EP-04 is specified more lightly, and
says so.

## Epics

**EP-01 — Weekly review set.** *As a fleet manager, I want a short ranked set of
the events that matter this week, so that I can finish it rather than scan a
feed that never ends.*
→ US-001, US-002, US-003, US-004

**EP-02 — Event review.** *As a fleet manager, I want to see what happened and
why it was graded and classified as it was, so that I can decide what to do and
defend that decision to the driver.*
→ US-005, US-006, US-007, US-008, US-009

**EP-03 — Coaching and recognition.** *As a fleet manager, I want to record a
conversation with a driver — critical or complimentary — in one step from the
clip, so that the record exists without the logging costing more than the
conversation.*
→ US-010, US-011, US-012, US-013

**EP-04 — Improvement over time.** *As a fleet manager, I want to see whether
coached drivers actually changed, so that I can answer "is this working" without
overstating what the data supports.*
→ US-014, US-015

## What these requirements do not cover

Driver-facing surfaces of any kind ([[../decisions/ADR-0004]]), depot-manager
handover ([[../decisions/ADR-0006]]), customer configuration of what surfaces
([[../decisions/ADR-0003]]), and the delivery channel behind "send to driver"
([[../decisions/ADR-0007]]). Each is a recorded decision rather than an omission.
