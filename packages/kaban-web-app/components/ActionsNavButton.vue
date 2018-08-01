<template>
	<button
		class="btn btn-light ml-3"
		v-shortkey.once="[this.shortkey]"
		@shortkey="handleAction()">Add</button>
</template>

<script>
	export default {
		props: {
			action: {
				type: String,
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
			shortkey: {
				type: String,
				required: true,
			}
		},
		methods: {
			handleAction() {
				this.$kaban.dispatch(this.action, {sender: this})
			}
		}
	}
</script>
