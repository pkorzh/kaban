<template>
	<div>
		<div class="docs-bar">
			<div class="docs-bar-holder">
				<button
					v-b-toggle.docs-side
					class="btn btn-light">
					<font-awesome-icon icon="align-justify" />
				</button>

				<nuxt-link
					class="btn btn-light"
					:to="localePath({name: 'flatpages-new'})">
					<font-awesome-icon icon="file" />
				</nuxt-link>
			</div>
		</div>

		<div class="docs-content-holder">

		</div>
	</div>
</template>
