<template>
	<div>
		<div class="card" v-for="ticket in tickets" :key="ticket.id">
			<div class="card-block">
				<h5 class="card-title">
					<span class="text-muted">
						#{{ticket.id}}
					</span>

					{{ticket.name}}

					<span>
						{{ ticket.status.key }}
					</span>
				</h5>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Backlog',
		props: {
			backlog: {
				type: Object,
				required: true,
			},
			tickets: {
				type: Array,
				required: true,
			}
		}
	};
</script>

<style>
</style>
