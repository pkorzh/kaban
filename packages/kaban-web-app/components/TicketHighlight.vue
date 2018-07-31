<template>
	<div>
		<p>
			{{ ticket.name }}
		</p>
		<nuxt-link to="/issues/ama-12">
			go
		</nuxt-link>
	</div>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {
				goBack: true
			}
		},
		methods: {
			/*onpopstate() {
				this.goBack = false
				this.$emit('close')
			}*/
		},
		mounted() {
			/*history.pushState(
				{highlight: true},
				this.ticket.name,
				`/issues/${this.ticket.key}`
			)

			window.onpopstate = this.onpopstate.bind(this)*/
		},
		destroyed() {
			/*this.goBack && this.$router.go(-1)
			window.onpopstate = null*/
		},
		watch: {
			'$route'(to, from) {
				this.$emit('close')
			}
		}
	}
</script>

<style>
</style>
