<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Create Board
				</template>
			</TopBar>

			<button
				class="modal-box-close"
				@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			<b-form id="BoardCreateHighlight" @submit.prevent="create">
				<b-form-group label="Name">
					<b-form-input
						type="text"
						v-model="name"
						required
						placeholder="Board Name"></b-form-input>
				</b-form-group>
			</b-form>
		</div>
		<div class="modal-box-footer">
			<button
				class="btn btn-outline-danger"
				@click="$emit('close')">Close</button>
			<button
				type="submit"
				form="BoardCreateHighlight"
				class="btn btn-primary">Add</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: ''
			}
		},
		methods: {
			create() {

			}
		}
	}
</script>

<style>
</style>
