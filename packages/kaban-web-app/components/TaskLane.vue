<template>
	<div class="card">
		<h3 class="card-header">{{ title }}</h3>
		<div class="card-body">

			<div class="row" v-if="queues && queues.length">
				<div class="col-md" v-for="queue in queues" :key="queue.slug">
					<TaskLane
						:id="queue.slug" 
						:title="queue.name"
						:mapsTo="queue.mapsTo"
						:items="laneItems(queue.mapsTo)"></TaskLane>
				</div>
			</div>

			<draggable v-model="draggables" :options="{ group: 'default' }" v-if="!queues">
				<div v-for="item in items" :key="item.id">
					<item :item="item"></item>
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
	import TaskLaneItem from './TaskLaneItem';
	import { mapGetters } from 'vuex';

	export default {
		name: 'TaskLane',
		props: ['items', 'title', 'id', 'mapsTo', 'queues'],
		components: {
			item: TaskLaneItem,
			draggable: Draggable,
		},
		computed: {
			itemCount() {
				if (!this.items) return '';
				if (this.items.length === 1) return '1 task';
				return `${this.items.length} tasks`;
			},
			
			draggables: {
				get() {
					return this.items;
				},
				set(items) {
					this.$store.commit('updateItems', {
						items,
						mapsTo: this.mapsTo
					});
				}
			},

			...mapGetters([
				'laneItems'
			]),
		}
	};
</script>

<style>
.card-body > * {
  min-height: 50px;
}
</style>
