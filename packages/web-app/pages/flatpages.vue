<template>
	<div class="docs">
		<b-collapse visible id="docs-side" class="docs-side">
			<ol>
				<li v-for="flatpage in flatpages" :key="flatpage.key">
					<nuxt-link
						:to="localePath({name: 'flatpages-key', params: {key: flatpage.key}})">
						{{ flatpage.name }}
					</nuxt-link>
				</li>
			</ol>
		</b-collapse>

		<div class="docs-content">
			<nuxt-child />
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		async fetch({store}) {
			await store.dispatch('flatpages/fetchList')
		},
		computed: {
			...mapGetters('flatpages', {
				flatpages: 'getList'
			})
		},
	}
</script>
