<template>
	<div>
		<div v-if="items.length == 0">
			<span v-t="'noHistoryYetOnIssue'"></span>
		</div>
		<div 
			class="details-post"
			v-for="item in items"
			:key="item._id">
			<ul class="details-post-info">
				<li>
					<a href="#">
						<img 
							class="details-avatar"
							:src="item.user.avatar" />

						{{ item.user.name }}
					</a>
				</li>
				<li>
					<span class="details-post-date">
						{{ item.createdAt | moment('LLL') }}
					</span>
				</li>
			</ul>
			<div class="details-post-content">
				<table class="table">
					<thead>
						<tr>
							<th></th>
							<th v-t="'oldValue'"></th>
							<th v-t="'newValue'"></th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(changeset, index) in item.changeset"
							:key="index">
							<td>{{ changeset.key }}</td>
							<td>{{ changeset.old }}</td>
							<td>{{ changeset.new }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {
				items: []
			}
		},
		methods: {
			...mapActions('tickets/history', {
				fetchHistoryList: 'fetchList',
			}),
		},
		async mounted() {
			if (process.client) {
				const items = await this.fetchHistoryList({
					tql: `ticket = ${this.ticket.key}`
				})

				this.items.push.apply(this.items, items)
			}
		}
	}
</script>
