<template>
	<b-form class="tql-input" @submit.prevent.stop="submit(tql)">
		<div class="input-group">
			<b-form-input
					type="text"
					v-model="tql"
					:placeholder="placeholder"/>

			<div class="input-group-append">
				<b-button 
					class="input-group-text" 
					variant="light"
					@click="submit(tql)">
					<font-awesome-icon icon="search"/>
				</b-button>

				<b-button 
					class="input-group-text" 
					v-b-toggle.tql-collapse variant="light">
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
			const data = {
				tql: this.value,
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

			const data2 = tqlTransformToObject(this.value);
			Object.assign(data.fields, data2);

			return data;
		},
		methods: {
			submit(tql) {
				this.$emit('input', tql);
			},
		},
		watch: {
			fields: {
				handler(fields) {
					const strKey = (key) => /[\.\s+]/.test(key) ? `"${key}"` : key;
					const strArr = (arr) => arr.map(el => strKey(el)).join(',');

					const tql = Object.keys(fields)
							.filter(key => this.fields[key].length)
							.map(key => {
								const rval = this.fields[key];

								if (rval.length && rval.map && rval.length > 1) {
									return `${key} in [${strArr(rval)}]`;
								} else if (rval.length && rval.map && rval.length == 1) {
									return `${key} = ${strKey(rval[0])}`;
								} else {
									return `${key} = ${strKey(rval)}`;
								};
							})
							.join(' and ');

					this.tql = tql;
				},
				deep: true
			},
			value(value, value2) {
				this.tql = value;

				const data2 = tqlTransformToObject(value);

				Object.keys(this.fields).forEach(key => this.fields[key] = '');
				Object.assign(this.fields, data2);
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

		.input-group-text {
			background-color: white;
			border-left: none;
		}
	}
</style>
