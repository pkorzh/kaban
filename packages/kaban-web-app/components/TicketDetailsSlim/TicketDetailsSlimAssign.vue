<template>
	<ul class="details-options details-options-assign">
		<li>
			<h3>Assignee</h3>
			<div>
				<LiveEditSelect
					:content="ticket.assignee"
					:display="ticket.assignee.name"
					action="tickets/patch"
					getter="users/getList"
					path="assignee"
					icon="avatar"
					:readonly="readonly"
					:_key="ticket.key">
						<template slot="display">
							<img
								class="details-avatar"
								:src="ticket.assignee.avatar"
								style="width:20px;">
							{{ ticket.assignee.name }}
						</template>
					</LiveEditSelect>
			</div>
		</li>
		<li>
			<h3>Reporter</h3>
			<div>
				<LiveEditSelect
					:content="ticket.reporter"
					:display="ticket.reporter.name"
					:readonly="readonly"
					action="tickets/patch"
					getter="users/getList"
					path="reporter"
					icon="avatar"
					:_key="ticket.key">
						<template slot="display">
							<img
								class="details-avatar"
								:src="ticket.reporter.avatar"
								style="width:20px;">
							{{ ticket.reporter.name }}
						</template>
					</LiveEditSelect>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			ticket: {
				type: Object,
				required: true,
			},
			readonly: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
