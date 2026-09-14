---
id: ADR-0011
title: Email notification for critical events, carrying almost nothing
status: accepted
date: 2026-09-14
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: ran 2026-09-14
assumptions: [A-07, A-12]
risks: [R-01, R-04]
metrics: [M-05]
questions: [Q-05]
---

# ADR-0011 — Email notification for critical events, carrying almost nothing

## Context

[[US-002]] gives critical events a bypass so they reach the top of the review set
immediately. That only works if the manager is in the portal. A collision-grade
event detected at 16:40 on a Friday, seen on Monday, is not a bypass — it is a
sorting rule.

CameraMatics already use email in this workflow: their published coaching flow
sends a depot manager "an email alert" when an event is shared ([[A-12]]). So
the channel exists, the customer expects it, and we are not introducing a new
integration.

## Decision

**Critical events trigger an email. The email carries almost nothing.**

- Sent to the account's nominated recipients when a critical event has been
  unreviewed for 15 minutes.
- Content: that a critical event needs review, the vehicle, the time, and a link
  into the portal.
- **No driver name. No footage. No still image. No location detail.** Anyone who
  needs those signs in.
- Rate-limited to one email per account per 15 minutes, summarising the count —
  a real incident generates several critical events and we will not send six
  emails about one crash.
- Critical band only. Nothing else generates email in v1.

## Alternatives considered

**In-portal only** — the previous position. Rejected: it makes the bypass
conditional on the manager already being there, which is the situation the
bypass exists for.

**A full notification with driver, location and a still image.** More
immediately useful, and rejected on data minimisation. Footage and driver
identity are personal data ([[A-07]]); pushing them into an inbox that gets
forwarded, read on a shared screen and retained outside our retention policy
creates exposure we cannot control and did not need. The link costs the manager
three seconds.

**SMS or push.** Both need a channel we do not have and neither is reliably
read by this user. Email is what they already use.

**Email for high-band events too.** Rejected: high-band events are what the
weekly set is *for*, and emailing them would rebuild the firehose in a place
where we cannot triage it.

## Consequences we accept

1. **The email is nearly useless on its own**, by design. A manager who cannot
   sign in learns only that something needs attention. That is the correct
   trade against putting footage of a named person in an inbox.
2. **Deliverability is now on the critical path** for the one event class where
   latency matters, and email is not a reliable transport. This does not remove
   [[R-01]]; it reduces one instance of it.
3. **Nominated recipients need managing**, which is account configuration we
   otherwise avoided. Accepted as narrow: who receives, not what surfaces
   ([[ADR-0003]] draws that line).
4. **A quiet week produces no email at all**, so absence of email is not
   evidence the system is working. Watched through [[M-05]], not through the
   inbox.

## Revisit when

A driver or manager channel ships and can carry this better, or measured
time-to-first-view on critical events shows email is not moving it.
