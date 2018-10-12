import {Ticket, User} from './models'
import {mongo as generateMql} from "../../tql"

async function insert (userSlim) {
	const user = new User(userSlim)

	await user.save()

	return user
}

async function query(tql) {
	return await User.find(generateMql(tql))
}

async function count(tql) {
	return await User.find(generateMql(tql)).countDocuments()
}

async function get(query) {
	return await User.findOne(query)
}

async function patch(key, delta) {
	await User.updateOne({ key }, { $set: delta})

	return get({key: {$eq: key}})
}

async function remove(key) {
	await Ticket.updateMany(generateMql(`assignee = ${key}`),
		{$set: { assignee: {key: 'unassigned'}}}
	)

	return await User.deleteOne({ key })
}


export {
	insert,
	query,
	get,
	patch,
	count,
	remove,
}
