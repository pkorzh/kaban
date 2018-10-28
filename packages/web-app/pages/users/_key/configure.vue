<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				Configure user
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="localePath({name: 'users'})" text="Users" />
					<b-breadcrumb-item :to="localePath({name: 'users-key', params: {key: user.key}})" :text="user.name" />
				</b-breadcrumb>
			</template>
		</TopBar>

		<b-row>
			<b-col cols="2">
				<b-nav
						vertical
						class="section-nav">
					<b-nav-item
							:to="localePath({name: 'users-key-configure-general', params: {key: user.key}})">
						General
					</b-nav-item>
				</b-nav>
			</b-col>

			<b-col>
				<nuxt-child />
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		head() {
			return {
				title: `${this.user.name} Configuration`
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
	}
</script>
