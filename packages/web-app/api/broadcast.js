import { default as redisClientFactory } from './redis';

import { resolve as resolveUrl } from 'url';

import Notification from './notification';
import { get as getConfig } from './dal/kaban-configuration';

const TEMPLATES = {
	createTicket(ticket, { domain }) {
		return `
*${ticket.reporter.key}* created a \`${ticket.type.key}\`
[${ticket.name}](${resolveUrl(domain, '/tickets/', ticket.key)})

${ticket.description}
		`;
	},

	patchTicket(ticket, { domain }) {
		return `
*${ticket.reporter.key}* modified a \`${ticket.type.key}\`
[${ticket.name}](${resolveUrl(domain, '/tickets/', ticket.key)})
		`;
	},

	workflowTransition({ticket, from, to}, { domain }) {
		return `
*${ticket.reporter.key}* transitioned a \`${ticket.type.key}\` from \`${from.key}\` to \`${to.key}\`
[${ticket.name}](${resolveUrl(domain, '/tickets/', ticket.key)})
		`;
	},

	createBoard(board, { domain }) {
		return `
Someone created a board
[${board.name}](${resolveUrl(domain, '/boards/', board.key)})
		`;
	},

	deleteBoard(board, { domain }) {

	},

	updateBoard(board, { domain }) {

	},

	createBacklog(backlog, { domain }) {
		return `
Someone created a backlog
[${backlog.name}](${resolveUrl(domain, '/backlogs/', backlog.key)})
		`;
	},

	updateBacklog(backlog, { domain }) {

	},
	deleteBacklog(backlog, { domain }) {

	},
}

export default async function broadcast(event, payload) {
	const redis = redisClientFactory();

	redis.publish('server-side-events', JSON.stringify({
		event, 
		...payload,
	}));

	if (!(event in TEMPLATES)) {
		return;
	}

	const config = await getConfig();

	if (!config.notification.type) {
		return;
	}

	const md = TEMPLATES[event].call(null, payload, { ...config.general });

	if (!md) {
		return;
	}

	const notif = Notification.from(config.notification);
	return await notif.sendMessage(md);
}
