<template>
	<div class="board-column">
		<div class="board-column-header">
			<h3>{{ title }} ({{itemCount}})</h3>
		</div>
		<div class="board-column-body">

			<div class="row" v-if="hasQueues">
				<div class="col-md" v-for="queue in queues" :key="queue.key">
					<BoardLane
						:_key="queue.key"
						:title="queue.name"
						:mapsTo="queue.mapsTo"
						:colorPredicateMap="colorPredicateMap"
						:tickets="queueTickets(queue.mapsTo)"></BoardLane>
				</div>
			</div>

			<draggable 
				:list="orderedTickets"
				:options="{ group: 'default' }"
				@update="onDraggableMove"
				@add="onDraggableAdd"
				v-if="!hasQueues">
				<div v-for="(item, index) in orderedTickets" :key="item.key">
					<BoardLaneTicket
						:data-index="index"
						:data-id="item.key"
						:data-rank="item.rank"
						:data-mapsto="mapsTo.key"
						:ticket="item"
						:cardColor="ticketCardColor(item)" />
				</div>
			</draggable>

		</div>
	</div>
</template>

<script>
	import Draggable from 'vuedraggable';
	import BoardLaneTicket from './BoardLaneTicket';
	import { mapGetters, mapActions } from 'vuex';
	import orderBy from 'lodash/orderBy';

	export default {
		name: 'BoardLane',
		props: {
			tickets: {
				type: Array,
				required: true,
			},
			title: {
				type: String,
				required: true
			},
			_key: {
				type: String,
				required: true
			},
			mapsTo: {
				required: true,
			},
			queues: {
				type: Array,
				required: false,
			},
			colorPredicateMap: {
				type: Array,
				required: true,
			}
		},
		components: {
			BoardLaneTicket,
			draggable: Draggable,
		},
		methods: {
			...mapActions('tickets', ['rank']),

			queueTickets(status) {
				return this.tickets.filter(ticket =>
					ticket.status.key === status.key)
			},

			ticketCardColor(ticket) {
				for (let color of this.colorPredicateMap) {
					if (color.p(ticket)) {
						return color.color
					}
				}
			},

			async onDraggableMove({item, newIndex, oldIndex}) {
				const {id: key, mapsto } = item.firstChild.dataset;

				const { id: targetKey, rank } = document
					.querySelector(`[data-mapsto="${mapsto}"][data-index="${newIndex}"]`)
					.dataset;

				await this.rank({ 
					keys: [key], 
					...(newIndex < oldIndex ? { before: targetKey } : { after: targetKey })
				});
			},

			onDraggableAdd() {
				console.log(arguments);
			}
		},
		computed: {
			itemCount() {
				if (!this.tickets) return '';
				return this.tickets.length;
			},

			hasQueues() {
				if (!this.queues) {
					return false;
				} else if (!this.queues.length) {
					return false
				} else {
					return true
				}
			},

			orderedTickets() {
				return orderBy(this.tickets, 'rank');
			},

			draggables: {
				get() {
					return this.tickets
				},
				set(tickets) {
					const ticketsToTransition = tickets.filter(ticket =>
						ticket.status.key !== this.mapsTo.key)

					ticketsToTransition.length && this.$bus.$emit('kaban::board::draggables', {
						tickets: ticketsToTransition,
						mapsTo: this.mapsTo,
					})
				}
			}
		},
	}
</script>

<style>

</style>
