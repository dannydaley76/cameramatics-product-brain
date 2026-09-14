---
id: REV-002
title: Adversarial review — clickable prototype
date: 2026-09-14
reviewer: adversarial agent (fresh context, never saw the build)
target: prototype/index.html, checked against brain/requirements/, skills/ux-writing.md, brain/canon.md, brain/registers/metrics.yaml and ADR-0002/0005/0007/0008/0009/0010/0012/0013/0014
mode: refute
method: driven in Chromium — 13 scripted runs, DOM enumeration, computed-style and bounding-box measurement, 12 screenshots
status: dispositioned 2026-09-14 by danny
---

# Adversarial review — clickable prototype (`prototype/index.html`)

**Not yet.** The prototype fabricates a driver's recognition record from a hardcoded string, accepts the exact coaching text US-010 exists to forbid, and manufactures five human confirmations nobody made inside its own headline demo — three C-02 violations in the artefact whose stated job is proving the repo's claims are checkable. What would change it: fix findings 1–4 (all are a few lines of JavaScript), correct the M-09 population, and either implement or stop claiming US-007's offline state, US-008 and US-013.

The load-bearing claim I attacked is not the one the brief named. It is not ADR-0014's anchoring claim; it is the sentence in the README — *"Grey boxes, real behaviour — open it and try the bulk dismissal"*. Everything here rests on the prototype being **evidence** rather than illustration. Where it is real it is very good. Where it fakes, it fakes in the exact places the repo's ethics live, which is worse than a wireframe would have been, because a wireframe makes no claim.

---

## Findings, ranked by consequence

### 1. The recognition record is a hardcoded string. It will write a fabricated act onto the wrong driver.
**Claim:** US-012 — recognition "names the act, the place and the time and attaches the clip"; W-06 — recognition copy is "specific, evidenced and about the act".

**Evidence.** `doRecognise()` and `viewRecognise()` both emit a literal, event-independent string. I classified **E-150** (Joe Mensah, Saturday 13 September 08:05, Farnham Road, forward camera: *"Vehicle cutting in from the left, 1.1 s before"*) as credit and confirmed. The screen headed **"What will be recorded"** said:

> Tuesday 14:06, Mill Lane. Stopped in time for a cyclist who came out of the junction.
> Confirmed by Sam Okafor · clip attached

Wrong day, wrong place, wrong road user, wrong act — under a named human's confirmation, with "clip attached", onto a permanent driver record. Canon C-07 says the top of the queue must be defensible to the driver in the clip; W-01 says every string about a driver must be defensible to that driver. Joe Mensah is being credited for something that did not happen.

**Why it is wrong:** this is C-02 ("no invented evidence, ever") inside the artefact the repo offers as proof it does not invent evidence. It is also the exact failure R-13 names — unearned praise — arriving through a code path rather than a grading error.
**Disposition: Survives.**

### 2. "Spoke to driver" saves, and renders as a complete coaching record.
**Claim:** US-010 — *"'Spoke to driver' is explicitly **not** an acceptable complete record — it is the tick-box this requirement exists to prevent."*

**Evidence.** `watchCoach` gates only on `value.trim()` being non-empty. I typed `x` — Save enabled. I typed `Spoke to driver` — saved, and Marek Nowak's record now reads:

> Hard braking · today
> Spoke to driver
> Clip attached · recorded by Sam Okafor

The prototype cites US-010 in its footer on that very screen. It implements the named anti-pattern verbatim.

**Also:** US-010 requires *two* fields. I cleared the Behaviour field entirely and the record still saved (`doCoach` silently falls back to `e.behaviour`). One of the two required fields is not required.
**Disposition: Survives.**

### 3. Bulk dismissal manufactures five human confirmations, and poisons the one counter ADR-0014 created.
**Claim:** ADR-0014 — *"no outcome is recorded until a human confirms or changes it — risk, neutral and credit alike."* The prototype's own event screen: *"It is not recorded until you say so."*

