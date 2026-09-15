---
id: RISK
title: Risks, assumptions and open questions — what this rests on and how it fails
status: accepted
owner: danny
section: 5
drafted_by: agent
decided_by: danny
adversarial_pass: not run
produced_with: skills/risk-narrative.md
assumptions: [A-02, A-04, A-10, A-13, A-18, A-19, A-20, A-21, A-23]
risks: [R-01, R-02, R-05, R-06, R-10, R-11, R-12, R-13]
questions: [Q-01, Q-02, Q-03, Q-05, Q-09, Q-10]
metrics: [M-03, M-07, M-09, M-11, M-14, M-15, M-16, M-17]
links: [registers/assumptions, registers/risks, registers/questions, phasing]
---

# Risks, assumptions and open questions

The registers are the record: 23 assumptions, 13 risks, 10 open questions, each
with a confidence, an impact and a way to test it, and
[[../docs/traceability]] maps them to the requirements that move them. This is
the argument about them. It does not repeat them.

One thing to say first, because it colours everything below. **No insider
knowledge went into this.** Every product fact came from public pages, and the
most specific of them is a release note from April 2024 ([[A-18]]). Public
marketing lags shipped product, so absence from a website is not absence from a
product. Where that matters most, it has its own risk ([[R-10]]) rather than a
disclaimer.

---

## The two gates

There are two assumptions whose falsity ends this rather than costing it money,
and they fail in different ways. Saying how they differ is more useful than
ranking them.

**[[A-02]] — event volume, roughly 0.5–3 per vehicle per day. This one breaks
the product.** Everything rests on there being more events than a human can
process: the problem statement, the case for triage over detection breadth, the
upload arithmetic in [[ADR-0002]]. If real volume is an order of magnitude
lower, attention is not the scarce resource, and this is a detection-breadth
product rather than a triage one. That is a rewrite, not an adjustment.
Confidence low, impact critical, and thirty days of telemetry across ten fleets
settles it — which makes it the cheapest critical check in the register and the
reason [[phasing]] puts it in week one, before engineering capacity is
committed.

**[[A-13]] — no event triage exists today. This one breaks the story, not the
requirements.** If CameraMatics already rank and prioritise and simply never
marketed it, a queue is still a queue and most of the requirements survive. What
does not survive is the framing — and it collapses in front of the person who
built the thing. One question answers it ([[Q-10]]), and it should be asked out
loud before defending anything.

I would rather be wrong about A-13 than A-02. Being wrong about A-13 costs a
conversation; being wrong about A-02 costs the premise.

## What the argument rests on, ranked by what breaks

Ranked by consequence rather than by confidence, because a shaky assumption that
changes nothing matters less than a solid one holding up the roof.

| | If it is wrong | Cost to check |
|---|---|---|
| [[A-02]] event volume · *low / critical* | This is a detection product, not a triage one | 30 days of telemetry |
| [[A-19]] volume high enough that reviewing everything is impossible · *medium / critical* | Grading is unnecessary; every event goes to a human | Same telemetry |
| [[A-04]] a material share of the base can run the inference · *low / critical* | This becomes a hardware programme with a multi-quarter lead time, not a software release | Firmware capability audit |
| [[A-10]] 7–14 day device retention · *low / critical* | Promote-and-fetch is unsafe and [[ADR-0002]]'s upload economics change | Engineering answer, days |
| [[A-20]] collision cost is concentrated in a minority of drivers · *low / critical* | Per-driver targeting has no leverage; rank events, not people, and the coaching half loses its justification | One fleet's claims data joined to driver records |
| [[A-21]] rollouts fail on attention, not detection · *medium / critical* | Triage is not the spine | Ask their own customer success which accounts stopped logging in |
| [[A-23]] attribution is solved · *low / critical* | [[phasing]] changes shape: review ships first, coaching waits | [[Q-09]], week one |

