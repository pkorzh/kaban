<template>
	<v-select
		:options="options"
		label="name">

		<template slot="option" slot-scope="option">
			<img :src="getIcon(option)" style="width: 20px" />
			{{ option.name }}
		</template>

		<template slot="selected-option" scope="option">
			<div class="selected d-center">
				<img :src="getIcon(option)" style="width: 20px" />
				{{ option.name }}
			</div>
		</template>

	</v-select>
</template>

<script>
	export default {
		props: {
			module: {
				type: String,
				required: true,
			},
			getter: {
				type: String,
				required: true,
			},
			icon: {
				type: String,
				required: false,
			}
		},
		computed: {
			options() {
				return this.$store.getters[`${this.module}/${this.getter}`]
			}
		},
		methods: {
			getIcon(option) {
				return this.icon ? option[this.icon] : option.iconUrl
			}
		}
	}
</script>
