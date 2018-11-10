<template>
	<b-form-group
			:label="label"
			horizontal>
		<iconed-select
				:icon="icon"
				:getter="getter"
				:multiple="true"
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
				const str = (arr) => arr.map(el => el.key).join(',');

				if (value.length > 1) {
					this.$emit('input', `${this.name} in [${str(value)}]`);
				} else {
					this.$emit('input', `${this.name} = ${value[0].key}`);
				}
			}
		},

		computed: {
			label() {
				return this.name.charAt(0).toUpperCase() + this.name.slice(1);
			}
		}
	}
</script>
