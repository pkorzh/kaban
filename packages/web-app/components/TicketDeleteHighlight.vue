<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Delete Ticket
				</template>
			</TopBar>

			<button
					class="modal-box-close"
					@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			Are you sure you want delete 
			<strong>{{ ticket.name }}</strong>
			ticket?
		</div>
		<div class="modal-box-footer">
			<button
					class="btn btn-outline-danger"
					@click="$emit('close')">Close</button>
			<b-button variant="primary" @click="justDelete">Delete</b-button>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { KeyGenerationMixin } from '@/mixins';
	import { mapActions, mapGetters } from 'vuex';

	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			},
			gotoBacklog: {
				type: Boolean,
			},
		},
		methods: {
			...mapActions('tickets', {
				deleteTicket: 'delete'
			}),

			async justDelete() {
				const backlogKey = this.ticket.backlog.key;

				this.$emit('close');

				if (this.gotoBacklog) {
					this.$router.replace(this.localePath({
						name: 'backlogs-key',
						params: { key: backlogKey }
					}), () => this.deleteTicket(this.ticket) );
				} else {
					this.deleteTicket(this.ticket)
				}
			}
		}
	}
</script>
