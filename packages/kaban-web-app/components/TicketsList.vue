<template>
	<div class="table-list">
		<div
			class="table-list-line"
			v-for="ticket in tickets"
			:key="ticket.key"
			@click="highlight(ticket)">

			<div class="table-list-line-type">
				<img
					:src="ticket.type.iconUrl"
					style="max-width: 20px;min-width: 20px;">
			</div>

			<div class="table-list-line-name">
				<span>{{ ticket.name }}</span>
			</div>

			<div class="table-list-line-status">
				{{ ticket.status.name }}
			</div>

			<div class="table-list-line-user">
					<img
						:src="ticket.assignee.avatar"
						style="max-width: 20px;min-width: 20px;">
			</div>

			<div class="table-list-line-priority">
					<img
						:src="ticket.priority.iconUrl"
						style="max-width: 20px;min-width: 20px;">
			</div>

			<div class="table-list-line-estm">
				<div
					class="ticket-estm ticket-estm-1"
					title="Less than a day">
					<span></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { TicketBaseMixin } from '@/mixins'

	export default {
		mixins: [TicketBaseMixin],
		data() {
			return {
				selectedTickets: [],
				ticketsPerScreen: 0,
				disableLoadMoreUntilLoaded: false
			}
		},
		computed: {
		},
		methods: {
		},
		props: {
			tickets: {
				type: Array,
				required: true,
			},
		},
		watch: {
			tickets: {
				handler(val) {
					this.disableLoadMoreUntilLoaded = false;
				},
				deep: false
			}
		},
		mounted() {
			const ticket = this.$el.querySelector('.table-list-line');

			if(!ticket) {
				return;
			}

			const pixelsToTheBottom = window.innerHeight - (this.$el.offsetTop + this.$el.offsetHeight)
			const ticketsToTheBottom = Math.floor((pixelsToTheBottom < 0 ? 0 : pixelsToTheBottom) / ticket.offsetHeight)

			this.ticketsPerScreen = this.tickets.length + ticketsToTheBottom;

			this.$emit('loadmore', ticketsToTheBottom + this.ticketsPerScreen);

			window.addEventListener('scroll', () => {
				const heightOfOneScreen = ticket.offsetHeight * this.ticketsPerScreen;

				const itsTimeToLoad =
						document.documentElement.scrollTop + window.innerHeight >=
						document.documentElement.offsetHeight - heightOfOneScreen

				if (itsTimeToLoad && !this.disableLoadMoreUntilLoaded) {
					this.disableLoadMoreUntilLoaded = true;
					this.$emit('loadmore', this.ticketsPerScreen)
				}
			})
		}
	}
</script>
