<template>
	<b-container fluid>
		<TopBar>
			<template slot="header">
				<LiveEditInput
					:content="ticket.name"
					:display="ticket.name"
					action="tickets/patch"
					path="name"
					:_key="ticket.key" />
			</template>

			<template slot="breadcrumb">
				<b-breadcrumb>
					<b-breadcrumb-item
						:to="localePath({name: 'backlogs-key', params: {key: ticket.backlog.key}})"
						:text="ticket.backlog.name" />

					<b-breadcrumb-item
						:to="localePath({name: 'issues-key', params: {key: ticket.key}})"
						:text="ticket.key"
						active />
				</b-breadcrumb>
			</template>

			<ActionsNav>
				<!--<ActionsNavButton
					text="Comment"
					icon="comment-alt"
					action=""
					shortkey="" />-->

				<ActionsAllowedTransitions 
					v-if="!isMilestone"
					:ticket="ticket" />

				<div class="actions-nav-separator"></div>

				<ActionsNavTicketOptions 
					class="float-right"
					:ticket="ticket" 
					:gotoBacklog="true"
					:readonly="ticket.backlog.isArchived"/>
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
							<b-col v-if="false">
								<TicketDetailsSlimEstimations :ticket="ticket" />
							</b-col>
							<b-col v-if="false">
								<TicketDetailsSlimVersion :ticket="ticket" />
							</b-col>
						</b-row>
					</div>
					<div class="details-section">
						<h3 v-t="'description'"></h3>

						<TicketDetailsSlimDescription 
							:ticket="ticket"
							:isArchived="ticket.backlog.isArchived" />
					</div>
					<div class="details-section">
						<h3 v-t="'attachments'"></h3>

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
					<TicketDetailsSlimPeople :ticket="ticket" />
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
			const ticket = await store.dispatch(
				'tickets/fetchOne',
				`key = ${params.key}`
			)
		},
		head() {
			return {
				title: this.ticket.name
			}
		},
		computed: {
			...mapGetters('tickets', {
				getTicket: 'getOne'
			}),

			ticket() {
				return this.getTicket(this.$route.params.key)
			},

			isMilestone() {
				return this.ticket.type.key === 'milestone';
			},
		},
	}
</script>
