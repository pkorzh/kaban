<template>
	<button
		class="btn btn-light"
		@click="handleAction()">
			Multiple Edit
		</button>
</template>

<script>
	export default {
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		},
		methods: {
			handleAction() {
				this.$kaban.dispatch('TicketMultipleEdit', {
					sender: this,
					payload: {
						tickets: this.tickets
					}
				})
			}
		}
	}
</script>
