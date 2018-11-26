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
					<a href="">
						<avatar 
							inline
							:size="25"
							:src="item.user.avatar"
							:username="item.user.name" />

						{{ item.user.name }}
					</a>
				</li>
				<li>
					<span v-t="'madeAChange'"></span>
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
	import { mapActions, mapGetters } from 'vuex'

	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			}
		},
		methods: {
			...mapActions('tickets/history', {
				fetchHistoryList: 'fetchList',
				emptyHistory: 'empty',
			}),
		},
		computed: {
			...mapGetters('tickets/history', {
				items: 'getList'
			})
		},
		async mounted() {
			if (process.client) {
				this.fetchHistoryList({
					tql: `ticket = ${this.ticket.key}`,
				})
			}
		},
		destroyed() {
			this.emptyHistory();
		}
	}
</script>
