<template>
	<div class="board">
		<div class="row">
			<div class="col-md d-flex" v-for="lane in board.lanes" :key="lane.key">
				<BoardLane
					:_key="lane.key"
					:title="lane.name"
					:mapsTo="lane.mapsTo"
					:queues="lane.queues"
					:colorPredicateMap="colorPredicateMap"
					:tickets="laneTickets(lane.mapsTo)"></BoardLane>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import BoardLane from './BoardLane';

	import { predicate } from '../../tql'

	export default {
		name: 'KanbanBoard',
		components: {
			BoardLane
		},
		methods: {
			laneTickets(status) {
				const statuses = Array.isArray(status) ?
					status.map(s => s.key) :
					[status.key];

				return this.tickets.filter(t => !!t.status).filter(ticket =>
					statuses.indexOf(ticket.status.key) !== -1)
			}
		},
		props: {
			board: {
				type: Object,
				required: true,
			},
			tickets: {
				type: Array,
				required: true,
			},
			cardColor: {
				type: Array,
				required: true,
			}
		},
		computed: {
			colorPredicateMap() {
				return this.cardColor.map(color => ({
					...color,
					p: predicate(color.tql),
				}))
			}
		}
	};
</script>
