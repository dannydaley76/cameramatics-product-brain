# Handover — CameraMatics Head of Product take-home

**Written 2026-09-14. Deadline: close of business Thursday 17 September 2026.**
Submission goes to Daragh McDonnell (dmcdonnell@cameramatics.com).

Read this, then `README.md`, then `AGENTS.md`, then `brain/canon.md`. Do not
start writing until you have read the canon — it binds you.

---

## 1. What this is

Danny Daley is at stage 3 of a Head of Product process at CameraMatics (Dublin,
fleet safety / video telematics, raised up to €49m in June 2026). The brief is a
~4-hour product design exercise: design a capability that detects a risky driving
event on the in-cab device, gets video and data to the cloud, and presents it in
the portal so a fleet manager can review, coach and track improvement. Five
deliverables are asked for; the brief is in the conversation history and
deconstructed in `brain/annotated-brief.md`.

**Stage 4 is a two-hour deep dive with the CTO, who is running the process and
would be Danny's manager.** That shapes everything: the submission's job is to
seed that conversation, and any claim that cannot survive a technical person's
questioning is a liability rather than a feature.

### The two things that make this submission different

1. **The story.** Danny's feedback from a previous job presentation was that his
   storytelling was not strong enough. The deck therefore follows the *process*
   as its narrative spine rather than marching through the brief's five
   headings, with one mapping slide showing where each requirement is answered.
2. **The division of labour.** Danny positions himself as: AI raises
   productivity, but the Head of Product's value is the judgement AI cannot
   replace. The repository is built to *demonstrate* that rather than assert it
   — see `brain/judgement-log.md`, which records where the agent was overruled
   and why. **This is the most important file in the repository.** Protect its
   honesty above everything else.

---

## 2. Where things stand

Repository: **https://github.com/dannydaley76/cameramatics-product-brain**
(public). 58 files. Head commit `7364bd1`.

Validator passes: 19 assumptions, 13 metrics, 13 risks, 10 open questions,
11 decision records, 15 stories.

### The agreed process, and where we are

| Stage | Artefacts | State |
|---|---|---|
| 1. Discovery | annotated brief, company analysis, assumption register, success criteria | **Done** |
| 2. Solution design | options and trade-offs, ADR-0001 to ADR-0011 | **Done** |
| 3. Requirements | PRD, 4 epics, 15 stories, prototype | Written; **prototype not started** |
| 4. Challenge | adversarial review, decision log entries | **Ran. Verdict: Not yet.** Findings partly addressed |
| 5. Delivery planning | phasing, dependency chain | **Not started** |
| 6. Validation | what we measure, when we would know, what would stop us | **Not started** |

### Decisions already made — do not silently reopen these

Every one is an ADR with alternatives and consequences. If you think one is
wrong, that is a conversation with Danny and a **new** ADR that supersedes it
(canon C-16), never an edit.

- **Spine:** attention is the scarce resource; triage and proof are the gap.
- **Primary user:** the fleet manager, reviewing *and* coaching, as the brief
  specifies — with the real two-role delegation model recorded as a divergence
  (ADR-0006).
- **Severity and classification are orthogonal** (ADR-0007, ADR-0010). Four
  bands decide the action; risk / neutral / credit decides whether that action is
  coaching or recognition. Nothing is discarded.
- **Praise the good, coach the bad** (canon C-30). Danny's line. The system
  recognises drivers who avoid harm; recognition is proposed by the system and
  confirmed by a human, and never carries a target.
- **AI restraint** (canon C-28): no model goes into the product where a rule
  would do. Note the deliberate asymmetry — heavy agent use in the *process*,
  conservatism in the *product*.
- **No driver surface in v1** (ADR-0004), coaching requires viewed footage
  (ADR-0005), no configurable ranking (ADR-0003), email for critical events
  carrying almost nothing (ADR-0011).

---

## 3. Outstanding work, in priority order

### A. Finish the adversarial findings (highest priority)

`reviews/2026-09-14-prd-and-requirements.md` — 18 attacks, 16 surviving. Read it
in full. Addressed so far: the validator now exists and passes, the README's
false claims are corrected, the driver persona exists. Outstanding:

