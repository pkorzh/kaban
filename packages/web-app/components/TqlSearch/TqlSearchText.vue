<template>
	<b-form-group
			:label="name"
			horizontal>
		<b-form-input
				type="text"
				v-model="value"
				:placeholder="placeholder"/>
	</b-form-group>
</template>

<script>
	export default {
		name: 'tql-search-text',
		props: {
			name: {
				type: String,
				required: true,
			},
			placeholder: {
				type: String,
			},
			value: {
				required: true,
			},
		},
		data() {
			return {
				entity: this.value
			};
		},
		watch: {
			entity(value) {
				this.$emit('input', value);
			}
		},
	}
</script>
