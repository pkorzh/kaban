<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				<span v-t="'backlogs'"></span>
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
					<nuxt-link :to="localePath({name: 'backlogs-key', params: {key: data.item.key}})">
						{{ data.item.name }}
					</nuxt-link>
				</template>

				<template slot="action" slot-scope="row">
					<b-dropdown variant="link" size="sm" right no-caret>
						<template slot="button-content">
							<font-awesome-icon icon="ellipsis-v" />
						</template>
						<b-dropdown-item
							:to="localePath({name: 'backlogs-key-reports-forecast', params: {key: row.item.key}})">
							Reports
						</b-dropdown-item>
						<b-dropdown-item
							:to="localePath({name: 'backlogs-key-configure-general', params: { key: row.item.key }})">
							Configure
						</b-dropdown-item>
						<b-dropdown-item>
							Archive
						</b-dropdown-item>
						<b-dropdown-divider />
						<b-dropdown-item-button class="text-danger">
							Delete
						</b-dropdown-item-button>
					</b-dropdown>
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
		head() {
			return {
				title: 'Backlogs'
			}
		},
		data() {
			return {
				tableView: true,
				backlogFields: {
					name: {
						label: this.$t('name'),
						sortable: true,
					},
					description: {
						label: this.$t('description'),
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
				const date = new Date()
				date.setDate(date.getDate() + 10)
				return this.backlogList.map(backlog => ({
					name: backlog.name,
					start: backlog.createdAt,
					end: date,
					id: backlog.key,
					progress: 40,
				}))
			}
		},
	}
</script>

<style>

</style>
