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

			<draggable v-model="draggables" :options="{ group: 'default' }" v-if="!hasQueues">
				<div v-for="item in tickets" :key="item.key">
					<BoardLaneTicket
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
	import { mapGetters } from 'vuex';

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
			}
		},
		computed: {
			itemCount() {
				if (!this.tickets) return '';
				return `${this.tickets.length}`;
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