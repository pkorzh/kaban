<template>
	<section>
		<p v-for="board in boardList" :key="board.key">
			<nuxt-link :to="{name: 'boards-key', params: {key: board.key}}">
				{{ board.name }}
			</nuxt-link>
		</p>
	</section>
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
