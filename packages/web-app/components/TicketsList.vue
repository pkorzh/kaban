<template>
	<div class="table-list">
		<draggable 
			:list="orderedTickets"
			:options="{ group: 'default' }"
			@update="onDraggableMove">
			<div
				class="table-list-line"
				v-for="(ticket, index) in orderedTickets"
				:data-index="index"
				:data-id="ticket.key"
				:data-rank="ticket.rank"
				:key="ticket.key"
				@click="highlight(ticket)">

				<div class="table-list-line-type">
					<img
						:src="ticket.type.iconUrl"
						style="max-width: 20px;min-width: 20px;">
				</div>

				<div class="table-list-line-name">
					<span>{{ ticket.name }}</span>
				</div>

				<div class="table-list-line-status">
					<div class="details-label" :title="ticket.status.name">
						{{ ticket.status.name }}
					</div>
				</div>

				<div class="table-list-line-user">
					<avatar 
						:username="ticket.assignee.name"
						:src="ticket.assignee.avatar"
						:size="20"></avatar>
				</div>

				<div class="table-list-line-priority">
					<img
						:src="ticket.priority.iconUrl"
						style="max-width: 20px;min-width: 20px;">
				</div>

				<div class="table-list-line-estm">
					<div :class="spentInClass(ticket)" :title="spentInText(ticket)"><span></span></div>
				</div>
			</div>
		</draggable>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import Draggable from 'vuedraggable';
	import { TicketBaseMixin, TicketSpentInMixin } from '@/mixins';
	import orderBy from 'lodash/orderBy';

	export default {
		mixins: [
			TicketBaseMixin,
			TicketSpentInMixin,
		],
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
		},
		computed: {
			orderedTickets() {
				return orderBy(this.tickets, 'rank');
			},
		},
	}
</script>
