<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				Boards
			</template>

			<ActionsNav>
				<ActionsNavSimpleSearch />
			</ActionsNav>
		</TopBar>

		<p v-for="board in boardList" :key="board.key">
			<nuxt-link :to="{name: 'boards-key', params: {key: board.key}}">
				{{ board.name }}
			</nuxt-link>
		</p>
	</b-container>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		components: {
		},
		computed: {
			...mapGetters('boards', {
				boardList: 'getList'
			})
		}
	}
</script>

<style>

</style>
