<template>
	<b-container fluid>
		<b-card-group deck>
			<b-card title="S3">
				<span 
					class="badge badge-success" 
					v-if="storageStatus === 's3'"
					v-t="'active'">
				</span>

				<p class="card-text">
					Use AWS Simple Storage Service
				</p>

				<nuxt-link 
					:to="localePath({name: 'kaban-configuration-storage-s3'})"
					class="btn btn-outline-success">
					{{ actionButtonText('s3') }}
				</nuxt-link>
			</b-card>
		</b-card-group>
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		head() {
			return {
				title: this.$t('storageConfig')
			}
		},
		computed: {
			...mapGetters('kabanConfiguration', [
				'storageStatus',
			]),
		},
		methods: {
			actionButtonText(type) {
				if (this.storageStatus === type) {
					return this.$t('change');
				} else {
					return this.$t('setup');
				}
			}
		}
	}
</script>

<style>

</style>
