<template>
	<b-container fluid>
		<h2 class="text-danger">{{error.name}}</h2>
		<p>{{error.message}}</p>
		<pre>{{error.stack}}</pre>
	</b-container>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		validate({ params, query, store }) {
			const error = store.getters['errors/getLastError'];
			return !!error;
		},

		auth: false,

		computed: {
			...mapGetters('errors', {
				error: 'getLastError'
			})
		}
	}
</script>
