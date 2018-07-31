<template>
	<b-container fluid>
		<TopBar :board="board">
			<ActionsNav>
				<BoardViewSwitcher v-model="boardView" />
			</ActionsNav>
		</TopBar>

		<KanbanBoard
			v-if="boardView"
			:board="board"
			:tickets="tickets" />

		<TicketsTable
			v-if="!boardView"
			:tickets="tickets" />
	</b-container>
</template>

<script>
	import TopBar from '@/components/TopBar'
	import BoardViewSwitcher from '@/components/BoardViewSwitcher'
	import ActionsNav from '@/components/ActionsNav'
	import KanbanBoard from '@/components/KanbanBoard'
	import TicketsTable from '@/components/TicketsTable'
	import TicketHighlight from '@/components/TicketHighlight';

	import { mapGetters, mapActions } from 'vuex';

	export default {
		components: {
			TopBar,
			KanbanBoard,
			TicketsTable,
			ActionsNav,
			BoardViewSwitcher,
		},
		data() {
			return {
				boardView: true
			}
		},
		computed: {
			...mapGetters('boards', {
				getBoard: 'getOne'
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
			},
		},
		methods: {
			...mapActions('tickets', [
				'updateTicketStatus'
			]),

			openTicketHighlight(ticket) {
				this.$modal.show(
					TicketHighlight,
					{
						//component props
						ticket
					},
					{
						//modal params
						//https://www.npmjs.com/package/vue-js-modal
						width: '75%'
					}, {
						//events
					})
			}
		},
		mounted() {
			this.$bus.$on('kaban::board::draggables', ({tickets, mapsTo}) => {
				this.updateTicketStatus({tickets, mapsTo})
			})

			this.$bus.$on('kaban::board::ticket::selected', (ticket) => {
				this.openTicketHighlight(ticket)
			})
		},
		destroyed() {
			this.$bus.$off('kaban::board::draggables')
			this.$bus.$off('kaban::board::ticket::selected')
		}
	}
</script>
