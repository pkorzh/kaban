const generateMongo = require('./mongo')
const generatePredicate = require('./predicate')

const tql = 'key  = nzWkQiTtX'

//console.dir(generateMongo(tql, false, null))

console.log(generatePredicate(tql)({key: 'nzWkQiTtX'}))
