import * as a from './a.mjs';
import * as b from './b.mjs';

console.log('a --> ', a);
console.log('b --> ', b);

console.log(b.a === a);