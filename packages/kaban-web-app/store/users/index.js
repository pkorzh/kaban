import moduleFactory from '../module-factory'

export default moduleFactory('users', {
	state: {
		entities: {
			'platon.korzh': {
				id: 1,
				key: 'platon.korzh',
				name: 'Platon Korzh',
				email: 'platon@korzh.io',
				avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
				active: true,
			}
		}
	}
})
