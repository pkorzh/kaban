<template>
	<div class="board">
		<div class="row">
			<div class="col-md" v-for="lane in board.lanes" :key="lane.slug">
				<task-lane
					:id="lane.slug" 
					:title="lane.name"
					:mapsTo="lane.mapsTo"
					:queues="lane.queues"
					:items="laneItems(lane.mapsTo)"></task-lane>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import TaskLane from './TaskLane';
	import NewItemForm from './NewItemForm';

	export default {
		name: 'KanbanBoard',
		props: ['board'],
		components: {
			'task-lane': TaskLane,
			'new-item': NewItemForm,
		},
		computed: {
			...mapState({
				items: s => s.items
			}),
			...mapGetters([
				'laneItems'
			]),
		},
	};
</script>
