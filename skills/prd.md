# Skill: PRD (Product Requirements Document)

*Ported from my own working repo. Tailored for this brain: every section now
resolves to a register ID rather than restating facts, so a PRD cannot drift
from the source ([[../brain/canon]] C-19).*

## When to use
When defining a feature or problem before handing off to engineering. Produces a
lean PRD specific enough to drive development without over-engineering it.

## Format

### [Feature name]

**Problem**
The user or business problem, specifically. Reference evidence by ID — an
assumption (`A-0N`) or a measurement with a named source. If neither exists,
say so; a problem statement resting on nothing is the most expensive thing in
this document.

**Solution**
What we're building, at the level of approach rather than implementation. What
is explicitly out of scope, and the ADR that cut it.

**Users affected**
Which personas, and the impact on each — including the ones who don't get a
surface. A user affected without being served is the interesting case.

**Success metrics**
1–3 metrics by ID from `registers/metrics.yaml`, plus their counter-metrics.
A target with no counter-metric does not ship (canon C-13).

**Top-level user stories**
Parent stories only. Detail lives in `brain/requirements/` per
[[user-stories]].

**Open questions**
By ID from `registers/questions.yaml`, each marked blocking or not. A blocking
question means I would not commit engineering.

**Out of scope**
Each item with the ADR that decided it, so "you forgot X" has an answer.

## Conventions
- One page where possible. Length is not thoroughness.
- No wireframes in the PRD — reference them.
- No hedges. "Recommend" and "consider" in a requirements document are decisions
  nobody made, and whoever builds it will make them for you.
- Link every claim to the brain. If it isn't in the brain, it isn't a claim yet.
