import moduleFactory from '../module-factory'

export default moduleFactory('users', {
	state: {
		entities: {
			'VCqxX1qOmQ': {
				key: 'VCqxX1qOmQ',
				name: 'Development env. setup'
			},
		}
	},
	actions: {
		getContent({commit, getters}, key) {
			return Promise.resolve(`
				dslf;ksdl;fksdlf;sdf
				sdkfl;sdkfl;sdkfsl;dfkdsf
				sdfk;sdlfksd;lfksdlf;sdkflfksdlf;ksdlf;sdkfsl
				s
				;dfksld;fkl;sdf
				skdf;sdfksd;fksd;flksdf;sdlfksdfsd;lkfsd;lfksdlf
				slkfdsl;dkfl;skdl;fksdl;
			`)
		}
	}
})
