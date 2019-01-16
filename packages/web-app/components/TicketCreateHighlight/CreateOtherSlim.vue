<template>
	<b-form id="TicketCreateHighlight" @submit.prevent="create" novalidate>
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

		<button type="submit" class="btn btn-primary" v-t="'save'">
		</button>
	</b-form>
</template>

<script>
	import CreateSlimMixin from './CreateSlimMixin';

	export default {
		mixins: [
			CreateSlimMixin,
		],
		data() {
			return {
				ticket: {
					name: '',
					description: '',
					priority: this.$store.getters['priorities/getList'][0],
					resolution: this.$store.getters['resolutions/getOne']('unresolved'),
					assignee: this.$store.getters['users/unassigned'],
					status: this.status ? this.$store.getters['status/getOne'](this.status): null,
				}
			};
		},

	}
</script>

<style>
</style>
