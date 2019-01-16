<template>
	<div
		class="table-list-line"
		@click="highlight(ticket)">

		<div class="table-list-line-type">
			<img
				:src="ticket.type.iconUrl"
				style="max-width: 20px;min-width: 20px;">
		</div>

		<div class="table-list-line-name">
			<span>{{ ticket.name }}</span>
		</div>

		<div class="table-list-line-status">
			<div class="details-label" :title="ticket.status.name">
				{{ ticket.status.name }}
			</div>
		</div>

		<div class="table-list-line-user">
			<avatar 
				:username="ticket.assignee.name"
				:src="ticket.assignee.avatar"
				:size="20"></avatar>
		</div>

		<div class="table-list-line-priority">
			<img
				:src="ticket.priority.iconUrl"
				style="max-width: 20px;min-width: 20px;">
		</div>

		<div class="table-list-line-estm">
			<div :class="spentInClass(ticket)" :title="spentInText(ticket)"><span></span></div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { TicketBaseMixin, TicketSpentInMixin } from '@/mixins';

	export default {
		mixins: [
			TicketBaseMixin,
			TicketSpentInMixin,
		],
		props: {
			ticket: {
				type: Object,
				required: true,
			},
		},
	}
</script>
