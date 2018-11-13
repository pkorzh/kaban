<template>
	<b-container fluid>
		<b-form-group
			description="Domain">
			<LiveEditInput
				:content="general.domain"
				action="kabanConfiguration/patchConfiguration"
				path="general.domain" />
		</b-form-group>

		<table class="table table-hover mb-5">
			<thead>
				<tr>
					<th class="text-right" v-t="'options'"></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="text-right" v-t="'storageConfig'"></td>
					<td class="text-right">
						{{ storageStatus || 'None' }}
						<div>
							<nuxt-link :to="localePath({name: 'kaban-configuration-storage'})">
								{{ actionButtonText(storageStatus) }}
							</nuxt-link>
						</div>
					</td>
				</tr>
				<tr>
					<td class="text-right" v-t="'notificationConfig'"></td>
					<td class="text-right">
						{{ notificationStatus || 'None' }}
						<div>
							<nuxt-link :to="localePath({name: 'kaban-configuration-notification'})">
								{{ actionButtonText(notificationStatus) }}
							</nuxt-link>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</b-container>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		head() {
			return {
				title: this.$t('kabanConfiguration')
			}
		},
		computed: {
			...mapGetters('kabanConfiguration', [
				'storageStatus',
				'notificationStatus',
				'general',
			]),
		},
		methods: {
			actionButtonText(status) {
				return status 
					? this.$t('change')
					: this.$t('set');
			}
		}
	}
</script>

<style>

</style>
