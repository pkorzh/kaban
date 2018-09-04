const { tokens, tree } = require('./ast')

function resolve(astb) {

	if (astb.tag === 'bool') {
		return generate(astb)
	} else if (astb.tag === 'op') {
		switch(astb.lexeme) {
			case 'in':
				return {
					fn: 'indexOf'
				}
			case '=':
				return '=='
			default:
				return astb.lexeme
		}
	} else {
		const lVal = astb.left.lexeme === 'key'
			? astb.left.lexeme
			: `${astb.left.lexeme}.key`

		const rVal = astb.right.lexeme
			? astb.right.lexeme
			: astb.right.map(astb => astb.lexeme)

		const op = resolve(astb.op)

		if (op.fn === 'indexOf') {
			return `${JSON.stringify(rVal)}.${op.fn}(obj.${lVal}) !== -1`
		} else {
			return `obj.${lVal} ${op} '${rVal}'`
		}
	}
}

function generate(astb) {
	let code = 'return false'

	if (astb.op.lexeme === 'and') {
		code =  `${resolve(astb.left)} && ${resolve(astb.right)}`
	} else if (astb.op.lexeme === 'or') {
		code =  `${resolve(astb.left)} || ${resolve(astb.right)}`
	} else {
		code = `${resolve(astb)}`
	}

	return `return ${code};`
}

module.exports = function(source) {
	if (!source || source.length == 0) {
		return new Function('obj', 'return false')
	}

	const _tokens = tokens(source)
	const _tree = tree(_tokens)

	const fnCode = generate(_tree)

	return new Function('obj', fnCode);

}
