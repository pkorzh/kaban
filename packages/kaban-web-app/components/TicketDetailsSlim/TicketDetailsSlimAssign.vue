<template>
	<ul class="details-options details-options-assign">
		<li>
			<h3>Created By:</h3>
			<div><div class="details-avatar"></div> Alex Smith</div>
		</li>
		<li>
			<h3>Created By:</h3>
			<div><div class="details-avatar"></div> Alex Smith</div>
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
