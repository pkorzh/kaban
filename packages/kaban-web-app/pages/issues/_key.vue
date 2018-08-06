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
								<TicketDetailsSlimStatus :ticket="ticket" />
							</b-col>
							<b-col>
								<TicketDetailsSlimEstimations :ticket="ticket" />
							</b-col>
							<b-col>
								<TicketDetailsSlimVersion :ticket="ticket" />
							</b-col>
						</b-row>
					</div>
					<div class="details-section">
						<h3>Description:</h3>

						<LiveEditTextarea :content="ticket.description" />
					</div>
					<div class="details-section">
						<h3>Attachments:</h3>

						<TicketDetailsSlimDropbox :ticket="ticket" />

						<TicketDetailsSlimAttachments :ticket="ticket" />
					</div>
					<div class="details-section">
						<b-tabs>
							<b-tab title="Comments" active>
								<TicketDetailsSlimComments :ticket="ticket" />
							</b-tab>
							<b-tab title="History">
								<TicketDetailsSlimHistory :ticket="ticket" />
							</b-tab>
						</b-tabs>
					</div>
				</b-col>
				<b-col cols="3">
					<TicketDetailsSlimAssign :ticket="ticket" />
					<TicketDetailsSlimDates :ticket="ticket" />
				</b-col>
			</b-row>
		</div>

	</b-container>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		async fetch({store, params}) {
			await store.dispatch('tickets/fetchOne', params.key)
		},
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
