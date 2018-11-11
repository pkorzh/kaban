<template>
	<b-form class="tql-input" @submit.prevent.stop="submit(value)">
		<div class="input-group">
			<div class="input-group-prepend">
					<span class="input-group-text">
						<font-awesome-icon icon="search"/>
					</span>
			</div>

			<b-form-input
					type="text"
					v-model="value"
					:placeholder="placeholder"/>

			<div class="input-group-append">
				<b-button v-b-toggle.tql-collapse class="input-group-text" variant="outline">
					<font-awesome-icon icon="angle-down"/>
				</b-button>
			</div>
		</div>
		<b-collapse id="tql-collapse" class="tql-input-dropdown">
			<div class="tql-input-dropdown-content clearfix">
				<slot :fields="fields"></slot>

				<b-btn type="submit" v-b-toggle.tql-collapse variant="primary" class="float-right">Search</b-btn>
			</div>
		</b-collapse>
	</b-form>
</template>

<script>
	import { object as tqlTransformToObject } from '../../tql';

	export default {
		name: 'tql-search',
		props: {
			placeholder: {
				type: String,
			},
			value: {
				type: String,
				required: true,
			}
		},
		data() {
			return {
				fields: {
					name: '',
					backlog: '',
					type: '',
					priority: '',
					resolution: '',
					assignee: '',
					status: '',
				},
			}
		},
		methods: {
			submit() {
				this.$emit('input', this.value);
			},
		},
		watch: {
			fields: {
				handler(fields) {
					this.value = Object.keys(fields)
							.filter(key => this.fields[key])
							.map(key => this.fields[key])
							.join(' and ');
				},
				deep: true
			},
			value(tql) {
				//const obj = tqlTransformToObject(tql);
				//console.log(this.fields);
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
