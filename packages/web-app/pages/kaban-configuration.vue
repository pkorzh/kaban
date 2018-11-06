<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				<span v-t="'kabanConfiguration'"></span>
			</template>

			<template slot="breadcrumb">
			</template>
		</TopBar>

		<b-row>
			<b-col cols="2">
				<b-nav vertical class="section-nav">
					<b-nav-item
						:to="localePath({name: 'kaban-configuration'})">
						<span v-t="'general'"></span>
					</b-nav-item>
					<b-nav-item
						:to="localePath({name: 'kaban-configuration-storage'})">
						<span v-t="'storageConfig'"></span>
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
				title: this.$t('kabanConfiguration')
			}
		},
		computed: {
		},
	}
</script>
