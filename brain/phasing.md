---
id: PHASE
title: Phasing — what gets built when, and what would stop us
status: proposed
owner: danny
section: 4
drafted_by: agent
decided_by: —
adversarial_pass: not run
produced_with: skills/phasing.md
assumptions: [A-02, A-04, A-10, A-11, A-19, A-23]
metrics: [M-03, M-07, M-09, M-11, M-14]
risks: [R-05, R-06, R-09, R-11, R-12]
questions: [Q-01, Q-02, Q-03, Q-05, Q-09]
decisions: [ADR-0002, ADR-0004, ADR-0007, ADR-0008, ADR-0009, ADR-0012, ADR-0013]
links: [stack-outline, requirements/README, success-criteria]
---

# Phasing

**Status: proposed.** One scope cut in here is a decision I have not ratified,
and it is marked where it appears. Everything else is sequence, derived from the
dependency chain at the foot of [[stack-outline]].

---

## The unit of value is the loop, not the feature

Detect, triage, review, coach, measure. A manager with a queue and no way to act
on it has a better dashboard. A manager with a coaching form and no triage has
the firehose with extra steps. Neither half is worth shipping alone, so phasing
here is mostly **sequence** rather than **cut**, and v1 is a thin whole loop
instead of a thick half of one.

That is why fourteen of fifteen stories are v1. The adversarial pass read the
original 15/15 as a failure to prioritise, and that was a fair reading of a repo
that had never written this down. The answer is not to cut stories until the
list looks phased. It is to say what the unit is and then defend it.

## The dependency chain

Two of these links are **inherited** — they belong to systems that already exist
and neither the answer nor the lead time is ours to schedule. That is a
different kind of risk from an engineering one and it is worth marking.

| | Gates | Inherited? |
|---|---|---|
| Event volume ([[Q-02]], [[A-02]]) | Whether to build this at all | No — measurable in 30 days |
| Device capability ([[Q-03]], [[A-04]], [[R-05]]) | Which triggers exist, which signals describe them, and which vehicles can be offered recognition ([[ADR-0012]]) | **Yes** — firmware lead times are months, not weeks |
| Retention window ([[A-10]]) | Whether promote-and-fetch is safe, and therefore [[ADR-0002]]'s whole upload economics | Partly — a hardware fact we are choosing to expose as a contract |
| Driver attribution ([[Q-09]], [[A-11]]) | Coaching, recognition, the driver record, and [[M-03]] | **Yes** |
| Footage state handling | The portal | No |

**On attribution.** For this exercise I am treating it as solved with adequate
coverage ([[A-23]]), because the brief hands it over as existing platform
capability and designing around it being broken answers a question nobody asked.
In the real job it is the first thing I would check, in week one, and I would
want the answer before committing the coaching half. If it came back weaker than
[[A-11]] assumes, this plan changes shape rather than slipping: the review half
ships first and the coaching half waits, because a coaching conversation with
the wrong driver costs more trust than ten missed events ([[R-09]]).

## What runs in parallel

The useful consequence of the chain is that **the portal does not wait for the
edge.** It can be built against a stubbed event source, so three tracks run at
once.

**Portal track — starts day one, against fixtures.** A canned set of graded
events covering every footage state (ready, fetching, unavailable and why),
every severity band, and every classification (risk, neutral, credit). EP-01 and
EP-02 are fully testable before a single real event exists.

**Cloud track.** Ingest, grouping, grading and band routing, provenance and
ruleset versioning, video orchestration, the metrics as first-class outputs.

**Edge track.** The four triggers, the all-signals packet ([[ADR-0012]]), the
local severity flag and the upload policy ([[ADR-0002]]).

**What the stub costs.** Fixtures encode our beliefs about what events look
like, and the first week of real data will contradict them — most likely in
grouping (how many raw detections make one event) and in band distribution.
That is a budgeted rework, not a surprise, and [[M-11]] is the number that shows
it. Pretending the stub is free is how a parallel plan turns into a serial one
with a bad week in the middle.

**Two join points.**

1. **Real events replace fixtures.** EP-01 and EP-02 work end to end. This is the
   first moment anything can be shown to a customer, which is why it matters
   more than its position in the data flow suggests.
2. **Attribution wired.** EP-03 becomes real, then EP-04. Under [[A-23]] this is
   an integration; without it, it is the unknown that splits the release.

I would start the portal track first even though it is last in the data flow.
Every decision in this design is argued through that surface, and it is the only
track that produces something to put in front of a fleet manager early enough to
change what gets built.

## The phases

Phase names are the register's own — `v1`, `v1.1`, `later` — so this document
and the story frontmatter cannot drift. Where earlier artefacts say "phase 2"
they mean "after v1"; this is where that gets pinned down.

### v1 — the thin whole loop

