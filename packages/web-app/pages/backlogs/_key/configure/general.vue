<template>
	<div>
		<div>
			<b-form-group
				description="Backlog name">
				<LiveEditInput
					:content="backlog.name"
					action="backlogs/patch"
					path="name"
					:_key="backlog.key" />
			</b-form-group>

			<b-form-group
				description="Backlog description">
				<LiveEditTextarea
					:content="backlog.description"
					action="backlogs/patch"
					path="description"
					:_key="backlog.key" />
			</b-form-group>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			backlog() {
				const b = this.getBacklog(this.$route.params.key)
				return b
			},
		},
	}
</script>
