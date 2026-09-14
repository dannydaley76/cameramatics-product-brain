# AGENTS.md — how this repository is worked

Read [`brain/canon.md`](brain/canon.md) first. It outranks this file on anything
about what good looks like; this file covers who does what.

## Division of labour

This brain was produced by one person and a set of agents. The split is
deliberate, written down, and visible in the artefacts rather than asserted in a
covering note.

| | Does | Does not |
|---|---|---|
| **Human (Danny)** | Frames the problem, picks the spine, chooses the primary user, cuts scope, sets severity thresholds, accepts risk, ratifies every decision, owns every word | Draft prose from scratch, maintain cross-references, enforce the schema |
| **Drafting agent** | Enumerates options, drafts, structures, keeps ~40 cross-referenced IDs consistent, generates candidate stories to be cut down | Decide anything in canon C-25, close an open question, widen scope, invent a number |
| **Adversarial agent** ([`agents/adversarial-reviewer.md`](agents/adversarial-reviewer.md)) | Attacks the argument, prices claims, hunts unsourced figures and undefended scope cuts | Edit artefacts, approve its own findings, review work it drafted |
| **Validator** ([`scripts/validate.py`](scripts/validate.py)) | Enforces traceability mechanically on every commit | Judge whether a rule is the right rule |

The last row is the point. The validator is the most automated thing in this
repo and it is pure judgement in written form: every rule it checks was a human
choice about what good looks like. Machines are excellent at enforcing rules and
have no view on whether a rule is worth having.

## The line, and where it is recorded

Agents do not make the decisions listed in canon **C-25** — what the product is
for, what gets cut, what counts as high severity, which risk we accept, what we
tell a customer, pricing, or closing an open question.

Where an agent has proposed one of those, it is logged in
[`brain/judgement-log.md`](brain/judgement-log.md) as `proposed` and stays that
way until a human ratifies it. That log includes the entries where the agent was
overruled, because a judgement log containing only agreements is not evidence of
judgement.

## The adversarial pass, and the honesty rule

Anything carrying a real decision gets an adversarial pass before it is
considered done. Two rules protect it:

1. **Never let the context that wrote something review it.** A fresh agent, or
   it is self-review wearing a reviewer's name. Brief it to *refute*, and hand it
   the artefact as a claim rather than as context to build on.
2. **If the pass did not run, the artefact says so** (canon C-24). An unreviewed
   artefact and a reviewed one are different objects, and the difference is never
   silent. "Assume it was checked" is not available here.

## Working in this repository

1. Read `brain/canon.md`. Then read the register you are about to touch.
2. Use the skill for the document type you are producing — [`skills/`](skills/).
   If there is no skill, the shape is not settled; say so rather than inventing
   a format.
3. IDs are permanent and never reused (`US-`, `ADR-`, `A-`, `R-`, `M-`, `Q-`).
   Superseded items are marked, not deleted.
4. Every artefact carries provenance: who drafted, who decided, whether the
   adversarial pass ran.
5. Run `python3 scripts/validate.py` before committing. CI runs it too. It fails
   on: duplicate IDs, a requirement with no metric or no phase or no acceptance
   criterion, a risk with neither mitigation nor open question, an outcome
   metric with no counter-metric, a dangling `[[link]]`, and an orphaned
   assumption.
6. Do not satisfy the validator by inventing a link. If a story genuinely moves
   no metric, the finding is that it should not be built — say that instead.

## Provenance of this repository

The skills in `skills/` and the adversarial reviewer in `agents/` are ported
from my own working repository, where they are used daily on a live codebase,
and tailored here — the diffs are described at the top of each file. They were
not written for this exercise. That is deliberate: a working method you can see
in use elsewhere is worth more than one invented for an interview.
