const { tokens, tree } = require('./ast')

function resolve(astb, expanders) {

	if (astb.tag === 'bool') {
		return generate(astb, expanders)
	} else if (astb.tag === 'op') {
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
	} else if (astb.tag === 'date' || astb.tag == 'datevar') {
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
	} else {
		const lVal = astb.left.lexeme === 'rank' || astb.left.lexeme === 'key' || astb.left.lexeme === 'createdAt' || astb.left.lexeme === 'updatedAt'
			? astb.left.lexeme
			: `${astb.left.lexeme}.key`;

		let rVal;

		if (astb.right.map && astb.right.length) {
			rVal = astb.right.map(astb => astb.lexeme);
		} else if (astb.right.tag === 'date' || astb.right.tag === 'datevar') {
			const [ start, end ] = resolve(astb.right);

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
		} else {
			rVal = astb.right.lexeme
		}

		if (expanders[rVal]) {
			return expanders[rVal].call(null, astb);
		} else {
			return {
				[lVal]: {
					[resolve(astb.op)]: rVal
				}
			}
		}
	}
}

function generate(astb, expanders) {
	if (astb.op.lexeme === 'and') {
		return {$and: [
			resolve(astb.left, expanders),
			resolve(astb.right, expanders)
		]}
	} else if (astb.op.lexeme === 'or') {
		return {$or: [
			resolve(astb.left, expanders),
			resolve(astb.right, expanders)
		]}
	} else {
		return resolve(astb, expanders)
	}
}

export default function(source, expanders = {}) {
	if (!source || source.length == 0) {
		return {}
	}

	const _tokens = tokens(source)
	const _tree = tree(_tokens)

	//const util = require('util')
	//console.log(util.inspect(_tree, false, null, true /* enable colors */))

	const query = generate(_tree, expanders)

	//console.log(util.inspect(query, false, null, true /* enable colors */))

	//console.log('-----------------------------------')

	return query
}
