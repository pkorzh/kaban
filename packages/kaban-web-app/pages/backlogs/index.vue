<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				Backlogs
			</template>

			<ActionsNav>
				<ActionsNavSimpleSearch />
			</ActionsNav>
		</TopBar>

		<div class="backlog">
			<div class="backlog-column">
				<div class="backlog-table">
					<div class="backlog-table-line backlog-table-line-head">
						<div class="backlog-table-line-name">Task Name</div>
						<div class="backlog-table-line-duration">Duration</div>
						<div class="backlog-table-line-date">
							<a href="#" class="backlog-table-sort">Start</a>
						</div>
						<div class="backlog-table-line-date">
							<a href="#" class="backlog-table-sort">Finish</a>
						</div>
						<div class="backlog-table-line-pred">Predecessors</div>
						<div class="backlog-table-line-pred">Predecessors</div>
					</div>

					<div class="backlog-table-line" v-for="backlog in backlogList" :key="backlog.key">
						<div class="backlog-table-line-name">
							<nuxt-link :to="{name: 'backlogs-key', params: {key: backlog.key}}">
								{{ backlog.name }}
							</nuxt-link>
						</div>
						<div class="backlog-table-line-duration">1d</div>
						<div class="backlog-table-line-date">06/07/18</div>
						<div class="backlog-table-line-date">06/07/18</div>
						<div class="backlog-table-line-pred">1</div>
						<div class="backlog-table-line-pred">1</div>
					</div>
				</div>
			</div>
			<div class="backlog-column">
				
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
			...mapGetters('backlogs', {
				backlogList: 'getList'
			})
		}
	}
</script>

<style>

</style>
