---
id: ADR-0005
title: No coaching action without viewed footage
status: accepted
date: 2026-09-10
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-07]
risks: [R-04, R-07]
metrics: [M-08, M-10, M-12]
---

# ADR-0005 — No coaching action without viewed footage

## Context

Under [[ADR-0002]] some events reach the queue with metadata but no footage yet.
The tempting shortcut is to let a manager act on a well-scored event — "harsh
braking, 0.6g, 40mph zone" — without waiting for the clip. It is faster, it
keeps the queue moving, and it will be requested.

It is also how you have a coaching conversation about something you have not
seen. The metadata says the vehicle decelerated hard. It does not say a child
stepped into the road.

## Decision

**A coaching action cannot be created on an event whose footage the manager has
not viewed.** Dismissal remains available at any time, including on events with
no footage — a manager may always decide something is not worth pursuing.

## Alternatives considered

**Allow coaching on metadata with a warning.** Rejected. A warning transfers
responsibility without changing behaviour, and the cost lands on the driver, who
did not see the warning.

**Block both coaching and dismissal until footage arrives.** Rejected: it makes
the queue unclearable through no fault of the manager, which breaks the one
property the queue must have. Dismissing something unseen is a legitimate
judgement; coaching someone about something unseen is not.

**Allow coaching on metadata for inertial events only**, on the grounds that
g-force is objective. Rejected — this is precisely the case where the number is
objective and the meaning is not.

## Consequences we accept

1. **Fetch latency becomes a workflow blocker, not just an annoyance.** [[M-10]]
   moves from a health metric to a gating one, and a slow fetch path directly
   suppresses coaching volume ([[M-08]]).
2. Some events will never be coachable because footage never arrives. That is a
   real loss and it must show up in the metrics rather than being quietly
   absorbed.
3. Managers who want to move fast will find this annoying. Accepted: the
   alternative is upheld disputes ([[M-12]]) and the collapse of the fairness
   constraint in [[canon]] C-07.

## Revisit when

Never, on principle. What *can* change is how fast footage arrives, which is a
platform problem and the right place to spend effort in response to complaints
about this rule.
