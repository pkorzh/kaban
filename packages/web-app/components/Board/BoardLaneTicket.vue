<template>
	<div
		class="card card-ticket"
		:style="cardStyle">
		<h3 class="card-title">
			<a
				:href="ticketUrl(ticket)"
				class="card-link"
				v-on:click.prevent.stop="highlight(ticket, backlog)">
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
				<div class="card-type">
					<img
						style="max-width: 20px;min-width: 20px;"
						:src="ticket.type.iconUrl"
						:title="ticket.type.name">
				</div>

				<div
					class="ticket-estm ticket-estm-1"
					title="Less than a day"><span></span></div>

				<div class="card-priority">
					<img
						style="max-width: 20px;min-width: 20px;"
						:src="ticket.priority.iconUrl"
						:title="ticket.priority.name">
				</div>

			</div>
			<div class="card-col">
				<!--<span class="card-attach">
					<font-awesome-icon icon="paperclip" />
					10
				</span>-->
				<div class="card-image">
					<avatar 
						:src="ticket.assignee.avatar"
						:username="ticket.assignee.name"
						:size="24"></avatar>
				</div>
			</div>
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
			cardColor: {
				type: String,
				required: false,
			},
		},
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			backlog() {
				return this.getBacklog(this.ticket.backlog.key)
			},

			cardStyle() {
				if (this.cardColor) {
					return {
						'border-left': `2px solid ${this.cardColor}`,
					}
				}

				return {}
			},
		},
	};
</script>

<style>
</style>
