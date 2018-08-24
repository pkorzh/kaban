<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				Backlogs
			</template>

			<ActionsNav>
				<!--<ActionsNavSimpleSearch />-->

				<ActionsNavButton
					text="Create Backlog"
					action="CreateBacklogAction"
					shortkey="c" />

				<ActionsNavViewSwitcher
					v-model="tableView"
					icon1="bars"
					icon2="align-left" />
			</ActionsNav>

		</TopBar>

		<div class="backlog" v-if="tableView">
			<div class="backlog-holder">
				<div class="backlog-table table">
					<div class="table-line table-line-head">
						<div class="table-line-name">Task Name</div>
						<div>Board</div>
						<div>
							Estimated Finish
						</div>
						<div class="table-line-action"></div>
					</div>

					<div class="table-line" v-for="backlog in backlogList" :key="backlog.key">
						<div class="table-line-name">
							<nuxt-link :to="{name: 'backlogs-key', params: {key: backlog.key}}">
								{{ backlog.name }}
							</nuxt-link>
						</div>
						<div>
							<nuxt-link :to="{name: 'boards-key', params: {key: backlog.board.key}}">
								{{ backlog.board.key }}
							</nuxt-link>
						</div>
						<div>
							Not Enough Data
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

		<div class="backlog backlog-gantt" v-if="!tableView">
			<div class="backlog-holder">
				<Gantt :tasks="tasks" />
			</div>
		</div>
	</b-container>
</template>

<script>
	import Gantt from '@/components/Gantt'
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				tableView: true
			}
		},
		computed: {
			...mapGetters('backlogs', {
				backlogList: 'getList'
			}),

			tasks() {
				return this.backlogList.map(backlog => ({
					name: backlog.name,
					start: backlog.createdAt,
					end: null,
					id: backlog.key,
					progress: 0,
				}))
			}
		},
	}
</script>

<style>

</style>
