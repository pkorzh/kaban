<template>
	<div class="top-bar">
		<div>
			breadcrumbs
			<h1>title</h1>
		</div>
		<ActionsNav />
	</div>
</template>

<script>
	import ActionsNav from './ActionsNav';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			ActionsNav
		},
		name: 'TopBar'
	};
</script>

<style>
</style>
