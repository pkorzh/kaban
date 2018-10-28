<template>
	<v-select
		:options="options"
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
			}
		},
		mounted() {
			if ('value' in this) {
				this.modified = this.value
			}
		},
		watch: {
			modified(modified) {
				if (('value' in this) && modified && this.value !== modified) {
					this.$emit('input', modified)
				}
			}
		}
	}
</script>
