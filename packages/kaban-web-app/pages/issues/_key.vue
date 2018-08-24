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
						:to="{name: 'backlogs-key', params: {key: backlog.key}}"
						:text="backlog.name" />

					<b-breadcrumb-item
						:to="{name: 'issues-key', params: {key: ticket.key}}"
						:text="ticket.key"
						active />
				</b-breadcrumb>
			</template>

			<ActionsNav>
				<ActionsAllowedTransitions :ticket="ticket" />
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
						<h3>Description:</h3>

						<LiveEditTextarea
							:content="ticket.description"
							:display="ticket.description"
							action="tickets/patch"
							path="description"
							:_key="ticket.key" />
					</div>
					<!--<div class="details-section">
						<h3>Attachments:</h3>

						<TicketDetailsSlimDropbox :ticket="ticket" />

						<TicketDetailsSlimAttachments :ticket="ticket" />
					</div>-->

					<!--<div class="details-section">
						<b-tabs>
							<b-tab title="Comments" active>
								<TicketDetailsSlimComments :ticket="ticket" />
							</b-tab>
							<b-tab title="History">
								<TicketDetailsSlimHistory :ticket="ticket" />
							</b-tab>
						</b-tabs>
					</div>-->
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
			await store.dispatch('tickets/fetchOne', `key = ${params.key}`)

			const ticket = store.getters['tickets/getOne'](params.key)

			await store.dispatch(
				'backlogs/fetchOne',
				`key = ${ticket.backlog.key}`
			)
		},
		computed: {
			...mapGetters('tickets', {
				getTicket: 'getOne'
			}),

			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			ticket() {
				return this.getTicket(this.$route.params.key)
			},

			backlog() {
				return this.getBacklog(this.ticket.backlog.key)
			}
		}
	}
</script>
