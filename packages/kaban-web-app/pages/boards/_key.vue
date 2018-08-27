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
				<!--<ActionsNavAssigned />-->

				<!--<ActionsNavSimpleSearch />-->

				<ActionsNavButton
					text="Create Ticket"
					action="CreateTicketAction"
					shortkey="c" />

				<ActionsNavViewSwitcher v-model="boardView" />
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
				boardView: true,
			}
		},
		async fetch({store, params}) {
			const board = await store.getters['boards/getOne'](params.key)
			await store.dispatch('tickets/fetchList', board.tql)
		},
		computed: {
			...mapGetters('boards', {
				getBoard: 'getOne'
			}),

			...mapGetters('tickets', {
				tickets: 'getList',
			}),

			board() {
				return this.getBoard(this.$route.params.key)
			},
		},
		methods: {
			...mapActions('tickets', [
				'transition'
			]),
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
