import Notification from './notification';
import { notificationConfig } from './dal/kaban-configuration';

const TEMPLATES = {
	createTicket(ticket) {
		return `
*${ticket.reporter.key}* created a \`${ticket.type.key}\`
[${ticket.name}](https://kaban.app/${ticket.key})

${ticket.description}
		`;
	},

	patchTicket(ticket) {
		return `
*${ticket.reporter.key}* modified a \`${ticket.type.key}\`
[${ticket.name}](https://kaban.app/${ticket.key})
		`;
	},

	workflowTransition({ticket, from, to}) {
		return `
*${ticket.reporter.key}* transitioned a \`${ticket.type.key}\` from \`${from.key}\` to \`${to.key}\`
[${ticket.name}](https://kaban.app/${ticket.key})
		`;
	}
}

export default async function broadcast(event, payload) {
	if (!event in TEMPLATES) {
		return;
	}

	const nConfig = await notificationConfig();

	if (!nConfig) {
		return;
	}

	const md = TEMPLATES[event].call(null, payload);
	const notif = Notification.from(nConfig);

	return await notif.sendMessage(md);
}