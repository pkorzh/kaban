<template>
	<ul class="details-options">
		<li>
			<h3>Due Date: </h3>
			<div>Jul 31, 2018</div>
		</li>
		<li>
			<h3>Estimated Time:</h3>
			<div>40 hours</div>
		</li>
		<li>
			<h3>Spent Time:</h3>
			<div>20 hours</div>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		}
	}
</script>
