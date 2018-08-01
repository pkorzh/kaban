<template>
	<div>
		<TicketsTable :tickets="tickets" />
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
