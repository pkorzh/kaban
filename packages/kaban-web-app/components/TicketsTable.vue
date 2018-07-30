<template>
	<b-container fluid>
		<div class='tickets-table'>
			<div v-for="ticket in tickets" :key="ticket.key">
				<div class="ticket-line">
					<div class="ticket-line-type">
						<img
							:src="ticket.type.iconUrl"
							:title="ticket.type.name">
					</div>
					<div class="ticket-line-key">
						{{ ticket.key }}
					</div>
					<div class="ticket-line-title">
						<span>
							<a
								:href="ticketHref(ticket)"
								@click.prevent.stop="clicked(ticket)">
								{{ ticket.name }}
							</a>
						</span>
					</div>
					<div class="ticket-line-name">Name</div>
					<div class="ticket-line-name">Name</div>
					<div>Block</div>
					<div class="ticket-line-status">
						{{ ticket.status.name }}
					</div>
					<div class="ticket-line-resolution">Unresolved</div>
					<div class="ticket-line-date">19/07/2018</div>
					<div class="ticket-line-date">19/07/2018</div>
					<div class="ticket-line-date">19/07/2018</div>
					<div class="ticket-line-action"><a href="#"><font-awesome-icon icon="ellipsis-h" /></a></div>
				</div>
			</div>
		</div>
	</b-container>
</template>

<script>
	export default {
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		},
		methods: {
			clicked(ticket) {
				this.$bus.$emit('kaban::board::ticket::selected', ticket)
			},
			ticketHref(ticket) {
				return `/issues/${ticket.key}`
			}
		}
	}
</script>
