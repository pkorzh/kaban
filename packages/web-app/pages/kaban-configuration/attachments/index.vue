<template>
	<b-container fluid>
		<b-card-group deck>
			<b-card title="S3">
				<p class="card-text">
					Use AWS Simple Storage Service to store your attachments
				</p>
				<nuxt-link 
					:to="localePath({name: 'kaban-configuration-attachments-s3'})"
					class="btn btn-outline-success">
					<span v-t="'setup'"></span>
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
				title: this.$t('attachmentsStoreConfig')
			}
		},
	}
</script>

<style>

</style>
