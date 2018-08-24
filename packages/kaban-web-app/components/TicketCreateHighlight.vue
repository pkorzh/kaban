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
					horizontal
					:invalid-feedback="'Backlog is required'"
					:state="!$v.ticket.backlog.$invalid">
					<IconedSelect
						getter="backlogs/getList"
						v-model="ticket.backlog" />
				</b-form-group>

				<b-form-group
					label="Type"
					horizontal
					:invalid-feedback="'Type is required'"
					:state="!$v.ticket.type.$invalid">
					<IconedSelect
						getter="tickettypes/getList"
						v-model="ticket.type" />
				</b-form-group>

				<b-form-group
					label="Summary"
					:invalid-feedback="'Summary is required'"
					:state="!$v.ticket.name.$invalid">
					<b-form-input
						type="text"
						v-model="ticket.name"
						required
						placeholder="Ticket Summary"></b-form-input>
				</b-form-group>

				<b-form-group
					label="Discription"
					:invalid-feedback="'Discription is required'"
					:state="!$v.ticket.description.$invalid">
					<b-form-textarea
						type="text"
						v-model="ticket.description"
						required
						placeholder="Ticket Discription"
						:rows="3"></b-form-textarea>
				</b-form-group>

				<b-form-group
					label="Priority"
					horizontal
					:invalid-feedback="'Priority is required'"
					:state="!$v.ticket.priority.$invalid">
					<IconedSelect
						getter="priorities/getList"
						v-model="ticket.priority" />
				</b-form-group>

				<b-form-group
					label="Resolution"
					horizontal
					:invalid-feedback="'Resolution is required'"
					:state="!$v.ticket.resolution.$invalid">
					<b-form-select v-model="ticket.resolution">
					</b-form-select>
				</b-form-group>

				<b-form-group
					label="Assignee"
					horizontal
					:invalid-feedback="'Assignee is required'"
					:state="!$v.ticket.assignee.$invalid">
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
	import { required } from 'vuelidate/lib/validators'
	import { mapActions } from 'vuex'

	export default {
		data() {
			return {
				ticket: {
					name: null,
					description: null,
					priority: this.$store.getters['priorities/getList'][0],
					type: this.$store.getters['tickettypes/getList'][0],
					resolution: null,
					assignee: this.$store.getters['users/unassigned'],
					reporter: this.$store.getters['users/current'],
					backlog: this.$store.getters['backlogs/getList'][0],
				}
			}
		},
		validations: {
			ticket: {
				name: { required },
				description: { },
				priority: { required },
				type: { required },
				resolution: { },
				assignee: { required },
				reporter: { required },
				backlog: { required },
			}
		},
		methods: {
			...mapActions('tickets', {
				createTicket: 'create'
			}),

			async create() {
				this.$v.$touch()

				if (this.$v.$invalid) {
					return
				}

				await this.createTicket(this.ticket)
				this.$emit('close')
			},

			hasError(path) {
				return this.$v.ticket[path].$error
			}
		}
	}
</script>

<style>
</style>
