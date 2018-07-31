<template>
	<div class="tickets-table">
		<div class="tickets-table-wrap">
			<div class="ticket-line ticket-line-head">
				<div class="ticket-line-type">T</div>
				<div class="ticket-line-key">Key</div>
				<div class="ticket-line-title">Summary</div>
				<div class="ticket-line-name"><a href="#" class="tickets-table-sort">Assigned</a></div>
				<div class="ticket-line-name"><a href="#" class="tickets-table-sort">Reporter</a></div>
				<div class="ticket-line-block">P</div>
				<div class="ticket-line-status"><a href="#" class="tickets-table-sort">Status</a></div>
				<div class="ticket-line-resolution"><a href="#" class="tickets-table-sort">Resolution</a></div>
				<div class="ticket-line-date"><a href="#" class="tickets-table-sort">Created</a></div>
				<div class="ticket-line-date"><a href="#" class="tickets-table-sort">Updated</a></div>
				<div class="ticket-line-date"><a href="#" class="tickets-table-sort">Due</a></div>
				<div class="ticket-line-action">Action</div>
			</div>
			<TicketsTableTicket
				v-for="ticket in tickets"
				:ticket="ticket"
				:key="ticket.key" />
		</div>
	</div>
</template>

<script>
	import TicketsTableTicket from './TicketsTableTicket'

	export default {
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		},
		components: {
			TicketsTableTicket
		}
	}
</script>
