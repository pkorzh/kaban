<template>
	<b-container fluid>
		<p v-for="backlog in backlogList" :key="backlog.key">
			<nuxt-link :to="{name: 'backlogs-key', params: {key: backlog.key}}">
				{{ backlog.name }}
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
			...mapGetters('backlogs', {
				backlogList: 'getList'
			})
		}
	}
</script>

<style>

</style>
