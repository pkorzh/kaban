import * as actions from '@/actions'

export default ({ store }, inject) => {
	const eventSource = new EventSource('/api/server-side-events');

	eventSource.onmessage = function(e) {
		const { event, key } = JSON.parse(e.data);

		switch(event) {
			case 'createTicket':
			case 'patchTicket':
			case 'workflowTransition':
				 return store.dispatch('tickets/fetchOne', `key = ${key}`);

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
