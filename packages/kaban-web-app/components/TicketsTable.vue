<template>
	<b-table
		striped
		hover
		:items="tickets"
		:fields="ticketFields">
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
	import {TicketBaseMixin} from '@/mixins'

	export default {
		mixins: [TicketBaseMixin],
		data() {
			return {
				ticketFields: {
					'type.iconUrl': {
						label: 'T',
						sortable: false,
					},
					name: {
						label: 'Name',
						sortable: true,
					},
					'assignee.name': {
						label: 'Assignee',
						sortable: true,
					},
					'reporter.name': {
						label: 'Reporter',
						sortable: true,
					},
					'priority.iconUrl': {
						label: 'P',
						sortable: true,
					},
					'status.name': {
						label: 'Status',
						sortable: true,
					},
					'createdAt': {
						label: 'Created',
						sortable: true,
					},
					'updatedAt': {
						label: 'Updated',
						sortable: true,
					},
					'resolvedAt': {
						label: 'Resolved',
						sortable: true,
					},
				}
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
