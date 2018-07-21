import moduleFactory from '../module-factory'

export default moduleFactory({
	state: {
		entities: {
			'create-aws-api': {
				id: 1,
				name: 'Create ☁️ AWS API',
				key: 'create-aws-api',
			},
			'native-feed-profile': {
				id: 2,
				name: 'Native Feed & Profile',
				key: 'native-feed-profile',
			}
		},
		list: [
			'create-aws-api',
			'native-feed-profile'
		]
	}
});