**Evidence.** `doBulk()`:
```js
if (!x.klass) { x.klass = x.proposed; x.matchedProposal = true; STATE.classDecisions.push({ matched: true }); }
```
From a clean load I opened the group and dismissed all five. The notes panel then read **"M-11 confirmed without change — 5 of 5"**. No human confirmed anything. The system confirmed itself five times and reported it as manager agreement. In my full walkthrough the final reading was **11 of 11** when 6 confirmations were human — an 83% overstatement, in the direction that flatters the grading model.

ADR-0014 consequence 2 says the confirm-without-change population is what the downgrade audit samples. The prototype seeds that population with machine output.

**Also:** `doBulk` records `withoutFootage: true` for all five, though all five clips are `"ready"` — corrupting the with/without-footage split US-009 requires M-09 to be readable by.
**Disposition: Survives.**

### 4. "Change the classification" silently corrupts the confirm-without-change counter.
**Evidence.** `unclassify()` does `STATE.classDecisions.pop()` — it removes the *most recent* entry, not this event's. Driven sequence:

| step | counter shows | truth |
|---|---|---|
| confirm E-121 as risk (matches proposal) | 1 of 1 | 1 of 1 |
| change E-140 to credit (proposal was risk) | 1 of 2 | 1 of 2 |
| reopen E-121, click "Change the classification" | 1 of 1 | 0 of 1 |
| re-confirm E-121 as risk | **2 of 2** | **1 of 2** |

An ordinary correction — the behaviour ADR-0014 exists to encourage — erases someone else's disagreement and reports 100% agreement with the model. Again the error runs toward flattering the grading model.
**Disposition: Survives.**

### 5. ADR-0014's anchoring claim is not true as built. The proposal is the biggest target on the screen, and confirming is still two actions.
**Claim, on screen:** *"Nothing is preselected. Confirming the system's proposal and changing it are the same amount of work."*

**Evidence (measured in the browser, not read from source).** Whichever class is proposed, that button carries the sub-label "the system's proposal" and is therefore **57px tall against 39px** for the other two — 46% taller, roughly 1.4–1.6× the click area, and it is the only button in the row that is visually distinct. Confirmed across all three cases (E-121 risk-proposed, E-127 credit-proposed, E-150 neutral-proposed). "Nothing is preselected" is true; "the same amount of work" is not, under any reading of Fitts. The order is also fixed — Risk, Neutral, Credit — never varied.

There is a vestige in the source confirming the author knew this was a styling question and left it unresolved: `'<button class="act' + (e.proposed === "risk" ? "" : "") + '"'` — a ternary with two empty branches.

**The more serious half.** ADR-0014 bounds its own C-05 cost with: *"Confirming and acting are **one action, not two**: the classification the manager lands on determines which outcome is offered, so confirming costs a choice rather than an extra click."* The prototype makes it two: click a classification, the screen re-renders into "What you decided", then click an outcome. The mitigation the ADR relies on to justify adding a choice to every event is not implemented.

**And the costs are not symmetric downstream.** Measured click-and-type cost from the event screen:
- **Neutral** → "Record on Joe's record and close" (styled `primary`, bold). **2 clicks, no typing, done.**
- **Credit** → confirm screen → confirm. 3 clicks, plus the clip must be played.
- **Risk** → coaching form (free text required, clip must be played) or dismissal (free text required). 3 clicks plus typing.

The cheapest, least-friction, visually heaviest path through any event is **Neutral** — the classification ADR-0014 singles out as the dangerous one: *"it is the one that **removes** a conversation, and nobody goes looking for conversations that did not happen."* The prototype made the dangerous outcome the cheap one.
**Disposition: Survives.** The prototype has not removed the default; it has relabelled it and made the escape route from a conversation the path of least resistance.

### 6. US-007's offline footage state — the flagship W-04 example in the whole repo — does not exist.
**Evidence.** `grep -i offline index.html` returns **zero matches**. The only footage states are `ready`, `fetching`, `expired`. The criterion quoting *"Footage not available yet. This vehicle has been offline since {time} and will upload when it reconnects. You can still dismiss this event."* is unimplemented, and that string is the worked example in `skills/ux-writing.md` under both "Absence of footage" and "In acceptance criteria". (An earlier build had it. It was removed, not never-built.)

