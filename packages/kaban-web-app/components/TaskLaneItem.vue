<template>
	<div class="card">
		<div class="card-block">
			<h5 class="card-title">
				<span class="text-muted">#{{item.id}}</span>
				{{item.text}}
			</h5>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TaskLaneItem',
		props: ['item'],
	};
</script>

<style>
</style>
