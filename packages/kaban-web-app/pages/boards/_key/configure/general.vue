<template>
	<div>
		<TopBar>
			<template slot="header">
				General & Filters
			</template>
		</TopBar>
		<div>
			<b-form-group
				label="Name"
				description="Board name">
				<LiveEditInput
					:content="board.name"
					:display="board.name"
					action="boards/patch"
					path="name"
					:_key="board.key" />
			</b-form-group>

			<b-form-group
				label="TQL"
				description="Board query">
				<LiveEditInput
					:content="board.tql"
					:display="board.tql"
					action="boards/patch"
					path="tql"
					:_key="board.key" />
			</b-form-group>

			<b-form-group
				label="Description"
				description="Board description">
				<LiveEditTextarea
					:content="board.description"
					:display="board.description"
					action="boards/patch"
					path="description"
					:_key="board.key" />
			</b-form-group>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('boards', {
				getBoard: 'getOne'
			}),

			board() {
				return this.getBoard(this.$route.params.key)
			},
		},
	}
</script>
