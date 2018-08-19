<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				{{ board.name }}
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="{name: 'boards'}" text="Boards" />
				</b-breadcrumb>
			</template>

			<ActionsNav>
				<!--<ActionsNavAssigned />
				<ActionsNavQuickFilters />-->

				<div class="btn-group" role="group">
					<nuxt-link
						v-for="backlog in board.backlogs"
						:key="backlog.key"
						:to="{name: 'backlogs-key', params: {key: backlog.key}}"
						:style="backlogButtonStyle(backlog)"
						class="btn btn-light">
						{{ backlog.key }}
					</nuxt-link>
				</div>

				<!--<ActionsNavSimpleSearch />-->

				<ActionsNavButton
					text="Create Ticket"
					action="CreateTicketAction"
					shortkey="c" />

				<ActionsNavBoardViewSwitcher v-model="boardView" />
			</ActionsNav>
		</TopBar>

		<Board
			v-if="boardView"
			:board="board"
			:tickets="tickets" />

		<TicketsTable
			v-if="!boardView"
			:tickets="tickets" />
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		data() {
			return {
				boardView: true
			}
		},
		async fetch({store, params}) {
			await store.dispatch('boards/fetchOne', params.key)

			const board = store.getters['boards/getOne'](params.key)

			await store.dispatch('tickets/fetchList', {
				backlogs: board.backlogs.map(b => b.key)
			})
		},
		computed: {
			...mapGetters('boards', {
				getBoard: 'getOne'
			}),

			...mapGetters('tickets', {
				queryTicket: 'queryList',
			}),

			board() {
				return this.getBoard(this.$route.params.key)
			},

			tickets() {
				const backlogsKeys = this.board.backlogs.map(b => b.key)

				return this.queryTicket(
					(ticket) => backlogsKeys.indexOf(ticket.backlog.key) !== -1)
			},
		},
		methods: {
			...mapActions('tickets', [
				'transition'
			]),

			backlogButtonStyle(backlog) {
				const color = backlog.color

				if (color) {
					return {
						borderTop: `2px solid ${color ? color : ''}`
					}
				}
			}
		},
		async mounted() {
			this.$bus.$on('kaban::board::draggables', ({tickets, mapsTo}) => {
				this.transition({tickets, mapsTo})
			})
		},
		beforeDestroy() {
			this.$bus.$off('kaban::board::draggables')
		}
	}
</script>
