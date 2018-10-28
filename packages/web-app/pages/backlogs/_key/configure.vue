<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				<span v-t="'configureBacklog'"></span>
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="localePath({name: 'backlogs'})" text="Backlogs" />
					<b-breadcrumb-item :to="localePath({name: 'backlogs-key', params: {key: backlog.key}})" :text="backlog.name" />
				</b-breadcrumb>
			</template>
		</TopBar>

		<b-row>
			<b-col cols="2">
				<b-nav
					vertical
					class="section-nav">
					<b-nav-item
						:to="localePath({name: 'backlogs-key-configure-general', params: {key: backlog.key}})">
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
				title: `${this.backlog.name} Configuration`
			}
		},
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			backlog() {
				return this.getBacklog(this.$route.params.key)
			},
		},
	}
</script>
