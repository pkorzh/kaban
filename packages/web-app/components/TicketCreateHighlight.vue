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
			<b-form id="TicketCreateHighlight" @submit.prevent="create" novalidate>
				<b-form-group
					label="Backlog"
					horizontal>
					<IconedSelect
						getter="backlogs/getList"
						v-model="ticket.backlog" />
				</b-form-group>

				<b-form-group
					label="Type"
					horizontal>
					<IconedSelect
						getter="tickettypes/getList"
						v-model="ticket.type" />
				</b-form-group>

				<b-form-group
					label="Summary"
					:invalid-feedback="errors.first('ticket.name')"
					:state="!errors.has('ticket.name')">
					<b-form-input
						type="text"
						v-model="ticket.name"
						name="ticket.name"
						v-validate="'required'"
						placeholder="Ticket Summary"></b-form-input>
				</b-form-group>

				<b-form-group
					label="Discription">
					<b-form-textarea
						v-model="ticket.description"
						placeholder="Ticket Discription"
						:rows="3"></b-form-textarea>
				</b-form-group>

				<b-form-group
					label="Priority"
					horizontal>
					<IconedSelect
						getter="priorities/getList"
						v-model="ticket.priority" />
				</b-form-group>

				<b-form-group
					label="Resolution"
					horizontal>
					<IconedSelect
						getter="resolutions/getList"
						v-model="ticket.resolution" />
				</b-form-group>

				<b-form-group
					label="Assignee"
					horizontal>
					<IconedSelect
						getter="users/getList"
						icon="avatar"
						v-model="ticket.assignee" />
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
	import { mapActions } from 'vuex'

	export default {
		props: {
			status: {
				type: String,
				required: false
			}
		},
		data() {
			return {
				ticket: {
					name: '',
					description: '',
					priority: this.$store.getters['priorities/getList'][0],
					type: this.$store.getters['tickettypes/getList'][0],
					resolution: this.$store.getters['resolutions/getOne']('unresolved'),
					assignee: this.$store.getters['users/unassigned'],
					reporter: this.$auth.user,
					backlog: this.$store.getters['backlogs/getList'][0],
					status: this.status ? this.$store.getters['status/getOne'](this.status): null,
				}
			}
		},
		methods: {
			...mapActions('tickets', {
				createTicket: 'create'
			}),

			async create() {
				const valid = await this.$validator.validateAll()
				if (!valid) return

				await this.createTicket(this.ticket)
				this.$emit('close')
			},
		}
	}
</script>

<style>
</style>
