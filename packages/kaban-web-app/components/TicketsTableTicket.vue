<template>
	<div class="ticket-line">
		<div class="ticket-line-type">
			<img
				:src="ticket.type.iconUrl"
				:title="ticket.type.name">
		</div>
		<div class="ticket-line-key">
			<nuxt-link :to="{name: 'issues-key', params: {key: ticket.key}}">
				{{ ticket.key }}
			</nuxt-link>
		</div>
		<div class="ticket-line-title">
			<span>
				<a
					:href="ticketUrl(ticket)"
					@click.prevent.stop="highlight(ticket, backlog)">
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
		<div class="ticket-line-block">
			{{ ticket.priority.name }}
		</div>
		<div class="ticket-line-status">
			{{ ticket.status.name }}
		</div>
		<div class="ticket-line-resolution">
			{{ ticket.resolution }}
		</div>
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
	import { mapGetters } from 'vuex'
	import {TicketBaseMixin} from '@/mixins'

	export default {
		mixins: [TicketBaseMixin],
		props: {
			ticket: {
				type: Object,
				required: true,
			},
		},
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			backlog() {
				return this.getBacklog(this.ticket.backlog.key)
			}
		}
	}
</script>
