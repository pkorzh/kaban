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
			<b-form id="BacklogCreateHighlight" @submit.prevent="create">
				<b-form-group label="Name" horizontal>
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

				<b-form-group label="Board" horizontal>
					<b-form-select
						v-model="backlog.board"
						:options="boards" />
				</b-form-group>

				<b-form-group label="Color">
					<compact-picker
						v-model="backlog.color"
						:palette="['#e1d276', '#99ea86', '#83d6b7', '#e4a8f9', '#faf0e6']" />
				</b-form-group>

				<b-form-group label="Description">
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
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data() {
			return {
				backlog: {
					name: null,
					key: null,
					description: null,
					board: null,
					color: '#D33115',
				}
			}
		},
		methods: {
			...mapActions('backlogs', {
				createBacklog: 'create'
			}),

			async create() {
				await this.createBacklog({
					...this.backlog,
					color: this.backlog.color.hex
				})

				this.$emit('close')
			}
		},
		computed: {
			...mapGetters('boards', {
				boardList: 'getList'
			}),

			boards() {
				return this.boardList.map(board => ({
					text: board.name,
					value: {
						key: board.key
					}
				}))
			}
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
