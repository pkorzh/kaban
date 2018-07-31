<template>
	<div class="actions-nav">
		<a href="#" class="actions-nav-link">Quick Filters</a>

		<a href="#" class="actions-nav-link">Assigned</a>

		<form action="#" class="form-search">
			<fieldset>
				<input type="text" placeholder="Search">
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
