<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				Boards
			</template>

			<ActionsNav>
				<ActionsNavSimpleSearch />

				<ActionsNavButton
					text="Create Backlog"
					action="CreateBacklogAction"
					shortkey="c" />
			</ActionsNav>
		</TopBar>

		<div class="board-table">
			<div class="board-table-holder">
				<div class="table">
					<div class="table-line table-line-head">
						<div class="table-line-name">Name</div>
						<div>Total tickets</div>
						<div class="text-center">
							Avrg lead time
							<img src="https://s3-eu-central-1.amazonaws.com/japanesevedro/monosnap/statistics_histograms_google_analytics_-_Poisk_v_Google_2018-08-04_08-43-27.png" alt="image description">
						</div>
						<div class="text-center">
							Avrg circle time
							<img src="https://s3-eu-central-1.amazonaws.com/japanesevedro/monosnap/statistics_histograms_google_analytics_-_Poisk_v_Google_2018-08-04_08-43-27.png" alt="image description">
						</div>
						<div class="table-line-action">Action</div>
					</div>

					<div class="table-line" v-for="board in boardList" :key="board.key">
						<div class="table-line-name">
							<nuxt-link :to="{name: 'boards-key', params: {key: board.key}}">
								{{ board.name }}
							</nuxt-link>
						</div>
						<div>Total tickets</div>
						<div class="text-center">Avrg lead time</div>
						<div class="text-center">Avrg circle time</div>
						<div class="table-line-action">
							<a href="#"><font-awesome-icon icon="ellipsis-h" /></a>
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
		}
	}
</script>

<style>

</style>
