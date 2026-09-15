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
const PAGE = 'file://' + require('path').resolve(__dirname, '..', 'index.html');
const A=(l,c,x='')=>console.log((c?'PASS  ':'FAIL  ')+l+(x?' :: '+x:''));
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1200,height:1500}});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://' + require('path').resolve(__dirname, '../index.html') + '');
  const T=async s=>(await p.locator(s).first().innerText()).replace(/\s+/g,' ');

  await p.locator('.card',{hasText:'one trip'}).click();
  await p.locator('#screen .card').first().click();
  A('breadcrumb returns to the group', (await T('.crumb')).includes('5 events, one trip'));
  A('position shown', /event 1 of 5/.test(await T('.crumb')), await T('.crumb'));
  A('next-event button present', await p.locator('button.act',{hasText:'Next event'}).count()===1);
  A('dismiss-the-rest present', await p.locator('button.act',{hasText:'Dismiss the remaining 4'}).count()===1);

  await p.locator('button.link',{hasText:'5 events, one trip'}).click();
  A('back at the group screen', (await T('#screen h2')).includes('5 events, one trip'));

  // work one, land on the next automatically
  await p.locator('#screen .card').first().click();
  await p.locator('button.act',{hasText:'Play clip'}).click();
  await p.locator('button.act[data-act="chooseRisk"]').click();
  await p.locator('button.act',{hasText:'Dismiss with a reason'}).click();
  await p.fill('#dr','Stationary traffic behind the temporary signals.');
  await p.locator('#dgo').click();
  A('actioning one lands on the next in the group', (await T('.crumb')).includes('event 2 of 5'), await T('.crumb'));
  A('progress shown in the crumb', (await T('.crumb')).includes('1 done'));

  // next-event navigation
  await p.locator('button.act',{hasText:'Next event'}).click();
  A('next-event moves on', (await T('.crumb')).includes('event 3 of 5'), await T('.crumb'));

  // bail out to the group and sweep the rest
  await p.locator('button.act',{hasText:'Dismiss the remaining'}).click();
  A('group screen shows what is left', (await T('#screen')).includes('4 left to look at'));
  A('and what is done', (await T('#screen')).includes('1 already handled'));
  await p.fill('#br','Resurfacing with temporary signals the whole length. Same trip, same cause.');
  A('sweep button names the remainder', (await T('#bgo')).includes('Dismiss the remaining 4'), await T('#bgo'));
  await p.locator('#bgo').click();
  A('group gone from the set', !(await T('#screen')).includes('one trip'));

  const notes = await T('#readout');
  console.log('NOTES:', notes.slice(0,200));
  A('sweep counted as 4 events, 1 decision', /Dismissals, per decision M-09 100%/.test(notes));
  console.log('ERRORS:', errs.length?errs.join('|'):'none');
  await p.screenshot({path:'v6-group.png', fullPage:true});
  await b.close();
})();
