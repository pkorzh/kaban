<template>
	<b-form class="tql-input" @submit.prevent.stop="submit(tql)">
		<div class="input-group">
			<div class="input-group-prepend">
					<span class="input-group-text">
						<font-awesome-icon icon="search"/>
					</span>
			</div>

			<b-form-input
					type="text"
					size="lg"
					v-model="tql"
					:placeholder="placeholder"/>

			<div class="input-group-append">
				<b-button v-b-toggle.tql-collapse class="input-group-text" variant="outline">
					<font-awesome-icon icon="angle-down"/>
				</b-button>
			</div>
		</div>
		<b-collapse id="tql-collapse" class="tql-input-dropdown">
			<div class="tql-input-dropdown-content clearfix">
				<slot></slot>

				<b-btn type="submit" v-b-toggle.tql-collapse variant="primary" class="float-right">Search</b-btn>
			</div>
		</b-collapse>
	</b-form>
</template>

<script>
	export default {
		name: 'tql-search',

		props: {
			placeholder: {
				type: String,
			},
			fields: {
				type: Object,
				required: true,
			},
		},

		data() {
			return {
				tql: '',
			}
		},

		methods: {
			submit() {
				this.$emit('input', this.tql)
			},
		},

		watch: {
			fields: {
				handler(fields) {
					this.tql = Object.keys(fields)
							.filter(key => this.fields[key])
							.map(key => this.fields[key])
							.join(' and ')
				},
				deep: true
			}
		},
	}
</script>

<style scoped lang="scss">
	.tql-input {
		position: relative;

		&-dropdown {
			border: 0;
			min-width: 200px;
			border-radius: 6px;
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
			position: absolute;
			left: 0;
			top: calc(100% + 5px);
			width: 100%;
			z-index: 1;
			background: #fff;

			&-content {
				padding: 20px;
			}
		}
	}
</style>