1. **ADR-0012 — supersede ADR-0001.** The reviewer found that ADR-0010
   (recognition) depends on forward-camera object detection, which ADR-0001
   explicitly cut, and two acceptance criteria mandate it anyway (US-006's
   "with a vehicle ahead", US-012's cyclist). **Danny has decided:** include
   forward-facing camera detection, conditional on confidence that the vehicles
   have it, and adopt the principle that *every event carries all sensor inputs
   regardless of which signal triggered it*. Supporting evidence: CameraMatics
   AI already "detects vulnerable pedestrians, co-workers and cyclists". Write
   ADR-0012 superseding ADR-0001, update the stack outline's signal list, and
   make the conditional a supported-device matrix gate (R-05 already carries it).
2. **Propagate two corrections that never reached the prose.** The withdrawn
   10–15 minute attention budget still appears in `brain/business-case.md`,
   `brain/prd.md` (first sentence of the problem statement) and
   `brain/stack-outline.md`. The withdrawn 90-second review-time target survives
   in `brain/success-criteria.md`, a file marked `status: accepted`. The
   ADR-0007 "nothing is suppressed" reframe failed to reach ~11 places including
   R-01's mitigation and ADR-0002's consequence 4. **Grep for the claim, not for
   the phrasing you expect** — that is exactly how these survived.
3. **M-09 is arithmetically broken.** It is the headline metric and the 90-day
   pass/fail term, and ADR-0008's one-signal bulk-dismissal rule deflates it:
   40 of 45 events dismissed in one action reads as 2.2%. Redefine so bulk
   dismissals are counted separately, or report both numbers.
4. **The downgrade audit has no owner, no cadence and no story.** It is the only
   control on the grading model, and a control nobody performs is not a control.
5. **The judgement log's closing summary is stale** — says "eight decisions" and
   "three reversals" against 20 entries and at least six overrules. Also check
   J-11's class-of-error assignment against J-05; the reviewer thinks it blames
   the agent for a boundary the human drew.
6. Three market claims carry no assumption ID; M-12 proposes joining coaching
   records to customer HR data with no legal question covering it.

### B. Sections still unwritten

- **Phasing (section 4)** — `brain/phasing.md`. The dependency chain is already
  worked out at the foot of `brain/stack-outline.md`; the useful consequence is
  that portal work can proceed against a stubbed event source, so phasing is not
  serial. Note: `brain/stack-outline.md` currently says "the phasing" without a
  link because the file does not exist — add the link when you write it.
- **Risks, assumptions and open questions narrative (section 5)** — the
  registers hold the content; this is the prose that presents it.

### C. Clickable prototype

Danny chose **low-fidelity but interactive** over static wireframes (J-10):
grey boxes, real states, obviously not a design — but a working
queue → review → coach flow, because that proves the queue model behaves as
described in a way images cannot. Build it from the stories, use
`skills/ux-writing.md` for every string, and publish it so it can be linked from
the deck. Keep it genuinely low-fi: polished *and* working invites a design
review and looks like three days of effort.

### D. The deck

`.pptx` plus PDF, emailed. Structure agreed: follow the six process stages as
the narrative, then a mapping slide showing where each of the brief's five
requirements is answered. Put the depth in the portal requirements. The AI note
is not a disclaimer — it is the judgement log, the provenance fields, the
adversarial pass with its verdict stated, and the validator as judgement in
written form.

### E. Open decisions needing Danny

- **J-03, the commercial anchor, is still `proposed` and unratified.** The
  recommendation is two-sided — lower cost of risk for the customer, revenue on
  an already-acquired installed base for CameraMatics — with insurance as upside
  rather than headline. Do not quietly promote it to ratified.
- Whether the CI workflow file gets pushed (see §5).

---

## 4. How to work in this repository

Read `AGENTS.md` and `brain/canon.md` properly. The short version:

- **Use the skills.** `skills/` holds the recipe for each document type — PRD,
  user stories, ADRs, UX writing, adversarial review, competitive brief,
  stakeholder update. If there is no skill for what you are producing, the shape
  is not settled; say so rather than inventing a format.
- **Run `python3 scripts/validate.py` before every commit** and
  `--write` to regenerate `docs/traceability.md`. It enforces canon §3.
- **IDs are permanent.** Never renumber, never reuse. Superseded items are
  marked and kept.
- **Every artefact carries provenance** — `drafted_by`, `decided_by`,
  `adversarial_pass`.
- **Never satisfy the validator by inventing a link.** If a story moves no
  metric, the finding is that it should not be built.
- **Record reversals with their reason and class of error** (canon C-27).
  "The human decided otherwise" evidences a preference, not judgement.

### Working with Danny — read this carefully

He pulled the handbrake once already for exactly this reason: *"I don't feel like
I'm making the important decisions enough."* He was right.

- **He decides; you enumerate.** Bring options with real trade-offs and your
  reasoning visible, then let him choose. Do not hand him a menu with one item
  marked "Recommended" and treat his click as judgement.
- **Show the working before asking for a decision.** When he asked to see the
  video-upload trade-off rather than pick from a list, the reasoning that
  surfaced changed the answer's justification entirely.
- **Do not batch.** Several medium decisions at speed turns him into a ratifier.
- **Plain English, and answer the question asked.** No restating the ticket
  title back, no lists of nouns. If the honest answer is one paragraph, it is one
  paragraph.
- **Push back when he is wrong, and when he asks for something that damages the
  work.** He asked once for an observation to be re-attributed to him; refusing
  was correct, and he then confirmed he had genuinely thought of it. That
  exchange is J-15 and it is part of why the log is credible.
- **He catches invented numbers.** The 15-minute attention budget was fabricated
  by an agent, cited by four documents until it looked like a finding, and had
  hardened into a design target. He asked where it came from. Do not give him
  another one.

---

## 5. Mechanics — read before you try to push

This is fiddly and will waste an hour if you discover it yourself.

**Three machines are involved.**

1. **The cloud container** — where the agent works. Authoring copy of the repo
   lives here.
2. **Danny's Mac** — reachable through `mcp__remote-devices__*` tools. The
   connected folder is `/Users/admin/Documents/cameramatics`, which holds the
   **canonical git repo that pushes**. Inside `device_bash` it is at
   `$HOME/mnt/cameramatics`.
3. **GitHub.**

**The container cannot push.** Its egress proxy refuses to inject credentials
for repos outside the session's authorised set — an organisation policy denial,
not something to route around. All pushes happen from the Mac side.

**The sync loop, every time:**

```bash
# 1. in the container, after committing locally
tar czf /mnt/user-data/outputs/cm-sync-$(date +%H%M%S).tgz \
    --exclude=.git --exclude=.transfer .

# 2. device_commit_files the tarball to
#    /Users/admin/Documents/cameramatics/.transfer/<same name>

# 3. in device_bash
cd "$HOME/mnt/cameramatics"
tar xzf .transfer/<name>.tgz
git add -A && git -c user.name="Danny Daley" -c user.email="danny@mekhanism.com" commit -F - <<'MSG'
...
MSG
git push "https://dannydaley76:<TOKEN>@github.com/dannydaley76/cameramatics-product-brain.git" main
```

**Gotchas, all of which cost time here:**

- **Always use a fresh timestamped tarball name.** Reusing a filename silently
  delivered a stale copy once and the commit went out missing a file.
- **File deletion is enabled** for `/Users/admin/Documents/cameramatics` in the
  original session. A new session will need to request it again via
  `device_request_delete_permission` — without it, git leaves `.lock` files
  behind and the *next* commit jams.
- **The token cannot create `.github/workflows/`** without the **Workflows:
  Read and write** permission. `.github/workflows/validate.yml` is written and
  currently gitignored and unpushed for this reason. Either get the permission
  added and push it, or leave the README's build-state line honest as it stands.
- Credentials are **not** in this repository. Danny holds them; ask him. The
  token used on 14 September should be rotated regardless — it has been sitting
  in a chat transcript.

**Attribution on commits:**

```
Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: <your session URL>
```

---

## 6. If you read nothing else

The submission's credibility rests on three things, in this order:

1. **The judgement log is true.** Every `ratified` is a decision Danny actually
   made; every `proposed` is still the agent's. If you blur that to make the
   document flatter, you have destroyed the only thing here that a competing
   candidate cannot fake.
2. **No invented numbers.** Every quantity is an assumption with a range, a
   confidence and a way to test it, or it does not appear. The repo has already
   been caught once.
3. **The adversarial pass ran and the verdict was Not yet.** Say so. An
   unreviewed artefact and a reviewed one are different objects, and pretending
   otherwise is the exact failure the whole method exists to prevent.
