<template>
	<div>
		<form
			action="#"
			class="form mb-3"
			method="post"
			v-on:submit.prevent="submitForm">
			<input
				type="text"
				v-model="itemText"
				class="form-control"
				placeholder="Add something to the backlog">
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				itemText: ''
			};
		},
		methods: {
			submitForm() {
				if (this.itemText) {
					this.$emit('newItem', this.itemText);

					this.itemText = '';
				}
			}
		}
	};
</script>

<style>
</style>
