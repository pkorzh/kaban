<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				Backlogs
			</template>

			<ActionsNav>
				<ActionsNavSimpleSearch />
				<ActionsNavBoardViewSwitcher v-model="tableView" />
			</ActionsNav>

		</TopBar>

		<div class="backlog">
			<div class="backlog-holder" v-if="tableView">
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
			<!-- <div class="backlog-column">
				<div id="gantt"></div>
			</div> -->
			
			<div class="backlog-holder" v-if="!tableView">
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
			var names = [
			    ["Redesign website", [0, 7]],
			    ["Write new content", [1, 4]],
			    ["Apply new styles", [3, 6]],
			    ["Review", [7, 7]],
			    ["Deploy", [8, 9]],
			    ["Go Live!", [10, 10]]
			];

			var tasks = names.map(function(name, i) {
			    var today = new Date();
			    var start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			    var end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			    start.setDate(today.getDate() + name[1][0]);
			    end.setDate(today.getDate() + name[1][1]);
			    return {
			        start: start,
			        end: end,
			        name: name[0],
			        id: "Task " + i,
			        progress: parseInt(Math.random() * 100, 10)
			    }
			});
			tasks[1].dependencies = "Task 0"
			tasks[2].dependencies = "Task 1"
			tasks[3].dependencies = "Task 2"
			tasks[5].dependencies = "Task 4"

			return {
				tableView: true,
				tasks,
			}
		},
		computed: {
			...mapGetters('backlogs', {
				backlogList: 'getList'
			})
		},
	}
</script>

<style>

</style>
