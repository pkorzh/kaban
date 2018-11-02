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
	} else {
		const lVal = astb.left.lexeme === 'rank' || astb.left.lexeme === 'key' || astb.left.lexeme === 'createdAt' || astb.left.lexeme === 'updatedAt'
			? astb.left.lexeme
			: `${astb.left.lexeme}.key`

		const rVal = astb.right.lexeme
			? astb.right.lexeme
			: astb.right.map(astb => astb.lexeme)

		const rValExpanded = expanders[rVal] ? expanders[rVal].apply(null) : rVal;

		return {
			[lVal]: {
				[resolve(astb.op)]: rValExpanded
			}
		}
	}
}

function generate(astb, expanders) {
	if (astb.op.lexeme === 'and') {
		return {
			...resolve(astb.left, expanders),
			...resolve(astb.right, expanders)
		}
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
	const query = generate(_tree, expanders)

	return query
}
