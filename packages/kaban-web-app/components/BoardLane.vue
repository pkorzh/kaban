<template>
	<div class="card">
		<h3 class="card-header">{{ title }}</h3>
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
		<div class="card-footer text-muted">
			{{itemCount}}
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
					ticket.status === status)
			}
		},
		computed: {
			itemCount() {
				if (!this.tickets) return '';
				if (this.tickets.length === 1) return '1 task';
				return `${this.tickets.length} tasks`;
			},

			draggables: {
				get() {
					return this.tickets;
				},
				set(tickets) {
					this.$emit('updateStatus', tickets, this.mapsTo);
				}
			}
		}
	};
</script>
