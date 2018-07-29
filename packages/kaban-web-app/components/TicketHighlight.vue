<template>
	<div>
		<p>
			{{ ticket.name }}
		</p>

		<nuxt-link :to="{name: 'issues-key', params: {key: ticket.key}}">
			Expand
		</nuxt-link>
	</div>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
		methods: {
		}
	}
</script>

<style>
</style>
