<template>
	<KanbanBoard
		:board="board"
		:tickets="tickets" />
</template>

<script>
	import KanbanBoard from '@/components/KanbanBoard';
	import { mapGetters, mapActions } from 'vuex';

	export default {
		components: {
			KanbanBoard
		},
		computed: {
			...mapGetters('boards', {
				getBoard: 'get'
			}),

			...mapGetters('tickets', {
				queryTicket: 'query',
			}),

			board() {
				return this.getBoard(this.$route.params.key)
			},

			tickets() {
				return this.queryTicket(
					(ticket) => ticket.backlog.key === this.board.backlog.key)
			}
		},
		methods: {
			...mapActions('tickets', [
				'updateTicketStatus'
			])
		},
		created() {
			this.$bus.$on('draggables', ({tickets, mapsTo}) => {
				this.updateTicketStatus({tickets, mapsTo});
			});
		}
	}
</script>
