<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Create Board
				</template>
			</TopBar>

			<button
				class="modal-box-close"
				@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			<b-form id="BoardCreateHighlight" @submit.prevent="create" novalidate>
				<b-form-group
					label="Name"
					horizontal
					:invalid-feedback="'Name is required'"
					:state="!$v.board.name.$invalid">
					<b-form-input
						type="text"
						v-model="board.name"
						required
						placeholder="Board Name" />
				</b-form-group>

				<b-form-group label="Key" horizontal>
					<b-form-input
						readonly
						type="text"
						:value="board.key"
						placeholder="Key" />
				</b-form-group>

				<b-form-group
					label="TQL"
					:invalid-feedback="'TQL is required'"
					:state="!$v.board.tql.$invalid">
					<b-form-input
						type="text"
						v-model="board.tql"
						placeholder="TQL" />
				</b-form-group>

				<b-form-group
					label="Description"
					:invalid-feedback="'Description is required'"
					:state="!$v.board.description.$invalid">
					<b-form-textarea
						type="text"
						v-model="board.description"
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
				form="BoardCreateHighlight"
				class="btn btn-primary">Add</button>
		</div>
	</div>
</template>

<script>
	import { KeyGenerationMixin } from '@/mixins'
	import { required } from 'vuelidate/lib/validators'
	import { mapActions } from 'vuex'

	export default {
		mixins: [KeyGenerationMixin],
		data() {
			return {
				board: {
					name: null,
					key: null,
					tql: null,
					description: null,
				}
			}
		},
		validations: {
			board: {
				name: { required },
				key: { required },
				tql: { required },
				description: { },
			}
		},
		methods: {
			...mapActions('boards', {
				createBoard: 'create'
			}),

			async create() {
				this.$v.$touch()

				if (this.$v.$invalid) {
					return
				}

				await this.createBoard(this.board)
				this.$emit('close')
			}
		},
		watch: {
			'board.name'(name) {
				this.board.key =  this.makeKey(name)
			}
		}
	}
</script>
