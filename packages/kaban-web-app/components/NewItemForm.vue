<template>
	<div class="add-item">
		<form action="#" method="post" v-on:submit.prevent="submitForm">
			<input type="text" v-model="itemText" placeholder="Add something to the backlog">
		</form>
	</div>
</template>

<script>
	export default {
		name: 'NewItemForm',
		data() {
			return {
				itemText: ''
			};
		},
		methods: {
			submitForm() {
				if (this.itemText) {
					this.$store.commit('addItem', {
						text: this.itemText
					});

					this.itemText = '';
				}
			}
		}
	};
</script>

<style>
</style>
