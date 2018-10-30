<template>
	<LiveEditTextarea
		:content="ticket.description"
		action="tickets/patch"
		path="description"
		:readonly="isArchived"
		:_key="ticket.key">
		<template slot="display">
			<div v-html="markedContent"></div>
		</template>
	</LiveEditTextarea>
</template>

<script>
	import marked from 'marked'

	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			},
			isArchived: {
				type: Boolean,
				required: false,
			}
		},
		computed: {
			markedContent() {
				return marked(this.ticket.description) || this.$t('clickToEdit')
			}
		}
	}
</script>
