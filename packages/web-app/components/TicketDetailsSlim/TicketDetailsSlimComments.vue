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
					<a href="">
						<avatar 
							inline
							:size="25"
							:src="comment.author.avatar"
							:username="comment.author.name" />

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
			@cancel="postCommentOpen = false" />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

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
				postCommentOpen: false,
			}
		},
		computed: {
			...mapGetters('tickets/comments', {
				comments: 'getList'
			})
		},
		methods: {
			...mapActions('tickets/comments', {
				fetchCommentList: 'fetchList',
				createComment: 'create',
				deleteComment: 'delete',
				emptyComments: 'empty',
			}),
			async onDeleteComment(comment, index) {
				this.deleteComment(comment);
			}
		},
		async mounted() {
			if (process.client) {
				await this.fetchCommentList({
					tql: `ticket = ${this.ticket.key}`,
				})
			}
		},
		destroyed() {
			this.emptyComments();
		}
	}
</script>
