<template>
	<button
		class="btn btn-light ml-3"
		v-shortkey.once="[this.shortkey]"
		@shortkey="handleAction()">
			<font-awesome-icon v-if="icon" :icon="icon" />
			{{ text }}</button>
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
			},
			icon: {
				type: String,
				required: false
			}
		},
		methods: {
			handleAction() {
				this.$kaban.dispatch(this.action, {sender: this})
			}
		}
	}
</script>
