<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				<span v-t="'users'"></span>
			</template>

			<ActionsNav>
				<!--<ActionsNavSimpleSearch />-->

				<ActionsNavButton
					text="Create User"
					action="CreateUserAction" />
			</ActionsNav>

		</TopBar>

		<b-table
			striped
			hover
			:items="userList"
			:fields="userFields">
				<template slot="name" slot-scope="data">
					<nuxt-link :to="localePath({name: 'users-key', params: {key: data.item.key}})">
						{{ data.item.name }}
					</nuxt-link>
				</template>

				<template slot="action" slot-scope="row">
					<b-dropdown variant="link" size="sm" right no-caret>
						<template slot="button-content">
							<font-awesome-icon icon="ellipsis-v" />
						</template>
						<b-dropdown-item
							:to="localePath({name: 'users-key-configure-general', params: { key: row.item.key }})">
							Configure
						</b-dropdown-item>
						<b-dropdown-divider />
						<b-dropdown-item-button class="text-danger" @click="deleteUser(row.item.key)">
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
		async fetch({store, params, error}) {
			await store.dispatch('users/fetchList')
		},
		head() {
			return {
				title: 'Users'
			}
		},
		data() {
			return {
				userFields: {
					name: {
						label: this.$t('name'),
						sortable: true,
					},
					description: {
						label: this.$t('description'),
						sortable: false,
					},
					email: {
						label: 'Email',
						sortable: true,
					},
					action: {
						label: '',
						sortable: false,
					}
				}
			}
		},
		computed: {
			...mapGetters('users', {
				userList: 'getList'
			}),
		},
		methods: {
			...mapActions('users', {
				patchUser: 'patch'
			}),
			deleteUser(key) {
				this.$kaban.dispatch('DeleteUserAction', {
					sender: this,
					payload: {
						userKey: key
					}
				})
			}
		}
	}
</script>

<style>

</style>
