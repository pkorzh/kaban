<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Create ticket
				</template>
			</TopBar>

			<button
				class="modal-box-close"
				@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			<b-form>
				<div class="form-group row">
					<label class="col-sm-2 col-form-label">
						Summary
					</label>
					<div class="col-sm-10">
						<input
							type="text"
							class="form-control"
							placeholder="Ticket Summary">
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-2 col-form-label">
						Description
					</label>
					<div class="col-sm-10">
						<textarea
							class="form-control"
							placeholder="Ticket Description"></textarea>
					</div>
				</div>
			</b-form>
		</div>
		<div class="modal-box-footer">
			<button
				class="btn btn-outline-danger"
				@click="$emit('close')">Close</button>
			<button
				type="submit"
				form="TicketCreateHighlightForm"
				class="btn btn-primary">Add</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		methods: {
			...mapActions('tickets', {
				createTicket: 'create'
			}),

			create() {
			}
		}
	}
</script>

<style>
</style>
