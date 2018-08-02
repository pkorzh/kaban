<template>
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
					:href="ticketUrl(ticket)"
					@click.prevent.stop="highlight(ticket)">
					{{ ticket.name }}
				</a>
			</span>
		</div>
		<div class="ticket-line-name">
			<a href="">
				Platon Korzh
			</a>
		</div>
		<div class="ticket-line-name">
			<a href="">
				Platon Korzh
			</a>
		</div>
		<div class="ticket-line-block">Block</div>
		<div class="ticket-line-status">
			{{ ticket.status.key }}
		</div>
		<div class="ticket-line-resolution">Unresolved</div>
		<div class="ticket-line-date">
			{{ ticket.createdAt | moment('L') }}
		</div>
		<div class="ticket-line-date">
			{{ ticket.updatedAt | moment('L') }}
		</div>
		<div class="ticket-line-date">
			{{ ticket.resolvedAt | moment('L') }}
		</div>
		<div class="ticket-line-action">
			<a href="#"><font-awesome-icon icon="ellipsis-h" /></a>
		</div>
	</div>
</template>

<script>
	import {TicketBaseMixin} from '@/mixins'

	export default {
		mixins: [TicketBaseMixin],
		props: {
			ticket: {
				type: Object,
				required: true,
			},
		},
		methods: {
		}
	}
</script>
