<template>
	<div class="modal-box-holder">
		<div class="modal-box-header">
			<TopBar>
				<template slot="header">
					<LiveEditInput
						:content="ticket.name"
						:display="ticket.name"
						action="tickets/patch"
						path="name"
						:readonly="backlog.isArchived"
						:_key="ticket.key" />
				</template>

				<template slot="breadcrumb">
					<b-breadcrumb>
						<b-breadcrumb-item
							:to="localePath({name: 'backlogs-key', params: {key: backlog.key}})"
							:text="backlog.name" />

						<b-breadcrumb-item
							:to="ticketUrl(ticket)"
							:text="ticket.key" />
					</b-breadcrumb>
				</template>
			</TopBar>

			<nuxt-link class="btn-details" :to="ticketUrl(ticket)">
				<font-awesome-icon icon="arrows-alt-v" />
			</nuxt-link>

			<button
				class="modal-box-close"
				@click="$emit('close')">Close</button>
		</div>
		<div class="details">
			<ActionsNav>
				<!--<ActionsNavButton
					text="Comment"
					icon="comment-alt"
					action=""
					shortkey="" />-->

				<!--<ActionsNavButton
					text="Assign"
					icon=""
					action=""
					shortkey="" />-->

				<ActionsAllowedTransitions 
					v-if="!isMilestone"
					:ticket="ticket" 
					:readonly="backlog.isArchived"/>
				<!--

				<ActionsNavButton
					icon="share"
					action=""
					shortkey="" />
				<ActionsNavButton
					icon="ellipsis-h"
					action=""
					shortkey="" />-->

				<div class="actions-nav-separator"></div>

				<ActionsNavTicketOptions
					:ticket="ticket" 
					:readonly="backlog.isArchived"/>

			</ActionsNav>

			<b-row>
				<b-col cols="9">
					<div class="details-section">
						<h3 v-t="'description'"></h3>

						<TicketDetailsSlimDescription 
							:ticket="ticket"
							:isArchived="backlog.isArchived" />
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
					<TicketDetailsSlimStatus 
						:ticket="ticket" 
						:readonly="backlog.isArchived"/>

					<!--<TicketDetailsSlimEstimations :ticket="ticket" />-->

					<TicketDetailsSlimPeople 
						:ticket="ticket" 
						:readonly="backlog.isArchived"/>

					<TicketDetailsSlimDates 
						:ticket="ticket" />

					<!--<TicketDetailsSlimVersion :ticket="ticket" />-->

				</b-col>
			</b-row>
		</div>
		<div class="modal-box-footer">
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import {TicketBaseMixin} from '@/mixins'

	export default {
		mixins: [TicketBaseMixin],
		props: {
			ticketKey: {
				type: String,
				required: true,
			},
			backlogKey: {
				type: String,
				required: true,
			}
		},
		computed: {
			...mapGetters('tickets', {
				getTicket: 'getOne'
			}),

			...mapGetters('backlogs', {
				getBacklog: 'getOne'
			}),

			ticket() {
				return this.getTicket(this.ticketKey)
			},

			backlog() {
				return this.getBacklog(this.backlogKey)
			},

			isMilestone() {
				return this.ticket.type.key === 'milestone';
			},
		},
		watch: {
			'$route'(to, from) {
				this.$emit('close')
			},

			ticket(newTicket) {
				if (!newTicket) {
					this.$emit('close')
				}
			},
		}
	}
</script>
