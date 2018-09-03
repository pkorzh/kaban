<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					<span v-t="'createBoard'"></span>
				</template>
			</TopBar>

			<button
				class="modal-box-close"
				@click="$emit('close')"
				v-t="'close'">
				</button>
		</div>
		<div class="details">
			<b-form id="BoardCreateHighlight" @submit.prevent="create" novalidate>
				<b-form-group
					label="Name"
					horizontal
					:invalid-feedback="errors.first('board.name')"
					:state="!errors.has('board.name')">
					<input
						type="text"
						v-model="board.name"
						name="board.name"
						v-validate="'required'"
						class="form-control"
						placeholder="Board Name" />
				</b-form-group>

				<b-form-group label="Key" horizontal>
					<input
						readonly
						type="text"
						:value="board.key"
						class="form-control"
						placeholder="Key" />
				</b-form-group>

				<b-form-group
					label="TQL"
					:invalid-feedback="errors.first('board.tql')"
					:state="!errors.has('board.tql')">
					<input
						type="text"
						v-model="board.tql"
						name="board.tql"
						v-validate="'required'"
						class="form-control"
						placeholder="TQL" />
				</b-form-group>

				<b-form-group
					label="Description">
						<textarea
							class="form-control"
							rows="3"
							v-model="board.description"></textarea>
				</b-form-group>
			</b-form>
		</div>
		<div class="modal-box-footer">
			<button
				class="btn btn-outline-danger"
				@click="$emit('close')"
				v-t="'close'"></button>
			<button
				type="submit"
				form="BoardCreateHighlight"
				class="btn btn-primary"
				v-t="'add'"></button>
		</div>
	</div>
</template>

<script>
	import { KeyGenerationMixin } from '@/mixins'
	import { mapActions } from 'vuex'

	export default {
		mixins: [
			KeyGenerationMixin,
		],
		data() {
			return {
				board: {
					name: '',
					key: '',
					tql: '',
					description: '',
				}
			}
		},
		methods: {
			...mapActions('boards', {
				createBoard: 'create'
			}),

			async create() {
				const valid = await this.$validator.validateAll()
				if (!valid) return

				await this.createBoard(this.board)
				this.$emit('close')
			}
		},
		watch: {
			'board.name'(name) {
				this.board.key = this.makeKey(name)
			},
		},
		computed: {}
	}
</script>
