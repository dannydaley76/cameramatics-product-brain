---
id: JTBD
title: Jobs to be done
status: draft
owner: danny
links: [[problem]] [[personas/fleet-manager]] [[personas/driver]]
---

# Jobs to be done

## Primary — fleet manager ([[personas/fleet-manager]])

> When my drivers are out on the road and I can't see what they're doing, I want
> to know which of them is about to cost me a collision and be able to have a
> short, fair conversation about it — without spending my week watching video.

| Dimension | Job |
|---|---|
| Functional | Identify the few drivers and behaviours worth intervening on, this week, and record that I did |
| Emotional | Not be blindsided by a serious incident; not feel like I'm policing my own team |
| Social | Show the MD, the insurer and the auditor that safety is managed rather than hoped for |

### Forces (why they move, why they don't)

- **Push** — current process is reactive; the manager only learns about risk
  when it has already cost money.
- **Pull** — fear of the next serious collision; insurer and customer pressure;
  cameras are already fitted and visibly under-used.
- **Anxiety** — drivers will hate it; "big brother" and employee-relations
  pushback; the time cost of another system to check; being wrong in a coaching
  conversation and losing credibility.
- **Habit** — the spreadsheet, the phone call, the depot conversation. Anything
  we build competes with these, and they are free.

The anxiety and habit forces are the ones that kill adoption, and both are
addressed by workflow rather than by detection quality. That is the case for
the spine of this capability.

## Secondary — driver ([[personas/driver]])

> When I'm told I drove badly, I want to see what actually happened and be able
> to say my side, so that a bad thirty seconds doesn't define my record.

Not served in v1 as a product surface, and that is a deliberate scoping
decision rather than an oversight — see [[ADR-0004]]. It is served
*indirectly* in v1 by requiring that every coaching action be evidenced by
reviewable footage the manager can show the driver.

## Buyer — operations director / MD

> I want to lower the total cost of risk without adding headcount, and be able
> to see that the money did something.

Distinct from the user job, and the reason the success measures in
[[business-case]] carry both an outcome metric and a habit metric: the buyer
buys the outcome, but the habit is what predicts it inside the first quarter.
