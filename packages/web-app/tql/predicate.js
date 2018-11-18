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
		const appendKey = (lexeme) => ['rank', 'key', 'createdAt', 'updatedAt'].indexOf(lexeme) == -1;

		const lVal = astb.left.lexeme;

		const rVal = astb.right.lexeme
			? astb.right.lexeme
			: astb.right.map(astb => astb.lexeme);

		const op = resolve(astb.op)

		if (op.fn === 'indexOf') {
			return `${JSON.stringify(rVal)}.${op.fn}(obj.${lVal}) !== -1`;
		} else {
			if (appendKey(lVal)) {
				return `obj.${lVal} && obj.${lVal}.key ${op} '${rVal}'`;
			}

			return `obj.${lVal} ${op} '${rVal}'`;
		}
	}
}

function generate(astb) {
	let code = 'return false';

	function branch(astb) {
		return astb.op 
			? generate(astb)
			: resolve(astb);
	}

	if (astb.op.lexeme === 'and') {
		code = `(${branch(astb.left)} && ${branch(astb.right)})`
	} else if (astb.op.lexeme === 'or') {
		code = `(${branch(astb.left)} || ${branch(astb.right)})`
	} else {
		code = `${resolve(astb)}`
	}

	return code;
}

function predicate(source) {
	if (!source || source.length == 0) {
		return new Function('obj', 'return false')
	}

	const _tokens = tokens(source)
	const _tree = tree(_tokens)

	const fnCode = generate(_tree)

	return new Function('obj', `return ${fnCode}`);
}

export default predicate
