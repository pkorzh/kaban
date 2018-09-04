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
					class="card-estm card-estm-1"
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
	import { mapGetters } from 'vuex'
	import {TicketBaseMixin} from '@/mixins'

	/*import * as generatePredicate from '../../tql/predicate'

	const colors = [
		{
			color: 'red',
			tql: 'backlog = AMA',
		}
	]*/

	export default {
		mixins: [TicketBaseMixin],
		data() {
			return {
				colorPredicateMap: []
			}
		},
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			backlog() {
				return this.getBacklog(this.ticket.backlog.key)
			},

			cardStyle() {
				/*for(let color of colorPredicateMap) {
					if (color.p(this.ticket)) {
						return {
							'border-left': '2px',
							'border-color': color.color,
						}
					}
				}*/
				return {}
			}
		},
		mounted() {
			/*this.colorPredicateMap = colors.map(color => ({
				...color,
				p: generatePredicate(color.tql),
			}))*/
		}
	};
</script>

<style>
</style>
