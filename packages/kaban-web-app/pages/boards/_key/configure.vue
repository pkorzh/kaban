<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				Configure Board
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item :to="{name: 'boards'}" text="Boards" />
					<b-breadcrumb-item :to="{name: 'boards-key', params: {key: board.key}}" :text="board.name" />
				</b-breadcrumb>
			</template>
		</TopBar>

		<b-row>
			<b-col cols="2">
			</b-col>

			<b-col>
				<nuxt-child />
			</b-col>
		</b-row>
	</b-container>
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
