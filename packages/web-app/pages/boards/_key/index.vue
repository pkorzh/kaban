<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				{{ board.name }}
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="localePath({name: 'boards'})" text="Boards" />
				</b-breadcrumb>
			</template>

			<ActionsNav>
				<!--<ActionsNavAssigned />

				<ActionsNavQuickFilters />

				<ActionsNavSimpleSearch />-->

				<ActionsNavButton
					text="Create Ticket"
					action="CreateTicketAction"
					:payload="{status: ticketInitialStatus}"
					shortkey="c" />

				<ActionsNavViewSwitcher v-model="boardView" />

				<div class="actions-nav-separator"></div>

				<b-dropdown variant="light" right no-caret>
					<template slot="button-content">
						<font-awesome-icon icon="cog" />
					</template>
					<b-dropdown-item
						:to="localePath({name: 'boards-key-configure-general', params: { key: board.key }})">
						Configure
					</b-dropdown-item>
					<b-dropdown-divider />
					<b-dropdown-item-button class="text-danger" @click="deleteBoard(board.key)">
						Delete
					</b-dropdown-item-button>
				</b-dropdown>
			</ActionsNav>
		</TopBar>

		<Board
			v-if="boardView"
			:board="board"
			:tickets="tickets"
			:cardColor="cardColor" />

		<TicketsList
			v-if="!boardView"
			:tickets="tickets" />
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		head() {
			return {
				title: this.board.name
			}
		},
		data() {
			return {
				boardView: true,
			}
		},
		async fetch({store, params}) {
			const board = await store.getters['boards/getOne'](params.key)
			await store.dispatch('tickets/fetchList', {
				tql: board.tql,
				board: params.key,
			})
		},
		async asyncData({store, params}) {
			const cardColor = await store.dispatch(
				'boards/cardColor/fetchList',
				{tql: `board = ${params.key}`}
			)

			return {
				cardColor
			}
		},
		computed: {
			...mapGetters('boards', {
				getBoard: 'getOne'
			}),

			...mapGetters('tickets', {
				tickets: 'getList',
			}),

			...mapGetters('statuses', {
				getStatus: 'getOne',
			}),

			board() {
				return this.getBoard(this.$route.params.key)
			},

			ticketInitialStatus() {
				const mapsTo = this.board.lanes[0].mapsTo

				return Array.isArray(mapsTo) ? mapsTo[0].key : mapsTo.key
			}
		},
		methods: {
			deleteBoard(key) {
				this.$kaban.dispatch('DeleteBoardAction', {
					sender: this,
					payload: {
						boardKey: key
					}
				})
			}
		}
	}
</script>
