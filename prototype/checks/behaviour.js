/* Behaviour checks for prototype/index.html.
 *
 * These assert the acceptance criteria that can be asserted: exact strings quoted
 * in the stories, gates that must hold, and the arithmetic in the notes panel.
 * Same argument as scripts/validate.py one layer out — every rule here was a
 * human judgement about what good looks like, written so a machine can check it
 * (canon C-26). Each assertion traces to a finding in
 * reviews/2026-09-14-prototype.md.
 *
 * Run: npm i -D playwright && npx playwright install chromium && node <file>
 */

const { chromium } = require('playwright');
const A = (label, cond, extra='') => console.log((cond?'PASS  ':'FAIL  ')+label+(extra?' :: '+extra:''));
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:1200,height:1500} });
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  const load = async () => { await p.goto('file:///home/claude/prototype/index.html'); };
  const T = async s => (await p.locator(s).first().innerText()).replace(/\s+/g,' ');
  const body = () => p.locator('#screen').innerText();
  await load();

  // F12 — ordering really is by severity
  const order = await p.locator('#screen .card .title').allInnerTexts();
  A('F12 severity order (critical first, group last-ish)', order[0].includes('Hard braking'));
  const lines = await p.locator('#screen .card').allInnerTexts();
  A('F12 E-127 (0.83g) above E-121 (0.71g)',
     lines.findIndex(l=>l.includes('Mill Lane')) < lines.findIndex(l=>l.includes('Coldharbour')));

  // F5 — equal button weight, one click per classification
  await p.locator('.card',{hasText:'Coldharbour'}).click();
  const btns = p.locator('button.act[data-act^="choose"]');
  const hs = [];
  for (const b2 of await btns.all()) hs.push((await b2.boundingBox()).height);
  A('F5 all three classification buttons equal height', new Set(hs).size===1, hs.join('/'));
  const blab = await p.locator('button.act[data-act^="choose"]').allInnerTexts();
  A('F5 no proposal marking on any button', !blab.some(l=>l.indexOf('proposal')>=0));

  // F1 — recognition text comes from the event
  await load();
  await p.locator('.card',{hasText:'Farnham'}).click();          // E-150, Joe Mensah, proposed neutral
  await p.locator('button.act',{hasText:'Play clip'}).click();
  await p.locator('button.act[data-act="chooseCredit"]').click();
  const joe = await body();
  A('F1 Joe’s recognition is not the Mill Lane string', !joe.includes('Mill Lane'));
  A('F1 Joe’s recognition names his own event', joe.includes('Farnham Road'));
  A('F1 human-spotted credit marked as such', joe.includes('spotted by the manager'));

  // credit gated on watching
  await load();
  await p.locator('.card',{hasText:'Farnham'}).click();
  A('F5 credit disabled before the clip is played',
     await p.locator('button.act[data-act="chooseCredit"]').isDisabled());
  A('neutral needs no clip', !(await p.locator('button.act[data-act="chooseNeutral"]').isDisabled()));

  // F2 — coaching needs all three required fields
  await load();
  await p.locator('.card',{hasText:'Coldharbour'}).click();
  await p.locator('button.act',{hasText:'Play clip'}).click();
  await p.locator('button.act[data-act="chooseRisk"]').click();
  await p.locator('button.act',{hasText:'Log coaching'}).click();
  await p.fill('#disc','Spoke to driver');
  A('F2 save still blocked with only one field', await p.locator('#cgo').isDisabled());
  await p.fill('#agr','She leaves more room on that approach and comes off the accelerator earlier.');
  A('F2 save enabled once both are filled', !(await p.locator('#cgo').isDisabled()));
  await p.fill('#beh','');
  A('F2 behaviour is genuinely required', await p.locator('#cgo').isDisabled());
  await p.fill('#beh','Hard braking');
  await p.locator('#cgo').click();
  A('F2 record shows both halves', (await body()).includes('Talked about.') && (await body()).includes('Agreed.'));

  // F3 — a sweep manufactures no confirmations
  await load();
  await p.locator('.card',{hasText:'one trip'}).click();
  A('F13 group lists all five openably', await p.locator('#screen .card').count()===5);
  await p.fill('#br','Resurfacing on Ashby Road with temporary signals the whole length. Same trip, same cause.');
  await p.locator('#bgo').click();
  const notes1 = await T('#readout');
  A('F3 sweep adds no confirmations', /Times you agreed with the system\s+M-11\s+0 of 0/.test(notes1));
  A('F15 M-09 splits after a sweep alone',
     /per judgement 100%/.test(notes1) && /per event 100%/.test(notes1) === false
     || notes1.includes('5 swept, 0 read'), notes1.slice(0,90));
  A('F15 breach is stated', notes1.includes('It has flipped.'));

  // F4 — unclassify removes this event's entry, not the last one
  await load();
  await p.locator('.card',{hasText:'Coldharbour'}).click();
  await p.locator('button.act[data-act="chooseRisk"]').click();          // matches proposal
  await p.locator('button.link',{hasText:'Review set'}).click();
  await p.locator('.card',{hasText:'Ladywell'}).click();
  await p.locator('button.act',{hasText:'Play clip'}).click();
  await p.locator('button.act[data-act="chooseCredit"]').click();        // changed from risk
  await p.locator('button.link',{hasText:'Review set'}).click();
  await p.locator('.card',{hasText:'Coldharbour'}).click();
  await p.locator('button.link',{hasText:'Change the classification'}).click();
  await p.locator('button.act[data-act="chooseRisk"]').click();
  const notes2 = await T('#readout');
  A('F4 counter is 1 of 2 after reclassify round-trip', /Times you agreed with the system\s+M-11\s+1 of 2/.test(notes2));

  // F9 — retention consistency
  await load();
  await p.locator('.card',{hasText:'closed unreviewed last week'}).click();
  const closed = await body();
  A('F9 2 Sept expired', /Tuesday 2 September[\s\S]*?no longer available/.test(closed));
  A('F9 4 Sept still available', /Thursday 4 September[\s\S]*?still available/.test(closed));

  // F10 — no "recorded" placeholders on closed events
  await p.locator('.card',{hasText:'Brook Street'}).click();
  const sig = await T('.signals');
  A('F10 closed event carries real signals', !/\brecorded\b/.test(sig) && sig.includes('0.73 g'), sig.slice(0,80));
  A('F10 no invented range figure anywhere', !(await p.content()).includes('60 m'));

  // F11 — no-forward-detection device still has footage, copy is coherent
  await load();
  await p.locator('.card',{hasText:'Ladywell'}).click();
  const alan = await body();
  A('F11 device records the road but cannot flag objects', alan.includes('object detection is not supported'));
  A('F11 classification reason matches', alan.includes('cannot flag what is in it'));

  // F6/F7 — fetching copy carries US-007's exact clause and no push/fetch contradiction
  await load();
  await p.locator('.card',{hasText:'M40'}).click();
  const f = await T('.footage');
  A('F6 exact US-007 fetching string', f.includes('Footage is on its way. This page will update when it arrives. You can still dismiss this event.'));
  A('F7 no "requested rather than pushed"', !f.includes('requested rather than pushed'));
  A('F7 no contradictory watch-the-clip hint', !(await body()).includes('Watch the clip before recording a conversation'));

  // F19 — provenance on the artefact
  await load();
  A('F19 provenance line present', (await p.locator('.shell').innerText()).includes('adversarial pass ran'));
  A('fleet size stated', (await p.locator('.appbar').innerText()).includes('42 vehicles'));

  // notes toggle lives with the notes
  const tb = await p.locator('#notesbtn').boundingBox();
  const nb = await p.locator('#notes').boundingBox();
  A('toggle sits inside the notes panel', tb.x > nb.x && tb.y > nb.y);

  console.log('ERRORS:', errs.length?errs.join(' | '):'none');
  await p.screenshot({path:'v3-event.png', fullPage:true});
  await b.close();
})();