**And the fetching string is wrong.** US-007 quotes: *"Footage is on its way. This page will update when it arrives. **You can still dismiss this event.**"* E-133 renders the first two sentences and then two paragraphs of something else. The third clause — which US-007 says in terms *"is what makes this an absence state rather than an error message"* — is absent.
**Disposition: Survives.**

### 7. The fetching copy contradicts ADR-0002 and ADR-0007 on the same screen it cites them.
**Evidence.** E-133 is a **high-band** event. ADR-0007's band table: High → footage **Pushed**. ADR-0002: *"Footage is pushed eagerly for events the device flags high-severity."* The panel says:

> The camera keeps everything for 10 days and only sends a clip when an event is graded high enough to need one, so **this was requested rather than pushed**.

A high-band event whose clip was fetched on demand is the medium/low behaviour. Either the fixture is in the wrong band or the copy describes a different architecture from the one the repo decided.

**Compounding it,** the same screen stacks two contradictory hints: *"Watch the clip before recording a conversation."* directly above *"There is no clip to watch yet, so this can be dismissed but not coached."* The first instructs an action the second declares impossible — W-04's failure mode exactly.
**Disposition: Survives.**

### 8. M-09 is computed over the wrong population, and the error runs toward passing.
**Claim:** the notes panel is *"what the platform emits as you work, so the metric definitions can be checked against the behaviour."*

**Evidence.** `metrics.yaml` M-09 is defined on **high-severity** events, both numbers. The prototype's `decisions` and `resolved` include the **critical** event E-104 and any **last-week closed** event you action. From my full walkthrough to empty:

| readout | prototype | per metrics.yaml (high band only) |
|---|---|---|
| M-09 per judgement | **57.1%** (4 of 7) | **66.7%** (4 of 6) |
| M-09 per event | **72.7%** (8 of 11) | **80%** (8 of 10) |

The per-judgement number carries the **pass/fail term** (`< 20%`). The prototype's arithmetic understates it. Separately, I dismissed E-088 — an event from the week of 1–7 September — and watched it land in this week's M-09 and M-14 denominators; M-14 is defined *"per account per week"*.

There is also a definitional hole the prototype papers over silently: *"share of dismissal decisions taken on high-severity events"* does not determine whether the denominator is all terminal decisions or all dismissal decisions. The prototype picks one, presents it as what the platform emits, and does not say it chose.
**Disposition: Survives.**

### 9. The retention window contradicts itself between two cards one day apart.
**Evidence.** The closed set states a **10-day** window. E-093 (Wednesday **3** September) → *"Footage no longer available — outside the 10-day window."* E-088 (Tuesday **2** September — a day **older**) → *"Footage still available"*, and opening it offers "Clip ready. 6 seconds either side" and a working Play clip.

This holds whatever date you take as "today": a strictly older event cannot be inside a fixed retention window that a newer one has fallen out of. W-07 and C-01.
**Disposition: Survives.**

### 10. ADR-0012's "every event carries every signal" is demonstrated with the word "recorded", and one signal is a capability ADR-0012 explicitly cut.
**Evidence, part A.** Open any closed-set event. Under the heading *"Every event carries every signal the device had"*, four of seven rows read literally **"recorded"**, and the speed row reads **"— in a 30 mph zone limit"** (a string-splitting artefact). The panel asserts the claim while showing its absence. This is the specific thing a prototype is supposed to beat a wireframe at.

**Evidence, part B.** E-133's forward-camera signal reads *"Road clear, no vehicle within 60 m"*. ADR-0012 rejected exactly this: *"Measuring following distance needs per-install camera calibration… Detecting that a vehicle or a cyclist **was there** is a different problem from measuring **how far away it was**. Only the first is in v1."* A 60-metre range figure is the second. The prototype invents a v1 capability its own cited ADR spent a paragraph excluding.

Lesser: *"Eyes on road"* appears on every event as a driver-facing signal. `stack-outline.md` names phone-in-hand distraction as the v1 driver-facing inference; gaze/attention state is not listed, and fatigue is explicitly out.
**Disposition: Survives** on part B and the "recorded" placeholders. **Survives narrowed** on "Eyes on road".

