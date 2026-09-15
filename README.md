# CameraMatics — risky-driving detection and coaching

**Product brain for the Head of Product take-home exercise.**
Danny Daley · September 2026

---

## What this is, and why it exists

The submission is a deck. This repository is where the deck came from.

Every claim in the deck traces to an ID in here: an assumption with a confidence
and a validation plan, a metric with a source and a counter-metric, a risk with
a mitigation, a decision with the alternative it beat. `scripts/validate.py`
enforces that mechanically — a requirement that links to no metric fails the
build, and CI runs it on every push.

I built it this way for a reason beyond tidiness. The brief asks how I used AI.
My answer is that AI made me faster at production and had no view at all on the
decisions — and rather than assert that, this repository is arranged so you can
check it.

## Read it in five minutes

| Start here | |
|---|---|
| [`brain/annotated-brief.md`](brain/annotated-brief.md) | What your brief says, implies, and leaves out — first read and agent additions marked separately |
| [`brain/problem.md`](brain/problem.md) | The problem, and the failure mode the whole design aims at |
| [`brain/judgement-log.md`](brain/judgement-log.md) | Twenty-nine decisions: what the agent proposed, what I decided, every time I overruled it, and the one entry still marked `proposed` |
| [`reviews/`](reviews/) | The adversarial pass. Verdict: **Not yet.** Read it before you read anything else here charitably |
| [`brain/canon.md`](brain/canon.md) | The thirty rules this brain does not break. The most opinionated file here |
| [`docs/traceability.md`](docs/traceability.md) | Generated. Metric → stories → risks → phase, on one page |
| [`prototype/index.html`](prototype/index.html) | The queue, the clip, the coaching record. Grey boxes, real behaviour — open it and work through the group of five |
| [`prototype/checks/`](prototype/checks/) | 43 scripted assertions against that prototype. The same argument as the validator, one layer out |
| [`storymap/index.html`](storymap/index.html) | The whole capability as one picture — the manager's week across the top, every story underneath it, sliced by release |

Then the machinery: [`AGENTS.md`](AGENTS.md) for the division of labour,
[`skills/`](skills/) for the recipe behind each document type,
[`scripts/validate.py`](scripts/validate.py) for the rules in executable form.

## The short version of the product argument

Event volume is high enough that no fleet manager can review each one. Detection
is table stakes ([`A-22`](brain/registers/assumptions.yaml)) — CameraMatics
already detects fatigue, distraction, phone use, tailgating and vulnerable road
users. What is missing is deciding **which events deserve a person**, and proving
the conversation changed anything.

So this is a triage and coaching product, not an event detector. Every detected
event is kept and scored; severity decides the action and classification decides
whether that action is coaching or recognition. **Praise the good, coach the
bad** — a system that only ever detects failure makes invisibility the best
outcome a driver can achieve, which is how a safety tool becomes the thing the
cab resents.

If the volume assumption is wrong ([`A-02`](brain/registers/assumptions.yaml)),
so is the submission. Thirty days of telemetry settles it, and I would want that
before committing engineering.

## On AI, since the brief asks

The honest split, from the record in
[`brain/judgement-log.md`](brain/judgement-log.md) rather than from memory:
agents generated the option sets, wrote the prose, held the cross-references
consistent, and enforced the schema. Every framing choice and every scope cut was
mine, including eight reversals of the agent's own recommendation — and the
reversals were the consequential ones.

Three of those reversals fixed something that was wrong rather than merely
different: a coaching record that would have been a tick-box, an invented
fifteen-minute attention budget that had hardened into a design target, and a
grading design that would have coached a driver for braking to avoid a child.
The classes of error are recorded alongside them, because the pattern is more
useful than the instances.

One of my own framings is recorded there as wrong too — the log used to list it
among the exemplary ones, and the adversarial reviewer caught that before I
did.

The clearest illustration of the split is the validator. It is the most automated
artefact here and it is judgement in written form: every rule it checks was a
choice about what good looks like. Machines enforce rules well and have no
opinion on whether a rule is worth having.

Where an agent proposed a decision I have not ratified, the log says `proposed`
rather than claiming it as mine. A judgement log that flatters its author would
be worse than none — which is why the adversarial reviewer is briefed to hunt
for exactly that.

## Build state

Honest status, per canon C-24 — an unfinished artefact does not get to look
finished.

- [x] Canon (30 rules), registers — 26 assumptions, 17 metrics, 15 risks, 10 open questions
- [x] Annotated brief, company analysis, problem, JTBD, personas (manager, driver, operator), success criteria
- [x] Business case — submission section 1
- [x] Stack outline — section 2
- [x] PRD, 15 decision records, 15 stories across 4 epics — section 3
- [x] Skills (9), adversarial reviewer, division of labour
- [x] Validator (`scripts/validate.py`) and generated traceability matrix
- [x] CI workflow (`.github/workflows/validate.yml`) — runs the validator and fails on a stale traceability matrix
- [x] Adversarial pass — **ran 2026-09-14, verdict: Not yet.** 16 of 18 attacks survived; 13 fixed, 2 partly fixed, 1 deferred — every one with its reason stated. See `reviews/`
- [x] Prioritisation and phasing — section 4 (`brain/phasing.md`)
- [x] Risk and assumption narrative — section 5 (`brain/risks-narrative.md`)
- [x] Clickable prototype (`prototype/index.html`) — low fidelity, real behaviour. **Adversarial pass ran 2026-09-14, verdict: Not yet.** Of 20 findings: 17 fixed, 3 partly fixed. Accessibility is out of scope by decision, not oversight. Dispositions in `reviews/`
- [x] Adversarial pass on ADR-0012, ADR-0013, ADR-0014 — **ran 2026-09-14, verdict: Not yet.** ADR-0012 part 2 signed off; all three sent back on the record. Findings not yet dispositioned; see `reviews/`
- [ ] Submission deck

## Time, and where the volume came from

About four hours of my own focused effort, spread across a week alongside other
work — which is what the brief allows for. The commit history shows both halves
of that honestly: the elapsed days, and the bursts of output inside them that no
one produces by hand.

That gap is the point rather than an embarrassment. The volume here is agent
work under direction; the judgement is mine and
[`brain/judgement-log.md`](brain/judgement-log.md) is where it is written down,
including the times I was wrong and the times the agent was overruled. If the
ratio of output to hours looks implausible, that is the submission's actual
answer to the question the brief asks about AI.

## What this is built on

No insider knowledge of CameraMatics' architecture, installed base, ARPU or
customer data. Public sources only, most recently September 2026, and the most
specific of them dates from April 2024 — recorded as
[`A-18`](brain/registers/assumptions.yaml), which qualifies every inference
drawn from them.

An earlier version of this repository used no research at all. That position was
reversed once the submission needed to be about *their* situation rather than a
generic one (J-05, superseded by J-11). What did not change: no borrowed
industry benchmarks and no third-party collision statistics, because I could not
defend them under questioning, and a number you cannot defend is worse than a
blank.
