// Regression coverage for PR #36's completeness gate and unchanged screening math.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/calculators.js'), 'utf8');
const math = require('../assets/js/calculators.js');
assert.equal(math.costToRun(1000, 2, 0.15).perDay, 0.3);
assert.equal(math.costToRun(0, 24, 0.15).perYear, 0);
assert.equal(math.panelCheck(200, []).remaining, 160);
assert.equal(math.panelCheck(100, [50,30,40]).hasRoom, false);
assert.equal(math.panelCheck(200, [50,30,40]).hasRoom, true);
assert.equal(math.panelCheck(100, [25]).remaining, 60);
assert.equal(math.panelCheck(100, [25]).hasRoom, true);
function scenario(panel, confirmed, loads, missingConfirm = false) {
 const ids = {};
 for (const id of ['pc-panel','pc-confirm','pc-est','pc-usable','pc-remaining','pc-verdict','pc-verdict-title','pc-verdict-body']) {
  const classes = new Set(); ids[id] = {value: '', checked: false, textContent: '', addEventListener(type, fn) {this[type] = fn;}, classList:{add: x => classes.add(x), remove: x => classes.delete(x), contains: x => classes.has(x)}};
 }
 ids['pc-panel'].value = panel;
 ids['pc-confirm'].checked = confirmed;
 if (missingConfirm) delete ids['pc-confirm'];
 const loadNodes = loads.map(value => ({value: String(value), checked:true, addEventListener(){}}));
 vm.runInNewContext(source, {document: {getElementById: id => ids[id] || null, querySelectorAll: sel => sel === '.pc-load' ? loadNodes : []}});
 return ids;
}
for (const [panel,confirm,loads,missing,expected] of [
 ['',false,[],false,'gate'], ['',true,[],false,'gate'], ['200',false,[],false,'gate'],
 ['200',false,[10],false,'gate'], ['200',true,[],true,'gate'],
 ['200',true,[50,30,40],false,'ok'], ['100',true,[50,30,40],false,'warn'], ['100',true,[25],false,'ok']
]) {
 const ids=scenario(panel,confirm,loads,missing);
 assert.equal(ids['pc-verdict'].classList.contains('ok'),expected==='ok');
 if (expected==='gate') assert.match(ids['pc-verdict-title'].textContent,/more info needed/);
 if (!panel) for (const id of ['pc-est','pc-usable','pc-remaining']) assert.equal(ids[id].textContent,'—');
 if (expected==='ok') assert.match(ids['pc-verdict-body'].textContent,/does not offer EV charger circuits or panel upgrades/);
}
const ids=scenario('200',true,[]);
ids['pc-confirm'].checked=false; ids['pc-confirm'].change();
assert.equal(ids['pc-verdict'].classList.contains('ok'),false);
ids['pc-panel'].value=''; ids['pc-panel'].change();
assert.equal(ids['pc-remaining'].textContent,'—');
console.log('PASS: 7 math assertions, 8 DOM scenarios, confirmation revocation and panel reset.');
