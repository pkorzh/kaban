<template>
	<div class="card card-ticket">
		<h3 class="card-title">
			<span class="text-muted">
				#{{ ticket.key }}
			</span>
			{{ ticket.name }}
		</h3>
		<div class="card-footer">
			<div class="card-col">
				<div class="card-check">
					<font-awesome-icon icon="check" />
				</div>
			</div>
			<div class="card-col">
				<span class="card-attach">
					<font-awesome-icon icon="paperclip" />
					10
				</span>
				<div class="card-image"></div>
			</div>
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
