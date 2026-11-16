(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OrionUtils=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const dayMs=86400000;
 function localDate(value){return new Date(String(value).slice(0,10)+'T12:00:00')}
 function addDays(value,days){const date=localDate(value);date.setDate(date.getDate()+days);return date.toISOString().slice(0,10)}
 function allocateTransaction(transaction,start,end){
  const amount=Number(transaction.amount)||0;
  if(transaction.budgetMethod!=='bulk'||!(Number(transaction.coverageDays)>0))return transaction.date>=start&&transaction.date<end?amount:0;
  const coverageEnd=addDays(transaction.date,Number(transaction.coverageDays)),overlapStart=transaction.date>start?transaction.date:start,overlapEnd=coverageEnd<end?coverageEnd:end;
  if(overlapEnd<=overlapStart)return 0;
  return amount*((localDate(overlapEnd)-localDate(overlapStart))/dayMs)/Number(transaction.coverageDays);
 }
 function safeCsvCell(value){let text=String(value??'');if(/^[=+\-@]/.test(text))text="'"+text;return '"'+text.replaceAll('"','""')+'"'}
 function netSavings(transactions){return transactions.reduce((sum,t)=>sum+(t.type==='saving'?Number(t.amount)||0:t.type==='withdrawal'?-(Number(t.amount)||0):0),0)}
 return {addDays,allocateTransaction,safeCsvCell,netSavings};
});
