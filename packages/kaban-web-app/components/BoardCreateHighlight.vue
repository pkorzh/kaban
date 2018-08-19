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
			<b-form id="BoardCreateHighlight" @submit.prevent="create">
				<b-form-group label="Name" horizontal>
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

				<b-form-group label="Description">
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
	import { mapActions } from 'vuex'

	export default {
		data() {
			return {
				board: {
					name: null,
					key: null,
					description: null,
				}
			}
		},
		methods: {
			...mapActions('boards', {
				createBoard: 'create'
			}),

			async create() {
				await this.createBoard(this.board)
				this.$emit('close')
			}
		},
		watch: {
			'board.name'(name) {
				if (/\s/.test(name)) {
					this.board.key = name.split(/\s/)
						.map(w => w[0])
						.join('')
						.toUpperCase()
				} else {
					this.board.key = name
						.slice(0, 3)
						.toUpperCase()
				}
			}
		}
	}
</script>
