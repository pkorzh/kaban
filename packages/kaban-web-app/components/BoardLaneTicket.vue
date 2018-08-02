<template>
	<div class="card card-ticket">
		<h3 class="card-title">
			<span class="text-muted">
				{{ ticket.key }}
			</span>
			<a
				:href="ticketUrl(ticket)"
				class="card-link"
				v-on:click.prevent.stop="highlight(ticket)">
				{{ ticket.name }}
			</a>
		</h3>
		<ul class="card-list card-list-tags">
			<li v-for="tag in ticket.tags" :key="tag.name">
				<a href="#">{{ tag.name }}</a>
			</li>
		</ul>
		<div class="card-footer">
			<div class="card-col">
				<div class="card-check">
					<img
						style="min-width: 20px"
						:src="ticket.type.iconUrl"
						:title="ticket.type.name">
				</div>
			</div>
			<div class="card-col">
				<span class="card-attach">
					<font-awesome-icon icon="paperclip" />
					10
				</span>
				<div class="card-image">
					<img
						v-if="ticket.assignee"
						:title="ticket.assignee.name"
						:src="ticket.assignee.avatar">
				</div>
			</div>
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
			}
		},
		methods: {
		}
	};
</script>

<style>
</style>
