<template>
	<div>
		<table class="table table-hover mb-5" v-if="forecast">
			<caption>Forecast</caption>
			<thead>
				<tr>
					<th></th>
					<th class="text-right">Lower Bound</th>
					<th class="text-right">Upper Bound</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="text-right">Forecast End Date</td>
					<td class="text-right">
						{{ forecast.forecastEndAt[0] | moment('LL') }}
					</td>
					<td class="text-right">
						{{ forecast.forecastEndAt[1] | moment('LL') }}
					</td>
				</tr>
			</tbody>
		</table>

		<table class="table table-hover" v-if="forecast">
			<caption>Statistics</caption>
			<thead>
				<tr>
					<th></th>
					<th class="text-right">Lead Time</th>
					<th class="text-right">Circle Time</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="text-right">Average Lead Time</td>
					<td class="text-right">{{ humanize(forecast.avg) }}</td>
					<td></td>
				</tr>

				<tr>
					<td class="text-right">P50</td>
					<td class="text-right">{{ humanize(forecast.p50) }}</td>
					<td></td>
				</tr>

				<tr>
					<td class="text-right">P99</td>
					<td class="text-right">{{ humanize(forecast.p99) }}</td>
					<td></td>
				</tr>

				<tr>
					<td class="text-right">Variation Coefficient</td>
					<td class="text-right">{{ vc(forecast.var) }}</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import * as moment from 'moment'

	export default {
		async asyncData({store, params}) {
			const forecast = await store.dispatch(
				'backlogs/reports/fetchForecast', params.key)
			return { forecast }
		},
		methods: {
			humanize(ms) {
				return moment.duration(ms).humanize()
			},
			vc(val) {
				return `${Math.floor(val)}%`
			},
			vcUniform(val) {
				return val < 33
			}
		},
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			backlog() {
				return this.getBacklog(this.$route.params.key)
			},
		}
	}
</script>
