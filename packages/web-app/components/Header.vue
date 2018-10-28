<template>
	<b-container fluid>
		<b-navbar toggleable="md" class="header">
			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

			<b-navbar-brand to="/">
				<img
					src="../assets/images/kaban-logo.svg"
					width="150px"
					alt="Kaban">
			</b-navbar-brand>

			<b-collapse is-nav id="nav_collapse">

				<b-navbar-nav>

					<b-nav-item-dropdown
							class="site-menu"
							v-if="$auth.$state.loggedIn"
							text="Menu"
							ref="menuDropDown">

						<form
							action="#"
							class="form-search"
							v-if="false">
							<fieldset>
								<input type="text" placeholder="Find a service by name or feature">
								<button><font-awesome-icon icon="search" /></button>
							</fieldset>
						</form>

						<AppMenu v-if="$auth.$state.loggedIn" />
					</b-nav-item-dropdown>

				</b-navbar-nav>

				<b-navbar-nav class="ml-auto">
					<template v-if="$auth.$state.loggedIn">
						<b-nav-item-dropdown :text="$auth.user.name" right>
							<b-dropdown-item @click="logout()">Logout</b-dropdown-item>
						</b-nav-item-dropdown>
						<b-img :src="$auth.user.avatar" class="mt-1" rounded="circle" width="30px" height="30px" />
					</template>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</b-container>
</template>

<script>
	import { mapGetters } from 'vuex';
	import AppMenu from './AppMenu';

	export default {
		name: 'Header',
		components: {
			AppMenu,
		},
		methods: {
			logout() {
				this.$auth.logout()
						.then(() => {
							return this.$router.go('login')
						})
			}
		},
		watch: {
			'$route'() {
				this.$refs.menuDropDown && this.$refs.menuDropDown.hide()
			}
		},
	};
</script>

<style>
</style>
