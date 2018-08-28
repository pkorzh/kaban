export default {
	data() {
		return {
			selectedTicketFields: [],
			originalTicketFields: [
				{
					key: 'type.iconUrl',
					label: 'T',
					sortable: false,
				},
				{
					key: 'name',
					label: 'Name',
					sortable: true,
				},
				{
					key: 'assignee.name',
					label: 'Assignee',
					sortable: true,
				},
				{
					key: 'reporter.name',
					label: 'Reporter',
					sortable: true,
				},
				{
					key: 'priority.iconUrl',
					label: 'P',
					sortable: true,
				},
				{
					key: 'status.name',
					label: 'Status',
					sortable: true,
				},
				{
					key: 'resolution.name',
					label: 'Resolution',
					sortable: true,
				},
				{
					key: 'resolvedAt',
					label: 'Resolved',
					sortable: true,
					formatter: (date) => date && this.$moment(date).format('LL'),
				},
				{
					key: 'createdAt',
					label: 'Created',
					sortable: true,
					formatter: (date) => this.$moment(date).format('LL'),
				},
				{
					key: 'updatedAt',
					label: 'Updated',
					sortable: true,
					formatter: (date) => this.$moment(date).format('LL'),
				},
			]
		}
	},
	methods: {
		applyColumns(fields) {
			this.selectedTicketFields = fields
		}
	},
	computed: {
		ticketFields() {
			return this.selectedTicketFields.length
				? this.selectedTicketFields
				: this.originalTicketFields
		}
	}
}
