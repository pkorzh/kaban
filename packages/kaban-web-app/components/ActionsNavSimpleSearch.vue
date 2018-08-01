<template>
		<form action="#" class="form-search">
			<fieldset>
				<input
					type="text"
					placeholder="Search"
					v-shortkey.focus="['s']">
				<button><font-awesome-icon icon="search" /></button>
			</fieldset>
		</form>
</template>

<script>
	export default {
		methods: {
		}
	}
</script>
