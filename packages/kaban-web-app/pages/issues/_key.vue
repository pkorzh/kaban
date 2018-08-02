<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				<LiveEditInput :content="ticket.name" />
			</template>

			<ActionsNav>

				<ActionsNavButton
					text="Edit"
					icon="pen"
					action=""
					shortkey="" />
				<ActionsNavButton
					text="Comment"
					icon="comment-alt"
					action=""
					shortkey="" />
				<ActionsNavButton
					text="Assign"
					icon=""
					action=""
					shortkey="" />
				<ActionsNavButton
					text="Closed"
					icon=""
					action=""
					shortkey="" />

				<div class="actions-nav-separator"></div>

				<ActionsNavButton
					icon="share"
					action=""
					shortkey="" />
				<ActionsNavButton
					icon="ellipsis-h"
					action=""
					shortkey="" />
			</ActionsNav>
		</TopBar>

		<div class="details">
			<b-row>
				<b-col cols="9">
					<div class="details-section details-section-divider">
						<b-row>
							<b-col>
								<ul class="details-options">
									<li>
										<h3>Type:</h3>
										<div>
											<LiveEditSelect :content="ticket.type.name" />
										</div>
									</li>
									<li>
										<h3>Priority:</h3>
										<div>Low</div>
									</li>
									<li>
										<h3>Status:</h3>
										<div>
											<span class="details-label">
												{{ ticket.status.key }}
											</span>
										</div>
									</li>
								</ul>
							</b-col>
							<b-col>
								<ul class="details-options">
									<li>
										<h3>Due Date: </h3>
										<div>Jul 31, 2018</div>
									</li>
									<li>
										<h3>Estimated Time:</h3>
										<div>40 hours</div>
									</li>
									<li>
										<h3>Spent Time:</h3>
										<div>20 hours</div>
									</li>
								</ul>
							</b-col>
							<b-col>
								<ul class="details-options">
									<li>
										<h3>Version/s:</h3>
										<div>None</div>
									</li>
								</ul>
							</b-col>
						</b-row>
					</div>
					<div class="details-section">
						<h3>Description:</h3>

						<LiveEditTextarea :content="ticket.description" />
					</div>
					<div class="details-section">
						<h3>Attachments:</h3>
						<div class="details-dropbox">
							<font-awesome-icon icon="cloud-upload-alt" />
							Drop files to attach, or  <a href="#">browse</a>
						</div>
						<div class="details-attach">
							<div class="details-attach-item">
								<a href="#" class="details-attach-close"></a>
							</div>
						</div>
					</div>
					<div class="details-section">
						<b-tabs>
							<b-tab title="Comments" active>
								<div class="details-post">
									<ul class="details-post-info">
										<li>
											<a href="#">
												<div class="details-avatar"></div>
												Alex Smith
											</a>
										</li>
										<li>
											added a comment
											<span class="details-post-date">11/07/2018    09:00 am</span>
										</li>
									</ul>
									<div class="details-post-content">
										Suspendisse potenti. Donec in arcu ut neque vehicula blandit et ut eros. Nam ex ante, congue ut justo quis, molestie egestas lectus. Ut nec elit eu turpis accumsan interdum a et ante. Praesent et posuere lectus. Nam feugiat, lectus a pretium varius, augue dolor aliquet mi, id tincidunt quam lacus at tortor. 
									</div>
								</div>
								<div class="details-post">
									<ul class="details-post-info">
										<li>
											<a href="#">
												<div class="details-avatar"></div>
												Alex Smith
											</a>
										</li>
										<li>
											added a comment
											<span class="details-post-date">11/07/2018    09:00 am</span>
										</li>
									</ul>
									<div class="details-post-content">
										Suspendisse potenti. Donec in arcu ut neque vehicula blandit et ut eros. Nam ex ante, congue ut justo quis, molestie egestas lectus. Ut nec elit eu turpis accumsan interdum a et ante. Praesent et posuere lectus. Nam feugiat, lectus a pretium varius, augue dolor aliquet mi, id tincidunt quam lacus at tortor. 
									</div>
								</div>
							</b-tab>
							<b-tab title="History">
								<div class="details-post">
									<ul class="details-post-info">
										<li>
											<a href="#">
												<div class="details-avatar"></div>
												Alex Smith
											</a>
										</li>
										<li>
											added a comment
											<span class="details-post-date">11/07/2018    09:00 am</span>
										</li>
									</ul>
								</div>
								<div class="details-post">
									<ul class="details-post-info">
										<li>
											<a href="#">
												<div class="details-avatar"></div>
												Alex Smith
											</a>
										</li>
										<li>
											added a comment
											<span class="details-post-date">11/07/2018    09:00 am</span>
										</li>
									</ul>
								</div>
								<div class="details-post">
									<ul class="details-post-info">
										<li>
											<a href="#">
												<div class="details-avatar"></div>
												Alex Smith
											</a>
										</li>
										<li>
											added a comment
											<span class="details-post-date">11/07/2018    09:00 am</span>
										</li>
									</ul>
								</div>
							</b-tab>
						</b-tabs>
					</div>
				</b-col>
				<b-col cols="3">
					<ul class="details-options details-options-assign">
						<li>
							<h3>Created By:</h3>
							<div><div class="details-avatar"></div> Alex Smith</div>
						</li>
						<li>
							<h3>Created By:</h3>
							<div><div class="details-avatar"></div> Alex Smith</div>
						</li>
					</ul>
					<ul class="details-options">
						<li>
							<h3>Created at:</h3>
							<div>
								{{ ticket.createdAt | moment('L') }}
							</div>
						</li>
						<li>
							<h3>Updated at:</h3>
							<div>
								{{ ticket.updatedAt | moment('L') }}
							</div>
						</li>
						<li>
							<h3>Resolved at:</h3>
							<div>
								{{ ticket.resolvedAt | moment('L') }}
							</div>
						</li>
					</ul>
				</b-col>
			</b-row>
		</div>

	</b-container>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('tickets', {
				getTicket: 'getOne'
			}),

			ticket() {
				return this.getTicket(this.$route.params.key)
			},
		}
	}
</script>
