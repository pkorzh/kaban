const objectFn = require('./object');
const mongoFn = require('./mongo');
const predicateFn = require('./predicate');

const tql = 'name = "hello"';

console.log(mongoFn.default(tql));
console.log(predicateFn.default(tql).toString());
console.log(objectFn.default(tql));