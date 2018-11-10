<template>
	<b-container fluid>
		<b-card-group deck>
			<b-card title="Telegram">
				<span 
					class="badge badge-success" 
					v-if="notificationStatus === 'telegram'"
					v-t="'active'">
				</span>

				<p class="card-text">
Telegram is a cloud-based mobile and desktop messaging app with a focus on security and speed.
				</p>
				<nuxt-link 
					:to="localePath({name: 'kaban-configuration-notification-telegram'})"
					class="btn btn-outline-success">
					{{ actionButtonText('telegram') }}
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
		},
		computed: {
			...mapGetters('kabanConfiguration', [
				'notificationStatus',
			]),
		},
		methods: {
			actionButtonText(type) {
				if (this.notificationStatus === type) {
					return this.$t('change');
				} else {
					return this.$t('setup');
				}
			}
		}
	}
</script>
