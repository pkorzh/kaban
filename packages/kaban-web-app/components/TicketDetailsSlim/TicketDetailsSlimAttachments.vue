<template>
	<div class="details-attach">
		<div class="details-attach-item">
			<a href="#" class="details-attach-close"></a>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			},
			readonly: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
