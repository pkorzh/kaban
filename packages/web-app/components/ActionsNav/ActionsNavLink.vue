<template>
	<nuxt-link :to="to" class="btn btn-link">
		<font-awesome-icon v-if="icon" :icon="icon" />
		{{ text }}
	</nuxt-link>
</template>

<script>
	export default {
		props: {
			to: {
				type: Object,
				required: false,
			},
			text: {
				type: String,
				required: false,
			},
			icon: {
				type: String,
				required: false
			}
		}
	}
</script>
