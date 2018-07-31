<template>
	<div class="actions-nav">
		<b-dropdown text="Quick Filters" class="ml-3">
			<form action="#" class="form-search">
				<fieldset>
					<input type="search" placeholder="Find a service by name or feature">
					<button><font-awesome-icon icon="search" /></button>
				</fieldset>
			</form>
			<b-dropdown-item>First Action</b-dropdown-item>
			<b-dropdown-item>Second Action</b-dropdown-item>
		</b-dropdown>
		
		<b-dropdown text="Assigned" class="ml-3">
			<b-dropdown-item>First Action</b-dropdown-item>
			<b-dropdown-item>Second Action</b-dropdown-item>
			<b-dropdown-item>Third Action</b-dropdown-item>
			<b-dropdown-divider></b-dropdown-divider>
			<b-dropdown-item>Something else here...</b-dropdown-item>
			<b-dropdown-item disabled>Disabled action</b-dropdown-item>
		</b-dropdown>

		<form action="#" class="form-search">
			<fieldset>
				<input type="search" placeholder="Search">
				<button><font-awesome-icon icon="search" /></button>
			</fieldset>
		</form>

		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'Actions'
	};
</script>

<style>
</style>
