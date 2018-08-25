<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				Boards
			</template>

			<ActionsNav>
				<!--<ActionsNavSimpleSearch />-->

				<ActionsNavButton
					text="Create Board"
					action="CreateBoardAction"
					shortkey="c" />
			</ActionsNav>
		</TopBar>

		<div class="board-table">
			<div class="board-table-holder">
				<div class="table">
					<div class="table-line table-line-head">
						<div>Name</div>
						<div class="table-line-name">Description</div>
						<div class="table-line-action"></div>
					</div>

					<div
						class="table-line"
						v-for="board in boardList"
						:key="board.key">
						<div>
							<nuxt-link :to="{name: 'boards-key', params: {key: board.key}}">
								{{ board.name }}
							</nuxt-link>
						</div>
						<div class="table-line-name">
							{{ board.description }}
						</div>
						<div class="table-line-action">
							<b-dropdown variant="link" no-caret>
								<template slot="button-content">
									<font-awesome-icon icon="ellipsis-v" />
								</template>
								<b-dropdown-item href="">Start</b-dropdown-item>
							</b-dropdown>
						</div>
					</div>
				</div>
			</div>
		</div>
	</b-container>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		components: {
		},
		computed: {
			...mapGetters('boards', {
				boardList: 'getList'
			})
		},
	}
</script>

<style>

</style>