EP-01, EP-02 and EP-03 complete, plus US-014. Fourteen stories.

Two of them are `should` rather than `must` and are in anyway, for the same
reason: **a severity band with no action leaves [[ADR-0007]]'s model incomplete
in the shipped product.** US-013 is the medium band's action, and without it the
medium band is a place events go to be forgotten — which is the behaviour
ADR-0007 exists to prevent. US-004 is bulk dismissal, which [[R-11]]'s
mitigation depends on and which [[M-14]] is computed from; ship without it and a
manager returning from leave has an unclearable week.

**Opens the next phase when** an account has been live four weeks and [[M-07]]
and [[M-09]] are readable. That is the earliest honest signal, and under
[[canon#C-29]] it is a release gate rather than a report.

### v1.1 — the fleet view

US-015 only. **Proposed cut, not decided.**

EP-04's value in v1 is the driver record (US-014): it is where coaching and
recognition land, and where a manager answers *did this driver change*. The
fleet roll-up is a view over data the driver record already produces, it is
specified lightly by design, and it is the one story whose absence does not
break the loop.

There is a second reason and it is the better one. A fleet trend drawn over four
weeks of a low-base-rate outcome overstates what it knows ([[R-06]]). Shipping
the roll-up at the point where it can only mislead buys nothing and costs the
credibility of every number next to it.

*The story frontmatter still says `v1` and does not move until this is ratified
([[canon#C-25]] item 2, judgement log J-24). A phasing document that quietly
applied its own scope cut would have made a decision it was not entitled to
make.*

### later — three things, each already a decision rather than a gap

**Downgrade audit tooling** ([[ADR-0013]]). The audit itself runs from first
release as a manual CameraMatics-side practice; what waits is the sampling and
finding-recording surface. **Deliberately not written as a story yet** — we will
not know what that surface should show until someone has read real samples, and
specifying it now would be specifying from imagination. Opens when the manual
sample stops being readable in the time available, which is a condition someone
doing the reading will recognise.

**Re-engagement on sustained non-use** ([[R-11]], [[ADR-0009]]). Displaying the
count of closed-unreviewed weeks is a receipt, not a solution. What to do about
it may not be a feature at all — it may be a conversation — and deciding that
before seeing a single account do it would be guessing.

**The driver surface and the delivery channel** ([[ADR-0004]], [[ADR-0007]]).
Recognition reaching a driver directly rather than through a manager showing
them a clip is [[ADR-0010]]'s own revisit condition.

## Gates — what would stop us, not delay us

A blocking question that only moves a date is not blocking. These four change
the plan.

| Question | If the answer is bad |
|---|---|
| [[Q-02]] — real event volume | If volume is low, attention is not the binding constraint and this is a detection-breadth product. The brief gets rewritten, not rescheduled ([[A-19]]) |
| [[Q-03]] — device reach | If forward-facing inference reaches materially fewer vehicles than distraction does, [[ADR-0012]] part 1 becomes v1.1 and recognition phases behind it. Part 2 — every event carries every signal — does not move |
| [[Q-05]] — footage and data protection per market | A market where footage-based coaching is not usable needs a metadata-only variant. That is a different product phased separately, not a later version of this one |
| [[Q-09]] — attribution | Assumed solved here ([[A-23]]). If it is not, v1 splits: review ships, coaching waits |

[[Q-01]] — what a manager's week actually looks like — does not stop anything.
It changes the empty state, the rhythm, and what we are entitled to claim we
replace. I would still want it before the first customer sees this.

## What v1 excludes, and where each is recorded

Nothing here is an omission. Each one is a decision with the alternative it beat
([[canon#C-18]]).

| Excluded from v1 | Recorded in |
|---|---|
| Any driver-facing surface | [[ADR-0004]] |
| Customer configuration of what surfaces | [[ADR-0003]] |
| Headway / tailgating as a coachable event type | [[ADR-0012]] |
| Fatigue and drowsiness detection | [[ADR-0012]], on [[ADR-0001]]'s reliability reasoning |
| A structured taxonomy of dismissal reasons | [[ADR-0008]], [[Q-08]] |
| Depot-manager delegation and handover | [[ADR-0006]] |
| Anything done about sustained non-use | [[ADR-0009]], [[R-11]] |
| Downgrade audit tooling — the practice is not excluded | [[ADR-0013]] |

## The first two weeks

Concretely, before any of the above: [[Q-02]] and [[Q-03]] go out in parallel —
thirty days of event telemetry from ten fleets, and a firmware capability audit
by device generation. Neither needs engineering capacity to start. The fixtures
get built and the portal track begins against them, because that work is valid
whatever those two answers say, and because it produces the thing to put in
front of a fleet manager for [[Q-01]].

If [[Q-02]] comes back low, we stop and I rewrite the brief. That is the point
of asking first.