### 11. A device with no forward camera nonetheless serves road-facing footage, and the footage falsifies the grading reason beside it.
**Evidence.** E-140 (Alan Reid, RV18 EWA) signals: *"Forward camera — Not fitted on this device generation"*. Its classification reason: *"Proposed as risk — with low confidence. This device has no forward camera, so nothing rules out a hazard we cannot see."* Directly above both, the footage panel offers *"Road-facing camera / Clip ready / Play clip"*, and after playing: *"Channels: road-facing (shown), driver-facing."*

If the manager can watch road-facing footage, a hazard ahead is precisely what they can rule out — the stated basis for the low-confidence risk proposal is contradicted by the control sitting above it. Either the fixture means "no forward *inference*" and the copy is wrong, or the fixture is incoherent. On a screen whose job is defending a grading to a driver (C-07), this is the sentence the driver would pick up.
**Disposition: Survives.**

### 12. "Ranked by severity, highest first" is false. The order is the fixture array.
**Evidence.** The set header reads *"11 to go · ranked by severity, highest first"*. US-001: *"listed newest-risk-first by severity score"*. Card order as rendered, with the force figure each card's own signals panel gives:

1. E-104 critical (1.14 g) · 2. E-121 **0.71 g** · 3. E-127 **0.83 g** · 4. E-133 (phone) · 5. E-140 **0.52 g** · 6. E-150 **0.76 g** · 7. group (0.62–0.74 g, Friday)

0.83 sits below 0.71; 0.52 sits above 0.76; Friday's group sits below Saturday. The order is chronological within the fixture array, and not even that at the end. There is no severity score anywhere in the model. The one claim the review set makes about itself is the one the review set does not do.
**Disposition: Survives.**

### 13. Three "Implements" attributions are false, and two stories are absent without being named as absent.
The footer of every screen claims the requirements it implements. Checked against the DOM:

- **US-013** is claimed by the medium-band screen. `grep` for `Send to driver` → **0 matches**. Neither the action nor the quoted confirmation string *"Recorded. There is no driver app yet, so pass this on when you next speak."* exists. The screen implements none of US-013's five criteria while citing it.
- **US-004** is claimed by the set and the group screen. Its AC quotes the button label *"Dismiss {n} events with a reason"*. The rendered labels are the card ("Hard braking, one trip") and, inside, "Dismiss all 5 with that reason". The quoted string appears nowhere. US-004's last criterion (no group offered for unrelated events) is untestable — there is no multi-select.
- **US-008** is absent entirely. Every event has a confident driver name. US-014's fourth criterion (state the count of unattributable events on the driver record) is likewise absent — the driver record shows only "n events in the critical and high bands" and a neutral count, and omits medium and low, contradicting ADR-0007's "contributes to the driver record".
- **US-015** is absent, which is fair (v1.1), but nothing on screen says so.

C-24's principle — the difference between reviewed and unreviewed is never silent — applies to implemented and not-implemented too. A false "Implements" line is worse than no line.
**Disposition: Survives.**

### 14. Camera channel selection is text, not a control.
**Claim:** US-005 — *"available channels are selectable, and the road-facing channel is shown first."*
**Evidence.** After Play, the panel renders the static sentence *"Channels: road-facing (shown), driver-facing."* A full enumeration of buttons on that screen returns no channel control. The criterion is asserted in prose rather than demonstrated — in the artefact built to demonstrate rather than assert.
**Disposition: Survives.**

### 15. The notes panel's own demonstration does not work.
**Evidence.** The panel instructs: *"Dismiss the group of five and watch M-09 split."* I did exactly that from a clean load. Result:

> M-09 per judgement **100%** · M-09 per event **100%**

Identical. The split only becomes visible if you first resolve unrelated events, which the instruction does not say. M-14 simultaneously read **"5 swept / 0 looked at"** against its own stated bar — *"never more cleared by bulk action than by looking"* — with no indication that the bar had just been breached. The single interaction the README tells a reader to try is the one that fails to show the thing it exists to show, and quietly fails a target on the same panel.
**Disposition: Survives.**

