<template>
	<b-container fluid>
	</b-container>
</template>

<script>
	export default {
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
