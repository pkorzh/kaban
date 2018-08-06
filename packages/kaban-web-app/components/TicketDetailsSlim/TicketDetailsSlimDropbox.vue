<template>
	<div class="details-dropbox">
		<font-awesome-icon icon="cloud-upload-alt" />
		Drop files to attach, or  <a href="#">browse</a>
	</div>
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
