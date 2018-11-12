<template>
	<div>
	<no-ssr>
		<v-select
			:options="options"
			:multiple="multiple"
			v-model="modified"
			:clearable="false"
			label="name">

			<template slot="option" slot-scope="option">
				<img
					:src="getIcon(option)"
					v-if="hasIcon(option)"
					style="width: 20px" />
				{{ option.name }}
			</template>

			<template slot="selected-option" slot-scope="option">
				<div class="selected d-center">
					<img
						:src="getIcon(option)"
						v-if="hasIcon(option)"
						style="width: 20px" />
					{{ option.name }}
				</div>
			</template>

		</v-select>
	</no-ssr>
	</div>
</template>

<script>
	export default {
		props: {
			getter: {
				type: String,
				required: true,
			},
			icon: {
				type: String,
				required: false,
			},
			value: {
				required: false
			},
			multiple: {
				required: false,
				default: () => false
			}
		},
		data() {
			return {
				modified: null
			}
		},
		computed: {
			options() {
				return this.$store.getters[`${this.getter}`]
			}
		},
		methods: {
			getIcon(option) {
				return this.icon ? option[this.icon] : option.iconUrl
			},
			hasIcon(option) {
				return !!this.getIcon(option)
			},
			different(a, b) {
				if (!a) {
					return true;
				}

				if (!b) {
					return true;
				}

				if (Array.isArray(a) && Array.isArray(b)) {
					if (a.length !== b.length) {
						return true;
					}

					for (var i = a.length - 1; i >= 0; i--) {
						if (a[i].key !== b[i].key) {
							return true;
						}
					}
				}

				return a.key !== b.key;
			}
		},
		mounted() {
			this.modified = this.value
		},
		watch: {
			modified(modified) {
				if (this.different(modified, this.value)) {
					this.$emit('input', modified);
				}
			},
			value(value) {
				if (this.different(this.modified, value)) {
					this.modified = value;
				}
			}
		}
	}
</script>
