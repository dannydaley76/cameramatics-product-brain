---
id: STACK
title: Solution outline across the stack
status: draft
owner: danny
section: 2
drafted_by: agent
decided_by: danny
adversarial_pass: ran 2026-09-14
assumptions: [A-02, A-04, A-05, A-07, A-09, A-10, A-11]
metrics: [M-05, M-09, M-10]
risks: [R-02, R-03, R-04, R-05, R-09]
decisions: [ADR-0002, ADR-0003, ADR-0004, ADR-0005, ADR-0007, ADR-0010, ADR-0012]
questions: [Q-02, Q-03, Q-09]
links: [problem, business-case, portal-requirements]
---

# Solution outline — edge, cloud, portal

Bullet-level by design; the brief asks for fluency here and depth in the portal.
No insider knowledge of the actual architecture — everything below is a
reasonable-assumption reading, and where a decision depends on something I
cannot see, it names the question that would settle it.

The shape in one line: **the device decides what is worth sending, the cloud
decides what is worth showing, and the portal decides nothing — it shows a short
list honestly.**

---

## 1. In-cab device / firmware

### What it must do
- Detect the v1 event set **on-device, in real time**, with no cloud round trip.
- **Attach every available signal to every event, whichever one triggered it**
  ([[ADR-0012]]): speed, the g-force trace, GPS, time of day, whether wipers or
  lights are on ([[A-26]]: on a lot of retrofit fitment there is no vehicle bus
  connection, so that pair may simply be absent), driver-facing inference, and — where the device supports it —
  forward-facing detection of vulnerable road users and of a vehicle ahead. The
  trigger decides that an event exists; it does not decide what evidence the
  event carries. This is what lets the cloud rank rather than guess, and what
  lets [[ADR-0010]] read the same event as risk or as credit without a new
  detector for each.
- **Buffer continuously** with a guaranteed retention window, so footage can
  still be fetched days later when someone challenges an event ([[A-10]]).
- Send a small metadata packet immediately; push a clip only when the local
  severity flag warrants it ([[ADR-0002]]).
- Survive intermittent connectivity, ignition-off and power cycling —
  queue-and-forward, not fire-and-forget.
- Be **OTA-updatable**, so thresholds and rulesets are tuned centrally without
  touching vehicles.

### Constraints
- Inference budget on the SoC is shared with recording and encoding. Detection
  competes with the primary function of the device.
- Cellular data is contractually capped per vehicle ([[A-05]]).
- Power: heavy inference is not available with ignition off.
- SD endurance and loop overwrite set a hard ceiling on the retention promise —
  the retention window is a hardware fact we are choosing to expose as a
  contract, not a software feature we can extend later.
- Installed-base fragmentation across device generations ([[A-04]], [[R-05]]).

### Decisions and trade-offs
- **Narrow and reliable over broad and noisy, on triggers** ([[ADR-0012]],
  superseding [[ADR-0001]]). Four behaviours raise an event: harsh braking,
  harsh acceleration, harsh cornering (inertial — cheap, well understood) and
  **phone-in-hand distraction** from the driver-facing camera. Distraction earns
  its inference cost because it is the behaviour managers most want to coach.
  Trade-off accepted: we lose the feature-grid comparison in an RFP.
- **Broad on signals, narrow on triggers.** Forward-facing detection of a
  vulnerable road user or a vehicle ahead is *evidence attached to an event*,
  not an event type of its own, and it is in v1 where the device supports it.
  *Not* in v1: headway/tailgating as a coachable behaviour, because measuring
  following distance needs per-install camera calibration — a field-operations
  dependency rather than a software one — and fatigue, the least reliable and
  most disputed signal in the category. Detecting that something was there is a
  different problem from measuring how far away it was.
- **Severity is judged in two places, deliberately.** A cheap, conservative
  *local* flag answers "push the video now?" and is biased toward pushing when
  unsure. A richer *cloud* score answers "where does this rank?". Local
  optimises recall, cloud optimises precision. Cost: two thresholds to keep in
  step, mitigated by holding both as server-side config.
- **Nothing tunable lives in firmware.** Every threshold is remote config,
  because we will get thresholds wrong and a firmware release cycle is the wrong
  unit of iteration for a number we are guessing.
- **Anything collision-grade uploads unconditionally.** If the g-force spike
  suggests an impact, the clip goes now — the device may not survive to be asked
  later. This is the one case where cost does not get a vote.

### Dependencies and risks
Gated on [[Q-03]] (which device generations can run distraction inference and
forward-facing detection, and what the real OTA reach is). [[ADR-0012]] adds a
second camera-side workload competing for the same inference budget, so the
supported-device matrix may come back narrower than distraction alone would
imply — and that matrix now gates recognition as well as onboarding. [[R-05]] is
the delivery risk that most shapes phasing.

---

## 2. Cloud platform

### What it must do
- Ingest metadata at fleet scale **idempotently**, tolerating duplicate,
  late and out-of-order arrivals from queue-and-forward devices.
