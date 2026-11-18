const assert=require('node:assert/strict');
const fs=require('node:fs');
const test=require('node:test');
const vm=require('node:vm');

const html=fs.readFileSync('gym-guide.html','utf8');
const match=html.match(/const exercises = (\[[\s\S]*?\n\]);\nfunction anatomy/);
if(!match)throw new Error('Exercise data was not found');
const context={};
vm.runInNewContext(`exercises=${match[1]}`,context);
const exercises=context.exercises;

test('uses the requested four-day body-part split',()=>{
 const names=Object.fromEntries(exercises.map(x=>[x.day,x.dayName]));
 assert.deepEqual({...names},{Monday:'Chest & Triceps',Tuesday:'Back & Biceps',Thursday:'Legs, Hips & Arms',Saturday:'Shoulders, Arms & Core'});
});

test('every workout includes short cardio',()=>{
 for(const day of ['Monday','Tuesday','Thursday','Saturday']){
  const cardio=exercises.find(x=>x.day===day&&x.muscles.includes('Cardio'));
  assert.ok(cardio,`${day} is missing cardio`);
  assert.match(cardio.sets,/8–12|10–15/);
 }
});

test('program includes hips, abs and plank exercises',()=>{
 assert.ok(exercises.some(x=>x.muscles.includes('Hips')));
 assert.ok(exercises.some(x=>/crunch|dead bug/i.test(x.name)));
 assert.ok(exercises.some(x=>/plank/i.test(x.name)));
});

test('old upper/lower labels are removed',()=>{
 assert.doesNotMatch(html,/Upper A|Upper B|Lower A|Lower B/);
});
