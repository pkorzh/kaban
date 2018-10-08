<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				{{ user.name }}
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="localePath({name: 'users'})" text="Users" />
				</b-breadcrumb>
			</template>

			<ActionsNav>
				<div class="actions-nav-separator"></div>

				<b-dropdown variant="light" right no-caret>
					<template slot="button-content">
						<font-awesome-icon icon="cog" />
					</template>
					<b-dropdown-item
							:to="localePath({name: 'users-key-configure-general', params: { key: user.key }})">
						Configure
					</b-dropdown-item>
					<b-dropdown-divider />
					<b-dropdown-item-button class="text-danger" @click="deleteUser(user.key)">
						Delete
					</b-dropdown-item-button>
				</b-dropdown>
			</ActionsNav>
		</TopBar>
	</b-container>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		head() {
			return {
				title: this.user.name
			}
		},
		computed: {
			...mapGetters('users', {
				getUser: 'getOne'
			}),

			user() {
				return this.getUser(this.$route.params.key)
			},
		},
		methods: {
			deleteUser(key) {
				this.$kaban.dispatch('DeleteUserAction', {
					sender: this,
					payload: {
						userKey: key,
						goBack: 'users'
					}
				})
			},
		}
	}
</script>
