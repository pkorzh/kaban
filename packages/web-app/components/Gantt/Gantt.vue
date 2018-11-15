<template>
	<div>
		<div class="btn-group mt-3 mx-auto" role="group">
			<button
				type="button"
				class="btn btn-sm btn-light"
				:class="{'active': activeGanttViewMode == 'Week'}"
				@click="setGanttViewMode('Week')">
				Week
			</button>

			<button
				type="button"
				class="btn btn-sm btn-light"
				:class="{'active': activeGanttViewMode == 'Month'}"
				@click="setGanttViewMode('Month')">
				Month
			</button>
		</div>

		<div class="gantt"></div>
	</div>
</template>

<script>
	import Gantt from './'

	export default {
		props: {
			backlogs: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				activeGanttViewMode: 'Week',
			}
		},
		computed: {
			tasks() {
				return this.backlogs.map((backlog, index) => ({
					name: backlog.name,
					start: backlog.createdAt,
					id: backlog.key,
					progress: backlog.progress,
				}))
			},
		},
		mounted() {
			const self = this;

			this.gantt = new Gantt(this.$el.querySelector('.gantt'), this.tasks, {
			    header_height: 50,
			    column_width: 30,
			    step: 24,
			    view_modes: ['Week', 'Month'],
			    bar_height: 20,
			    bar_corner_radius: 3,
			    arrow_curve: 5,
			    padding: 18,
			    view_mode: this.activeGanttViewMode,
			    date_format: 'YYYY-MM-DD',
			    custom_popup_html: null,
			    on_date_change(task, start, end) {
			    	self.$emit('dateChange', {
			    		key: task.id,
			    		start,
			    		end,
			    	});
			    }
			});
		},
		methods: {
			setGanttViewMode(viewMode) {
				this.gantt.change_view_mode(viewMode)
				this.activeGanttViewMode = viewMode
			}
		}
	}
</script>
