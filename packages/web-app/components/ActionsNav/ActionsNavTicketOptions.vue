<template>
	<b-dropdown variant="light" no-caret right>
		<template slot="button-content">
			<font-awesome-icon icon="ellipsis-v" /> 
		</template>

		<b-dropdown-item @click="onMoveTicket">
			<span v-t="'move'"></span>
		</b-dropdown-item>

		<b-dropdown-item @click="onDeleteTicket">
			<span v-t="'delete'"></span>
		</b-dropdown-item>

	</b-dropdown>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
			},
			readonly: {
				type: Boolean,
			},
			gotoBacklog: {
				type: Boolean,
				default: () => false,
			}
		},
		methods: {
			onDeleteTicket() {
				this.$kaban.dispatch('DeleteTicketAction', {
					sender: this,
					payload: {
						ticket: this.ticket,
						gotoBacklog: this.gotoBacklog,
					}
				});
			},

			onMoveTicket() {
				this.$kaban.dispatch('MoveTicketAction', {
					sender: this,
					payload: {
						ticket: this.ticket,
					}
				});
			}
		},
	}
</script>
