<template>
	<div class="table-list">
		<div
			class="table-list-line"
			v-for="ticket in tickets"
			:key="ticket.key"
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
					<img
						:src="ticket.assignee.avatar"
						style="max-width: 20px;min-width: 20px;">
			</div>

			<div class="table-list-line-priority">
					<img
						:src="ticket.priority.iconUrl"
						style="max-width: 20px;min-width: 20px;">
			</div>

			<div class="table-list-line-estm">
				<div
					class="ticket-estm ticket-estm-1"
					title="Less than a day">
					<span></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { TicketBaseMixin } from '@/mixins'

	export default {
		mixins: [TicketBaseMixin],
		data() {
			return {
				selectedTickets: [],
			}
		},
		computed: {
		},
		methods: {
		},
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		}
	}
</script>
