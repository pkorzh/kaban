<template>
	<b-table
		striped
		hover
		caption-top
		:items="tickets"
		:fields="ticketFields">
			<template slot="table-caption">
				<ActionsNavColumns
					:fields="originalTicketFields"
					@columns="applyColumns" />
			</template>

			<template slot="name" slot-scope="data">
				<a
					:href="ticketUrl(data.item)"
					@click.prevent.stop="highlight(data.item)">
					{{ data.item.name }}
				</a>
			</template>

			<template slot="type.iconUrl" slot-scope="data">
				<img :src="data.item.type.iconUrl" style="max-width:20px;">
			</template>

			<template slot="priority.iconUrl" slot-scope="data">
				<img :src="data.item.priority.iconUrl" style="max-width:20px;">
			</template>
		</b-table>
</template>

<script>
	import { TicketBaseMixin, TicketsTableBaseMixin } from '@/mixins'

	export default {
		mixins: [TicketBaseMixin, TicketsTableBaseMixin],
		data() {
			return {
			}
		},
		computed: {
		},
		methods: {
		},
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		},
	}
</script>
