---
id: JLOG
title: Judgement log
status: active
owner: danny
links: [[canon]] [[../AGENTS]]
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
[[../AGENTS]] requires a handover to state whether the adversarial pass actually
ran.

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

---

## Where the split actually falls

On the evidence above, across eight decisions: the agent generated the option
sets, wrote the prose, held the cross-references consistent and enforced the
schema. Every framing choice, every scope cut, and three outright reversals of
the agent's own recommendation came from the human — and the reversals were the
consequential ones. The productivity gain is real and large. It is not the
judgement, and the record shows which is which.

### The three reversals share a pattern

Read together, J-04, J-05 and J-06 are the same error three times. In each case
the agent reasoned competently *inside the frame it was handed* and could not
tell that the frame was wrong: it optimised the artefact rather than the
objective, treated a constraint as an obstacle rather than a signal, and hedged
a generic risk without checking whether it applied here.

None of these were failures of analysis. Each recommendation was defensible on
its own terms, which is exactly what makes them the useful entries — a bad
suggestion is easy to catch. **Choosing the frame is the part that did not
delegate.** That is a more specific claim than "AI can't replace human
judgement", and it is the one this log actually evidences.

The practical consequence for how I would run a product function: the leverage
is in setting the frame precisely and then letting agents work at volume inside
it — and in keeping a record like this one, because an agent's confident output
inside a wrong frame is the most expensive thing in the process and the hardest
to notice.

*This log is appended to as the work proceeds. Entries are not edited after
ratification; a changed decision is a new entry that supersedes an old one
([[canon#C-16]]).*
