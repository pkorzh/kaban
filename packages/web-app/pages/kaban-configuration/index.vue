<template>
	<b-container fluid>
		<table class="table table-hover mb-5">
			<thead>
				<tr>
					<th v-t="'options'"></th>
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
								<span v-t="'change'"></span>
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
			...mapGetters('kabanConfiguration', ['storageStatus'])
		}
	}
</script>

<style>

</style>
