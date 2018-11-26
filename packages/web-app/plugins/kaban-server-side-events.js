import * as actions from '@/actions'

export default ({ store }, inject) => {
	const eventSource = new EventSource('/api/sse');

	eventSource.onmessage = function(e) {
		const { event, key, ticket } = JSON.parse(e.data);

		switch(event) {
			case 'createTicket':
			case 'patchTicket':
				return store.dispatch('tickets/fetchOne', `key = ${key}`);

			case 'workflowTransition':
				return store.dispatch('tickets/fetchOne', `key = ${ticket.key}`);

			case 'createBoard':
			case 'updateBoard':
				return store.dispatch('boards/fetchOne', `key = ${key}`);

			case 'createBacklog':
			case 'updateBacklog':
				return store.dispatch('backlogs/fetchOne', `key = ${key}`);

			case 'deleteBacklog':
			case 'deleteBoard':
				console.error(event, payload);
				return;
		};
	};
}
