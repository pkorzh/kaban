<template>
	<b-container fluid>
		<b-card-group deck>
			<b-card title="Telegram">
				<p class="card-text">
Telegram is a cloud-based mobile and desktop messaging app with a focus on security and speed.
				</p>
				<nuxt-link 
					:to="localePath({name: 'kaban-configuration-notification-telegram'})"
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
				title: this.$t('notificationConfig')
			}
		}
	}
</script>

<style>

</style>
