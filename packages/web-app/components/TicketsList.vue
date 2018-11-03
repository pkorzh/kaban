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
						<img
							:src="ticket.assignee.avatar"
							style="max-width: 20px;min-width: 20px;">
				</div>

				<div class="table-list-line-priority">
						<img
							:src="ticket.priority.iconUrl"
							style="max-width: 20px;min-width: 20px;">
				</div>

				<div class="table-list-line-estm">
					<div
						class="ticket-estm ticket-estm-1"
						title="Less than a day">
						<span></span>
					</div>
				</div>
			</div>
		</draggable>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import Draggable from 'vuedraggable';
	import { TicketBaseMixin } from '@/mixins';
	import orderBy from 'lodash/orderBy';

	export default {
		mixins: [TicketBaseMixin],
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
			}
		},
		computed: {
			orderedTickets() {
				return orderBy(this.tickets, 'rank');
			}
		},
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		}
	}
</script>
