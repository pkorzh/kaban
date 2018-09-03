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
					:invalid-feedback="errors.first('backlog.name')"
					:state="!errors.has('backlog.name')">
					<b-form-input
						type="text"
						v-model="backlog.name"
						name="backlog.name"
						v-validate="'required'"
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
					label="Description">
					<b-form-textarea
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
		methods: {
			...mapActions('backlogs', {
				createBacklog: 'create'
			}),

			async create() {
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