### 16. The only critical event is graded critical on evidence that contradicts the grade.
**Evidence.** E-104: *"Graded critical: deceleration consistent with an impact."* Its own signals: **1.14 g over 0.4 s** at **29 mph**, forward camera *"No object detected in the 4 s before"*. 1.14 g × 0.4 s removes ≈ 4.5 m/s — about 10 mph. The vehicle was still doing ~19 mph at the end of the trace. That is a firm emergency stop, not an impact, and nothing was in front of it.

Marek Nowak is therefore top of the queue on a critical grade his own evidence panel refutes, and that panel is the screen C-07 exists to govern. Fixture data is legitimate; fixture data whose numbers argue against its own label is a finding.
**Disposition: Survives narrowed** — a collision with an undetected object is arguable, but nothing on screen says so and the copy asserts "impact" flatly.

### 17. The bulk group's fixture is internally inconsistent in the way that matters most to ADR-0008.
**Evidence.** Five hard-braking events, 05:40 to 06:12 (32 minutes), *"all five fall within 1.2 miles of each other"*, at 26/27/28/29/30 mph, each with forward camera *"No object detected ahead"*.

32 minutes to cover ≤1.2 miles is an average of ~2.3 mph — stop-start congestion, which is the only reading that makes the timings and the speeds fit. But in traffic dense enough to average 2.3 mph, five consecutive hard brakes with **no object detected ahead** is not credible. Either the forward detector failed on all five — in which case this is a device fault presented as a driver's bad trip — or the grouping rationale is fiction. The prototype offers it as the clean sweep case, and the reason field pre-supposes a road, not a queue.

Also note the speeds and forces climb monotonically (26→30 mph, 0.62→0.74 g) in exactly 0.03 g steps. That reads as generated, not observed.
**Disposition: Survives narrowed** — the arithmetic is reconcilable, the signal story is not.

### 18. The blocked-recognition copy names the wrong action.
**Evidence.** E-127, credit-classified, clip unplayed: "Confirm recognition" is correctly disabled, and the explanation reads **"Watch the clip before recording a conversation."** Confirming recognition is not a conversation. US-012 has its own evidence rule and its own action; US-010's string has been reused for it. W-05 and W-04 both bite.
**Disposition: Survives narrowed** — a copy bug, not a behaviour bug; the gate itself works.

### 19. Provenance. The artefact carries none, and rests on three unreviewed ADRs.
**Evidence.** C-23 requires every artefact to state who drafted it, who decided it, and whether the adversarial pass ran. `prototype/index.html` carries no such statement. README lists it as a completed deliverable with no pass marker.

Separately: the prototype's most novel claim — the ADR-0014 classification flow — rests on **ADR-0012, ADR-0013 and ADR-0014, all three of which carry `adversarial_pass: not run`**. That is legitimate under the repo's own rules only if the handover says so (C-24). It does not.
**Disposition: Survives.**

### 20. Nits, grouped — none of these alone would change a decision
- `RETENTION_DAYS = 10` is stated to the manager as fact; A-10 is a **7–14 day** range at **low** confidence. C-03 / W-07: a range midpoint hardened into a product promise.
- `"— in a 30 mph zone limit"` on every closed event — a string-splitting artefact.
- `"4 of 7 decisions was a dismissal"` — number agreement.
- `"not just that something happened"` — *just* is on the banned list, though used in the "not merely" sense the list probably does not intend.
- US-003's quoted string ends with a full stop; the button renders it without one. The mechanics section ("no full stop on buttons and labels") arguably wins, but the AC quotes a character-exact string and the repo should pick.
- `"11 to go"` above 7 rows.
- `withoutFootage: e.footage !== "ready" || !e.played` conflates *no footage existed* with *the manager did not watch* — two different populations for the split US-009 asks M-09 to be readable by.
- The band screens carry prototype apologetics in the product voice: *"A full list would sit here. It is left out because a list is not the behaviour in question."* Honest, but it is meta-copy inside the product frame.

---

## What survived my attack, plainly

These I tried to break and could not:

