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
	import { KeyGenerationMixin } from '@/mixins'
	import { required } from 'vuelidate/lib/validators'
	import { mapActions, mapGetters } from 'vuex'

	export default {
		mixins: [KeyGenerationMixin],
		data() {
			return {
				backlog: {
					name: null,
					key: null,
					description: null,
				}
			}
		},
		validations: {
			backlog: {
				name: { required },
				key: { required },
				description: { },
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

				await this.createBacklog(this.backlog)

				this.$emit('close')
			}
		},
		computed: {
		},
		watch: {
			'backlog.name'(name) {
				this.backlog.key = this.makeKey(name)
			}
		}
	}
</script>
