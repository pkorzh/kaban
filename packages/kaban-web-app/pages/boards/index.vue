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
					<nuxt-link :to="{name: 'backlogs-key', params: {key: data.item.key}}">
						{{ data.item.name }}
					</nuxt-link>
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