- **The empty state renders both US-001 strings exactly**, character for character, including *"150 events were graded and handled without you."* — and 150 is arithmetically correct (38 medium + 112 low).
- **US-003's expired-footage string** renders exactly: *"Footage no longer available. This event is outside the 10-day window the camera keeps."*
- **US-014's "Too early to say. This needs 4 weeks after the conversation."** renders exactly, and correctly — it appeared for the conversation I logged today and did not appear for the seeded August one. The 4-before/1-after comparison is correctly labelled *"A comparison, not proof"*, satisfying R-06 and W-07, and the wording could be shown to the driver.
- **US-006's grading exemplar** renders verbatim on E-121: *"Graded high: deceleration in the top few percent, with a vehicle ahead."*
- **Ruleset versioning works and is demonstrated, not asserted** — v4 on this week's events, v3 on last week's. That is exactly the kind of thing a wireframe cannot show and it is the best moment in the prototype.
- **US-011 is fully implemented.** The dispute checkbox persists to the driver record and renders alongside the event, not in a separate view.
- **The critical indicator is genuinely persistent** — it sits outside the screen container, survives every navigation, and disappears the moment the critical event reaches a terminal state.
- **Free-text reasons genuinely gate dismissal**, single and bulk, on trimmed content. ADR-0008's friction is real.
- **W-06 holds throughout.** No streak, badge, score, leaderboard or emoji anywhere in 47 KB. No banned punitive word — *violation*, *infraction*, *offence*, *offender*, *caught* — appears once. Given how easy those are to slip in, that is a deliberate and sustained discipline.
- **ADR-0007's routing framing survives**: the band strip makes "nothing is discarded, only routed" legible in one glance, and the band screens say it in the manager's language.

---

## Coverage

**Verified by driving the prototype in Chromium** (13 scripted runs, DOM enumeration, computed-style and bounding-box measurement, 12 screenshots):
findings 1, 2, 3, 4, 5, 6 (absence by grep + DOM), 7, 8 (walked the full queue to empty and read the notes at each step), 9, 10A, 11, 12, 13 (button enumeration per screen), 14, 15, 18, and the whole "survived" list. Button geometry in finding 5 is measured, not inferred. The counter corruption in finding 4 is a reproduced sequence, not a code reading.

**Inferred from source, not driven:** finding 3's arithmetic for cases beyond the ones I ran; finding 10B and the "Eyes on road" point; finding 16's physics; finding 19.

**Not examined:** `brain/prd.md`, `phasing.md`, `business-case.md`, `problem.md`, `jtbd.md`, `judgement-log.md`, the personas, `risks.yaml`, `questions.yaml`, `docs/traceability.md`, `scripts/validate.py`, ADR-0001/0003/0004/0006/0011, and assumptions other than A-02/03/04/05/09/10/11/12/18/19. I did not check the prototype at phone width, did not test keyboard-only navigation or screen-reader output (there are zero `aria-label`s in the file, and the classification row is three unlabelled buttons in a group), and did not audit the remaining copy against the banned list beyond a regex pass.

**One thing I could not decide.** Whether the fixture fleet's 161 events/week is consistent with A-02 (0.5–3 events/vehicle/day) is uncheckable: the prototype never states how many vehicles Northgate Logistics runs. At 15 vehicles it is in range; at 100 it is an order of magnitude under, which would put it on the wrong side of A-02's own discovery gate. That number should be on the screen.

---

## Human disposition — 2026-09-14, Danny

Twenty findings. **Sixteen fixed, three partly fixed, one deferred** — and one
gap outside the numbered findings, accessibility, untouched.

*An earlier version of this section said "sixteen fixed, one fixed differently,
three deferred". That was tidier than the truth and it is the same fault the
first adversarial pass caught in the judgement log: a count that reads well and
does not survive being checked. Corrected here rather than quietly.*

Every fix is verified by a scripted run against the rebuilt file — 30 assertions,
each tied to a finding — rather than by reading the diff. That is the reviewer's
own method and the reason its findings landed.

**Fixed, and the four that mattered most were all the same fault.** The
recognition record is now built from the event it belongs to, so confirming
credit on Joe Mensah's Saturday event records Joe Mensah's Saturday event.
Coaching asks two questions instead of one, because one box accepts *"Spoke to
driver"* and two cannot — that is a change to [[US-010]], made because the
prototype proved the requirement's own stated intent was unenforceable as
written. A sweep now classifies nothing: bulk dismissal adds one dismissal
decision and zero confirmations, where before it manufactured five and reported
them as agreement with the grading model. Changing a classification removes that
event's own counter entry rather than whichever was most recent.

