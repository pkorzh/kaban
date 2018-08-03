<template>
	<div>
		<div class="btn-group mt-3 mx-auto" role="group">
			<button
				type="button"
				class="btn btn-sm btn-light"
				@click="setGanttView('Quarter Day')">
				Quarter Day
			</button>

			<button
				type="button"
				class="btn btn-sm btn-light"
				@click="setGanttView('Day')">
				Day
			</button>

			<button
				type="button"
				class="btn btn-sm btn-light"
				@click="setGanttView('Half Day')">
				Half Day
			</button>

			<button
				type="button"
				class="btn btn-sm btn-light"
				@click="setGanttView('Week')">
				Week
			</button>

			<button
				type="button"
				class="btn btn-sm btn-light"
				@click="setGanttView('Month')">
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
			tasks: {
				type: Array,
				required: true,
			}
		},
		mounted() {
			this.gantt = new Gantt(this.$el.querySelector('.gantt'), this.tasks, {
			    header_height: 50,
			    column_width: 30,
			    step: 24,
			    view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
			    bar_height: 20,
			    bar_corner_radius: 3,
			    arrow_curve: 5,
			    padding: 18,
			    view_mode: 'Day',
			    date_format: 'YYYY-MM-DD',
			    custom_popup_html: null
			});
		},
		methods: {
			setGanttView(view_mode) {
				this.gantt.change_view_mode(view_mode)
			}
		}
	}
</script>
