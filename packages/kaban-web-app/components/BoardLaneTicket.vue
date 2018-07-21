<template>
	<div class="card">
		<div class="card-block">
			<h5 class="card-title">
				<span class="text-muted">
					#{{ ticket.key }}
				</span>
				{{ ticket.name }}
			</h5>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
	};
</script>

<style>
</style>
