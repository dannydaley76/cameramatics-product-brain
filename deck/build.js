const pptxgen = require("pptxgenjs");
const fs = require("fs");
const S = "/home/claude/shots/";

// PNG width/height live at bytes 16-24 of the IHDR chunk
function pngSize(file){
  const b = fs.readFileSync(file);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

const INK="2B3038", DEEP="1E232A", PAPER="FFFFFF", MIST="F2F3F4",
      MID="5E666F", FAINT="98A0A8", ACC="C8621E", ACCW="FAEFE7", LINE="DDE0E3";
const H="Cambria", B="Calibri";
const REPO = "https://github.com/dannydaley76/cameramatics-product-brain";

const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "Danny Daley";
p.title  = "CameraMatics: event triage and coaching loop";

const W=13.3, M=0.72;
const txt = o => Object.assign({ isTextBox:true, fontFace:B, color:INK, margin:0, valign:"top" }, o);
const ar = n => { const d = pngSize(S+n+".png"); return d.width/d.height; };
const img = (s,n,x,y,w) => s.addImage({ path:S+n+".png", x, y, w, h:Math.round((w/ar(n))*100)/100 });

function light(title, kicker){
  const s = p.addSlide();
  s.background = { color: PAPER };
  if (kicker) s.addText(kicker.toUpperCase(), txt({ x:M, y:0.42, w:11, h:0.26,
      fontSize:10.5, color:ACC, bold:true, charSpacing:1.6 }));
  s.addText(title, txt({ x:M, y:kicker?0.74:0.62, w:W-2*M, h:1.05,
      fontSize:30, bold:true, fontFace:H, lineSpacing:35 }));
  return s;
}
const dark = () => { const s = p.addSlide(); s.background = { color: DEEP }; return s; };
function card(s,x,y,w,h,fill){
  s.addShape(p.ShapeType.rect, { x,y,w,h, fill:{ color: fill||MIST },
    line:{ color: fill===ACCW?ACCW:LINE, width:0.75 } });
}
function num(s,x,y,n){
  s.addShape(p.ShapeType.ellipse, { x,y,w:0.34,h:0.34, fill:{ color:INK } });
  s.addText(String(n), txt({ x, y:y+0.045, w:0.34, h:0.26, fontSize:12, bold:true, color:PAPER, align:"center" }));
}
const foot = (s,t,y) => s.addText(t, txt({ x:M, y:y||6.74, w:W-2*M, h:0.5, fontSize:11, color:FAINT, lineSpacing:14 }));
const link = (t,url,o) => ({ text:t, options:Object.assign({ hyperlink:{ url }, color:ACC, underline:true }, o||{}) });

/* ═══════════════════════════════════  1  title */
{
  const s = dark();
  s.addText("Detection is solved.\nAttention is not.", txt({ x:M, y:1.75, w:8.6, h:2.1,
    fontSize:44, bold:true, color:PAPER, fontFace:H, lineSpacing:50 }));
  s.addText("Event triage and coaching loop. A product design exercise for CameraMatics.",
    txt({ x:M, y:4.05, w:8.8, h:0.4, fontSize:16, color:"C9CFD5" }));
  s.addShape(p.ShapeType.rect, { x:M, y:4.72, w:0.9, h:0.035, fill:{ color:ACC }, line:{ width:0 } });
  s.addText("Danny Daley", txt({ x:M, y:5.0, w:6, h:0.3, fontSize:15, bold:true, color:PAPER }));
  s.addText("September 2026", txt({ x:M, y:5.34, w:6, h:0.3, fontSize:13, color:"B6BEC6" }));
  s.addText("Every number in here is either measured, with a named source, or written down as an assumption with a confidence rating and a way to check it. There is nothing in between.",
    txt({ x:9.9, y:4.05, w:2.72, h:1.6, fontSize:11, color:"B6BEC6", lineSpacing:16 }));
  s.addNotes("Detection is something every vendor has. Deciding which events deserve a person is the part nobody has solved.");
}

/* ═══════════════════════════════════  2  the answer */
{
  const s = light("A triage and coaching loop, not an event detector", "The answer, up front");
  const cols = [
    ["What it does","Every event the device spots is graded into one of four bands, and each band has its own action. Separately, each event is labelled as risk, not the driver's fault, or something they got right. The portal shows a weekly set that starts full and can be emptied."],
    ["Why this is the thing to build","A 100-vehicle fleet produces 50 to 450 events a day. Most are technically correct and practically irrelevant. The manager works through a handful, gets no signal that it mattered, and stops logging in. That is where I would expect a camera rollout to die, and it is the failure this is designed against."],
    ["The line the design turns on","Praise the good, coach the bad. A system that only ever spots failure makes being invisible the best a driver can hope for. That is how a safety tool becomes the thing the cab resents."]
  ];
  cols.forEach(([t,d],i)=>{
    const x = M + i*4.02;
    card(s, x, 2.0, 3.74, 2.96, i===2?ACCW:MIST);
    s.addText(t, txt({ x:x+0.26, y:2.26, w:3.22, h:0.66, fontSize:15.5, bold:true, fontFace:H, color:i===2?ACC:INK }));
    s.addText(d, txt({ x:x+0.26, y:3.0, w:3.22, h:1.86, fontSize:12.5, color:MID, lineSpacing:17 }));
  });
  s.addText([
    { text:"50 to 450", options:{ fontSize:38, bold:true, color:ACC, fontFace:H } },
    { text:"  events a day, one fleet, one manager, and no way to tell which six matter.", options:{ fontSize:14, color:MID } }
  ], txt({ x:M, y:5.34, w:11.9, h:0.8 }));
  foot(s, "A range, not a single figure. It is assumption A-02, held at low confidence, and it is the one that would end this if it turned out to be wrong.", 6.2);
  s.addNotes("If the reader stops here they still have the argument.");
}

/* ═══════════════════════════════════  3  the problem */
{
  const s = light("The firehose, and the six events", "The problem");
  s.addText("Detection is table stakes now, and getting cheaper. CameraMatics already spots fatigue, distraction, phone use, tailgating and vulnerable road users. What is missing is deciding which of those deserves a person, and proving the conversation changed anything.",
    txt({ x:M, y:1.84, w:7.5, h:1.1, fontSize:14, color:MID, lineSpacing:19 }));
  s.addText("The manager logs in, sees hundreds, works through a few, and stops logging in. The product is working exactly as built. That is the problem.",
    txt({ x:M, y:3.06, w:7.5, h:0.8, fontSize:16, bold:true, fontFace:H, lineSpacing:23 }));
  s.addText("So the thing to design is the manager's week, not the individual event.",
    txt({ x:M, y:4.14, w:7.5, h:0.6, fontSize:14.5, color:ACC, lineSpacing:20 }));

  card(s, M, 5.0, 7.5, 1.72, MIST);
  s.addText("The question I would open the next conversation with", txt({ x:M+0.3, y:5.2, w:6.9, h:0.3, fontSize:13, bold:true, fontFace:H }));
  s.addText("Does the portal already rank events? I built this from 120 words of brief and your public pages, so I could not tell. If you do rank them and never marketed it, the requirements survive and this framing does not. I would rather put that on the table than find out in the room.",
    txt({ x:M+0.3, y:5.56, w:6.9, h:1.0, fontSize:12, color:MID, lineSpacing:16 }));

  card(s, 8.6, 1.84, 3.98, 5.02, ACCW);
  s.addText("What this rests on", txt({ x:8.9, y:2.06, w:3.4, h:0.3, fontSize:13.5, bold:true, fontFace:H, color:ACC }));
  s.addText("Worked out from 120 words of brief and their public product pages. No inside knowledge.",
    txt({ x:8.9, y:2.42, w:3.4, h:0.5, fontSize:11.5, color:MID, lineSpacing:15 }));
  [["A-02","How many events a vehicle produces a day. Ten times lower and attention is not the scarce thing. Thirty days of data settles it."],
   ["A-13","That CameraMatics does not already triage events. If they do, the requirements survive and the story collapses."],
   ["A-20","That collision cost sits with a minority of drivers. The premise of the commercial case."],
   ["A-01","That the buyer is a 20 to 150 vehicle fleet with no dedicated safety manager. One with a safety manager is a different product."]
  ].forEach(([id,d],i)=>{
    const y = 3.0 + i*1.0;
    s.addText(id, txt({ x:8.9, y, w:1, h:0.24, fontSize:11, bold:true, color:ACC }));
    s.addText(d, txt({ x:8.9, y:y+0.24, w:3.4, h:0.68, fontSize:10.5, color:MID, lineSpacing:13 }));
  });
}

/* ═══════════════════════════════════  4  commercial */
{
  const s = light("Lower cost of risk for them. New revenue for us.", "The commercial case");
  s.addText("A business case that only argues the customer's side is a marketing claim, so here are both. The buyer is the fleet operator, who carries the claims bill and signs the renewal. The user is the fleet manager, who does the work.",
    txt({ x:M, y:1.9, w:11.86, h:0.5, fontSize:13, color:MID, lineSpacing:18 }));
  [["For the customer","Total cost of risk","At-fault collisions are the expensive line: repair, third-party liability, vehicle off the road, admin, and the premium consequences. The value is in finding the small number of drivers assumed to carry most of that cost, before the incident rather than after it.","A-20"],
   ["For CameraMatics","Revenue on an installed base we have already paid for","The cameras are fitted, the vehicles connected, the relationship exists. A safety module priced per vehicle per month is uplift at close to zero acquisition cost. More quietly it is retention: contracts churn when the software goes unused, and a weekly habit is the strongest renewal signal we could build.","A-08"],
   ["The upside, not the headline","Insurance","Premium influence depends on an insurer partnership and an agreed evidence standard, and neither is ours to grant. I would carry it as an explicit upside with a named validation step rather than lead with a number I cannot source.","A-06, Q-06"]
  ].forEach(([tag,t,d,a],i)=>{
    const x = M + i*4.02;
    card(s, x, 2.6, 3.74, 3.16, i===2?ACCW:MIST);
    s.addText(tag.toUpperCase(), txt({ x:x+0.28, y:2.82, w:3.2, h:0.24, fontSize:9, bold:true, color:ACC, charSpacing:1.1 }));
    s.addText(t, txt({ x:x+0.28, y:3.1, w:3.2, h:0.62, fontSize:14.5, bold:true, fontFace:H, lineSpacing:19 }));
    s.addText(d, txt({ x:x+0.28, y:3.82, w:3.2, h:1.7, fontSize:11.5, color:MID, lineSpacing:15 }));
    s.addText(a, txt({ x:x+0.28, y:5.5, w:3.2, h:0.24, fontSize:10, bold:true, color:ACC }));
  });
  s.addText([
    { text:"How I would size it, and why there is no number here yet. ", options:{ bold:true } },
    { text:"Revenue is fitted vehicles times price per vehicle per month times attach rate. Payback is one avoided at-fault collision set against the annual cost of the vehicles it took to find it. Not one of those five inputs is knowable from outside the company. I would have all five in week one, and I would rather show the arithmetic with the gaps marked than fill them in with numbers I made up." }
  ], txt({ x:M, y:6.0, w:11.86, h:0.9, fontSize:12, color:MID, lineSpacing:16 }));
}

/* ═══════════════════════════════════  5  the spine */
{
  const s = light("Grade and route. Nothing gets thrown away.", "The spine");
  const ramp=[[INK,PAPER],["6C757D",PAPER],["AEB4BA",INK],["DFE2E5",INK]];
  [["Critical","Interrupt. The clip uploads without being asked for, and an email goes out carrying almost nothing."],
   ["High","This week's review set. A person watches the clip and decides."],
   ["Medium","Passed to the driver as a group. No conversation, and no entry in the evidence half either."],
   ["Low","Recorded, and counted in the trend. It never reaches the evidence half of a driver record, because nobody looked at it."]].forEach(([t,d],i)=>{
    const y = 1.95 + i*1.1;
    s.addShape(p.ShapeType.rect, { x:M, y, w:1.5, h:0.84, fill:{ color:ramp[i][0] }, line:{ color:ramp[i][0], width:1 } });
    s.addText(t, txt({ x:M, y:y+0.26, w:1.5, h:0.32, fontSize:14, bold:true, align:"center", color:ramp[i][1], fontFace:H }));
    s.addText(d, txt({ x:M+1.78, y:y+0.2, w:5.3, h:0.62, fontSize:13, color:MID, lineSpacing:17 }));
  });
  card(s, 8.3, 1.95, 4.28, 4.34, ACCW);
  s.addText("This started out as a filter", txt({ x:8.6, y:2.2, w:3.7, h:0.6, fontSize:15, bold:true, fontFace:H, color:ACC }));
  s.addText("Most events are noise, so filter them out and show what is left. That was the agent's design and it was the wrong idea.\n\nUnder it, the worst thing that can happen is that we hid something real, and nobody can check that, because the evidence is the thing we hid.\n\nGrading moves the worst case to this: we graded a conversation down to a notification. Which somebody can check, because the event is still there.",
    txt({ x:8.6, y:2.86, w:3.7, h:3.3, fontSize:12.5, color:MID, lineSpacing:17 }));
  foot(s, "Severity decides how much attention something needs. A second, separate label decides what kind of event it was: the driver's doing, not their fault, or something they got right.", 6.5);
}

/* ═══════════════════════════════════  6  the stack */
{
  const s = light("The device decides what to send, the cloud what to show", "Across the stack");
  [["In-cab device","Detect four behaviours on the device itself, in real time: harsh braking, harsh acceleration, harsh cornering, phone in hand. Attach every signal it has, whichever one set the event off. Keep recording in a loop so a clip can still be fetched days later.",
    "The device flags a coarse severity, enough to decide what to push. That is not the grade. Metadata always goes; footage is pushed only for what the device flags high, and for anything collision-grade unconditionally. Everything else waits to be fetched."],
   ["Cloud platform","Take events in without tripping over duplicates or late arrivals. Group related ones together. Apply the real grade, route it, and record why. Fetch video and never lie about whether it is coming.",
    "The grade that decides who sees what lives here, never in firmware. These rules will change weekly for the first few months, and a firmware release is far too slow a way to change a number we are guessing at."],
   ["Web portal","A short, ranked list that can be finished. Honest answers about footage. A way to log a conversation that costs less than not logging it.",
    "It ranks nothing itself and offers no settings. Deciding what deserves attention is our job, not a slider we hand to the customer."]
  ].forEach(([t,d,tr],i)=>{
    const x = M + i*4.02;
    card(s, x, 1.88, 3.74, 3.94);
    s.addText(t, txt({ x:x+0.28, y:2.1, w:3.2, h:0.32, fontSize:15, bold:true, fontFace:H }));
    s.addText(d, txt({ x:x+0.28, y:2.5, w:3.2, h:1.5, fontSize:11.5, color:MID, lineSpacing:15 }));
    s.addText("THE TRADE-OFF", txt({ x:x+0.28, y:4.0, w:3.2, h:0.24, fontSize:9.5, bold:true, color:ACC, charSpacing:1.2 }));
    s.addText(tr, txt({ x:x+0.28, y:4.28, w:3.2, h:1.5, fontSize:11.5, color:MID, lineSpacing:15 }));
  });
  foot(s, "The full outline, with constraints, dependencies and the signals a retrofit device may not have, is in the repository.", 6.28);
}

/* ═══════════════════════════════════  7  story map */
{
  const s = light("The manager's week, and everything underneath it", "The portal, where the depth goes");
  s.addText([
    { text:"Read left to right: what the manager does. Underneath: the story that makes it work. Rows are releases. " },
    link("Every card in the live version opens its requirement on GitHub", REPO+"/blob/main/storymap/index.html")
  ], txt({ x:M, y:1.78, w:11.86, h:0.34, fontSize:12.5, color:MID }));
  img(s, "storymap", 1.55, 2.2, 10.2);
  foot(s, "The first release is a complete walk across the whole row. The bottom row is not a list of things nobody got to: every one is a decision with a record behind it.", 6.8);
}

/* ═══════════════════════════════════  8  the queue */
{
  const s = light("A set that starts full and can be finished", "Review queue, screen 1 of 4");
  s.addText("What you are looking at: the manager's whole week, in a working prototype rather than a design. It is grey and plain because what needed proving is how it behaves. The fixture is a 42-vehicle Dublin fleet.",
    txt({ x:M, y:1.8, w:11.86, h:0.56, fontSize:12.5, color:MID, lineSpacing:17 }));
  img(s, "set", M, 2.44, 6.3);
  [["Ranked, and it ends","A feed is never finished. A list can be cleared, and I would rather design for the state where somebody is done."],
   ["Nothing is hidden","The band counts sit on the same screen. 150 of the 161 were routed without the manager this week. They are counted, they can all be opened, and slide 11 is about what they are allowed to be used for."],
   ["The reason is on the card","Proposed as risk: the vehicle ahead was stationary and in view for 4 seconds. Enough to decide whether it is worth opening, before opening it."],
   ["The first card is where we go next","Critical, top of the list. The next three slides follow that one event through to the driver's record."]].forEach(([t,d],i)=>{
    const y = 2.44 + i*1.06;
    s.addText(t, txt({ x:7.4, y, w:5.22, h:0.3, fontSize:13, bold:true, fontFace:H }));
    s.addText(d, txt({ x:7.4, y:y+0.32, w:5.22, h:0.74, fontSize:11.5, color:MID, lineSpacing:15 }));
  });
  foot(s, "The fixture runs at 161 events across 42 vehicles in a week, which is 0.55 per vehicle per day: the very bottom of the A-02 range, on purpose. Triage that only earns its keep at 450 events a day would not be worth building.", 6.82);
}

/* ═══════════════════════════════════  9  the event */
{
  const s = light("Everything the device recorded, on one page", "Event review, screen 2 of 4");
  s.addText("What you are looking at: the first card from the queue, opened. The evidence is laid out as a plain table above the grading, so the manager can check the reasoning rather than take it on trust. The clip sits at the top because nothing below it should be acted on until it has been watched.",
    txt({ x:M, y:1.8, w:11.86, h:0.56, fontSize:12.5, color:MID, lineSpacing:17 }));
  img(s, "event", M, 2.44, 7.1);
  s.addText("The trigger decides that an event exists. It does not decide what evidence the event carries.",
    txt({ x:8.16, y:2.5, w:4.46, h:0.9, fontSize:14, bold:true, fontFace:H, lineSpacing:20 }));
  s.addText("This one was set off by the brake, and the table marks which row did it. A phone-in-hand event arrives with the same table and a different row marked: the accelerometer is sampling either way, so the trace is attached whether or not it was what triggered anything.\n\nThat is what lets the same event be read as a mistake or as something done well, without a second detector for each. It is also why the reason for the grade fits in one sentence a driver would accept.\n\nWhere an older device cannot spot objects ahead, the panel says so rather than leaving a blank.",
    txt({ x:8.16, y:3.54, w:4.46, h:3.0, fontSize:11.5, color:MID, lineSpacing:16 }));
  foot(s, "Attaching every signal to every event reversed an earlier decision that had cut it out, and two acceptance criteria were already quietly relying on it.", 6.7);
}

/* ═══════════════════════════════════ 10  the decision */
{
  const s = light("The system proposes. The manager decides. Always.", "Event review, screen 3 of 4");
  s.addText("What you are looking at: the same event, at the moment the manager takes responsibility for it. The system's suggestion is written in the panel above the buttons, not marked on one of them, so nothing is pre-chosen and agreeing costs exactly what disagreeing costs.",
    txt({ x:M, y:1.8, w:11.86, h:0.56, fontSize:12.5, color:MID, lineSpacing:17 }));
  img(s, "choice", M, 2.46, 11.86);
  [["Nothing is pre-selected","Whichever way the system leans, the three buttons look identical and sit in the same order every time."],
   ["Effort matches consequence","Recording something as not the driver's fault needs no clip. Crediting or coaching them does, because those two reach a person."],
   ["One click, not two","An earlier version asked the manager to confirm the label after choosing it. Building the screen showed that the second click was a receipt, not a decision, so it went."]
  ].forEach(([t,d],i)=>{
    const x = M + i*4.02;
    card(s, x, 4.94, 3.74, 1.7, i===2?ACCW:MIST);
    s.addText(t, txt({ x:x+0.28, y:5.12, w:3.2, h:0.4, fontSize:13, bold:true, fontFace:H, color:i===2?ACC:INK }));
    s.addText(d, txt({ x:x+0.28, y:5.56, w:3.2, h:0.96, fontSize:11.5, color:MID, lineSpacing:15 }));
  });
  foot(s, "Not the driver's fault is the dangerous label. It removes a conversation, and nobody goes looking for conversations that never happened.", 6.78);
}

/* ═══════════════════════════════════ 11  the record */
{
  const s = light("Evidence and trend, kept apart", "Coaching, screen 4 of 4");
  s.addText("What you are looking at: the record of the driver whose event we just classified, part-way through the week. This is the page a manager would turn round and show them, so every line on it has to be defensible to the person it is about.",
    txt({ x:M, y:1.8, w:11.86, h:0.56, fontSize:12.5, color:MID, lineSpacing:17 }));
  img(s, "driver", M, 2.44, 7.1);
  [["The flaw this fixes","Two decisions taken three days apart said every event counts towards the driver record, and no outcome is recorded until a human classifies it. Both are right. Together they put 150 of 161 events, unreviewed, onto driver records."],
   ["The top half is evidence","Only events a person opened and labelled. Nothing else appears there, so any of it can be shown to the driver as it stands."],
   ["The bottom half is the trend","Every event, including the ones nobody looked at, with that count stated on its face. It feeds the rate over time. It is not something to raise in a conversation."]
  ].forEach(([t,d],i)=>{
    const y = [2.5, 4.02, 5.14][i];
    s.addText(t, txt({ x:8.16, y, w:4.46, h:0.32, fontSize:13.5, bold:true, fontFace:H, color:i===0?ACC:INK }));
    s.addText(d, txt({ x:8.16, y:y+0.36, w:4.46, h:1.12, fontSize:11.5, color:MID, lineSpacing:15 }));
  });
  foot(s, "Nothing unreviewed is ever used in a conversation with a driver. Everything is used in the trend, and the trend says so. That is ADR-0015, written after a review pass found the contradiction.", 6.64);
}

/* ═══════════════════════════════════ 12  a requirement */
{
  const s = light("What ready to build means here", "One requirement, in full");
  s.addText([
    link("US-010", REPO+"/blob/main/brain/requirements/US-010-log-coaching.md", { bold:true }),
    { text:"   Record a coaching conversation from the clip", options:{ bold:true, fontSize:15, fontFace:H } }
  ], txt({ x:M, y:1.8, w:11.86, h:0.34, fontSize:15 }));
  s.addText("As a fleet manager I want to log the conversation in one step while I am looking at the footage, so that recording it costs less than not recording it.",
    txt({ x:M, y:2.2, w:11.86, h:0.44, fontSize:13, color:MID }));
  const ac = [
    "Given the manager has not played the clip, when they try to log a conversation, then the action is unavailable and reads: Watch the clip before recording a conversation.",
    "Given the manager logs a conversation, then three fields are required: the behaviour, what you talked about, and what you agreed.",
    "Given any of the three is empty, when they try to save, then the action is unavailable. Spoke to driver is explicitly not an acceptable record. It is the box-ticking this requirement exists to prevent.",
    "Given a record is saved, then it holds the clip reference, what was discussed and agreed, and the driver's response. Enough for somebody else to see what happened, rather than that something happened.",
    "Given a record is created, then it attaches to the driver, the event and the footage, and can be pulled up as one thing the manager could show the driver."
  ];
  card(s, M, 2.86, 11.86, 2.86);
  s.addText(ac.map((v,i)=>({ text:v, options:{ bullet:true, breakLine:i<ac.length-1 } })),
    txt({ x:M+0.34, y:3.1, w:11.18, h:2.4, fontSize:12, color:MID, lineSpacing:16, paraSpaceAfter:7 }));
  s.addText([
    { text:"Splitting one free-text box into two is a change the prototype forced. ", options:{ bold:true } },
    { text:"You cannot make a form check whether somebody meant it. What you can do is ask the two questions the conversation actually has, because a phrase that describes neither cannot fill both boxes. All fifteen stories are written to this standard, and the wording quoted inside a criterion is the wording that ships." }
  ], txt({ x:M, y:5.92, w:11.86, h:0.8, fontSize:12, color:MID, lineSpacing:16 }));
}

/* ═══════════════════════════════════ 13  phasing */
{
  const s = light("The first release is a thin whole loop", "Prioritisation and phasing");
  [["What ships first","14 of 15 stories. A manager with a queue and no way to act on it has a better dashboard. A manager with a coaching form and no triage has the firehose with extra steps. Neither half is worth shipping on its own."],
   ["What waits, and why","Only the fleet-wide view. A trend drawn over four weeks of something as rare as a collision can only mislead, and one misleading number makes every other number on the page suspect."],
   ["What capacity buys","The three tracks are genuinely concurrent, so more people buy calendar time up to roughly three teams, past which the joins become the constraint. That figure is my judgement, not a measurement. What capacity does not buy is firmware lead time. That is months and it is not ours to schedule."]
  ].forEach(([t,d],i)=>{
    const x = M + i*4.02;
    card(s, x, 1.9, 3.74, 2.5);
    s.addText(t, txt({ x:x+0.28, y:2.12, w:3.2, h:0.32, fontSize:14, bold:true, fontFace:H }));
    s.addText(d, txt({ x:x+0.28, y:2.52, w:3.2, h:1.72, fontSize:11.5, color:MID, lineSpacing:15 }));
  });
  card(s, M, 4.76, 11.86, 1.62, ACCW);
  s.addText("The useful thing the dependencies tell you", txt({ x:M+0.34, y:4.96, w:8, h:0.3, fontSize:13.5, bold:true, fontFace:H, color:ACC }));
  s.addText("The portal does not have to wait for the device. It can be built against fake events from day one, which makes the phases run alongside each other instead of one after another. It is also the only track that produces something to put in front of a fleet manager early enough to change what gets built, so I would start there despite it being last in the data flow.",
    txt({ x:M+0.34, y:5.32, w:11.18, h:0.9, fontSize:12.5, color:MID, lineSpacing:17 }));
  foot(s, "Each boundary is a condition, and here they are. The fleet view opens when an account has four weeks of live data. Audit tooling opens when the manual sample stops being readable in the time available. Re-engagement opens after we have watched a real account go unused, because what to do about it may not be a feature at all.", 6.56);
}

/* ═══════════════════════════════════ 14  metrics */
{
  const s = light("How fast can you know anything?", "Measuring success");
  s.addText("The brief names two readers. The fleet operator owns the outcome and signs the renewal. The fleet manager does the work. They ask different questions on different clocks.",
    txt({ x:M, y:1.8, w:11.86, h:0.44, fontSize:13, color:MID }));
  [["Week 1","Are they opening it, and do they trust what is in it","Us. Says the machine runs, nothing about safety"],
   ["Week 4","Risky events per 1,000 km, which needs mileage the device does not send today. Are the conversations reaching the drivers causing the events","The operator. The first reading worth arguing about, and at one fleet it is still noisy"],
   ["Week 8 to 12","Do coached drivers repeat the behaviour. Is the high-risk group shrinking","The operator. Can be put down to coaching, and slower for it"],
   ["6 to 12 months","Collisions the driver caused, and what claims cost","The operator. What they are actually buying"],
   ["Ongoing","Of the collisions that happen, how many had a warning in front of them","Us. Whether the queue points at the right people at all"]
  ].forEach(([w,what,who],i)=>{
    const y = 2.4 + i*0.82;
    if (i%2===0) s.addShape(p.ShapeType.rect, { x:M, y:y-0.1, w:11.86, h:0.78, fill:{ color:MIST }, line:{ color:MIST, width:1 } });
    s.addText(w, txt({ x:M+0.24, y:y+0.1, w:1.5, h:0.56, fontSize:12.5, bold:true, lineSpacing:15, color: i===1?ACC:INK }));
    s.addText(what, txt({ x:M+1.84, y:y+0.1, w:5.5, h:0.6, fontSize:12, lineSpacing:15 }));
    s.addText(who, txt({ x:M+7.5, y:y+0.1, w:4.3, h:0.6, fontSize:11.5, color:MID, lineSpacing:15 }));
  });
  foot(s, "The repeat rate is computed on a population that includes events nobody reviewed, and the register says so. Collisions cannot be read inside a quarter at one fleet. The events themselves can be read in week one, which is why the ladder starts there.", 6.68);
}

/* ═══════════════════════════════════ 15  risks */
{
  const s = light("Two gates, and three risks this design created", "Risks and assumptions");
  s.addText("The gates. These end it rather than cost money", txt({ x:M, y:1.88, w:5.6, h:0.3, fontSize:14, bold:true, fontFace:H }));
  [["A-02   How many events there are","Breaks the product. If volume is ten times lower than assumed, attention is not the scarce thing and this is a detection product instead. Thirty days of data settles it."],
   ["A-13   That CameraMatics does not triage today","Breaks the story, not the requirements. If they already rank events and never marketed it, a queue is still a queue, but the framing falls apart in front of the person who built the thing. One question answers it."]
  ].forEach(([t,d],i)=>{
    const y = 2.3 + i*1.42;
    card(s, M, y, 5.6, 1.26, MIST);
    s.addText(t, txt({ x:M+0.26, y:y+0.16, w:5.1, h:0.28, fontSize:12.5, bold:true, color:ACC }));
    s.addText(d, txt({ x:M+0.26, y:y+0.46, w:5.1, h:0.72, fontSize:11, color:MID, lineSpacing:14 }));
  });
  s.addText("I would rather be wrong about the second. Being wrong about that costs a conversation. Being wrong about the first costs the premise.",
    txt({ x:M, y:5.2, w:5.6, h:0.62, fontSize:11.5, color:MID, lineSpacing:15 }));
  s.addText("Risks this design created", txt({ x:7.0, y:1.88, w:5.6, h:0.3, fontSize:14, bold:true, fontFace:H }));
  [["Grading something down too far","Grading instead of filtering moved the worst case rather than removing it: an event that deserved a conversation, sent out as a notification."],
   ["Neutral is the cheapest click on the screen","Not their doing needs no clip and opens no conversation, so a manager under pressure can empty the week honestly in form. R-15, added after a reviewer found it. Detect it with a neutral rate per manager rather than obstruct it with a required reason."],
   ["Footage of identifiable people, in the EU","R-04. Lawful basis, DPIA, retention and access control, plus works councils in some markets. Q-06 is blocking: a market that cannot use footage for coaching needs a metadata-only variant, and that changes the requirements rather than the date."]
  ].forEach(([t,d],i)=>{
    const y = 2.3 + i*1.46;
    card(s, 7.0, y, 5.58, 1.34, i===2?ACCW:MIST);
    s.addText(t, txt({ x:7.26, y:y+0.16, w:5.08, h:0.28, fontSize:12.5, bold:true, color:i===2?ACC:INK }));
    s.addText(d, txt({ x:7.26, y:y+0.46, w:5.08, h:0.72, fontSize:11, color:MID, lineSpacing:14 }));
  });
  foot(s, "26 assumptions, 15 risks and 10 open questions are registered, each with what breaks if it is wrong and how to check it. One more this design created is in the register and not on this slide: praise that was not earned. R-14, a driver judged on events nobody looked at, is slide 11.", 6.72);
}

/* ═══════════════════════════════════ 16  week one */
{
  const s = light("Six questions I would not commit engineering without", "Week one");
  [["Does the portal already rank events?","Commercial","The framing of this whole submission. Asked out loud, first, before defending anything."],
   ["How many events does the firmware really produce?","Engineering","Whether this is a triage product at all. If the number is low, we stop and I rewrite the brief."],
   ["Which devices can run the detection?","Engineering","Whether the first release is software or a hardware programme, and whether recognition makes it in."],
   ["How do you know who was driving, and how often?","Engineering","Assumed solved for this exercise. If it is not, the release splits: review ships, coaching waits."],
   ["What is the legal basis in each market?","Legal","Which markets can use footage for coaching at all. One that cannot needs a different product."],
   ["What does a manager's week actually look like?","Customer","What we are allowed to claim we replace, and the rhythm the set is built around."]
  ].forEach(([q,a,d],i)=>{
    const x = M + (i%2)*6.06, y = 1.84 + Math.floor(i/2)*1.58;
    num(s, x, y+0.04, i+1);
    s.addText(q, txt({ x:x+0.5, y, w:4.3, h:0.5, fontSize:13, bold:true, fontFace:H, lineSpacing:17 }));
    s.addText(a.toUpperCase(), txt({ x:x+4.84, y:y+0.04, w:0.94, h:0.24, fontSize:8.5, bold:true, color:ACC, align:"right", charSpacing:0.8 }));
    s.addText(d, txt({ x:x+0.5, y:y+0.56, w:5.28, h:0.8, fontSize:11.5, color:MID, lineSpacing:15 }));
  });
  foot(s, "A question whose answer only moves a date was never blocking. Four of these change the plan. The other two change what we are allowed to claim.", 6.62);
}

/* ═══════════════════════════════════ 17  the product brain */
{
  const s = light("All of it came out of a repository you can open", "How I work");
  s.addText("This is how I run a product function, not something built for this exercise. Every claim in this deck points at a file in here, and every file says who wrote it, who decided it, and whether it has been challenged yet.",
    txt({ x:M, y:1.8, w:11.86, h:0.5, fontSize:13.5, color:MID, lineSpacing:19 }));

  [["The documents","26 assumptions, each with a confidence rating, what breaks if it is wrong, and how to check it.\n\n15 decisions, each with the options it beat and the cost it accepts.\n\n15 user stories, 15 risks, 10 open questions, 17 measures. 98 cross-referenced IDs in all."],
   ["The skills","Nine recipes, one for each kind of document, setting out how it gets written and what makes a bad one.\n\nFive came from my own working repository and are used daily on a live codebase. Four were written here, because this exercise needed kinds of document I did not already have a recipe for."],
   ["The validator","A script that fails the build if a story moves no measure, a risk has no mitigation, a link points nowhere, or an assumption is never used.\n\nIt runs on every push. It is the most automated thing here and every rule inside it was a human decision about what good looks like."]
  ].forEach(([t,d],i)=>{
    const x = M + i*4.02;
    card(s, x, 2.46, 3.74, 3.2, i===2?ACCW:MIST);
    s.addText(t, txt({ x:x+0.28, y:2.7, w:3.2, h:0.34, fontSize:15.5, bold:true, fontFace:H, color:i===2?ACC:INK }));
    s.addText(d, txt({ x:x+0.28, y:3.14, w:3.2, h:2.4, fontSize:11.5, color:MID, lineSpacing:15 }));
  });

  s.addText([
    { text:"Open it:   " , options:{ bold:true, color:INK } },
    link("the repository", REPO),
    { text:"      " },
    link("the clickable prototype", REPO+"/blob/main/prototype/index.html"),
    { text:"      " },
    link("the story map", REPO+"/blob/main/storymap/index.html"),
    { text:"      " },
    link("the validator", REPO+"/blob/main/scripts/validate.py")
  ], txt({ x:M, y:5.9, w:11.86, h:0.36, fontSize:13 }));
  foot(s, "About six hours of my own focused effort across two days, fitted around other work. The volume is agent output under my direction, and the commit history shows both halves of that honestly.", 6.4);
  s.addNotes("The brain is core to how I work. I want them to actually go and look at it.");
}

/* ═══════════════════════════════════ 18  working with AI */
{
  const s = light("What the agents did, and what they could not decide", "Working with AI");
  const did = ["Gave me the options to choose between","Wrote every document in the repository",
    "Kept 98 cross-referenced IDs in step","Built and ran the validator that checks them",
    "Attacked the work, as a separate reviewer with no memory of writing it","Built the prototype and the 43 tests that check it"];
  const not = ["Choose the problem, or the person we build for","Decide what gets cut from the first release",
    "Set what counts as high severity, which is a fairness question before it is a technical one",
    "Accept a risk on my behalf","Close an open question","Put a model anywhere a rule would do the job"];
  [["What they did", did, MIST, INK],["What they were not allowed to do", not, ACCW, ACC]].forEach(([t,items,fill,c],i)=>{
    const x = M + i*6.06;
    card(s, x, 1.88, 5.8, 3.18, fill);
    s.addText(t, txt({ x:x+0.3, y:2.1, w:5.2, h:0.34, fontSize:15, bold:true, fontFace:H, color:c }));
    s.addText(items.map((v,j)=>({ text:v, options:{ bullet:true, breakLine:j<items.length-1 } })),
      txt({ x:x+0.3, y:2.56, w:5.2, h:2.4, fontSize:12, color:MID, lineSpacing:15, paraSpaceAfter:5 }));
  });
  s.addText([
    { text:"One thing worth admitting. ", options:{ bold:true } },
    { text:"Time was short, so the agents did more of the early research than I would normally let them. The usual shape is the other way round: I reach the conclusions and hand those to the agent as context. Where it went the other way here, I wrote the output down as an assumption rather than a finding, which is why six of the twenty-six assumptions exist at all." }
  ], txt({ x:M, y:5.3, w:11.86, h:0.8, fontSize:12.5, color:MID, lineSpacing:17 }));
  foot(s, "The imbalance is on purpose. Heavy agent use in the process, and a rule that nothing in the product gets a model just because a model was available.", 6.3);
}

/* ═══════════════════════════════════ 19  the catches */
{
  const s = light("Five times the judgement had to be mine", "Where the judgement was");
  s.addText("The judgement log records the decisions where an agent had a view worth arguing with: 29 entries, 9 of them overruled. It does not capture the steering, which happened in conversation before anything was written and is the larger part of the work. What follows is the part you can check.",
    txt({ x:M, y:1.82, w:11.86, h:0.6, fontSize:12.5, color:MID, lineSpacing:17 }));
  const o = [
    ["A frame it missed","J-18","It had built a system that would coach a driver for braking to avoid a child. A tool that only ever finds failure makes being invisible the best a driver can achieve. Recognition is now half the product."],
    ["A number it invented","J-17","A fifteen-minute attention budget, quoted by four documents until it looked sourced, had hardened into a design target. I asked where it came from. It came from nowhere."],
    ["A detail it invented","J-26","Worked examples used a 42 mph zone. No such limit exists. It sat in a skill file, so other documents had copied it before anyone looked, and the prototype carried three of them."],
    ["A lever it reached for","J-27","It found a real imbalance and proposed adding friction to fix it. Marking an event as not the driver's fault means nothing to see here. Making someone type that out buys compliance text, not judgement."],
    ["A question nobody asked","J-29","Rereading after J-26: the whole fixture was British. Coventry street names, mph, UK plates, handed to a Dublin company. Not a wrong fact, a wrong audience, and no validator or adversarial pass can see that. It is a 42-vehicle Dublin fleet now."]
  ];
  o.forEach(([t,id,d],i)=>{
    const x = M + i*2.4;
    card(s, x, 2.64, 2.22, 3.0);
    s.addText(id, txt({ x:x+0.2, y:2.82, w:1.6, h:0.26, fontSize:10, bold:true, color:ACC, charSpacing:1 }));
    s.addText(t, txt({ x:x+0.2, y:3.08, w:1.86, h:0.64, fontSize:12.5, bold:true, fontFace:H, lineSpacing:16 }));
    s.addText(d, txt({ x:x+0.2, y:3.8, w:1.86, h:1.96, fontSize:10, color:MID, lineSpacing:13 }));
  });
  card(s, M, 5.9, 11.82, 1.1, ACCW);
  s.addText([
    { text:"And the one a fresh reviewer found, not me. ", options:{ bold:true, color:ACC } },
    { text:"My prototype was making things up: confirming a driver had avoided harm wrote a fixed sentence onto their record, the wrong day, the wrong road, the wrong thing done, under a named manager's confirmation with a clip attached. Found in eleven minutes by an agent that had never seen the work. Five review passes in all, 53 findings on the repository itself, and every one of them is written down there." }
  ], txt({ x:M+0.3, y:6.08, w:11.22, h:0.86, fontSize:11.5, color:MID, lineSpacing:15 }));
}

/* ═══════════════════════════════════ 20  mapping + close */
{
  const s = dark();
  s.addText("Where each part of the brief is answered", txt({ x:M, y:0.66, w:11.86, h:0.5, fontSize:28, bold:true, color:PAPER, fontFace:H }));
  [["1   Product brief and business case","Slides 2, 3, 4 and 14", "brain/business-case.md"],
   ["2   Solution outline across the stack","Slides 5 and 6", "brain/stack-outline.md"],
   ["3   Detailed portal requirements","Slides 7 to 12", "brain/requirements/"],
   ["4   Prioritisation and phasing","Slides 7 and 13", "brain/phasing.md"],
   ["5   Risks, assumptions, open questions","Slides 3, 15 and 16", "brain/risks-narrative.md"],
   ["Working with AI","Slides 17 to 19", "brain/judgement-log.md"]
  ].forEach(([a,b,f],i)=>{
    const y = 1.5 + i*0.68 + (i===5?0.26:0);
    s.addText(a, txt({ x:M, y, w:4.9, h:0.3, fontSize:13.5, bold:true, color: i===2?ACC:PAPER }));
    s.addText(b, txt({ x:M+5.0, y:y+0.02, w:2.1, h:0.3, fontSize:12, color:"BFC7CF" }));
    s.addText([link(f, REPO+"/blob/main/"+f, { color:"BFC7CF" })], txt({ x:M+7.2, y:y+0.02, w:4.9, h:0.3, fontSize:12 }));
  });
  s.addShape(p.ShapeType.rect, { x:M, y:5.78, w:0.9, h:0.035, fill:{ color:ACC }, line:{ width:0 } });
  s.addText("If the assumption about how many events there are turns out to be wrong, so is the submission. Thirty days of data settles it, and I would want that before committing engineering.",
    txt({ x:M, y:6.06, w:7.6, h:0.72, fontSize:13, color:PAPER, lineSpacing:18 }));
  s.addText([{ text:"Danny Daley, September 2026\n" }, link("github.com/dannydaley76/cameramatics-product-brain", REPO, { color:"BFC7CF" })],
    txt({ x:8.9, y:6.06, w:3.72, h:0.7, fontSize:11, color:"AAB2BA", align:"right", lineSpacing:15 }));
}

p.writeFile({ fileName:"/home/claude/deck/cameramatics-danny-daley.pptx" }).then(f=>console.log("written:",f));
