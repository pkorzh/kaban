import { utc } from 'moment'
import Vue from 'vue'


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

			if (item.author && item.author.key) {
				item.author = store.getters['users/getOne'](item.author.key)	
			}

			if (item.user && item.user.key) {
				item.user = store.getters['users/getOne'](item.user.key)	
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

			if (item.resolution && item.resolution.key) {
				item.resolution = store.getters['resolutions/getOne'](item.resolution.key)
			}

			if (item.createdAt) {
				item.createdAt = utc(item.createdAt)
			}

			if (item.updatedAt) {
				item.updatedAt = utc(item.updatedAt)
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
		} else if (data) {
			enrich(data)
		}
	})

	$axios.onError(async (error) => {
		const entity = await store.dispatch('errors/create', error.response.data)
		
		Vue.toasted.error(entity.message, {
			action : [
				{
					text : 'Details',
					onClick : (e, toastObject) => {
						redirect(`/errors/${entity.key}`)

						toastObject.goAway(0)
					}
				},
				{
					text : 'Cancel',
					onClick : (e, toastObject) => {
						toastObject.goAway(0)
					}
				}
			]
		})
	})
}
