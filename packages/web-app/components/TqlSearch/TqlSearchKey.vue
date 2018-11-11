<template>
	<b-form-group
			:label="name"
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
				required: true,
			},
		},
		data() {
			const expand = (arrOrObject) => {
				const arr = Array.isArray(arrOrObject)
					? arrOrObject
					: [arrOrObject];

				return arr.filter(item => !!item).map(item => 
					this.$store.getters[this.getter.replace('getList', 'getOne')](item));
			};

			return {
				entity: expand(this.value)
			};
		},
		watch: {
			entity(value) {
				this.$emit('input', value.map(val => val.key));
			}
		}
	}
</script>
