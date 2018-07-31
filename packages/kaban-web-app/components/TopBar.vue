<template>
	<div class="top-bar">
		<div>
			Board
			<h1>{{ board.name }}</h1>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	import ActionsNav from './ActionsNav';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			ActionsNav
		},
		props: {
			board: {
				type: Object,
				required: true,
			}
		},
		name: 'TopBar'
	};
</script>

<style>
</style>
