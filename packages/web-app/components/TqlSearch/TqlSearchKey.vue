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
			return {
				entity: this.expand(this.value)
			};
		},
		methods: {
			expand(arrOrObject) {
				const arr = Array.isArray(arrOrObject)
					? arrOrObject
					: [arrOrObject];

				return arr.filter(item => !!item).map(item => {
					const getOne = this.getter.replace('getList', 'getOne');
					return this.$store.getters[getOne](item);
				});
			}
		},
		watch: {
			entity(value) {
				this.$emit('input', value.map(val => val.key));
			},
			value(value) {
				if (!value) {
					this.entity = [];
					return;
				}

				const valueArr = Array.isArray(value) ? value : [value];
				const entityArr = this.entity.map(e => e.key);

				if (valueArr.length !== entityArr.length) {
					this.entity = this.expand(value);
				} else {
					for (var i = valueArr.length - 1; i >= 0; i--) {
						if (valueArr[i] !== entityArr[i]) {
							this.entity = this.expand(value);
							return;
						}
					}
				}
			}
		}
	}
</script>
