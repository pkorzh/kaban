<template>
	<div></div>
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
			var gantt = new Gantt(this.$el, this.tasks, {
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
		}
	}
</script>
