---
id: PERSONA-DR
title: Driver (affected in v1, not served)
status: draft
owner: danny
drafted_by: agent
decided_by: danny
adversarial_pass: ran 2026-09-14
assumptions: [A-07]
risks: [R-04]
metrics: [M-12]
decisions: [ADR-0004, ADR-0010]
links: [jtbd, canon]
---

# Driver — affected in v1, not served

The person in the footage. They have no surface in this release
([[ADR-0004]]), which makes writing them down more important rather than less:
every requirement has to be defensible to someone who cannot answer back yet.

**Context.** Multi-drop van or rigid, 8–11 hours behind the wheel, paid to
finish the round. Often the only person in the vehicle all day. May be agency,
may be on overtime, may have taken this van at short notice — which is exactly
where attribution degrades ([[A-11]]).

**Relationship with the camera.** Ambivalent at best. The road-facing camera is
broadly accepted because it exonerates: when someone pulls out on them, the
footage is on their side. The driver-facing camera is different and is where
resentment lives. Their employer has published that the system exists to
"exonerate drivers" and give them "extra eyes and ears" — the product either
makes that true or makes it a slogan.

**What they fear.** Being judged on thirty seconds without context. A
conversation where the manager has already decided. A record they never see,
built from footage of their own face, that follows them.

**What they never get in v1.** Any notification. Any way to see their own
events. Any route to dispute one, except by telling the manager, who types it in
([[US-011]]). This is a real cost and it is recorded as a decision rather than
an oversight.

## Design consequences

- **Every string about a driver assumes they will read it**
  ([[../../skills/ux-writing]] W-01), because during a coaching conversation
  they will.
- **Evidence before judgement.** No coaching action without the manager having
  watched the footage ([[ADR-0005]]). Their protection in this release is
  procedural, not a feature.
- **The system can say something good.** A purely negative detector makes
  invisibility the best outcome a driver can reach ([[canon#C-30]]), which is
  how a safety tool becomes the thing the cab resents ([[ADR-0010]]).
- **Their words are in the record** ([[US-011]]) — the one place in v1 where the
  driver's account exists at all.
- **[[M-12]] is their proxy.** Disputes raised, disputes upheld, and attrition
  in the coached cohort are how we find out we got this wrong, since they have
  no other channel to tell us.
