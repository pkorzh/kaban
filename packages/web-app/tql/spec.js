const objectFn = require('./object');
const mongoFn = require('./mongo');
const predicateFn = require('./predicate');

const tql = 'backlog = KABAN and type in [story,bug] and rank > "1910000"';

console.log(mongoFn.default(tql));
console.log(predicateFn.default(tql).toString());
console.log(objectFn.default(tql));