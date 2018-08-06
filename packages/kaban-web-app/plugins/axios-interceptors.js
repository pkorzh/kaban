import { utc } from 'moment'

export default function ({ $axios, redirect }) {
	$axios.onRequest(config => {
	})

	$axios.onResponse(({config, data, headers}) => {
	})

	$axios.onError(error => {
	})
}
