<template>
	<b-form-group
			:label="name"
			horizontal>
		<b-form-input
				type="text"
				v-model="entity"
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
			entity(entity) {
				if (this.value !== entity) {
					this.$emit('input', entity);
				}
			},
			value(value) {
				if (this.entity !== value) {
					this.entity = value;
				}
			},
		},
	}
</script>
