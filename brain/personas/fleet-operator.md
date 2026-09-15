---
id: PERSONA-FO
title: Fleet operator (buyer, not user)
status: draft
owner: danny
assumptions: [A-01, A-08, A-24]
metrics: [M-01, M-02, M-04, M-15, M-16]
links: [jtbd, business-case]
adversarial_pass: not run
---

# Fleet operator — owns the outcome, does not use the product

The brief names two people in one sentence: *"A fleet operator wants to reduce
collisions and improve driver safety across their vehicles. They are interested
in a capability that automatically catches risky driving as it happens and helps
their **fleet managers** act on it."*

The manager is the user and [[decisions/ADR-0006]] is unchanged. The operator is
the reason there is a budget, and until now this brain had no account of them —
which is how a submission ends up with a business case addressed to somebody
nobody described.

**Who they are.** At 20–150 vehicles with no dedicated safety manager
([[A-01]]), this is the owner, the MD or the operations director ([[A-24]], and
that is an assumption rather than a finding — the brief does not say). They sign
the insurance renewal and they see the claims bill. They may have driven for a
living; they do not drive a desk in this product.

**What they are buying.** Not events, and not a queue. Lower cost of risk —
fewer at-fault collisions, cheaper claims, less vehicle downtime, a better
conversation with the broker ([[business-case]]). The capability is a means and
they will not be sentimental about it.

**How often they look.** Monthly, or when something happens. A collision, a
renewal, a customer complaint about a driver, or a quiet quarter that makes them
wonder what they are paying for. They are not in the product weekly and any
design that assumes they are has misread them.

**What they ask.** *"Is it working?"* — and they ask it of the fleet manager,
not of the software. The fleet-manager persona already names the failure
this creates: **"Having no answer when the MD asks 'so is it working?'"** That
sentence was written before this persona existed, and it is the clearest
evidence the operator was always in the design as an absence.

**What makes them cancel.** Twelve months of activity reporting with nothing
that looks like an outcome. A number that moved and cannot be explained. Or a
driver relations problem the product caused — they carry that, not the manager.

**What they will not do.** Read a distribution. Learn a workflow. Accept "the
managers are engaging well" as an answer to "is it working".

## Design consequences

- **The metrics register has two readers and it now says which is which.** The
  operator's questions are [[M-01]], [[M-02]], [[M-04]], [[M-15]] and [[M-16]] —
  is the road getting safer, and are we reaching the drivers who matter.
  Everything else in that register is ours, and showing it to an operator as
  evidence is the activity-reporting failure above.
- **Their fastest honest signal is [[M-15]]**, the risky-event rate per
  exposure. Collisions cannot be read inside a quarter ([[R-06]]); the events
  this product already detects can. It is the only thing that answers "is it
  working" on a timescale where they are still asking.
- **[[M-16]] is the one that protects them from a flattering answer.** Coaching
  volume can look healthy while the conversations land on the wrong drivers.
- **Nothing in v1 is built for them**, and that is a live question rather than a
  settled one. [[US-015]], the fleet view, was cut to v1.1 (J-24) on the
  argument that a trend drawn over four weeks of a low-base-rate outcome
  overstates what it knows. That argument was made against a *manager* reading
  it as evidence. The operator is a different reader with a different question
  and a renewal date, and J-24's own stated reopening condition is exactly this.

## What this does not change

The primary user for v1 is still the fleet manager, and every requirement in
[[requirements/README]] stays as written. The brief is explicit that the
capability helps managers act; designing for the operator's reporting need
instead would be answering the question nobody asked. This persona exists so
that the business case has a reader, the metrics have an audience, and the one
decision it genuinely reopens is reopened rather than left.

There is a third role this brain still has no account of: [[A-16]] says coaching
is already delegated to a depot manager, which makes the real chain operator →
fleet manager → depot manager → driver. [[decisions/ADR-0006]] records that as a
known divergence and a phase-2 candidate. It is still that.
