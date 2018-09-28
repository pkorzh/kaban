<template>
	<div class="btn-group">
		<ActionsNavButton
			v-for="status in transitions"
			@click="transition({tickets: [ticket], mapsTo: status})"
			:text="status.name"
			:key="status.key"
			:disabled="readonly"/>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			},
			readonly: {
				type: Boolean,
				default: false
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

			...mapGetters('status', {
				getStatus: 'getOne'
			}),

			transitions() {
				return this.allowedTransitions(this.ticket.status).map(t =>
					this.getStatus(t))
			}
		}
	}
</script>
