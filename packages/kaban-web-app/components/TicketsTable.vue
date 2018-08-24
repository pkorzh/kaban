<template>
	<div class="tickets-table">
		<div class="tickets-table-wrap">
			<div class="ticket-line ticket-line-head">
				<div class="ticket-line-type">T</div>

				<div class="ticket-line-title">Summary</div>

				<div class="ticket-line-name">
					Assigned
				</div>

				<div class="ticket-line-name"><a href="#" class="tickets-table-sort">Reporter</a></div>

				<div class="ticket-line-block">P</div>

				<div class="ticket-line-status">
					Status
				</div>

				<div class="ticket-line-resolution">
					Resolution
				</div>

				<div class="ticket-line-date">
					Created
				</div>

				<div class="ticket-line-date">
					Updated
				</div>

				<div class="ticket-line-date">
					Resolved
				</div>
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
