<template>
	<b-dropdown text="Columns">
		<b-form-checkbox
			class="d-block"
			v-for="item in wrapped"
			:checked="item.selected"
			:key="item.field.key"
			@change="toggle(item)">
			{{ item.field.label }}
		</b-form-checkbox>
	</b-dropdown>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		props: {
			fields: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				wrapped: []
			}
		},
		methods: {
			toggle(item) {
				item.selected = !item.selected

				this.$emit('columns',
					this.wrapped.filter(i => i.selected).map(i => i.field))
			}
		},
		computed: {
		},
		mounted() {
			this.wrapped = this.fields.map(field => ({
				field,
				selected: true
			}))
		}
	}
</script>
