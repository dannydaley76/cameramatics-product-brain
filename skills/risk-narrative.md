# Skill: Risk and assumption narrative

*New for this brain, written for submission section 5 — the second of the two
document types this exercise needed and the ported set did not cover.*

## When to use
When the registers exist and someone has to be told what they mean. The
registers are the record; the narrative is the argument about them. If there is
no register behind it, this is not the document to write — go and build the
register first, because a narrative assembled from memory is the exact thing
[`../brain/canon.md`](../brain/canon.md) C-01 forbids.

## What it is not
- **Not a list.** The registers already list. Reproducing them in prose adds
  length and removes the confidence, impact and validation fields that made
  them useful. Link, do not restate.
- **Not reassurance.** A risk section that concludes everything is mitigated has
  been written to be read rather than used.
- **Not a hedge against being wrong later.** Every entry either changes what we
  would do or it is decoration (canon C-12).

## Required frontmatter

```yaml
---
id: RISK
title: ...
status: draft | accepted
section: 5
drafted_by: agent | human
decided_by: danny | —
adversarial_pass: ran | not run
assumptions: [A-0N]
risks: [R-0N]
questions: [Q-0N]
---
```

## Format

**The gates**
Open with the one or two assumptions whose falsity ends the project rather than
costing it money, and say *how* each fails — some break the product, some break
only the story. Naming the difference is more useful than ranking by confidence.

**Ranked by consequence, not by confidence**
A high-confidence assumption with critical impact deserves more attention than a
low-confidence one that changes nothing. Rank by what breaks. Say what each
would cost to check, because a cheap check on a critical assumption is the
easiest decision in the document.

**The risks the design created**
The section most documents skip and the one worth writing. Any real design
introduces risks that did not exist before it — say which decision produced
which risk. A design that adds no new risks has not made any decisions.

**Week one — the questions in order**
Blocking questions only, each with *what it would change*, not just what it
asks. A blocking question whose answer changes nothing was not blocking; either
demote it or work out what it really gates.

**How I would know I was wrong**
Observable signals with the metric that carries them and the horizon at which
it becomes readable. "We would monitor closely" is not a signal.

## Conventions
- Every claim in here resolves to a register ID. If it does not have one, it
  either gets one or it comes out (canon C-01).
- Ranges, never point figures (canon C-03).
- Where the confidence is low and the impact is critical, say so in those words
  rather than softening it. The register already says it; the narrative that
  softens it is the one a reader stops trusting.
- Name the assumption you would most like to be wrong about, if there is one.
  It is usually the most informative sentence in the section.
