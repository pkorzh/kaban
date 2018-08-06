<template>
	<div class="top-bar">
		<div class="top-bar-title">
			<h1>
				<slot name="header"></slot>
			</h1>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	import ActionsNav from './ActionsNav/ActionsNav';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			ActionsNav
		},
		props: {
		},
		name: 'TopBar'
	};
</script>

<style>
</style>
