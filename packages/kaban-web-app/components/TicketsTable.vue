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
			<div class="ticket-line" v-for="ticket in tickets" :key="ticket.key">
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
