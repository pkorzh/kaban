const { tokens, tree } = require('./ast')

function resolve(astb) {
	const lVal = astb.left.lexeme;

	const rVal = astb.right.lexeme
		? astb.right.lexeme
		: astb.right.map(astb => astb.lexeme);

	return {
		[lVal]: rVal
	};
}

function generate(astb) {
	function branch(astb) {
		return astb.op 
			? generate(astb)
			: resolve(astb);
	}

	if (astb.op.lexeme === 'and' || astb.op.lexeme === 'or') {
		return {
			...branch(astb.left),
			...branch(astb.right),
		};
	} else {
		return resolve(astb);
	}
}

function object(source) {
	if (!source || source.length == 0) {
		return {};
	}

	const _tokens = tokens(source);
	const _tree = tree(_tokens);

	return generate(_tree);
}

export default object;
