<template>
	<section>
		<p v-for="backlog in backlogs" :key="backlog.slug">
			{{ backlog.name }}
		</p>
	</section>
</template>

<script>
	import { mapGetters } from 'vuex';
	
	export default {
		components: {
		},
		computed: {
			...mapGetters([
				'backlogs'
			])
		}
	}
</script>

<style>

</style>
