<template>
	<b-form-group
			:label="label"
			horizontal>
		<iconed-select
				:icon="icon"
				:getter="getter"
				v-model="entity"/>
	</b-form-group>
</template>

<script>
	export default {
		name: 'tql-search-key',

		props: {
			name: {
				type: String,
				required: true
			},
			getter: {
				type: String,
				required: true,
			},
			icon: {
				type: String
			},
			value: {
				type: String,
				required: true
			}
		},

		data() {
			return {
				entity: null,
			}
		},

		watch: {
			entity(value) {
				//this.value = `${this.name} = ${this.entity.key}`;

				this.$emit('input', `${this.name} = ${this.entity.key}`)
			}
		},

		computed: {
			label() {
				return this.name.charAt(0).toUpperCase() + this.name.slice(1);
			}
		}
	}
</script>
