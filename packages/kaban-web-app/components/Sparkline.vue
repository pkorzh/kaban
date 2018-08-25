<template>
	<div style="position: relative">
		<svg
			ref="sparkline"
			class="sparkline sparkline--blue sparkline--filled"
			width="100"
			height="15"
			stroke-width="1"></svg>

		<span ref="tooltip" class="sparkline-tooltip" hidden="true"></span>
	</div>
</template>

<script>
	import $ from 'jquery'
	import sparkline from '@fnando/sparkline';

	export default {
		mounted() {
			const svg = this.$refs.sparkline;
			const tooltip = this.$refs.tooltip;

			sparkline(
				svg,
				[1, 5, 2, 4, 8, 3, 7, 4, 8, 2],
				{
					onmousemove(event, datapoint) {
						tooltip.hidden = false;
						tooltip.textContent = datapoint.value;
						tooltip.style.top = `${event.offsetY}px`;
						tooltip.style.left = `${event.offsetX + 20}px`;
					},
					onmouseout(event) {
						tooltip.hidden = true;
					}
				});
		}
	}
</script>
