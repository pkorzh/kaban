<template>
	<b-dropdown variant="light" no-caret right>
		<template slot="button-content">
			<font-awesome-icon icon="ellipsis-v" /> 
		</template>

		<b-dropdown-item>
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
				this.$kaban.dispatch('TicketDeleteHighlight', {
					sender: this,
					payload: {
						ticket: this.ticket,
						gotoBacklog: this.gotoBacklog,
					}
				});
			}
		},
	}
</script>
