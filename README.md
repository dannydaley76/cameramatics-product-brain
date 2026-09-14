# CameraMatics — risky-driving detection and coaching

**Product brain for the Head of Product take-home exercise.**
Danny Daley · September 2026

---

## What this is, and why it exists

The submission is a deck. This repository is where the deck came from.

Every claim in the deck traces to an ID in here: an assumption with a confidence
and a validation plan, a metric with a source and a counter-metric, a risk with
a mitigation, a decision with the alternative it beat. `scripts/validate.py`
enforces that mechanically on every commit — a requirement that links to no
metric fails the build.

I built it this way for a reason that goes beyond tidiness. The brief asks how I
used AI. My answer is that AI made me faster at production and had no view at all
on the decisions — and rather than assert that, this repository is arranged so
you can check it.

## Read it in five minutes

| Start here | |
|---|---|
| [`brain/problem.md`](brain/problem.md) | The problem, and the failure mode the whole design is aimed at |
| [`brain/business-case.md`](brain/business-case.md) | Section 1 of the submission — brief, commercial case, success measures |
| [`brain/canon.md`](brain/canon.md) | The rules this brain does not break. The most opinionated file here |
| [`brain/judgement-log.md`](brain/judgement-log.md) | Every decision: what the agent proposed, what I decided, and the three times I overruled it |

Then, if you want the machinery: [`AGENTS.md`](AGENTS.md) for the division of
labour, [`skills/`](skills/) for the recipes each document type is produced
from, [`agents/adversarial-reviewer.md`](agents/adversarial-reviewer.md) for the
pass that tries to break the work before you do.

## The short version of the product argument

A 100-vehicle fleet generates somewhere between 50 and 450 detectable events a
day. The fleet manager has fifteen minutes. Detection is table stakes and
increasingly commodity at the edge; what nobody has solved is turning that
firehose into a small weekly routine that demonstrably changes how people drive.

So this is a triage and coaching product, not an event detector. Everything else
follows from that — and if the volume assumption is wrong ([`A-02`](brain/registers/assumptions.yaml)),
so is the submission. Thirty days of telemetry settles it, and I would want that
before committing engineering.

## On AI, since the brief asks

The honest split, from the record in
[`brain/judgement-log.md`](brain/judgement-log.md) rather than from memory:
agents generated the option sets, wrote the prose, held roughly forty
cross-referenced IDs consistent, and enforced the schema. Every framing choice
and every scope cut was mine, including three reversals of the agent's own
recommendation — and the reversals were the consequential ones.

The clearest illustration is the validator. It is the most automated artefact
here, and it is judgement in written form: every rule it checks was a choice
about what good looks like. Machines enforce rules well and have no opinion on
whether a rule is worth having. That is the division of labour, and it is why
the validator is committed rather than described.

Where an agent proposed a decision I have not yet ratified, the log says
`proposed` rather than claiming it as mine. A judgement log that flatters its
author would be worse than none.

## Build state

Honest status, per canon C-24 — an unfinished artefact does not get to look
finished.

- [x] Canon, registers (8 assumptions, 12 metrics, 8 risks, 8 open questions)
- [x] Problem, JTBD, fleet-manager persona, business case (submission section 1)
- [x] Skills, adversarial reviewer, division of labour
- [ ] Stack outline — section 2
- [ ] Portal requirements and wireframes — section 3
- [ ] Prioritisation and phasing — section 4
- [ ] Risk and assumption narrative — section 5
- [ ] Decision records
- [ ] Validator and CI
- [ ] Adversarial pass — **not yet run**
- [ ] Submission deck

## Assumptions, stated once

No insider knowledge of CameraMatics' architecture, installed base, ARPU or
customer data was used, and none was researched — a deliberate choice recorded
as J-05 in the judgement log. Every quantified claim in here is therefore an
assumption with a range and a way to test it. There are no borrowed industry
benchmarks and no citations, because I could not stand behind them under
questioning, and a number you cannot defend is worse than a blank.
