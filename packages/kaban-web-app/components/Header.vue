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

						<div class="dropdown-menu-holder">
							<ol>
								<li>
									<strong class="dropdown-menu-title">
										<nuxt-link :to="localePath({name: 'boards'})">
											<span v-t="'boards'"></span>
										</nuxt-link>
									</strong>
									<ul>
										<li v-for="board in boardList" :key="board.key">
											<nuxt-link :to="localePath({name: 'boards-key', params: {key: board.key}})">
												{{ board.name }}
											</nuxt-link>
										</li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">
										<nuxt-link :to="localePath({name: 'backlogs'})">
											<span v-t="'backlogs'"></span>
										</nuxt-link>
									</strong>
									<ul>
										<li v-for="backlog in backlogList" :key="backlog.key">
											<nuxt-link :to="localePath({name: 'backlogs-key', params: {key: backlog.key}})">
												{{ backlog.name }}
											</nuxt-link>
										</li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">
										<span v-t="'filters'"></span>
									</strong>
									<ul>
										<li>
											<nuxt-link :to="localePath({name: 'issues-search'})">
												<span v-t="'search'"></span>
											</nuxt-link>
										</li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">
										<nuxt-link :to="localePath({name: 'flatpages'})">
											<span v-t="'flatpages'"></span>
										</nuxt-link>
									</strong>
									<ul>
									</ul>
								</li>

								<li v-if="$auth.user.scope.includes('admin')">
									<strong class="dropdown-menu-title">
										Users
									</strong>
									<ul>
										<li>
											<nuxt-link :to="localePath({name: 'users'})">Manage Users</nuxt-link>
										</li>
										<li>
											<nuxt-link to="/">Invite team members</nuxt-link>
										</li>
									</ul>
								</li>

								<!--<li>
									<strong class="dropdown-menu-title">
										<nuxt-link to="/">Import</nuxt-link>
									</strong>
									<ul>
									</ul>
								</li>-->
							</ol>
						</div>
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

	export default {
		name: 'Header',
		computed: {
			...mapGetters('boards', {
				boardList: 'getList'
			}),

			...mapGetters('backlogs', {
				backlogList: 'getList'
			})
		},
		watch: {
			'$route'() {
				this.$refs.menuDropDown && this.$refs.menuDropDown.hide()
			}
		},
		methods: {
			logout() {
				this.$auth.logout()
						.then(() => {
							this.$router.go('login')
						})
			}
		}
	};
</script>

<style>
</style>
