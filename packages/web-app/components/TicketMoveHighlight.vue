<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Move ticket
				</template>
			</TopBar>

			<button
					class="modal-box-close"
					@click="$emit('close')">Close</button>
		</div>
		<div class="details">
				<b-form 
					inline 
					@submit.prevent="onMove" 
					class="mb-3">
					<label>
						Move to backlog
					</label>

					<b-form-select :options="backlogs"
								   v-model="backlogToMigrate">
					</b-form-select>

					<b-button 
						type="submit" 
						variant="primary" 
						class="ml-2">
							<span v-t="'move'"></span>
					</b-button>

				</b-form>
		</div>
		<div class="modal-box-footer">
			<button
					class="btn btn-outline-danger"
					@click="$emit('close')"
					v-t="'close'"></button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data() {
			return {
				backlogToMigrate: null
			}
		},
		props: {
			ticket: {
				type: Object,
				required: true,
			},
		},
		methods: {
			...mapActions('tickets', ['move']),

			async onMove() {
				await this.move([{
					ticketKey: this.ticket.key,
					backlogKey: this.backlogToMigrate,
				}]);

				this.$emit('close');
			},
		},
		computed: {
			...mapGetters('backlogs', {
				'backlogList': 'getList'
			}),

			backlogs() {
				return this.backlogList.map(b => ({
					text: b.name,
					value: b.key,
				}));
			}
		},
	}
</script>
