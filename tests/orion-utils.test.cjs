const assert=require('node:assert/strict');
const test=require('node:test');
const {allocateTransaction,safeCsvCell,netSavings}=require('../orion-utils.js');

test('regular purchases count only on their payment date range',()=>{
 assert.equal(allocateTransaction({date:'2026-11-13',amount:15,budgetMethod:'regular'},'2026-11-13','2026-11-20'),15);
 assert.equal(allocateTransaction({date:'2026-11-13',amount:15,budgetMethod:'regular'},'2026-11-20','2026-11-27'),0);
});

test('bulk purchases allocate proportionally across partial weeks',()=>{
 const purchase={date:'2026-11-13',amount:30,budgetMethod:'bulk',coverageDays:30};
 assert.equal(allocateTransaction(purchase,'2026-11-13','2026-11-20'),7);
 assert.equal(allocateTransaction(purchase,'2026-12-11','2026-12-18'),2);
});

test('CSV cells escape quotes and neutralize spreadsheet formulas',()=>{
 assert.equal(safeCsvCell('Rice "5kg"'),'"Rice ""5kg"""');
 assert.equal(safeCsvCell('=HYPERLINK("bad")'),'"\'=HYPERLINK(""bad"")"');
});

test('account transfers change net savings without becoming expenses',()=>{
 assert.equal(netSavings([{type:'saving',amount:920},{type:'withdrawal',amount:100},{type:'expense',amount:50}]),820);
});
