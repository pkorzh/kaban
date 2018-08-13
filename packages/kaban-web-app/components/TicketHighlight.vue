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
						:_key="ticket.key" />
				</template>

				<template slot="breadcrumb">
					<b-breadcrumb>
						<b-breadcrumb-item
							:to="{name: 'backlogs-key', params: {key: backlog.key}}"
							:text="backlog.name" />

						<b-breadcrumb-item
							:to="{name: 'issues-key', params: {key: ticket.key}}"
							:text="ticket.key" />
					</b-breadcrumb>
				</template>
			</TopBar>

			<nuxt-link class="btn-details" :to="{name: 'issues-key', params: {key: ticket.key}}">
				<font-awesome-icon icon="arrows-alt-v" />
			</nuxt-link>

			<button
				class="modal-box-close"
				@click="$emit('close')">Close</button>
		</div>
		<div class="details">
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

			<b-row>
				<b-col cols="9">
					<div class="details-section">
						<h3>Description:</h3>

						<LiveEditTextarea
							:content="ticket.description"
							:display="ticket.description"
							action="tickets/patch"
							path="description"
							:_key="ticket.key" />
					</div>
					<div class="details-section">
						<h3>Attachments:</h3>

						<TicketDetailsSlimDropbox  :ticket="ticket" />

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
					<TicketDetailsSlimStatus :ticket="ticket" />

					<TicketDetailsSlimEstimations :ticket="ticket" />

					<TicketDetailsSlimAssign :ticket="ticket" />

					<TicketDetailsSlimDates :ticket="ticket" />

					<TicketDetailsSlimVersion :ticket="ticket" />

				</b-col>
			</b-row>
		</div>
		<div class="modal-box-footer">
			<button
				class="btn btn-outline-danger"
				@click="$emit('close')">Close</button>
			<button class="btn btn-primary">Add</button>
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
		data() {
			return {
				//goBack: true
			}
		},
		methods: {
			/*onpopstate() {
				this.goBack = false
				this.$emit('close')
			}*/
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
			}
		},
		mounted() {
			/*history.pushState(
				{highlight: true},
				this.ticket.name,
				`/issues/${this.ticket.key}`
			)

			window.onpopstate = this.onpopstate.bind(this)*/
		},
		destroyed() {
			/*this.goBack && this.$router.go(-1)
			window.onpopstate = null*/
		},
		watch: {
			'$route'(to, from) {
				this.$emit('close')
			}
		}
	}
</script>
