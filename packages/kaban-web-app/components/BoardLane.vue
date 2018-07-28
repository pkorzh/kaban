<template>
	<div class="card">
		<div class="card-header">
			<h3>{{ title }} ({{itemCount}})</h3>
			<a href="#" class="card-actions"><font-awesome-icon icon="ellipsis-h" /></a>
		</div>
		<div class="card-body">

			<div class="row" v-if="queues && queues.length">
				<div class="col-md" v-for="queue in queues" :key="queue.key">
					<BoardLane
						:_key="queue.key"
						:title="queue.name"
						:mapsTo="queue.mapsTo"
						:tickets="queueTickets(queue.mapsTo)"></BoardLane>
				</div>
			</div>

			<draggable v-model="draggables" :options="{ group: 'default' }" v-if="!queues">
				<div v-for="item in tickets" :key="item.id">
					<BoardLaneTicket :ticket="item" />
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
			}
		},
		computed: {
			itemCount() {
				if (!this.tickets) return '';
				return `${this.tickets.length}`;
			},

			draggables: {
				get() {
					return this.tickets;
				},
				set(tickets) {
					this.$bus.$emit('draggables', {
						tickets,
						mapsTo: this.mapsTo,
					});
				}
			}
		}
	};
</script>

<style>

</style>
