<template>
	<div class="card card-ticket">
		<h3 class="card-title">
			<span class="text-muted">
				{{ ticket.key }}
			</span>
			<a
				:href="ticketHref(ticket)"
				class="card-link"
				v-on:click.prevent.stop="clicked">
				{{ ticket.name }}
			</a>
		</h3>
		<ul class="card-list card-list-tags">
			<li v-for="tag in ticket.tags" :key="tag.name">
				<a href="#">{{ tag.name }}</a>
			</li>
		</ul>
		<div class="card-footer">
			<div class="card-col">
				<div class="card-check">
					<img
						:src="ticket.type.iconUrl"
						:title="ticket.type.name">
				</div>
			</div>
			<div class="card-col">
				<span class="card-attach">
					<font-awesome-icon icon="paperclip" />
					10
				</span>
				<div class="card-image"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
		methods: {
			clicked() {
				this.$bus.$emit('kaban::board::ticket::selected', this.ticket)
			},
			ticketHref(ticket) {
				return `/issues/${ticket.key}`
			}
		}
	};
</script>

<style>
</style>
