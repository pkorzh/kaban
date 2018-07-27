<template>
	<b-navbar toggleable="md">
		<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

		<b-navbar-brand to="/">
			<img src="../assets/images/logo.png" alt="Kaban">
		</b-navbar-brand>

		<b-collapse is-nav id="nav_collapse">

			<b-navbar-nav>

				<b-nav-item-dropdown text="Menu" right>
					<b-dropdown-item to="/boards">Boards</b-dropdown-item>
					<b-dropdown-item to="/backlogs">Backlogs</b-dropdown-item>
				</b-nav-item-dropdown>

			</b-navbar-nav>

			<b-nav class="profile ml-auto">
				<b-nav-item active><font-awesome-icon icon="cog" /></b-nav-item>
				<b-nav-item>
					<font-awesome-icon icon="bell" />
					<span class="profile__mark"></span>
				</b-nav-item>
				<b-nav-item class="profile__avatar">
				</b-nav-item>
			</b-nav>

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
