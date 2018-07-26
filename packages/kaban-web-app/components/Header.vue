<template>
	<b-navbar toggleable="md">
		<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

		<b-navbar-brand to="/">
			NavBar
		</b-navbar-brand>

		<b-collapse is-nav id="nav_collapse">

			<b-navbar-nav>

				<b-nav-item-dropdown text="Menu" right>
					<b-dropdown-item to="/boards">Boards</b-dropdown-item>
					<b-dropdown-item to="/backlogs">Backlogs</b-dropdown-item>
				</b-nav-item-dropdown>

			</b-navbar-nav>

		</b-collapse>
	</b-navbar>
</template>

<script>
	export default {
		name: 'Header'
	};
</script>

<style>
</style>
