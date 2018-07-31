<template>
	<b-container fluid>
		<b-navbar toggleable="md" class="header">
			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

			<b-navbar-brand to="/">
				<img src="../assets/images/logo.png" alt="Kaban">
			</b-navbar-brand>

			<b-collapse is-nav id="nav_collapse">

				<b-navbar-nav>

					<b-nav-item-dropdown text="Menu">

						<form action="#" class="form-search">
							<fieldset>
								<input type="search" placeholder="Find a service by name or feature">
								<button><font-awesome-icon icon="search" /></button>
							</fieldset>
						</form>
						
						<div class="mb-2">
							<b-dropdown-item to="/boards">Boards</b-dropdown-item>
							<b-dropdown-item to="/backlogs">Backlogs</b-dropdown-item>
						</div>


						<div class="dropdown-menu-holder">
							<ol>
								<li>
									<strong class="dropdown-menu-title">Donec risus odio</strong>
									<ul>
										<li><a href="#">Lorem ipsum dolor sit</a></li>
										<li><a href="#">Amet  consectetur</a></li>
										<li><a href="#">Adipiscing elit</a></li>
										<li><a href="#">Sed suscipit</a></li>
										<li><a href="#">Pellentesque tortornisl</a></li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">Donec risus odio</strong>
									<ul>
										<li><a href="#">Lorem ipsum dolor sit</a></li>
										<li><a href="#">Amet  consectetur</a></li>
										<li><a href="#">Adipiscing elit</a></li>
										<li><a href="#">Sed suscipit</a></li>
										<li><a href="#">Pellentesque tortornisl</a></li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">Donec risus odio</strong>
									<ul>
										<li><a href="#">Lorem ipsum dolor sit</a></li>
										<li><a href="#">Amet  consectetur</a></li>
										<li><a href="#">Adipiscing elit</a></li>
										<li><a href="#">Sed suscipit</a></li>
										<li><a href="#">Pellentesque tortornisl</a></li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">Donec risus odio</strong>
									<ul>
										<li><a href="#">Lorem ipsum dolor sit</a></li>
										<li><a href="#">Amet  consectetur</a></li>
										<li><a href="#">Adipiscing elit</a></li>
										<li><a href="#">Sed suscipit</a></li>
										<li><a href="#">Pellentesque tortornisl</a></li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">Donec risus odio</strong>
									<ul>
										<li><a href="#">Lorem ipsum dolor sit</a></li>
										<li><a href="#">Amet  consectetur</a></li>
										<li><a href="#">Adipiscing elit</a></li>
										<li><a href="#">Sed suscipit</a></li>
										<li><a href="#">Pellentesque tortornisl</a></li>
									</ul>
								</li>
								<li>
									<strong class="dropdown-menu-title">Donec risus odio</strong>
									<ul>
										<li><a href="#">Lorem ipsum dolor sit</a></li>
										<li><a href="#">Amet  consectetur</a></li>
										<li><a href="#">Adipiscing elit</a></li>
										<li><a href="#">Sed suscipit</a></li>
										<li><a href="#">Pellentesque tortornisl</a></li>
									</ul>
								</li>
							</ol>
						</div>
					</b-nav-item-dropdown>

				</b-navbar-nav>

				<b-nav class="profile ml-auto">
					<b-nav-item active><font-awesome-icon icon="cog" /></b-nav-item>
					<b-nav-item>
						<font-awesome-icon icon="bell" />
						<span class="profile-mark"></span>
					</b-nav-item>
					<b-nav-item class="profile-avatar">
					</b-nav-item>
				</b-nav>

			</b-collapse>
		</b-navbar>
	</b-container>
</template>

<script>
	export default {
		name: 'Header'
	};
</script>

<style>
</style>
