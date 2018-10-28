<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Multiple Edit
				</template>
			</TopBar>

			<button
				class="modal-box-close"
				@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			{{patch}}
			<b-row v-for="(p, index) in patch" :key="index">
				<b-col>
					<b-form-select
						:options="fieldsToChange"
						v-model="p.field"
						class="mb-3"></b-form-select>
				</b-col>
				<b-col>
					<b-form-input v-model="p.value"></b-form-input>
				</b-col>
			</b-row>
		</div>
		<div class="modal-box-footer">
			<button
				class="btn btn-outline-danger"
				@click="$emit('close')">Close</button>
			<button
				type="submit"
				form="BacklogCreateHighlight"
				class="btn btn-primary">Add</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		props: {
			tickets: {
				type: Array,
				required: true,
			}
		},
		data() {
			return {
				patch: [],
				fieldsToChange: [
					'Status',
					'Resolution'
				],
			}
		},
		computed: {
		},
		created() {
			this.patch.push({
				field: this.fieldsToChange[0]
			})
		}
	}
</script>
