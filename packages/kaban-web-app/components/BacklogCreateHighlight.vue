<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Create Backlog
				</template>
			</TopBar>

			<button
				class="modal-box-close"
				@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			<b-form id="BacklogCreateHighlight" @submit.prevent="create" novalidate>
				<b-form-group
					label="Name"
					horizontal
					:invalid-feedback="'Name is required'"
					:state="!$v.backlog.name.$invalid">
					<b-form-input
						type="text"
						v-model="backlog.name"
						required
						placeholder="Backlog Name" />
				</b-form-group>

				<b-form-group label="Key" horizontal>
					<b-form-input
						readonly
						type="text"
						:value="backlog.key"
						placeholder="Key" />
				</b-form-group>

				<b-form-group
					label="Color"
					:invalid-feedback="'Color is required'"
					:state="!$v.backlog.color.$invalid" horizontal>
					<compact-picker
						v-model="backlog.color"
						:palette="['#e1d276', '#99ea86', '#83d6b7', '#e4a8f9', '#faf0e6']" />
				</b-form-group>

				<b-form-group
					label="Description"
					:invalid-feedback="'Description is required'"
					:state="!$v.backlog.description.$invalid">
					<b-form-textarea
						type="text"
						v-model="backlog.description"
						placeholder="Description"
						:rows="3" />
				</b-form-group>
			</b-form>
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
	import { required } from 'vuelidate/lib/validators'
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data() {
			return {
				backlog: {
					name: null,
					key: null,
					description: null,
					color: { hex: '#D33115' },
				}
			}
		},
		validations: {
			backlog: {
				name: { required },
				key: { required },
				description: { },
				color: { required }
			}
		},
		methods: {
			...mapActions('backlogs', {
				createBacklog: 'create'
			}),

			async create() {
				this.$v.$touch()

				if (this.$v.$invalid) {
					return
				}

				await this.createBacklog({
					...this.backlog,
					color: this.backlog.color.hex
				})

				this.$emit('close')
			}
		},
		computed: {
		},
		watch: {
			'backlog.name'(name) {
				if (/\s/.test(name)) {
					this.backlog.key = name.split(/\s/)
						.map(w => w[0])
						.join('')
						.toUpperCase()
				} else {
					this.backlog.key = name
						.slice(0, 3)
						.toUpperCase()
				}
			}
		}
	}
</script>
