<template>
	<b-container class="mt-5">
		<h1>{{ error.statusCode }}</h1>
	</b-container>
</template>

<script>
	export default {
		layout: null,
		props: ['error']
	}
</script>

<style>
</style>
