<template>
	<section>
		<p v-for="backlog in backlogList" :key="backlog.key">
			<nuxt-link :to="{name: 'backlogs-key', params: {key: backlog.key}}">
				{{ backlog.name }}
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
			...mapGetters('backlogs', {
				backlogList: 'list'
			})
		}
	}
</script>

<style>

</style>