Three of those are new since the adversarial pass. [[A-20]], [[A-21]] and
[[A-22]] were being stated as fact across nine places in this repo — industry
beliefs restated often enough internally to look sourced. That is the failure
[[canon#C-01]] exists to catch, and it caught the fifteen-minute attention
budget ([[A-03]]) but not these until somebody went looking. Worth knowing about
a register: it works on what it is pointed at.

## The risks that would actually kill this

Two, and they are the same risk seen from either end.

**[[R-01]] — alert fatigue kills it before the outcome can land.** High
likelihood, high impact. The queue is never empty, the manager reviews a
fraction, engagement decays inside sixty days. Mitigated by the whole design
rather than by a feature: a finite ranked set instead of a feed
([[ADR-0009]]), grading as a product decision rather than a customer setting
([[ADR-0007]]), and [[M-07]] measured weekly from day one and treated as a P1
defect when it falls ([[canon#C-29]]).

**[[R-02]] — precision at the top of the queue is below the trust threshold.**
High likelihood, high impact, and it is R-01's cause. A manager who sees two
events they consider nonsense discounts the ranking permanently. Mitigated by a
narrow trigger set ([[ADR-0012]]), by every event carrying its reasons rather
than a bare score ([[US-006]]), and measured by [[M-09]] — which is now reported
per judgement and per event, because one number was gameable by a mechanism we
introduced ourselves.

**[[R-05]] — installed-base fragmentation limits OTA reach.** High and high, and
the one that most shapes [[phasing]]. It is a delivery risk rather than a design
one: the capability may only reach a fraction of vehicles, and firmware lead
times are months. Treated as a phasing input rather than a requirement, with a
published supported-device matrix gating onboarding — and, since [[ADR-0012]],
gating recognition too.

Two more are survivable but expensive, and both are honest about their limits.
[[R-06]] says we may simply not be able to attribute behaviour change to the
product inside a quarter: the base rate is low, and the answer is an uncoached
control cohort we do not yet know we can build ethically ([[Q-07]]). [[R-10]]
says the diagnosis may be wrong because public sources lag the product — this
one has already been half-realised once, when research reversed three decisions
(J-11, [[judgement-log]]).

## The risks this design created

The section worth reading, because these three did not exist before three
decisions were made here.

**[[R-12]] — mis-grading at the medium/high boundary.** Created by
[[ADR-0007]]. Replacing suppression with grading was right — nothing is
discarded, every event contributes to the driver record — but it moves the
critical failure rather than removing it. It is no longer "we hid something
real"; it is "we sent something that deserved a conversation as a notification
instead", which is invisible unless somebody goes looking.

**[[R-13]] — unearned praise.** Created by [[ADR-0010]]. Recognising drivers who
avoid harm is what makes this defensible to a cab ([[canon#C-30]]), and the cost
is that praising the wrong thing is worse than silence — the drivers who handled
it properly notice, and the recognition becomes a joke, taking the coaching side
down with it.

**[[R-11]] — sustained non-use, and a product that only reports it.** Created by
[[ADR-0009]]. Closing the weekly set rather than rolling it forward is right;
counting the closures and displaying the number is a receipt rather than a
solution, and what to do about it is deliberately deferred rather than guessed.

The first two share a mitigation and it is the same one: the downgrade audit, a
human reading a sample of the low-graded events and the bulk dismissals and
asking how many should have been higher. [[M-11]] says that finding rate
outranks [[M-09]]. So the only control on the grading model is a person reading
events nobody would otherwise read — which spends exactly the resource this
product exists to conserve. [[ADR-0013]] resolves that by putting the audit on
CameraMatics rather than the customer, running from first release as a manual
practice with the tooling deferred. Its cadence and sample rate are open, and
deliberately not guessed.

## Week one — the questions, in order

Six of the ten are blocking, meaning I would not commit build capacity without
an answer. In the order I would ask them:

| | Asked of | What the answer changes |
|---|---|---|
| [[Q-10]] Does the portal already triage? | Commercial | The framing of the whole submission ([[A-13]]). Ask it out loud, first, before defending anything |
| [[Q-02]] Real event volume by type | Engineering | Whether this is a triage product at all ([[A-02]]). If low, stop and rewrite |
| [[Q-03]] Device reach for on-device inference | Engineering | Whether v1 is a software release or a hardware programme, and whether recognition ships in v1 or v1.1 |
| [[Q-09]] How driver identity is established, and coverage | Engineering | Assumed solved here ([[A-23]]). If it is not, v1 splits: review ships, coaching waits |
| [[Q-05]] Lawful basis, retention and works councils per market | Legal | Which markets can have footage-based coaching at all. A market that cannot needs a metadata-only variant — a different product, phased separately |
| [[Q-01]] What a manager's week actually looks like | Customer | What we are entitled to claim we replace, the review rhythm, and the empty state |

The four non-blocking ones are real but they shape rather than gate: [[Q-04]]
pricing, [[Q-06]] what insurers would price against, [[Q-07]] whether an ethical
control cohort is constructible, [[Q-08]] the real taxonomy of dismissal reasons.

## How I would know I was wrong

Signals, with the metric that carries them and when it becomes readable. Not
"monitor closely".

- **Week 4, first live account.** [[M-07]] below 80% of accounts reviewing
  weekly. Under [[canon#C-29]] that is a product defect, not a customer-success
  problem, and it is the earliest honest signal of anything.
- **Week 4.** [[M-09]] per judgement above 20%, or [[M-14]] showing an account
  clearing more of its high-severity set by sweep than by looking at it. Either
  means the top of the queue is not trusted, which is [[R-02]] arriving.
- **From week 1, rising.** The downgrade audit finding rate in [[M-11]]. A
  rising share of "should have graded higher" invalidates the grading model
  regardless of how good [[M-09]] looks, and it is the number I would watch most
  closely in the first quarter.
- **Month 2 onward.** [[M-12]] — driver disputes per 100 coaching actions and
  the share upheld. A rising upheld rate invalidates [[M-03]] whatever the
  repeat-rate number says, and it is the first sign that the fairness constraint
  in [[canon#C-07]] is not holding.
- **Ninety days.** The test in [[success-criteria]], stated as three terms so
  that passing it cannot be arranged.

- **Week 6.** [[M-15]], risky events per 1,000 miles, flat. The events this
  product detects are the near misses; if their rate is not moving once coaching
  has been running a month, nothing downstream will move either. This is the
  earliest signal that is about the road rather than about the software, and it
  needs neither driver attribution nor a control cohort — so it still works when
  the two most fragile dependencies fail.
- **Week 6.** [[M-16]] low while [[M-08]] looks healthy. Coaching volume without
  coaching reach: the conversations are happening and not with the drivers the
  events came from.

The thing that would not show up in any of those is [[A-20]] being wrong —
collision cost not being concentrated in a minority of drivers. Every metric
above would look healthy while the product targeted the wrong unit. [[M-17]] is
the answer: of at-fault collisions, what share had a high-band event for that
driver in the preceding 28 days. If that is near zero the queue is pointed at the
wrong population and a dismissal rate of 8% means nothing. It uses [[M-01]]'s own
data, so it costs nothing extra to collect, and it is the check I would want
earliest despite being the least urgent-looking.
