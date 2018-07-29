<template>
	<div>
		<div v-for="ticket in tickets" :key="ticket.key">
			{{ ticket.name }}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		},
		methods: {
		}
	}
</script>
