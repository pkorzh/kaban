<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Create Backlog
				</template>
			</TopBar>

			<button
				class="modal-box-close"
				@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			<form>
				<div class="form-group row">
					<label class="col-sm-2 col-form-label">
						Backlog name
					</label>
					<div class="col-sm-10">
						<input
							type="text"
							class="form-control"
							placeholder="Name">
					</div>
				</div>
			</form>
		</div>
		<div class="modal-box-footer">
			<button
				class="btn btn-outline-danger"
				@click="$emit('close')">Close</button>
			<button class="btn btn-primary">Add</button>
		</div>
	</div>
</template>

<script>
	export default {
	}
</script>

<style>
</style>
