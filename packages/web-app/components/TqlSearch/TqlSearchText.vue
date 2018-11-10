<template>
	<b-form-group
			:label="label"
			horizontal>
		<b-form-input
				type="text"
				v-model="text"
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
				type: String,
				required: true,
			},
		},

		data() {
			return {
				text: '',
			}
		},

		watch: {
			text(value) {
				this.$emit('input', `${this.name} = ${this.text}`)
			},
		},

		computed: {
			label() {
				return this.name.charAt(0).toUpperCase() + this.name.slice(1)
			},
		},
	}
</script>
