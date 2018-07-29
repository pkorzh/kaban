<template>
	<div>
		{{ ticket.name }}
	</div>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		}
	};
</script>

<style>
</style>
