<template>
	<b-container fluid>
		<b-row>
			<b-col cols="8">
				<div class="dropdown-menu dropdown-menu-mainscreen show">
					<AppMenu v-if="$auth.$state.loggedIn" />
				</div>
			</b-col>
		</b-row>
	</b-container>
</template>

<style type="text/css" scoped>
	.dropdown-menu-mainscreen {
		position: initial;
		box-shadow: none;
	}
</style>

<script>
	import AppMenu from '@/components/AppMenu';

	export default {
		components: {
			AppMenu,
		},
		fetch({app, redirect}) {
			if(!app.$auth.loggedIn) {
				redirect('/login')
			}
		},
		head() {
			return {
				title: 'Kaban Project Management'
			}
		},
	}
</script>
