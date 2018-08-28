<template>
	<div class="docs">
		<b-collapse id="docs-side" class="docs-side">
			<ol>
				<li><a href="#">Lorem</a></li>
				<li><a href="#">Lorem</a></li>
				<li>
					<a href="#">Lorem</a>
					<ol>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
					</ol>
				</li>
				<li><a href="#">Lorem</a></li>
				<li>
					<a href="#">Lorem</a>
					<ol>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
					</ol>
				</li>
				<li>
					<a href="#">Lorem</a>
					<ol>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
					</ol>
				</li>
				<li>
					<a href="#">Lorem</a>
					<ol>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
						<li><a href="#">Ipsum</a></li>
					</ol>
				</li>
			</ol>
		</b-collapse>
		<div class="docs-content">
			<div class="docs-bar">
				<div class="docs-bar-holder">
					<button v-b-toggle.docs-side class="btn btn-light"><font-awesome-icon icon="align-justify" /></button>
					<button class="btn btn-light"><font-awesome-icon icon="search" /></button>
				</div>
				<button class="btn btn-light"><font-awesome-icon icon="print" /></button>
			</div>
			<div class="docs-content-holder">
				<h1>Lorem ipsum</h1>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
		</div>
	</div>
</template>
