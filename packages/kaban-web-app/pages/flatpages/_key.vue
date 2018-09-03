<template>
	<div>
		<div class="docs-bar">
			<div class="docs-bar-holder">
				<button
					v-b-toggle.docs-side
					class="btn btn-light">
					<font-awesome-icon icon="align-justify" />
				</button>

				<button
					class="btn btn-light">
					<font-awesome-icon icon="pen" />
				</button>
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

	export default {
		async asyncData({store}) {
			return {
				content: await store.dispatch('flatpages/getContent')
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
