<template>
	<div>
		<div class="docs-bar">
			<div class="docs-bar-holder">
				<button
					v-b-toggle.docs-side
					class="btn btn-light">
					<font-awesome-icon icon="align-justify" />
				</button>

				<nuxt-link
					class="btn btn-light"
					:to="localePath({name: 'flatpages-key-edit', params: { key: flatpage.key }})">
					<font-awesome-icon icon="pen" />
				</nuxt-link>
			</div>

				<nuxt-link
					class="btn btn-light"
					:to="localePath({name: 'flatpages-new'})">
					<font-awesome-icon icon="file" />
				</nuxt-link>
		</div>

		<div class="docs-content-holder">
			<h1>{{ flatpage.name }}</h1>
			<div v-html="content"></div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import marked from 'marked'

	export default {
		async asyncData({store, params}) {
			const md = await store.dispatch(
				'flatpages/getContent',
				params.key,
			)

			return {
				content: marked(md)
			}
		},
		computed: {
			...mapGetters('flatpages', {
				getFlatpage: 'getOne'
			}),

			flatpage() {
				return this.getFlatpage(this.$route.params.key)
			},
		}
	}
</script>
