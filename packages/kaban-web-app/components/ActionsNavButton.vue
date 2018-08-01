<template>
	<button
		class="btn btn-light"
		v-shortkey.once="['c']"
		@shortkey="handleAction()">Add</button>
</template>

<script>
	export default {
		props: {
			action: {
				type: String
			},
			text: {
				type: String
			}
		},
		methods: {
			handleAction() {
				if (this.action) {

				}
			}
		}
	}
</script>
