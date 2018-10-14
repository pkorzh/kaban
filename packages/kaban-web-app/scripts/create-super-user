#!/usr/bin/env node

require('../api/dal/connect')
const {users: usersDal} = require('../api/dal/users')

const shortid = require('shortid')

async function main() {
	usersDal.insert({
		key: shortid.generate(),
		name: 'Administrator',
		description: 'Administrator',
		scope: 'user admin',
		email: 'admin@admin.com',
		password: 'password123'
	})

	console.log('Done.')
}

main()
