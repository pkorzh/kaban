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

		<b-table
			striped
			hover
			:items="boardList"
			:fields="boardFields">
				<template slot="name" slot-scope="data">
					<nuxt-link :to="{name: 'boards-key', params: {key: data.item.key}}">
						{{ data.item.name }}
					</nuxt-link>
				</template>

				<template slot="action" slot-scope="data">
					<b-dropdown variant="link" size="sm" right no-caret>
						<template slot="button-content">
							<font-awesome-icon icon="ellipsis-v" />
						</template>
						<b-dropdown-item
							:to="{name: 'boards-key-configure-general', params: { key: data.item.key }}">
							Configure
						</b-dropdown-item>
						<b-dropdown-divider />
						<b-dropdown-item-button class="text-danger">
							Delete
						</b-dropdown-item-button>
					</b-dropdown>
				</template>
			</b-table>
	</b-container>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				boardFields: {
					name: {
						label: 'Name',
						sortable: true,
					},
					tql: {
						label: 'TQL',
						sortable: false,
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
			...mapGetters('boards', {
				boardList: 'getList'
			})
		},
	}
</script>

<style>

</style>
