import * as actions from '@/actions'

export default ({app, store}, inject) => {
	const kaban = {
		dispatch(action, {payload, sender} = {}) {
			if (action in actions) {
				actions[action]({app, store}, {payload, sender})
			} else {
				throw new Error(`${action} is unknown`)
			}
		}
	}

	inject('kaban', kaban)
}
