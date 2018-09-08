import { utc } from 'moment'

export default function ({ $axios, redirect, store }) {
	$axios.onRequest(config => {
	})

	$axios.onResponse(({config, data, headers}) => {
		const enrich = item => {
			if (item.type && item.type.key) {
				item.type = store.getters['tickettypes/getOne'](item.type.key)
			}

			if (item.assignee && item.assignee.key) {
				item.assignee = store.getters['users/getOne'](item.assignee.key)
			}

			if (item.reporter && item.reporter.key) {
				item.reporter = store.getters['users/getOne'](item.reporter.key)
			}

			if (item.backlog && item.backlog.key) {
				item.backlog = store.getters['backlogs/getOne'](item.backlog.key)
			}

			if (item.status && item.status.key) {
				item.status = store.getters['status/getOne'](item.status.key)
			}

			if (item.priority && item.priority.key) {
				item.priority = store.getters['priorities/getOne'](item.priority.key)
			}

			if (item.createdAt) {
				item.createdAt = utc(item.createdAt)
			}

			if (item.updatedAt) {
				item.updatedAt = utc(item.updatedAt)
			}

			if (item.resolvedAt) {
				item.resolvedAt = utc(item.resolvedAt)
			}

			if (item.hardDeadlineAt) {
				item.hardDeadlineAt = utc(item.hardDeadlineAt)
			}

			if (item.lastTransitionAt) {
				item.lastTransitionAt = utc(item.lastTransitionAt)
			}
		}

		if (Array.isArray(data)) {
			for (let item of data) {
				enrich(item)
			}
		} else {
			enrich(data)
		}

		console.debug(data)
	})

	$axios.onError(error => {
	})
}
