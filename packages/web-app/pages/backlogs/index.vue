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
					shortkey="c"
					action="CreateBacklogAction" />

				<!--<ActionsNavViewSwitcher
					v-model="tableView"
					icon1="table"
					icon2="align-left" />-->
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
						<b-dropdown-item @click="toggleBacklogIsArchive(row.item)">
							{{row.item.isArchived ? 'Unarchive' : 'Archive'}}
						</b-dropdown-item>
						<b-dropdown-divider />
						<b-dropdown-item-button class="text-danger" @click="deleteBacklog(row.item.key)">
							Delete
						</b-dropdown-item-button>
					</b-dropdown>
				</template>
			</b-table>

		<!--<Gantt
			:backlogs="backlogList"
			@dateChange="dateChange"
			v-if="!tableView" />-->
	</b-container>
</template>

<script>
	import Gantt from '@/components/Gantt'
	import { mapGetters, mapActions } from 'vuex';

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
		},
		methods: {
			...mapActions('backlogs', {
				patchBacklog: 'patch'
			}),
			deleteBacklog(key) {
				this.$kaban.dispatch('DeleteBacklogAction', {
					sender: this,
					payload: {
						backlogKey: key
					}
				})
			},
			toggleBacklogIsArchive(backlog) {
				this.patchBacklog({
					key: backlog.key,
					delta: {
						isArchived: !backlog.isArchived
					}
				})
			},
			dateChange({key, start, end}) {
			}
		}
	}
</script>

<style>

</style>
