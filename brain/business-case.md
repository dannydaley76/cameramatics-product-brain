---
id: BC
title: Product brief and business case
status: draft
owner: danny
section: 1
assumptions: [A-01, A-02, A-03, A-06, A-08]
metrics: [M-01, M-02, M-03, M-05, M-07, M-09, M-11, M-12]
risks: [R-01, R-06, R-08]
questions: [Q-01, Q-02, Q-04, Q-06]
links: [problem, jtbd, canon]
adversarial_pass: ran 2026-09-14
---

# Product brief — risky-driving detection and coaching

## The problem, in one line

Fleet managers cannot turn a firehose of detected driving events into a small,
repeatable weekly routine that measurably changes driver behaviour.

Detection is table stakes and increasingly commodity at the edge. The thing that
is not solved — and the thing every rollout dies on — is that a 100-vehicle
fleet produces somewhere between 50 and 450 detectable events a day ([[A-02]]),
and the manager has fifteen minutes ([[A-03]]). Most events are technically
correct and practically irrelevant. The manager logs in, sees hundreds, reviews
six, and stops logging in.

**So the capability we are designing is a triage and coaching loop, not an event
detector.** Everything downstream follows from that.

## The job to be done

> "When my drivers are out on the road and I can't see what they're doing, I
> want to know which of them is about to cost me a collision and be able to have
> a short, fair conversation about it — without spending my week watching video."

Primary user for v1 is the fleet manager of a 20–150 vehicle fleet with no
dedicated safety manager ([[A-01]], [[personas/fleet-manager]]). Safety is one
of six things they own. They know their drivers personally and will abandon any
tool that makes them the enemy or that loses them a coaching argument. Full
forces analysis in [[jtbd]].

## Why it matters commercially

Two-sided, and I would state both — a business case that only argues the
customer's side is a marketing claim.

**For the customer: total cost of risk.** At-fault collisions are the expensive
line — repair, third-party liability, vehicle off-road, admin, and the premium
consequences that follow. The value is not "we spotted harsh braking"; it is
that a small number of drivers are responsible for a disproportionate share of
that cost and this is the first mechanism that finds them before the incident
rather than after it. Secondary: better evidence on not-at-fault claims, which
closes them faster and reduces leakage.

**For CameraMatics: revenue on an installed base we have already paid to
acquire.** Cameras are fitted, the vehicles are connected, the customer
relationship exists. A safety module priced per vehicle per month is uplift at
near-zero incremental acquisition cost ([[A-08]]) — and, more quietly, it is
retention: hardware is sticky but contracts churn when the software goes unused,
and a weekly review habit is the strongest renewal signal we could build.

**Insurance is the upside case, not the headline.** Premium influence depends on
an insurer partnership and an agreed evidence standard, which is not ours to
grant ([[A-06]], [[Q-06]]). I would carry it as an explicit upside with a named
validation step rather than lead with a number I cannot source. Likewise
competitive parity: real, and not a reason for a Head of Product to lead
([[C-08]]).

**Recommended headline:** *lower cost of risk for the customer, higher revenue
per already-installed vehicle for us* — with insurance as upside and manager
time saved as the leading indicator rather than the prize.

## How we would measure success

Four layers, because the outcome the buyer wants is not readable inside a
quarter and the metric that *is* readable is a habit ([[registers/metrics]]).

| Layer | Metric | Why this one |
|---|---|---|
| Outcome (6–12 mo) | At-fault collisions per 100 vehicles per month ([[M-01]]) | What the buyer is actually buying |
| Behaviour (4–12 wk) | Coached-driver 28-day repeat rate ([[M-03]]) | The primary product metric: did the loop change anything |
| Habit (week 1) | Weekly reviewing accounts ([[M-07]]), high-severity events triaged in 7 days ([[M-05]]), median review time under 90s ([[M-06]]) | The earliest honest signal; if this decays the outcome will never arrive |
| Quality (week 1) | High-severity dismissal rate under 20% ([[M-09]]), video available for 98% of events within 15 min ([[M-10]]) | Trust in the ranking, and the fact that an event without footage is not coachable |

And two counter-metrics I would report at the same cadence, because this
capability has an obvious way to cheat: share of events auto-suppressed
([[M-11]]) — we must not buy adoption by hiding real risk — and driver
disputes plus coached-cohort attrition ([[M-12]]).

**The 90-day test I would sign up to.** If, ninety days after first release, we
cannot show that most live accounts have a weekly review habit and that coached
drivers' repeat rate is measurably lower than an uncoached cohort, the
capability has failed — regardless of how good the detection is. I would rather
be held to that than to a collision number nobody can attribute inside a year
([[R-06]]).

## What would make me wrong

The whole brief rests on event volume being high enough that attention is the
binding constraint ([[A-02]], [[Q-02]]). Thirty days of telemetry from ten
fleets settles it, and I would want that before committing engineering. If
volume turns out to be an order of magnitude lower, this is a detection-breadth
product and I would rewrite the brief.
