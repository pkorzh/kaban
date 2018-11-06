import { TicketAttachment } from '../models'

import { mongo as generateMql } from '../../../tql'

export async function query(tql) {
	return await TicketAttachment.find(generateMql(tql))
}

export async function get(tql) {
	const attachment = await query(tql)

	if (attachment.length !== 1) {
		throw new Error('Get returned multiple elements')
	}

	return attachment[0]
}


export async function insert(attachmentSlim) {
	const attachment = new TicketAttachment(attachmentSlim)
	await attachment.save()
	return attachment
}


export async function patch(key, delta) {
	await TicketAttachment.update({ key }, { $set: delta})
	return get(`key = ${key}`)
}

export async function remove(key) {
	await TicketAttachment.deleteOne({ key })
}
