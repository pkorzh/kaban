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
			const data =  {
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
					const strKey = (key) => key.indexOf('.') !== -1 ? `"${key}"` : key;
					const strArr = (arr) => arr.map(el => strKey(el)).join(',');

					const tql = Object.keys(fields)
							.filter(key => this.fields[key])
							.map(key => {
								const rval = this.fields[key];

								if (rval.length && rval.map && rval.length > 1) {
									return `${key} in [${strArr(rval)}]`;
								} else if (rval.length && rval.map && rval.length == 1) {
									return `${key} = ${strKey(rval[0])}`;
								} else {
									return `${key} = "${rval}"`;
								};
							})
							.join(' and ');

					this.tql = tql;
				},
				deep: true
			},
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
