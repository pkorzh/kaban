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
					action="CreateBacklogAction" />

				<ActionsNavViewSwitcher
					v-model="tableView"
					icon1="table"
					icon2="align-left" />
			</ActionsNav>

		</TopBar>

		<b-table
			striped
			hover
			:items="backlogList"
			:fields="backlogFields"
			v-if="tableView">
				<template slot="name" slot-scope="data">
					<nuxt-link :to="{name: 'backlogs-key', params: {key: data.item.key}}">
						{{ data.item.name }}
					</nuxt-link>
				</template>

				<template slot="action" slot-scope="row">
					<b-button variant="link" size="sm" @click="row.toggleDetails">
						{{ row.detailsShowing ? 'Collapse' : 'Expand'}}
					</b-button>
				</template>

				<template slot="row-details" slot-scope="row">
				</template>
			</b-table>

		<Gantt
			:tasks="tasks"
			v-if="!tableView" />
	</b-container>
</template>

<script>
	import Gantt from '@/components/Gantt'
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				tableView: true,
				backlogFields: {
					name: {
						label: 'Name',
						sortable: true,
					},
					description: {
						label: 'Description',
						sortable: false,
					},
					action: {
						label: '',
						sortable: false,
					}
				}
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
