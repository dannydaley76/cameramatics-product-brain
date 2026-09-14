---
id: REV-001
title: Adversarial review — PRD, requirements, decisions and registers
date: 2026-09-14
reviewer: adversarial agent (fresh context)
target: brain/prd.md, brain/requirements/, brain/decisions/, brain/registers/, brain/ (discovery set), skills/, AGENTS.md, README.md
mode: refute
status: dispositioned 2026-09-14 by danny
---

# Adversarial review — 2026-09-14

**Not yet.** The repository's own central credibility claim is false on its face:
`README.md:14` states that `scripts/validate.py` "enforces that mechanically on every
commit", `scripts/` and `.github/workflows/` are both empty directories tracked by
nothing (53 tracked files, none under `scripts/`, `docs/` or `.github/`), and
`README.md:62` simultaneously admits `[ ] Validator and CI` — so the file that a CTO
opens first asserts and denies the same fact eight lines apart, and the traceability
machinery that load-bearing claim 5 rests on is described rather than committed, in
direct contradiction of canon **C-26** ("it is why the validator is committed rather
than described").

**What would change it:** roughly a day of work. Write the validator (it would fail
today — see §3), add the CI file, and repair the six documented provenance regressions
in §4. None of the substantive product thinking needs to change. The design survives;
the evidence for how it was produced does not, yet.

---

## 0. Self-review check

I did not author any artefact under review. I ran in a fresh context, was handed
paths rather than summaries, and read the files myself. No self-review condition
triggered (`agents/adversarial-reviewer.md`, Constraints).

---

## 1. The load-bearing claims

The drafting context offered five. I accept four, reject one as stated, and add two
it did not name.

| # | Claim as offered | My reading |
|---|---|---|
| 1 | Volume makes attention, not detection, the binding constraint (A-02, A-19) | **Accepted as load-bearing.** Correctly gated, honestly labelled. Not where this breaks. |
| 2 | CameraMatics has detection and coaching but no triage and no proof (A-13, A-14) | **Accepted, and under-protected.** A-14 is referenced by *no* ADR, *no* requirement and *no* prose artefact outside `company-analysis.md` and the registers. Half of the diagnosis carries no design weight. |
| 3 | Grade and route rather than suppress (ADR-0007) | **Accepted — and the least successfully propagated decision in the repo.** See Attack 4. |
| 4 | Recognition is a defect fix, not a feature (ADR-0010) | **Accepted as the argument, refuted as specified.** It depends on a detection capability ADR-0001 cuts. See Attack 5. This is the most serious product finding here. |
| 5 | The traceability machinery earns its place | **Rejected as stated.** It cannot earn its place while it does not exist and would fail if it did. See Attacks 1 and 3. |

**Two the drafting context did not name, both load-bearing:**

- **6 — Risk is concentrated in a minority of drivers.** `problem.md:11` and
  `business-case.md:51`. This is the premise of the entire commercial case, and it
  carries **no assumption ID, no source, no range**. See Attack 16.
- **7 — The downgrade audit works.** Eighteen references across ADR-0007, ADR-0008,
  ADR-0010, M-11, R-12, R-13 and three user stories. It is the *only* control on the
  grading model once nothing is discarded, and it has no owner, no cadence, no sample
  rate and **no user story**. See Attack 13.

---

## 2. The numbers

Counted, not characterised.

**Registers**
| Register | Actual | README claims (`README.md:57`) |
|---|---|---|
| Assumptions | **19** (A-01…A-19) | 8 |
| Metrics | **13** (M-01…M-13) | 12 |
| Risks | **13** (R-01…R-13) | 8 |
| Questions | **10** (Q-01…Q-10) | 8 |

All four counts in the README are wrong. `README.md:52` also says agents held
"roughly forty cross-referenced IDs"; the real figure is **81** (19+13+13+10 plus 11
ADRs and 15 stories).

**Requirements — 15 stories**
- Stories with at least one metric: **15/15**. Canon C-10 satisfied.
- Stories with at least one acceptance criterion: **15/15** (range 4–8, mean 5.2).
- Banned AC words (`intuitive`, `seamless`, `fast`, `appropriate`…): **0**. C-11 clean.
- Hedges (`recommend`, `consider`, `may`, `where possible`) inside acceptance criteria: **0**. Clean.
- Stories missing the `assumptions:` block the skill declares mandatory
  (`skills/user-stories.md:16` — "`scripts/validate.py` fails the build if any of it
  is missing"): **8/15** — US-004, 006, 009, 010, 012, 013, 014, 015.
- Stories missing `decisions:`: **1** (US-008).
- Stories at `status: proposed`: **15/15**. **Zero ratified.** Per the repo's own
  reading of C-23 and the judgement log's opening paragraph, nothing in the
  requirements set is yet the human's judgement.
- Stories at `phase: v1`: **15/15**. There is no phasing. See Attack 15.

**Metric coverage**
| Metric | Stories linking to it |
|---|---|
| M-13, M-12, M-09, M-03 | 4 each |
| M-11, M-10, M-07, M-05 | 3 each |
| M-08, M-04 | 1 each |
| **M-01, M-02, M-06** | **0 each** |

The two metrics that carry the buyer's case — at-fault collisions (M-01) and claim
cost (M-02) — are moved by no requirement. **M-02 is a total orphan**: it appears in
`metrics.yaml` and in no other file in the repository, and it is an `outcome` metric
with **no `counters:` field**, which is a straight breach of canon **C-13** and of the
rule `AGENTS.md:66` says the validator enforces ("an outcome metric with no
counter-metric").

**Dangling `[[links]]` — 7 occurrences, 4 distinct targets** (canon C-15: "Every
`[[link]]` resolves. CI fails the build otherwise."):
- `[[portal-requirements]]` ×4 — `prd.md:16`, `prd.md:85`, `stack-outline.md:15`,
  `stack-outline.md:146`. The file is `brain/requirements/README.md`.
- `[[personas/driver]]` ×2 — `jtbd.md:6`, `jtbd.md:39`. No such file; the driver
  persona does not exist, in a submission whose canon C-07 and C-30 are both about
  the driver.
- `[[phasing]]` ×1 — `stack-outline.md:187`. No such file; section 4 of the
  submission.
- `[[story]]` ×1 — `company-analysis.md:10`. No such file.

**Assumption dependency.** 6 of 19 assumptions are cited by at least one requirement
(A-05, A-09, A-10, A-11, A-12, A-19). 13 are not. Neither gate assumption — A-02 nor
A-13 — is cited by any requirement; A-19 stands in for A-02 in US-001 only. That is
defensible (gates sit above requirements) but it means the traceability chain from
the deck's headline assumption to the specification is **one story long**.

---

## 3. What the validator would do if it existed

I ran the rule list at `AGENTS.md:63–66` by hand. On the current tree it fails on at
least four counts:

1. `M-02` — outcome metric with no counter-metric.
2. Seven dangling `[[link]]`s across four targets.
3. Eight stories missing required frontmatter per `skills/user-stories.md`.
4. Duplicate-ID check would pass; orphan-assumption check would pass (every A- is
   referenced somewhere).

So the claim is not merely "the validator is missing". It is that **the repository
does not currently satisfy the rules it says are mechanically enforced on every
commit**. That is a materially worse position than having no validator at all, and it
is the first thing a CTO who clones the repo will discover — `ls scripts/` takes two
seconds.

`docs/traceability.md` does not exist either; `docs/` is an empty directory.

---

## 4. Attacks

### Attack 1 — The traceability machinery is asserted, absent, and self-contradicting
**Disposition: Survives. Most serious finding in the evidence half of the submission.**

`scripts/validate.py` is referenced 8 times: `canon.md:68` (the heading of canon
section 3), `canon.md:169` (C-26, the file the division-of-labour argument turns on),
`AGENTS.md:17`, `AGENTS.md:63`, `README.md:14`, `skills/user-stories.md:13`,
`metrics.yaml:3`, `risks.yaml:3`. `scripts/` is empty. `.github/workflows/` is empty.
`git ls-files` returns 53 files, none in either.

`README.md` contradicts itself on one page: line 14 in the present tense
("enforces that mechanically on every commit") against line 62 (`[ ] Validator and
CI`). Canon C-24 exists precisely to stop an unfinished artefact looking finished,
and the README breaks it in its own build-state section.

The `README.md` build state is also stale in the other direction: `[ ] Stack outline`,
`[ ] Portal requirements and wireframes`, `[ ] Decision records` are all unchecked
while `stack-outline.md`, 15 stories and 11 ADRs all exist and are substantial. So the
one section labelled "Honest status, per canon C-24" is wrong in both directions.

### Attack 2 — The withdrawn time budget is still load-bearing in four files
**Disposition: Survives. This is the exact failure the reviewer brief names, committed after it was supposedly fixed.**

A-03 withdraws the 10–15 minute figure and records why: "that figure was invented
rather than observed and has been withdrawn". J-17 claims the correction propagated.
It did not. The figure survives, cited to `[[A-03]]` as though A-03 supported it:

| File | Line | Text |
|---|---|---|
| `README.md` | 40 | "The fleet manager has fifteen minutes." — bare point estimate, no citation, violating **C-03** as well as C-01 |
| `business-case.md` | 24 | "and the manager has fifteen minutes ([[A-03]])" |
| `prd.md` | 23 | "A fleet manager has 10–15 minutes a day ([[A-03]])" — **first sentence of the PRD's problem statement** |
| `stack-outline.md` | 158 | "Ten to fifteen minutes a day, two or three sessions a week ([[A-03]])" — listed under **Constraints** |

The commit that performed the withdrawal (`086211e`, "withdraw the time budget")
**touched `brain/prd.md`** and left the number in the PRD's opening line. It did not
touch `business-case.md`, `stack-outline.md` or `README.md` at all.

A reader who follows the citation from `prd.md:23` to A-03 finds an entry saying the
number was invented. That is worse than the original error: it is a repaired register
with four un-repaired consumers, in a repository whose argument is that the register
is the source (**C-19**).

### Attack 3 — The withdrawn 90-second target survives in an `accepted` artefact
**Disposition: Survives.**

M-06 now reads `target: NONE. Deliberately no target… The earlier version of this
register set 90 seconds, which was an error.` Two files still state the target:

- `success-criteria.md:54` — "Supported by median review time per event under 90
  seconds ([[M-06]])". This file carries `status: accepted` and `decided_by: danny`.
- `business-case.md:83` — "median review time under 90s ([[M-06]])", inside the
  success-measures table.

So the repository's accepted success criteria document commits to a target its own
metric register explicitly repudiates as an error, and cites the register as the
source. J-17's stated consequence — "[[M-06]] carries no target at all" — is true of
the register and false of the submission section built on it.

### Attack 4 — ADR-0007's reframe did not propagate; "suppression" survives in eleven places
**Disposition: Survives. Load-bearing claim 3 is undermined by the repo, not by me.**

ADR-0007 and canon C-06's amendment state that nothing is discarded. Eleven live
prose locations still describe suppression as a shipped behaviour:

- `prd.md:48` — "counter-metrics on what we suppressed" — **in the same section that
  says "nothing is discarded ([[ADR-0007]])" fourteen lines earlier.**
- `prd.md:79` — "share of events auto-suppressed ([[M-11]])" — M-11's own entry says
  it is "no longer 'share suppressed'".
- `business-case.md:87` — same phrase.
- `success-criteria.md:72–79` — an entire subsection built on "report how much we are
  hiding", in an `accepted` artefact.
- `problem.md:60` — "Suppression, scoring and grouping are first-class features".
- `risks.yaml:16` — **R-01's mitigation** still reads "Severity scoring plus
  suppression as v1 features". R-01 is the top adoption risk.
- `stack-outline.md:91, 118, 133, 135, 172` — the cloud platform is specified to
  "**suppress** known-benign patterns", and "Suppression is logged, sampled and
  reported", and "we pay to ingest metadata for events we then discard".
- `ADR-0002:80` — consequence 4: "We carry the cost of ingesting metadata for events
  we then **suppress**." ADR-0002 is `status: accepted` and carries no amendment note
  from ADR-0007, unlike ADR-0007 which was properly amended by ADR-0010.

A CTO reading the stack outline is reading a specification for a suppression system.
The ADR that supposedly replaced it was written after (`086211e`) and the stack outline
was never edited. Per **C-19** the brain is the source and the deck is generated — but
here two parts of the brain say opposite things, so whichever the deck picks up is
unfalsifiable by the reader.

### Attack 5 — ADR-0010 rests on a detection capability ADR-0001 cut and the stack outline does not list
**Disposition: Survives. Strongest product finding. Load-bearing claim 4 is refuted as specified.**

ADR-0010 asserts, under the heading *What actually detects credit*:

> "**Nothing new.** The corroborating signals in [[stack-outline]] already carry it:
> the forward camera saw a vulnerable road user or a vehicle cutting in…"

The stack outline's corroborating-signal list, in full (`stack-outline.md`, §1):
**"speed, the g-force trace, GPS, time of day, whether wipers or lights are on."**
There is no object detection, no VRU detection, no forward-vehicle detection in it.

And ADR-0001 explicitly cut the capability that would provide it: "v1 detects harsh
braking, harsh acceleration, harsh cornering and phone-in-hand distraction. **Nothing
else.**" Headway/tailgating — the only forward-camera inference considered — is
deferred to v1.1 on a *field-operations* dependency (per-install camera calibration),
which is a lead-time problem, not a software one.

So the claim "nothing new" is false against the two files it depends on. Recognition
in v1 requires either (a) forward-camera object detection that ADR-0001 excludes and
the stack outline never specifies, or (b) inferring "avoided harm" from g-force,
speed, GPS, time of day and wiper state alone — which cannot distinguish an emergency
stop for a cyclist from an emergency stop for a traffic light, and which R-13 already
names as the failure mode ("a late reaction to a hazard visible for six seconds").

This matters more than a documentation slip because ADR-0010 is presented as the
defect fix that makes the product defensible to drivers (C-30). If the CTO asks "what
detects the cyclist?", the answer in the repo is a capability his own product has
(`company-analysis.md`: CameraMatics AI "detects vulnerable pedestrians, co-workers
and cyclists") **and this submission's own v1 scope excludes**.

The same defect appears twice more:
- **US-006** mandates the grading-reason exemplar *"Graded high: deceleration in the
  top few percent, **with a vehicle ahead**"* — forward-vehicle detection, i.e.
  headway, which ADR-0001 deferred.
- **US-012** mandates the recognition record *"Stopped in time for a cyclist who came
  out of the junction"* — VRU detection.

Both are acceptance criteria. Both require what an accepted ADR cut. **This is the
scope inconsistency the brief asked me to find: an out-of-scope decision (ADR-0001,
forward-camera inference excluded) contradicted by acceptance criteria in US-006 and
US-012.**

*The fix is cheap and does not cost the argument:* either bring VRU/forward-object
detection into ADR-0001's v1 set as a fifth signal and pay the calibration
dependency, or supersede ADR-0010 with a version that proposes credit only from
signals the stack actually carries and says plainly what it cannot yet see.

### Attack 6 — ADR-0001 was flagged unsafe by the company analysis and never repaired
**Disposition: Survives. This is what the CTO says when he reads `company-analysis.md`.**

`company-analysis.md`, under *What this does to the submission*, names three of its
own decisions as now unsafe:

1. **A-01 / J-02 (primary user)** — repaired. ADR-0006 exists, dated 2026-09-14,
   with the divergence recorded and J-14 logging the reversal. Good work.
2. **ADR-0003 (no configuration)** — repaired. A dated addendum acknowledges the
   April 2024 release and narrows the decision to "no configuration of *what
   surfaces*". Exactly right.
3. **ADR-0001 (four event types)** — **not repaired.** The analysis says it "reads as
   under-informed unless it is explicitly framed as *which events reach a human*, not
   which events exist." ADR-0001 still reads as a detection-scope decision
   ("v1 detects… Nothing else"), still dated 2026-09-10, with no addendum, and its
   frontmatter does not reference A-12, A-15 or A-18.

Two of three repaired is good discipline. The one left is the one aimed at the
hiring manager's own product. The CTO's question writes itself: *"We already detect
fatigue, distraction, smoking, phone use, tailgating and vulnerable road users. Your
v1 detects four things. Are you turning the rest off?"*

There is a second-order version of it that is harder: **ADR-0007 says every detected
event is retained, scored and contributes to the driver record.** If detection already
covers eleven behaviours and v1 grades four, what grades the other seven for existing
customers? The repo does not answer this anywhere. Either ADR-0007's "every detected
event" is narrower than it sounds, or ADR-0001's scope is a *routing* scope and says
so nowhere.

### Attack 7 — M-09, the headline metric, is deflated by the mechanism ADR-0008 introduces
**Disposition: Survives. The counter-metric does not catch the gaming it claims to catch.**

M-09 ("share of high-severity events a manager dismisses", target <20%) is the
headline measure in `success-criteria.md` and the pass/fail term in the 90-day test.

ADR-0008 and US-004 rule that a bulk dismissal contributes **one** dismissal signal,
not N. US-004's grouping bound is "a driver, a behaviour and a trip" — exactly the
"forty events on one bad road on one shift" case ADR-0008 is written for.

So the numerator counts *judgements* and the denominator counts *events*. A manager
who bulk-dismisses 40 of 45 high-band events in a week records **1 dismissal against
45 events = 2.2%**, which reads as outstanding precision at the top of the queue while
the queue was in fact rejected wholesale. The metric moves in the wrong direction as
the behaviour it is meant to detect gets worse.

M-11's downgrade audit samples bulk dismissals, which catches the *content* of the
error on a sample basis — but it does not correct M-09's arithmetic, and M-09 is the
number the submission signs up to. M-09 has no `counters:` field at all.

The rule in ADR-0008 is the right rule (forty clicks is not forty judgements). The
error is leaving the denominator unchanged. This is fixable in a sentence — report
M-09 twice, per-judgement and per-event — and it should be fixed before an interview,
because "how does that number behave when I bulk-dismiss?" is the first question a
numerate CTO asks about a workflow metric.

### Attack 8 — Requirements assume capabilities the stack outline does not contain
**Disposition: Survives, three instances, one of them material.**

| Requirement | Capability assumed | Where the stack outline covers it |
|---|---|---|
| **US-008** | Attribution emits a **per-event confidence score** ("Given attribution confidence is below the accepted threshold") | Nowhere. A-11 and Q-09 say the *mechanism itself is unknown* — login, tacho card, roster join, key fob. A roster join or a key fob emits an identity, not a confidence. The story specifies a threshold on a quantity the inherited system may not produce. **Material** — US-008 is the gate on M-03, the primary product metric. |
| **US-002** | An **email notification service**, per-account nominated recipients, 15-minute rate-limiting window, deduplication across events | Nowhere. The cloud section of `stack-outline.md` lists ingest, grouping, scoring, video orchestration, storage, attribution, aggregates and metrics emission. No notification path. ADR-0011 introduced email on 2026-09-14 and the stack outline was not updated. |
| **US-007** | Device connectivity state ("has been offline since {time}") and **portal updates without manual refresh** when footage lands | Partially. The stack outline tracks footage state (ready/fetching/unavailable) but specifies no device heartbeat/last-seen telemetry and no push transport to the portal. |

All three are cheap to add to the outline. The US-008 one is not only a documentation
gap: it is a design assumption about an inherited system that R-09 correctly says we
must "measure and report coverage" for rather than assume — and then US-008 assumes a
richer interface than coverage.

### Attack 9 — The downgrade audit is the only control on the grading model and has no owner, no cadence and no story
**Disposition: Survives. This is the cheapest *undecided* thing the argument is stacked on.**

Once ADR-0007 removes suppression, the risk moves to mis-grading (R-12) and to
unearned praise (R-13). Both name the downgrade audit as the mitigation. M-11's
target sentence says "The downgrade audit finding rate is the number that matters — a
rising share of 'should have been higher' invalidates the grading model regardless of
what M-09 says." So the audit outranks the headline metric.

Eighteen references across the repo. What is never specified anywhere:
- **who performs it** — ADR-0008 consequence 3 says "It needs an owner. A control
  nobody performs is not a control," and then names no owner;
- **how often** — "periodic" (M-11), "periodic" (R-12). That word is the hedge the
  method banned from requirements and it survives in the register instead;
- **what sample rate**, at what confidence, against what finding-rate threshold;
- **what tool** — three stories say events are "eligible for selection" in the audit
  sample; **no story builds the sampling, review or finding-recording surface.** It is
  the one piece of the loop with zero of 15 stories behind it.

A CTO will ask who does this and how long it takes. "A person reads a sample" is an
operations cost with no number attached, in a submission whose whole argument is that
human attention is the scarce resource. The control that protects the routing model
consumes the exact resource the product exists to conserve, and that trade is never
priced.

### Attack 10 — Three categorical industry claims carry no assumption ID
**Disposition: Survives. Cleanest C-01 breach in the repo, and it was never caught.**

C-01: "No number, benchmark or market fact appears anywhere in this repo or in the
submission unless it is either (a) measured, with a named source, or (b) an entry in
`registers/assumptions.yaml`." C-02 and the README both say there are no borrowed
industry benchmarks. These three claims are market facts with neither source nor ID:

1. **"Collisions in a mid-size commercial fleet are concentrated: a minority of
   drivers and a short list of repeatable behaviours… account for most of the
   at-fault cost"** — `problem.md:11`, restated as "a small number of drivers are
   responsible for a disproportionate share of that cost" at `business-case.md:51`.
   This is the **premise of the commercial case**. It is an empirical distributional
   claim about fleet collision data. It has no A- ID. The next clause —
   "Fleet managers already believe this" — is a claim about customer belief in a
   repo that has spoken to no customers.
2. **"Every AI dashcam rollout fails the same way"** — `problem.md:26`; and R-01's
   detail, "This is the default outcome for AI dashcam rollouts and the reason triage
   is the spine" (`risks.yaml:12`). A categorical claim about an entire product
   category, and it is the stated justification for the spine.
3. **"Detection is table stakes and increasingly commodity at the edge"** — five
   locations (`problem.md:51`, `business-case.md:21`, `annotated-brief.md:72`,
   `company-analysis.md:161`, `README.md:40`). Said to a CTO whose company sells
   detection, with no source.

Plus one competitive claim: **"this is the first mechanism that finds them before the
incident rather than after it"** (`business-case.md:52`) — a first-to-market claim,
which C-02 forbids and C-08 makes irrelevant even if true.

Each of these has been restated often enough inside the repository to look sourced.
That is the specific failure mode the reviewer brief names, and A-03 is not the only
instance of it — it is the only *caught* instance.

### Attack 11 — Canon C-28 forbids a model in scoring; the requirements specify one
**Disposition: Survives narrowed.**

C-28: "nothing in triage, scoring, grouping, routing or coaching gets a model because
a model was available. The test, before any model ships: say what it does that a
deterministic rule cannot; name the failure mode it introduces… Where a rule and a
model are close, ship the rule."

The repo then specifies, without ever running that test:
- **US-006** AC: "Given the **severity model version** changed after this event was
  scored… the version that scored it is retrievable."
- `stack-outline.md`: "**Version the severity model** on every event"; "thresholds and
  **models** are tuned centrally".
- **ADR-0010**: credit is "proposed conservatively, **at high confidence** only" — a
  confidence score implies a probabilistic classifier.

Narrowed because "model" may be loose usage for a versioned rule set, and versioning
a rule set is exactly right. But the word appears in an acceptance criterion and in
the architecture document, C-28 is presented as a headline differentiator of this
submission, and no artefact anywhere runs C-28's three-part test on severity scoring
or credit classification. Either rename it (`severity ruleset version`) or run the
test in an ADR. A CTO who has read C-28 will check.

### Attack 12 — M-05 interacts badly with ADR-0009's auto-close and nobody has closed the loop
**Disposition: Survives narrowed.**

M-05 is "share of events classified high severity that reach a **terminal review
state** (coached or dismissed) within 7 days". ADR-0009 and US-003 close the weekly set
and move unreviewed items "to a closed state".

M-05's parenthesis excludes closed-unreviewed, so the metric is probably safe. But
US-003 — which links M-05 — never says that closed-unreviewed is **not** terminal, and
US-001's completion condition is "the manager has reached a terminal state on every
item". If an implementer reads "closed" as terminal, M-05 reads ~100% permanently and
the second-most-cited engagement metric becomes meaningless. One acceptance criterion
in US-003 fixes it. Narrowed because the register is right; the requirement is silent.

### Attack 13 — There is no phasing
**Disposition: Survives.**

15 of 15 stories are `phase: v1`. The skill offers `v1 | v1.1 | later`; nothing uses
the other two values. `[[phasing]]` is a dangling link. The README lists
"Prioritisation and phasing — section 4" as an unchecked deliverable.

Meanwhile `stack-outline.md` closes with an explicit dependency chain that *is* a
phasing argument — device capability (Q-03) gates event types, retention (A-10) gates
promote-and-fetch, attribution (Q-09) gates coaching and therefore M-03 — and **not
one story is gated on it**. US-010 (log coaching) and US-008 (resolve driver) are both
`phase: v1, priority: must` while Q-09, which the stack outline says gates coaching
entirely, is `blocking: true` and open.

So the requirements assert that everything ships in v1 while the architecture asserts
that a blocking unknown decides whether half of it can. Priority is not phasing:
12 `must` / 3 `should` across a set where the gating question is unanswered is a
priority ordering inside an undecided scope.

### Attack 14 — The README's account of research is false
**Disposition: Survives.**

`README.md:66–71`, "Assumptions, stated once": *"No insider knowledge of CameraMatics'
architecture, installed base, ARPU or customer data was used, **and none was
researched** — a deliberate choice recorded as J-05 in the judgement log… There are no
borrowed industry benchmarks and **no citations**."*

J-05 was superseded in part by **J-11**, which reversed it. `company-analysis.md`
exists, runs to ~170 lines, and ends with **seven cited URLs**. Six assumptions
(A-12…A-17) and one risk (R-10) were produced from it, and ADR-0003's addendum and
ADR-0006 both turn on it.

So the README's one section about epistemic honesty describes a repository that no
longer exists. This is the same class of error as Attack 2 — a reversal recorded in
the register and never propagated to the consumer — but here it lands on the
first-page claim about research integrity, which is the worst possible place for it.

### Attack 15 — The judgement log's own summary does not match the log
**Disposition: Survives narrowed. It does not flatter; it is stale, which is a different and lesser fault — with one exception that does flatter.**

The brief asked whether judgement is credited to a human who did not exercise it.
Mostly, no: the log is unusually careful, marks J-03 `proposed` with `decided_by: —`,
and J-09 explicitly refuses to inflate a ratification into a reversal. That discipline
is real and it is the strongest evidence in the submission. Three problems:

1. **The concluding section is stale.** "On the evidence above, **across eight
   decisions**" and "**three outright reversals**" — the log has **20 entries**
   (J-01…J-20) and, counting only entries the log itself labels, **six are marked
   *(agent overruled)*** (J-04, J-05, J-06, J-10, J-14, J-19), a seventh is a reversal
   in substance (J-18), an eighth is a reframe (J-16), and J-11, J-13, J-15 and J-17
   are further corrections. The README repeats "three reversals" at line 52. The
   summary was written when the log had eight entries and was never updated — in the
   one file whose value is that its counts can be trusted.
2. **J-11 debits the agent for a boundary the human drew.** J-05 records the human
   deciding "no external research". J-11 reverses it and assigns the class of error to
   the agent: *"The agent accepted the boundary as drawn rather than noticing it was
   drawn in the wrong place."* The boundary was drawn by the human, against an agent
   recommendation to do exactly the research J-11 later commissions. The agent's
   original J-05 recommendation was **right**, was overruled, and is then blamed for
   having complied. Meanwhile the closing analysis still cites J-05 as one of the
   three exemplary human framings. That is the one place in the log where the ledger
   is kept in the author's favour, and it is detectable purely from the log's own text.
3. **Six of eleven ADRs carry `decided_by: danny` with no judgement-log entry** —
   ADR-0001, 0003, 0004, 0005, 0008, 0009. Logged: ADR-0002 (J-09), ADR-0006 (J-14),
   ADR-0007 (J-16), ADR-0010 (J-18), ADR-0011 (J-20). If the log is the evidence that
   the decisions were the human's, it covers 5 of 11. Canon C-25 items 2 and 3
   (scope cuts, severity thresholds) are precisely what ADR-0001, 0003, 0004, 0007 and
   0009 decide.

Narrowed rather than upheld in full, because nothing here is fabricated and the
`proposed`/`ratified` discipline holds. But "eight decisions / three reversals" is a
countable claim in the artefact that exists to make counts trustworthy.

### Attack 16 — Copy rules contradict themselves inside the acceptance criteria
**Disposition: Survives narrowed. Small, but these are the exact strings that ship.**

- **US-007** mandates: *"Footage not available yet. This vehicle has been offline
  since {time} and will upload when it reconnects."* Its own next criterion requires
  copy to name "what is missing, why, and **what the manager can do now** (W-04)". The
  mandated string does not say what to do now. `skills/ux-writing.md`'s version of the
  same string does — it ends "You can still dismiss this event." The story dropped the
  clause its own rule requires.
- **US-007** mandates *"Footage is on its way. It usually arrives within a few
  minutes."* — while the story's out-of-scope section says "we do not state a number
  we cannot hold," and M-10's target is a **median of 15 minutes**. "A few minutes" is
  a number in words, and it is not the one in the register.
- **US-003** requires the closed-unreviewed string "never as a second-person
  construction ([[ux-writing]] W-03)". W-03 is about **blame**, not person, and
  `ux-writing.md` says "Second person throughout". US-001's mandated empty state is
  itself second person ("Nothing needs **your** attention this week… **You** can look
  at any of them"). The AC cites a rule that says something else.
- `ux-writing.md` W-06's recognition exemplar is written **to the driver** ("**You**
  stopped in time for a cyclist…") for a release that has no driver surface
  (ADR-0004); US-012's version is correctly third-person. The skill and the story
  disagree about who is reading.

### Attack 17 — Does the problem follow from the assumptions?
**Disposition: Not actually the risk.**

I expected to find A-02's range promoted to a point estimate. It is not. `problem.md`,
`business-case.md`, `prd.md` and `README.md` all carry "50–450" or "0.5–3 per vehicle
per day" with the A-02 citation intact, and `ADR-0002` does the cost arithmetic across
both ends of the range and names the volume at which the decision reverses (~0.3/
vehicle/day). A-19 is honestly sourced as "Danny's direction for this exercise —
assumed, not measured". A-02 carries a discovery gate, a validation plan and a
`if_wrong` that says the submission is wrong.

This is the claim the drafting context was most worried about and it is the best-
defended thing in the repository. The promotion-to-fact failure happened elsewhere —
A-03 (Attack 2) and the three unregistered market claims (Attack 10).

### Attack 18 — Is the recognition argument (claim 4) sound as an argument, separately from its detection dependency?
**Disposition: Survives as an argument. Refuted only as specified — see Attack 5.**

The reasoning in ADR-0010 and C-30 is the strongest original thinking here: a purely
negative detector makes invisibility the ceiling; a driver who brakes for a child
would have entered the review set as high-severity harsh braking and been coached for
preventing a collision. That *is* a defect report, not a feature request, and framing
it as one is the single most interview-ready idea in the submission. R-13 (unearned
praise) is a genuinely good self-attack and the "never set a recognition target"
discipline in M-13 is right.

It fails only on the sentence "Nothing new" — which is a factual claim about the
stack, not about the argument. Fix the sentence and the argument stands.

---

## 5. Hostile readers

**The fleet manager.** *"You've cut me to four event types when the product I already
bought detects eleven. You've taken away the trigger-window setting I actually use —
and your own file (A-15) says I've had it since 2024. Your weekly set throws away
events I didn't get to and shows me a count of them, which you call a receipt in your
own ADR. And when I clear forty events from one bad road in one click, you record that
as a single decision, so your quality number looks better than my week did."*
Three of these four are answerable from the repo. The first is not (Attack 6).

**The firmware engineer.** *"You want a guaranteed 7–14 day retention window (A-10) as
a contract rather than a best effort, on an SD card, while running continuous loop
recording and on-device vision inference, and you want to fetch from it days later
from a van that may have been in a yard with no signal all week. You want two severity
thresholds — a conservative local flag and a richer cloud score — held in step, both as
server-side config, with 'nothing tunable in firmware'. Your own outline says heavy
inference isn't available with ignition off, and your unconditional collision upload
fires at exactly the moment the device may have lost power. And you've specified
phone-in-hand distraction as the one camera inference in v1, which is the one that
competes hardest with encoding for SoC budget."*
A-04 and Q-03 carry most of this honestly. The ignition-off interaction with
unconditional upload is not addressed anywhere.

**The driver in the clip.** *"A system proposes I did something good. Its own decision
record admits it cannot tell whether I could have avoided the situation earlier. My
manager confirms it by clicking. If I disagree with a coaching event, my manager types
what I said into a box called 'What the driver said' and can tick 'Driver disputes
this' — and your own story says adjudicating it is out of scope. The medium-band events
about me get 'sent' to me through a channel that doesn't exist; the confirmation
literally reads 'pass this on when you next speak.' I have no login, no view of my own
record, and no route to contest anything. Canon C-07 says the top of the queue must be
defensible to me. Who asked me?"*
ADR-0004 takes this trade knowingly and R-04/M-12 watch it — but note that `jtbd.md`
cites `[[personas/driver]]` twice and **the driver persona file does not exist**. The
one stakeholder the canon names twice has no artefact.

**The data protection officer.** Mostly well handled — DPIA named (A-07), Q-05
blocking, role-based access and view auditing in the stack outline, ADR-0011's data
minimisation on the email is genuinely good and would survive scrutiny. Three gaps:
1. **US-014 specifies a per-driver profile** aggregating events by band, coaching
   records, driver responses, disputes and recognitions, retained indefinitely. No
   retention period, no erasure path, no lawful basis is stated for the *record*, as
   distinct from the footage. The stack outline notes the retention/erasure tension
   and calls it "a policy decision with a legal owner" — and names no owner.
2. **M-12 proposes joining coaching records to customer HR data** — "voluntary
   attrition among coached drivers versus fleet average… source: customer HR data
   where shared". That is employee-monitoring analytics correlating a disciplinary-
   adjacent process with employment outcomes. No assumption covers it, Q-05 covers
   footage-based coaching only, and R-04's mitigation does not mention it. This is the
   single riskiest unregistered item in the repository from a legal standpoint.
3. **US-003's footage-expiry string exposes the device retention window to the user**
   while the *cloud* retention policy is specified nowhere. A DPO will ask how long
   the uploaded clip lives after the event is closed. No artefact answers.

**The CTO who built the product.** Covered in Attack 6, plus: he will open
`company-analysis.md`, find his own product described accurately and generously, find
three of the submission's decisions listed as "now unsafe" by its own author — which
will read very well — and then find that one of the three was never fixed and that it
is the one about his detection stack. He will then ask what grades the seven event
types this v1 does not cover. Then he will `ls scripts/`.

---

## 6. The cheapest thing the argument is stacked on

**`scripts/validate.py`.** Perhaps a hundred lines of Python. Load-bearing claim 5
rests entirely on it; canon devotes a section heading and rule C-26 to it; AGENTS.md
builds the division-of-labour table's punchline on it ("The last row is the point");
the README uses it twice as the proof that the AI claim is checkable rather than
asserted. It does not exist, and §3 shows the tree would not pass it. Everything else
in this review is a sentence or a paragraph; this is the one place where the argument
has been designed around an artefact nobody built.

**Runner-up, and the one that costs more to fix: the downgrade audit** (Attack 9) — a
recurring human control with no owner, no cadence, no sample rate and no story, on
which ADR-0007's entire "nothing is hidden" promise depends.

---

## 7. What I verified, and what I inferred

**Verified** — directly from the files, reproducible by anyone with the repo:
- Directory contents, `git ls-files` (53 tracked files), commit list and per-commit
  file lists; `scripts/`, `docs/`, `.github/workflows/` empty.
- All register counts, all metric/assumption/risk/question reference counts, all
  story frontmatter tallies, AC counts, link extraction and dangling-link targets.
- Every quoted line, with file and line number.
- That commit `086211e` touched `prd.md` and not `business-case.md`,
  `stack-outline.md` or `README.md`.
- That `M-02` appears in exactly one file and has no `counters:` key.
- That the stack outline's corroborating-signal list contains no object detection.

**Inferred** — my reading, arguable:
- That the M-09 bulk-dismissal deflation is material rather than theoretical. It
  depends on how often US-004's grouping bound (same driver, behaviour, trip) is met
  at scale, which nobody knows. The arithmetic is certain; the frequency is not.
- That US-008's "attribution confidence" is not obtainable from the likely inherited
  mechanisms. I am reasoning about systems I have not seen, from A-11, which itself
  says the mechanism is unknown.
- That "severity model" in US-006 means a statistical model rather than a versioned
  ruleset. It may be loose usage.
- That the judgement log's "eight decisions / three reversals" is staleness rather
  than intent. I cannot see the working sessions; I can only see that the log's own
  labels contradict its own summary.
- The DPO objections. I am not a lawyer and Q-05 is the right place for them; I flag
  M-12/HR-data as unregistered, which is a C-01 point rather than a legal opinion.
- All five hostile-reader voices are constructed, not sourced. They are attack
  surfaces, not evidence.

---

## 8. Coverage — what I did not do

**Read in full (31 files):** `AGENTS.md`, `README.md`, `agents/adversarial-reviewer.md`,
`brain/canon.md`, `prd.md`, `problem.md`, `jtbd.md`, `business-case.md`,
`success-criteria.md`, `stack-outline.md`, `company-analysis.md`, `annotated-brief.md`,
`judgement-log.md`, `personas/fleet-manager.md`, all 4 registers, all 11 ADRs,
`requirements/README.md`, all 15 user stories, `skills/ux-writing.md`,
`skills/user-stories.md`, `skills/adversarial-review.md`.

**Read only in part:** `skills/prd.md`, `skills/decision-record.md`,
`skills/competitive-brief.md`, `skills/stakeholder-update.md` — I grepped these four
for traceability and metric rules rather than reading them line by line. A rule
inside them that the artefacts breach would have been missed. Combined length 202
lines, so the exposure is small but real.

**Not examined:** the deck itself (does not exist in the repo); the clickable
prototype referenced in J-10 (does not exist in the repo); any file's git history
beyond commit subjects and stat lists; the seven external URLs in
`company-analysis.md` — **I did not verify a single one of them**, so every "Verified"
row in that file is unverified by me, including the funding figure, the customer names
and the April 2024 release-note contents on which A-15 and ADR-0003's addendum depend.

**Could not verify at all:**
- Whether A-02, A-13, A-14 or A-16 are true. They are the discovery gates and they are
  correctly labelled as unknown; nothing in this review changes their status.
- Whether the judgement log's account of the working sessions is accurate. I can test
  it only for internal consistency (Attack 15), not for fidelity to what happened.
- Whether CameraMatics' current product has event triage (Q-10). If it does, Attack 6
  gets worse and the framing collapses as R-10 predicts.

---

## 9. Disposition summary

| # | Attack | Disposition |
|---|---|---|
| 1 | Validator and CI asserted, absent, README self-contradicting | **Survives** |
| 2 | Withdrawn time budget live in 4 files, incl. PRD line 23 | **Survives** |
| 3 | Withdrawn 90s target live in `accepted` success criteria | **Survives** |
| 4 | Suppression framing survives ADR-0007 in 11 places | **Survives** |
| 5 | ADR-0010 credit detection not in stack outline, cut by ADR-0001 | **Survives** |
| 6 | ADR-0001 never repaired after company-analysis flagged it | **Survives** |
| 7 | M-09 deflated by ADR-0008's one-signal rule | **Survives** |
| 8 | Three requirements assume capabilities absent from the stack | **Survives** |
| 9 | Downgrade audit: no owner, no cadence, no story | **Survives** |
| 10 | Three market claims with no assumption ID | **Survives** |
| 11 | C-28 vs "severity model" in US-006 and the stack outline | **Survives narrowed** |
| 12 | M-05 vs auto-close ambiguity in US-003 | **Survives narrowed** |
| 13 | No phasing: 15/15 stories v1, `[[phasing]]` dangling | **Survives** |
| 14 | README's research account falsified by J-11 / company-analysis | **Survives** |
| 15 | Judgement log summary stale; J-11 debits agent for human's boundary | **Survives narrowed** |
| 16 | Copy rules contradicted inside their own acceptance criteria | **Survives narrowed** |
| 17 | A-02 promoted to fact | **Refuted — the range holds everywhere** |
| 18 | Recognition argument unsound | **Not actually the risk — the argument holds; the detection sentence does not** |

**Sixteen of eighteen survive.** That is not a verdict on the product thinking, which
is better than the repository's own bookkeeping suggests. It is a verdict on the gap
between what the repository claims about itself and what it currently contains —
which, for a submission whose thesis is *that the claims are checkable*, is the one
gap that cannot be left open.

Per `skills/adversarial-review.md`, every finding above needs a human disposition —
accepted, rejected with a reason, or deferred — and rejections belong in
`judgement-log.md`. No artefact frontmatter should flip to `adversarial_pass: ran`
except those listed in §8 as read in full.

---

## 10. Human disposition — 2026-09-14, Danny

Per [`../skills/adversarial-review.md`](../skills/adversarial-review.md): every
finding gets a disposition, and a rejection or a deferral carries its reason.
Sixteen findings survived. Twelve are accepted and fixed, two are partly fixed
with the remainder deferred, and two are deferred outright — with the reasons below, because deferring silently is the
same failure as not reviewing at all.

The fixes are committed separately from this review so the diff shows what the
pass bought.

| # | Disposition | What happened |
|---|---|---|
| 1 | **Accepted, fixed** | `scripts/validate.py` written and committed; README's self-contradiction removed; CI workflow committed |
| 2 | **Accepted, fixed** | Withdrawn time budget removed from `prd.md`, `business-case.md`, `stack-outline.md` |
| 3 | **Accepted, fixed** | Withdrawn 90-second target removed from `success-criteria.md`, with the reason it was withdrawn stated in place |
| 4 | **Accepted, fixed** | ADR-0007's reframe propagated; remaining uses of "suppress" are either historical (ADR-0007 describing what it replaced) or about *their* product, not ours |
| 5 | **Accepted, fixed** | [[ADR-0012]] supersedes [[ADR-0001]] — forward-facing detection in v1, and every event carries every signal |
| 6 | **Partly accepted, partly deferred** | See below |
| 7 | **Accepted, fixed** | [[M-09]] reports per-judgement and per-event, and the 90-day test binds to per-judgement. The sweep that per-judgement cannot see is now its own term, [[M-14]] (J-22) |
| 8 | **Deferred** | See below |
| 9 | **Partly accepted and fixed, remainder deferred** | See below |
| 10 | **Accepted, fixed** | [[A-20]], [[A-21]] and [[A-22]] registered; the first-to-market claim removed outright under C-02 |
| 11 | **Accepted, fixed** | "Severity model" → "severity ruleset" in US-006 and `stack-outline.md`, with the C-28 reasoning stated in both |
| 12 | **Accepted, fixed** | US-003 gains an acceptance criterion: closed-unreviewed is not a terminal state for [[M-05]] |
| 13 | **Accepted, fixed** | [[phasing]] written, with `skills/phasing.md` as its recipe. The dangling `[[phasing]]` link in `stack-outline.md` now resolves. The 15/15-v1 observation is answered rather than obeyed: the unit of value is the loop, so v1 is a thin whole loop and the one defensible cut is ratified as J-24 |
| 14 | **Accepted, fixed** | README's account of research corrected |
| 15 | **Accepted, fixed** | Judgement log counts corrected; J-11's attribution corrected in a dated note rather than overwritten; J-05 removed from the exemplary list with the reason stated |
| 16 | **Deferred** | See below |
| 17 | Refuted | No action |
| 18 | Folded into 5 | The argument holds; the detection sentence was the defect, and [[ADR-0012]] answers it |

### The deferrals, with reasons

**6 — ADR-0001 never repaired.** The half about detection scope is accepted and
fixed: [[ADR-0012]] supersedes ADR-0001 and brings forward-facing detection in.
The second-order half is deferred and I would rather say so than answer it
badly. If the shipped product already detects eleven behaviours and this v1
grades four, then [[ADR-0007]]'s "every detected event is retained and scored"
describes a larger set than my scope decision does, and the honest resolution is
either that v1's scope is a *routing* scope over everything already detected, or
that it is a detection scope and existing events keep their current treatment.
That is a scope decision worth more than a guess, it depends on [[Q-10]] — which
is blocking and unanswered — and it is a good question to be asked in the room.
Named in ADR-0012 under *What this does not settle*.

**8 — Requirements assume capabilities the stack outline does not contain.** The
US-002 and US-007 instances are documentation gaps and cost a paragraph each.
The US-008 one is not: it assumes attribution emits a per-event confidence
score, and [[A-11]] and [[Q-09]] say the attribution *mechanism itself* is
unknown. A key fob emits an identity, not a confidence. Writing a stack line
that says "attribution emits a confidence" would invent an interface to an
inherited system in order to close a finding, which is the failure mode
[[canon#C-02]] exists to prevent. Deferred until Q-09 is answered, and carried
openly rather than papered over.

**9 — The downgrade audit has no owner, no cadence and no story.** The finding
was right and it turned out to be two questions tangled together. *Does the
control exist in phase 1* is now answered: [[ADR-0013]] says the audit runs from
first release as a manual CameraMatics-side practice, with the sampling and
finding-recording surface deferred to phase 2. That also answers the reviewer's
sharpest line — the control no longer consumes the resource the product exists
to conserve, because it is our attention rather than the fleet manager's.

Still deferred, and deliberately: **cadence and sample rate**. They depend on
event volume ([[A-19]], unmeasured) and on the early finding rate, and a number
set now would be a false precision in the one control that has to be trusted
([[canon#C-03]]). The operational cost of the manual pass is also still
unpriced; that belongs in the phasing section rather than in a figure invented
to close a finding.

**16 — Copy rules contradict themselves inside acceptance criteria.** Accepted
as correct and deferred deliberately, because these four strings get written for
real when the prototype is built against
[`../skills/ux-writing.md`](../skills/ux-writing.md). Fixing them on paper now
and again in the prototype does the work twice and risks the two drifting apart.
The prototype is where the contradiction resolves or the rule changes.

### Also carried, not raised as an attack

[[M-12]] proposes joining coaching records to customer HR data for the attrition
half, and no open question covers the legal basis for that join. [[R-04]] covers
data protection generally and does not reach this. Left open and named here
rather than closed quietly.

### What the pass cost and bought

The verdict was **Not yet** and it was right. Of eighteen attacks, sixteen
survived, and the one that mattered most — [[ADR-0010]] resting on a capability
[[ADR-0001]] had cut — was a genuine scope inconsistency that two acceptance
criteria had already written around without anyone noticing. The findings about
the repository's own bookkeeping were worse than the findings about the product
thinking, which is the right way round for a submission arguing that its claims
are checkable, and exactly the reason to have run the pass rather than assert
it was fine.