All four errors ran toward flattering the model. That is the finding behind the
findings, and it is worth more than any of them individually.

**Also fixed:** the review set is now genuinely ordered by a severity score that
exists (12); M-09's population is critical and high band, current week only, and
[[M-09]]'s own definition in the register now says so rather than leaving it to
the reader (8); retention dates are internally consistent (9); last week's events
carry real signals instead of the word "recorded", and the invented 60-metre
range figure — a capability [[ADR-0012]] spent a paragraph excluding — is gone
(10); the device that cannot flag objects ahead now says exactly that, which
makes its footage and its low-confidence grading agree (11); the fetching panel
carries [[US-007]]'s string verbatim and no longer describes an upload model
[[ADR-0007]] did not choose (6, 7); the critical event's physics support the word
"impact" (16); the bulk group's five events are a coherent trip rather than a
generated sequence (17); the blocked-credit action says *"watch the clip first"*
rather than borrowing US-010's line about a conversation (18); the artefact
carries provenance (19); and the fleet size is on screen, so 161 events a week
can be checked against [[A-02]] (the reviewer's closing point).

**Fixed differently: finding 5.** The reviewer was right that the proposal button
was 46% taller and that neutral was the cheapest path through any event. The
agent proposed evening that up with a required reason on neutral. Danny rejected
it — neutral is *nothing to see here*, and charging someone to type that buys
compliance text rather than judgement. The asymmetry was real but the diagnosis
was backwards: neutral was not too cheap, risk and credit were badly built at
three clicks and a redundant second confirmation. All three are now one click
that states its own consequence, the proposal is named in the panel rather than
marked on a button, and the cost tracks what an action reaches — neutral needs no
clip, credit needs the clip watched, risk needs the clip watched and something
written. [[ADR-0014]] carries a dated correction; J-27 carries the overrule.

**Partly fixed, and the remainder is named on the screens rather than left
silent:**

- **6 — US-007's footage states.** The fetching string now renders verbatim,
  including the clause that makes it an absence state. The **vehicle-offline**
  state is still not built, and that is a decision rather than a backlog item:
  Danny's review of the first build was that footage problems appeared on too
  many pages for a set this size, so the prototype demonstrates pending and
  expired and names offline as specified-but-not-shown.
- **13 — false *Implements* lines.** Fixed: every footer now claims only what is
  built. The underlying absence is not fixed — US-013, US-008 and US-015 are
  still not in the prototype. Each is now declared where a reader would look for
  it, with the reason: not built, assumption A-23, and v1.1 by J-24 respectively.
- **20 — the nits.** Most are gone. Two remain and are deliberate: *"not just
  that something happened"* keeps a banned word in its "not merely" sense, and
  US-003's quoted string ends in a full stop that the button does not render.
  The second needs the repo to decide whether a character-exact acceptance
  criterion outranks the house rule about full stops on buttons. It has not.

**Deferred, and now said out loud on the screens rather than silently:**

- **14 — camera channel selection** is text, not a control. It stays text. The
  behaviour in question is whether a manager can judge an event from the
  evidence, and a channel switcher demonstrates nothing a second grey box would
  not. The screen no longer implies otherwise.
- **Accessibility.** The reviewer noted zero `aria-label`s, no keyboard-only
  testing and no phone-width check. That is a real gap and it is not fixed. It is
  deferred on time rather than on judgement, which is the honest reason.

**One finding I would defend rather than fix.** The reviewer calls the band
screens' *"a full list would sit here"* copy "prototype apologetics in the
product voice". It is, and it stays. A prototype that quietly draws a list
nobody built is the theatre the same review is elsewhere attacking.

**What the pass bought.** Four fabrication bugs in the artefact whose stated job
is proving this repository does not fabricate — caught by a reader who had never
seen it, in about eleven minutes of driving it. That is the strongest argument in
the submission for the method, and it cost one agent invocation.
