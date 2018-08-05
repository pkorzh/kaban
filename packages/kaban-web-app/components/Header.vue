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

					<b-nav-item-dropdown text="Menu" ref="menuDropDown">

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
										<nuxt-link to="/boards">Boards</nuxt-link>
									</strong>
									<ul>
										<li v-for="board in boardList" :key="board.key">
											<nuxt-link :to="{name: 'boards-key', params: {key: board.key}}">
												{{ board.name }}
											</nuxt-link>
										</li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">
										<nuxt-link to="/backlogs">Backlogs</nuxt-link>
									</strong>
									<ul>
										<li v-for="backlog in backlogList" :key="backlog.key">
											<nuxt-link :to="{name: 'backlogs-key', params: {key: backlog.key}}">
												{{ backlog.name }}
											</nuxt-link>
										</li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">
										<nuxt-link to="/">Filters</nuxt-link>
									</strong>
									<ul>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">
										<nuxt-link to="/">Users</nuxt-link>
									</strong>
									<ul>
										<li>
											<nuxt-link to="/">Manage Users</nuxt-link>
										</li>
										<li>
											<nuxt-link to="/">Invite team members</nuxt-link>
										</li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">
										<nuxt-link to="/">Import</nuxt-link>
									</strong>
									<ul>
									</ul>
								</li>
							</ol>
						</div>
					</b-nav-item-dropdown>

				</b-navbar-nav>

				<b-nav class="profile ml-auto">
					<b-nav-item active><font-awesome-icon icon="cog" /></b-nav-item>
					<b-nav-item>
						<font-awesome-icon icon="bell" />
						<span class="profile-mark"></span>
					</b-nav-item>
					<b-nav-item class="profile-avatar">
					</b-nav-item>
				</b-nav>

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
				this.$refs.menuDropDown.hide()
			}
		}
	};
</script>

<style>
</style>
