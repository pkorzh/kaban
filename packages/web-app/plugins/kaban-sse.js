import Vue from 'vue'
import ReconnectingEventSource from "reconnecting-eventsource"

const formatters = {
	plain: e => e.data,
	json: e => JSON.parse(e.data)
}

export default ({ env }, inject) => {
	inject('sse', sse)

	function sse() {
		const config = Object.assign(
			{},
			{
				withCredentials: false,
				format: 'json'
			}
		)

		const source = new ReconnectingEventSource(env.SSE_URL, {
			withCredentials: config.withCredentials
		})

		return new Promise((resolve, reject) => {
			source.onerror = reject

			source.onopen = () => {
				source.onerror = () => {}

				const subscribers = {}

				resolve({
					getSource() {
						return source
					},
					onError(handler) {
						source.onerror = handler

						return this
					},
					subscribe(event, handler) {
						const listener = e => {
							let data

							try {
								data = formatters[config.format](e)
							} catch (err) {
								if (typeof source.onerror === 'function') {
									source.onerror(err)
								}
							}

							handler(data)
						}

						if (!subscribers[event]) {
							subscribers[event] = []
						}

						subscribers[event].push(listener)

						if (event === '') {
							// Catches messages without any event specified
							source.onmessage = listener
						} else {
							source.addEventListener(event, listener)
						}

						return this
					},
					unsubscribe(event) {
						if (event === '') {
							source.onmessage = null

							return this
						}

						// Check if there are any subscribers for this event
						if (!subscribers[event]) {
							return this
						}

						subscribers[event].forEach(listener => {
							source.removeEventListener(event, listener)
						})

						subscribers[event] = []

						return this
					},
					close() {
						source.close()

						// Make sure listeners are cleared (nobody likes mem leaks, right?)
						Object.keys(subscribers).forEach(event => {
							subscribers[event] = []
						})
					}
				})
			}
		})
	}
}
