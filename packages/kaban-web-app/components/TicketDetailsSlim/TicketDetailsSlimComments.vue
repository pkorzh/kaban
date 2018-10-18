<template>
	<div>
		<div v-if="comments.length == 0">
			<span v-t="'noCommentsYetOnIssue'"></span>
		</div>
		<div 
			class="details-post"
			v-for="(comment, index) in comments"
			:key="comment.key">
			<ul class="details-post-info">
				<li>
					<a href="#">
						<img 
							class="details-avatar"
							:src="comment.author.avatar" />

						{{ comment.author.name }}
					</a>
				</li>
				<li>
					<span v-t="'addedAComment'"></span>
					<span class="details-post-date">
						{{ comment.createdAt | moment('LLL') }}

						<b-dropdown variant="link" size="sm" no-caret>
							<template slot="button-content">
								<font-awesome-icon icon="ellipsis-v" /> 
							</template>
							<b-dropdown-item-button 
								class="text-danger"
								@click="onDeleteComment(comment, index)">
								<span v-t="'delete'"></span>
							</b-dropdown-item-button>
						</b-dropdown>
					</span>
				</li>
			</ul>
			<div class="details-post-content">
				{{ comment.text }}
			</div>
		</div>

		<ActionsNavButton
			text="Comment"
			icon="comment-alt"
			v-if="!postCommentOpen"
			@click="postCommentOpen = true" />

		<TicketDetailsSlimPostComment 
			class="w-75"
			v-if="postCommentOpen"
			:ticket="ticket"
			@comment="onNewComment"
			@cancel="postCommentOpen = false" />
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			},
			readonly: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				comments: [],
				postCommentOpen: false,
			}
		},
		methods: {
			...mapActions('tickets/comments', {
				fetchCommentList: 'fetchList',
				deleteComment: 'delete',
			}),
			onNewComment(comment) {
				this.comments.push(comment)
				this.postCommentOpen = false
			},
			async onDeleteComment(comment, index) {
				await this.deleteComment(comment)
				this.comments.splice(index, 1)
			}
		},
		async mounted() {
			if (process.client) {
				const comments = await this.fetchCommentList({
					tql: `ticket = ${this.ticket.key}`
				})

				this.comments.push.apply(this.comments, comments)
			}
		}
	}
</script>
