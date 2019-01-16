<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Create User
				</template>
			</TopBar>

			<button
					class="modal-box-close"
					@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			<p>Name: {{ user.name }}</p>
			<p>Email: {{ user.email }}</p>
			<p>Password: {{ user.password }}</p>
		</div>
		<div class="modal-box-footer">
			<button
					class="btn btn-outline-primary"
					@click="$emit('close')">Ok</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['user']
	}
</script>
