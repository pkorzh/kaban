const { tokens, tree } = require('./ast')

function resolve(astb) {

	if (astb.tag === 'bool') {
		return generate(astb)
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
		const lVal = astb.left.lexeme === 'key' || astb.left.lexeme === 'createdAt' || astb.left.lexeme === 'updatedAt'
			? astb.left.lexeme
			: `${astb.left.lexeme}.key`

		const rVal = astb.right.lexeme
			? astb.right.lexeme
			: astb.right.map(astb => astb.lexeme)

		return {
			[lVal]: {
				[resolve(astb.op)]: rVal
			}
		}
	}
}

function generate(astb) {
	if (astb.op.lexeme === 'and') {
		return {
			...resolve(astb.left),
			...resolve(astb.right)
		}
	} else if (astb.op.lexeme === 'or') {
		return {$or: [
			resolve(astb.left),
			resolve(astb.right)
		]}
	} else {
		return resolve(astb)
	}
}

export default function(source) {
	if (!source || source.length == 0) {
		return {}
	}

	const _tokens = tokens(source)
	const _tree = tree(_tokens)
	const query = generate(_tree)

	return query
}
