# Skill: Adversarial Review

*Ported from my own working repo, where an adversarial pass runs before a design
becomes tickets and before a ticket goes to an engineer. Tailored here: the
objects of verification change from source code to a product argument, the
method does not.*

The agent definition lives at [`agents/adversarial-reviewer.md`](../agents/adversarial-reviewer.md).
This skill is the **procedure** — when it runs, how it is briefed, what it
produces, and what happens to the findings.

## When to run it

Before any artefact carrying a real decision is considered done: the PRD, the
epics and stories, the phasing, the submission itself. Not on a typo.

Running it late is close to worthless. The point is to break the argument before
it has cost a build cycle or been presented to someone who will break it for you.

## The two rules that make it real

**1. Never let the context that wrote something review it.**
A fresh agent, with no memory of the drafting, or it is self-review wearing a
reviewer's name. The brief hands over the artefact as a **set of claims**, never
as context to build on. If the reviewer can tell it authored the thing, it says
so and stops.

**2. If the pass did not run, the artefact says so** ([[../brain/canon]] C-24).
An unreviewed artefact and a reviewed one are different objects. Every file in
this repo carries `adversarial_pass: ran | not run` in its frontmatter for that
reason, and "assume it was checked" is not available.

## How to brief it

Four things, and no more:

1. **The artefacts** — paths, not summaries. A summary is the drafting agent's
   framing, which is the thing under test.
2. **The instruction to refute**, not to assess. "Find what breaks this" produces
   different work from "review this".
3. **The load-bearing claims as you understand them** — offered so the reviewer
   can disagree about what is load-bearing, which is itself a finding.
4. **The population it must report on** — what it did not read, what it could not
   verify.

Do not tell it which parts a human wrote and which an agent drafted. That
information only biases the review.

## What it produces

A review document under `reviews/`, named by date and target. Structure:

**Verdict, first line, bold, one of:** *Send it* / *Send it narrowed to X* /
*Not yet* / *No* — then the reason in one sentence, citing the specific register
entry or artefact section that decides it.

**Per-attack findings**, each numbered and named, each disposed of as *Survives*
/ *Survives narrowed* / *Not actually the risk* / *Refuted*. An attack raised and
not disposed of is noise.

**Things priced**, not characterised. "Six of fifteen stories link to the same
single metric" is a finding; "the traceability is thin" is an opinion.

**Coverage** — what it did not read and what it could not verify. Silent
truncation in a review reads as completeness.

## What happens to the findings

This is the part people skip, and it is the part that makes the pass worth
running.

1. **Every finding is dispositioned by a human** — accepted, rejected with a
   reason, or deferred. A review that is read and not acted on is theatre.
2. **Accepted findings change the artefacts**, and the change is committed
   separately from the review so the diff shows what the pass bought.
3. **Rejected findings are recorded with the reason** in [[../brain/judgement-log]].
   Disagreeing with the reviewer is legitimate; disagreeing silently is not.
4. **Findings about the drafting agent's behaviour** — an invented number, a
   framing that drifted — become a class of error in the judgement log, because
   the recurring classes are the most useful thing the record produces.
5. **The frontmatter flips to `adversarial_pass: ran`** only on artefacts that
   were actually in scope of the pass.

## Conventions

- The reviewer is **read-only**. It does not edit artefacts, and it does not
  approve its own findings.
- A reviewer that finds nothing has produced a result, not a failure — but
  "this survives, and here is the one thing that would break it" is the shape of
  a complete review.
- Never soften a verdict to be agreeable, and never manufacture objections to
  look rigorous. Both destroy the signal the pass exists to give.
- The reviewer states **what it verified and what it inferred, separately**. Its
  findings are worth more than its conclusions.
