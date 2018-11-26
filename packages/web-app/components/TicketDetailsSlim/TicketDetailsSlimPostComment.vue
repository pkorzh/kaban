<template>
	 <b-form @submit.prevent="postComment">
		<b-form-group label="Comment">
			<b-form-textarea
				v-model="comment"
				placeholder="Comment"
				:disabled="working"
				:rows="3" />
		</b-form-group>

		<div class="float-right">
			<b-button 
				type="submit" 
				variant="primary"
				:disabled="working || !valid">Add</b-button>

			<b-button 
				variant="link"
				:disabled="working"
				@click="cancel()">Cancel</b-button>
		</div>
	</b-form>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {
				comment: '',
			}
		},
		computed: {
			...mapGetters('tickets/comments', ['working']),

			valid() {
				return this.comment.length > 0
			}
		},
		methods: {
			...mapActions('tickets/comments', {
				createComment: 'create'
			}),
			async postComment() {
				const comment = await this.createComment({
					text: this.comment,
					ticket: {
						key: this.ticket.key
					}
				});

				this.$emit('comment', comment);
				this.empty();
			},
			cancel() {
				this.empty()
				this.$emit('cancel')
			},
			empty() {
				this.comment = ''
			}
		}
	}
</script>
