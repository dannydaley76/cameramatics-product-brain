---
id: PERSONA-FM
title: Fleet manager (primary, v1)
status: draft
owner: danny
assumptions: [A-01, A-03]
links: [jtbd, problem]
adversarial_pass: ran 2026-09-14
---

# Fleet manager — primary user for v1

**Context.** 20–150 vehicles ([[A-01]]), mixed vans and rigids, regional
operation. No dedicated safety manager — safety is one of six things they own
alongside maintenance, compliance, driver recruitment and customer complaints.
Often a former driver or transport supervisor. Deeply operational.

**Where they work.** Desk between depot visits. Windows laptop, one large
monitor, Chrome. Phone for anything urgent. Lives in email and WhatsApp.
Already logs into three other systems daily; ours is not one of the three.

**Capacity for this task.** Finite and contested. *How* finite is unknown — an
earlier version of this persona asserted ten to fifteen minutes a day, which was
invented rather than observed and has been withdrawn ([[A-03]], J-17). What can
be said safely: attention here competes with maintenance, compliance,
recruitment and customer complaints, so a workflow assuming daily attention will
not be used — and the time this deserves is an output of designing it well, not
a budget to squeeze into.

**Relationship with drivers.** Personal. Knows them by name, knows who is
having a bad month. Will not use a tool that makes them the enemy, and will
quietly stop using anything that produces a coaching conversation they lose.
This is the single biggest adoption constraint and it is a *fairness* problem,
not a UX problem.

**Sophistication.** Not a data person. Will not tune sensitivity thresholds,
will not read a distribution, does not want a dashboard-building exercise.
Will absolutely understand "these four drivers, this week, here's why".

**What good looks like to them.** Opens the portal, sees a short list, watches
three clips, sends two coaching notes, closes the tab, and does not worry that
something important is sitting unseen.

**What makes them churn.** A queue that is never empty. Being shown an event
they consider nonsense. Watching video to work out whether an event matters.
Having no answer when the MD asks "so is it working?"

## Design consequences

- Default state must be a **short, ranked, finite list**, not a feed or a filter
  builder.
- The severity claim must survive scrutiny: if the top of the queue is wrong,
  everything downstream fails ([[R-02]]).
- Coaching must produce an artefact the manager can point at later — for their
  own protection as much as the driver's.
- Zero configuration in v1. Sensible defaults, set by us, tuned centrally.
