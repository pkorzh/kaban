<template>
	<div class="table-list-milestone" @click="highlight(ticket)">
		<div class="table-list-milestone-name badge badge-primary">
			{{ ticket.name }}
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';
	import { TicketBaseMixin } from '@/mixins';

	export default {
		mixins: [
			TicketBaseMixin
		],
		props: {
			ticket: {
				type: Object,
				required: true,
			},
		},
	}
</script>
