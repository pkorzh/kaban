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
			<b-form id="TicketCreateHighlight" @submit.prevent="create">
				<b-form-group label="Type" horizontal>
					<IconedSelect
						module="tickettypes"
						getter="getList" />
				</b-form-group>

				<b-form-group label="Summary">
					<b-form-input
						type="text"
						v-model="summary"
						required
						placeholder="Ticket Summary"></b-form-input>
				</b-form-group>

				<b-form-group label="Discription">
					<b-form-textarea
						type="text"
						v-model="discription"
						required
						placeholder="Ticket Discription"
						:rows="3"></b-form-textarea>
				</b-form-group>

				<b-form-group label="Priority" horizontal>
					<IconedSelect
						module="priorities"
						getter="getList" />
				</b-form-group>

				<b-form-group label="Resolution" horizontal>
					<b-form-select v-model="resolution">
					</b-form-select>
				</b-form-group>

				<b-form-group label="Assignee" horizontal>
					<IconedSelect
						module="users"
						getter="getList"
						icon="avatar" />
				</b-form-group>
			</b-form>
		</div>
		<div class="modal-box-footer">
			<button
				class="btn btn-outline-danger"
				@click="$emit('close')">Close</button>
			<button
				type="submit"
				form="TicketCreateHighlight"
				class="btn btn-primary">Add</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		data() {
			return {
				summary: null,
				discription: null,
				priority: null,
				type: null,
				resolution: null,
				assignee: null,
			}
		},
		methods: {
			...mapActions('tickets', {
				createTicket: 'create'
			}),

			async create() {
				await this.createTicket({text: 'qwe'})
			}
		}
	}
</script>

<style>
</style>
