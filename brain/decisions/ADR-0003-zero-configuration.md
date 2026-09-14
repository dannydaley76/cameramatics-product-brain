---
id: ADR-0003
title: No customer-configurable sensitivity in v1
status: accepted
date: 2026-09-10
supersedes: none
decided_by: danny
drafted_by: agent
adversarial_pass: not run
assumptions: [A-01, A-03]
risks: [R-01, R-02]
metrics: [M-07, M-09]
---

# ADR-0003 — No customer-configurable sensitivity in v1

## Context

The obvious answer to "too many events" is a sensitivity setting. It is also the
most requested feature in this category, and it is what the competition ships.

Our primary user is a fleet manager with fifteen minutes a day who is not a data
person and will not tune a threshold ([[personas/fleet-manager]], [[A-03]]).
Giving them a slider transfers our hardest problem to the person least equipped
to solve it, and then lets us describe the resulting noise as their
configuration choice.

## Decision

**v1 ships with no customer-facing sensitivity, threshold or event-type
configuration.** Defaults are set by us and tuned centrally via remote config.

## Alternatives considered

**Expose sensitivity per event type.** Rejected: it converts a product
responsibility into a support burden, and it destroys the comparability that
makes central tuning possible — every account becomes its own experiment with no
control.

**Expose a single global "sensitivity: low / medium / high".** The strongest
alternative, and close. Rejected for v1 because a global control is most likely
to be used exactly once, in week one, in the wrong direction: a manager
overwhelmed on day three sets it to low and never returns. We would have
substituted a setting for the triage we were supposed to build.

**Per-account tuning by CS, invisible to the customer.** Effectively what remote
config gives us, and what we will actually do. Worth naming as the accepted
half of this decision rather than pretending no tuning happens.

## Consequences we accept

1. **We own the noise.** If the queue is wrong there is nobody else to point at,
   and [[M-09]] is on us.
2. Some sophisticated customers will ask for control and a few will treat its
   absence as immaturity. Answerable in a sales conversation; not answerable if
   the queue is bad.
3. Central tuning needs the telemetry and the operational discipline to actually
   do it. A default nobody revisits is worse than a setting.

## Revisit when

Accounts reach the point of asking for control *after* their dismissal rate is
already low — that is a request for expressiveness rather than for relief, and
it is a different and much safer feature.

---

## Addendum, 2026-09-14 — what they already ship

Research after this ADR was written establishes that CameraMatics shipped
customer-facing configuration in April 2024: distraction split into looking
left / right / down, phone use separated from general distraction, and an
alert trigger window tunable from 2–8 seconds ([[A-15]]).

That is a real and sensible response to alert noise, and it is a *different*
strategy from the one here. Configuration lowers the **rate** at which events are
generated. Triage decides **which of the survivors deserve a person**. They are
complementary, and this ADR should not be read as arguing against what they
built.

So the decision narrows rather than reverses: **no configuration of what
surfaces** — the ranking is our responsibility and handing it over transfers our
hardest problem to the person least equipped to solve it. Configuration of
detection sensitivity, presentation and routing is legitimate and already exists.

Stated plainly because arriving at an interview to argue against a feature the
company shipped two years ago, without acknowledging it, is a bad way to open.
