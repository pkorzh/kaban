<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					Delete Board
				</template>
			</TopBar>

			<button
					class="modal-box-close"
					@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			Are you sure you want delete this board?
		</div>
		<div class="modal-box-footer">
			<button
					class="btn btn-outline-danger"
					@click="$emit('close')">Close</button>
			<b-button variant="primary" @click="justDelete">Delete</b-button>
		</div>
	</div>
</template>

<script>
	import { KeyGenerationMixin } from '@/mixins'
	import { mapActions, mapGetters } from 'vuex'

	export default {
		props: {
			boardKey: {
				type: String,
				required: true,
			},
			gotoBoards: {
				type: Boolean,
				required: false
			}
		},
		methods: {
			...mapActions('boards', {
				deleteBoard: 'delete'
			}),

			async justDelete() {
				this.$emit('close');

				if (this.gotoBoards) {
					this.$router.replace(this.localePath({
						name: 'boards',
					}), () => this.deleteBoard({ key: this.boardKey }) );
				} else {
					this.deleteBoard({ key: this.boardKey })
				}
			}
		}
	}
</script>
