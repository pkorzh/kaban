<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				<span v-t="'boards'"></span>
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
					<nuxt-link :to="localePath({name: 'boards-key', params: { key: data.item.key }})">
						{{ data.item.name }}
					</nuxt-link>
				</template>

				<template slot="action" slot-scope="data">
					<b-dropdown variant="link" size="sm" right no-caret>
						<template slot="button-content">
							<font-awesome-icon icon="ellipsis-v" />
						</template>
						<b-dropdown-item
							:to="localePath({name: 'boards-key-configure-general', params: { key: data.item.key }})">
							Configure
						</b-dropdown-item>
						<b-dropdown-divider />
						<b-dropdown-item-button class="text-danger" @click="deleteBoard(data.item.key)">
							Delete
						</b-dropdown-item-button>
					</b-dropdown>
				</template>
			</b-table>
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		head() {
			return {
				title: 'Boards'
			}
		},
		data() {
			return {
				boardFields: {
					name: {
						label: this.$t('name'),
						sortable: true,
					},
					tql: {
						label: this.$t('tql'),
						sortable: false,
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
			...mapGetters('boards', {
				boardList: 'getList'
			})
		},
		methods: {
			deleteBoard(key) {
				this.$kaban.dispatch('DeleteBoardAction', {
					sender: this,
					payload: {
						boardKey: key,
						goBack: true
					}
				})
			}
		}
	}
</script>

<style>

</style>
