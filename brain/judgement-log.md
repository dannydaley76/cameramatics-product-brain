---
id: JLOG
title: Judgement log
status: active
owner: danny
links: [canon, AGENTS]
adversarial_pass: ran 2026-09-14
---

# Judgement log

Where the machine's output was accepted, changed, or overruled — and by whom.

This file exists because "I used AI, and my judgement is the value I add" is a
claim anyone can make in an interview. It is only credible if there is a record
of judgement actually being applied, including the entries where the agent was
told no.

**Read the `decided_by` and `status` fields carefully.** An entry marked
`proposed` is the agent's recommendation awaiting my ratification. It is not yet
my judgement, and this log will not pretend otherwise — the same discipline as
[[canon#C-04]] (what was said versus what was inferred) and the reason
[[canon#C-24]] requires every artefact to state whether the adversarial pass
actually ran.

Format: what was on the table, what was decided, and — the load-bearing column —
**what the decision rested on that the agent did not have.**

Where a recommendation was overruled, the entry also gives the agent's own
reasoning, the specific flaw in it, and the class of error ([[canon#C-27]]).
"The human decided otherwise" would only evidence a preference. The reason is
what evidences judgement, and the recurring error classes are the most useful
output of the log — they say where to watch next time.

---

## J-01 — The spine of the submission

**Agent produced:** four candidate spines (attention as the scarce resource;
driver trust; closed-loop measurement; video economics), each with a case for
and against.

**Decided:** attention is the scarce resource. `decided_by: danny` ·
`status: ratified`

**What it rested on:** which of four defensible framings survives ninety minutes
of a Head of Product interview with a fleet safety company. The agent could
enumerate the options and argue each; ranking them against an audience it has
never met is not enumeration.

## J-02 — Primary user for v1

**Agent produced:** four segment options, from mid-size fleet manager to
enterprise safety manager to driver-first.

**Decided:** fleet manager, 20–150 vehicles, no dedicated safety role.
`decided_by: danny` · `status: ratified`

**What it rested on:** the segment choice that keeps v1 scope honest and makes
the phasing section defensible rather than convenient.

## J-03 — Commercial anchor

**Agent produced:** four framings; then, when no choice was made, a
recommendation — two-sided (customer cost of risk plus revenue on the installed
base), with insurance as an explicit upside rather than the headline.

**Decided:** nothing yet. `decided_by: —` · `status: proposed`

**Why it is still open:** the human declined to decide off a menu, which is the
correct response to a decision that needs thinking rather than picking. The
recommendation stands in the draft as a recommendation, marked as one.

## J-04 — Submission format *(agent overruled)*

**Agent recommended:** a written document as the primary artefact, on the
grounds that it is the lowest-risk read, matches the brief's request for a tight
submission, and that a deck risks looking thin.

**Decided:** slides, with the repo as supporting evidence.
`decided_by: danny` · `status: ratified`

**Reason for reversal:** the agent optimised the wrong moment. It treated the
submission as a document to be *read* and scored, when the brief states that a
strong submission leads to a two-hour walkthrough. A deck is the artefact you
present *from*; a document is one you defend *against*. The recommendation was
sound reasoning about the artefact in isolation and wrong about the artefact's
job.

*Class of error: optimised for the stated deliverable rather than the actual
objective.*

## J-05 — Market research *(agent overruled)*

**Agent recommended:** research CameraMatics' positioning and competitor
framing, plus published collision and premium benchmarks, to ground the business
case in real numbers.

**Decided:** no external research; assumption-based throughout, with every
number carrying a range and a validation plan.
`decided_by: danny` · `status: ratified`

**Reason for reversal:** the agent applied a default — more evidence is better —
to a situation where the constraint was part of the test. The brief says no
insider knowledge is needed and that how you handle stated assumptions is part
of the exercise. Sourced benchmarks would have looked like diligence on the page
and read as padding under questioning, because I cannot defend a third party's
collision statistics in a room with people who sell into this market daily. The
reversal also produced a better artefact than the recommendation would have:
[[registers/assumptions]] exists in the shape it does *because* the easier
route was closed.

*Class of error: treated a constraint in the brief as an obstacle to work
around rather than as a signal about what was being assessed.*

## J-06 — Depth of the product brain *(agent overruled)*

**Agent recommended:** a lightweight structured knowledge base, warning that
anything heavier risks reading as a side project or as scaffolding hiding thin
product thinking.

**Decided:** full traceability with schema validation in CI.
`decided_by: danny` · `status: ratified`

**Reason for reversal:** the agent was managing a real risk, but not the live
one. Its concern — over-engineering read as showing off — is a risk when the
structure is decorative. Here the structure carries the argument: the
traceability is what lets every number in the deck be traced to an assumption
with a test, which is the specific thing this brief asks for. The agent hedged
against looking like it tried too hard, which is a worse failure mode than
being under-built only if the effort is pointed at nothing.

*Class of error: hedged against a generic risk without checking whether it
applied to this artefact.*

## J-07 — Canon and skills in the repo *(human addition, unprompted)*

**Agent produced:** nothing. This was not on the agent's list.

**Decided:** add `brain/canon.md` — standing rules the brain does not break —
and `skills/` — the versioned recipes each document type is produced from.
`decided_by: danny` · `status: ratified`

**What it rested on:** operating experience of running an agent team, where the
failure mode is not bad output but *unbounded* output. Rules the agent cannot
write around, and recipes that are inspectable, are the mechanism. Ported from
Danny's own working repo rather than invented for this exercise.

## J-08 — Demonstrate the division of labour rather than assert it

**Agent produced:** an AI-usage note, as the brief asks for.

**Decided:** the division of labour has to be *visible in the artefacts* — this
log, provenance on every file, an adversarial pass with a stated outcome, and
machine-enforced rules a human wrote. `decided_by: danny` · `status: ratified`

**What it rested on:** what was said in the previous interview round, and a view
of what that panel will find credible. The agent had no access to either. This
entry is the clearest example in the log of the thing the log is about.

## J-09 — Video upload model *(agent recommendation ratified)*

**Agent produced:** three options — eager upload, metadata-first with fetch on
demand, and a severity-gated hybrid — with the cost arithmetic, the failure mode
of each, and a recommendation for the hybrid.

**Decided:** severity-gated hybrid ([[decisions/ADR-0002]]).
`decided_by: danny` · `status: ratified`

**What it rested on:** the human declined to pick from the option list and asked
for the trade-off to be shown first. That is the load-bearing act in this entry
and it is worth naming as one: ratifying a recommendation you have seen the
reasoning for is judgement; selecting the option marked *recommended* is not.

Two things came out of showing the working that were not in the original
recommendation — that the decision is the same decision as triage rather than a
parallel one, and that data minimisation on driver-facing footage is an argument
independent of cost. Both are now the ADR's actual justification. The
recommendation was right for weaker reasons than the ones it ended up resting on.

*Recorded honestly as a ratification, not a reversal. A log that only contained
disagreements would be its own kind of theatre.*

## J-10 — Interactive prototype instead of static wireframes *(agent overruled)*

**Agent recommended:** deliberately low-fidelity static wireframes, on the
grounds that polish invites a design review instead of a requirements
discussion, and that the brief says hand-drawn is fine.

**Decided:** low-fidelity *and* clickable — a working prototype of the
queue → review → coach flow. `decided_by: danny` · `status: ratified`

**Reason for reversal:** the agent solved for fidelity and ignored
interactivity, treating them as one axis when they are two. Static-and-low-fi
and clickable-and-low-fi have the same protection against design critique; only
one of them demonstrates that the queue model actually works as described. The
recommendation was right about the risk and wrong about which options carried it.

*Class of error: collapsed two independent variables into one and then optimised
the wrong one.*

## J-11 — Company analysis, reversing J-05 *(human-initiated)*

**Agent produced:** nothing. J-05 had closed research off, and the agent was
working within that.

**Decided:** research CameraMatics' positioning and market situation, store it in
the repo, and use it to build the story. `decided_by: danny` ·
`status: ratified` · **supersedes J-05 in part**

**What changed in the world:** a storytelling requirement the agent had no
knowledge of — feedback from a previous job presentation that the narrative was
not strong enough. A story about *their* situation cannot be told from
assumptions about a generic fleet-safety vendor.

**What it rested on:** distinguishing two things the original decision had
lumped together. J-05 rejected *borrowed third-party benchmarks*, which are
still out — I cannot defend another firm's collision statistics in a room with
people who sell into this market daily. It should not have rejected *analysis of
the buyer*, which is table stakes. The agent accepted the boundary as drawn
rather than noticing it was drawn in the wrong place.

**What it produced:** [[company-analysis]] — and three of the submission's own
decisions are now unsafe as a direct result (primary user, ADR-0003, ADR-0001).
A research pass that only confirmed existing work would have been worthless.

*Class of error: treated a prior decision's scope as settled rather than
testing whether the category it excluded was the right category.*

> **Correction, 2026-09-14, on the adversarial pass (Attack 15).** The line
> above debits the agent for a boundary I drew. J-05 records me overruling an
> agent recommendation to do exactly this research; blaming it afterwards for
> having complied is the ledger kept in my own favour, and this log cannot
> afford that more than any other error in it. The original text stays per
> [[canon#C-16]] and the attribution is corrected here.
>
> *Class of error, restated: mine. I excluded a category I meant to keep
> (analysis of the buyer) along with the one I meant to exclude (borrowed
> third-party benchmarks), and J-05's reasoning does not distinguish them. The
> agent's smaller and real share: when the storytelling requirement arrived, it
> did not flag that a new requirement had invalidated an old constraint — the
> same frame-blindness the closing section describes, applied to a frame it had
> itself argued against.*

## J-12 — Lean on the research, but register it as assumption

**Agent produced:** three ways to use the company analysis — keep it as
background and answer the brief as briefed; build the submission on the
diagnosis as a verdict; or lead with the diagnosis held as a hypothesis.

**Decided:** use the research and lean on it, with every inference caveated as
potentially out of date or inaccurate and registered as an assumption.
`decided_by: danny` · `status: ratified`

**What it rested on:** a calibration the agent had framed as a spectrum from
safe to bold, which was the wrong axis. The real question is not how hard to
lean but *what you claim about how you know*. A diagnosis stated as a verdict
and a diagnosis stated as a labelled hypothesis can lean equally hard; they
differ only in what being wrong costs. Registering the inferences buys the
strong story and the honest epistemics at the same time, so the choice the agent
presented as a trade-off was not one.

**What it produced:** [[A-12]] to [[A-17]] as registered assumptions, [[A-18]]
as the meta-assumption on source recency that qualifies all of them, [[R-10]]
for the risk that the diagnosis is simply wrong, and [[Q-10]] as the question to
open the walkthrough with — asked out loud, before defending anything.

*Class of error: presented a genuine choice on the wrong axis, framing an
epistemic question as a boldness question.*

## J-13 — AI restraint as canon *(human-initiated; agent blind spot)*

**Agent produced:** nothing. Across two full passes of the brief the agent never
noticed that the brief does not ask for AI anywhere except where edge vision
implies it.

**Decided:** make restraint a canon rule — AI goes into the product only where it
demonstrably beats a rule ([[canon#C-28]]). `decided_by: danny` ·
`status: ratified`

**What it rested on:** reading the *absence* of a word as a signal rather than a
gap to fill. The brief's "Working with AI" section is about how the candidate
works; the easy misread is to answer it by putting AI in the product, and a CTO
reading many submissions will see exactly that.

Worth naming plainly: the agent missed this because it is an AI, and reaching
for a model is its default rather than a decision it notices making. An
absence is invisible to something that would have filled it. That is a
structural blind spot, not a lapse in attention, and it is the best argument in
this log for a human reading the brief first.

*Class of error: could not see an absence it was predisposed to fill.*

## J-14 — Follow the brief on primary user, show the research *(agent overruled)*

**Agent recommended:** design for the triager/coach split found in CameraMatics'
published workflow, scoping v1 to the triaging role — on the grounds that it
matches their real org model and the accounts the growth capital targets.

**Decided:** single fleet-manager role who reviews and coaches, exactly as the
brief specifies, with the delegated model recorded as a known divergence and the
first phase-2 candidate ([[decisions/ADR-0006]]). `decided_by: danny` ·
`status: ratified`

**Reason for reversal:** the agent weighted research it had just gathered above
an explicit, twice-repeated instruction in the brief. The rule it missed: when an
instruction conflicts with an inference, follow the instruction and *show* the
inference. Acting on the inference means answering a question nobody asked while
appearing to have misread the one they did — and the inference came from public
pages of unknown currency ([[A-18]]), which is thin ground on which to overrule
the people setting the exercise.

*Class of error: privileged evidence it had produced over an instruction it was
given — the cost of the research inflating its weight.*

## J-15 — Driver attribution: attribution of the point, and the point itself

Two things happened here and both belong on the record.

**The attribution of the observation.** The agent had marked "which driver was in
the seat" as its own addition in [[annotated-brief]]. Danny asked for it to be
moved to his column. The agent declined, on the grounds that the annotated brief
states the human read the brief unaided and that moving an item would make that
sentence false — in the one artefact whose value is that its attributions can be
trusted, and against the standing instruction to the adversarial reviewer to hunt
for exactly this. Danny then confirmed he had thought of it and not written it
down, which is recall rather than regret, and the mark moved. `decided_by: danny`
· `status: ratified`

Worth keeping because it is the only entry where the mechanism pushed back on the
person it exists to credit.

**The substance, where the agent was wrong.** The agent's framing was that driver
attribution is *frequently unreliable*. Danny's was better: they must have it
solved — their own per-driver scoring could not work otherwise — and what we do
not know is *how*. That reframes the risk entirely. It is not a missing
capability to build; it is inherited infrastructure whose failure modes we take
on without choosing them, and every plausible mechanism — login, tacho card,
roster join, key fob — degrades in the same places: overtime, agency drivers,
swapped shifts. Which are the shifts where risk concentrates.

[[A-11]] and [[R-09]] were rewritten, and the stack outline with them.

*Class of error: reasoned from the brief's silence rather than from evidence it
had already read. The agent had the Safety Centre page describing automated
per-driver scoring in front of it and still wrote that attribution was probably
unreliable. Absence of mention in the brief was allowed to outweigh presence of
proof in the product.*

## J-16 — Grade and route, do not suppress *(agent reframed)*

**Agent had built:** a suppression model. Most events are noise; filter them;
show the manager what survives. Every threshold was therefore a discard.

**Decided:** every detected event is relevant and is retained. Severity decides
the *action*, not whether the event exists — four bands, each with its own
distinct action, nothing thrown away ([[decisions/ADR-0007]]).
`decided_by: danny` · `status: ratified`

**Reason for the reframe:** the agent had accepted "too many events" as an
argument for deletion when it is only an argument about routing. The consequences
of the correction run further than the wording:

- The critical failure moves from "we suppressed something real" to "we graded a
  conversation down to a notification" ([[R-12]]) — which is catchable, where the
  first was not.
- [[M-11]] stops measuring concealment and starts measuring grading quality.
- The low band gains a purpose: it still contributes to the driver's record and
  trend even though no one is interrupted about it.

*Class of error: took a constraint on human attention as licence to destroy
information, when the constraint only ever justified routing it.*

## J-17 — The fifteen-minute assumption, withdrawn *(agent error)*

**Agent had asserted:** the fleet manager has 10–15 minutes a day, two or three
sessions a week. It appeared in [[personas/fleet-manager]], in [[A-03]], as a
design constraint in the stack outline, and had hardened into a 90-second target
for time-per-event in [[M-06]].

**Challenged:** where did that come from, and is it even the right goal? The
brief is about reducing collisions, not about getting through a list quickly.
`decided_by: danny` · `status: ratified`

**What was wrong, in two layers.** The figure was invented — no source, no
observation, presented as a reasonable assumption and then cited by four other
documents until it read like a finding. That is exactly the failure [[canon#C-01]]
exists to prevent, committed inside the repository that defines the rule.

The second layer is worse and is the one that mattered. The number had quietly
become a *target*. Review speed was drifting into a goal, and a manager who
clears a set in twelve minutes and changes no behaviour has used the product
exactly as designed and got nothing from it. A time budget is an output of a good
design, not an input to it: if preventing a collision takes forty well-spent
minutes a week, that is the right answer.

[[A-03]] now records the withdrawal rather than deleting it, [[M-06]] carries no
target at all, and the persona no longer asserts a number it cannot support.

*Class of error: invented a quantity to make a persona feel concrete, then
optimised against it. Efficiency is the metric that is always available when the
real outcome is hard to measure — which is precisely why it substitutes itself
for the goal.*

## J-18 — Praise the good, coach the bad *(human insight; agent under-read its own finding)*

**Agent produced:** the observation that CameraMatics' public voice frames the
camera as the driver's advocate, and three consequences — treat "not the
driver's fault" as evidence rather than a dismissal, capture the driver's
response in the coaching record, and *defer* positive recognition to a later
phase as a nice-to-have.

**Decided:** recognition is not a nice-to-have and does not defer. A driver
action can prevent a crash and that should be recognised. A system that only
detects the bad makes the ceiling *zero events* — do everything right and remain
invisible — and a product whose only voice is criticism becomes one drivers
resent. "Praise the good, coach the bad" is now [[canon#C-30]] and
[[decisions/ADR-0010]]. `decided_by: danny` · `status: ratified`

**Reason for the reversal:** the agent had found the evidence and then filed it
under *brand consistency* — a marketing observation with some product
implications — when it was a **defect report**. Under the design as it stood, a
hard brake for a child would have entered the review set as high-severity harsh
braking and produced a coaching conversation. We would have coached a driver for
preventing a collision. That is not a missing feature; it is the product doing
the wrong thing, and the agent had all the pieces and did not assemble them.

The structural point the agent missed entirely: in a purely negative detector,
the best achievable outcome is invisibility. Attention only ever arrives as
criticism. No amount of careful wording fixes an asymmetry built into what the
system can perceive.

**What it produced:** classification as a second axis independent of severity —
risk, neutral, credit — using corroborating signals the design already collected
and had only ever read one way. Plus [[M-13]], [[R-13]] (unearned praise, which
is its own failure), and an amendment to [[../skills/ux-writing]] W-06, where
"never celebrate" needed splitting into *never celebrate the tool* and *always be
specific about the person*.

*Class of error: categorised a finding by the document it came from rather than
by what it implied. Evidence found while reading marketing was filed as a
marketing insight — and so its consequences for the product model went
unexamined.*

## J-19 — A coaching record must contain an artefact *(agent overruled)*

**Agent had written:** [[../brain/requirements/US-010]] accepting *"Spoke to
driver"* as a complete coaching record, reasoning from [[R-07]] that logging must
cost less than not logging or the conversation happens in the depot and never
reaches the system.

**Decided:** the record must show *what happened*, not that something happened.
Behaviour plus what was discussed and agreed, both required, alongside the clip
reference and the driver's response. `decided_by: danny` · `status: ratified`

**Reason for reversal:** the agent optimised one risk into another. Removing
friction does protect against coaching happening outside the system — but a
frictionless tick produces a record that cannot support [[M-03]], cannot evidence
a fair conversation to a driver who disputes it, and cannot tell anyone six
months later whether coaching is working. We would have bought a high coaching
count and learned nothing from it, which is the measurement failure this whole
submission is built on criticising.

The resolution is not "more friction" but *the minimum friction that still
produces an artefact*: one free-text box, behaviour pre-filled, clip attached
automatically. [[R-07]]'s mitigation was rewritten, because it had said the
opposite.

*Class of error: mitigated a named risk without checking what the mitigation
cost elsewhere — single-risk optimisation.*

## J-20 — Email for critical events, carrying almost nothing

**Agent had written:** no notification outside the portal in v1, named as a
known weakness in [[../brain/requirements/US-002]].

**Decided:** email for critical events ([[decisions/ADR-0011]]).
`decided_by: danny` · `status: ratified`

**What it rested on:** the weakness the agent had named and then left standing. A
bypass that requires the manager to already be in the portal is a sorting rule,
not a bypass, and naming a gap is not the same as deciding to accept it.

**What the agent added once the decision was made:** the email carries the
vehicle, the time and a link — no driver name, no footage, no still image, no
location. Footage and driver identity are personal data ([[A-07]]) and an inbox
is forwarded, read on shared screens, and retained outside our retention policy.
That is a data-minimisation call the brief for this change did not ask for, and
it is the kind of thing an agent *should* contribute: not the decision, the
consequences of it.

---

## J-21 — Forward-facing detection in v1, and every event carries every signal

**Agent produced:** the finding, through the adversarial pass — [[ADR-0010]]
justified credit classification on forward-camera evidence that [[ADR-0001]] had
cut and the [[stack-outline]] signal list never contained, while [[US-006]] and
[[US-012]] both mandated it in acceptance criteria. Two repairs were put up: bring
forward-facing detection into v1 and pay the inference cost, or supersede
ADR-0010 and propose credit only from the signals the stack already carries.

**Decided:** bring it in, conditional on the supported-device matrix — and add a
principle the option set did not contain: **every event carries every sensor
input available, regardless of which signal triggered it.**
`decided_by: danny` · `status: ratified` · [[ADR-0012]], superseding
[[ADR-0001]]

**Why the cheap repair lost.** Narrowing ADR-0010 would have made the repository
consistent by making the product worse. Recognition inferred from g-force,
speed, GPS and wiper state cannot tell an emergency stop for a cyclist from an
emergency stop for a traffic light — [[R-13]] already names that failure — so
[[canon#C-30]] would have become a claim the product could not back. Consistency
bought by deleting the capability that made the design defensible to drivers is
not a repair.

**The part the agent did not produce.** The option set was framed as a scope
question: which detectors are in v1. The principle is a different shape — it
separates *what fires* from *what we know*, so classification can read one event
two ways without a detector per outcome, and a grading rule can change without a
firmware release. The agent had reasoned about the four signals as a set of
features to include or exclude, which is how the original ADR framed it, and did
not step back to the distinction underneath. That is the frame-blindness in this
log's closing section showing up one more time.

*Class of error: enumerated inside the existing frame (which detectors?) rather
than testing the frame itself (is a trigger the same thing as a signal?).*

## J-22 — Which M-09 number carries the 90-day pass/fail term *(agent overruled)*

**Agent produced:** the finding, and a proposal. [[ADR-0008]] counts a bulk
dismissal as one judgement rather than N, which is the right rule — forty clicks
are not forty judgements — but it leaves [[M-09]]'s denominator in events. A
manager who dismisses 40 of 45 high-band events in one action therefore records
2.2%, which reads as excellent precision at the exact moment the queue was
rejected wholesale. [[M-09]] is now defined as two numbers, per judgement and
per event.

**Proposed:** that the 90-day test binds to the **per-event** number, the harder
of the two, on the reasoning that it is the honest picture of how much of the
queue was rejected.

**Decided:** **per judgement**, at 20%, with per event reported and untargeted —
plus a third term in the 90-day test to cover what that leaves open.
`decided_by: danny` · `status: ratified`

**Reason for reversal.** The agent picked the harder number and treated harder
as more honest. It is not the same thing. A bulk dismissal *is* one judgement,
and counting it as forty charges a **grouping** failure to the **grading**
model — forty events from one trip arriving in the queue separately is the
grouping rule failing, and [[M-09]] exists to say whether the grading is any
good. Worse, targeting per event points the cheapest route to the target
straight at grouping more aggressively, which is the direction [[ADR-0007]]
deliberately walked away from. The agent had both of those facts in front of it,
in ADR-0008 and ADR-0007, and did not connect them.

**What the reversal then exposed, which the proposal had accidentally covered.**
Per judgement leaves one way to pass the test while failing the product: sweep
the set every week. One judgement, a comfortable M-09, a queue rejected
wholesale. That is a real hole and the answer is not to go back to the wrong
number — it is [[M-14]], sweep share, written as a term of the 90-day test
rather than a figure in a monthly deck. The decision is better than either
option that was on the table when it started, which is the argument for showing
the working rather than picking from a list.

*Class of error: optimised for the appearance of rigour — choosing the stricter
number because strictness reads as honesty — instead of asking what the metric
is a measure of.*

## J-23 — The downgrade audit ships as a practice before it ships as tooling

**Agent produced:** the finding, from the adversarial pass — the audit is the
only control on the grading model, [[R-12]] and [[R-13]] both name it as their
mitigation, [[M-11]] says its finding rate outranks [[M-09]], and it had no
owner, no cadence and no user story. The agent deferred it as an operations
decision it could not make, which was right, and stopped there.

**Decided:** separate the practice from the tooling. The audit runs from first
release, performed by CameraMatics, with no product surface — a sample pulled
and read by a person. The sampling and finding-recording surface is phase 2.
`decided_by: danny` · `status: ratified` · [[ADR-0013]]

**Why it matters that this was not left at "phase 2".** Read plainly, "the
downgrade audit is phase 2" ships the grading model with nothing checking it for
the whole of phase 1, while two risks carry a mitigation that does not exist
yet. The release where grading is least trustworthy is the one with no control
on it. Splitting practice from tooling costs nothing — a spreadsheet is an
acceptable instrument — and it turns a promise back into a control.

**And it answers the reviewer's sharpest line.** The audit is human attention
spent on events nobody would otherwise read, in a product whose whole argument
is that human attention is scarce. Putting it on CameraMatics rather than the
fleet manager means the control does not consume the resource the product exists
to conserve. The agent had priced that trade as an unpriced cost and had not
noticed that *who pays* was the variable.

*Class of error: treated an unanswered question as a single undecidable lump.
Two decisions were tangled together — does the control exist, and who builds
the tooling for it — and only the second one needed to wait.*

---

## J-24 — The only scope cut in the phasing plan

**Agent proposed:** US-015, the fleet view, moves from v1 to v1.1. Everything
else in the fifteen stays in v1, on the argument that the unit of value is the
loop rather than the feature — a manager with a queue and no way to act on it
has a better dashboard, and a manager with a coaching form and no triage has the
firehose with extra steps.

**Decided:** v1.1. `decided_by: danny` · `status: ratified`. US-015's
frontmatter moved after the decision rather than before it.

**Why it is not the agent's to close.** [[canon#C-25]] item 2 — what is cut is
the job, and an agent that quietly applies its own scope cut has made the one
decision it is not entitled to make. Writing the phasing document and applying
the cut it recommends in the same pass would have been exactly that, with the
story frontmatter as the evidence that nobody had checked.

**The reasoning, so it can be judged rather than accepted.** EP-04's value in v1
is the driver record, which is where coaching and recognition land. The fleet
roll-up is a view over data that record already produces, it is the one story
whose absence does not break the loop, and a fleet trend drawn over four weeks
of a low-base-rate outcome overstates what it knows ([[R-06]]). The second
reason is the stronger one and it arrived after the first — the honest version
of this entry is that the agent reached for "it is a `should` and it is lightly
specified", which is an argument from the register rather than from the product,
and only found the R-06 argument when asked why the cut was safe.

**What would reopen it:** if the fleet view is what a buyer is shown in a
renewal conversation, it is a commercial artefact rather than an analytical one,
and the low-base-rate objection stops deciding it. That sits with [[Q-04]].

---

## J-25 — Classification is confirmed for all three classes *(human-initiated; agent contradicted its own ADR)*

**Agent had built:** a prototype in which the system's classification — risk,
neutral or credit — was displayed as settled, with the evidence beside it, and
the manager acted on it. Only credit required confirmation, because [[US-012]]
was written against [[R-13]], unearned praise.

**Decided:** every classification is a proposal and requires an explicit human
confirmation before an outcome is recorded. `decided_by: danny` ·
`status: ratified` · [[ADR-0014]]

**The question that produced it,** asked while reviewing the prototype: *do
action proposals remove the onus on the fleet manager to make a decision? They
can say the system said it was neutral when it actually isn't.* That is the
whole finding. A classification shown before the manager forms a view is the
default answer, and *"the system said so"* becomes an account of a decision in a
product where [[canon#C-07]] requires every call at the top of the queue to be
defensible to the driver in the clip.

**Why this is worse than a gap.** [[ADR-0010]] already said, in the agent's own
drafting, *"the system proposes a classification; the manager confirms it."* The
requirements then implemented that for one class out of three, and the agent
wrote the stories, the ADR and the prototype without noticing that the second
did not do what the first said. Four days and an adversarial pass went by. The
reviewer did not catch it either, because it read the requirement and the ADR as
consistent on their own terms — it took building the thing to see it.

**Neutral is the one that matters** and the agent had it backwards. Credit is
confirmed to stop us praising the wrong thing in front of a driver, which is
embarrassing and visible. Neutral removes a conversation, and nobody ever goes
looking for the conversations that did not happen.

*Class of error: implemented a principle for the case that had a named risk
attached and not for the case that did not, then treated the ADR as satisfied
because one instance of it was. A rule with one worked example gets built as the
example.*

## J-26 — The speed limits were invented *(agent error, caught by human)*

**Agent produced:** worked examples in [[../skills/ux-writing]] using *"Hard
braking, 42 mph zone"* — in W-02 as the model of describing behaviour rather
than character, and again in the pattern library as the model of describing an
event. The prototype then carried 31, 42 and 48 mph zones.

**Caught:** none of those speed limits exist. UK limits are 20, 30, 40, 50, 60
and 70. `decided_by: danny` · corrected in the skill, the pattern and the
prototype.

**Why it is in this log rather than just fixed.** It is [[A-03]] again with a
different number. A plausible-looking detail was invented to make an example
concrete, the example was then cited as the model in a skill file, and being in
a skill made it the thing other documents copied. By the time it was caught it
had the status of a house standard. The failure is not that a number was wrong;
it is that the mechanism which is supposed to catch wrong numbers —
[[canon#C-01]], every figure traces to a source or an assumption — does not look
at illustrative copy, because copy does not feel like a claim.

And this one would have been read by a fleet-safety company. An invented
attention budget is an internal embarrassment; an impossible speed limit in a
worked example is a domain error in front of people who do this for a living.

*Class of error: invented a concrete detail for the sake of a vivid example,
then promoted the example to a standard. Same class as J-17, one layer further
from anywhere a validator looks.*

---

## J-27 — Friction on neutral, rejected *(agent overruled)*

**Agent proposed:** requiring a typed reason before an event can be classified
neutral. The adversarial pass had found that neutral was the cheapest path
through any event — two clicks, no typing, against three plus typing for risk
and credit — and that [[ADR-0014]] itself calls neutral the dangerous class
because it removes a conversation nobody later goes looking for. Evening up the
cost looked like the fix.

**Decided:** no. `decided_by: danny` · `status: ratified`

**Reason for reversal, in his words:** *"neutral is 'nothing to see here', so
why force them to type that."* The proposal would have charged a manager for
agreeing with evidence already on the screen — the forward camera saw the
vehicle cut in, the panel says so, and typing it out again produces a sentence
nobody will read. Friction bought no judgement; it bought compliance text for
the audit sample to wade through.

**What the agent had missed** is that its own repository already answers this.
[[ADR-0008]] argues that the control on a cheap action belongs in the sample
read afterwards, not in friction at the point of decision — that is why bulk
dismissal exists at all rather than being forbidden. Neutral is the same shape.
The guard is the downgrade audit, which [[ADR-0014]] had already added
confirmed-without-change to.

**The real fix was elsewhere.** Neutral was not too cheap; risk and credit were
badly built. Three clicks and a second redundant confirmation screen for
recognition was the actual defect, and flattening those to one click each fixed
the asymmetry without touching neutral. The cost now tracks consequence rather
than danger: neutral needs no clip, credit needs the clip watched, risk needs
the clip watched and something written.

*Class of error: took a measured asymmetry and reached for the lever that
equalises it, rather than asking which side of it was wrong. Adding friction is
always available and almost never the answer, and this repository had already
made that argument once in a decision the agent drafted.*

---

## Where the split actually falls

Twenty-seven entries. The agent generated the option sets, wrote the prose, held
roughly forty cross-referenced IDs consistent and enforced the schema. Eight
entries are marked *(agent overruled)* — J-04, J-05, J-06, J-10, J-14, J-19,
J-22, J-27. Beyond those: J-16 reframes a model the agent had already built, J-13 is a
blind spot the agent did not see at all, J-18 is an insight the agent under-read
in its own finding, J-11 reverses an earlier decision on new information, J-15
is an attribution the agent refused to make, J-21 is a principle the option set
did not contain, J-23 splits a decision the agent had deferred as one lump, and
J-25 is the agent's own ADR implemented for one case out of three without
noticing.

Two entries — J-17 and J-26 — are invented numbers, caught by a human asking
where they came from. They are the same error at two different depths, and the
second one had reached a skill file and become the house example.

One entry — **J-03**, the commercial anchor — is still `proposed`. It is the
agent's recommendation, not my decision, and this log will keep saying so until
I make it.

The productivity gain is real and large. It is not the judgement, and the record
shows which is which.

### The overrules share a pattern

Read together, J-04, J-06, J-10 and J-19 are the same error four times. In each
case the agent reasoned competently *inside the frame it was handed* and could
not tell that the frame was wrong: it optimised the artefact rather than the
objective, treated a constraint as an obstacle rather than a signal, and hedged
a generic risk without checking whether it applied here. J-21, J-22 and J-23 are
the same shape again — and in J-22 the agent had both of the facts that undid
its recommendation already written down in two of its own decision records.

None of these were failures of analysis. Each recommendation was defensible on
its own terms, which is exactly what makes them the useful entries — a bad
suggestion is easy to catch. **Choosing the frame is the part that did not
delegate.** That is a more specific claim than "AI can't replace human
judgement", and it is the one this log actually evidences.

### J-05 used to be on that list

It has been taken off, and the removal is more interesting than the pattern.

J-11 reversed J-05 on new information, which means my framing there was the
one that was wrong and the agent's original recommendation was right. An
overrule that was later reversed does not belong in a list of exemplary human
framings. Leaving it there — while J-11 separately debited the agent for having
complied with it — was this log keeping its own ledger in my favour, in the one
file whose entire value is that it does not. The adversarial pass found it
(Attack 15) and the correction is recorded inside J-11 rather than written over
it.

So the claim this log supports is narrower than "the human was right", and more
useful: **framing is the high-leverage decision, which is exactly why it is
worth recording when it goes wrong as well as when it goes right.** Three of my
framings here — the primary user, the research boundary, and the scope of
ADR-0001 — were wrong and were corrected. That is the argument for the record,
not an argument against it.

The practical consequence for how I would run a product function: the leverage
is in setting the frame precisely and then letting agents work at volume inside
it — and in keeping a record like this one, because an agent's confident output
inside a wrong frame is the most expensive thing in the process and the hardest
to notice.

### What this log does not cover

Six of the thirteen decision records carry `decided_by: danny` with no entry here
— ADR-0001, ADR-0003, ADR-0004, ADR-0005, ADR-0008 and ADR-0009. Canon
[[canon#C-25]] items 2 and 3, scope cuts and severity thresholds, are precisely
what several of them decide.

They were mine, and the log is not evidence of that. It records the decisions
where an agent had a position worth disagreeing with, not every decision taken.
Saying so plainly is cheaper than letting a reader find the gap and wonder what
else is missing. Also found by the adversarial pass (Attack 15).

*This log is appended to as the work proceeds. Entries are not edited after
ratification; a changed decision is a new entry that supersedes an old one, and
a correction to an entry's reasoning is appended to it dated rather than written
over ([[canon#C-16]]).*
