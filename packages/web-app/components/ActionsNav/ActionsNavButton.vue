<template>
	<button
		class="btn btn-light"
		v-shortkey="[shortkey]"
		@shortkey="handleAction()"
		@click="handleAction()">
			<font-awesome-icon v-if="icon" :icon="icon" />
			{{ text }}</button>
</template>

<script>
	export default {
		props: {
			action: {
				type: String,
				required: false,
			},
			text: {
				type: String,
				required: false,
			},
			shortkey: {
				type: String,
				required: false
			},
			icon: {
				type: String,
				required: false
			},
		},
		methods: {
			handleAction() {
				if (this.action) {
					this.$kaban.dispatch(this.action, {sender: this})
				}

				this.$emit('click')
			}
		}
	}
</script>
