const { tokens, tree } = require('./ast');

function resolveOp(astb) {
	switch(astb.lexeme) {
		case '=':
			return '$eq'
		case '!=':
			return '$ne'
		case '>':
			return '$gt'
		case '<':
			return '$lt'
		case '>=':
			return '$gte'
		case '<=':
			return '$lte'
		case 'in':
			return '$in'
		default:
			throw new Error(`Unexpected operator ${astb.lexeme}`)
	}	
}

function resolveDateOp(astb) {
	const [ start, end ] = resolveDate(astb.right);

	switch(astb.op.lexeme) {
		case '=':
			return { [astb.left.lexeme]: {
				$gte: start,
				$lte: end,
			}}
		case '!=':
			return {
				$or: [
					{ [astb.left.lexeme]: { $gt: end } },
					{ [astb.left.lexeme]: { $lt: start } },
				]
			}
		case '>':
			return { [astb.left.lexeme]: {
				$gt: start,
			}}
		case '<':
			return { [astb.left.lexeme]: {
				$lt: end,
			}}
		case '>=':
			return { [astb.left.lexeme]: {
				$gte: start,
			}}
		case '<=':
			return { [astb.left.lexeme]: {
				$lte: end,
			}}
	}
}

function resolveDate(astb) {
	let start = null
	let end = null

	if (astb.tag === 'datevar') {
		switch(astb.lexeme) {
			case 'today':
				start = new Date();
				end = new Date();
				break;
			case 'yesterday':
				start = new Date();
				start.setDate(start.getDate() - 1);
				end = new Date();
				end.setDate(end.getDate() - 1);
				break;
		}
	} else {
		start = new Date(astb.lexeme.getTime());
		end = new Date(astb.lexeme.getTime());
	}

	start.setHours(0,0,0,0);
	end.setHours(23,59,59,999);

	return [start, end];
}

function resolve(astb, expanders) {
	if (astb.right.tag === 'date' || astb.right.tag === 'datevar') {
		return resolveDateOp(astb);
	} else {
		const lVal = astb.left.lexeme === 'rank' || astb.left.lexeme === 'key' || astb.left.lexeme === 'createdAt' || astb.left.lexeme === 'updatedAt'
			? astb.left.lexeme
			: `${astb.left.lexeme}.key`;

		let rVal;

		if (astb.right.map && astb.right.length) {
			rVal = astb.right.map(astb => astb.lexeme);
		} else {
			rVal = astb.right.lexeme
		}

		if (expanders[rVal]) {
			return expanders[rVal].call(null, astb);
		} else {
			return {
				[lVal]: {
					[resolveOp(astb.op)]: rVal
				}
			}
		}
	}
}

function generate(astb, expanders) {
	function branch(astb) {
		return astb.op 
			? generate(astb, expanders)
			: resolve(astb, expanders);
	}

	if (astb.op.lexeme === 'and') {
		return {$and: [
			branch(astb.left),
			branch(astb.right),
		]}
	} else if (astb.op.lexeme === 'or') {
		return {$or: [
			branch(astb.left),
			branch(astb.right),
		]}
	} else {
		return resolve(astb, expanders)
	}
}

export default function(source, expanders = {}) {
	if (!source || source.length == 0) {
		return {}
	}

	//console.log('source', source)

	const _tokens = tokens(source)
	const _tree = tree(_tokens)

	//const util = require('util')
	//console.log(util.inspect(_tree, false, null, true /* enable colors */))

	const query = generate(_tree, expanders)

	//console.log('-----------------------------------')

	//console.log(util.inspect(query, false, null, true /* enable colors */))

	//console.log('=====================================')

	return query
}
