<template>
	<div class="btn-group">
		<ActionsNavButton
			v-for="status in transitions"
			@click="transition({tickets: [ticket], mapsTo: { key: status }})"
			:text="status"
			:key="status" />
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
		methods: {
			...mapActions('tickets', [
				'transition'
			]),
		},
		computed: {
			...mapGetters('workflow', [
				'allowedTransitions'
			]),

			transitions() {
				return this.allowedTransitions(this.ticket.status)
			}
		}
	}
</script>
