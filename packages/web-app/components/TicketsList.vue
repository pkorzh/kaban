<template>
	<div class="table-list">
		<draggable 
			:list="orderedTickets"
			:options="{ group: 'default' }"
			@update="onDraggableMove">
			<component
				v-for="(ticket, index) in orderedTickets"
				:data-index="index"
				:data-id="ticket.key"
				:data-rank="ticket.rank"
				:key="ticket.key"
				:is="ticketComponent(ticket)" 
				v-bind="ticketComponentProperties(ticket)"></component>
		</draggable>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import Draggable from 'vuedraggable';
	import orderBy from 'lodash/orderBy';

	import TicketsListTicket from './TicketsListTicket';
	import TicketsListMilestone from './TicketsListMilestone';

	export default {
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		},
		data() {
			return {
			}
		},
		components: {
			draggable: Draggable,
			TicketsListTicket,
		},
		methods: {
			...mapActions('tickets', ['rank']),

			async onDraggableMove({item, newIndex, oldIndex}) {
				const keys = [item.dataset.id];

				const { id: targetKey, rank } = document
					.querySelector(`[data-index="${newIndex}"]`).dataset;

				await this.rank({ 
					keys, 
					...(newIndex < oldIndex ? { before: targetKey } : { after: targetKey })
				});
			},

			ticketComponent(ticket) {
				switch(ticket.type.key) {
					case 'milestone':
						return TicketsListMilestone;
					default:
						return TicketsListTicket;
				}
			},

			ticketComponentProperties(ticket) {
				return { ticket };
			}
		},
		computed: {
			orderedTickets() {
				return orderBy(this.tickets, 'rank');
			},
		},
	}
</script>
