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

		<button type="submit" class="btn btn-primary" v-t="'save'">
		</button>
	</b-form>
</template>

<script>
	import { predicate } from '../../tql';

	import CreateSlimMixin from './CreateSlimMixin';

	export default {
		mixins: [
			CreateSlimMixin
		],
		data() {
			return {
				ticket: {
					name: '',
					description: '',
				}
			}
		},

	}
</script>

<style>
</style>
