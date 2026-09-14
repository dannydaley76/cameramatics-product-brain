---
id: SUCCESS
title: Success criteria — how we would know
status: accepted
owner: danny
stage: discovery
drafted_by: agent
decided_by: danny
adversarial_pass: not run
metrics: [M-01, M-03, M-05, M-07, M-09, M-10, M-11, M-12]
risks: [R-06, R-09]
questions: [Q-07]
links: [[annotated-brief]] [[business-case]] [[registers/metrics]]
---

# Success criteria

The brief asks for fewer collisions and better driver safety. That is the right
outcome and it is not a workable measure: collision base rates are low, fleets
are small, seasonality is real, and at single-fleet scale the number is not
readable inside a quarter ([[R-06]]). Something honest has to stand in front of
it.

## The headline measure

**Dismissal rate at the top of the queue** ([[M-09]]) — of the events we pushed
hardest as high severity, what share does the fleet manager judge not worth
acting on. Target under 20%.

This is the headline because it tests the claim the submission is built on. The
argument is that attention is the scarce resource and triage is the product. If
the top of the queue is trustworthy, the loop works and everything downstream
becomes possible. If it is not, nothing downstream matters — a manager who sees
two pieces of nonsense in their first session discounts the ranking permanently
([[R-02]]).

It also has three properties the alternatives lack. It is measurable from week
one. It needs no driver attribution, which may not exist ([[R-09]]). And it needs
no control cohort. It is a workflow metric rather than a model metric by design:
we have no ground truth about what happened on the road, we have a manager's
judgement — and that judgement is precisely what adoption depends on.

## Beside it — the leading indicator

**Weekly reviewing accounts** ([[M-07]]) — the share of live accounts with at
least one review session in a given week. Target above 80% by week four of an
account going live.

This is the earliest honest signal that the capability will or will not work. It
is an engagement metric and should be read as one: it predicts the outcome
rather than proving it. Treat a decline as a product defect rather than a
customer-success problem.

Supported by median review time per event under 90 seconds ([[M-06]]) and
high-severity events triaged within seven days above 90% ([[M-05]]).

## Behind it — the six-month proof

**Coached-driver 28-day repeat rate** ([[M-03]]) — of drivers coached on a
behaviour, what share reduce that behaviour over the following four weeks.

This is the closest thing to real value and the hardest to produce honestly. It
needs reliable driver attribution and an uncoached control cohort, because
regression to the mean will flatter it otherwise ([[Q-07]]). Reported with those
caveats stated every time, or not reported.

## The counter-metrics

Two, reported at the same cadence, because this capability has an obvious way to
cheat.

**Share of events auto-suppressed** ([[M-11]]), with a weekly human sample of
what was suppressed. *This one came out of the Discovery conversation and is the
sharper half of the measurement model.* The instinct was to measure "events
successfully excluded by triage" — and the word doing the damage is
*successfully*, because you cannot know an exclusion was correct without looking
at what you binned. So the honest version is not a success measure at all. It is
an audit: report how much we are hiding, sample it, and look for real risk in
the pile. If we buy adoption by suppressing events that mattered, we have built
something worse than the firehose.

**Driver disputes and coached-cohort attrition** ([[M-12]]) — disputes per 100
coaching actions, the share upheld, and voluntary attrition among coached
drivers against the fleet average. A rising upheld-dispute rate invalidates
[[M-03]] regardless of what the number says.

## The 90-day test

> If, ninety days after first release, most live accounts do not have a weekly
> review habit and the dismissal rate at the top of the queue is above 20%, the
> capability has failed — regardless of how good the detection is.

Signing up to that is deliberate. It is a claim that can be checked, on a
timescale where it can be acted on, using data that will exist. A collision
number nobody can attribute inside a year is not a commitment, it is a hope with
a deadline attached.
