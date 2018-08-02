<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				Task
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
										<div>Bug</div>
									</li>
									<li>
										<h3>Priority:</h3>
										<div>Low</div>
									</li>
									<li>
										<h3>Status:</h3>
										<div>
											<span class="details-label">IN PROGRESS</span>
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
					</div>
					<div class="details-section">
						<h3>Attachments:</h3>
					</div>
					<div class="details-section">
						tabs
					</div>
				</b-col>
				<b-col cols="3">
					<ul class="details-options">
						<li>
							<h3>Created By:</h3>
							<div>Alex Smith</div>
						</li>
						<li>
							<h3>Created By:</h3>
							<div>Alex Smith</div>
						</li>
					</ul>
					<ul class="details-options">
						<li>
							<h3>Created at:</h3>
							<div>15/Jan/16 9:28 AM</div>
						</li>
						<li>
							<h3>Updated at:</h3>
							<div>15/Jan/16 10:28 AM</div>
						</li>
						<li>
							<h3>Resolved at:</h3>
							<div>12/Jul/18 4:50 AM</div>
						</li>
					</ul>
				</b-col>
			</b-row>
		</div>

	</b-container>
</template>

<script>
	export default {
	}
</script>
