<template>
	<Backlog
		:backlog="backlog"
		:tickets="tickets" />
</template>

<script>
	import Backlog from '@/components/Backlog';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			Backlog
		},
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'get'
			}),

			...mapGetters('tickets', {
				queryTicket: 'query'
			}),

			backlog() {
				return this.getBacklog(this.$route.params.key)
			},

			tickets() {
				return this.queryTicket(
					(ticket) => ticket.backlog.key === this.backlog.key)
			}
		}
	}
</script>

<style>

</style>