- **Group** related detections into one event — a single hard-braking sequence is
  one thing to review, not seven — and **grade** known-benign patterns into a
  band that needs no conversation. Nothing is discarded ([[ADR-0007]]).
- **Score and rank** severity, and record *why* alongside the score.
- **Orchestrate video**: accept pushed clips, request clips on demand, track
  state (ready / fetching / unavailable-with-reason), and handle never-arrives
  without lying about it.
- Store footage with a retention policy, role-based access and an audit trail of
  who viewed what ([[A-07]]).
- **Attribute events to drivers.**
- Maintain driver and fleet aggregates and the coaching record.
- Emit every metric in [[registers/metrics]] as a first-class output, not as a
  reporting afterthought.

### Constraints
- **Driver attribution is inherited, not built — and that is the constraint that
  hurts.** Per-driver scoring already exists, so attribution is solved by some
  mechanism ([[A-11]]); we do not know which, and each one fails in the same
  places — overtime, agency, swapped shifts. We take on that gap rate rather than
  choosing it ([[R-09]]). Facial identification would close it and is
  disproportionate; I would not propose it.
- Device clocks drift, so event ordering cannot trust device timestamps alone.
- Retention limits and right-to-erasure sit in tension with the evidential value
  of footage in a claim. That tension is a policy decision with a legal owner,
  not a default.
- Multi-tenant isolation on footage: the highest-consequence access-control
  surface in the system.

### Decisions and trade-offs
- **Group and grade in the cloud, not on the device.** Those rules will change
  weekly in the first quarter and firmware cannot move at that speed. Cost: we
  pay to ingest metadata for every event, including the ones that end up in a
  band nobody opens. Metadata is cheap; iteration speed is not.
- **Severity is explainable, not just accurate.** Every surfaced event carries
  the reasons for its rank, because a manager who cannot see why will not trust
  the ranking ([[R-02]]) and support cannot answer "why did this surface?".
  Trade-off: this constrains us toward interpretable features and away from the
  best raw score we could otherwise reach.
- **Version the severity ruleset on every event.** Otherwise re-tuning silently
  invalidates historical comparison and every trend chart quietly becomes
  fiction. *Ruleset, not model, and the word is load-bearing:* [[canon#C-28]]
  says nothing here gets a model because a model was available, and grading runs
  on interpretable thresholds over the attached signals. A model would have to
  pass C-28's test first, and none has been run.
- **Driver attribution has an explicit unknown state** and a workflow to resolve
  it. We never guess an identity silently — a coaching conversation with the
  wrong driver costs more trust than ten missed events.
- **Grading is logged, sampled and reported** ([[M-11]]). Every event is
  retained and scored whatever band it lands in, so the failure to guard against
  is not concealment but misgrading — an event that deserved a conversation sent
  as a notification instead ([[R-12]]). The defence is the downgrade audit: a
  human reads a sample of the lower bands and of bulk dismissals and asks how
  many should have graded higher.

### Dependencies and risks
[[R-03]] (video cost), [[R-04]] (data protection), [[R-09]] (attribution).
[[Q-09]] is blocking: without knowing how driver identity is established today,
the coaching loop has no reliable subject.

---

## 3. Customer web portal

Deliberately brief — [[requirements/README]] is where the depth goes.

### What it must do
- A **finite, ranked review queue** that starts full and ends empty.
- An event review surface: footage, context, and the reason it was ranked.
- A **coaching action** cheap enough that logging it beats not logging it
  ([[R-07]]).
- Driver and fleet trend views that support the improvement claim without
  overstating it.
- **Honest footage states** — ready, fetching, unavailable and why.

### Constraints
- Attention is finite and contested; how finite is unknown ([[A-03]]). The time
  this deserves is an output of designing it well, not a budget to design into.
- No training, no onboarding, no configuration ([[ADR-0003]]).
- Not a data person: no thresholds, no distributions, no dashboard building.

### Decisions and trade-offs
- **A queue, not a feed.** A feed is infinite and therefore never done; a queue
  can be cleared, which is the only state that produces a habit.
- **No coaching action on footage the manager has not seen** ([[ADR-0005]]).
  Coaching from metadata is the unfair conversation that destroys driver trust
  and generates upheld disputes ([[M-12]]).
- **Dismissal captures a reason** — wrong detection, not the driver's fault, or
  too minor. Three different product responses hide behind one button
  ([[Q-08]]).
- **Ready events may sort first; unavailable events are never hidden.**
  Otherwise infrastructure is deciding what a manager sees, rather than the
  grading rules doing it where they can be audited.

---

## The dependency chain that sets phasing

1. Device capability ([[Q-03]]) gates which **event types** exist at all.
2. The retention window ([[A-10]]) gates whether **promote-and-fetch** is
   possible, and therefore whether [[ADR-0002]] is safe.
3. Driver attribution ([[Q-09]]) gates **coaching**, and therefore the primary
   product metric [[M-03]].
4. Footage state handling gates the **portal**.

The useful consequence: the portal can be built and tested against a stubbed
event source while the edge and attribution work proceeds. That is what makes
[[phasing]] possible rather than serial, and it is the reason I would start
portal work early even though it is last in the data flow.
