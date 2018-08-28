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
				<b-nav vertical pills>
					<b-nav-item
						:to="{name: 'boards-key-configure-general', params: {key: board.key}}">
						General
					</b-nav-item>

					<b-nav-item
						:to="{name: 'boards-key-configure-card-colors', params: {key: board.key}}">
						Card Colors
					</b-nav-item>
				</b-nav>
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
