<template>
	<div>
		<b-table
			striped
			hover
			caption-top
			ref="table"
			:items="tickets"
			:fields="ticketFields"
			@row-clicked="rowclicked">
				<template slot="table-caption">
					<ActionsNavColumns
						:fields="originalTicketFields"
						@columns="applyColumns" />

					<ActionsNavMultipleEdit
						class="ml-3"
						v-if="selectedTickets.length > 0"
						:tickets="selectedTickets" />
				</template>

				<template slot="name" slot-scope="data">
					<a
						:href="ticketUrl(data.item)"
						@click.prevent.stop="highlight(data.item)">
						{{ data.item.name }}
					</a>
				</template>

				<template slot="type.iconUrl" slot-scope="data">
					<img
						:src="data.item.type.iconUrl"
						style="max-width: 20px;min-width: 20px;">
				</template>

				<template slot="priority.iconUrl" slot-scope="data">
					<img
						:src="data.item.priority.iconUrl"
						style="max-width: 20px;min-width: 20px;">
				</template>
			</b-table>
	</div>
</template>

<script>
	import { TicketBaseMixin, TicketsTableBaseMixin } from '@/mixins'

	export default {
		mixins: [TicketBaseMixin, TicketsTableBaseMixin],
		data() {
			return {
				selectedTickets: []
			}
		},
		computed: {
			/*selectedTickets() {
				return this.tickets.filter(t => t._rowVariant == 'info')
			}*/
		},
		methods: {
			rowclicked(item, index, event) {
				/*if (event.metaKey || event.ctrlKey) {
					this.$set(item, '_rowVariant',
						item._rowVariant == 'info' ? null : 'info')
				}*/
			}
		},
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		},
	}
</script>
