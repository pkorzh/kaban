<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				<span v-t="'reports'"></span>
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="localePath({name: 'backlogs'})" text="Boards" />
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
						:to="localePath({name: 'backlogs-key-reports-cumulative', params: {key: backlog.key}})">
						Cumulative Flow Diagram
					</b-nav-item>
					<b-nav-item
						:to="localePath({name: 'backlogs-key-reports-workload', params: {key: backlog.key}})">
						Workload Report
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
				title: `${this.backlog.name} Reports`
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
