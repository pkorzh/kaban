<template>
	<b-dropdown :text="dropdownText" class="">
		<!--<form action="#" class="form-search">
			<fieldset>
				<input type="text" placeholder="Find a service by name or feature">
				<button><font-awesome-icon icon="search" /></button>
			</fieldset>
		</form>-->

		<div>
			<b-dropdown-header>Status</b-dropdown-header>
		</div>

		<div>
			<b-dropdown-header>Type</b-dropdown-header>
		</div>

	</b-dropdown>
</template>

<script>
	export default {
		props: {
		},
		data() {
			return {
				dropdownText: 'Quick Filters'
			}
		},
		computed: {
		},
		methods: {
		},
		watch: {
		}
	}
</script>
